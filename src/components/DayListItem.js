import React from "react";

import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classnames("day-list", "day-list__item", {
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0
  });
  
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}