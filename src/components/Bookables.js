import React, { useState } from "react";
import {bookables} from "../db.json";

export default function Bookables () {
  const group = "Rooms";
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const [ bookableIndex, setBookableIndex ] = useState(1);

  return (
    <ul className="bookables">
      {bookablesInGroup.map((b, i) => (
        <li
          key={b.title}
          className={i === bookableIndex ? "selected" : null}
          onClick={() => setBookableIndex(i)}
        >
          {b.title}
        </li>
      ))}
    </ul>
  );
}