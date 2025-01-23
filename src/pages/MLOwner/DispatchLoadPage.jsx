import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Input,
  Row,
  Col,
  Typography,
  Modal,
  AutoComplete,
  DatePicker,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IoIosDoneAll } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

const { Content } = Layout;
const { Title } = Typography;

const DispatchLoadPage = () => {
  const uRLlocation = useLocation();
  const [l_number, setl_number] = useState("");

  useEffect(() => {
    const pathSegments = uRLlocation.pathname.split("/");
    setl_number(pathSegments.slice(-3).join("/"));
  }, [uRLlocation]);

  const resetFormdata = () => {
    setIsModalVisible(false);
    setFormData({
      DateTime: "",
      licenseNumber: l_number,
      destination: "",
      lorryNumber: "",
      driverContact: "",
      dueDate: "",
      cubes: 1,
    });
  };

  console.log(l_number);
  {
    /*_---------------User______*/
  }
  const user_Details = JSON.parse(localStorage.getItem("USER")) || {};
  const apiKey = localStorage.getItem("API_Key");
  console.log("user", user_Details.lastname);
  console.log("mee", apiKey);
  const userf_name = user_Details.firstname;
  const userl_name = user_Details.lastname;
  const user_name = userf_name + " " + userl_name;
  console.log("mee", user_name);

  const { language } = useLanguage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isErrModalVisible, setIsErrModalVisible] = useState(false);
  const [isProErrModalVisible, setIsProErrModalVisible] = useState(false);
  const [isContErrModalVisible, setIsContErrModalVisible] = useState(false);
  const [location, setLocation] = useState([6.9271, 79.8612]); // Default to Colombo coordinates
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  // const [mLId, setmId] = useState("");
  const [formData, setFormData] = useState({
    DateTime: "",
    licenseNumber: "",
    destination: "",
    lorryNumber: "",
    driverContact: "",
    dueDate: "",
    cubes: 1,
  });
  const [previousSearches, setPreviousSearches] = useState([]);
  const [issueData, setIssueData] = useState({
    project_id: 31,
    tracker_id: 8,
    status_id: 47,
    assigned_to_id: user_Details.id,
    subject: "TPL", //TPL0004
    due_date: "",
    custom_fields: [
      {
        id: 2,
        name: "Owner Name",
        value: user_name,
      },
      {
        id: 8,
        name: "License Number",
        value: "LLL/100/100",
      },
      {
        id: 11,
        name: "Location",
        value: "",
      },
      {
        id: 12,
        name: "Destination",
        value: "",
      },
      {
        id: 13,
        name: "Lorry Number",
        value: "",
      },
      {
        id: 14,
        name: "Driver Contact",
        value: "",
      },
      {
        id: 15,
        name: "Cubes",
        value: "",
      },
    ],
  });

  const navigate = useNavigate();

  // Load previous searches from localStorage when component mounts
  useEffect(() => {
    const savedSearches =
      JSON.parse(localStorage.getItem("previousSearches")) || [];
    setPreviousSearches(savedSearches);
  }, []);

  // Fetch location suggestions from Nominatim API, restricted to Sri Lanka
  const fetchLocationSuggestions = async (value) => {
    if (!value) {
      setLocationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&countrycodes=LK&limit=5`
      );

      const validSuggestions = response.data.filter((item) => {
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);
        return !isNaN(lat) && !isNaN(lon); // Only keep valid lat/lon values
      });

      setLocationSuggestions(
        validSuggestions.map((item) => ({
          value: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
        }))
      );
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setLocationSuggestions([]);
    }
  };

  // Handle selection of a location suggestion
  const handleLocationSelect = (value, option) => {
    const { lat, lon } = option;

    if (isNaN(lat) || isNaN(lon)) {
      console.error("Invalid lat/lon selected:", lat, lon);
      return;
    }

    setLocation([lat, lon]); // Update the map center (we won't show the map anymore)
    setFormData({ ...formData, destination: value }); // Set the destination field with the selected location

    // Update the previous searches in localStorage
    const updatedSearches = [
      value,
      ...previousSearches.filter((search) => search !== value),
    ];
    if (updatedSearches.length > 5) updatedSearches.pop(); // Limit to the last 5 searches
    setPreviousSearches(updatedSearches);
    localStorage.setItem("previousSearches", JSON.stringify(updatedSearches)); // Save to localStorage
  };

  const handleLorryNumberChange = (e) => {
    setFormData({ ...formData, lorryNumber: e.target.value });
  };

  const handleDriverContactChange = (e) => {
    setFormData({ ...formData, driverContact: e.target.value });
  };

  const handleDatetime = (e) => {
    setFormData({ ...formData, DateTime: e.target.value });
  };

  const handleCubesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setFormData({ ...formData, cubes: value });
    }
  };

  const incrementCubes = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      cubes: prevFormData.cubes + 1,
    }));
  };

  const decrementCubes = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      cubes: prevFormData.cubes > 1 ? prevFormData.cubes - 1 : 1,
    }));
  };

  const handleDueDateChange = (date, dateString) => {
    setFormData({ ...formData, dueDate: dateString });
    setIssueData((prevState) => ({
      ...prevState,
      due_date: dateString,
    }));
  };
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      licenseNumber: l_number,
    }));
  }, [l_number]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Trim the values before validation
    setIssueData({
      ...issueData,
      due_date: formData.dueDate, // Assign the new due_date value
    });

    // Log form data to check values
    console.log("Form data on submit:", formData);

    if (
      !formData.licenseNumber.trim() ||
      !formData.destination.trim() ||
      !formData.lorryNumber.trim() ||
      !formData.driverContact.trim() ||
      !formData.dueDate.trim()
    ) {
      // Log if validation fails
      console.log("One or more fields are empty!");
      setIsErrModalVisible(true);
    } else {
      // setFormData({ ...formData, DateTime: currentDateTime });

      try {
        // Replace with actual password

        // Fetch issues using axios
        const response = await axios.get("/api/projects/gsmb/issues.json", {
          headers: {
            "Content-Type": "application/json",
            "X-Redmine-API-Key": apiKey,
          },
          // auth: {
          //   username,
          //   password,
          // },
        });

        const issues = response.data.issues;
        console.log("Issues:", issues);

        // Find the issue by license number in custom_fields
        // const issueToUpdate = issues.find((issue) => {
        //   return (issue.custom_fields.some(
        //     (field) =>
        //       field.name === "License Number" &&
        //       field.value === formData.licenseNumber) && (issue.custom_fields.some(
        //         (field) =>
        //           field.name === "Royalty(sand)due"))
        //   );
        // });

        const issueToUpdate = issues.find((issue) => {
          return issue.subject === formData.licenseNumber;
        });
        // Find the issue by license number in custom_fields
        // const issueToUpdate = issues.find((issue) => {
        //   return issue.subject === formData.licenseNumber;
        // });

        if (issueToUpdate) {
          console.log("Issue to update:", issueToUpdate);
          // Update the cubes used and remaining cubes
          const cubesField = issueToUpdate.custom_fields.find(
            (field) => field.name === "Remaining"
          );
          console.log("Cubes field:", cubesField);
          if (cubesField) {
            console.log("Cubes field 1");
            // Update the "Used" field (usually Custom Fields 84 for "Used")
            const usedField =
              issueToUpdate.custom_fields.find(
                (field) => field.name === "Used"
              ) || 0;
            const remainingField = issueToUpdate.custom_fields.find(
              (field) => field.name === "Remaining"
            );
            const royaltysanddueField = issueToUpdate.custom_fields.find(
              (field) => field.name === "Royalty(sand)due"
            );
            const locateField = issueToUpdate.custom_fields.find(
              (field) => field.name === "Location"
            );

            const licenseNumberFeild = issueData.custom_fields.find(
              (field) => field.name === "License Number"
            );

            const destinationField = issueData.custom_fields.find(
              (field) => field.name === "Destination"
            );

            const lorryNumberField = issueData.custom_fields.find(
              (field) => field.name === "Lorry Number"
            );

            const driverContactField = issueData.custom_fields.find(
              (field) => field.name === "Driver Contact"
            );

            const cubesField = issueData.custom_fields.find(
              (field) => field.name === "Cubes"
            );
            const locateField1 = issueData.custom_fields.find(
              (field) => field.name === "Location"
            );

            const mLissueId = issueToUpdate.id;
            const locatvalue = locateField.value;
            // setmId(mLissueId);

            const cubesUsed = parseInt(formData.cubes, 10);
            const usedValue = parseInt(usedField ? usedField.value : "0", 10);
            const remainingValue = parseInt(
              remainingField ? remainingField.value : "0",
              10
            );
            const royaltysanddueValue = parseInt(
              royaltysanddueField ? royaltysanddueField.value : "0",
              10
            );

            console.log("Cubes used:", cubesUsed);
            console.log("Used value:", usedValue);
            console.log("Remaining value:", remainingValue);

            // Increment the used value and adjust the remaining value
            usedField.value = (usedValue + cubesUsed).toString();
            remainingField.value = (remainingValue - cubesUsed).toString();
            royaltysanddueField.value = (
              royaltysanddueValue -
              cubesUsed * 100
            ).toString();
            licenseNumberFeild.value = formData.licenseNumber;
            destinationField.value = formData.destination;
            lorryNumberField.value = formData.lorryNumber;
            driverContactField.value = formData.driverContact;
            cubesField.value = formData.cubes;
            locateField1.value = locatvalue;

            console.log("Updated fields:", usedField, remainingField);

            // Also update the cubes used in the "Cubes" field
            // cubesField.value = formData.cubes;
            console.log("Updated issue:", issueToUpdate);

            // PUT request to update the issues with new data
            if (cubesUsed > remainingValue) {
              setIsContErrModalVisible(true);
            } else {
              try {
                await axios.put(
                  `/api/issues/${mLissueId}.json`,
                  {
                    issue: issueToUpdate, // Pass the actual issue object here
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "X-Redmine-API-Key":
                        "fb4b68f17ce654c1123a5fcf031de4b560999296",
                    },
                    // auth: {
                    //   username,
                    //   password,
                    // },
                  }
                );
                try {
                  await axios.post(
                    `/api/issues.json`,
                    {
                      issue: issueData, // Pass the actual issue object here
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        "X-Redmine-API-Key": apiKey,
                      },
                      // auth: {
                      //   username,
                      //   password,
                      // },
                    }
                  );
                } catch (error) {
                  console.error("Error updating issue:", error);
                  setIsProErrModalVisible(true); // Show error modal on any API request failure
                }
              } catch (error) {
                console.error("Error updating issue:", error);
                setIsProErrModalVisible(true); // Show error modal on any API request failure
              }
              setIsModalVisible(true); // Show success modal if the issue is updated successfully
            }
          }
        } else {
          console.error(
            "Issue not found for license number",
            formData.licenseNumber
          );
          setIsProErrModalVisible(true); // Show error modal if the issue is not found
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
        setIsProErrModalVisible(true); // Show error modal on any API request failure
      }
    }
  };

  const handlePrintReceipt = () => {
    navigate("/mlowner/home/dispatchload/receipt", {
      state: { formData, l_number },
    });
  };

  const handleBackToHome = () => {
    navigate("/mlowner/home");
  };

  const handleCancel = () => {
    navigate("/mlowner/home");
  };

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const licenseNumber = queryParams.get("licenseNumber"); // Adjust the key if needed
  //   if (licenseNumber) {
  //     setFormData((prevData) => ({ ...prevData, licenseNumber }));
  //   }
  // }, [location.search]);

  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString(); // Formats: "MM/DD/YYYY, HH:MM:SS AM/PM"
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime(); // Call initially

    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          {language === "en"
            ? "Dispatch Your Load Here"
            : language === "si"
            ? "යැවිය යුතු ප්‍රමාණ පිළිබඳ මෙහි සටහන් කරන්න"
            : "உங்கள் சுமையை இங்கே அனுப்பவும்"}
        </Title>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
                {language === "en"
                  ? "DATE & TIME:"
                  : language === "si"
                  ? "දිනය සහ වේලාව:"
                  : "தேதி & நேரம்:"}
              </span>
              <Input
                value={currentDateTime}
                onChange={handleDatetime}
                disabled
              />
            </div>
          </Col>
        </Row>

        {/* License Number Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
                {language === "en"
                  ? "LICENSE NUMBER:"
                  : language === "si"
                  ? "බලපත්‍ර අංකය:"
                  : "உரிம எண்:"}
              </span>
              <Input value={l_number} style={{ width: "100%" }} required />
            </div>
          </Col>
        </Row>

        {/* Destination Input with Search Options */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
                {language === "en"
                  ? "DESTINATION:"
                  : language === "si"
                  ? "ගමනාන්තය:"
                  : "சேருமிடம்:"}
              </span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <SearchOutlined style={{ marginRight: "8px" }} />
                <AutoComplete
                  value={formData.destination}
                  onChange={(value) => {
                    setFormData({ ...formData, destination: value });
                    fetchLocationSuggestions(value); // Fetch suggestions on change
                  }}
                  onSelect={handleLocationSelect}
                  style={{ width: "100%" }}
                  options={locationSuggestions.map((item) => ({
                    value: item.value,
                    label: item.value,
                  }))}
                >
                  <AutoComplete.Option
                    value={formData.destination}
                    key={formData.destination}
                  >
                    {formData.destination}
                  </AutoComplete.Option>
                </AutoComplete>
              </div>
            </div>
          </Col>
        </Row>

        {/* Lorry Number Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
                {language === "en"
                  ? "LORRY NUMBER:"
                  : language === "si"
                  ? "ලොරි අංකය:"
                  : "லாரி எண்:"}
              </span>
              <Input
                value={formData.lorryNumber}
                onChange={handleLorryNumberChange}
                style={{ width: "100%" }}
              />
            </div>
          </Col>
        </Row>

        {/* Driver Contact Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
                {language === "en"
                  ? "DRIVER CONTACT:"
                  : language === "si"
                  ? "රියදුරුගේ දුරකථන අංකය:"
                  : "ஓட்டுனர் தொடர்பு:"}
              </span>
              <Input
                value={formData.driverContact}
                onChange={handleDriverContactChange}
                style={{ width: "100%" }}
              />
            </div>
          </Col>
        </Row>

        {/* Due Date Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
                {language === "en"
                  ? "DUE DATE:"
                  : language === "si"
                  ? "නියමිත දිනය:"
                  : "இறுதி தேதி::"}
              </span>
              <DatePicker
                value={formData.dueDate ? dayjs(formData.dueDate) : null}
                onChange={(date, dateString) => {
                  handleDueDateChange(date, dateString);
                }}
                style={{ width: "100%" }}
                required
              />
            </div>
          </Col>
        </Row>

        {/* Cubes Input with Increment and Decrement Buttons */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
                {language === "en"
                  ? "CUBES:"
                  : language === "si"
                  ? "කියුබ් ගණන:"
                  : "க்யூப்ஸ்:"}
              </span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={decrementCubes}
                  style={{ marginRight: "8px" }}
                  disabled={formData.cubes <= 1}
                >
                  -
                </Button>
                <Input
                  value={formData.cubes}
                  onChange={handleCubesChange}
                  style={{ width: "60px", textAlign: "center" }}
                />
                <Button onClick={incrementCubes} style={{ marginLeft: "8px" }}>
                  +
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Submit and Cancel Buttons */}
        <Row gutter={16} justify="center">
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              type="primary"
              onClick={handleCancel}
              danger
              style={{
                marginRight: "16px",
                fontSize: "16px",
                padding: "10px 20px",
                backgroundColor: "#FFA500", // Cancel button color (orange)
                borderColor: "#FFA500",
                color: "white",
              }}
              size="large"
            >
              {language === "en"
                ? "Cancel"
                : language === "si"
                ? "අවලංගු කරන්න"
                : "ரத்து செய்"}
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{
                fontSize: "16px",
                padding: "10px 20px",
                backgroundColor: "#781424", // Submit button color (dark red)
                borderColor: "#781424",
                color: "white",
              }}
              size="large"
            >
              {language === "en"
                ? "Submit"
                : language === "si"
                ? "සටහන් කරන්න"
                : "சமர்ப்பிக்கவும்"}
            </Button>
          </Col>
        </Row>

        {/* Success Modal */}
        <Modal
          visible={isModalVisible}
          onCancel={() => resetFormdata()}
          footer={null}
          style={{ textAlign: "center" }}
          bodyStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <div style={{ fontSize: "40px", color: "brown" }}>
            <IoIosDoneAll />
          </div>
          <p>
            {language === "en"
              ? "Dispatched Successfully!"
              : language === "si"
              ? "සාර්ථකයි!"
              : "வெற்றிகரமாக அனுப்பப்பட்டது!"}
          </p>
          <Button
            type="primary"
            onClick={handleBackToHome}
            style={{
              backgroundColor: "#FFA500",
              color: "white",
              borderColor: "#FFA500",
              marginRight: "20px",
            }}
          >
            {language === "en"
              ? "Back to Home"
              : language === "si"
              ? "ආපසු"
              : "முகப்புக்குத் திரும்பு"}
          </Button>

          <Button
            type="default"
            onClick={handlePrintReceipt}
            style={{
              backgroundColor: "#781424",
              color: "white",
              marginLeft: "20px",
            }}
          >
            {language === "en"
              ? "Print Receipt"
              : language === "si"
              ? "රිසිට් පත මුද්‍රණය කරන්න"
              : "அச்சு ரசீது"}
          </Button>
        </Modal>

        {/* unSuccess Modal */}
        <Modal
          visible={isProErrModalVisible}
          onCancel={() => setIsProErrModalVisible(false)}
          footer={null}
          style={{ textAlign: "center" }}
          bodyStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <div style={{ fontSize: "40px", color: "brown" }}>
            <IoIosCloseCircle />
          </div>
          <p>
            {language === "en"
              ? "Dispatched Unsuccessfully!"
              : language === "si"
              ? "අසාර්ථකයි!"
              : "அனுப்பப்பட்டது தோல்வி!"}
          </p>
        </Modal>

        {/*req Error Modal */}
        <Modal
          visible={isErrModalVisible}
          onCancel={() => setIsErrModalVisible(false)}
          footer={null}
          style={{ textAlign: "center" }}
          bodyStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <div style={{ fontSize: "40px", color: "brown" }}>
            <IoIosCloseCircle />
          </div>
          <h3>
            {language === "en"
              ? "All field are required !"
              : language === "si"
              ? "සියලුම ක්ෂේත්ර අවශ්ය වේ !"
              : "அனைத்து துறைகளும் தேவை!"}
          </h3>
        </Modal>

        {/*cube re Error Modal */}
        <Modal
          visible={isContErrModalVisible}
          onCancel={() => setIsContErrModalVisible(false)}
          footer={null}
          style={{ textAlign: "center" }}
          bodyStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <div style={{ fontSize: "40px", color: "brown" }}>
            <IoIosCloseCircle />
          </div>
          <h3>
            {language === "en"
              ? `Not enough cubes available. Please adjust the quantity.`
              : language === "si"
              ? "්අවශ්‍ය ප්‍රමාණය නොමැත. ප්‍රමාණය වෙනස් කරන්න්."
              : "போதுமான க்யூப்ஸ் கிடைக்கவில்லை. அளவை சரிசெய்யவும்."}
          </h3>
        </Modal>
      </Content>
    </Layout>
  );
};

export default DispatchLoadPage;
