import React, { useState, Fragment } from 'react';
import {bookables} from "../db.json";

export default function Bookables () {
  const [group, setGroup] = useState("Kit");
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const [bookableIndex, setBookableIndex] = useState(0);
  const groups = [...new Set(bookables.map(b => b.group))];

  const bookable = bookablesInGroup[bookableIndex];

  const [hasDetails, setHasDetails] = useState(false);

  function nextBookable () {
    setBookableIndex(i => (i + 1) % bookablesInGroup.length);
  }

  return (
    <Fragment>
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

      <div className="bookableDetails">
        {bookable && (
          <Fragment>
            <p>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => setHasDetails(e.target.checked)}
                  checked={hasDetails}
                />
                Show Details
              </label>
            </p>
            {hasDetails && (
              <div>
                <h2>{bookable.title}</h2>
                <p>{bookable.notes}</p>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}