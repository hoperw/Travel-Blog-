const Travel = require('./../models/travelModel')
//const APIFeatures = require('./../utils/apiFeatures')


const getAllTravels = async (req, res) => {

    try {

        // const features = new APIFeatures(Travel.find(), req.query).filter()
        // const travels = await features.query
        
        /* FILTER */

        const queryObj = {...req.query}

        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => {
            delete queryObj[el]
        });


        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Travel.find(JSON.parse(queryStr))

        /* SORT */

        if (req.query.sort) {
            // mongoose requires sort names separated by spaces
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        } else {
            query = query.sort('createdAt')
        }

        /* FIELD LIMITING */

        if (req.query.fields) {
            // mongoose requires field names separated by spaces
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        } else {
            // else remove unecessary data to be returned to client
            query = query.select('-__v')
        }

        /* PAGINATION */

        // skip specifies the number of documents to skip
        // limit specifies the number of documents the query will return
        // do 10 per page, page=2&limit=10

        // convert page to a number, default to 1 if a page isn't provided
        const page = req.query.page * 1 || 1
        // convert limit to a number, default to 10 if a limit isn't provided
        const limit = req.query.limit * 1 || 10
        // if you're on page 1 don't skip just show the limit, this makes it 0 based        
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit)


        const travels = await query



        res.render('./travelBlogs/allTravels', { data: travels, title: 'Travels' })

    } catch (err) {
        res.status(404).json({
            status: 'fail', 
            message: err
        })
    }

}

const getBlog = async (req, res) => {

    try {
        const blog = await Travel.findById(req.params.id)
        res.render('./travelBlogs/travelBlog', { data: blog, title: 'Travels'})

    } catch (err) {
        res.status(404).json({
            status: 'fail', 
            message: err
        })
    }
}

const allCountries = async (req, res) => {

    try {
        let countries = await Travel.find().distinct("country", {"country": {"$ne": ""}})
        res.render('./travelBlogs/allCountries', { data: countries, title: 'All Countries'})

    } catch (err) {
        res.status(404).json({
            status: 'fail', 
            message: err
        })
    }
}

const writeComment = async (req, res) => {

    const data = await Travel.findById(req.params.id)

    let updatedComments = data.comments

    updatedComments.push(req.body)
 
    try {
        const updateDoc = {
            $set: {
                comments: updatedComments
            }
        }

        const data = await Travel.findByIdAndUpdate(req.params.id, updateDoc, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail', 
            message: err
        })
    }

}

const map = async (req, res) => {

    try {

        res.render('./travelBlogs/map', {title: "Map"})

    } catch (err) {
        res.status(404).json({
            status: 'fail', 
            message: err
        })
    } 
}

module.exports = {
    getBlog,
    writeComment,
    getAllTravels,
    allCountries,
    map
}