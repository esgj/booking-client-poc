const { JSONRPCClient } = require("json-rpc-2.0");
const axios = require('axios');

const client = new JSONRPCClient((request) => { 
  console.log(request);
  return axios({
  method: 'post',
  url: process.env.REACT_APP_BOOKING_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(request)
}).then(response => client.receive(response.data))});

module.exports = {
  getAllBookings: () => client.request('getBookings'),
  addBooking: (value) => client.request('addBooking', value)
}
