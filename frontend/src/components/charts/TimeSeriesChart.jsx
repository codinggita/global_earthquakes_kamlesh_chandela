import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const TimeSeriesChart = ({ data = [] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="count" stroke="#8884d8" name="Count" />
        <Line yAxisId="right" type="monotone" dataKey="avgMagnitude" stroke="#82ca9d" name="Avg Mag" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesChart;
