import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart,
  BarChart,
  Bar,
} from 'recharts';

const Chart1 = () => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className='py-2'>
      <div className='mt-5 py-8 bg-white overflow-auto shadow-md rounded-md'>
        <ResponsiveContainer height={250}>
          <LineChart
            data={data}
            isAnimationActive={true}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='mt-5 py-8 bg-white overflow-auto shadow-md rounded-md'>
        <div className="flex justify-center">
          <ResponsiveContainer width={350} height={250}>
            <PieChart>
              <Pie
                dataKey="uv"
                isAnimationActive={true}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
              />
              <Pie
                dataKey="pv"
                isAnimationActive={true}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={60}
                fill="#82CA9D"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <ResponsiveContainer width={400} height={250}>
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              barSize={20}
            >
              <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Chart1;
