import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Col, Spin } from 'antd';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { fetchMonthlyCubesCounts } from '../../services/management'; // Import API function

const { Title } = Typography;

export const MonthlyChart = ({ lineData: initialLineData }) => {
  const [lineData, setLineData] = useState(initialLineData);
  const [loading, setLoading] = useState(!initialLineData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialLineData) return;

    const fetchData = async () => {
      try {
        const data = await fetchMonthlyCubesCounts();
        setLineData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialLineData]);

  if (loading) {
    return (
      <Col xs={24} md={16}>
        <Card bordered={false} style={{ backgroundColor: 'rgba(254, 118, 118, 0.1)', borderRadius: '8px', padding: '20px' }}>
          <Title level={5} style={{ color: '#fff', textAlign: 'center' }}>Monthly Mining License Issues Count</Title>
          <Spin size="large" />
        </Card>
      </Col>
    );
  }

  if (error) {
    return (
      <Col xs={24} md={16}>
        <Card bordered={false} style={{ backgroundColor: 'rgba(254, 118, 118, 0.1)', borderRadius: '8px', padding: '20px' }}>
          <Title level={5} style={{ color: '#fff', textAlign: 'center' }}>Monthly Mining License Issues Count</Title>
          <p style={{ color: '#fff', textAlign: 'center' }}>{error}</p>
        </Card>
      </Col>
    );
  }

  return (
    <Col xs={24} md={16}>
      <Card bordered={false} style={{ backgroundColor: 'rgba(254, 118, 118, 0.1)', borderRadius: '8px', padding: '20px' }}>
        <Title level={5} style={{ color: '#fff', textAlign: 'center' }}>Monthly Mining License Issues Count</Title>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={lineData}>
            <XAxis dataKey="month" stroke="#ffffff" tick={{ fill: '#ffffff', fontSize: 14 }} tickLine={false} />
            <YAxis stroke="#ffffff" tick={{ fill: '#ffffff', fontSize: 14 }} tickLine={false} />
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <Tooltip formatter={(value, name) => [value, name]} contentStyle={{ background: 'linear-gradient(135deg, rgb(255, 197, 197), rgb(255, 83, 83))', border: '2px solid rgb(118, 118, 118)', color: '#000', borderRadius: '5px', textAlign: 'center' }} />
            <Line type="monotone" dataKey="cubes" stroke="url(#sandGradient)" strokeWidth={4} dot={{ stroke: 'url(#sandDotGradient)', strokeWidth: 3, r: 6 }} activeDot={{ stroke: 'url(#sandDotGradient)', strokeWidth: 4, r: 8 }} animationDuration={1000} />
            <defs>
              <linearGradient id="sandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="5%" stopColor="#FF8C00" stopOpacity={1} />
                <stop offset="95%" stopColor="#B8860B" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="sandDotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="5%" stopColor="#FF8C00" stopOpacity={1} />
                <stop offset="95%" stopColor="#B8860B" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Col>
  );
};

MonthlyChart.propTypes = {
  lineData: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      cubes: PropTypes.number.isRequired,
    })
  ),
};

MonthlyChart.defaultProps = {
  lineData: null,
};

export default MonthlyChart;
