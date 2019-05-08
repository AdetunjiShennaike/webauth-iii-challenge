const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const authRoute = require('./auth/authRoute');
const userRoute = require('./routes/userRoute');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(cors({ credentials: true, origin: 'http://localhost:3000' })); //credentials connect from front and backend

server.use('/api/auth', authRoute);
server.use('/api/user', userRoute);

module.exports = server;