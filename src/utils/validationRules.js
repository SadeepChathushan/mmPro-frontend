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
            : "කරුණාකර අවසරපත්‍ර අංකය ඇතුළත් කරන්න!",
      },
      {
        pattern: /^[A-Z0-9-]{5,20}$/,
        message:
          language === "en"
            ? "License number must be 5-20 characters, containing uppercase letters, numbers, and hyphens!"
            : "බලපත්‍ර අංකය 5-20 අක්ෂර අතර විය යුතු අතර, මහා අකුරු, අංක සහ හැයිෆන් ඇතුළත් කළ යුතුයි!",
      },
    ],
    ownerName: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the owner name!"
            : "කරුණාකර අයිතිකරුගේ නම ඇතුළත් කරන්න!",
      },
      {
        pattern: /^[A-Za-z\s.'-]{3,50}$/,
        message:
          language === "en"
            ? "Owner name must be 3-50 characters and can include letters, spaces, apostrophes, periods, and hyphens!"
            : "අයිතිකරුගේ නම 3-50 අක්ෂර අතර විය යුතු අතර, අකුරු, අවකාශ, අපොස්ට්‍රෝෆ්, නිවැරදි සහ හැයිෆන් ඇතුළත් කළ හැක!",
      },
    ],
    mobile: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the mobile number!"
            : "කරුණාකර ජංගම දුරකථන අංකය ඇතුළත් කරන්න!",
      },
      {
        pattern: /^\d{10}$/,
        message:
          language === "en"
            ? "Please enter a valid 10-digit mobile number!"
            : "කරුණාකර වලංගු 10 අංක ජංගම දුරකථන අංකයක් ඇතුළත් කරන්න!",
      },
    ],
    capacity: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the capacity!"
            : "කරුණාකර කියුබ්ස් ගණන ඇතුළත් කරන්න!",
      },
      {
        pattern: /^\d+$/,
        message:
          language === "en"
            ? "Capacity must be a positive integer!"
            : "කියුබ්ස් ගණන ධනාත්මක පූර්ණ සංඛ්‍යාවක් විය යුතුයි!",
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
                : "කියුබ්ස් ගණන සංඛ්‍යායකි!"
            );
          }
          if (number < 1) {
            return Promise.reject(
              language === "en"
                ? "Capacity must be at least 1!"
                : "කියුබ්ස් ගණන අවම වශයෙන් 1 ක් විය යුතුයි!"
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
            : "කරුණාකර ආරම්භක දිනය තෝරන්න!",
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
                : "ආරම්භක දිනය අතීතයේ නොවිය යුතුයි!"
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
            : "කරුණාකර අවසාන දිනය තෝරන්න!",
      },
      // The custom validator for endDate will be handled in the form component
    ],
    location: [
      {
        required: true,
        message:
          language === "en"
            ? "Please input the location!"
            : "කරුණාකර ස්ථානය ඇතුළත් කරන්න!",
      },
      {
        pattern: /^[A-Za-z0-9\s,.'-]{3,100}$/,
        message:
          language === "en"
            ? "Location must be 3-100 characters and can include letters, numbers, spaces, commas, periods, apostrophes, and hyphens!"
            : "ස්ථානය 3-100 අක්ෂර අතර විය යුතු අතර, අකුරු, අංක, අවකාශ, කොමා, නිවැරදි, අපොස්ට්‍රෝෆ් සහ හැයිෆන් ඇතුළත් කළ හැක!",
      },
    ],
  });
  
  export default getValidationRules;
  