const Property = require("../models/property");
const { commonResponse } = require("../utils/reponse/response");
const stripe = require("stripe")(
  "sk_test_51IOInoJdyddb75kGO6iM2T5glxhKo5XDMB23LZjFqAcwrEjaOE12ACKcI5gqxFK8OUPXFZ074lfykPSthyWTB41T001xUP84vJ"
);

exports.addProperty = async (req, res) => {
  const {
    name,
    description,
    address,
    city,
    capacity,
    type,
    reviews,
    availability,
    area,
    amenities,
    images,
    approvalStatus,
    lat,
    lng,
    title,
    user,
    privateOfficeNumber,
    privateOffices,
    pricePerOffice,
    numberOfDesks,
    pricePerDesk,
    desks,
    conferenceRoom,
    NSmallC,
    NMediumC,
    NLargeC,
    SmallCPrice,
    MediumCPrice,
    LargeCPrice,
    SmallConference,
    MediumConference,
    LargeConference,
    reservedOffices,
    reservedDesks,
  } = req.body;
  console.log(privateOfficeNumber, pricePerOffice);
  const property = new Property({
    name,
    description,
    address,
    city,
    capacity,
    type,
    reviews: reviews,
    availability,
    area,
    amenities,
    images: images,
    approvalStatus,
    lat,
    lng,
    title,
    user,
    privateOfficeNumber: parseInt(privateOfficeNumber),
    privateOffices,
    pricePerOffice,
    numberOfDesks,
    pricePerDesk,
    desks,
    conferenceRoom,
    NSmallC,
    NMediumC,
    NLargeC,
    SmallCPrice,
    MediumCPrice,
    LargeCPrice,
    SmallConference,
    MediumConference,
    LargeConference,
    reservedOffices,
    reservedDesks,
  });
  property.save((err, manufacturer) => {
    if (err) {
      res.status(500).json(commonResponse(err, false));
    } else {
      res
        .status(201)
        .json(
          commonResponse("property created successfully", true, manufacturer)
        );
    }
  });
};

exports.getProperties = async (req, res) => {
  Property.find()
    .populate("amenities")
    .exec((err, properies) => {
      if (err) {
        console.log(err);
        res.status(500).json(commonResponse("something went wrong", false));
      } else {
        res
          .status(200)
          .json(commonResponse("properties list fetched", true, properies));
      }
    });
};

exports.specificProperty = async (req, res) => {
  const { id } = req.params;
  Property.findOne({ _id: id })
    .populate("amenities")
    .exec((err, proprty) => {
      if (err) {
        res.status(500).json(commonResponse("something went wrong", false));
      } else {
        res
          .status(200)
          .json(commonResponse("properties list fetched", true, proprty));
      }
    });
};

exports.getApprovedProperties = async (req, res) => {
  Property.find({ approvalStatus: "approved" }).exec((err, properties) => {
    if (err) {
      res.status(500).json(commonResponse("something went wrong", false));
    } else {
      res
        .status(200)
        .json(commonResponse("properties list fetched", true, properties));
    }
  });
};

exports.addReview = (req, res) => {
  const { id, reviews } = req.body;
  Property.findOneAndUpdate({ _id: id }, { reviews: reviews }).exec(
    (err, reviews) => {
      if (err) {
        res.status(500).json(commonResponse("something went wrong", false));
      } else {
        res
          .status(201)
          .json(commonResponse("properties edited", true, reviews));
      }
    }
  );
};

