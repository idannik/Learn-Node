exports.homePage = (req, res) => {
      console.log("Hey!!!")
res.render("index", {
  name:"wes",
  title: "I love food",
  sitename: "Idan Nikritin"
})};


