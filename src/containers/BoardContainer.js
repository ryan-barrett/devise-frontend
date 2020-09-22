import React, { useState, useEffect }              from 'react';
import { useQuery, useMutation }                   from '@apollo/client';
import Board                                       from '../components/Board/Board';
import { CREATE_TICKET, GET_BOARD, UPDATE_TICKET } from '../queries';

function BoardContainer({ boardId }) {
  const [board, setBoard] = useState({
    name: '',
    tickets: []
  });

  const boardQuery = {
    variables: { id: boardId },
    fetchPolicy: 'network-only',
    pollInterval: 10000,
  };

  const { loading, error, data } = useQuery(GET_BOARD, boardQuery);
  const [createTicket] = useMutation(CREATE_TICKET);
  const [updateTicket] = useMutation(UPDATE_TICKET);

  const createTicketHandler = async ({ title, description, estimate, assignee }) => {
    const ticket = {
      status: 'todo',
      title,
      description,
      estimate,
      user: '3f1ec9c1-85f6-4604-93c2-bfeedb0356ac1', // TODO: use real user
      boardId
    };
    let newTicketData;
    try {
      newTicketData = await createTicket({
        variables: { ...ticket },
      });
    }
    catch (error) {
      console.error('error creating new ticket');
      return;
    }

    const { data: { createTicket: newTicket } } = newTicketData;
    const newTickets = [...board.tickets, newTicket];
    const newBoard = { name: board.name, tickets: newTickets };
    setBoard(newBoard);
  };

  const updateTicketHandler = async (newTicket, ticketIndex) => {
    // const { assignee: user } = newTicket;
    const user = 'user-0b011ea2-e0ca-494d-bc5b-e65733295e70206';
    console.log('newTicket', newTicket)

    let response;
    try {
      response = await updateTicket({
        variables: { ...newTicket, user, boardId },
      });
    }
    catch (error) {
      console.error('error creating new ticket');
      return;
    }

    const { data: { updateTicket: newTicketData } } = response;
    const newTickets = [...board.tickets];
    newTickets.splice(ticketIndex, 1, newTicketData);
    const newBoard = { name: board.name, tickets: newTickets };
    setBoard(newBoard);
  };

  useEffect(() => {
    if (data) {
      const { getBoard: { name, tickets } } = data;
      const newBoard = { name, tickets };
      setBoard({ ...board, ...newBoard });
    }
  }, [data]);

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>An error message</h1>;
  }

  return (
    <Board id={boardId}
           name={board.name}
           tickets={board.tickets}
           createTicketHandler={createTicketHandler}
           updateTicketHandler={updateTicketHandler}/>
  );
}

export default BoardContainer;
