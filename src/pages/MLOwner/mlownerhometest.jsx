// import React, { useState, useEffect } from 'react';
// import { Button, Table, Row, Col, Space, Typography, AutoComplete } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useLanguage } from "../../contexts/LanguageContext";

// const { Title } = Typography;

// const MLOwnerHomePage = () => {
//   const { language } = useLanguage();
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchText, setSearchText] = useState("");

//   const columns = [
//     {
//       title: `${language === "en" ? 'LICENSE NUMBER' : 'බලපත්‍ර අංකය'}`,
//       dataIndex: 'licenseNumber',
//       key: 'licenseNumber',
//       render: (text) => <span style={{ fontWeight: 'bold' }}>{text}</span>,
//     },
//     { title: `${language === "en" ? 'OWNER' : 'අයිතිකරු'}`, dataIndex: 'owner', key: 'owner' },
//     { title: `${language === "en" ? 'LOCATION' : 'ස්ථානය'}`, dataIndex: 'location', key: 'location' },
//     { title: `${language === "en" ? 'START DATE' : 'ආරම්භක දිනය'}`, dataIndex: 'startDate', key: 'startDate' },
//     { title: `${language === "en" ? 'DUE DATE' : 'අවශ්‍ය වන දිනය'}`, dataIndex: 'dueDate', key: 'dueDate' },
//     { title: `${language === "en" ? 'CAPACITY (CUBES)' : 'කියුබ් ගණන'}`, dataIndex: 'capacity', key: 'capacity' },
//     { title: `${language === "en" ? 'DISPATCHED (CUBES)' : 'යවන ලද ප්‍රමාණය'}`, dataIndex: 'dispatchedCubes', key: 'dispatchedCubes' },
//     { title: `${language === "en" ? 'REMAINING CUBES' : 'ඉතිරි ප්‍රමාණය'}`, dataIndex: 'remainingCubes', key: 'remainingCubes' },
//     {
//       title: `${language === "en" ? 'ROYALTY(SAND) DUE [RS.]' : 'රෝයල්ටි '}`,
//       dataIndex: 'royalty',
//       key: 'royalty',
//       render: (text) => {
//         const royaltyAmount = text ? parseInt(text, 10) : 0;
//         const formattedAmount = new Intl.NumberFormat().format(royaltyAmount);
//         return <span style={{ color: 'blue' }}>{formattedAmount}</span>;
//       },
//     },
//     {
//       title: `${language === "en" ? 'STATUS' : 'තත්වය'}`,
//       dataIndex: 'status',
//       key: 'status',
//       render: (text, record) => {
//         const currentDate = new Date();
//         const dueDate = new Date(record.dueDate);
//         const isActive = currentDate <= dueDate;
//         return (
//           <span style={{ color: isActive ? 'green' : 'red' }}>
//             {isActive ? 'Active' : 'Inactive'}
//           </span>
//         );
//       },
//     },
//     {
//       title: `${language === "en" ? 'ACTION' : 'ක්‍රියාමාර්ග'}`,
//       key: 'action',
//       render: (_, record) => (
//         <Space size="middle">
//           {/* History Button */}
//           <Link
//             to={{
//               pathname: "/mlowner/history",
//               search: `${record.licenseNumber}`, // Pass license number as query param
//             }}
//           >
//             <Button
//               style={{
//                 backgroundColor: '#0066cc',
//                 borderColor: '#0066cc',
//                 borderRadius: '10%',
//               }}
//             >
//               {language === "en" ? "History" : "ඉතිහාසය"}
//             </Button>
//           </Link>
//         </Space>
//       ),
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const username = "@achinthamihiran";
//         const password = "Ab2#*De#";

//         const response = await axios.get('/api/projects/gsmb/issues.json', {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           auth: {
//             username,
//             password,
//           },
//         });

//         // Process the data here...

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ backgroundColor: '#f0f2f5', height: '100%' }}>
//       <div style={{ padding: '24px' }}>
//         <Table
//           columns={columns}
//           dataSource={filteredData}
//           pagination={false}
//           style={{
//             backgroundColor: 'white',
//             borderRadius: '8px',
//             boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//             marginTop: '24px',
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default MLOwnerHomePage;













































// import React, { useState, useEffect } from 'react';
// import { Table, Row, Col, DatePicker, Button } from 'antd';
// import { Link, useParams } from 'react-router-dom'; // useParams to extract license number from URL
// import moment from 'moment';
// import axios from 'axios';

// const History = () => {
//   const { licenseNumber } = useParams(); // Extract license number from URL params
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [dispatchHistory, setDispatchHistory] = useState([]);

