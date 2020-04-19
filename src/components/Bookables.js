import React, { useState } from 'react';
import {bookables} from "../db.json";

export default function Bookables () {
  const [group, setGroup] = useState("Kit");
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const [bookableIndex, setBookableIndex] = useState(0);
  const groups = [...new Set(bookables.map(b => b.group))];

  function nextBookable () {
    setBookableIndex(i => (i + 1) % bookablesInGroup.length);
  }

  return (
    <div>
      <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      >
        {groups.map(g => <option value={g} key={g}>{g}</option>)}
      </select>

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
      <p>
        <button onClick={nextBookable} autoFocus>Next</button>
      </p>
    </div>
  );
}