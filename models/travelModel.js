const mongoose = require('mongoose')

const travelSchema = new mongoose.Schema({
    title: String,
    country: String,
    city: String,
    blog: String,
    slug: String,
    tags: [String],
    img: String,
    blogImgs: [String],
    altText: String,
    comments: [
        {
            name: {
                type: String,
                required: true,
                trime: true
            }, 
            body: {
                type: String,
                required: true, 
                trim: true
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Travel = mongoose.model('Travel', travelSchema)

module.exports = Travel;