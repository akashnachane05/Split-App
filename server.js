const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path=require('path');
const expenseRoutes = require('./routes/expenseRoutes');
const settlementRoutes = require('./routes/settlementRoutes');
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/expenses', expenseRoutes);
app.use('/', settlementRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5005, () => {
      console.log('Server running on port ' + (process.env.PORT || 5005));
    });
  })
  .catch(err => console.log(err));
