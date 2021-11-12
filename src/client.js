const { JSONRPCClient } = require("json-rpc-2.0");
const axios = require('axios');

const client = new JSONRPCClient((request, { token }) => { 
  let headers = {
    'Content-Type': 'application/json'
  }

  if (token) headers['Authorization'] = `Bearer ${token}`;

  return axios({
  method: 'post',
  url: process.env.REACT_APP_BOOKING_API_URL,
  headers,
  data: JSON.stringify(request)
}).then(response => client.receive(response.data))});

module.exports = {
  getAllBookings: () => client.request('getBookings', null, { token: null }),
  addBooking: (value) => client.request('addBooking', value, { token: value.token })
}
