import React from 'react';
import './BoardPreview.css';

function BoardPreview({ board, openBoards }) {
  return (
    <div className="board-preview" onClick={() => openBoards(board.id)}>
      <div className="board-preview-title">{board.name}</div>
      <div>last updated: {board.lastUpdated ? (new Date(parseInt(board.lastUpdated))).toLocaleString() : null}</div>
    </div>
  );
}

export default BoardPreview;
