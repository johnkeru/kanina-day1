const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('DB connected successfully!')
    } catch (e) {
        console.log('Connection error: ' + e.message)
        process.exit(1)
    }
}