const mongoose = require('mongoose');
const Store =mongoose.model('Store');
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
  res.redirect(`/store/${store.slug}`);
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
  const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
    new:true, //return the new store instead of the old one 
    runValidators: true 
  }).exec();  
  req.flash('success', `Succesfully updated <strong> ${store.name} </strong> <a href="/stores/${store.slug}">View store</a>`);
  res.redirect(`/stores/${store._id}/edit`);
}