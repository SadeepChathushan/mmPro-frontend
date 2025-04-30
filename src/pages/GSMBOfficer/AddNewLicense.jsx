import React, { useState, useEffect } from "react"; // <-- Import useState here
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  Upload,
  DatePicker,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import "../../styles/MLOwner/MLRequest.css";
import { useParams, useLocation } from "react-router-dom"; //addNewLicense
import { addNewLicense } from "../../services/officerService";

const { Option } = Select;

const districtData = {
  Ampara: [
    "Ampara",
    "Kalmunai",
    "Sainthamaruthu",
    "Pottuvil",
    "Dehiattakandiya",
    "Mahaoya",
    "Uhana",
    "Damana",
    "Thirukkovil",
    "Navithanveli",
    "Alayadiwembu",
    "Addalachchenai",
    "Akkaraipattu",
    "Nintavur",
    "Sammanthurai",
  ],
  Anuradhapura: [
    "Anuradhapura",
    "Kekirawa",
    "Medawachchiya",
    "Talawa",
    "Mihintale",
    "Nochchiyagama",
    "Padaviya",
    "Kahatagasdigiliya",
    "Galnewa",
    "Palagala",
    "Rambewa",
    "Thirappane",
    "Ipalogama",
    "Horowpothana",
  ],
  Badulla: [
    "Badulla",
    "Bandarawela",
    "Hali-Ela",
    "Welimada",
    "Mahiyanganaya",
    "Passara",
    "Kandaketiya",
    "Meegahakivula",
    "Rideemaliyadda",
    "Haputale",
    "Ella",
    "Soranathota",
    "Uva Paranagama",
    "Diyatalawa",
  ],
  Batticaloa: [
    "Batticaloa",
    "Kattankudy",
    "Eravur",
    "Valaichchenai",
    "Manmunai North",
    "Manmunai West",
    "Manmunai South-West",
    "Manmunai South",
    "Porativu Pattu",
    "Koralai Pattu",
    "Koralai Pattu North",
  ],
  Colombo: [
    "Colombo",
    "Dehiwala",
    "Moratuwa",
    "Sri Jayawardenepura Kotte",
    "Kaduwela",
    "Homagama",
    "Maharagama",
    "Kesbewa",
    "Boralesgamuwa",
    "Avissawella",
    "Seethawaka",
    "Padukka",
    "Ratmalana",
    "Kolonnawa",
  ],
  Galle: [
    "Galle",
    "Ambalangoda",
    "Hikkaduwa",
    "Bentota",
    "Karandeniya",
    "Elpitiya",
    "Baddegama",
    "Neluwa",
    "Nagoda",
    "Bope-Poddala",
    "Yakkalamulla",
    "Imaduwa",
    "Thawalama",
    "Akmeemana",
  ],
  Gampaha: [
    "Gampaha",
    "Negombo",
    "Kelaniya",
    "Wattala",
    "Ja-Ela",
    "Minuwangoda",
    "Divulapitiya",
    "Mirigama",
    "Attanagalla",
    "Dompe",
    "Biyagama",
    "Katana",
    "Mahara",
    "Veyangoda",
  ],
  Hambantota: [
    "Hambantota",
    "Tangalle",
    "Ambalantota",
    "Tissamaharama",
    "Beliatta",
    "Lunugamvehera",
    "Weeraketiya",
    "Angunakolapelessa",
    "Okewela",
    "Sooriyawewa",
    "Katuwana",
    "Walasmulla",
  ],
  Jaffna: [
    "Jaffna",
    "Nallur",
    "Chavakachcheri",
    "Point Pedro",
    "Karainagar",
    "Island North",
    "Island South",
    "Thenmaradchi",
    "Vadamaradchi North",
    "Vadamaradchi South-West",
    "Vadamaradchi East",
    "Delft",
  ],
  Kalutara: [
    "Kalutara",
    "Panadura",
    "Horana",
    "Matugama",
    "Beruwala",
    "Dodangoda",
    "Bulathsinhala",
    "Millaniya",
    "Madurawala",
    "Bandaragama",
    "Agalawatta",
    "Palindanuwara",
    "Ingiriya",
    "Walallavita",
  ],
  Kandy: [
    "Kandy",
    "Katugastota",
    "Peradeniya",
    "Gampola",
    "Kundasale",
    "Akurana",
    "Harispattuwa",
    "Pathadumbara",
    "Udunuwara",
    "Yatinuwara",
    "Udapalatha",
    "Minipe",
    "Hatharaliyadda",
    "Galagedara",
    "Panvila",
  ],
  Kegalle: [
    "Kegalle",
    "Mawanella",
    "Warakapola",
    "Rambukkana",
    "Ruwanwella",
    "Dehiowita",
    "Deraniyagala",
    "Galigamuwa",
    "Aranayaka",
    "Yatiyanthota",
    "Bulathkohupitiya",
  ],
  Kilinochchi: [
    "Kilinochchi",
    "Kandavalai",
    "Karachchi",
    "Poonakary",
    "Pallai",
  ],
  Kurunegala: [
    "Kurunegala",
    "Kuliyapitiya",
    "Pannala",
    "Polgahawela",
    "Narammala",
    "Alawwa",
    "Bingiriya",
    "Wariyapola",
    "Ganewatta",
    "Giribawa",
    "Mawathagama",
    "Kobeigane",
    "Nikaweratiya",
    "Rasnayakapura",
    "Ibbagamuwa",
  ],
  Mannar: ["Mannar", "Nanaddan", "Madhu", "Musali", "Manthai West"],
  Matale: [
    "Matale",
    "Dambulla",
    "Galewela",
    "Naula",
    "Pallepola",
    "Rattota",
    "Yatawatta",
    "Laggala-Pallegama",
    "Wilgamuwa",
    "Ukuwela",
  ],
  Matara: [
    "Matara",
    "Weligama",
    "Dikwella",
    "Hakmana",
    "Akuressa",
    "Kamburupitiya",
    "Devinuwara",
    "Kotapola",
    "Malimbada",
    "Thihagoda",
    "Pasgoda",
    "Athuraliya",
    "Mulatiyana",
    "Kirinda-Puhulwella",
  ],
  Monaragala: [
    "Monaragala",
    "Wellawaya",
    "Bibile",
    "Buttala",
    "Katharagama",
    "Madulla",
    "Sevanagala",
    "Siyambalanduwa",
    "Thanamalwila",
    "Badalkumbura",
    "Medagama",
  ],
  Mullaitivu: [
    "Mullaitivu",
    "Oddusuddan",
    "Puthukudiyiruppu",
    "Thunukkai",
    "Manthai East",
    "Maritimepattu",
    "Welioya",
  ],
  "Nuwara Eliya": [
    "Nuwara Eliya",
    "Hatton",
    "Talawakele",
    "Lindula",
    "Kotmale",
    "Walapane",
    "Hanguranketha",
    "Ambagamuwa",
    "Maskeliya",
    "Norton Bridge",
  ],
  Polonnaruwa: [
    "Polonnaruwa",
    "Hingurakgoda",
    "Medirigiriya",
    "Lankapura",
    "Thamankaduwa",
    "Elahera",
    "Dimbulagala",
    "Welikanda",
    "Kaduruwela",
  ],
  Puttalam: [
    "Puttalam",
    "Chilaw",
    "Wennappuwa",
    "Nattandiya",
    "Dankotuwa",
    "Arachchikattuwa",
    "Mahakumbukkadawala",
    "Kalpitiya",
    "Vanathavilluwa",
    "Karuwalagaswewa",
    "Pallama",
    "Mundalama",
    "Anamaduwa",
    "Gomarankadawala",
  ],
  Ratnapura: [
    "Ratnapura",
    "Balangoda",
    "Embilipitiya",
    "Pelmadulla",
    "Eheliyagoda",
    "Kuruwita",
    "Nivithigala",
    "Kahawatta",
    "Godakawela",
    "Ayagama",
    "Kalawana",
    "Weligepola",
    "Opanayaka",
    "Elapatha",
    "Kolonna",
  ],
  Trincomalee: [
    "Trincomalee",
    "Kinniya",
    "Kuchchaveli",
    "Gomarankadawala",
    "Kantalai",
    "Morawewa",
    "Seruvila",
    "Thambalagamuwa",
    "Muttur",
    "Verugal",
    "Padavi Sri Pura",
  ],
  Vavuniya: [
    "Vavuniya",
    "Vavuniya North",
    "Vengalacheddikulam",
    "Cheddikulam",
    "Vavuniya South",
  ],
};

