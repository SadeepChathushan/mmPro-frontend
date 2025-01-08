import React from 'react'

const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home


// import React from 'react';
// import { Layout, Button, Input, Table } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';

// const { Content } = Layout;

// const Home = () => {
//   // Table columns
//   const columns = [
//     { title: 'LICENSE NUMBER', dataIndex: 'licenseNumber', key: 'licenseNumber' },
//     { title: 'OWNER NAME', dataIndex: 'ownerName', key: 'ownerName' },
//     { title: 'LOCATION', dataIndex: 'location', key: 'location' },
//     { title: 'CAPACITY (CUBES)', dataIndex: 'capacity', key: 'capacity' },
//     {
//       title: 'Action',
//       key: 'action',
//       render: () => <Button type="link" style={styles.viewButton}>View</Button>
//     },
//   ];

//   // Table data
//   const data = [
//     { licenseNumber: '01 IML/B/TEST/1578/LRS', ownerName: 'Jayantha Perera', location: 'Rathnapura', capacity: 100 },
//     { licenseNumber: '02 IML/B/TEST/1578/LRS', ownerName: 'Jayantha Perera', location: 'Rathnapura', capacity: 100 },
//     { licenseNumber: '01 IML/B/TEST/1578/LRS', ownerName: 'Jayantha Perera', location: 'Rathnapura', capacity: 100 },
//     { licenseNumber: '02 IML/B/TEST/1578/LRS', ownerName: 'Jayantha Perera', location: 'Rathnapura', capacity: 100 },
//   ];

//   return (
//     <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
//       <Header style={styles.header}>
//         <div style={styles.headerContent}>
//           <div style={styles.logoText}>mmPro</div>
//           <div style={styles.headerLinks}>
//             <Link to="/" style={styles.navLink}>Home</Link>
//             <Link to="/logout" style={styles.navLink}>LogOut</Link>
//           </div>
//         </div>
//       </Header>

//       <Content style={styles.content}>
//         <div style={styles.searchSection}>
//           <Input
//             placeholder="Search"
//             prefix={<SearchOutlined />}
//             style={styles.searchInput}
//           />
//           <div style={styles.buttons}>
//             <Link to="/register-owner">
//               <Button type="primary" style={styles.registerButton}>Register New Owner</Button>
//             </Link>
//             <Link to="/add-license">
//               <Button type="default" style={styles.addLicenseButton}>+ Add New License</Button>
//             </Link>
//           </div>
//         </div>

//         <Table columns={columns} dataSource={data} pagination={false} style={styles.table} />
//       </Content>

//       <Footer style={styles.footer}>
//         <img src="/path-to-your-logo.png" alt="logo" style={styles.footerLogo} />
//       </Footer>
//     </Layout>
//   );
// };

// // Styling all elements
// const styles = {
//   header: {
//     backgroundColor: '#ff8c00', // Color from the image's theme
//     padding: '0 20px',
//   },
//   headerContent: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     height: '60px',
//   },
//   logoText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: '24px',
//   },
//   headerLinks: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   navLink: {
//     color: '#fff',
//     marginLeft: '20px',
//     fontSize: '16px',
//     textDecoration: 'none',
//   },
//   content: {
//     padding: '20px',
//   },
//   searchSection: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginBottom: '20px',
//     alignItems: 'center',
//   },
//   searchInput: {
//     width: '300px',
//   },
//   buttons: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     gap: '10px',
//   },
//   registerButton: {
//     backgroundColor: '#ff8c00',
//     borderColor: '#ff8c00',
//   },
//   addLicenseButton: {
//     backgroundColor: '#fff',
//     borderColor: '#ddd',
//   },
//   table: {
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//   },
//   viewButton: {
//     color: '#ff8c00',
//   },
//   footer: {
//     textAlign: 'center',
//     padding: '10px 0',
//     backgroundColor: '#f5f5f5',
//   },
//   footerLogo: {
//     width: '50px',
//   },
// };

// export default Home;