exports.propertyonCity = (req, res) => {
  const { city } = req.query;
  Property.find({ city: city, approvalStatus: "approved" }).exec(
    (err, properties) => {
      if (err) {
        res.status(500).json(commonResponse("something went wrong", false));
      } else {
        const temp = [];
        properties?.map((prop, index) => {
          if (temp.filter((e) => e.area === prop?.area).length > 0) {
            const ins = temp.map((e) => e.area).indexOf(prop?.area);
            console.log(prop?.area, "private office");
            if (prop?.type === "private office") {
              temp[ins]["privateNumber"] = temp[ins]["privateNumber"] + 1;
              temp[ins]["privateOfficePrice"] =
                temp[ins]["privateOfficePrice"] + prop?.pricePerOffice;
            } else if (prop?.type === "coWorking") {
              temp[ins]["coWorkingNumber"] = temp[ins]["coWorkingNumber"] + 1;
              temp[ins]["CoWorkingPrice"] =
                temp[ins]["CoWorkingPrice"] + prop?.pricePerDesk;
            } else if (prop.type === "mix") {
              temp[ins]["privateNumber"] = temp[ins]["privateNumber"] + 1;
              temp[ins]["privateOfficePrice"] =
                temp[ins]["privateOfficePrice"] + prop?.pricePerOffice;
              temp[ins]["coWorkingNumber"] = temp[ins]["coWorkingNumber"] + 1;
              temp[ins]["CoWorkingPrice"] =
                temp[ins]["CoWorkingPrice"] + prop?.pricePerDesk;
            }
          } else {
            temp.push({
              area: prop?.area,
              privateOfficePrice:
                prop?.type === "private office" || prop?.type === "mix"
                  ? prop?.pricePerOffice
                  : 0,
              CoWorkingPrice:
                prop?.type === "coWorking" || prop?.type === "mix"
                  ? prop?.pricePerDesk
                  : 0,
              privateNumber:
                prop?.type === "private office" || prop?.type === "mix" ? 1 : 0,
              coWorkingNumber:
                prop?.type === "coWorking" || prop?.type === "mix" ? 1 : 0,
            });
          }
        });
        const temp2 = [];
        temp.map((tem) => {
          temp2.push({
            area: tem?.area,
            privateOfficePrice: tem?.privateOfficePrice / tem?.privateNumber,
            CoWorkingPrice: tem?.CoWorkingPrice / tem?.coWorkingNumber,
            privateNumber: tem?.privateNumber,
            coWorkingNumber: tem?.coWorkingNumber,
          });
        });

        res.status(200).json(commonResponse("properties edited", true, temp2));
      }
    }
  );
};

exports.searchProperty = async (req, res) => {
  const { city, type, size, price } = req.query;
  console.log(city, type, size, price);
  Property.find({
    ...(city && { city: city }),
    ...(type && { type: type }),
    ...(size && { capacity: { $gte: size } }),
    ...(price?.min && { price: { $gte: price?.min, $lte: price?.max } }),
    approvalStatus: "approved",
  }).exec((err, properties) => {
    if (err) {
      res.status(500).json(commonResponse("something went wrong", false));
    } else {
      res
        .status(200)
        .json(commonResponse("properties edited", true, properties));
    }
  });
};

exports.propertyBasedonUser = (req, res) => {
  const { id, status } = req.query;
  console.log(status);
  Property.find({ user: id, ...(status && { approvalStatus: status }) }).exec(
    (err, properties) => {
      if (err) {
        res.status(500).json(commonResponse("something went wrong", false));
      } else {
        res
          .status(200)
          .json(commonResponse("properties edited", true, properties));
      }
    }
  );
};

exports.Payments = async (req, res) => {
  const { id, amount } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(amount * 1000),
      currency: "USD",
      description: "token amount",
      payment_method: id,
      confirm: true,
    });
    res.status(201).json(commonResponse("payment successful", true, {}));
  } catch (error) {
    res
      .status(403)
      .json(commonResponse("something went wrong in payment", false));
  }
};

