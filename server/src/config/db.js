const mongoose = require('mongoose');

const dbConnect = async () => {
    await mongoose.connect(
        process.env.MONGODB_URL
    )
};

module.exports = dbConnect;