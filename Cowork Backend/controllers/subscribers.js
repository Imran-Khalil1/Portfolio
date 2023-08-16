const Subscriber = require("../models/subscribers");
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
      subject: "Cowork NewsLetter",
      html: "<div><h1>Welcome to CoWork</h1><br></br><p>You have successfully subscribed to the new letter</p><br></br><p>You will now get updates about the new listings</p></div>",
    };
    const result = await transport.sendMail(mailoption);
    return result;
  } catch (error) {
    return error;
  }
};

exports.addSubscriber = async (req, res) => {
  const { email } = req.body;
  const subscriber = new Subscriber({
    email,
  });
  subscriber.save((err, manufacturer) => {
    if (err) {
      res.status(500).json(commonResponse(err, false));
    } else {
      sendMail(email)
        .then((result) => {
          res
            .status(201)
            .json(
              commonResponse(
                "subscriber created successfully",
                true,
                manufacturer
              )
            );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};
