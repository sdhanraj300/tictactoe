import React from 'react';
import Grid from './Grid';

function Game() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Tic Tac Toe</h1>
      <Grid />
    </div>
  );
}

export default Game;
