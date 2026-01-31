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
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

app.get(/.*/, (req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    if (require('fs').existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        // Fallback or debug info
        res.status(404).send('Frontend index.html not found at: ' + indexPath);
    }
});

app.use(errorHandler);

const port = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(port, () => console.log(`Server started on port ${port}`));
}

module.exports = app;
