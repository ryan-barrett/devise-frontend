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

const GET_BOARD = gql`
    query Board($id: String!) {
        getBoard(input: $id){
            name,
            id,
            tickets {
                id
                title
                description,
                status,
                assignee,
                estimate
            }
        }
    }`;

const CREATE_TICKET = gql`
    mutation CreateTicket($boardId: String!) {
        createTicket(input: {
            title: "first ticket2",
            status: "todo",
            description: "test description",
            estimate: 1,
            board: $boardId,
            user: "3f1ec9c1-85f6-4604-93c2-bfeedb0356ac1"
        }){
            id,
            title,
            status,
            description,
            estimate,
            assignee
        }
    }`;

const ticketMapping = ({ id, title, estimate, description, assignee }) => {
  return <Ticket key={id} title={title} description={description} estimate={estimate} assignee={assignee}/>;
};

function Board() {
  const [board, setBoard] = useState({
    id: 'board-c0c1af2d-1781-4075-b5c0-0c7276e170ee68',
    name: '',
    tickets: []
  });

  const updateBoard = (name, tickets) => {
    const newBoard = { ...board, ...{ name, tickets } };
    setBoard(newBoard);
  };

  const { loading, error, data } = useQuery(GET_BOARD, {
    variables: { id: board.id },
    pollInterval: 500,
  });
  const [createTicket, { data: mutationData }] = useMutation(CREATE_TICKET);

  useEffect(() => {
    if (data) {
      const { getBoard: { name, tickets } } = data;
      updateBoard(name, tickets);
    }
  }, [data]);

  const createTicketHandler = async () => {
    const res = await createTicket({
      variables: { boardId: board.id },
      refetchQueries: [{ query: GET_BOARD, variables: { id: board.id } }]
    });
    console.log(res);
  };

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>An error message</h1>;
  }

  const todo = [];
  const inProgress = [];
  const done = [];

  for (let i = 0; i < board.tickets.length; i++) {
    switch (board.tickets[i].status) {
      case ticketStatusTypes.todo: {
        todo.push(board.tickets[i]);
        break;
      }
      case ticketStatusTypes.inProgress: {
        inProgress.push(board.tickets[i]);
        break;
      }
      case ticketStatusTypes.done: {
        done.push(board.tickets[i]);
        break;
      }
      default:
        break;
    }
  }

  return (
    <div>
      <h1>
        {board.name}
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
