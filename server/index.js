const express = require('express');
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
const submissions = require('./routes/submissions');
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/submissions', submissions);

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});