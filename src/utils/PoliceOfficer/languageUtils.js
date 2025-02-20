// src/components/PoliceOfficer/utils/languageUtils.js

export const getTranslations = (language) => ({
    title: {
        en: 'GEOLOGICAL SURVEY & MINES BUREAU',
        si: 'භූගෝලීය සමීක්ෂණ සහ පතල් කාර්යාංශය',
        ta: 'புவியியல் ஆய்வு மற்றும் சுரங்கப் பணியகம்'
    },
    description: {
        en: 'Police officers to verify a vehicles validity by entering its registration number. The system checks the details against the database and provides an instant result, confirming whether the vehicle is valid or invalid, ensuring compliance and road safety.',
        si: 'පොලිස් නිලධාරීන් වාහනයක ලියාපදිංචි අංකය ඇතුළත් කිරීමෙන් එහි වලංගුභාවය සත්‍යාපනය කළ යුතුය. පද්ධතිය දත්ත සමුදායට අනුව විස්තර පරීක්ෂා කර ක්ෂණික ප්‍රතිඵලයක් ලබා දෙන අතර, වාහනය වලංගුද අවලංගුද යන්න තහවුරු කරයි, අනුකූලතාව සහ මාර්ග ආරක්ෂාව සහතික කරයි.',
        ta: 'காவல்துறை அதிகாரிகள் ஒரு வாகனத்தின் பதிவு எண்ணை உள்ளிட்டு அதன் செல்லுபடியை சரிபார்க்க வேண்டும். இந்த அமைப்பு தரவுத்தளத்துடன் விவரங்களைச் சரிபார்த்து, வாகனம் செல்லுபடியாகுமா அல்லது செல்லாததா என்பதை உறுதிசெய்து, உடனடி முடிவை வழங்குகிறது, இணக்கத்தையும் சாலை பாதுகாப்பையும் உறுதி செய்கிறது.'
    },
    placeholder: {
        en: 'Enter vehicle number',
        si: 'විස්තර ඇතුළත් කරන්න',
        ta: 'வாகன எண்ணை உள்ளிடவும்'
    },
    checkButton: {
        en: 'Check',
        si: 'පරීක්ෂා කරන්න',
        ta: 'சரிபார்க்கவும்'
    },
    reportButton: {
        en: 'Report to GSMB',
        si: 'GSMB වෙත වාර්තා කරන්න',
        ta: 'GSMB-க்கு புகாரளிக்கவும்'
    },
    phoneNumberPlaceholder: {
        // en: 'e.g : 071XXXXXXX',
        // si: 'උදා : 071XXXXXXX',
        // ta: 'எ.கா : 071XXXXXXX'
    },
    phoneNumber: {
        // en: 'Enter Your Phone Number (e.g : 071XXXXXXX)',
        // si: 'දුරකථන අංකය ඇතුළු කරන්න (උදා : 071XXXXXXX)',
        // ta: 'தொலைபேசி எண்ணை உள்ளிடவும் (எ.கா : 071XXXXXXX)'
    },
    invalidLoad: {
        en: 'Invalid Load',
        si: 'අනවසර පැටවීමක්',
        ta: 'செல்லாத சுமை'
    },
    invalidVehicleNumber: {
        en: 'Invalid Vehicle Number Format!',
        si: 'වලංගු නොවන වාහන අංක ආකෘතියකි!',
        ta: 'தவறான வாகன எண் வடிவம்!'
    },
    invalidPhoneNumber: {
        // en: 'Invalid Phone Number Format!',
        // si: 'වලංගු නොවන දුරකථන අංක ආකෘතියකි!',
        // ta: 'தவறான தொலைபேசி எண் வடிவம்!'
    }
});
