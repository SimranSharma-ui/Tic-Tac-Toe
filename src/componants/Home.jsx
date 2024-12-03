import React from 'react';
import useLogic from './Logic';

const Home = () => {
  const { board, hendleClick, getStatusMessage, resetGame } = useLogic();

  return (
    <div className="w-full p-24 flex flex-col items-center">
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
