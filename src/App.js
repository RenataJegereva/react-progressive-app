import React, { Component } from 'react';
import logo from './logo.svg';
import { ApolloClient, InMemoryCache, gql, ApolloProvider, useQuery } from '@apollo/client';

class App extends Component {
  render() {
    const client = new ApolloClient({
      uri: 'https://48p1r2roz4.sse.codesandbox.io',
      cache: new InMemoryCache()
    });

    // client
    //   .query({
    //     query: gql`
    //       query GetRates {
    //         rates(currency: "CHF") {
    //           currency
    //         }
    //       }
    //     `
    //   })
    //   .then(result => console.log(result));

    const EXCHANGE_RATES = gql`
      query GetExchangeRates {
        rates(currency: "CHF") {
          currency
          rate
        }
      }
    `;

    function ExchangeRates() {
      const { loading, error, data } = useQuery(EXCHANGE_RATES);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>
            {currency}: {Math.round(rate * 100) / 100}
          </p>
        </div>
      ));
    }

    return (
      <div className="App">
        <ApolloProvider client={client}>
          <div>
            <h2>GraphQL - Apollo Data Graph</h2>
            <em>Example: consuming API with exchange rates.<br/>
                Outputting exchange rates for CHF
            </em>
            <ExchangeRates />
          </div>

        </ApolloProvider>
      </div>
    );
  }
}

export default App;
