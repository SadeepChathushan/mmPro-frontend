import axios from 'axios';
import config from './config';

export const fetchLorryNumber = async () => {
    try {
        const apiKey = config.getPublicUserApiKey();
        const response = await axios.get('/api/projects/gsmb/issues.json', {
            headers: {
                'Content-Type': 'application/json',
                'X-Redmine-API-Key': apiKey,
            },
        });

        return response.data.issues.map((issue) => ({
            vehicleNumber: issue.custom_fields.find((field) => field.name === 'Lorry Number')?.value,
        }));
    } catch (error) {
        console.error('Error fetching lorry numbers:', error);
        return [];
    }
};
