const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('MySQL is running (health check)'));
app.listen(8036, () => console.log('Health check on port 8036'));