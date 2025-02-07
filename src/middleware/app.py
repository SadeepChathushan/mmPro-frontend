from flask import Flask, request, jsonify
from twilio.rest import Client
from flask_cors import CORS
import requests
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests  # Different from regular requests!

app = Flask(__name__)
CORS(app) 

# Twilio Configuration (use your actual credentials)
TWILIO_ACCOUNT_SID = 'AC75c56ec819c4610a136cb90166eea305'
TWILIO_AUTH_TOKEN = 'e02af28a0ce8c9dff2ad981fc2e9794f'  # Replace with your actual auth token
VERIFY_SERVICE_SID = 'VA465d34c02ff6fa716d98c42dc2683f7a'

REDMINE_URL = "http://redmine.aasait.lk"

REDMINE_ADMIN_API_KEY = "c8de043cf44f4354927b4ff9dceeeb18e298afc0"
GOOGLE_CLIENT_ID = "329550488375-r7qkh9339o8cn1cmniinkboo5vac6m9g.apps.googleusercontent.com"

# Initialize Twilio client
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

@app.route('/send-verification', methods=['POST'])
def send_verification():
    data = request.json
    phone = data['phone']
    print(phone)

    try:
        verification = client.verify \
            .v2 \
            .services(VERIFY_SERVICE_SID) \
            .verifications \
            .create(to=phone, channel='sms')

        return jsonify({
            'success': True,
            'verification_id': verification.sid
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/verify-code', methods=['POST'])
def verify_code():
    data = request.json
    phone = data['phone']
    code = data['code']

    try:
        verification_check = client.verify \
            .v2 \
            .services(VERIFY_SERVICE_SID) \
            .verification_checks \
            .create(to=phone, code=code)

        if verification_check.status == 'approved':
            return jsonify({'success': True})
        else:
            return jsonify({'success': False, 'error': 'Invalid code'}), 401
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/create-complaint', methods=['POST'])
def create_complaint():
    data = request.json
    
    issue_data = {
        'issue': {
            'project_id': 31,  
            'tracker_id': 26,  
            'subject': "New Complaint",  
            'status_id': 11, 
            'priority_id': 2,  
            'assigned_to_id': 59, 
            'start_date': "2024-01-31", 
            'due_date': "2024-02-14",  
            'custom_fields': [
                {'id': 3, 'name': "Mobile Number", 'value': data['phone']},
                {'id': 90, 'name': "Complaint ID", 'value': "complaint01"}
            ]
        }
    }

    response = requests.post(
        f'{REDMINE_URL}/issues.json',
        json=issue_data,
        headers={'X-Redmine-API-Key': REDMINE_ADMIN_API_KEY, 'Content-Type': 'application/json'}
    )
    
    if response.status_code == 201:
        issue_id = response.json()['issue']['id']
        return jsonify({'success': True, 'complaint_id': issue_id})
    
    return jsonify({'success': False, 'error': 'Failed to create complaint'}), response.status_code

@app.route('/auth/google', methods=['POST'])
def auth_google():
    try:
        token = request.json.get('token')

        # Verify Google ID Token
        id_info = id_token.verify_oauth2_token(
            token,
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = id_info.get('email')
        if not email:
            return jsonify({"error": "Email not found"}), 400

        # Get User ID from Redmine
        users_response = requests.get(
            f"{REDMINE_URL}/users.json",
            params={"mail": email},
            headers={"X-Redmine-API-Key": REDMINE_ADMIN_API_KEY}
        )

        if users_response.status_code != 200 or not users_response.json().get('users'):
            return jsonify({"error": "User not found"}), 404

        user_id = users_response.json()['users'][0]['id']

        # Get User Role from Redmine Memberships
        memberships_response = requests.get(
            f"{REDMINE_URL}/projects/GSMB/memberships.json",
            headers={"X-Redmine-API-Key": REDMINE_ADMIN_API_KEY}
        )

        if memberships_response.status_code != 200:
            return jsonify({"error": "Failed to fetch memberships"}), 500

        memberships = memberships_response.json().get('memberships', [])
        
        # Find the role associated with the user_id
        user_role = None
        for membership in memberships:
            if membership.get('user', {}).get('id') == user_id:
                user_role = membership.get('roles', [{}])[0].get('name')  # Assuming first role is primary

        if not user_role:
            return jsonify({"error": "User role not found"}), 404

        return jsonify({"user": {"role": user_role}}), 200

    except ValueError as e:
        app.logger.error(f"Google token error: {str(e)}")
        return jsonify({"error": "Invalid Google token"}), 401
    except Exception as e:
        app.logger.error(f"Server error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    app.run(debug=True)