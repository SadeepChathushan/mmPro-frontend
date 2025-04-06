import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { submitComplaintPublic } from '../../services/complaint';
import { validateVehicleNumber, validatePhoneNumber } from '../../services/GeneralPublic/validation';
import Modal from '../../components/GeneralPublic/Modal';
//import '../../styles/GeneralPublic/ComplaintForm.css';

const ComplaintForm = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pre-fill vehicle number if coming from dashboard
  const [formData, setFormData] = useState({
    vehicleNumber: location.state?.vehicleNumber || '',
    phoneNumber: '',
    complaintType: 'illegal_mining',
    location: '',
    description: '',
    evidence: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, evidence: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!validateVehicleNumber(formData.vehicleNumber)) {
      setModalMessage(
        language === 'en' ? 'Invalid vehicle number format!' :
        language === 'si' ? 'වලංගු නොවන වාහන අංකය!' :
        'தவறான வாகன எண் வடிவம்!'
      );
      setModalOpen(true);
      setIsSubmitting(false);
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      setModalMessage(
        language === 'en' ? 'Invalid phone number format!' :
        language === 'si' ? 'වලංගු නොවන දුරකථන අංකය!' :
        'தவறான தொலைபேசி எண்!'
      );
      setModalOpen(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append('vehicleNumber', formData.vehicleNumber);
      formPayload.append('phoneNumber', formData.phoneNumber);
      formPayload.append('complaintType', formData.complaintType);
      formPayload.append('location', formData.location);
      formPayload.append('description', formData.description);
      if (formData.evidence) {
        formPayload.append('evidence', formData.evidence);
      }

      const success = await submitComplaintPublic(formPayload, language);
      
      if (success) {
        setModalMessage(
          language === 'en' ? 'Complaint submitted successfully!' :
          language === 'si' ? 'පැමිණිල්ල සාර්ථකව ඉදිරිපත් කරන ලදී!' :
          'புகார் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!'
        );
        setModalOpen(true);
        setFormData({
          vehicleNumber: '',
          phoneNumber: '',
          complaintType: 'illegal_mining',
          location: '',
          description: '',
          evidence: null
        });
      }
    } catch (error) {
      setModalMessage(
        language === 'en' ? 'Failed to submit complaint. Please try again.' :
        language === 'si' ? 'පැමිණිල්ල ඉදිරිපත් කිරීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න.' :
        'புகாரை சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
      );
      setModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const complaintTypes = [
    { value: 'illegal_mining', 
      label: {
        en: 'Illegal Mining Activity',
        si: 'නීතිවිරෝධී පතල් කැණීම්',
        ta: 'சட்டவிரோத சுரங்கப்பணி'
      }
    },
    { value: 'vehicle_violation', 
      label: {
        en: 'Mining Vehicle Violation',
        si: 'පතල් වාහන උල්ලංඝනය',
        ta: 'சுரங்க வாகன மீறல்'
      }
    },
    { value: 'environmental', 
      label: {
        en: 'Environmental Damage',
        si: 'පරිසර හානිය',
        ta: 'சுற்றுச்சூழல் சேதம்'
      }
    },
    { value: 'safety', 
      label: {
        en: 'Safety Violation',
        si: 'සුරක්ෂිතතා උල්ලංඝනය',
        ta: 'பாதுகாப்பு மீறல்'
      }
    }
  ];

  return (
    <div className="complaint-form-container">
      <div className="complaint-form-header">
        <h2>
          {language === 'en' ? 'Submit Mining Complaint' :
           language === 'si' ? 'පතල් කැණීම් පැමිණිල්ල ඉදිරිපත් කරන්න' :
           'சுரங்க புகாரை சமர்ப்பிக்கவும்'}
        </h2>
        <p>
          {language === 'en' ? 'Report illegal mining activities or violations' :
           language === 'si' ? 'නීතිවිරෝධී පතල් කැණීම් හෝ උල්ලංඝනයන් වාර්තා කරන්න' :
           'சட்டவிரோத சுரங்கப்பணி அல்லது மீறல்களை புகாரளிக்கவும்'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="complaint-form">
        <div className="form-group">
          <label>
            {language === 'en' ? 'Vehicle Number' :
             language === 'si' ? 'වාහන අංකය' :
             'வாகன எண்'}
            <span className="required">*</span>
          </label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
            placeholder={
              language === 'en' ? 'E.g., NC-AB 1234' :
              language === 'si' ? 'උදා., NC-AB 1234' :
              'எ.கா., NC-AB 1234'
            }
          />
        </div>

        <div className="form-group">
          <label>
            {language === 'en' ? 'Your Phone Number' :
             language === 'si' ? 'ඔබගේ දුරකථන අංකය' :
             'உங்கள் தொலைபேசி எண்'}
            <span className="required">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder={
              language === 'en' ? 'E.g., 0771234567' :
              language === 'si' ? 'උදා., 0771234567' :
              'எ.கா., 0771234567'
            }
          />
        </div>

        <div className="form-group">
          <label>
            {language === 'en' ? 'Complaint Type' :
             language === 'si' ? 'පැමිණිල්ලේ වර්ගය' :
             'புகார் வகை'}
            <span className="required">*</span>
          </label>
          <select
            name="complaintType"
            value={formData.complaintType}
            onChange={handleChange}
            required
          >
            {complaintTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label[language] || type.label.en}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>
            {language === 'en' ? 'Location' :
             language === 'si' ? 'ස්ථානය' :
             'இடம்'}
            <span className="required">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder={
              language === 'en' ? 'E.g., Colombo' :
              language === 'si' ? 'උදා., කොළඹ' :
              'எ.கா., கொழும்பு'
            }
          />
        </div>

        <div className="form-group">
          <label>
            {language === 'en' ? 'Description' :
             language === 'si' ? 'විස්තර' :
             'விளக்கம்'}
            <span className="required">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            placeholder={
              language === 'en' ? 'Describe the issue in detail...' :
              language === 'si' ? 'ගැටලුව විස්තරාත්මකව විස්තර කරන්න...' :
              'சிக்கலை விரிவாக விவரிக்கவும்...'
            }
          />
        </div>

        <div className="form-group">
          <label>
            {language === 'en' ? 'Evidence (Photo/Video)' :
             language === 'si' ? 'සාක්ෂි (ඡායාරූප/වීඩියෝ)' :
             'ஆதாரம் (புகைப்படம்/வீடியோ)'}
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          <small>
            {language === 'en' ? 'Max file size: 5MB' :
             language === 'si' ? 'උපරිම ගොනු ප්‍රමාණය: 5MB' :
             'அதிகபட்ச கோப்பு அளவு: 5MB'}
          </small>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              language === 'en' ? 'Submitting...' :
              language === 'si' ? 'ඉදිරිපත් කරමින්...' :
              'சமர்ப்பிக்கிறது...'
            ) : (
              language === 'en' ? 'Submit Complaint' :
              language === 'si' ? 'පැමිණිල්ල ඉදිරිපත් කරන්න' :
              'புகாரை சமர்ப்பிக்கவும்'
            )}
          </button>
          
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/')}
          >
            {language === 'en' ? 'Cancel' :
             language === 'si' ? 'අවලංගු කරන්න' :
             'ரத்து செய்'}
          </button>
        </div>
      </form>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          if (modalMessage.includes('success')) {
            navigate('/');
          }
        }}
        message={modalMessage}
        language={language}
      />
    </div>
  );
};

export default ComplaintForm;