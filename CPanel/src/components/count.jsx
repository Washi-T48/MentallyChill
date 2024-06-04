import { useState, useEffect } from "react";
import axios from "axios";

const Count = () => {
  const [data, setData] = useState([]);
  const [lowCount, setLowCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [highCount, setHighCount] = useState(0);

  useEffect(() => {
    // Fetch data from the API using axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://ligma.sombat.cc:3000/forms/all`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Process data to classify and count levels
    const classifyAndCount = () => {
      let low = 0;
      let medium = 0;
      let high = 0;

      data.forEach((entry) => {
        const { d, a, s } = entry.result;

        // Convert values to numbers
        const dNum = Number(d);
        const aNum = Number(a);
        const sNum = Number(s);

        // Find the maximum value
        const maxValue = Math.max(dNum, aNum, sNum);

        // Classify the maximum value
        if (maxValue >= 1 && maxValue <= 2) {
          low++;
        } else if (maxValue === 3) {
          medium++;
        } else if (maxValue === 5) {
          high++;
        }
      });

      setLowCount(low);
      setMediumCount(medium);
      setHighCount(high);
    };

    classifyAndCount();
  }, [data]);

  return (
    <div>
      <h1>Classification Results</h1>
      <p>Low: {lowCount}</p>
      <p>Medium: {mediumCount}</p>
      <p>High: {highCount}</p>
    </div>
  );
};

export default Count;
