import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';
import './index.css';

const subgraphUri = 'http://localhost:8000/subgraphs/name/scaffold-eth/your-contract';

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App subgraphUri={subgraphUri} />
  </ApolloProvider>,
  document.getElementById('root'),
);
