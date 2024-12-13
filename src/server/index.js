const express = require('express');
const router = require('./controller/characters');

const PORT = process.env.PORT | 9000;
const app = express();

app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));