import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';


function BarGraph() {
  const [datesData,setData] = useState({});
  const [lodaind,setlodind]=useState(false)
  const fetchregisdata=async()=>{
    setlodind(true)
    try{
      const res=await axios.get("/registrations/count")
      setlodind(false)
      console.log("this is registrations/date",res.data)
      setData(res.data)
    }catch(error){
      setlodind(false)
    }
  }

  useEffect(()=>{
    fetchregisdata()
  },[])


  const data = {
    labels: datesData.dates,
    datasets: [
      {
        label: 'Number of Registrations',
        data: datesData.registrations,
        backgroundColor: 'rgba(128, 0, 128, 0.5)', // Purple color with alpha
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Registrations in last 15 days',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Registrations',
        },
      },
    },
  };

  return (
    <div style={{ width: '700px',overflowX:"scroll",backdropFilter:lodaind?"blur(8px)":"none"}}>
      {lodaind?<h4 style={{textAlign:"center",fontFamily:"cursive"}}>"I appreciate your patience. Please hold on." - Santosh Zore</h4>:
      <Bar data={data} options={options} />}
    </div>
  );
}

export default BarGraph;
