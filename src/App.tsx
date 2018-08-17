import ApolloSplitClient from 'apollo-split-client';
import gql from 'graphql-tag';
import * as React from 'react';
import { ApolloProvider, Query } from 'react-apollo';

const { client } = new ApolloSplitClient(
  'http://localhost:3001/graphql',
  'ws:localhost:3001'
);

import './App.css';
import logo from './logo.svg';

const query = gql`
  {
    hello
  }
`;

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Query query={query}>
            {({ loading, error, data }) => {
              if (loading) {
                return 'Loading...';
              }
              if (error) {
                return `Error! ${error.message}`;
              }

              return <p>{data.hello}</p>;
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

// subscription example
{
  /* <Subscription subscription={query}>
  {({ data: { counter }, loading }) => (
    <h4>New comment: {!loading && counter.count}</h4>
  )}
</Subscription>; */
}
