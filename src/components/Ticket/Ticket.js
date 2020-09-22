import React from 'react';

import './Ticket.css';

function Ticket({ id, title, estimate, description, assignee }) {
  const onDragStart = (event, id) => {
    event.dataTransfer.setData('id', id);
  };
  return (
    <div onDragStart={(e) => onDragStart(e, id)} className="ticket-container"
         draggable>
      <span>
        <div>{estimate}</div>
        <div>{assignee}</div>
        <div>{title}</div>
      </span>
      <p>{description}</p>
    </div>
  );
}

export default Ticket;
