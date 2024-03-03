import React, { useEffect, useState } from "react";
import axios from "axios";
import { store } from "../redux/store";

const UpcomingAlarm = () => {
  const [nearestAlarm, setNearestAlarm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNearestAlarm = async () => {
      try {
        const { token } = store.getState().userReducer; // Replace with your JWT token
        const response = await axios.get(
          "http://localhost:5000/api/alarm/nearest",
          {
            headers: {
              Authorization: `${token}`, // Include 'Bearer' prefix
            },
          }
        );

        const data = response.data.data;
        console.log(response, "------------");
        console.log(token);

        if (Array.isArray(data) && data.length > 0) {
          setNearestAlarm(data[0]);
        } else {
          // Handle the case when no nearest alarm is found
          setNearestAlarm(null);
        }
      } catch (error) {
        console.error("Error fetching nearest alarm:", error);
        setError(error.message);
      }
    };

    fetchNearestAlarm();
  }, []); // Run only once when the component mounts

  return (
    <div>
      <h2>Nearest Alarm:</h2>
      {error ? (
        <p>Error fetching nearest alarm: {error}</p>
      ) : nearestAlarm ? (
        <div>
          <p>Time: {nearestAlarm.time}</p>
          {/* Display other properties as needed */}
        </div>
      ) : (
        <p>No nearest alarm found.</p>
      )}
    </div>
  );
};

export default UpcomingAlarm;
