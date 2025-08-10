const mongoose = require('mongoose');

function connectToDB() {
    mongoose
    .connect(process.env.DB_CONNECT)
    .then(()=>{
        console.log('Yes we are Connected to MongoDB');
    })
    .catch(error => {
        console.error('Stupid check again Error connecting to MongoDB:', error);
    });
}

module.exports = connectToDB;