const UserController = require("./controllers/UserController");
const IncomeController = require("./controllers/IncomeController");
const { route } = require("./controllers/UserController");

const _routes = [
  // http://localhost:3000/api/user
  ["user", UserController],
  ["income", IncomeController],
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;
