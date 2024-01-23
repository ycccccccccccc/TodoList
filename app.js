const express = require('express');
const app = express();
const usersRouter = require('./server/routes/users');
const tasksRouter = require('./server/routes/tasks');
const subtasksRouter = require('./server/routes/subtasks');
const taskCommentsRouter = require('./server/routes/taskComments');
const groupsRouter = require('./server/routes/groups');
const groupMembersRouter = require('./server/routes/groupMembers');
const followersRouter = require('./server/routes/followers');
const executorsRouter = require('./server/routes/executors');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/', usersRouter);
app.use('/', tasksRouter);
app.use('/', subtasksRouter);
app.use('/', taskCommentsRouter);
app.use('/', groupsRouter);
app.use('/', groupMembersRouter);
app.use('/', followersRouter);
app.use('/', executorsRouter);


