require("dotenv").config();
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");
const checkForAuthenticationCookie = require("./middlewares/authentication");
const app = express();
const connectDB = require("./connection");
const PORT = process.env.PORT;

//setting view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware to accept data from from and in json formate
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middlware to parse the cookies
app.use(cookieParser());

app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

//database connectivity
connectDB();

app.get("/", async (req, res) => {
  const allBlog = await Blog.find({});
  res.render("home", { user: req.user, blogs: allBlog });
});

//user routes
app.use("/user", userRoute);

//blog routes
app.use("/blog", blogRoute);

//listing to the server
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
