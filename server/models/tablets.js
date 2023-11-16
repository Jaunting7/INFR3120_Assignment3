let mongoose = require('mongoose');

let tabletModel = mongoose.Schema({
    Name: String,
    Price: Number,
    PressureSensitivityLevels: Number,
    Size: String,
    Screen: String,
},
{
    collection: 'drawingtablet'
});

module.exports = mongoose.model('Tablet', tabletModel);