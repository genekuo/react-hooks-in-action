import React, {useReducer, useEffect, useRef, Fragment} from "react";
import reducer from "./reducer";
import getData from "../../utils/data-fetcher";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  bookables: [],
  hasDetails: true,
  isLoading: false,
  error: false,
  isPresenting: false
};

export default function Bookables () {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {group, bookableIndex, bookables} = state;
  const {hasDetails, isLoading, error, isPresenting} = state;

  const bookablesInGroup = bookables.filter(b => b.group === group);
  const bookable = bookablesInGroup[bookableIndex];
  const groups = [...new Set(bookables.map(b => b.group))];

  const timerRef = useRef(null);

  /**************
   *  Effects
   */

  useEffect(() => {
    dispatch({type: "FETCH_BOOKABLES_REQUEST"});

    getData("http://localhost:3001/bookables")
      .then(bookables => dispatch({
        type: "FETCH_BOOKABLES_SUCCESS",
        payload: bookables
      }))
      .catch(error => dispatch({
        type: "FETCH_BOOKABLES_ERROR",
        payload: error
      }));
  }, []);

  useEffect(() => {
    if (isPresenting) {
      scheduleNext();
    } else {
      clearNextTimeout();
    }
  });

  /*********************
   *  Handler functions
   */

  function changeGroup (event) {
    dispatch({
      type: "SET_GROUP",
      payload: event.target.value
    });

    if (isPresenting) {
      clearNextTimeout();
      scheduleNext();
    }
  }

  function changeBookable (selectedIndex) {
    dispatch({
      type: "SET_BOOKABLE",
      payload: selectedIndex
    });
  }

  function nextBookable () {
    dispatch({
      type: "NEXT_BOOKABLE",
      payload: false
    });
  }

  function toggleDetails () {
    dispatch({ type: "TOGGLE_HAS_DETAILS" });
  }

  /*********************
   *  Timer helpers
   */

  function scheduleNext () {
    if (timerRef.current === null) {
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        dispatch({
          type: "NEXT_BOOKABLE",
          payload: true
        });
      }, 3000);
    }
  }

  function clearNextTimeout () {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }

  /******************
   * UI
   */

  if (error) {
    return <p>{error.message}</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
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