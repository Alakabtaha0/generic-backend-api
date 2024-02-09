const express = require('express');
const app = express();

const mailRouter = require('./routes/mail');
const port = 3000;

app.use(express.json());

app.use('/api/v1/mail', mailRouter);

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});