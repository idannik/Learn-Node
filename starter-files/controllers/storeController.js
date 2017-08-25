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
  const store = new Store(req.body);  
  await store.save();
  res.redirect('/')
}