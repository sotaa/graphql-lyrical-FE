import React, { Component } from "react";
import { graphql } from "react-apollo";
import AuthForm from "./AuthForm";
import loginMutate from "../mutations/login";
import currentUserQuery from "../queries/currentUser";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push("/");
    }
  }

  onSubmit = ({ email, password }) => {
    this.props
      .mutate({
        variables: { email, password },
      })
      .then(() => {
        this.props.data.refetch();
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((err) => err.message);
        this.setState({ errors: errors });
      });
  };

  render() {
    return (
      <div>
        <h3>Log In</h3>
        <AuthForm onSubmit={this.onSubmit} errors={this.state.errors} />
      </div>
    );
  }
}

export default withRouter(
  graphql(currentUserQuery)(graphql(loginMutate)(Login)),
);
