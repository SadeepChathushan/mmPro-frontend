import { Card, Typography } from 'antd';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
const { Title } = Typography;

export const TransportLicense = ({ 
  pieData = [], 
  colors = [], 
  title = [], 
  description = []
}) => {
  return (
    <Card
      bordered={false}
      style={{
        backgroundColor: "rgba(254, 118, 118, 0.1)",
        borderRadius: "8px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title level={5} style={{ color: "#fff", textAlign: "center" }}>
        {title}
      </Title>
      
      <p style={{color: "#ffef2f",textAlign: "center",marginBottom: "20px"}}>
        {description}
      </p>
      
      <div style={{ marginTop: "15px" }}>
      <ResponsiveContainer width="100%" height={320 }>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius="100%"
            innerRadius="0%"
            paddingAngle={2}
          >
            {pieData.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
           formatter={(value, name) => [value, name]}
           contentStyle={{
           background: "linear-gradient(135deg,rgb(255, 228, 228),rgb(255, 150, 150))", // Gold gradient background
           border: "2px solid rgb(255, 255, 255)",
           color: "#fff",
           borderRadius: "5px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TransportLicense;