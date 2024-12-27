import React from 'react';
import useLogic from './Logic';
import Confetti from 'react-confetti';
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2';

const Home = () => {
  const { board, hendleClick, getStatusMessage, resetGame } = useLogic();

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
 const winnerMessage = getStatusMessage();
  const winner = getStatusMessage().includes("wins");
  const Showconfettie = winner;
  useEffect(() => {
    if (winner) {
      Swal.fire({
        title: 'Game Over!',
        text: winnerMessage,
        icon: 'success',
        confirmButtonText: 'Play Again',
      }).then((result) => {
        if (result.isConfirmed) {
          resetGame();
        }
      });
    }
  }, [winner, winnerMessage, resetGame]);
  return (
    <div className="w-full p-24 flex flex-col items-center">
      {/* Confetti effect when a player wins */}
      {Showconfettie && <Confetti width={width} height={height} />}
      <div className="text-2xl mb-4 ">
        {getStatusMessage()}
        <button className="border-2 w-15 bg-slate-500 p-2 m-6" onClick={resetGame}>
          Reset Button
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4 ">
        {board.map((b, index) => {
          return (
            <button
              className="w-20 h-20 text-xl font-bold flex items-center justify-center border-2 border-black bg-slate-400"
              onClick={() => hendleClick(index)} 
              disabled={b !== null}
              key={index}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
