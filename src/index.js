const express = require('express');
const routers = require('../routes/index');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api', routers);

app.listen(PORT, () => {
    console.log(`Server was started on port: ${PORT}`);
})