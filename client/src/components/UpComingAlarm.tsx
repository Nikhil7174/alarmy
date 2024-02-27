// UpcomingAlarms.js

import React from "react";

export const UpcomingAlarms = ({ upcomingAlarm }) => {
  return (
    <div>
      <h2>Upcoming Alarm</h2>
      {upcomingAlarm ? (
        <div>
          <p>{upcomingAlarm.name}</p>
          <p>{upcomingAlarm.description}</p>
          <button onClick={() => handleDelete(upcomingAlarm.id)}>Delete</button>
        </div>
      ) : (
        <p>No upcoming alarms</p>
      )}
    </div>
  );
};
