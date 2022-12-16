const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Travel = require('./../models/travelModel')

dotenv.config({path: './config.env'});

const db = process.env.DATABASE

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(console.log('DB is connected'))

// Read JSON File

const travel = JSON.parse(fs.readFileSync(`${__dirname}/travel.json`, 'utf-8'));

// Import Data into Database

const importData = async() => {
    try {
        await Travel.create(travel)
        console.log('data successfully loaded')
        process.exit()
    } catch (err) {
        console.log(err)
    }
}

// Delete All Data from Collection

const deleteData = async () => {
    try {
        await Travel.deleteMany()
        console.log('Data Successfully Deleted')
        process.exit()
    } catch (err) {
        console.log(err)
    }
}

// Update All Data from Collection

const updateData = async () => {

    const str = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi non arcu risus quis varius quam quisque. Duis tristique sollicitudin nibh sit amet commodo. Et magnis dis parturient montes nascetur. Id neque aliquam vestibulum morbi blandit. In mollis nunc sed id semper risus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Nullam vehicula ipsum a arcu cursus vitae congue. Urna neque viverra justo nec. Feugiat pretium nibh ipsum consequat nisl vel. Adipiscing elit pellentesque habitant morbi.

    Consequat id porta nibh venenatis cras. At imperdiet dui accumsan sit amet nulla facilisi morbi. Consequat id porta nibh venenatis cras sed felis eget velit. Amet aliquam id diam maecenas. Mauris a diam maecenas sed enim ut sem viverra. Ut sem viverra aliquet eget. Pellentesque sit amet porttitor eget dolor morbi. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Eu ultrices vitae auctor eu augue ut lectus. Amet venenatis urna cursus eget nunc scelerisque viverra mauris in. Pellentesque elit eget gravida cum sociis. Id eu nisl nunc mi ipsum. Eget nunc scelerisque viverra mauris. Sed nisi lacus sed viverra. Arcu vitae elementum curabitur vitae nunc sed. Mi proin sed libero enim. Elementum nisi quis eleifend quam.
    
    Consectetur adipiscing elit pellentesque habitant. Id cursus metus aliquam eleifend mi in nulla. Tristique senectus et netus et malesuada fames ac turpis egestas. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Risus quis varius quam quisque id diam vel. Elementum sagittis vitae et leo duis ut diam. Malesuada bibendum arcu vitae elementum curabitur. Cursus sit amet dictum sit amet justo. Blandit massa enim nec dui nunc mattis enim ut. Pulvinar elementum integer enim neque. Dui nunc mattis enim ut tellus.
    
    Amet consectetur adipiscing elit duis tristique sollicitudin. Praesent elementum facilisis leo vel. Ac ut consequat semper viverra nam libero. Volutpat maecenas volutpat blandit aliquam etiam erat velit. Pulvinar proin gravida hendrerit lectus. Quis lectus nulla at volutpat diam ut. Aliquam vestibulum morbi blandit cursus risus. Eget velit aliquet sagittis id consectetur purus ut. Elementum tempus egestas sed sed risus pretium quam vulputate. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Quisque id diam vel quam. Cursus metus aliquam eleifend mi in nulla.
    
    Habitasse platea dictumst quisque sagittis purus sit amet volutpat. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Suspendisse sed nisi lacus sed viverra. Nisi scelerisque eu ultrices vitae auctor. Ornare massa eget egestas purus viverra accumsan in nisl nisi. Amet commodo nulla facilisi nullam vehicula ipsum a arcu. Feugiat pretium nibh ipsum consequat. Eros donec ac odio tempor. Est velit egestas dui id ornare. Consequat ac felis donec et odio pellentesque diam. Cursus risus at ultrices mi tempus imperdiet. At imperdiet dui accumsan sit. Dictum varius duis at consectetur lorem donec massa sapien faucibus. Est ullamcorper eget nulla facilisi. Vel turpis nunc eget lorem. Diam quam nulla porttitor massa id neque. Euismod lacinia at quis risus sed vulputate odio ut enim. Ornare lectus sit amet est placerat in egestas erat imperdiet. Sit amet consectetur adipiscing elit duis tristique sollicitudin.`

    try {
        await Travel.updateMany({}, { $set: {blog: str}})
        console.log('Data Successfully Updated')
        process.exit()
    } catch (err) {
        console.log(err)
    }
}


if (process.argv[2] == '--import') {
    importData()
} else if (process.argv[2] == '--delete') {
    deleteData()
} else if (process.argv[2] == '--update') {
    updateData()
}


console.log(process.argv)