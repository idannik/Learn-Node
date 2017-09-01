const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer'); // TODO   read about multer
const jimp = require('jimp'); // TODO read about jimp
const uuid = require('uuid'); //TODO read about uuid

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({message:"that file type is not allowed"}, false);
    }
  }
}

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next(); //skip to create store
    return;
  }
  console.log(req.file);
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}` 
  //resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO)
  await photo.write(`./public/uploads/${req.body.photo}`);
  next()
}


exports.homePage = (req, res) => {
      console.log("Hey!!!")
res.render("index", {
  name:"wes",
  title: "I love food",
  sitename: "Idan Nikritin"
})};


exports.addStore = (req, res) => {
  res.render("editStore", {title : "add store"})
};

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();  
  req.flash('success', `Succesfully created ${store.name}, care to leave a review?`);
  res.redirect(`/stores/${store.slug}`);
}

exports.getStores = async (req, res) => {
  const stores = await Store.find()
  res.render("stores", {title: "stores", stores});
}

exports.editStore = async(req, res) => {
  const store = await Store.findOne({ _id: req.params.id});
  res.render('editStore', {title: `Edit ${store.name}`, store})  
}

exports.updateStore = async (req, res) => {
  req.body.location.type = 'Point';
  const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
    new:true, //return the new store instead of the old one 
    runValidators: true   
  }).exec();  
  req.flash('success', `Succesfully updated <strong> ${store.name} </strong> <a href="/stores/${store.slug}">View store</a>`);
  res.redirect(`/stores/${store._id}/edit`);
}

exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug});
  // we need to check if the store was found
  if (!store) {
    next();
    return;
  } else {
    res.render("store", {store})    
  }
  
}