//   // Fetch dispatch history from the API
//   useEffect(() => {
//     const fetchDispatchHistory = async () => {
//       try {
//         const username = "@achinthamihiran"; // Replace with actual username
//         const password = "Ab2#*De#"; // Replace with actual password

//         const response = await axios.get('/api/projects/gsmb/issues.json', {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           auth: {
//             username,
//             password,
//           },
//         });

//         console.log('API Response:', response);

//         if (response.data && response.data.issues) {
//           const issues = response.data.issues;

//           // Filter issues related to the 'TPL' tracker (tracker id = 8)
//           const filteredIssues = issues.filter(issue => issue.tracker.id === 8);

//           const formattedDispatchHistory = filteredIssues.map((issue) => {
//             const customFields = issue.custom_fields.reduce((acc, field) => {
//               acc[field.name] = field.value;
//               return acc;
//             }, {});

//             return {
//               licenseNumber: customFields['License Number'] || '',
//               owner: customFields['Owner Name'] || '', // Use the Owner Name directly from backend
//               location: customFields['Location'] || '',
//               cubes: customFields['Cubes'] || '',
//               dispatchDate: issue.start_date || '', 
//               lorryDriverContact: customFields['Driver Contact'] || '',
//             };
//           });

//           setDispatchHistory(formattedDispatchHistory);
//         } else {
//           console.error('No issues found in the response');
//         }
//       } catch (error) {
//         console.error('Error fetching dispatch history:', error);
//       }
//     };

//     fetchDispatchHistory();
//   }, []); // Empty dependency array means this will run only once on component mount

//   const handleStartDateChange = (date) => {
//     setStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
//   };

//   const handleEndDateChange = (date) => {
//     setEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
//   };

//   // Filter dispatch history based on the license number and date range
//   const filteredDispatchHistory = dispatchHistory.filter((dispatch) => {
//     let isLicenseMatch = true;
//     if (licenseNumber) {
//       isLicenseMatch = dispatch.licenseNumber === licenseNumber; // Filter by license number
//     }

//     if (startDate && endDate) {
//       const dispatchDate = new Date(dispatch.dispatchDate);
//       return (
//         dispatchDate >= new Date(startDate) && dispatchDate <= new Date(endDate) && isLicenseMatch
//       );
//     } else {
//       return isLicenseMatch; // Show all dispatches if no dates are selected
//     }
//   });

//   const columns = [
//     {
//       title: 'License Number',
//       dataIndex: 'licenseNumber',
//       key: 'licenseNumber',
//     },
//     {
//       title: 'Driver Contact',
//       dataIndex: 'lorryDriverContact',
//       key: 'lorryDriverContact',
//     },
//     {
//       title: 'Owner',
//       dataIndex: 'owner',
//       key: 'owner',
//     },
//     {
//       title: 'Location',
//       dataIndex: 'location',
//       key: 'location',
//     },
//     {
//       title: 'Cubes',
//       dataIndex: 'cubes',
//       key: 'cubes',
//     },
//     {
//       title: 'Dispatched Date',
//       dataIndex: 'dispatchDate',
//       key: 'dispatchDate',
//       render: (text) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
//     },
//   ];

//   return (
//     <div style={{ padding: '16px', backgroundColor: '#f0f2f5' }}>
//       <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Dispatch History</h1>

//       <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
//         <Col xs={24} sm={12} md={6}>
//           <DatePicker onChange={handleStartDateChange} placeholder="Start Date" style={{ width: '100%' }} />
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <DatePicker onChange={handleEndDateChange} placeholder="End Date" style={{ width: '100%' }} />
//         </Col>
//       </Row>

//       <Table
//         dataSource={filteredDispatchHistory}
//         columns={columns}
//         scroll={{ x: 'max-content' }} // Enable horizontal scroll for small screens
//         style={{
//           marginBottom: '20px',
//           backgroundColor: 'white',
//           borderRadius: '8px',
//           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//         }}
//         pagination={false} // Disable pagination (optional)
//       />

//       {/* Back to Home Button */}
//       <div style={{ textAlign: 'center' }}>
//         <Link to="/mlowner/home">
//           <Button
//             type="primary"
//             style={{
//               backgroundColor: '#FFA500',
//               borderColor: '#FFA500',
//               color: 'white',
//               width: '200px',
//               borderRadius: '8px',
//             }}
//             onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgb(211, 153, 61)')}
//             onMouseLeave={(e) => (e.target.style.backgroundColor = '#FFA500')}
//           >
//             Back to Home
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default History;
