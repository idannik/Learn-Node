const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const storeSchema = new mongoose.Schema({
name: {
    type: String,
    trim: true,
    required: 'please enter a store name'
},
slug: String,
description: {
    type: String,
    trim: true
},
tags: [String],
created: {
    type: Date,
    default: Date.now
},
location: {
        type: {type :String,
        default: 'Point'
    },
    coordinates: [{
        type: Number,
        required: "You must supply coordinates!"
    }],
    address: {
        type: String,
        required: "You must supply an address!"
    }
},
photo: String
});

storeSchema.pre('save', async function(next) {
    if (!this.isModified('name')) {
        next()
        return;
    }
    this.slug = slug(this.name)
    // find other store with the same slug
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*)?)$`, 'i')
    const storeWithSlug = await this.constructor.find({slug: slugRegEx});
    if (storeWithSlug) {
        this.slug = `${this.slug}-${storeWithSlug.length + 1}`;
    }
    next()
})

storeSchema.statics.getTagsList = function() {
    return this.aggregate([
        { $unwind: '$tags'},
        { $group: {_id: "$tags", count: {$sum:1}}},
        { $sort: {count: -1}}
    ]); 
}
// use module.exports when we want to export one function/object only
module.exports = mongoose.model('Store', storeSchema)