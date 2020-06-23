import React from "react";
import "./App.css";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import requireAuth from "./hoc/requireAuth";
import SongCreatePage from "./pages/SongCreatePage";
import SongDetailPage from "./pages/SongDetailPage";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  dataIdFromObject: (o) => o.id,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route>
          <Header />
          <Switch>
            <Route exact path='/' component={requireAuth(HomePage)} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignupPage} />
            <Route path='/songs/new' component={SongCreatePage} />
            <Route path='/songs/:id' component={SongDetailPage} />
          </Switch>
        </Route>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
