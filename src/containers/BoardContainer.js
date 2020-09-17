import React, { useState, useEffect } from 'react';
import { useQuery, useMutation }      from '@apollo/client';
import Board                          from '../components/Board/Board';
import { CREATE_TICKET, GET_BOARD }   from '../queries';

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

  const createTicketHandler = async () => {
    const ticket = { // TODO: use real ticket
      id: 'temp_id',
      title: 'first ticket2',
      status: 'todo',
      description: 'test description',
      estimate: 1,
      user: '3f1ec9c1-85f6-4604-93c2-bfeedb0356ac1'
    };
    const { title, status, description, estimate, user } = ticket;
    let newTicketData;
    try {
      newTicketData = await createTicket({
        variables: { boardId: boardId, title, status, description, estimate, user },
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
           createTicketHandler={createTicketHandler}/>
  );
}

export default BoardContainer;
