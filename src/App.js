import React from "react";
import "./App.css";
import WeekPicker from "./components/WeekPicker";

export default function App() {
  return (
    <div className="App">
      <WeekPicker date={new Date()} />
    </div>
  );
}