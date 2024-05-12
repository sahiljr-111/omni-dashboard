import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import config from '../../../config';

const Chart1 = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get(`${config.baseURL}/admin/chart`)
      .then(response => {
        setChartData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching chart data:', error);
      });
  }, []);

  return (
    <div className='py-2'>
      <div className='mt-5 py-8 bg-white overflow-auto shadow-md rounded-md'>
        <ResponsiveContainer height={250}>
          <LineChart
            data={chartData}
            isAnimationActive={true}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="seller" stroke="#8884d8" />
            <Line type="monotone" dataKey="buyer" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Chart1;
