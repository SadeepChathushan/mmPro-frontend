import axios from "axios";
import config from "../config";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const fetchLorryNumber = async () => {
//     try {
//         const apiKey = config.getPublicUserApiKey();
//         const response = await axios.get('/api/projects/gsmb/issues.json', {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Redmine-API-Key': apiKey,
//             },
//         });

//         return response.data.issues.map((issue) => ({
//             vehicleNumber: issue.custom_fields.find((field) => field.name === 'Lorry Number')?.value,
//         }));
//     } catch (error) {
//         console.error('Error fetching lorry numbers:', error);
//         return [];
//     }
// };

export const handleCheckService = async (
  input,
  language,
  setModalMessage,
  setIsModalOpen
) => {
  try {
    const result = await axios
      .get(`${BASE_URL}/general-public/validate-lorry-number`, {
        params: { lorry_number: input.trim() },
      })
      .then((response) => response.data)
      .catch((error) => {
        if (error.response?.status === 401) {
          throw new Error("Unauthorized - Invalid token");
        } else {
          throw new Error("API request failed");
        }
      });

    setModalMessage(
      result.valid
        ? language === "en"
          ? "Valid Load"
          : language === "si"
          ? "වලංගු පැටවීමකි"
          : "சரியான ஏற்றுதல்"
        : language === "en"
        ? "Invalid Load"
        : language === "si"
        ? "අනවසර පැටවීමකි"
        : "தவறான சுமை"
    );
  } catch (error) {
    console.error("Validation error:", error);
    setModalMessage(
      error.message.includes("Unauthorized")
        ? language === "en"
          ? "Session expired, please login again"
          : language === "si"
          ? "සැසිය කල් ඉකුත් වී ඇත, නැවත ලොග් වන්න"
          : "அமர்வு காலாவதியானது, மீண்டும் உள்நுழையவும்"
        : language === "en"
        ? "Error validating vehicle number"
        : language === "si"
        ? "වාහන අංකය සත්‍යාපනය කිරීමේ දෝෂයක්"
        : "வாகன எண்ணை சரிபார்க்கும் பிழை"
    );
  }

  setIsModalOpen(true);
};
