const User = require("../models/users");
const {
  validateSignup,
  validateSignin,
} = require("../utils/validators/fieldsValidator");
const {
  hashPassword,
  comparePassword,
} = require("../utils/validators/passwordHash");
const JWT = require("jsonwebtoken");
const { commonResponse } = require("../utils/reponse/response");

exports.singup = async (req, res) => {
  const { name, email, password, type, properties } = req.body;
  console.log(name, email, password);
  if (!validateSignup(req.body)) {
    res.status(403).json(commonResponse("Fields are missing.", false));
  } else {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      const hashedPassword = await hashPassword(password);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        type,
        ...(properties && { properties: JSON.parse(properties) }),
      });
      newUser.save((err, user) => {
        if (err) {
          console.log(err);
          res.status(500).json(commonResponse("Something went wrong.", false));
        } else if (user) {
          res
            .status(201)
            .json(commonResponse("User created successfully.", true, user));
        }
      });
    } else {
      res.status(403).json(commonResponse("User already exists.", false));
    }
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!validateSignin(req.body)) {
    res.status(403).json(commonResponse("Fields are missing.", false));
  } else {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(401).json(commonResponse("User not found.", false));
    } else {
      const result = await comparePassword(password, user.password);
      if (!result) {
        res
          .status(401)
          .json(commonResponse("Email or password is incorrect.", false));
      } else {
        const { _id, email, name, type } = user;
        const Token = JWT.sign({ id: _id, email, name, type }, "MERNSECRET", {
          expiresIn: "1d",
        });
        const RefreshToken = JWT.sign(
          { id: _id, email, name, type },
          "MERNSECRET",
          {
            expiresIn: "10d",
          }
        );
        const data = {
          user: {
            _id,
            email,
            name,
            type,
          },
          Token,
          RefreshToken,
        };
        res.status(200).json(commonResponse("sign-in successful", true, data));
      }
    }
  }
};

exports.getToken = async (req, res) => {
  const { token } = req.body;
  let user = await JWT.verify(token, "MERNSECRET");
  const { id, email, type } = user;
  const Token = JWT.sign({ id, email, type }, "MERNSECRET", {
    expiresIn: "1d",
  });
  const RefreshToken = JWT.sign({ id, email, type }, "MERNSECRET", {
    expiresIn: "10d",
  });
  if (!user) {
    res.status(500).json(commonResponse("something went wrong", false));
  } else {
    res.status(201).json(
      commonResponse("token refreshed", true, {
        token: Token,
        RefreshToken,
      })
    );
  }
};

exports.editUser = async (req, res) => {
  const { name, email, password } = req.body;
  let hashedPassword = undefined;
  if (password) {
    hashedPassword = await hashPassword(password);
  }
  User.findOneAndUpdate(
    { email: email },
    {
      name,
      email,
      ...(hashedPassword !== undefined && { password: hashedPassword }),
    }
  ).exec((err, user) => {
    if (err) {
      res.status(500).json(commonResponse("Something went wrong.", false));
    } else if (user) {
      res
        .status(201)
        .json(commonResponse("User edited successfully.", true, user));
    }
  });
};

const getfinalData = async (use) => {
  const allmonths = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  let result = [];

  allmonths.forEach((month) => {
    const item = use.find((item) => item.month === month);

    if (item) {
      result.push(item?.numberofdocuments);
    } else {
      result.push(0);
    }
  });

  return result;
};

exports.userStats = async (req, res) => {
  const use = await User.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
        },
        numberofdocuments: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: false,
        month: {
          $arrayElemAt: [
            [
              "",
              "january",
              "february",
              "march",
              "april",
              "may",
              "june",
              "july",
              "august",
              "september",
              "october",
              "november",
              "december",
            ],
            "$_id.month",
          ],
        },
        numberofdocuments: true,
      },
    },
  ]);
  const result = await getfinalData(use);
  res.status(200).json(commonResponse("done", true.valueOf, result));
};

exports.userBasedOnRole = async (req, res) => {
  const { type } = req.query;
  const user = await User.find({ type: type }).exec();
  if (!user) {
    res.status(500).json(commonResponse("something went wrong", false));
  } else {
    res.status(200).json(commonResponse("user list fetched", true, user));
  }
};

exports.allClients = async (req, res) => {
  const users = await User.find().exec();
  if (users) {
    res.status(200).json(commonResponse("users list fecthed", true, users));
  } else {
    res.status(500).json(commonResponse("something went wrong", false));
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.body;
  const user = await User.deleteMany({ _id: { $in: id } }).exec();
  if (!user) {
    res.status(500).json(commonResponse("something went wrong", false));
  } else {
    res.status(200).json(commonResponse("user deleted", true, user));
  }
};
