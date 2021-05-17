const ManagementClient = require('auth0').ManagementClient;
const dotenv = require("dotenv");
dotenv.config();

const managmentClient = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_MANAGMENT_API_V2_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGMENT_API_V2_CLIENT_SECRET,
  scope: 'read:users update:users'
});

module.exports = managmentClient;