const server = require('./server');
require('dotenv').config();

const PORT = process.env.PORT || 3300

server.listen(PORT, () => {
  console.log(`\n look ${PORT}, no notes! \n`)
})