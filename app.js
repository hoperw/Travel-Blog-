const express = require('express');
const morgan = require('morgan')
const Travel = require('./models/travelModel')
const travelRouter = require('./routes/travelRoutes')


const app = express();
app.use(express.static('assets'))
app.set('view engine', 'ejs')

/* middleware */

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// serve static files with app.use(express.static(`${__dirname}/public`))

app.use(express.json())
app.use('/travels', travelRouter)

// Home Page

app.get('/', async (req, res) => {

    try {
        const top6 = await Travel.find().sort('createdAt').limit(6)
        res.render('index', { data: top6, title: "Hope - A Travel and Reading Blog" })
    } catch (err) {
        res.status(404).json({
            status: 'fail', 
            message: err
        })
    }

})

app.get('/:id', async (req, res) => {
    try {
        const blog = await Travel.findById(req.params.id)
        res.render('./travelBlogs/travelBlog', { data: blog, title: 'Travels'})

    } catch (err) {
        res.status(404).json({
            status: 'fail', 
            message: err
        })
    }
})




module.exports = app;