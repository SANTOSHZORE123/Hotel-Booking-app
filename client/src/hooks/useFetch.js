import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
        console.log("this is while setting",res.data)
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
},[url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  console.log("this is while returning",data)
  return { data, loading, error, reFetch };
};

export default useFetch;
