require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const routerUser = require('./routes/User.routes');
const routerAuth = require('./routes/Auth.routes');
const routerTodo = require('./routes/Todo.routes');

app.use(cors());  // Tambahkan middleware CORS
app.use(express.json());
app.use(routerUser);
app.use(routerAuth);
app.use(routerTodo);

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
