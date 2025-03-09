const express = require('express');
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
const submissionsRoutes = require('./routes/submissions');
const hackthonsRouters = require('./routes/hackthons');
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/submissions', submissionsRoutes);
app.use('/hackthons', hackthonsRouters);

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});