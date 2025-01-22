import React from "react";
import { Layout, Row, Col, Typography, Image } from "antd";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useLanguage } from "../contexts/LanguageContext";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
  const { language } = useLanguage();
  return (
    <Layout>
      <Navbar />
      <Content className="h-hero-content"
      >
        <Title level={2} style={{ color: "#fff" }}>
          WELCOME
        </Title>
      </Content>

      <div id="about">
        <Title className="h-about-title"
          level={4}
          style={{
            color: "#781424",
            fontSize: "24px",
          }}
        >
          {language === "en" ? "ABOUT" : language === "si" ? "පිළිබඳ" : "பற்றி"}
          <p
            style={{
              fontSize: "12px",
              fontFamily: "inherit",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            {language === "en"
              ? "monitors mining and mineral production, ensuring efficiency and compliance for GSMB."
              : language === "si"
              ? "පතල් කැණීම් සහ ඛනිජ නිශ්පාදනය නිරීක්ෂණය කරයි, GSMB සඳහා කාර්යක්ෂමතාව සහ අනුකූලතාවය සහතික කරයි."
              : "சுரங்கம் மற்றும் கனிம உற்பத்தியை கண்காணிக்கிறது, GSMB க்கான செயல்திறன் மற்றும் இணக்கத்தை உறுதி செய்கிறது."}
          </p>
        </Title>

        <div className="h-about-content"
        >
          <div className="h-about-img-div"
          >
            <Image
              src="https://img.freepik.com/free-photo/engineer-helmet-standing-by-factory_1157-35548.jpg?t=st=1737099796~exp=1737103396~hmac=301b1c2d5d08182cf62e5e4e95be749448747bcdb66253dde0cc4d6616c71922&w=996"
              alt="About mmPro"
              style={{
                height: "auto",
                width: "100%",
                padding: "20px",
              }}
            />
          </div>
          <div className="h-about-content-div"
          >
            <Paragraph className="h-paragraph" style={language === "ta" ? { fontSize: "11px" } : {}}>
              {language === "en"
                ? "mmPro is an advanced solution designed specifically for the Geological Survey and Mines Bureau (GSMB) to transform how mining and mineral production are managed. Leveraging cutting-edge technology, mmPro provides real-time monitoring, precise data collection, and actionable insights to streamline operations and improve decision-making. It ensures GSMB has complete oversight of mining activities, enabling greater efficiency and accuracy in resource management while reducing operational bottlenecks."
                : language === "si"
                ? "mmPro යනු පතල් කැණීම් සහ ඛනිජ නිෂ්පාදනය කළමනාකරණය කරන ආකාරය පරිවර්තනය කිරීම සඳහා භූ විද්‍යා සමීක්ෂණ හා පතල් කාර්යාංශය (GSMB) සඳහා විශේෂයෙන් නිර්මාණය කර ඇති උසස් විසඳුමකි. අති නවීන තාක්‍ෂණය උපයෝගී කර ගනිමින්, mmPro මෙහෙයුම් විධිමත් කිරීමට සහ තීරණ ගැනීම වැඩිදියුණු කිරීමට තත්‍ය කාලීන නිරීක්‍ෂණය, නිරවද්‍ය දත්ත රැස් කිරීම සහ ක්‍රියාකාරී අවබෝධය සපයයි. එය GSMB හට පතල් කැණීම් කටයුතු පිළිබඳ පූර්ණ අධීක්‍ෂණයක් ඇති බව සහතික කරයි, මෙහෙයුම් බාධක අඩු කරන අතරම සම්පත් කළමනාකරණයේ වැඩි කාර්යක්ෂමතාවයක් සහ නිරවද්‍යතාවයක් ඇති කරයි."
                : "mmPro என்பது புவியியல் ஆய்வு மற்றும் சுரங்கப் பணியகம் (GSMB) சுரங்கம் மற்றும் கனிம உற்பத்தி எவ்வாறு நிர்வகிக்கப்படுகிறது என்பதை மாற்றியமைக்க வடிவமைக்கப்பட்ட ஒரு மேம்பட்ட தீர்வாகும். அதிநவீன தொழில்நுட்பத்தை மேம்படுத்துவதன் மூலம், mmPro நிகழ்நேர கண்காணிப்பு, துல்லியமான தரவு சேகரிப்பு மற்றும் செயல்பாடுகளை நெறிப்படுத்தவும் முடிவெடுப்பதை மேம்படுத்தவும் செயல்படக்கூடிய நுண்ணறிவுகளை வழங்குகிறது. சுரங்க நடவடிக்கைகளின் முழுமையான மேற்பார்வையை GSMB உறுதிப்படுத்துகிறது, மேலும் செயல்பாட்டுத் தடைகளைக் குறைக்கும் அதே வேளையில் வள நிர்வாகத்தில் அதிக செயல்திறன் மற்றும் துல்லியத்தை செயல்படுத்துகிறது."}
            </Paragraph>
            <Paragraph className="h-paragraph" style={language === "ta" ? { fontSize: "11px" } : {}}>
              {language === "en"
                ? "With sustainability and compliance at its core, mmPro empowers GSMB to meet regulatory requirements, enforce industry standards, and promote environmentally responsible mining practices. Its intuitive and user-friendly interface, combined with customizable dashboards, ensures a seamless experience for users across various roles. By bridging the gap between technology and resource management, mmPro not only enhances transparency and productivity but also establishes a foundation for long-term sustainability in the mining industry."
                : language === "si"
                ? "තිරසාරත්වය සහ අනුකූලතාවය එහි හරය සමඟින්, නියාමන අවශ්‍යතා සපුරාලීමට, කර්මාන්ත ප්‍රමිතීන් බලාත්මක කිරීමට සහ පාරිසරික වශයෙන් වගකිව යුතු පතල් කැණීම් ප්‍රවර්ධනය කිරීමට mmPro GSMB වෙත බලය ලබා දෙයි. එහි බුද්ධිමය සහ පරිශීලක-හිතකාමී අතුරුමුහුණත, අභිරුචිකරණය කළ හැකි උපකරණ පුවරු සමඟ ඒකාබද්ධව, විවිධ භූමිකාවන් හරහා පරිශීලකයින්ට බාධාවකින් තොර අත්දැකීමක් සහතික කරයි. තාක්‍ෂණය සහ සම්පත් කළමනාකරණය අතර පරතරය පියවීමෙන්, mmPro විනිවිදභාවය සහ ඵලදායිතාව වැඩි දියුණු කරනවා පමණක් නොව පතල් කර්මාන්තයේ දිගුකාලීන තිරසාරභාවය සඳහා පදනමක් ද ස්ථාපිත කරයි."
                : "அதன் மையத்தில் நிலைத்தன்மை மற்றும் இணக்கத்துடன், எம்எம்பிரோ, ஜிஎஸ்எம்பிக்கு ஒழுங்குமுறைத் தேவைகளைப் பூர்த்தி செய்யவும், தொழில் தரங்களைச் செயல்படுத்தவும், சுற்றுச்சூழலுக்குப் பொறுப்பான சுரங்க நடைமுறைகளை மேம்படுத்தவும் உதவுகிறது. அதன் உள்ளுணர்வு மற்றும் பயனர் நட்பு இடைமுகம், தனிப்பயனாக்கக்கூடிய டாஷ்போர்டுகளுடன் இணைந்து, பல்வேறு பாத்திரங்களில் பயனர்களுக்கு தடையற்ற அனுபவத்தை உறுதி செய்கிறது. தொழில்நுட்பம் மற்றும் வள மேலாண்மைக்கு இடையே உள்ள இடைவெளியைக் குறைப்பதன் மூலம், mmPro வெளிப்படைத்தன்மை மற்றும் உற்பத்தித்திறனை அதிகரிப்பது மட்டுமல்லாமல், சுரங்கத் தொழிலில் நீண்டகால நிலைத்தன்மைக்கான அடித்தளத்தையும் நிறுவுகிறது."}
            </Paragraph>
            <Paragraph className="h-paragraph" style={language === "ta" ? { fontSize: "11px" } : {}}>
              {language === "en"
                ? "Whether it's tracking resource extraction, generating detailed reports, or facilitating collaboration across teams, mmPro is the ultimate tool to modernize and optimize mining operations. With mmPro, GSMB can confidently lead the mining sector into a future that balances innovation, productivity, and environmental stewardship."
                : language === "si"
                ? "එය සම්පත් නිස්සාරණය ලුහුබැඳීම, සවිස්තරාත්මක වාර්තා උත්පාදනය කිරීම හෝ කණ්ඩායම් හරහා සහයෝගීතාවයට පහසුකම් සැලසීම වේවා, mmPro යනු පතල් කැණීම් මෙහෙයුම් නවීකරණය කිරීමට සහ ප්‍රශස්ත කිරීමට ඇති අවසාන මෙවලමයි. mmPro සමඟින්, GSMB හට පතල් ක්ෂේත්‍රය නව්‍යකරණය, ඵලදායිතාව සහ පාරිසරික භාරකාරත්වය තුලනය කරන අනාගතයකට විශ්වාසයෙන් යුතුව ගෙන යා හැක."
                : "இது ஆதாரங்களை பிரித்தெடுத்தல் கண்காணிப்பு, விரிவான அறிக்கைகளை உருவாக்குதல் அல்லது குழுக்கள் முழுவதும் ஒத்துழைப்பை எளிதாக்குவது என எதுவாக இருந்தாலும், சுரங்க நடவடிக்கைகளை மேம்படுத்துவதற்கும் மேம்படுத்துவதற்கும் mmPro இறுதி கருவியாகும். mmPro உடன், GSMB ஆனது சுரங்கத் துறையை நம்பிக்கையுடன் புதுமை, உற்பத்தித்திறன் மற்றும் சுற்றுச்சூழல் பொறுப்புணர்வு ஆகியவற்றை சமநிலைப்படுத்தும் எதிர்காலத்திற்கு இட்டுச் செல்லும்."}
            </Paragraph>
          </div>
        </div>
      </div>

      <div id="service">
        <Title
          level={4}
          style={{
            marginTop: "20px",
            color: "#781424",
            textAlign: "center",
            fontSize: "24px",
          }}
        >
          {language === "en" ? "SERVICE" : language === "si" ? "සේවාව" : "சேவை"}
          <p
            style={{
              fontSize: "12px",
              fontFamily: "inherit",
              marginTop: "5px",
            }}
          >
            {language === "en"
              ? "Explore how mmPro supports mining and mineral production management."
              : language === "si"
              ? "mmPro පතල් කැණීම් සහ ඛනිජ නිෂ්පාදන කළමනාකරණයට සහාය වන ආකාරය ගවේෂණය කරන්න."
              : "சுரங்க மற்றும் கனிம உற்பத்தி நிர்வாகத்தை mmPro எவ்வாறு ஆதரிக்கிறது என்பதை ஆராயுங்கள்."}
          </p>
        </Title>
        {/* <P> Explore how mmPro supports mining and mineral production management.</P> */}

        <div className="h-about-content"
        >
          <div className="h-about-content-div"
          >
            <Paragraph className="h-paragraph" style={language === "ta" ? { fontSize: "11px" } : {}}>
              {language === "en"
                ? "mmPro delivers a robust suite of services tailored to meet the unique demands of the mining and mineral production sector. Our real-time monitoring feature allows the Geological Survey and Mines Bureau (GSMB) to track mining activities and production levels with precision, ensuring efficient oversight of operations. This system enhances transparency by providing instant updates, helping to identify issues early and improve overall operational performance."
                : language === "si"
                ? "mmPro පතල් හා ඛනිජ නිෂ්පාදන අංශයේ අද්විතීය ඉල්ලීම් සපුරාලීම සඳහා සකස් කරන ලද ශක්තිමත් සේවා කට්ටලයක් සපයයි. අපගේ තත්‍ය කාලීන අධීක්ෂණ විශේෂාංගය මඟින් භූ විද්‍යා සමීක්ෂණ සහ පතල් කාර්යාංශයට (GSMB) පතල් කැණීම් කටයුතු සහ නිෂ්පාදන මට්ටම් නිරවද්‍යතාවයෙන් නිරීක්ෂණය කිරීමට ඉඩ සලසයි, මෙහෙයුම්වල කාර්යක්ෂම අධීක්ෂණය සහතික කරයි. මෙම පද්ධතිය ක්ෂණික යාවත්කාලීන ලබා දීමෙන් විනිවිදභාවය වැඩි දියුණු කරයි, ගැටළු කලින් හඳුනා ගැනීමට සහ සමස්ත මෙහෙයුම් කාර්ය සාධනය වැඩි දියුණු කිරීමට උපකාරී වේ."
                : "mmPro சுரங்க மற்றும் கனிம உற்பத்தி துறையின் தனித்துவமான தேவைகளை பூர்த்தி செய்ய வடிவமைக்கப்பட்ட ஒரு வலுவான சேவைகளை வழங்குகிறது. எங்களின் நிகழ்நேர கண்காணிப்பு அம்சமானது, புவியியல் ஆய்வு மற்றும் சுரங்கப் பணியகத்தை (GSMB) சுரங்க நடவடிக்கைகள் மற்றும் உற்பத்தி நிலைகளை துல்லியமாக கண்காணிக்க அனுமதிக்கிறது, செயல்பாடுகளின் திறமையான மேற்பார்வையை உறுதி செய்கிறது. இந்த அமைப்பு உடனடி புதுப்பிப்புகளை வழங்குவதன் மூலம் வெளிப்படைத்தன்மையை மேம்படுத்துகிறது, சிக்கல்களை முன்கூட்டியே கண்டறிந்து ஒட்டுமொத்த செயல்பாட்டு செயல்திறனை மேம்படுத்த உதவுகிறது."}
            </Paragraph>
            <Paragraph className="h-paragraph" style={language === "ta" ? { fontSize: "11px" } : {}}>
              {language === "en"
                ? "Our advanced data analytics and reporting tools generate detailed insights into mining activities, enabling GSMB to make informed decisions and optimize production processes. From tracking resource extraction to analyzing production trends, these features ensure that every decision is backed by reliable data."
                : language === "si"
                ? "අපගේ උසස් දත්ත විශ්ලේෂණ සහ වාර්තාකරණ මෙවලම් කැණීම් කටයුතු පිළිබඳ සවිස්තරාත්මක අවබෝධයක් ජනනය කරයි, GSMB හට දැනුවත් තීරණ ගැනීමට සහ නිෂ්පාදන ක්‍රියාවලීන් ප්‍රශස්ත කිරීමට හැකි වේ. සම්පත් නිස්සාරණය ලුහුබැඳීමේ සිට නිෂ්පාදන ප්‍රවණතා විශ්ලේෂණය කිරීම දක්වා, මෙම විශේෂාංග සෑම තීරණයක්ම විශ්වාසදායක දත්ත මගින් අනුබල දෙන බව සහතික කරයි."
                : "பற்எங்கள் மேம்பட்ட தரவு பகுப்பாய்வு மற்றும் அறிக்கையிடல் கருவிகள் சுரங்க நடவடிக்கைகள் பற்றிய விரிவான நுண்ணறிவுகளை உருவாக்குகின்றன, தகவலறிந்த முடிவுகளை எடுக்கவும் உற்பத்தி செயல்முறைகளை மேம்படுத்தவும் GSMB ஐ செயல்படுத்துகிறது. ஆதாரங்களைப் பிரித்தெடுப்பதைக் கண்காணிப்பது முதல் உற்பத்திப் போக்குகளை பகுப்பாய்வு செய்வது வரை, இந்த அம்சங்கள் ஒவ்வொரு முடிவும் நம்பகமான தரவுகளால் ஆதரிக்கப்படுவதை உறுதி செய்கின்றன."}
            </Paragraph>
            <Paragraph className="h-paragraph" style={language === "ta" ? { fontSize: "11px" } : {}}>
              {language === "en"
                ? "In addition to operational benefits, mmPro supports regulatory compliance by ensuring all mining activities adhere to established industry standards. This not only promotes responsible resource management but also aligns with sustainability goals, helping GSMB balance productivity with environmental responsibility."
                : language === "si"
                ? "මෙහෙයුම් ප්‍රතිලාභවලට අමතරව, සියලුම පතල් කැණීම් කටයුතු ස්ථාපිත කර්මාන්ත ප්‍රමිතීන්ට අනුකූල වන බව සහතික කිරීම මගින් නියාමන අනුකූලතාවයට mmPro සහාය දක්වයි. මෙය වගකිවයුතු සම්පත් කළමනාකරණය ප්‍රවර්ධනය කරනවා පමණක් නොව තිරසාර ඉලක්ක සමඟ සමපාත වන අතර, GSMB ඵලදායිතාව පාරිසරික වගකීම සමඟ සමතුලිත කිරීමට උපකාරී වේ."
                : "செயல்பாட்டு நன்மைகளுக்கு கூடுதலாக, mmPro அனைத்து சுரங்க நடவடிக்கைகளும் நிறுவப்பட்ட தொழில் தரநிலைகளை கடைபிடிப்பதை உறுதி செய்வதன் மூலம் ஒழுங்குமுறை இணக்கத்தை ஆதரிக்கிறது. இது பொறுப்பான வள நிர்வாகத்தை ஊக்குவிப்பது மட்டுமல்லாமல், நிலைத்தன்மை இலக்குகளுடன் சீரமைக்கிறது, சுற்றுச்சூழல் பொறுப்புடன் GSMB உற்பத்தித்திறனை சமநிலைப்படுத்த உதவுகிறது."}
            </Paragraph>
            <Paragraph  className="h-paragraph" style={language === "ta" ? { fontSize: "11px" } : {}}>
              {language === "en"
                ? "To further enhance usability, mmPro provides customizable dashboards that allow users to tailor their experience to specific needs. Combined with user-friendly interfaces and ongoing training and support, mmPro ensures that GSMB staff can effectively manage mining operations with confidence and ease."
                : language === "si"
                ? "භාවිතයේ හැකියාව තව දුරටත් වැඩි දියුණු කිරීම සඳහා, mmPro විසින් පරිශීලකයින්ට ඔවුන්ගේ අත්දැකීම් නිශ්චිත අවශ්‍යතාවලට ගැලපෙන පරිදි සකස් කිරීමට ඉඩ සලසන අභිරුචිකරණය කළ හැකි උපකරණ පුවරු සපයයි. පරිශීලක-හිතකාමී අතුරුමුහුණත් සහ අඛණ්ඩ පුහුණුව සහ සහාය සමඟ ඒකාබද්ධව, GSMB කාර්ය මණ්ඩලයට විශ්වාසයෙන් සහ පහසුවෙන් පතල් කැණීම් මෙහෙයුම් ඵලදායි ලෙස කළමනාකරණය කළ හැකි බව mmPro සහතික කරයි."
                : "பயன்பாட்டினை மேலும் மேம்படுத்த, mmPro தனிப்பயனாக்கக்கூடிய டாஷ்போர்டுகளை வழங்குகிறது, இது பயனர்கள் தங்கள் அனுபவத்தை குறிப்பிட்ட தேவைகளுக்கு ஏற்ப மாற்ற அனுமதிக்கிறது. பயனர் நட்பு இடைமுகங்கள் மற்றும் தொடர்ந்து பயிற்சி மற்றும் ஆதரவுடன் இணைந்து, ஜிஎஸ்எம்பி ஊழியர்கள் நம்பிக்கையுடனும் எளிதாகவும் சுரங்க நடவடிக்கைகளை திறம்பட நிர்வகிக்க முடியும் என்பதை mmPro உறுதி செய்கிறது."}
            </Paragraph>
          </div>


          <div className="h-about-img-div">
            <Image
              src="https://img.freepik.com/free-photo/heavy-excavator-digging-day-light_23-2149194835.jpg?t=st=1737107358~exp=1737110958~hmac=fd65b47146397b1710edb5c1e319a156a5fcff697dcf6a52c0852be438f64f04&w=996"
              alt="Service mmPro"
              style={{ padding: "20px", height: "auto", width: "100%" }}
            />
          </div>
        </div>

                
                <Paragraph>
                mmPro delivers a robust suite of services tailored to meet the unique demands of the mining and mineral production sector. Our real-time monitoring feature allows the Geological Survey and Mines Bureau (GSMB) to track mining activities and production levels with precision, ensuring efficient oversight of operations. This system enhances transparency by providing instant updates, helping to identify issues early and improve overall operational performance.
                </Paragraph>
                <Paragraph>
                Our advanced data analytics and reporting tools generate detailed insights into mining activities, enabling GSMB to make informed decisions and optimize production processes. From tracking resource extraction to analyzing production trends, these features ensure that every decision is backed by reliable data.
                </Paragraph>
                <Paragraph>
                In addition to operational benefits, mmPro supports regulatory compliance by ensuring all mining activities adhere to established industry standards. This not only promotes responsible resource management but also aligns with sustainability goals, helping GSMB balance productivity with environmental responsibility.
                </Paragraph>
                <Paragraph>
                To further enhance usability, mmPro provides customizable dashboards that allow users to tailor their experience to specific needs. Combined with user-friendly interfaces and ongoing training and support, mmPro ensures that GSMB staff can effectively manage mining operations with confidence and ease.
                </Paragraph>
              </div>
        
            <div style={{ flex:'1', maxWidth:'50%' }}>
              <Image 
                src="https://img.freepik.com/free-photo/heavy-excavator-digging-day-light_23-2149194835.jpg?t=st=1737107358~exp=1737110958~hmac=fd65b47146397b1710edb5c1e319a156a5fcff697dcf6a52c0852be438f64f04&w=996" 
                alt="Service mmPro" 
                 
                style={{ marginRight: '20px', height:'auto' , width:'100%' }} 
              />
             
            </div>
            
         

            <Footer/>
      </Layout>
           

      
    
            );
};

export default Home;
