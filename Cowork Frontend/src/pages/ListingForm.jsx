import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useStyles from "./listingformstyles";
import { Box, Radio, Typography, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./listingform.scss";
import { cities } from "../assets/data";
import { postService } from "../services/service";
import { toast } from "react-toastify";
import { BsPlusCircle } from "react-icons/bs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { MdEventSeat } from "react-icons/md";

function ListingForm() {
  const classes = useStyles();
  const [city, setCity] = useState();
  const [availability, setAvailablity] = useState();
  const [next, setNext] = useState(0);
  const [membership, setMemberShip] = useState([]);
  const [property, setProperty] = useState();
  const user = JSON.parse(localStorage.getItem("coWorkUser"));
  const [text1, setText1] = useState(EditorState.createEmpty());
  const [description, setDescription] = useState();
  const [images, setImages] = useState([]);
  const [count, setCOunt] = useState(0);
  const [type, setType] = useState();
  const [conferenceRoom, setConferenceRoom] = useState(null);
  const [privateOffices, setPrivateOffices] = useState([]);
  const [desks, setDesks] = useState([]);
  const [privateOfficeNumber, setPrivateOfficeNumber] = useState(0);
  const [numberOfDesks, setNumberOfDesks] = useState(0);
  const [selectedOffice, setSelectedOffice] = useState([]);
  const [selectedDesk, setSelectedDesk] = useState([]);
  const [amnities, setAmenities] = useState({
    internet: null,
    powerBackup: null,
    Kitchen: null,
    waitingArea: null,
    PrintingAndScanning: null,
    conferenceRoom: null,
    coolingAndHeating: null,
    receptionServices: null,
    septateWashroom: null,
    dedicatedDesk: null,
    pricePerDesk: null,
    number: null,
  });

  const HandleOffices = () => {
    if (privateOfficeNumber > 0) {
      const arr = [];
      for (let i = 0; i < privateOfficeNumber; i++) {
        arr.push({
          id: i,
          reserved: false,
        });
      }
      setPrivateOffices(arr);
    }
  };
  useEffect(() => {
    HandleOffices();
  }, [privateOfficeNumber]);

  const handleDEs = () => {
    if (numberOfDesks > 0) {
      const arr = [];
      for (let i = 0; i < numberOfDesks; i++) {
        arr.push({
          id: i,
          reserved: false,
        });
      }
      setDesks(arr);
    }
  };

  useEffect(() => {
    handleDEs();
  }, [numberOfDesks]);

  console.log(privateOffices, desks, privateOfficeNumber, numberOfDesks);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      type: "",
      availability: "",
      area: "",
      lat: "",
      lng: "",
      title: "",
      amenities: "",
      images: "",
      user: "",
      privateOfficeNumber: "",
      privateOffices: [],
      pricePerOffice: "",
      numberOfDesks: "",
      pricePerDesk: "",
      desks: [],
      conferenceRoom: null,
      NSmallC: "",
      NMediumC: "",
      NLargeC: "",
      SmallCPrice: "",
      MediumCPrice: "",
      LargeCPrice: "",
      SmallConference: [],
      MediumConference: [],
      LargeConference: [],
      reservedOffices: [],
      reservedDesks: [],
    },

    onSubmit: async (data) => {
      const dat = {
        internet: amnities?.internet === "true" ? true : false,
        powerBackup: amnities?.powerBackup === "true" ? true : false,
        Kitchen: amnities?.Kitchen === "true" ? true : false,
        waitingArea: amnities?.waitingArea === "true" ? true : false,
        PrintingAndScanning:
          amnities?.PrintingAndScanning === "true" ? true : false,
        conferenceRoom: amnities?.conferenceRoom === "true" ? true : false,
        coolingAndHeating:
          amnities?.coolingAndHeating === "true" ? true : false,
        receptionServices:
          amnities?.receptionServices === "true" ? true : false,
        septateWashroom: amnities?.septateWashroom === "true" ? true : false,
      };
      const res = await postService("add/addAmnity", dat);
      if (res?.data?.success) {
        toast.success("amnities added");
        data.amenities = res?.data?.data?._id;
        data.title = data.name;
        data.availability = availability === "true" ? true : false;
        data.conferenceRoom = conferenceRoom === "true" ? true : false;
        data.city = city;
        data.description = description;
        data.images = images;
        data.user = user?._id;
        data.type = type;
        const Pv = [];
        const D = [];
        const SmallC = [];
        const MediumC = [];
        const LargeC = [];
        data.privateOfficeNumber = parseInt(privateOfficeNumber);
        data.numberOfDesks = parseInt(numberOfDesks);
        data.reservedDesks = selectedDesk;
        data.reservedOffices = selectedOffice;
        if (data.NSmallC) {
          for (let i = 0; i < data.NSmallC; i++) {
            SmallC.push({
              id: i,
            });
          }
        }
        if (data.NMediumC) {
          for (let i = 0; i < data.NMediumC; i++) {
            MediumC.push({
              id: i,
            });
          }
        }
        if (data.NLargeC) {
          for (let i = 0; i < data.NLargeC; i++) {
            LargeC.push({
              id: i,
            });
          }
        }
        if (privateOffices.length > 0) {
          data.privateOffices = privateOffices;
        }
        if (desks.length > 0) {
          data.desks = desks;
        }
        if (SmallC.length > 0) {
          data.SmallConference = SmallC;
        }
        if (MediumC.length > 0) {
          data.MediumConference = MediumC;
        }
        if (LargeC.length > 0) {
          data.LargeConference = LargeC;
        }

        console.log(data, privateOffices);

        const result = await postService("addProperty", data);
        if (result?.data?.success) {
          toast.success("property added added");
          setNext(1);
          setProperty(result?.data?.data?._id);
        }
      }
    },
  });

  const addMembership = (title) => {
    const filtered = membership?.filter((x) => x?.title === title);
    if (filtered?.length === 0) {
      setMemberShip([
        ...membership,
        {
          user: user?._id,
          propertyType: "",
          property: property,
          noOfPeople: "",
          title: title,
          amountPerMonth: "",
          discount: null,
        },
      ]);
    } else {
      toast.warning(`${title} membership is already added`);
    }
  };

  const handleMembership = (name, value, index) => {
    const temp = membership;
    temp[index][`${name}`] = value;
    setMemberShip(temp);
  };

  const navigate = useNavigate();

  const handleIt = async () => {
    let result = membership.map(async (member) => {
      let res = await postService("/addMembers", member);
      return res?.data?.success;
    });
    if (result) {
      toast.success("your listing is under review. We will review it shortly.");
      navigate("/location");
    }
  };

  const handleStateD = (editorState) => {
    setText1(editorState);
  };

  const handlecontentD = (contentState) => {
    let temp = draftToHtml(contentState);
    setDescription(temp);
  };

  const handleSubmit = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "vdqeov5r");
    data.append("cloud_name", "dwxqg9so3");
    axios
      .post("https://api.cloudinary.com/v1_1/dwxqg9so3/image/upload", data)
      .then((res) => {
        setImages([...images, { image: res?.data?.url }]);
      });
  };

  const handleRemove = (index) => {
    const temp = images;
    temp.splice(index, 1);
    setImages(temp);
    setCOunt(count + 1);
  };

  const handleOffice = (index) => {
    const temp = selectedOffice;
    const i = selectedOffice.indexOf(index);
    if (i === -1) {
      temp.push(index);
      setSelectedOffice(temp);
      const te = privateOffices;
      te[index]["reserved"] = true;
      setPrivateOffices(te);
    } else {
      temp.splice(i, 1);
      setSelectedOffice(temp);
      const te = privateOffices;
      te[index]["reserved"] = false;
      setPrivateOffices(te);
    }
    setCOunt(count + 1);
  };

  const handleDesks = (index) => {
    const temp = selectedDesk;
    const i = selectedDesk.indexOf(index);
    if (i === -1) {
      temp.push(index);
      setSelectedDesk(temp);
      const te = desks;
      te[index]["reserved"] = true;
      setDesks(te);
    } else {
      temp.splice(i, 1);
      setSelectedDesk(temp);
      const te = desks;
      te[index]["reserved"] = false;
      setDesks(te);
    }
    setCOunt(count + 1);
  };

  return (
    <Box>
      <Header />
      <Box className={classes.maindiv}>
        <form onSubmit={formik.handleSubmit}>
          <Box className={classes.seconddiv}>
            <center>
              <h1>{next === 0 ? "List Property" : "Membership"}</h1>
            </center>
            {next === 0 ? (
              <Box className={classes.innerDiv}>
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>Name of Property</label>
                    <input
                      className="signup-input"
                      placeholder="Name"
                      type="text "
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <div className="input_div_listing">
                    <label>Address</label>
                    <input
                      className="signup-input"
                      placeholder="Address"
                      type="text"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                </div>
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>City</label>
                    <select
                      className="listing_select"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option selected disabled>
                        Please select the city
                      </option>
                      {cities?.map((city) => {
                        return <option value={city}>{city}</option>;
                      })}
                    </select>
                  </div>
                  <div className="input_div_listing">
                    <label>Capacity</label>
                    <input
                      className="signup-input"
                      placeholder="Capacity i.e number of persons"
                      type="text"
                      name="capacity"
                      value={formik.values.capacity}
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                </div>
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>Type of Property</label>
                    <select
                      className="listing_select"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option selected disabled>
                        Please select the property type
                      </option>
                      <option value="private office">Private office</option>
                      <option value="coWorking">coWorking</option>
                      <option value="mix">Mix</option>
                    </select>
                  </div>
                  <div className="input_div_listing">
                    <label>Area</label>
                    <input
                      className="signup-input"
                      placeholder="Area"
                      type="text"
                      name="area"
                      value={formik.values.area}
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                </div>
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>Latitude</label>
                    <input
                      className="signup-input"
                      placeholder="latitude"
                      type="text"
                      name="lat"
                      value={formik.values.lat}
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <div className="input_div_listing">
                    <label>Longitude</label>
                    <input
                      className="signup-input"
                      placeholder="Longitude"
                      type="text"
                      name="lng"
                      value={formik.values.lng}
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                </div>
                {type === "private office" ? (
                  <>
                    <div>
                      <div className="listing_top">
                        <div className="input_div_listing">
                          <label>Number of Private offices</label>
                          <input
                            className="signup-input"
                            placeholder="Number of Private offices"
                            type="text"
                            name="privateOfficeNumber"
                            value={privateOfficeNumber}
                            onChange={(e) =>
                              setPrivateOfficeNumber(e.target.value)
                            }
                          ></input>
                        </div>
                        <div className="input_div_listing">
                          <label>Price per Office</label>
                          <input
                            className="signup-input"
                            placeholder="price per office per day"
                            type="text"
                            name="pricePerOffice"
                            value={formik.values.pricePerOffice}
                            onChange={formik.handleChange}
                          ></input>
                        </div>
                      </div>
                    </div>
                    {privateOfficeNumber > 0 ? (
                      <div className="reserve_main">
                        <label className="reserve_label">Reserve Office</label>
                        <div className="private_selection">
                          {privateOffices?.map((office, index) => {
                            return (
                              <div
                                className={
                                  selectedOffice?.includes(index)
                                    ? "seat_yes_active"
                                    : "seat_yes"
                                }
                                onClick={() => handleOffice(index)}
                              >
                                <i style={{ color: "white" }}>
                                  <MdEventSeat />
                                </i>
                                <span style={{ color: "white" }}>P{index}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : null}
                {type === "coWorking" ? (
                  <>
                    <div>
                      <div className="listing_top">
                        <div className="input_div_listing">
                          <label>Number of desks</label>
                          <input
                            className="signup-input"
                            placeholder="Number of desks"
                            type="text"
                            name="numberOfDesks"
                            value={numberOfDesks}
                            onChange={(e) => setNumberOfDesks(e.target.value)}
                          ></input>
                        </div>
                        <div className="input_div_listing">
                          <label>Price per Desk</label>
                          <input
                            className="signup-input"
                            placeholder="Price per desk per day"
                            type="text"
                            name="pricePerDesk"
                            value={formik.values.pricePerDesk}
                            onChange={formik.handleChange}
                          ></input>
                        </div>
                      </div>
                    </div>
                    {numberOfDesks > 0 ? (
                      <div className="reserve_main">
                        <label className="reserve_label">Reserve Desks</label>
                        <div className="private_selection">
                          {desks?.map((office, index) => {
                            return (
                              <div
                                className={
                                  selectedDesk?.includes(index)
                                    ? "seat_yes_active"
                                    : "seat_yes"
                                }
                                onClick={() => handleDesks(index)}
                              >
                                <i style={{ color: "white" }}>
                                  <MdEventSeat />
                                </i>
                                <span style={{ color: "white" }}>D{index}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : null}
                {type === "mix" ? (
                  <div>
                    <div className="listing_top">
                      <div className="input_div_listing">
                        <label>Number of Private offices</label>
                        <input
                          className="signup-input"
                          placeholder="Number of Private offices"
                          type="text"
                          name="privateOfficeNumber"
                          value={privateOfficeNumber}
                          onChange={(e) =>
                            setPrivateOfficeNumber(e.target.value)
                          }
                        ></input>
                      </div>
                      <div className="input_div_listing">
                        <label>Price per Office</label>
                        <input
                          className="signup-input"
                          placeholder="Price per office per day"
                          type="text"
                          name="pricePerOffice"
                          value={formik.values.pricePerOffice}
                          onChange={formik.handleChange}
                        ></input>
                      </div>
                    </div>
                    {privateOfficeNumber > 0 ? (
                      <div className="reserve_main">
                        <label className="reserve_label">Reserve Office</label>
                        <div className="private_selection">
                          {privateOffices?.map((office, index) => {
                            return (
                              <div
                                className={
                                  selectedOffice?.includes(index)
                                    ? "seat_yes_active"
                                    : "seat_yes"
                                }
                                onClick={() => handleOffice(index)}
                              >
                                <i style={{ color: "white" }}>
                                  <MdEventSeat />
                                </i>
                                <span style={{ color: "white" }}>P{index}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                    <div className="listing_top">
                      <div className="input_div_listing">
                        <label>Number of desks</label>
                        <input
                          className="signup-input"
                          placeholder="Number of desks"
                          type="text"
                          name="numberOfDesks"
                          value={numberOfDesks}
                          onChange={(e) => setNumberOfDesks(e.target.value)}
                        ></input>
                      </div>
                      <div className="input_div_listing">
                        <label>Price per Desk</label>
                        <input
                          className="signup-input"
                          placeholder="Price per desk per day"
                          type="text"
                          name="pricePerDesk"
                          value={formik.values.pricePerDesk}
                          onChange={formik.handleChange}
                        ></input>
                      </div>
                    </div>
                    {numberOfDesks > 0 ? (
                      <div className="reserve_main">
                        <label className="reserve_label">Reserve Desks</label>
                        <div className="private_selection">
                          {desks?.map((office, index) => {
                            return (
                              <div
                                className={
                                  selectedDesk?.includes(index)
                                    ? "seat_yes_active"
                                    : "seat_yes"
                                }
                                onClick={() => handleDesks(index)}
                              >
                                <i style={{ color: "white" }}>
                                  <MdEventSeat />
                                </i>
                                <span style={{ color: "white" }}>D{index}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>Availability</label>
                    <select
                      className="listing_select"
                      value={availability}
                      onChange={(e) => setAvailablity(e.target.value)}
                    >
                      <option selected disabled>
                        Please select the availability status
                      </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>Conference Rooms</label>
                    <select
                      className="listing_select"
                      value={conferenceRoom}
                      onChange={(e) => setConferenceRoom(e.target.value)}
                    >
                      <option selected disabled>
                        Please select the Conference room status
                      </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                {conferenceRoom === "true" ? (
                  <div className="listing_top">
                    <div className="input_div_listing">
                      <label>Number of small Conference Rooms</label>
                      <input
                        className="signup-input"
                        placeholder="Number of small conference rooms"
                        type="text"
                        name="NSmallC"
                        value={formik.values.NSmallC}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                    <div className="input_div_listing">
                      <label>Price of Small conference room per hour</label>
                      <input
                        className="signup-input"
                        placeholder="price of small conference room"
                        type="text"
                        name="SmallCPrice"
                        value={formik.values.SmallCPrice}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                  </div>
                ) : null}
                {conferenceRoom === "true" ? (
                  <div className="listing_top">
                    <div className="input_div_listing">
                      <label>Number of Medium Conference Rooms</label>
                      <input
                        className="signup-input"
                        placeholder="number of medium conference rooms"
                        type="text"
                        name="NMediumC"
                        value={formik.values.NMediumC}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                    <div className="input_div_listing">
                      <label>Price of Medium conference room per hour</label>
                      <input
                        className="signup-input"
                        placeholder="price of medium conference rooms"
                        type="text"
                        name="MediumCPrice"
                        value={formik.values.MediumCPrice}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                  </div>
                ) : null}
                {conferenceRoom === "true" ? (
                  <div className="listing_top">
                    <div className="input_div_listing">
                      <label>Number of Large Conference Rooms</label>
                      <input
                        className="signup-input"
                        placeholder="number of large conference rooms"
                        type="text"
                        name="NLargeC"
                        value={formik.values.NLargeC}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                    <div className="input_div_listing">
                      <label>Price of Large conference room per hour</label>
                      <input
                        className="signup-input"
                        placeholder="price of large conference rooms"
                        type="text"
                        name="LargeCPrice"
                        value={formik.values.LargeCPrice}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                  </div>
                ) : null}
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>Description</label>
                    <Editor
                      editorStyle={{
                        border: "1px solid #cecece",
                        height: "250px",
                        width: "100%",
                        marginTop: "10px",
                      }}
                      editorState={text1}
                      onEditorStateChange={handleStateD}
                      onContentStateChange={handlecontentD}
                    />
                  </div>
                </div>
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>Images</label>
                    <input
                      className="signup-input"
                      placeholder="Price of Property"
                      type="file"
                      name="price"
                      onChange={(e) => handleSubmit(e.target.files[0])}
                    ></input>
                  </div>
                </div>
                <div className="listing_images">
                  {images?.map((image, index) => {
                    return (
                      <div className="it_is_done">
                        <img
                          src={image?.image}
                          className="liosting_image"
                        ></img>
                        <div className="inner_minus">
                          <i onClick={() => handleRemove(index)}>
                            <AiOutlineMinusCircle />
                          </i>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <center>
                  <h1>Amenities</h1>
                </center>
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>Internet</label>
                    <select
                      className="listing_select"
                      value={amnities.internet}
                      onChange={(e) =>
                        setAmenities({ ...amnities, internet: e.target.value })
                      }
                    >
                      <option selected disabled>
                        Please select the internet status
                      </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                  <div className="input_div_listing">
                    <label>Power Backup</label>
                    <select
                      className="listing_select"
                      value={amnities.powerBackup}
                      onChange={(e) =>
                        setAmenities({
                          ...amnities,
                          powerBackup: e.target.value,
                        })
                      }
                    >
                      <option selected disabled>
                        Please select the power backup status
                      </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>Kitchen</label>
                    <select
                      className="listing_select"
                      value={amnities.Kitchen}
                      onChange={(e) =>
                        setAmenities({ ...amnities, Kitchen: e.target.value })
                      }
                    >
                      <option selected disabled>
                        Please select the Kitchen status
                      </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                  <div className="input_div_listing">
                    <label>Waiting Area</label>
                    <select
                      className="listing_select"
                      value={amnities.waitingArea}
                      onChange={(e) =>
                        setAmenities({
                          ...amnities,
                          waitingArea: e.target.value,
                        })
                      }
                    >
                      <option selected disabled>
                        Please select the waiting area status
                      </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>Printing And Scanning</label>
                    <select
                      className="listing_select"
                      value={amnities.PrintingAndScanning}
                      onChange={(e) =>
                        setAmenities({
                          ...amnities,
                          PrintingAndScanning: e.target.value,
                        })
                      }
                    >
                      <option selected disabled>
                        Please select the Printing And Scanning status
                      </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                  <div className="input_div_listing">
                    <label>Conference Room</label>
                    <select
                      className="listing_select"
                      value={amnities.conferenceRoom}
                      onChange={(e) =>
                        setAmenities({
                          ...amnities,
                          conferenceRoom: e.target.value,
                        })
                      }
                    >
                      <option selected disabled>
                        Please select the conference room status
                      </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>Cooling And Heating</label>
                    <select
                      className="listing_select"
                      value={amnities.coolingAndHeating}
                      onChange={(e) =>
                        setAmenities({
                          ...amnities,
                          coolingAndHeating: e.target.value,
                        })
                      }
                    >
                      <option selected disabled>
                        Please select the cooling and heating status
                      </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                  <div className="input_div_listing">
                    <label>reception Services</label>
                    <select
                      className="listing_select"
                      value={amnities.receptionServices}
                      onChange={(e) =>
                        setAmenities({
                          ...amnities,
                          receptionServices: e.target.value,
                        })
                      }
                    >
                      <option selected disabled>
                        Please select the reception services status
                      </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                <div className="listing_top">
                  <div className="input_div_listing">
                    <label>Separate Washroom</label>
                    <select
                      className="listing_select"
                      value={amnities.septateWashroom}
                      onChange={(e) =>
                        setAmenities({
                          ...amnities,
                          septateWashroom: e.target.value,
                        })
                      }
                    >
                      <option selected disabled>
                        Please select the separate washroom status
                      </option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
              </Box>
            ) : (
              <>
                <div className="listing_member">
                  <div className="membershipBox">
                    <p>Monthly</p>
                    <i onClick={() => addMembership("monthly")}>
                      <BsPlusCircle />
                    </i>
                  </div>
                  <div className="membershipBox">
                    <p>6 months</p>
                    <i onClick={() => addMembership("6 months")}>
                      <BsPlusCircle />
                    </i>
                  </div>
                  <div className="membershipBox">
                    <p>Yearly</p>
                    <i onClick={() => addMembership("yearly")}>
                      <BsPlusCircle />
                    </i>
                  </div>
                </div>
                <div className="listing_member_lower">
                  {membership?.map((member, index) => {
                    return (
                      <div style={{ padding: "20px" }}>
                        <center>
                          <h2>{member.title}</h2>
                        </center>
                        <div className="listing_top">
                          <div className="input_div_listing">
                            <label>Title</label>
                            <input
                              className="signup-input"
                              placeholder="Title"
                              type="text"
                              name="type"
                              value={member?.title}
                              disabled={true}
                            ></input>
                          </div>
                        </div>
                        {type === "private office" ? (
                          <div>
                            <div className="listing_top">
                              <div className="input_div_listing">
                                <label>Price per Office</label>
                                <input
                                  className="signup-input"
                                  placeholder="price per office"
                                  type="text"
                                  name="pricePerOffice"
                                  onChange={(e) =>
                                    handleMembership(
                                      "pricePerOffice",
                                      e.target.value,
                                      index
                                    )
                                  }
                                ></input>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {type === "coWorking" ? (
                          <div>
                            <div className="listing_top">
                              <div className="input_div_listing">
                                <label>Price per Desk</label>
                                <input
                                  className="signup-input"
                                  placeholder="Price per desk"
                                  type="text"
                                  name="pricePerDesk"
                                  onChange={(e) =>
                                    handleMembership(
                                      "pricePerDesk",
                                      e.target.value,
                                      index
                                    )
                                  }
                                ></input>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {type === "mix" ? (
                          <div>
                            <div className="listing_top">
                              <div className="input_div_listing">
                                <label>Price per Office</label>
                                <input
                                  className="signup-input"
                                  placeholder="Price per office"
                                  type="text"
                                  name="pricePerOffice"
                                  onChange={(e) =>
                                    handleMembership(
                                      "pricePerOffice",
                                      e.target.value,
                                      index
                                    )
                                  }
                                ></input>
                              </div>
                            </div>
                            <div className="listing_top">
                              <div className="input_div_listing">
                                <label>Price per Desk</label>
                                <input
                                  className="signup-input"
                                  placeholder="Price per desk"
                                  type="text"
                                  name="pricePerDesk"
                                  onChange={(e) =>
                                    handleMembership(
                                      "pricePerDesk",
                                      e.target.value,
                                      index
                                    )
                                  }
                                ></input>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {next === 0 ? (
              <Button
                className={classes.submitButton}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            ) : (
              <Button
                className={classes.submitButton}
                variant="contained"
                type="button"
                onClick={handleIt}
              >
                Submit
              </Button>
            )}
          </Box>
        </form>
      </Box>
      <Footer />
    </Box>
  );
}
export default ListingForm;
