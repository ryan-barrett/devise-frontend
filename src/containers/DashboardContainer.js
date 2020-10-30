import React, { useEffect, useState } from 'react';
import { withRouter }                 from 'react-router-dom';
import { useQuery }                   from '@apollo/client';
import BoardList                      from '../components/BoardList/BoardList';
import { GET_ALL_BOARDS }             from '../queries';
import { UseJwt }                     from '../enums';

function DashboardContainer({ history }) {
  const openBoard = (boardId) => {
    history.push({
      pathname: `/boards/${boardId}`,
    });
  };

  const boardQuery = {
    variables: { userId: UseJwt.Value },
    fetchPolicy: 'network-only',
    pollInterval: 30000,
  };

  const { loading, error, data } = useQuery(GET_ALL_BOARDS, boardQuery);
  if (error) {
    history.push('/login');
  }

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>An error message</h1>;
  }
  const { getBoardsByUserId: boards } = data;

  return (
    <BoardList boards={boards} openBoard={openBoard}/>
  );
}

export default withRouter(DashboardContainer);
