import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  console.log("props is: ", props);
  const days = props.days.map(day => {
    return (
      <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
    );
  });

  return days;
};