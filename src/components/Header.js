import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import currentUserQuery from "../queries/currentUser";
import logoutMutate from "../mutations/logout";

class Header extends Component {
  onLogout = () => {
    this.props.mutate({}).then(() => {
      this.props.data.refetch();
    });
  };

  renderButtons = () => {
    const { loading, user } = this.props.data;
    if (loading) return <div>Loading...</div>;
    if (user) {
      return (
        <li>
          <span className='logout' onClick={this.onLogout}>
            Logout
          </span>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </div>
      );
    }
  };

  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo left home-icon'>
            Home
          </Link>
          <ul className='right'> {this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(logoutMutate)(graphql(currentUserQuery)(Header));
