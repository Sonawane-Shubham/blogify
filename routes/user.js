const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res) => {
  return res.render("signin");
});

//

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = await User.create({ fullName, email, password });
  console.log(user);
  return res.redirect("/");
});



//

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const tokn = await User.matchPasswordAndGenerateToken(email, password);

    //console.log(user=);
    res.cookie("token", tokn);

    //redirect to homepage
    return res.redirect("/");
  } catch (err) {
    return res.render("signin", { error: "incorrect user and password" });
  }
});


router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/");
});


module.exports = router;
