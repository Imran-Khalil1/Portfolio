const Amneties = require("../models/ameneties");
const { commonResponse } = require("../utils/reponse/response");
const {
  validateTyreManufacturer,
} = require("../utils/validators/fieldsValidator");

exports.addAmneties = async (req, res) => {
  const {
    internet,
    powerBackup,
    Kitchen,
    waitingArea,
    PrintingAndScanning,
    conferenceRoom,
    coolingAndHeating,
    receptionServices,
    septateWashroom,
  } = req.body;
  const amneties = new Amneties({
    internet,
    powerBackup,
    Kitchen,
    waitingArea,
    PrintingAndScanning,
    conferenceRoom,
    coolingAndHeating,
    receptionServices,
    septateWashroom,
  });
  amneties.save((err, manufacturer) => {
    if (err) {
      res.status(500).json(commonResponse("something went wrong", false));
    } else {
      res
        .status(201)
        .json(
          commonResponse("amneties created successfully", true, manufacturer)
        );
    }
  });
};

exports.getAmneties = async (req, res) => {
  Amneties.find().exec((err, amneties) => {
    if (err) {
      res.status(500).json(commonResponse("something went wrong", false));
    } else {
      res
        .status(200)
        .json(commonResponse("amneties list fetched", true, amneties));
    }
  });
};

exports.getSingleAmnity = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(403).json(commonResponse("amnity id not found", false));
  } else {
    const amnity = await Amneties.findOne({ _id: id }).exec();
    if (!amnity) {
      res.status(401).json(commonResponse("amnity not found.", false));
    } else {
      res.status(200).json(commonResponse("amnity fetched", true, amnity));
    }
  }
};

exports.editAmnity = async (req, res) => {
  const {
    id,
    dedicatedDesk,
    internet,
    powerBackup,
    Kitchen,
    waitingArea,
    PrintingAndScanning,
    conferenceRoom,
    coolingAndHeating,
    receptionServices,
    septateWashroom,
  } = req.body;
  if (!id) {
    res.status(403).json(commonResponse("amnity id is missing", false));
  } else {
    const amnity = await Amneties.findOne({ _id: id }).exec();
    if (!amnity) {
      res.status(403).json(commonResponse("amnity not found.", false));
    } else {
      Amneties.findOneAndUpdate(
        { _id: id },
        {
          dedicatedDesk,
          internet,
          powerBackup,
          Kitchen,
          waitingArea,
          PrintingAndScanning,
          conferenceRoom,
          coolingAndHeating,
          receptionServices,
          septateWashroom,
        }
      ).exec((err, amnity) => {
        if (err) {
          res.status(500).json(commonResponse("something went wrong", false));
        } else {
          res
            .status(201)
            .json(
              commonResponse("tyre amnity edited successfully", true, amnity)
            );
        }
      });
    }
  }
};

exports.deleteAmnity = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(403).json(commonResponse("amnity id is missing", false));
  } else {
    const amnity = await Amneties.findOne({ _id: id }).exec();
    if (!amnity) {
      res.status(400).json(commonResponse("tyre amnity not found.", false));
    } else {
      Amneties.findOneAndDelete({ _id: id }).exec((err, amnity) => {
        if (err) {
          res.status(500).json(commonResponse("something went wrong.", false));
        } else {
          res.status(201).json(commonResponse("tyre amnity deleted.", true));
        }
      });
    }
  }
};
