import React                                                           from 'react';
import ReactDOM                                                        from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext }                                                  from '@apollo/client/link/context';
import App                                                             from './App';
import * as serviceWorker                                              from './serviceWorker';
import { getAuthToken }                                                from './utils';
import './index.css';

require('dotenv').config();

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAuthToken();

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
