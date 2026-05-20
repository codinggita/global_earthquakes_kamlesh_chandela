import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MagnitudeChart = ({ data = [] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" name="Count" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MagnitudeChart;