const AddNewLicense = () => {
  const { id } = useParams();
  const location = useLocation();
  const ownerId = id || location.state?.ownerId;
  const { language } = useLanguage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Now useState is defined
  const [divisions, setDivisions] = useState([]);

  const handleDistrictChange = (value) => {
    setDivisions(districtData[value] || []);
    form.setFieldsValue({ divisional_secretary_division: undefined }); // Reset division when district changes
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e && e.fileList) {
      return e.fileList;
    }
    return e;
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("subject", `Mining License  - ${ownerId}`);
      formData.append("assignee_id", ownerId);
      formData.append("status_id", 7);
      formData.append("author", ownerId);
      formData.append("exploration_licence_no", values.exploration_nb || "");
      formData.append("land_name", values.land_name);
      formData.append("land_owner_name", values.land_owner_name);
      formData.append("village_name", values.village_name);
      formData.append("grama_niladhari_division", values.grama_niladari);
      formData.append(
        "divisional_secretary_division",
        values.divisional_secretary_division
      );
      formData.append("administrative_district", values.district);
      formData.append("google_location", values.land_google);
      formData.append(
        "start_date",
        values.start_date ? values.start_date.format("YYYY-MM-DD") : ""
      );
      formData.append(
        "due_date",
        values.end_date ? values.end_date.format("YYYY-MM-DD") : ""
      );

      formData.append("capacity", values.full_capacity || "");
      formData.append("used", values.used || "");
      formData.append("remaining", values.remaining || "");
      formData.append("month_capacity", values.monthly_capacity || "");
      formData.append(
        "mining_license_number",
        values.mining_license_number || ""
      );
      formData.append("royalty", "5000");

      // Append files safely checking they exist
      if (
        values.detailed_mine_plan &&
        values.detailed_mine_plan.length > 0 &&
        values.detailed_mine_plan[0].originFileObj
      ) {
        formData.append(
          "detailed_mine_restoration_plan",
          values.detailed_mine_plan[0].originFileObj
        );
      }
      if (
        values.payment_receipt &&
        values.payment_receipt.length > 0 &&
        values.payment_receipt[0].originFileObj
      ) {
        formData.append(
          "payment_receipt",
          values.payment_receipt[0].originFileObj
        );
      }
      if (
        values.Deed_plan &&
        values.Deed_plan.length > 0 &&
        values.Deed_plan[0].originFileObj
      ) {
        formData.append(
          "deed_and_survey_plan",
          values.Deed_plan[0].originFileObj
        );
      }

      // Call the service with FormData
      const result = await addNewLicense(formData);
      console.log("Result from addNewLicense:", result); // Log the result for debugging

      if (result) {
        message.success("Mining Licenses successfully submitted!");
        form.resetFields();
      } else {
        message.error(
          "Submission failed. Please check the details and try again."
        );
      }
    } catch (error) {
      console.error("Mining Licenses  Error:", error);
      // Provide more specific error feedback if possible
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Mining Licenses Error. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false); // Ensure loading is always set to false afterwards
    }
  };

  // --- Translations (Keep as is) ---
  const translations = {
    en: {
      title: "Industrial Mining License Application",
      section1: "Exploration License Details",
      section2: "Individual Applicant Information",
      section3: "Corporation Information",
      section4: "Technical/Professional Data",
      section5: "Mining Operation Details",
      section6: "License Area Details",
      section7: "Mine Restoration Plan",
      section8: "Bond Information",
      section9: "Minerals to be Mined",
      section10: "License Fee",
      submitText: "Add License",
      // Form labels
      explorationLicenseNo: "Exploration Licence No: (where applicable)",
      applicantName: "Name of Applicant / Authorized Agent",
      nicNo: "National Identity Card No",
      address: "Address",
      nationality: "Nationality",
      employment: "Employment and Name of employer",
      inSriLanka: "In Sri Lanka:",
      businessPlace: "Place of Business",
      residence: "Residence",
      companyName: "Name of Company / Partnership",
      incorporationCountry: "Country of Incorporation",
      headOffice: "Head Office/Principal place of Business",
      companyAddress: "In Sri Lanka - Address of Registered Company / Agent",
      legalFinancial: "Legal/Financial Data:",
      capitalization: "Capitalization",
      articlesOfAssociation: "Articles of Association (attach)",
      annualReports: "Last three years Annual Reports (attach)",
      landName: "Name of Land (attach copy of Deed and Survey Plan)",
      land_google: "Land Google Location",
      landFile: "Attach copy of Deed and Survey Plan",
      landOwner:
        "Land owners' name (if not owned by applicant, attach lease Agreement or an affidavit)",
      villageName: "Name of village",
      gramaNiladhari: "Grama Niladhari Division",
      divisionalSecretary: "Divisional Secretary's Division",
      district: "Administrative District",
      restorationPlan: "Detailed Mine Restoration Plan (attach)",
      bondNature: "Nature of amount of bound (if any)",
      minerals: "Names of Mineral/Minerals to be mined",
      licenseFee: "Licence fee receipt (attach)",
      declaration:
        "I, the undersigned, do hereby certify that the statements contained in this application are true and correct to the best of my knowledge and undertake to comply with the provisions the Mines & Minerals Act, No. 33 of 1992, and the Regulation made thereunder.",
      date: "Date",
      signature: "Signature",
      mineManager: "Mine Manager",
      startDate: "Start Date",
      endDate: "Due Date",
      full: "Royalty Percentage",
      capacity: "Capacity(cubes)",
      full_capacity: "Full Capacity",
      monthly_capacity: "Monthly Capacity",
      used: "Used Capacity",
      remaining: "Remaining Capacity",
      mining_license_number: "Mining License Number",
    },
    si: {
      title: "කාර්මික ගල්පර්වත අයදුම්පත",
      section1: "ගවේෂණ බලපත්‍ර විස්තර",
      section2: "පුද්ගල අයදුම්කරුගේ තොරතුරු",
      section3: "ක cooperate ය විස්තර",
      section4: "තාක්ෂණික/වෘත්තීය දත්ත",
      section5: "ගල්පර්වත කටයුතු විස්තර",
      section6: "බලපත්‍ර ප්‍රදේශයේ විස්තර",
      section7: "ගල්පර්වත ප්‍රතිසංස්කරණ සැලැස්ම",
      section8: "බන්ධනය පිළිබඳ තොරතුරු",
      section9: "පතිත ලෝහ/ඛනිජ",
      section10: "බලපත්‍ර ගාස්තුව",
      submitText: "අයදුම්පත ඉදිරිපත් කරන්න",
      // Form labels
      explorationLicenseNo: "ගවේෂණ බලපත්‍ර අංකය: (අදාළ විට)",
      applicantName: "අයදුම්කරුගේ / අනුමත අනුශාසකයාගේ නම",
      nicNo: "ජාතික හැඳුනුම්පත් අංකය",
      address: "ලිපිනය",
      nationality: "ජාතිකත්වය",
      employment: "රැකියාව සහ රැකියායෝජකයාගේ නම",
      inSriLanka: "ශ්‍රී ලංකාවේ:",
      businessPlace: "ව්‍යාපාරික ස්ථානය",
      residence: "නිවහන",
      companyName: "කම්පනිය / සහකරුවන්ගේ නම",
      incorporationCountry: "සමාගම ලියාපදිංචි කළ රට",
      headOffice: "ප්‍රධාන කාර්යාලය/ප්‍රධාන ව්‍යාපාරික ස්ථානය",
      companyAddress: "ශ්‍රී ලංකාවේ - ලියාපදිංචි සමාගම / අනුශාසකයාගේ ලිපිනය",
      legalFinancial: "නෛතික/මූල්ය දත්ත:",
      capitalization: "මූල්යකරණය",
      articlesOfAssociation: "සමාගම් ආඥා පත්‍ර (ඇමුණුම)",
      annualReports: "පසුගිය අවුරුදු තුනේ වාර්ෂික වාර්තා (ඇමුණුම)",
      landName: "ඉඩමේ නම (බලය පත සහ සර්වේ යෝජනා ක්‍රමයේ පිටපත් ඇමුණුම)",
      landOwner:
        "ඉඩමේ හිමිකරුගේ නම (අයදුම්කරුට අයත් නොවේ නම්, බදු ගිවිසුම හෝ සාක්ෂි පත්‍රය ඇමුණුම)",
      villageName: "ගමේ නම",
      gramaNiladhari: "ග්‍රාම නිලධාරී වසම",
      divisionalSecretary: "අංශක සංග්‍රහක වසම",
      district: "පරිපාලන දිස්ත්‍රික්කය",
      restorationPlan: "ගල්පර්වත ප්‍රතිසංස්කරණ සැලැස්ම (විස්තරාත්මක) (ඇමුණුම)",
      bondNature: "බන්ධනයේ ස්වභාවය සහ ප්‍රමාණය (ඇත්නම්)",
      minerals: "පතිත කිරීමට අදහස් කරන ලෝහ/ඛනිජ නම්",
      licenseFee: "බලපත්‍ර ගාස්තු රිසිට්පත (ඇමුණුම)",
      declaration:
        "මම, පහත අත්සන් කිරීමෙන්, මෙම අයදුම්පතේ අඩංගු ප්‍රකාශ සත්‍ය හා නිවැරදි බව සහතික කරමි. තවද 1992 අංක 33 දරන ගල්පර්වත හා ඛනිජ පනතේ විධිවිධාන සහ ඒ යටතේ තනන ලද නියමාවලි අනුකූලව කටයුතු කිරීමට බැඳී සිටිමි.",
      date: "දිනය",
      signature: "අත්සන",
      mineManager: "ගල්පර්වත කළමනාකරු",
      startDate: "ආරම්භක දිනය",
      endDate: "අවසන් දිනය",
      royalty: "රාජකාරී ප්‍රතිශතය",
      capacity: "ධාරිතාව",
    },
    ta: {
      title: "தொழிற்சாலை சுரங்க உரிமம் விண்ணப்பம்",
      section1: "ஆய்வு உரிமம் விவரங்கள்",
      section2: "தனிப்பட்ட விண்ணப்பதாரர் தகவல்",
      section3: "நிறுவன தகவல்",
      section4: "தொழில்நுட்ப/தொழில்முறை தரவு",
      section5: "சுரங்க செயல்பாடு விவரங்கள்",
      section6: "உரிமைப் பகுதி விவரங்கள்",
      section7: "சுரங்க மீட்புத் திட்டம்",
      section8: "பிணை தகவல்",
      section9: "சுரங்கம் செய்ய வேண்டிய கனிமங்கள்",
      section10: "உரிமை கட்டணம்",
      submitText: "விண்ணப்பத்தை சமர்ப்பிக்கவும்",
      // Form labels
      explorationLicenseNo: "ஆய்வு உரிமம் எண்: (பொருந்தும் இடத்தில்)",
      applicantName: "விண்ணப்பதாரர் / அங்கீகரிக்கப்பட்ட முகவர் பெயர்",
      nicNo: "தேசிய அடையாள அட்டை எண்",
      address: "முகவரி",
      nationality: "தேசியம்",
      employment: "வேலைவாய்ப்பு மற்றும் முதலாளி பெயர்",
      inSriLanka: "இலங்கையில்:",
      businessPlace: "வணிக இடம்",
      residence: "வசிப்பிடம்",
      companyName: "நிறுவனம் / கூட்டு வணிகத்தின் பெயர்",
      incorporationCountry: "நிறுவனம் பதிவு செய்யப்பட்ட நாடு",
      headOffice: "தலைமையகம் / முதன்மை வணிக இடம்",
      companyAddress: "இலங்கையில் - பதிவு செய்யப்பட்ட நிறுவனம் / முகவர் முகவரி",
      legalFinancial: "சட்ட / நிதி தரவு:",
      capitalization: "மூலதனமயமாக்கல்",
      articlesOfAssociation: "நிறுவன விதிமுறைகள் (இணைப்பு)",
      annualReports: "கடந்த மூன்று ஆண்டுகளின் வருடாந்திர அறிக்கைகள் (இணைப்பு)",
      landName:
        "நிலத்தின் பெயர் (உரிமைப் பத்திரம் மற்றும் அளவீட்டுத் திட்டத்தின் நகல் இணைப்பு)",
      landOwner:
        "நில உரிமையாளர் பெயர் (விண்ணப்பதாரருக்கு சொந்தமில்லை என்றால், குத்தகை ஒப்பந்தம் அல்லது உறுதிமொழி பத்திரம் இணைப்பு)",
      villageName: "கிராமத்தின் பெயர்",
      gramaNiladhari: "கிராம நிலாதாரி பிரிவு",
      divisionalSecretary: "பிரிவு செயலாளர் பிரிவு",
      district: "நிர்வாக மாவட்டம்",
      restorationPlan: "விரிவான சுரங்க மீட்புத் திட்டம் (இணைப்பு)",
      bondNature: "பிணையத்தின் தன்மை மற்றும் தொகை (ஏதேனும் இருந்தால்)",
      minerals: "சுரங்கம் செய்ய வேண்டிய கனிமங்களின் பெயர்கள்",
      licenseFee: "உரிமை கட்டண ரசீது (இணைப்பு)",
      declaration:
        "நான், கீழே கையொப்பமிட்டவர், இந்த விண்ணப்பத்தில் உள்ள அறிக்கைகள் உண்மை மற்றும் சரியானவை என்பதை உறுதிப்படுத்துகிறேன். மேலும் 1992 இலங்கை சுரங்கம் மற்றும் கனிமங்கள் சட்டம் மற்றும் அதன் கீழ் உருவாக்கப்பட்ட விதிமுறைகளுக்கு இணங்க நடந்து கொள்வேன் என உறுதியளிக்கிறேன்.",
      date: "தேதி",
      signature: "கையெழுத்து",
      mineManager: "சுரங்க மேலாளர்",
      startDate: "தொடக்க தேதி",
      endDate: "முடிவு தேதி",
      royalty: "ராயல்டி சதவீதம்",
      capacity: "திறன்",
    },
  };

  const currentTranslations = translations[language] || translations["en"];

  return (
    <Card title={currentTranslations.title} className="mining-license-form">
      {/* Add required fields validation */}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Page 1 */}
        <h3>{currentTranslations.section1}</h3>
        <Form.Item
          label={currentTranslations.explorationLicenseNo}
          name="exploration_nb"
        >
          <Input
          // placeholder={ /* Placeholder text */ }
          />
        </Form.Item>

        {/* Commented sections */}

        {/* Page 2 */}
        <h3>{currentTranslations.section6}</h3>
        <Form.Item
          label={currentTranslations.landName}
          name="land_name"
          rules={[{ required: true, message: "Please input the land name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={currentTranslations.landFile}
          name="Deed_plan"
          valuePropName="fileList"
          getValueFromEvent={normFile} // Use helper function
          rules={[
            { required: true, message: "Please upload the Deed/Survey Plan!" },
          ]}
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label={currentTranslations.land_google}
          name="land_google"
          rules={[
            { required: true, message: "Please input the Google Maps link!" },
            {
              type: "url",
              warningOnly: true,
              message: "Please enter a valid URL (e.g., https://maps...)",
            },
          ]}
        >
          <Input placeholder="e.g., https://maps.app.goo.gl/..." />
        </Form.Item>

        <Form.Item
          label={currentTranslations.landOwner}
          name="land_owner_name"
          rules={[
            { required: true, message: "Please input the land owner name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              label={currentTranslations.villageName}
              name="village_name"
              rules={[
                { required: true, message: "Please input the village name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label={currentTranslations.gramaNiladhari}
              name="grama_niladari"
              rules={[
                {
                  required: true,
                  message: "Please input the Grama Niladhari Division!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>

            <Form.Item
              label={currentTranslations.district}
              name="district"
              rules={[{ required: true, message: "Please select the district!" }]}
            >
              <Select placeholder="Select district" onChange={handleDistrictChange}>
                {Object.keys(districtData).map((district) => (
                  <Option key={district} value={district}>
                    {district}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={currentTranslations.divisionalSecretary}
          name="divisional_secretary_division"
          rules={[
            { required: true, message: "Please select the division!" },
          ]}
        >
          <Select
            placeholder="Select division"
            disabled={!divisions.length}
          >
            {divisions.map((division) => (
              <Option key={division} value={division}>
                {division}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={currentTranslations.restorationPlan}
          name="detailed_mine_plan"
          valuePropName="fileList"
          getValueFromEvent={normFile} // Use helper function
          rules={[
            {
              required: true,
              message: "Please upload the Detailed Mine Plan!",
            },
          ]}
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>

        {/* Commented sections */}

        {/* <Form.Item
          label={currentTranslations.licenseFee}
          name="payment_receipt"
          valuePropName="fileList"
          getValueFromEvent={normFile} // Use helper function
          rules={[
            { required: true, message: "Please upload the payment receipt!" },
          ]}
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item> */}

        <Form.Item
          label={currentTranslations.mining_license_number}
          name="mining_license_number"
          rules={[
            {
              required: true,
              message: "Please input the mining license number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={currentTranslations.startDate}
              name="start_date"
              rules={[{ required: true, message: "Please select start date!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={currentTranslations.endDate}
              name="end_date"
              rules={[{ required: true, message: "Please select end date!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={currentTranslations.full_capacity}
              name="full_capacity"
              rules={[
                { required: true, message: "Please input  full capacity!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={currentTranslations.monthly_capacity}
              name="monthly_capacity"
              rules={[
                { required: true, message: "Please input monthly capacity !" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={currentTranslations.used}
              name="used"
              rules={[{ required: true, message: "Please input  Used!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={currentTranslations.remaining}
              name="remaining"
              rules={[{ required: true, message: "Please input Remaining !" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        {/* Commented sections */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            disabled={loading}
          >
            {loading ? "Submitting..." : currentTranslations.submitText}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddNewLicense;
