//@ts-nocheck
import React, { useState, useEffect } from "react";

const Alarm = ({
  time,
  name,
  description,
  isSet,
  onToggle,
  onDelete,
  onEdit,
  notify,
}) => {
  const [truncatedDescription, setTruncatedDescription] = useState(
    description?.length > 100
      ? description.substring(0, 117) + "..." + description.slice(-3)
      : description
  );
  // console.log("truncatedDescription", truncatedDescription);

  const [alarmTime, setAlarmTime] = useState(time);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedCurrentTime = now.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(formattedCurrentTime);

      if (formattedCurrentTime === alarmTime && isSet == true) {
        alert("Time to wake up!");
        setAlarmTime("");
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [alarmTime]);

  const handleToggle = () => {
    onToggle(!isSet);
    if (isSet == true) {
      // Set the alarm time when the user toggles the alarm on
      setAlarmTime(time);
    } else {
      // Clear the alarm time when the user toggles the alarm off
      setAlarmTime("");
    }
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4 flex items-center justify-between">
      <div className="flex flex-col flex-wrap mr-3">
        <p className="text-xl font-bold mb-2">{time}</p>
        <p className="text-gray-600">{name}</p>
        <div className="flex flex-wrap">
          <p
            style={{ overflowWrap: "anywhere" }}
            className="text-gray-700 overflow-hidden overflow-ellipsis overflow-y-auto flex-wrap flex break-words whitespace-normal"
          >
            {truncatedDescription}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="text-blue-500 hover:text-blue-700 mr-4"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="text-red-500 hover:text-red-700 mr-5"
          onClick={handleDelete}
        >
          Delete
        </button>
        <label className="switch">
          <input type="checkbox" checked={isSet} onChange={handleToggle} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default Alarm;
