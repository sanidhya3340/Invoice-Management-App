import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Temp() {
    const [resdata, setResData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data: response } = await axios.get(
            "http://localhost:8080/Main_backend/Fetchten.do?page=1"
          );
          setResData(JSON.Parse(response));

          console.log(response);
        } catch (error) {
          console.error(error.message);
        }
      };

      fetchData();
    }, []);
  return (
    <div>{
        resdata
    }</div>
  )
}
