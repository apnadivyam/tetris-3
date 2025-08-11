import Cell from "./Cell";
import "./Row.css";

function Row({ arr }) {
  return (
    <div className="row">
      {arr.map((cell, index) => (
        <Cell key={index} num={cell} />
      ))}
    </div>
  );
}

export default Row;
