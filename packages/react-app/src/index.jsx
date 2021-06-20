import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';

import './index.css';

const themes = {
  black: `${process.env.PUBLIC_URL}/dark-theme.css`,
  cyberpunk: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem('theme');

const subgraphUri = 'http://localhost:8000/subgraphs/name/scaffold-eth/your-contract';

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || 'light'}>
      <App subgraphUri={subgraphUri} />
    </ThemeSwitcherProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
