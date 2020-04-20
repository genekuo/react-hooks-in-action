import React, {useReducer, useRef} from "react";
import reducer from "./reducer";
import {getWeek} from "../../utils/date-wrangler";

export default function WeekPicker ({date}) {
  const [week, dispatch] = useReducer(reducer, date, getWeek);
  const textboxRef = useRef();

  function goToDate () {
    dispatch({
      type: "SET_DATE",
      payload: textboxRef.current.value
    });
  }

  return (
    <div className="datePicker">
      <p>
        <button onClick={() => dispatch({type: "PREV_WEEK"})}>Previous</button>
        <button onClick={() => dispatch({type: "TODAY"})}>Today</button>
        <button onClick={() => dispatch({type: "NEXT_WEEK"})}>Next</button>

        <input type="text" ref={textboxRef} />

        <button onClick={goToDate}>Go</button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
}