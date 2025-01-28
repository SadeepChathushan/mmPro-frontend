import axios from 'axios';
import { message } from 'antd';
import config from './config';

export const submitComplaint = async (input, phoneNumber, language, role = 'General Public') => {
    
    if (!phoneNumber.trim() || !/^[0-9]{9,10}$/.test(phoneNumber)) {
        message.error(language === "en" 
            ? "Please enter a valid phone number!" 
            : "කරුණාකර වලංගු දුරකථන අංකයක් ඇතුළු කරන්න!");
        return false;
    }

    try {
        const generateComplaintID = (lorryNumber) => {
            const randomNum = Math.floor(Math.random() * 1000);
            return `${role === 'Police Officer' ? 'PO' : 'GP'}-${lorryNumber}-${randomNum}`;
        };

        const complaintID = generateComplaintID(input);
        const startDate = new Date();
        const dueDate = new Date(startDate);
        dueDate.setDate(startDate.getDate() + 14);

        const payload = {
            issue: {
                project_id: config.getProjectId(),
                tracker_id: 26,
                subject: language === "en" ? "New Complaint" : "නව පැමිණිල්ලක්",
                status_id: role === 'Police Officer' ? 11 : 1,
                priority_id: 2,
                assigned_to_id: 59,
                start_date: startDate.toISOString().split('T')[0],
                due_date: dueDate.toISOString().split('T')[0],
                custom_fields: [
                    { id: 13, name: "Lorry Number", value: input },
                    { id: 90, name: "Complaint ID", value: complaintID },
                    { id: 68, name: "Role", value: role },
                    { id: 3, name: "Mobile Number", value: phoneNumber }
                ],
            },
        };

        const apiKey = role === 'Police Officer' 
            ? config.getPoliceOfficerApiKey()
            : config.getPublicUserApiKey();

        if (!apiKey) {
            throw new Error('Missing API Key');
        }

        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "X-Redmine-API-Key": apiKey,
            },
            timeout: 10000 // 10 second timeout
        };

        const response = await axios.post(
            "/api/issues.json",
            payload,
            axiosConfig
        );

        message.success(language === "en" 
            ? "Report Submitted successfully!" 
            : "පැමිණිල්ල සාර්ථකව ඉදිරිපත් කරන ලදී.");
        
        return true;
    } catch (error) {
        console.error("Submission Error:", error);

        message.error(language === "en" 
            ? "Report Submission Failed! Please try again." 
            : "පැමිණිල්ල ඉදිරිපත් කිරීම අසාර්ථකයි. නැවත උත්සාහ කරන්න.");
        
        return false;
    }
};
