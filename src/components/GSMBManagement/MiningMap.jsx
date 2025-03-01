// components/MapComponent.js
import React from 'react';
import { Card } from 'antd'; // Import Col from antd
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import locIcon from "../../assets/images/redlocation.png"
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useLanguage } from '../../contexts/LanguageContext';

const sriLankaCenter = [7.8731, 80.7718]; // Center of Sri Lanka
const sandMineLocations = [
  { name: "Pulmoddai Mineral Sand Deposits", coords: [8.9801, 80.9533] },
  { name: "Suduwella Silica Sand Mining Area", coords: [7.5833, 79.8333] },
  { name: "Maha Oya River Sand Mining", coords: [7.2536, 80.0833] },
  { name: "Kelani Ganga Sand Mining", coords: [6.9271, 79.8612] },
  { name: "Nayaru Beach Sand Deposits", coords: [9.0500, 80.9000] },
  { name: "Nilaveli Beach Sand Deposits", coords: [8.6765, 81.1908] },
  { name: "Induruwa Beach Sand Deposits", coords: [6.3431, 80.0255] },
  { name: "Mannar Beach Sand Deposits", coords: [8.9667, 79.9000] },
  { name: "Kalu Ganga River Sand Mining", coords: [6.5536, 79.9607] },
  { name: "Deduru Oya River Sand Mining", coords: [7.5918, 79.8284] },
  { name: "Gin Ganga River Sand Mining", coords: [6.0535, 80.2209] },
  { name: "Nilwala Ganga River Sand Mining", coords: [5.9483, 80.5353] },
  { name: "Gal Oya River Sand Mining", coords: [7.2128, 81.6163] }
];
const sandMineIcon = new L.Icon({
  iconUrl: locIcon,
  iconSize: [25, 25],
});

export const MapComponent = () => {
  
  const { language } = useLanguage();

  return (
      <Card
        bordered={false}
        style={{
          backgroundColor: "rgba(254, 118, 118, 0.2)", 
          borderRadius: "8px",
          padding: "10px",
        }}
      >
       <h5 style={{ color: "#ffffff", textAlign: "center", fontWeight: "bold" }}>
  {language === "en"
    ? "🏗️ Top Sand Mines in Sri Lanka 🏗️"
    : language === "si"
    ? "🏗️ ශ්‍රී ලංකාවේ ප්‍රධාන වැලි කාන 🏗️"
    : "🏗️ இலங்கையின் முக்கிய மணல் சுரங்கங்கள் 🏗️"}
</h5>

        <MapContainer
          center={sriLankaCenter}
          zoom={7}
          style={{ height: "400px", width: "100%", borderRadius: "8px" }}
          minZoom={7}
          maxZoom={10}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {sandMineLocations.map((mine, index) => (
            <Marker key={index} position={mine.coords} icon={sandMineIcon}>
              <Popup>🏗️ <strong>{mine.name}</strong></Popup>
            </Marker>
          ))}
        </MapContainer>
      </Card>
  );
};