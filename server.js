const { port} = require('./config');

const express = require('express');
const createError = require('http-errors');
const multer = require('multer');

const startScheduleJobs = require('./jobs');

const authRouter = require('./routes/auth.route');
const usersRouter = require('./routes/users.route');
const nPapersRouter = require('./routes/nPapers.route');


const app = express();

app.use(express.static('public'));

// Built-in middleware that parses incoming requests with JSON payloads
app.use(express.json());

// Application-level middleware. Executed every time the app receives a request
app.use((req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method}: ${req.path}`);
  next();
});

// An endpoint to hadle base url route GET request
app.get('/', (req, res) => {
  res.status(200).json({
      status: 200,
      data: {
        message: "Node.js ExApp"
      }
  })
});

// Rest of routs
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/papers', nPapersRouter);

// Application-level middleware. Handling requests for a non-existent path
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Multer error handler middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      throw createError.BadRequest('File size limit exceeded. Please upload a smaller file.');
    }
  }

  next(err);
});

// Error-handling middleware. Handling global application errors
app.use((err, req, res, next) => {
  const erorrStatus = err.status || 500;
  console.error(`${'\x1b[31m'}[${new Date().toUTCString()}] ${req.method}: ${req.path}. Error(${erorrStatus}): ${err.message}`, '\x1b[0m');
  res.status(erorrStatus).send({
      status: erorrStatus,
      error: err
  });
});

// Starting the application
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
