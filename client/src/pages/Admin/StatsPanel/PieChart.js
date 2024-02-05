import React from 'react';
import 'chart.js/auto';

import { Pie } from 'react-chartjs-2';

function generateRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function generatePieChart(data) {
  const cities = Object.keys(data);
  const registrations = Object.values(data);
  const colors = cities.map(() => generateRandomColor());

  const pieChartData = {
    labels: cities,
    datasets: [
      {
        data: registrations,
        backgroundColor: colors,
      },
    ],
  };

  return pieChartData;
}

function PieChart({ registrationsPerCity }) {
  const pieData = generatePieChart(registrationsPerCity);
  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div style={{ width: '200px', height: '200px' }}> {/* Adjust width and height as needed */}
      <Pie data={pieData} options={options}/>
      <div style={{ textAlign: 'center', color: 'gray', fontStyle: 'italic' }}>
        Number of Registrations per City
      </div>
    </div>
  );
}

export default PieChart;
