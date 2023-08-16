const Quotations = require("../models/qoutations");
const { commonResponse } = require("../utils/reponse/response");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const clientId =
  "195568953261-v2eghe0he6i5i09amrgla2fd3knb31ol.apps.googleusercontent.com";
const client_secret = "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";
const redirectURI = "https://developers.google.com/oauthplayground";
const refreshToken =
  "1//0438DBGB_vzKNCgYIARAAGAQSNwF-L9IrS2Pj8FgEDHqPKwiWV1hUNFHHWzfNGzNS3-n2x8574xq27Er3sHIaX2N7ya99b6pxpMQ";

const oAuth2CLient = new google.auth.OAuth2(
  clientId,
  client_secret,
  redirectURI
);
oAuth2CLient.setCredentials({ refresh_token: refreshToken });
const Property = require("../models/property");

const sendMail = async (email) => {
  try {
    const accessToken = await oAuth2CLient.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "oAuth2",
        user: "arianraja127@gmail.com",
        clientId: clientId,
        clientSecret: client_secret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });
    const mailoption = {
      from: "arianraja127@gmail.com <arianraja127@gmail.com",
      to: email,
      subject: "Cowork Quotation",
      text: "So this the Quotation",
    };
    const result = await transport.sendMail(mailoption);
    return result;
  } catch (error) {
    return error;
  }
};

exports.addQuotation = async (req, res) => {
  const {
    user,
    property,
    numberOfDesks,
    numberOfPrivateOffices,
    numberOfSmallConferenceRooms,
    numberOfMediumConferenceRooms,
    numberOfLargeConferenceRooms,
    startDate,
    endDate,
    listOFPrivateOffices,
    listOFDesks,
    listOFSmallConferenceRooms,
    listOFMediumConferenceRooms,
    listOFLargeConferenceRooms,
    type,
    PV,
    PD,
    PSC,
    PMC,
    PLC,
    totalPrice,
  } = req.body;
  const quotation = new Quotations({
    user,
    property,
    numberOfDesks,
    numberOfPrivateOffices,
    numberOfSmallConferenceRooms,
    numberOfMediumConferenceRooms,
    numberOfLargeConferenceRooms,
    startDate,
    endDate,
    listOFPrivateOffices,
    listOFDesks,
    listOFSmallConferenceRooms,
    listOFMediumConferenceRooms,
    listOFLargeConferenceRooms,
    type,
    totalPrice,
  });
  quotation.save((err, manufacturer) => {
    if (err) {
      res.status(500).json(commonResponse(err, false));
    } else {
      Property.findOneAndUpdate(
        { _id: property },
        {
          ...(PV?.length > 0 && { privateOffices: PV }),
          ...(PD?.length > 0 && { desks: PD }),
          ...(PSC?.length > 0 && { SmallConference: PSC }),
          ...(PMC?.length > 0 && { MediumConference: PMC }),
          ...(PLC?.length > 0 && { LargeConference: PLC }),
        }
      ).exec((err, result) => {
        if (err) {
          res.status(500).json(commonResponse(err, false));
        } else {
          res.status(200).json(commonResponse(manufacturer, true));
        }
      });
    }
  });
};

exports.getBookings = async (req, res) => {
  const { id } = req.params;
  Quotations.find({ user: id })
    .populate("property")
    .exec((err, quotation) => {
      if (err) {
        res.status(500).json(commonResponse(err, false));
      } else {
        res
          .status(200)
          .json(commonResponse("Quotation fetched", true, quotation));
      }
    });
};

exports.getBookingByID = async (req, res) => {
  const { id } = req.params;
  Quotations.findOne({ _id: id })
    .populate("property")
    .exec((err, quotation) => {
      if (err) {
        res.status(500).json(commonResponse(err, false));
      } else {
        res
          .status(200)
          .json(commonResponse("Quotation fetched", true, quotation));
      }
    });
};
