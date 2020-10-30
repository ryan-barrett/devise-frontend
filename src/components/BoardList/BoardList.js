import React, { useState } from 'react';
import BoardPreview        from '../BoardPreview/BoardPreview';
import './BoardList.css';

function BoardList({ boards, openBoard }) {
  const boardPreviews = boards.map((board) => {
    return <BoardPreview key={board.id} board={board} openBoards={openBoard}/>;
  });

  return (
    <div>
      <h2>Current Boards</h2>
      {boardPreviews}
    </div>
  );
}

export default BoardList;
