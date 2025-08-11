import { useState } from "react";
import "./Cell.css";

function Cell({ num }) {
  const [x, setX] = useState(true);

  return (
    <div
      className={"cell " + (x && num === 0 ? "empty" : "full")}
      onClick={() => setX(!x)}
    ></div>
  );
}

export default Cell;
