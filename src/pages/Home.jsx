import React from 'react';
import { Layout, Row, Col, Typography, Image } from 'antd';
import Navbar from '../components/layout/Navbar';
import HomeFooter from '../components/layout/HomeFooter';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <Layout>
      <Navbar />
      <Content style={{ 
        padding: '50px', 
        backgroundImage: `url("https://img.freepik.com/free-photo/wide-angle-shot-small-lake-surrounded-by-mountains-greenery-daytime_181624-9415.jpg?t=st=1737098936~exp=1737102536~hmac=c44152b4578ef1c49b4583b1321a02234c746e8d794cdc50eabd52c0f400dedf&w=996")`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '500px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Title level={2} style={{ color: '#fff' }}>WELCOME</Title>
      </Content>

      <Title level={4} style={{marginTop:'20px',marginBottom:'20px',textAlign:'center' , color:'#781424'}}>ABOUT mmPro
      <p style={{fontSize:'12px',fontFamily:'inherit', marginTop:'5px',marginBottom:'5px'}}>monitors mining and mineral production, ensuring efficiency and compliance for GSMB.</p>
      </Title>

      <div style={{ padding: '40px', 
         display:'flex',
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'space-between',
         width:'100%'
         }}>
        
            <div style={{ 
              flex:'1' , 
              maxWidth:'50%'
               }}>
              <Image 
                src="https://img.freepik.com/free-photo/engineer-helmet-standing-by-factory_1157-35548.jpg?t=st=1737099796~exp=1737103396~hmac=301b1c2d5d08182cf62e5e4e95be749448747bcdb66253dde0cc4d6616c71922&w=996" 
                alt="About mmPro" 
                 
                style={{ 
                    height:'auto' ,
                    width:'100%',
                    marginRight:'20px' 
                  }} 
              />
              </div>
              <div style={{
                flex:'1',
                maxWidth:'50%',
                justifyContent:'space-between',
                marginLeft:'30px'
              }}>
                
                <Paragraph >
                mmPro is an advanced solution designed specifically for the Geological Survey and Mines Bureau (GSMB) to transform how mining and mineral production are managed. Leveraging cutting-edge technology, mmPro provides real-time monitoring, precise data collection, and actionable insights to streamline operations and improve decision-making. It ensures GSMB has complete oversight of mining activities, enabling greater efficiency and accuracy in resource management while reducing operational bottlenecks.
                </Paragraph>
                <Paragraph>
                With sustainability and compliance at its core, mmPro empowers GSMB to meet regulatory requirements, enforce industry standards, and promote environmentally responsible mining practices. Its intuitive and user-friendly interface, combined with customizable dashboards, ensures a seamless experience for users across various roles. By bridging the gap between technology and resource management, mmPro not only enhances transparency and productivity but also establishes a foundation for long-term sustainability in the mining industry.
                </Paragraph>
                <Paragraph>
                Whether it's tracking resource extraction, generating detailed reports, or facilitating collaboration across teams, mmPro is the ultimate tool to modernize and optimize mining operations. With mmPro, GSMB can confidently lead the mining sector into a future that balances innovation, productivity, and environmental stewardship.
                </Paragraph>
              
            </div>
          
      </div>

      <Title level={4} style={{marginTop:'20px',marginBottom:'20px', color:'#781424',textAlign:'center'}}>SERVICE mmPro
        <p style={{fontSize:'12px',fontFamily:'inherit', marginTop:'5px'}}>Explore how mmPro supports mining and mineral production management.</p>
      </Title>
      {/* <P> Explore how mmPro supports mining and mineral production management.</P> */}

      <div style={{ padding: '40px', 
        display:'flex',
         flexDirection:'row',
         alignItems:'center',
         width:'100%',
         justifyContent:'space-between'}}>
           <div style={{
                flex:'1',
                maxWidth:'50%'


              }}>
                
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
         
      </div>

    
    </Layout>
  );
};

export default Home;