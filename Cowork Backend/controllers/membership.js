const Member = require("../models/membership");
const { commonResponse } = require("../utils/reponse/response");
exports.addMember = async (req, res) => {
  const { user, property, title, pricePerOffice, pricePerDesk } = req.body;
  const member = new Member({
    user,
    property,
    title,
    pricePerOffice,
    pricePerDesk,
  });
  member.save((err, manufacturer) => {
    if (err) {
      res.status(500).json(commonResponse(err, false));
    } else {
      res
        .status(201)
        .json(
          commonResponse("member created successfully", true, manufacturer)
        );
    }
  });
};

exports.SpecificMemeber = (req, res) => {
  const { id } = req.params;
  Member.find({ property: id }).exec((err, members) => {
    if (err) {
      res.status(500).json(commonResponse(err, false));
    } else {
      res.status(200).json(commonResponse("member fetched", true, members));
    }
  });
};
