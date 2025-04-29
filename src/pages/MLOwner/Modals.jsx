import React from "react";
import { Modal, Button } from "antd";
import { IoIosDoneAll, IoIosCloseCircle } from "react-icons/io";

const Modals = ({
  isModalVisible,
  resetFormdata,
  handleBackToHome,
  handlePrintReceipt,
  language,
  isProErrModalVisible,
  setIsProErrModalVisible,
  isErrModalVisible,
  setIsErrModalVisible,
  isContErrModalVisible,
  setIsContErrModalVisible,
  isLoyalErrModalVisible,
  setIsLoyalErrModalVisible,
}) => {
  return (
    <>
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
            : "ரசீதை அச்சிடுக"}
        </Button>
      </Modal>

      {/* Unsuccess Modal */}
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

      {/* Field Error Modal */}
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
            ? "All fields are required!"
            : language === "si"
            ? "සියලුම ක්ෂේත්ර අවශ්ය වේ !"
            : "அனைத்து துறைகளும் தேவை!"}
        </h3>
      </Modal>

      {/* Cube Availability Error Modal */}
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
            ? "අවශ්‍ය ප්‍රමාණය නොමැත. ප්‍රමාණය වෙනස් කරන්න්."
            : "போதுமான கன சதுரங்கள் கிடைக்கவில்லை. அளவை சரிசெய்யவும்."}
        </h3>
      </Modal>

      {/* Loyalty Error Modal */}
      <Modal
        visible={isLoyalErrModalVisible}
        onCancel={() => setIsLoyalErrModalVisible(false)}
        footer={null}
        style={{ textAlign: "center" }}
        bodyStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      >
        <div style={{ fontSize: "40px", color: "brown" }}>
          <IoIosCloseCircle />
        </div>
        <h3>
          {language === "en"
            ? `Not enough`
            : language === "si"
            ? "ප්‍රමාණය ප්‍රමාණවත් නොවේ"
            : "போதுமானது இல்லை"}
        </h3>
      </Modal>
    </>
  );
};

export default Modals;
