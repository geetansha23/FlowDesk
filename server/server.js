const express = require('express');

const dotenv = require('dotenv');

const cors = require('cors');

const http = require('http');

const mongoose = require('mongoose');

const { Server } = require('socket.io');

const cronJob = require('./utils/reminderCron');

/*
  ENV CONFIG
*/
dotenv.config();

/*
  VALIDATE ENV
*/
if (!process.env.MONGO_URI) {
  console.log(
    'MONGO_URI missing in .env'
  );

  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.log(
    'JWT_SECRET missing in .env'
  );

  process.exit(1);
}

/*
  EXPRESS APP
*/
const app = express();

/*
  HTTP SERVER
*/
const server =
  http.createServer(app);

/*
  SOCKET IO
*/
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: [
      'GET',
      'POST'
    ]
  }
});

/*
  SOCKET CONNECTION
*/
io.on(
  'connection',
  (socket) => {
    console.log(
      'User connected'
    );

    /*
      REALTIME LEAD EVENTS
    */
    socket.on(
      'new-lead',
      (data) => {
        io.emit(
          'leadCreated',
          data
        );
      }
    );

    socket.on(
      'disconnect',
      () => {
        console.log(
          'User disconnected'
        );
      }
    );
  }
);

/*
  MIDDLEWARE
*/
app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      'http://localhost:3000',

    credentials: true
  })
);

app.use(express.json());

/*
  ROUTES
*/
app.use(
  '/api/auth',
  require('./routes/authRoutes')
);

app.use(
  '/api/leads',
  require('./routes/leadRoutes')
);

app.use(
  '/api/dashboard',
  require('./routes/dashboardRoutes')
);

app.use(
  '/api/reports',
  require('./routes/reportRoutes')
);

app.use(
  '/api/followups',
  require('./routes/followupRoutes')
);

/*
  ROOT ROUTE
*/
app.get('/', (req, res) => {
  res.json({
    success: true,
    message:
      'FlowDesk API Running'
  });
});

/*
  404 HANDLER
*/
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message:
      'Route not found'
  });
});

/*
  GLOBAL ERROR HANDLER
*/
app.use(
  (err, req, res, next) => {
    console.log(err);

    res.status(500).json({
      success: false,
      message:
        'Internal server error'
    });
  }
);

/*
  START CRON
*/
cronJob();

/*
  DATABASE + SERVER START
*/
const PORT =
  process.env.PORT || 5000;

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log(
      'MongoDB Connected'
    );

    server.listen(
      PORT,
      () => {
        console.log(
          `Server running on port ${PORT}`
        );
      }
    );
  })
  .catch((err) => {
    console.log(
      'MongoDB Error:',
      err
    );
  });