import React from 'react';

import './Ticket.css';

function Ticket({ title, estimate, description, assignee }) {
  return (
    <div className="ticket-container">
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
