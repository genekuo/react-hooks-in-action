import React, {useReducer, Fragment} from "react";
import {bookables} from "../../db.json";

import reducer from "./reducer";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables
};

export default function Bookables () {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {group, bookableIndex, bookables, hasDetails} = state;

  const bookablesInGroup = bookables.filter(b => b.group === group);
  const bookable = bookablesInGroup[bookableIndex];
  const groups = [...new Set(bookables.map(b => b.group))];

  function changeGroup (e) {
    dispatch({
      type: "SET_GROUP",
      payload: e.target.value
    });
  }

  function changeBookable (selectedIndex) {
    dispatch({
      type: "SET_BOOKABLE",
      payload: selectedIndex
    });
  }

  function nextBookable () {
    dispatch({ type: 'NEXT_BOOKABLE' });
  }

  function toggleDetails () {
    dispatch({ type: 'TOGGLE_HAS_DETAILS' });
  }

  return (
    <Fragment>
      <div>
        <select value={group} onChange={changeGroup}>
          {groups.map(g => <option value={g} key={g}>{g}</option>)}
        </select>

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
        <p>
          <button onClick={nextBookable} autoFocus>Next</button>
        </p>
      </div>

      <div className="bookableDetails">
        {bookable && (
          <Fragment>
            <p style={{marginTop: 0}}>
              <label>
                <input
                  type="checkbox"
                  onChange={toggleDetails}
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