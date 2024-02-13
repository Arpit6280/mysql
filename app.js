const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  console.log("hellooo");
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      console.log("user***", user);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use((req, res, next) => {
  console.log("hello bro");
  next();
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

console.log("hi");
app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

User.hasOne(Cart); //user has one cart
Cart.belongsTo(User); //optional
Cart.belongsToMany(Product, { through: CartItem }); // one cart may hold many products
Product.belongsToMany(Cart, { through: CartItem }); //single product can be part of multiple carts

sequelize
  .sync({ force: true })
  // .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
