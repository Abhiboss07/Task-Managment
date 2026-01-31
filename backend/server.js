const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const taskRoutes = require('./routes/taskRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/tasks', taskRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

app.get(/.*/, (req, res) =>
    res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'index.html')
    )
);

app.use(errorHandler);

const port = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(port, () => console.log(`Server started on port ${port}`));
}

module.exports = app;
