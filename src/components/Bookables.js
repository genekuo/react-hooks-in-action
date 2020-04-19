import React from "react";
import {bookables} from "../db.json";

export default function Bookables () {
  const group = "Rooms";
  const bookablesInGroup = bookables.filter(b => b.group === group);
  let bookableIndex = 1;

  function changeBookable (selectedIndex) {
    bookableIndex = selectedIndex;
    console.log(selectedIndex);
  }

  return (
    <ul className="bookables">
      {bookablesInGroup.map((b, i) => (
        <li
          key={b.title}
          className={i === bookableIndex ? "selected" : null}
          onClick={() => changeBookable(i)}
        >
          {b.title}
        </li>
      ))}
    </ul>
  );
}