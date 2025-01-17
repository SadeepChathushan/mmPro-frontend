import React from "react";
import { Button, Typography } from "antd";
import "antd/dist/reset.css";
import Navbar from "../components/layout/Navbar";
import logo from "../assets/images/gsmbLogo.jpg";
import HomeFooter from "../components/layout/HomeFooter";

const { Text } = Typography;

const Home = () => {
  return (
    
    <div
    
      className="container"
      style={{
        // display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <Navbar />
      {/* Left Section */}
      <div
        className ="left-section" 
        style={{
          width: "50%",
          padding: "50px 60px",
          textAlign: "left",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            marginBottom: "15px",
            color: "#59252D",
            fontWeight: "bold",
          }}
        >
          WELCOME
        </h2>
        <h2
          style={{
            fontSize: "36px",
            color: "#59252D",
            fontWeight: "bold",
          }}
        >
          ආයුබෝවන්
        </h2>
        <h2
          style={{
            fontSize: "36px",
            marginBottom: "20px",
            color: "#59252D",
            fontWeight: "bold",
          }}
        >
          வரவேற்கிறேன்
        </h2>
        <Text
          style={{
            marginBottom: "15px",
            color: "#59252D",
            fontSize: "18px",
            lineHeight: "1.6",
          }}
        >
          Your trusted partner in managing natural resources and supporting<br></br>
          economic growth. We are the main authority in Sri Lanka for minerals
          and geology, ensuring the safe and responsible use of the country's
          valuable resources while protecting the environment.<br></br>
        </Text>
        <Text
          style={{
            marginBottom: "15px",
            color: "#59252D",
            fontSize: "18px",
            lineHeight: "1.6",
          }}
        >
          <br></br>ස්වභාවික සම්පත් කළමනාකරණය කිරීමේදී සහ ආර්ථික වර්ධනයට සහාය වීමේදී
          ඔබේ විශ්වාසවන්ත සහකරු. පරිසරය ආරක්ෂා කරමින් රටේ වටිනා සම්පත්
          ආරක්ෂිතව සහ වගකීමෙන් යුතුව භාවිතා කිරීම සහතික කරමින්, ඛනිජ සහ භූ
          විද්‍යාව සඳහා ශ්‍රී ලංකාවේ ප්‍රධාන අධිකාරිය අපි වෙමු.<br></br>
        </Text>

        <Text
          style={{
            color: "#59252D",
            fontSize: "18px",
            lineHeight: "1.6",
          }}
        >
         <br></br> இயற்கை வளங்களை நிர்வகிப்பதற்கும் பொருளாதார வளர்ச்சிக்கு
          ஆதரவளிப்பதற்கும் உங்களின் நம்பகமான பங்குதாரர். சுற்றாடலைப்
          பாதுகாக்கும் அதே வேளையில் நாட்டின் பெறுமதிமிக்க வளங்களைப்
          பாதுகாப்பாகவும் பொறுப்புடனும் பயன்படுத்துவதை உறுதிசெய்து,
          கனிமங்கள் மற்றும் புவியியலுக்கான இலங்கையின் பிரதான அதிகாரியாக
          நாங்கள் இருக்கிறோம்.<br></br>
        </Text>
      </div>

      {/* Right Section */}
      <div
        className="right-section"
        style={{
          position: "relative",
          width: "50%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Fullscreen Image */}
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain", // Updated to better match the image display
          }}
        />
        {/* Top-right "Get Started" Button */}
        <Button
      
          type="primary"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "#781424",
            borderColor: "#781424",
            color: "#ffffff",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px", // Slightly rounded corners for a cleaner look
          }}
        >
          GET STARTED
        </Button>
     
        
        </div>
        {/* <HomeFooter/> */}
    </div>
    
    
    
  );
};

export default Home;