exports.Available = async (req, res) => {
  const { propertyId, startingDate, endingDate, type, type2 } = req.body;
  console.log(propertyId, startingDate, endingDate, type, type2);
  Property.findOne({ _id: propertyId }).exec((err, property) => {
    if (err) {
      res.status(500).json(commonResponse("something went wrong", false));
    } else {
      if (type === "private office") {
        const tem = property?.privateOffices?.map((off) => {
          return false;
        });

        property?.privateOffices?.map((off, index) => {
          off?.bookings?.map((book) => {
            if (off?.reserved === true) {
              tem[index] = true;
            } else {
              off?.bookings?.map((book) => {
                if (
                  (startingDate >= book?.startDate &&
                    startingDate <= book.endDate) ||
                  (endingDate >= book.startDate &&
                    endingDate <= book.endDate) ||
                  (startingDate <= book.startDate && endingDate >= book.endDate)
                ) {
                  tem[index] = true;
                }
              });
            }
          });
        });
        const data = {
          private: tem,
        };
        res.status(200).json(commonResponse("property available", true, data));
      } else if (type === "coWorking") {
        const tem = property?.desks?.map((off) => {
          return false;
        });

        property?.desks?.map((off, index) => {
          off?.bookings?.map((book) => {
            if (off?.reserved === true) {
              tem[index] = true;
            } else {
              off?.bookings?.map((book) => {
                if (
                  (startingDate >= book?.startDate &&
                    startingDate <= book.endDate) ||
                  (endingDate >= book.startDate &&
                    endingDate <= book.endDate) ||
                  (startingDate <= book.startDate && endingDate >= book.endDate)
                ) {
                  tem[index] = true;
                }
              });
            }
          });
        });
        const data = {
          coWorking: tem,
        };
        res.status(200).json(commonResponse("property available", true, data));
      } else if (type === "mix") {
        const tem = property?.privateOffices?.map((off) => {
          return false;
        });

        property?.privateOffices?.map((off, index) => {
          if (off?.reserved === true) {
            tem[index] = true;
          } else {
            off?.bookings?.map((book) => {
              if (
                (startingDate >= book?.startDate &&
                  startingDate <= book.endDate) ||
                (endingDate >= book.startDate && endingDate <= book.endDate) ||
                (startingDate <= book.startDate && endingDate >= book.endDate)
              ) {
                tem[index] = true;
              }
            });
          }
        });
        const tem2 = property?.desks?.map((off) => {
          return false;
        });

        property?.desks?.map((off, index) => {
          if (off?.reserved === true) {
            tem2[index] = true;
          } else {
            off?.bookings?.map((book) => {
              if (
                (startingDate >= book?.startDate &&
                  startingDate <= book.endDate) ||
                (endingDate >= book.startDate && endingDate <= book.endDate) ||
                (startingDate <= book.startDate && endingDate >= book.endDate)
              ) {
                tem2[index] = true;
              }
            });
          }
        });
        const data = {
          private: tem,
          coWorking: tem2,
        };
        res.status(200).json(commonResponse("property available", true, data));
      } else if (type === "conferenceRoom") {
        if (type2 === "smallC") {
          const tem = property?.SmallConference?.map((off) => {
            return false;
          });

          property?.SmallConference?.map((off, index) => {
            off?.bookings?.map((book) => {
              if (
                (startingDate >= book?.startDate &&
                  startingDate <= book.endDate) ||
                (endingDate >= book.startDate && endingDate <= book.endDate) ||
                (startingDate <= book.startDate && endingDate >= book.endDate)
              ) {
                tem[index] = true;
              }
            });
          });
          const data = {
            smallC: tem,
          };
          res
            .status(200)
            .json(commonResponse("property available", true, data));
        } else if (type2 === "MediumC") {
          const tem = property?.MediumConference?.map((off) => {
            return false;
          });

          property?.MediumConference?.map((off, index) => {
            off?.bookings?.map((book) => {
              if (
                (startingDate >= book?.startDate &&
                  startingDate <= book.endDate) ||
                (endingDate >= book.startDate && endingDate <= book.endDate) ||
                (startingDate <= book.startDate && endingDate >= book.endDate)
              ) {
                tem[index] = true;
              }
            });
          });
          const data = {
            mediumC: tem,
          };
          res
            .status(200)
            .json(commonResponse("property available", true, data));
        } else if (type2 === "LargeC") {
          const tem = property?.LargeConference?.map((off) => {
            return false;
          });

          property?.LargeConference?.map((off, index) => {
            off?.bookings?.map((book) => {
              if (
                (startingDate >= book?.startDate &&
                  startingDate <= book.endDate) ||
                (endingDate >= book.startDate && endingDate <= book.endDate) ||
                (startingDate <= book.startDate && endingDate >= book.endDate)
              ) {
                tem[index] = true;
              }
            });
          });
          const data = {
            largeC: tem,
          };
          res
            .status(200)
            .json(commonResponse("property available", true, data));
        }
      }
    }
  });
};

