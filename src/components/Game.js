import Row from "./Row";
import "./Game.css";
import { useRef, useState } from "react";

function Shapes() {
  const shapes = [
    [[1, 1, 1, 1]],
    [[1], [1], [1], [1]],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],

    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
    ],
    [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    [
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
    ],
    [
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
    ],
  ];

  return shapes[Math.floor(Math.random() * 15)];
}

function firstY(columns, shape) {
  return Math.floor(Math.random() * (columns - shape[1].length + 1));
}

function NewMatrix(matrix, shape, cordinates) {
  let x = cordinates.current.x;
  const y = cordinates.current.y;

  if (x + shape.length === matrix.length) return false;
  for (let j = 0; j < shape[0].length; j++) {
    let i = shape.length - 1;
    while (shape[i][j] === 0) {
      i--;
    }
    if (matrix[x + 1 + i][y + j] !== 0) {
      console.log("(x,y)   (i,j)   ", x, ",", y, "    ", i, ",", j);
      return false;
    }
  }

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] === 1) {
        matrix[x + i][y + j] = 0;
      }
    }
  }
  x++;
  cordinates.current.x++;
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] === 1) {
        matrix[x + i][y + j] = 1;
      }
    }
  }
  return true;
}
function NewMatrix2(matrix, shape, cordinates) {
  const x = cordinates.current.x;
  const y = cordinates.current.y;

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (matrix[x + 1 + i][y + j] !== 0) {
        console.log("(x,y)   (i,j)   ", x, ",", y, "    ", i, ",", j);
        return false;
      }
    }
  }

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] === 1) {
        matrix[x + i][y + j] = 1;
      }
    }
  }
  return true;
}

function Game({ rows, columns, gameOver }) {
  const shape = useRef(Shapes());
  const cordinates = useRef({ x: 0, y: firstY(columns, shape.current) });
  const [matrix, setMatrix] = useState(() => {
    let arr = Array.from({ length: rows }, () => Array(columns).fill(0));
    NewMatrix2(arr, shape.current, cordinates);
    return arr;
  });

  console.log("Game was rendered");

  return (
    <div>
      <p>
        rows {rows}, columns {columns}
      </p>
      <div className="box">
        {matrix.map((row, index) => (
          <Row key={index} arr={row} />
        ))}
      </div>
      <div>
        <button onClick={() => {}}>Start</button>
        <button
          onClick={() => {
            setMatrix((prev) => {
              if (!NewMatrix(prev, shape.current, cordinates)) {
                const sh = Shapes();
                shape.current = sh;
                cordinates.current = {
                  x: 0,
                  y: firstY(columns, sh),
                };
                if (!NewMatrix2(prev, sh, cordinates)) {
                  console.log("Game Ower !!!");
                  setTimeout(gameOver, 10);
                }
              }
              return [...prev];
            });
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default Game;
