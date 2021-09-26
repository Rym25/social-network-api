// import required methods/objects
const express = require('express');
const mongoose = require('mongoose');

// create express instance and set up port for localhost or default environment port
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mongo db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// logs mongo queries as they are executed
mongoose.set('debug', true);

// have the express server listen on PORT
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));