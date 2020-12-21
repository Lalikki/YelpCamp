
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {

    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fd0801bf4f42b4338ad5333',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nostrum nam, temporibus eius ipsam, aspernatur sed odio quos doloribus voluptates quis autem aliquam in saepe iste dolore praesentium alias nulla iusto laboriosam. Eos explicabo at quibusdam porro quas aliquid perferendis, earum sunt accusamus hic deserunt debitis id quos esse a.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxlkqyyfr/image/upload/v1608114921/YelpCamp/nxlcoigvzosita7qwl9u.jpg',
                    filename: 'YelpCamp/nxlcoigvzosita7qwl9u'
                },
                {
                    url: 'https://res.cloudinary.com/dxlkqyyfr/image/upload/v1608114921/YelpCamp/nudjlklqtqoezichv5vr.jpg',
                    filename: 'YelpCamp/nudjlklqtqoezichv5vr'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})