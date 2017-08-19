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

exports.createStore = (req, res) => {
  res.json(req.body)
}