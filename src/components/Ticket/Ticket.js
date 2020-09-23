import React from 'react';

import './Ticket.css';

function Ticket({ id, title, estimate, description, assignee }) {
  const onDragStart = (event, id) => {
    event.dataTransfer.setData('id', id);
  };
  return (
    <div onDragStart={(e) => onDragStart(e, id)} className="ticket-container"
         draggable>
      {/*<p className="description">{description}</p>*/}
      <div>

        <div className="title">{title}</div>
        <div className="ticket-bottom-row">
          <div className="estimate">{estimate}</div>
          <div className="assignee">{assignee}</div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
