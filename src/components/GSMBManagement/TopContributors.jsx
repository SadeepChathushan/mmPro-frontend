import { useEffect, useState } from "react";
import { Card, List, Avatar, Col } from "antd";
import { useLanguage } from "../../contexts/LanguageContext";
import { fetchRoyaltyCounts } from "../../services/management"; 

export const TopContributors = () => {
  const { language } = useLanguage();
  const [totalRoyalty, setTotalRoyalty] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getRoyaltyData = async () => {
      const { totalRoyalty, fetchedOrders } = await fetchRoyaltyCounts();
      setTotalRoyalty(totalRoyalty);
      setOrders(fetchedOrders);
    };

    getRoyaltyData();
  }, []);

  return (
    <Col xs={24} md={8}>
      <Card
        title={
          <span style={{ color: "#fff" }}>
            {language === "en"
              ? "Top Royalty Contributors"
              : language === "si"
              ? "ඉහළ Royalty ගාස්තු දායකයින්"
              : "மேல் காப்புரிமை பங்களிப்பாளர்கள்"}
          </span>
        }
        style={{
          backgroundColor: "rgba(254, 118, 118, 0.1)",
          borderRadius: "8px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "none",
          outline: "none",
        }}
      >
        <List
          dataSource={orders}
          renderItem={(item) => (
            <List.Item style={{ color: "#fff" }}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<span style={{ color: "#ffef2f" }}>{item.title}</span>}
                description={<span style={{ color: "#ffef2f" }}>{item.description}</span>}
              />
            </List.Item>
          )}
        />
      </Card>
    </Col>
  );
};
