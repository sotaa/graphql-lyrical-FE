import React from "react";
import "./App.css";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import requireAuth from "./hoc/requireAuth";

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
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <Route path='/dashboard' component={requireAuth(DashboardPage)} />
        </Route>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
