import React from "react";
import "./Rules.css";

const Rules = () => {
  return (
    <section className="rules">
      <h2>About this Algorithm</h2>
      <div>
        <h4>Conway's Game of Life</h4>
        <p>
          Conway's Game of Life was created in 1970 by the British mathmetician,
          John Horton Conway. It is a simple simulation that represents
          individual cells as units. After an in-game moment passes, the state
          of the game changes based on the previous state of the world. While it
          is referred to as a “game”, Conway’s Game of Life is rather a
          simulation of a system where individual cells “live” and “die” in a
          state of relative equilibrium.
        </p>
      </div>

      <div>
        <h4>Core Functionality</h4>
        <p>
          Conway’s Game of Life (henceforth, Life) is based on a grid system.
          Every individual location on the grid can be understood as a cell. The
          game, or simulation, occurs over iterations, or generations. After a
          generation, a cell may change from living or dead based on how many
          living or dead neighbors it had in a previous iteration. A neighbor is
          any immediately adjacent spot on the grid (horizontal, vertical or
          diagonal). We can understand this more clearly with an example and a
          clear demonstration of the rules.
        </p>
      </div>

      <div>
        <h4>Rules:</h4>
        <ol>
          <li>A living cell with less than two living neighbours dies.</li>
          <li>A living cell with two or three live neighbours lives.</li>
          <li>A living cell with more than three live neighbours dies.</li>
          <li>
            A dead cell with exactly three live neighbours becomes a live cell,
            as if by reproduction.
          </li>
        </ol>
      </div>
    </section>
  );
};
export default Rules;
