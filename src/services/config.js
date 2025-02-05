// src/config.js
const config = {
    getProjectId: () => import.meta.env.VITE_PROJECT_ID || '31',
    getPoliceOfficerApiKey: () => import.meta.env.VITE_POLICE_OFFICER_API_KEY,
    getPublicUserApiKey: () => import.meta.env.VITE_PUBLIC_USER_API_KEY
};

export default config;