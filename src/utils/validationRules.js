// utils/validationRules.js

/**
 * Returns validation rules for form fields based on the selected language.
 *
 * @param {string} language - The current language ("en" or other).
 * @returns {object} An object containing validation rules for each form field.
 */
const getValidationRules = (language) => ({
    licenseNumber: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the license number!"
            : language === "si"
            ? "කරුණාකර බලපත්‍ර අංකය ඇතුළත් කරන්න!"
            : "தயவுசெய்து உரிம நம்பரை உள்ளிடவும்!",
      },
      {
        pattern: /^[A-Z0-9/]{5,20}$/,
        message:
          language === "en"
            ? "License number must be 5-20 characters, containing uppercase letters, numbers, and hyphens!"
            : language === "si"
            ? "බලපත්‍ර අංකය අක්ෂර 5-20 අතර විය යුතු අතර, මහා අකුරු, අංක සහ හැයිෆන් ඇතුළත් කළ යුතුයි!"
            : "உரிம நம்பர் 5-20 எழுத்துக்களாக இருக்க வேண்டும், பெரிய எழுத்துக்கள், எண்கள், மற்றும் இணைப்புக்கள் அடங்கியிருக்க வேண்டும்!",
      },
    ],
    ownerName: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the owner name!"
            : language === "si"
            ? "කරුණාකර අයිතිකරුගේ නම ඇතුළත් කරන්න!"
            : "தயவுசெய்து உரிமையாளரின் பெயரை உள்ளிடவும்!",
      },
      {
        pattern: /^[A-Za-z\s.'-]{3,50}$/,
        message:
          language === "en"
            ? "Owner name must be 3-50 characters and can include letters, spaces, apostrophes, periods, and hyphens!"
            : language === "si"
            ? "අයිතිකරුගේ නම අක්ෂර 3-50 අතර විය යුතු අතර, අකුරු, අවකාශ, අපොස්ට්‍රෝෆ්, තිත් සහ හැයිෆන් ඇතුළත් කළ හැක!"
            : "உரிமையாளரின் பெயர் 3-50 எழுத்துக்களாக இருக்க வேண்டும், எழுத்துக்கள், இடைவெளிகள், குறியீடுகள், காலப்புள்ளிகள் மற்றும் இணைப்புக்கள் சேர்க்கலாம்!",
      },
    ],
    // mobile: [
    //   {
    //     required: true,
    //     message:
    //       language === "en"
    //         ? "Please input the mobile number!"
    //         : "කරුණාකර ජංගම දුරකථන අංකය ඇතුළත් කරන්න!",
    //   },
    //   {
    //     pattern: /^\d{10}$/,
    //     message:
    //       language === "en"
    //         ? "Please enter a valid 10-digit mobile number!"
    //         : "කරුණාකර වලංගු 10 අංක ජංගම දුරකථන අංකයක් ඇතුළත් කරන්න!",
    //   },
    // ],

    NIC: [
      {
        required: true,
        message: 
        language === "en" 
        ? "Please enter NIC number!" 
        : language === "si"
        ? "කරුණාකර ජා.හැ. අංකය ඇතුළත් කරන්න!"
        : "தயவுசெய்து தேசிய அடையாள அட்டை (NIC) எண்னை உள்ளிடவும்!",
      },
      {
        pattern: /^\d{9}[Vv]|\d{12}$/,
        message: 
        language === "en" 
        ? "Invalid NIC format!" 
        : language === "si"
        ? "වැරදි ජා.හැ. ආකෘතියයි!"
        : "தவறான NIC வடிவம்!",
      },
    ],

    capacity: [
      {
        required: true,
        message: language === "en" ? "Please enter capacity!" 
        : language === "si"
        ? "කරුණාකර කිවුබ්ස් ගණන ඇතුළත් කරන්න!"
        : "தயவுசெய்து கொள்ளளவை உள்ளிடவும்!",
      },
      {
        type: "number",
        min: 1,
        message: language === "en" ? "Capacity must be at least 1!" 
        : language === "si"
        ? "කිවුබ්ස් ගණන ධනාත්මක පූර්ණ සංඛ්‍යාවක් විය යුතුයි!"
        : "கொள்ளளவு நேர்மறை முழு எண்ணாக இருக்க வேண்டும்!",
      },
    ],

    landName: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the land name!"
            : language === "si"
            ? "කරුණාකර ඉඩමේ නම ඇතුළත් කරන්න!"
            : "தயவுசெய்து நிலத்தின் பெயரை உள்ளிடவும்!",
      },
      {
        pattern: /^[A-Za-z0-9\s,.'-]{3,50}$/,
        message:
          language === "en"
            ? "Land name must be 3-100 characters and can include letters, numbers, spaces, commas, periods, apostrophes, and hyphens!"
            : language === "si"
            ? "ඉඩමේ නම අක්ෂර 3-50 අතර විය යුතු අතර එයට අකුරු, අංක, හිස්තැන්, කොමා, තිත්, අපෝස්ට්‍රොෆි සහ කෙටි ඉරි ඇතුළත් විය හැක!"
            : "நிலத்தின் பெயர் 3-50 எழுத்துகளுக்கு இடையில் இருக்க வேண்டும் மற்றும் எழுத்துகள், எண்கள், இடைவெளிகள், கோமாஸ், புள்ளிகள், அபோஸ்ட்ரோஃபிகள் மற்றும் டாஷ்களை உள்ளடக்கலாம்!",
      },
    ],

    villageName: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the village name!"
            : language === "si"
            ? "කරුණාකර ගමේ නම ඇතුළත් කරන්න!"
            : "தயவுசெய்து கிராமத்தின் பெயரை உள்ளிடவும்!",
      },
      {
        pattern: /^[A-Za-z\s]{2,50}$/,
        message:
          language === "en"
            ? "Village name must be 3-100 characters and can include letters, numbers, spaces, commas, periods, apostrophes, and hyphens!"
            : language === "si"
            ? "ගමේ නම 3-100 අක්ෂර අතර විය යුතු අතර, අකුරු, අංක, අවකාශ, කොමා, නිවැරදි, අපොස්ට්‍රෝෆ් සහ හැයිෆන් ඇතුළත් කළ හැක!"
            : "கிராமத்தின் பெயர் 3-100 எழுத்துகளுக்கு இடையில் இருக்க வேண்டும் மற்றும் எழுத்துகள், எண்கள், இடைவெளிகள், கோமாஸ், புள்ளிகள், அபோஸ்ட்ரோஃபிகள் மற்றும் டாஷ்களை உள்ளடக்கலாம்!",
          },
    ],

    gramaNiladhariDivision: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the Grama Niladhari Division!"
            : language === "si"
            ? "කරුණාකර ග්‍රාම නිලධාරි කොට්ඨාසය ඇතුළත් කරන්න!"
            : "தயவுசெய்து கிராம நிலதாரி பிரிவை உள்ளிடவும்!",
      },
      {
        pattern: /^[A-Za-z\s]{2,50}$/,
        message:
          language === "en"
            ? "Grama Niladhari Division must be 3-100 characters and can include letters, numbers, spaces, commas, periods, apostrophes, and hyphens!"
            : language === "si"
            ? "ග්‍රාම නිලධාරි කොට්ඨාසය 3-100 අක්ෂර අතර විය යුතු අතර, අකුරු, අංක, අවකාශ, කොමා, නිවැරදි, අපොස්ට්‍රෝෆ් සහ හැයිෆන් ඇතුළත් කළ හැක!"
            : "கிராம நிலதாரி பிரிவு 3-100 எழுத்துகளுக்கு இடையில் இருக்க வேண்டும் மற்றும் எழுத்துகள், எண்கள், இடைவெளிகள், கோமாஸ், புள்ளிகள், அபோஸ்ட்ரோஃபிகள் மற்றும் டாஷ்களை உள்ளடக்கலாம்!",
          },
    ],
    divisionalSecretaryDivision: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the Divisional Secretary Division!"
            : language === "si"
          ? "කරුණාකර ප්‍රාදේශීය ලේකම් කොට්ඨාසය ඇතුළත් කරන්න!"
          : "தயவுசெய்து பிரிவு செயலாளர் பிரிவை உள்ளிடவும்!",
      },
      {
        pattern: /^[A-Za-z\s]{2,50}$/,
        message:
          language === "en"
            ? "Divisional Secretary Division must be 3-100 characters and can include letters, numbers, spaces, commas, periods, apostrophes, and hyphens!"
            : language === "si"
            ? "ප්‍රාදේශීය ලේකම් කොට්ඨාසය 3-100 අක්ෂර අතර විය යුතු අතර, අකුරු, අංක, අවකාශ, කොමා, නිවැරදි, අපොස්ට්‍රෝෆ් සහ හැයිෆන් ඇතුළත් කළ හැක!"
            : "பிரிவு செயலாளர் பிரிவு 3-100 எழுத்துகளுக்கு இடையில் இருக்க வேண்டும் மற்றும் எழுத்துகள், எண்கள், இடைவெளிகள், கோமாஸ், புள்ளிகள், அபோஸ்ட்ரோஃபிகள் மற்றும் டாஷ்களை உள்ளடக்கலாம்!",
          },
    ],
    administrativeDistrict: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the Administrative District!"
            : language === "si"
          ? "කරුණාකර පරිපාලන දිස්ත්‍රික්කය ඇතුළත් කරන්න!"
          : "தயவுசெய்து நிர்வாக மாவட்டத்தை உள்ளிடவும்!",
      },
      {
        pattern: /^[A-Za-z\s]{2,50}$/,
        message:
          language === "en"
            ? "Administrative District must be 3-100 characters and can include letters, numbers, spaces, commas, periods, apostrophes, and hyphens!"
            : language === "si"
            ? "පරිපාලන දිස්ත්‍රික්කය 3-100 අක්ෂර අතර විය යුතු අතර, අකුරු, අංක, අවකාශ, කොමා, නිවැරදි, අපොස්ට්‍රෝෆ් සහ හැයිෆන් ඇතුළත් කළ හැක!"
            : "நிர்வாக மாவட்டம் 3-100 எழுத்துகளுக்கு இடையில் இருக்க வேண்டும் மற்றும் எழுத்துகள், எண்கள், இடைவெளிகள், கோமாஸ், புள்ளிகள், அபோஸ்ட்ரோஃபிகள் மற்றும் டாஷ்களை உள்ளடக்கலாம்!",
          },
    ],


    capacity: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the capacity!"
            : language === "si"
          ? "කරුණාකර කිවුබ්ස් ගණන ඇතුළත් කරන්න!"
          : "தயவுசெய்து கொள்ளளவை உள்ளிடவும்!",
      },
      {
        pattern: /^\d+$/,
        message:
          language === "en"
            ? "Capacity must be a positive integer!"
            : language === "si"
          ? "කිවුබ්ස් ගණන ධනාත්මක පූර්ණ සංඛ්‍යාවක් විය යුතුයි!"
          : "கொள்ளளவு நேர்மறை முழு எண்ணாக இருக்க வேண்டும்!",
      },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.resolve();
          }
          const number = Number(value);
          if (isNaN(number)) {
            return Promise.reject(
              language === "en"
                ? "Capacity must be a number!"
                : language === "si"
                ? "කියුබ්ස් ගණන සංඛ්‍යායකි!"
                : "கொள்ளளவு ஒரு எண்ணாக இருக்க வேண்டும்!"
            );
          }
          if (number < 1) {
            return Promise.reject(
              language === "en"
                ? "Capacity must be at least 1!"
                : language === "si"
                ? "කියුබ්ස් ගණන අවම වශයෙන් 1 ක් විය යුතුයි!"
                : "கொள்ளளவு குறைந்தது 1 ஆக இருக்க வேண்டும்!"
            );
          }
          return Promise.resolve();
        },
      },
    ],
    validityStart: [
      {
        required: true,
        message:
          language === "en"
            ? "Please select the start date!"
            : language === "si"
          ? "කරුණාකර ආරම්භක දිනය තෝරන්න!"
          : "தயவுசெய்து தொடக்க தேதியை தேர்ந்தெடுக்கவும்!",
      },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.resolve();
          }
          if (value.isBefore(new Date(), "day")) {
            return Promise.reject(
              language === "en"
                ? "Start date cannot be in the past!"
                : language === "si"
                ? "ආරම්භක දිනය අතීතයේ නොවිය යුතුයි!"
                : "தொடக்க தேதி கடந்த காலத்தில் இருக்க முடியாது!"
            );
          }
          return Promise.resolve();
        },
      },
    ],
    endDate: [
      {
        required: true,
        message:
          language === "en"
            ? "Please select the end date!"
            : language === "si"
          ? "කරුණාකර අවසාන දිනය තෝරන්න!"
          : "தயவுசெய்து இறுதி தேதியை தேர்ந்தெடுக்கவும்!",
      },
      // The custom validator for endDate will be handled in the form component
    ],
    location: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the location!"
            : language === "si"
            ? "කරුණාකර ස්ථානය ඇතුළත් කරන්න!"
            : "தயவுசெய்து இருப்பிடத்தை உள்ளிடவும்!",
      },
      {
        pattern: /^[A-Za-z0-9\s,.'-]{3,100}$/,
        message:
          language === "en"
            ? "Location must be 3-100 characters and can include letters, numbers, spaces, commas, periods, apostrophes, and hyphens!"
            : language === "si"
        ? "ස්ථානය 3-100 අක්ෂර අතර විය යුතු අතර, අකුරු, අංක, අවකාශ, කොමා, නිවැරදි, අපොස්ට්‍රෝෆ් සහ හැයිෆන් ඇතුළත් කළ හැක!"
        : "இருப்பிடம் 3-100 எழுத்துகளுக்கு இடையில் இருக்க வேண்டும் மற்றும் எழுத்துகள், எண்கள், இடைவெளிகள், காற்புள்ளிகள், முற்றுப்புள்ளிகள், அபோஸ்ட்ரோஃபிகள் மற்றும் டாஷ்களை உள்ளடக்கலாம்!",
      },
    ],
  });
  
  export default getValidationRules;
  