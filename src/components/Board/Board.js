import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Ticket                         from '../Ticket/Ticket';
import AddTicketButton                from '../AddTicket/AddTicketButton';

import './Board.css';

const ticketStatusTypes = {
  todo: 'todo',
  inProgress: 'in progress',
  done: 'done',
};

const ticketMapping = ({ id, title, estimate, description, assignee }) => {
  return <Ticket key={id} title={title} description={description} estimate={estimate} assignee={assignee}/>;
};

function Board({ id, name, tickets, createTicketHandler }) {
  const todo = [];
  const inProgress = [];
  const done = [];

  for (let i = 0; i < tickets.length; i++) {
    switch (tickets[i].status) {
      case ticketStatusTypes.todo: {
        todo.push(tickets[i]);
        break;
      }
      case ticketStatusTypes.inProgress: {
        inProgress.push(tickets[i]);
        break;
      }
      case ticketStatusTypes.done: {
        done.push(tickets[i]);
        break;
      }
      default:
        break;
    }
  }

  return (
    <div>
      <h1>
        {name}
      </h1>
      <div id="board-container">
        <div className="board-col">
          <h3>To Do</h3>
          {todo.map(ticketMapping)}
          <AddTicketButton createTicketHandler={createTicketHandler}/>
        </div>
        <div className="board-col">
          <h3>In Progress</h3>
          {inProgress.map(ticketMapping)}
        </div>
        <div className="board-col">
          <h3>Done</h3>
          {done.map(ticketMapping)}
        </div>
      </div>
    </div>
  );
}

export default Board;
