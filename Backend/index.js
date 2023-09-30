const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const signupRoute = require('./Routes/SignUp');
const loginRoute = require('./Routes/Login');
const taskRoute = require('./Routes/TaskR');
require('dotenv').config(); // Load environment variables

const app = express();

app.use(express.json());

// Configure CORS to allow requests from a specific origin
const corsOptions = {
  origin: '*',
  methods: 'GET, PUT, POST, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect('mongodb+srv://LoanAssignment:LoanApp@cluster1.6llknal.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error));

// Routes
app.use('/api', signupRoute); // Register a new user
app.use('/api', loginRoute);  // Login
app.use('/api/tasks',taskRoute);
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
