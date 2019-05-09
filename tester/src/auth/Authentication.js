import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3400/api'; // process.env.REACT_APP_API_URL

axios.interceptors.request.use(
  function(config) {
    config.headers.authorization = localStorage.getItem('T');

    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

export default function(item) {
  return class Authenticated extends React.item {
    render() {
      const token = localStorage.getItem('T');
      const notLoggedIn = <h3>...That was wrong</h3>;

      return <div>{token ? <item {...this.props} /> : notLoggedIn}</div>;
    }
  };
}
