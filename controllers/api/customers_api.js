const Customer = require("../../models/Customer");
const validator = require("../../config/validator");
// const { userValidation } = validator;

module.exports.view = async function (req, res) {
  try {
    let user = await Customer.findById(req.params.id);

    if (user) {
      return res.json(200, {
        message: "User viewed successfully!",
        user: user,
      });
    }

    return res.json(401, {
      message: "User not available!",
    });
  } catch (error) {
    console.log("Error", error);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.create = async function (req, res) {
  try {
    let email = Customer.find(req.body.email);

    if (email) {
      return res.json(401, {
        message: "Email already exists!",
      });
    }

    let user = await Customer.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    if (user) {
      return res.json(200, {
        message: "User created Succesfully",
        user: user,
      });
    }

    return res.json(401, {
      message: "Couldn't create User, try again!",
    });
  } catch (error) {
    console.log("Error", error);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.update = async function (req, res) {
  try {
    let user = await Customer.findById(req.params.id);

    if (user) {
      user.name = req.body.name,
      user.email = req.body.email,
      user.phone = req.body.phone,

      await user.save();

      return res.json(200, {
        message: "User updated successfully!",
        user: user,
      });
    }

    return res.json(401, {
      message: "User not available!",
    });
  } catch (error) {
    console.log("Error", error);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.delete = async function (req, res) {
  try {
    let user = await Customer.findById(req.params.id);

    if (user) {
      user.remove();
      return res.json(200, {
        message: "user deleted successfully!",
      });
    }

    return res.json(401, {
      message: "User not found!",
    });
  } catch (error) {
    console.log("Error", error);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
