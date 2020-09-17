import React, { useState } from 'react';

import './AddTicketButton.css';

function AddTicketButton({ createTicketHandler }) {
  const [open, setOpen] = useState(false);

  const toggleState = () => {
    if (open) {
      setOpen(false);
      console.log(open);
      createTicketHandler();
    }
    else {
      setOpen(true);
      console.log(open);
    }
  };

  return (
    <div className="button-container">
      <button className="new-ticket-button" onClick={createTicketHandler}>Add</button>
    </div>
  );
}

export default AddTicketButton;