const getCurrentDateInSeconds = () => {
  const d = new Date();
  return d.getTime() / 1000;
};

exports.releaseBooking = async (req, res) => {
  const { propertyId, type } = req.body;
  Property.findOne({ _id: propertyId }).exec((err, property) => {
    if (err) {
      res.status(500).json(commonResponse("something went wrong", false));
    } else {
      const temp = [];
      const temp2 = [];
      const temp3 = [];
      const temp4 = [];
      const temp5 = [];
      property.privateOffices.map((off, index) => {
        temp.push(off);
        temp[index].bookings = off.bookings.filter((book) => {
          return book.endDate > getCurrentDateInSeconds();
        });
      });
      property.desks.map((off, index) => {
        temp2.push(off);
        temp2[index].bookings = off.bookings.filter((book) => {
          return book.endDate > getCurrentDateInSeconds();
        });
      });
      property.SmallConference.map((off, index) => {
        temp3.push(off);
        temp3[index].bookings = off.bookings.filter((book) => {
          return book.endDate > getCurrentDateInSeconds();
        });
      });
      property.MediumConference.map((off, index) => {
        temp4.push(off);
        temp4[index].bookings = off.bookings.filter((book) => {
          return book.endDate > getCurrentDateInSeconds();
        });
      });
      property.LargeConference.map((off, index) => {
        temp5.push(off);
        temp5[index].bookings = off.bookings.filter((book) => {
          return book.endDate > getCurrentDateInSeconds();
        });
      });
      Property.findOneAndUpdate(
        { _id: propertyId },
        {
          privateOffices: temp,
          desks: temp2,
          SmallConference: temp3,
          MediumConference: temp4,
          LargeConference: temp5,
        }
      ).exec((err, property) => {
        if (err) {
          res.status(500).json(commonResponse("something went wrong", false));
        } else {
          const data = {
            temp,
            temp2,
            temp3,
            temp4,
            temp5,
          };
          res.status(200).json(commonResponse("booking released", true, data));
        }
      });
    }
  });
};

const Cities = [
  "Islamabad",
  "Lahore",
  "Karachi",
  "Peshawar",
  "Rawalpindi",
  "Multan",
  "Haiderabad",
  "Faisalabad",
];

const getNumberOfOfficeandDeskbasedOnCity = async (property) => {
  const temp = Cities.map((city) => {
    return {
      city: city,
      privateOffice: 0,
      desk: 0,
    };
  });
  property.map((prop) => {
    temp.map((city) => {
      if (city.city === prop.city) {
        city.privateOffice += prop.privateOffices.length;
        city.desk += prop.desks.length;
      }
    });
  });
  return temp;
};

exports.FindProp = async (req, res) => {
  Property.find().exec(async (err, property) => {
    if (err) {
      res.status(500).json(commonResponse("something went wrong", false));
    } else {
      const tempe = await getNumberOfOfficeandDeskbasedOnCity(property);
      res.status(200).json(commonResponse("property found", true, tempe));
    }
  });
};

exports.EditProperty = async (req, res) => {
  const { _id, approvalStatus } = req.body;
  console.log(_id, approvalStatus);
  Property.findOneAndUpdate(
    { _id: _id },
    { approvalStatus: approvalStatus }
  ).exec((err, property) => {
    if (err) {
      res.status(500).json(commonResponse("something went wrong", false));
    } else {
      res.status(200).json(commonResponse("property updated", true, property));
    }
  });
};

exports.changeReserve = (req, res) => {
  const { _id, reservedOffices, reservedDesks, privateOffices, desks } =
    req.body;
  Property.findOneAndUpdate(
    { _id: _id },
    {
      reservedOffices: reservedOffices,
      reservedDesks: reservedDesks,
      privateOffices: privateOffices,
      desks: desks,
    }
  ).exec((err, property) => {
    if (err) {
      res.status(500).json(commonResponse("something went wrong", false));
    } else {
      res.status(200).json(commonResponse("property updated", true, property));
    }
  });
};
