import React, { useState, useEffect } from 'react';
import "./StatsPanel.css"
import PieChart from './PieChart';
import BarGraph from './BarGraph';
import axios from "axios"

function StatContainer({ title, value }) {
  const [displayedValue, setDisplayedValue] = useState(0);
  const [base, setBase] = useState(value);

  const fetchData = async () => {
    try {
      const res = await axios.post("/rooms/stats", { title: title });
      setDisplayedValue(res.data);
    } catch (error) {
      setDisplayedValue(title === "Total payment received" ? 2000 : 50);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run once on component mount

  useEffect(() => {
    const interval = setInterval(() => {
      if (base !== displayedValue) {
        setBase(prevBase => prevBase + 1);
      }
    }, 5);

    return () => clearInterval(interval);
  }, [base, displayedValue]); // Include 'base' and 'displayedValue' in the dependency array

  return (
    <div className="stat-container">
      <>
        {title === "Total payment received" ?
          <div className="value">&#8377;{base}+</div> :
          <div className="value">{base}+</div>
        }
        <hr className="line" />
        <div className="title">{title}</div>
      </>
    </div>
  );
}

function StatsPanel() {
  const [registrationsPerCity,setregistrationsPerCity]=useState({})
  const [loadingpie,setloadingpie]=useState(false)
  const fetchregis=async()=>{
    setloadingpie(true)
    try{
      const res=await axios.get("/registrations/regispercity")
      setloadingpie(false)
      setregistrationsPerCity(res.data)
    }catch(err){
      setloadingpie(false)
      setregistrationsPerCity({})
    }
  }
  useEffect(()=>{
    fetchregis()
  },[])
  return (
    <>
      <div className="stats">
        <StatContainer title="Number of Registrations done" value={-80} />
        <StatContainer title="Total payment received" value={0} />
        <StatContainer title="Number of Hotels registered" value={-80} />
        <StatContainer title="Number of users registered" value={-80} />
      </div>
      <div className='MoreStats'>
        {loadingpie?<h5>Loading details</h5>:<PieChart registrationsPerCity={registrationsPerCity} />}
        <BarGraph />
      </div>
    </>
  );
}

export default StatsPanel;
