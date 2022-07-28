const indexController = (req, res, next) => {
  console.log("asdsa");
  res.render("index", { title: "Express" });
};

export default indexController;
