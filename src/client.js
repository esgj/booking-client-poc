const { JSONRPCClient } = require("json-rpc-2.0");
const axios = require('axios');

const client = new JSONRPCClient((request) => axios({
  method: 'post',
  url: process.env.BOOKING_JSONRPC_API_URL,
  headers: {
    'content-type': 'application/json'
  },
  data: JSON.stringify(request)
}).then(response => client.receive(response.data)));

module.exports.test = () => client.request('echo', { text: '123' }).then(d => console.log(d)).catch(err => console.log(err));
