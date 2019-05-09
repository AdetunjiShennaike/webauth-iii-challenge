import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Authentication from '../auth/Authentication';

class Users {
  state = {
    users: [],
  };
 
  componentDidMount() {    
    axios.get('/users')
    .then(res => {
      this.setState({ 
        users: res.data
      });
    })
    .catch(err => {
      console.error(err)
    });
  }

  render() {
    return (
      <div>
        <h2>Our Users</h2>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  }

}

export default requiresAuth(Users);
