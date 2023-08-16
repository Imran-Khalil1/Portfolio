import React, { useEffect, useState } from "react";
import { getService, postService } from "../services/service";
import "./quotemodal.scss";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { MdEventSeat } from "react-icons/md";
import moment from "moment";

function QuoteModal({ property, handleClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [next, setNext] = useState(0);
  const [options, setOption] = useState();
  const [amount, setAmount] = useState();
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("coWorkUser"));
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMemeber, setMemeberShip] = useState();
  const [loading2, setLoading2] = useState(false);
  const [type, setType] = useState();
  const [selectedOffice, setSelectedOffice] = useState([]);
  const [selectedDesks, setSelectedDesks] = useState([]);
  const [selectedSmallC, setSelectedSmallC] = useState([]);
  const [selectedLargeC, setSelectedLargeC] = useState([]);
  const [selectedMediumC, setSelectedMediumC] = useState([]);
  const [numberOfOffices, setNumberOfOffices] = useState(0);
  const [numberOfDesks, setNumberOfDesks] = useState(0);
  const [numberOfSmallC, setNumberOfSmallC] = useState(0);
  const [numberOfMediumC, setNumberOfMediumC] = useState(0);
  const [numberOfLargeC, setNumberOfLargeC] = useState(0);
  const [selectedConference, setSelectedConference] = useState();
  const [startingDate, setStartingDate] = useState();
  const [endingDate, setEndingDate] = useState();
  const [days, setDays] = useState(0);
  const [count, setCount] = useState(0);
  const [PrivateOffices, setPrivateOffices] = useState([]);
  const [Desks, setDesks] = useState([]);
  const [SmallC, setSmallC] = useState([]);
  const [MediumC, setMediumC] = useState([]);
  const [LargeC, setLargeC] = useState([]); // LargeC = Large Conference Rooms
  const [AVP, setAVP] = useState([]); // AVP = Available Private Offices
  const [AVD, setAVD] = useState([]); // AVD = Available Desks
  const [AVSC, setAVSC] = useState([]); // AVSC = Available Small Conference Rooms
  const [AVMC, setAVMC] = useState([]); // AVMC = Available Medium Conference Rooms
  const [AVLC, setAVLC] = useState([]); // AVLC = Available Large Conference Rooms
  const [loading3, setLoading3] = useState(false);
  const [hours, setHours] = useState(0);
  const [hoursPrice, setHoursPrice] = useState(0);

  const getFinalPrice = (days) => {
    let finalPrice = 0;
    if (numberOfDesks > 0) {
      finalPrice += numberOfDesks * property?.pricePerDesk * days;
    }
    if (numberOfOffices > 0) {
      finalPrice += numberOfOffices * property?.pricePerOffice * days;
    }
    if (numberOfSmallC > 0) {
      finalPrice += numberOfSmallC * property?.SmallCPrice * days;
    }
    if (numberOfMediumC > 0) {
      finalPrice += numberOfMediumC * property?.MediumCPrice * days;
    }
    if (numberOfLargeC > 0) {
      finalPrice += numberOfLargeC * property?.LargeCPrice * days;
    }
    return finalPrice;
  };

  const handleSubmit = async () => {
    setLoading2(true);
    const startD = moment(startingDate).valueOf();
    const endD = moment(endingDate).valueOf();
    const PV = [];
    const PD = [];
    const PSC = [];
    const PMC = [];
    const PLC = [];
    const data = {
      user: user?._id,
      property: property?._id,
      numberOfDesks: parseInt(numberOfDesks),
      numberOfPrivateOffices: parseInt(numberOfOffices),
      numberOfSmallConferenceRooms: parseInt(numberOfSmallC),
      numberOfMediumConferenceRooms: parseInt(numberOfMediumC),
      numberOfLargeConferenceRooms: parseInt(numberOfLargeC),
      startDate: startD,
      endDate: endD,
      listOFPrivateOffices: selectedOffice,
      listOFDesks: selectedDesks,
      listOFSmallConferenceRooms: selectedSmallC,
      listOFMediumConferenceRooms: selectedMediumC,
      listOFLargeConferenceRooms: selectedLargeC,
      type: type,
      PV,
      PD,
      PSC,
      PMC,
      PLC,
      totalPrice: getFinalPrice(moment(endD).diff(moment(startD), "days")),
    };
    if (numberOfDesks > 0) {
      property?.desks?.map((item, index) => {
        if (selectedDesks.includes(index)) {
          PD.push({
            ...item,
            bookings: [...item?.bookings, { startDate: startD, endDate: endD }],
          });
        } else {
          PD.push(item);
        }
      });
    }
    if (numberOfOffices > 0) {
      property?.privateOffices?.map((item, index) => {
        if (selectedOffice.includes(index)) {
          PV.push({
            ...item,
            bookings: [...item?.bookings, { startDate: startD, endDate: endD }],
          });
        } else {
          PV.push(item);
        }
      });
    }
    if (numberOfSmallC > 0) {
      property?.SmallConference?.map((item, index) => {
        if (selectedSmallC.includes(index)) {
          PSC.push({
            ...item,
            bookings: [...item?.bookings, { startDate: startD, endDate: endD }],
          });
        } else {
          PSC.push(item);
        }
      });
    }
    if (numberOfMediumC > 0) {
      property?.MediumConference?.map((item, index) => {
        if (selectedMediumC.includes(index)) {
          PMC.push({
            ...item,
            bookings: [...item?.bookings, { startDate: startD, endDate: endD }],
          });
        } else {
          PMC.push(item);
        }
      });
    }
    if (numberOfLargeC > 0) {
      property?.LargeConference?.map((item, index) => {
        if (selectedLargeC.includes(index)) {
          PLC.push({
            ...item,
            bookings: [...item?.bookings, { startDate: startD, endDate: endD }],
          });
        } else {
          PLC.push(item);
        }
      });
    }
    const numberofDays = moment(endD).diff(moment(startD), "days");
    const NumbrofHours = moment(endD).diff(moment(startD), "hours");
    setDays(numberofDays);
    setHours(NumbrofHours);
    setHoursPrice(getFinalPrice(moment(endD).diff(moment(startD), "hours")));
    if (type === "conferenceRoom") {
      data.totalPrice = getFinalPrice(
        moment(endD).diff(moment(startD), "hours")
      );
    } else {
      data.totalPrice = getFinalPrice(
        moment(endD).diff(moment(startD), "days")
      );
    }
    const res = await postService("addquotations", data);
    if (res?.data?.success) {
      setNext(1);
      setLoading2(false);
      if (numberofDays > 30) {
        setShow(true);
      }
      setOption("token");
    }
  };

  const getData = async () => {
    setAmount(property?.price * 0.02);
    const result = await getService(`/member/${property?._id}`);
    if (result?.data?.success) {
      setMembers(result?.data?.data);
    }
    let PV = [];
    let PD = [];
    let PSC = [];
    let PMC = [];
    let PLC = [];
    if (property?.privateOfficeNumber > 0) {
      for (let i = 0; i < property?.privateOfficeNumber; i++) {
        PV.push(i);
      }
    }
    if (property?.numberOfDesks > 0) {
      for (let i = 0; i < property?.numberOfDesks; i++) {
        PD.push(i);
      }
    }
    if (property?.NSmallC > 0) {
      for (let i = 0; i < property?.NSmallC; i++) {
        PSC.push(i);
      }
    }
    if (property?.NMediumC > 0) {
      for (let i = 0; i < property?.NMediumC; i++) {
        PMC.push(i);
      }
    }
    if (property?.NLargeC > 0) {
      for (let i = 0; i < property?.NLargeC; i++) {
        PLC.push(i);
      }
    }
    setPrivateOffices(PV);
    setDesks(PD);
    setSmallC(PSC);
    setMediumC(PMC);
    setLargeC(PLC);
  };

  const handleSubmi = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const data = {
          id,
          amount:
            type === "conferenceRoom"
              ? getFinalPrice(hours)
              : getFinalPrice(days),
        };
        const result = await postService("/payment", data);
        if (result?.data?.success) {
          if (options === "token") {
            toast.success(
              "Your booking has been confirmed. Please visit the office to start your journey"
            );
          } else if (options === "member") {
            toast.success(
              "Your booking has been confirmed. Please visit the office to start your journey"
            );
          }
          setLoading(false);
          handleClose();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOfficeSelection = (index) => {
    const temp = selectedOffice;
    const i = selectedOffice.indexOf(index);
    if (i === -1) {
      temp.push(index);
      setSelectedOffice(temp);
    } else {
      temp.splice(i, 1);
      setSelectedOffice(temp);
    }
    setCount(count + 1);
  };

  const handleDeskSelection = (index) => {
    const temp = selectedDesks;
    const i = selectedDesks.indexOf(index);
    if (i === -1) {
      temp.push(index);
      setSelectedDesks(temp);
    } else {
      temp.splice(i, 1);
      setSelectedDesks(temp);
    }
    setCount(count + 1);
  };

  const handleSmallCSelection = (index) => {
    const temp = selectedSmallC;
    const i = selectedSmallC.indexOf(index);
    if (i === -1) {
      temp.push(index);
      setSelectedSmallC(temp);
    } else {
      temp.splice(i, 1);
      setSelectedSmallC(temp);
    }
    setCount(count + 1);
  };

  const handleMediumCSelection = (index) => {
    const temp = selectedMediumC;
    const i = selectedMediumC.indexOf(index);
    if (i === -1) {
      temp.push(index);
      setSelectedMediumC(temp);
    } else {
      temp.splice(i, 1);
      setSelectedMediumC(temp);
    }
    setCount(count + 1);
  };

  const handleLargeCSelection = (index) => {
    const temp = selectedLargeC;
    const i = selectedLargeC.indexOf(index);
    if (i === -1) {
      temp.push(index);
      setSelectedLargeC(temp);
    } else {
      temp.splice(i, 1);
      setSelectedLargeC(temp);
    }
    setCount(count + 1);
  };

  useEffect(() => {
    getData();
  }, [property]);

  const getAvailability = async () => {
    setLoading3(true);
    if (type === "private office") {
      const data = {
        propertyId: property?._id,
        type: "private office",
        startingDate: moment(startingDate).valueOf(),
        endingDate: moment(endingDate).valueOf(),
      };
      const res = await postService("/availability", data);
      if (res?.data?.success) {
        setAVP(res?.data?.data?.private);
        setLoading3(false);
      }
    } else if (type === "coWorking") {
      const data = {
        propertyId: property?._id,
        type: "coWorking",
        startingDate: moment(startingDate).valueOf(),
        endingDate: moment(endingDate).valueOf(),
      };
      const res = await postService("/availability", data);
      if (res?.data?.success) {
        setAVD(res?.data?.data?.cowWorking);
        setLoading3(false);
      }
    } else if (type === "Mix") {
      const data = {
        propertyId: property?._id,
        type: "mix",
        startingDate: moment(startingDate).valueOf(),
        endingDate: moment(endingDate).valueOf(),
      };
      const res = await postService("/availability", data);
      if (res?.data?.success) {
        setAVP(res?.data?.data?.private);
        setAVD(res?.data?.data?.coWorking);
        setLoading3(false);
      }
    } else if (type === "conferenceRoom") {
      if (selectedConference === "smallC") {
        const data = {
          propertyId: property?._id,
          type: "conferenceRoom",
          startingDate: moment(startingDate).valueOf(),
          endingDate: moment(endingDate).valueOf(),
          type2: "smallC",
        };
        const res = await postService("/availability", data);
        if (res?.data?.success) {
          setAVSC(res?.data?.data?.smallC);
          setLoading3(false);
        }
      } else if (selectedConference === "mediumC") {
        const data = {
          propertyId: property?._id,
          type: "conferenceRoom",
          startingDate: moment(startingDate).valueOf(),
          endingDate: moment(endingDate).valueOf(),
          type2: "mediumC",
        };
        const res = await postService("/availability", data);
        if (res?.data?.success) {
          setAVMC(res?.data?.data?.mediumC);
          setLoading3(false);
        }
      } else if (selectedConference === "largeC") {
        const data = {
          propertyId: property?._id,
          type: "conferenceRoom",
          startingDate: moment(startingDate).valueOf(),
          endingDate: moment(endingDate).valueOf(),
          type2: "largeC",
        };
        const res = await postService("/availability", data);
        if (res?.data?.success) {
          setAVLC(res?.data?.data?.largeC);
          setLoading3(false);
        }
      }
    }
  };

  console.log(AVP, AVD, AVSC, AVMC, AVLC);

  useEffect(() => {
    if (startingDate && endingDate) {
      getAvailability();
      setSelectedOffice([]);
      setSelectedDesks([]);
      setSelectedSmallC([]);
      setSelectedMediumC([]);
      setSelectedLargeC([]);
    }
  }, [startingDate, endingDate]);

  return (
    <div>
      {next === 0 ? (
        <>
          <div className="input_div_modal">
            <label>Type of Property</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option selected disabled>
                Please select one of the options
              </option>
              {property?.type === "private office" && (
                <option value="private office">Private Office</option>
              )}
              {property?.type === "coWorking" && (
                <option value="coWorking">Coworking</option>
              )}
              {property?.type === "mix" && (
                <>
                  <option value="private office">Private Office</option>
                  <option value="coWorking">Coworking</option>
                  <option value="Mix">Private office and dedicated desk</option>
                </>
              )}
              {property?.conferenceRoom && (
                <option value="conferenceRoom">Conference room</option>
              )}
            </select>
          </div>
          {type === "conferenceRoom" && (
            <div className="input_div_modal">
              <label>Type of Conference room</label>
              <select
                value={selectedConference}
                onChange={(e) => {
                  setSelectedConference(e.target.value);
                  setNumberOfSmallC(0);
                  setNumberOfMediumC(0);
                  setNumberOfLargeC(0);
                }}
              >
                <option selected disabled>
                  Please select one of the options
                </option>
                <option value="smallC">Small Conference room</option>
                <option value="mediumC">Medium Conference room</option>
                <option value="largeC">Large Conference room</option>
              </select>
            </div>
          )}
          <div className="input_div_modal">
            <label>Starting Date</label>
            <input
              placeholder="starting date"
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
              type="datetime-local"
            ></input>
          </div>
          <div className="input_div_modal">
            <label>Ending Time</label>
            <input
              placeholder="ending time"
              value={endingDate}
              onChange={(e) => setEndingDate(e.target.value)}
              type="datetime-local"
            ></input>
          </div>
          {endingDate && startingDate && (
            <>
              {type === "private office" && (
                <>
                  <div className="input_div_modal">
                    <label>Number of Private offices</label>
                    <input
                      placeholder="Please select the number of private offices you want to book"
                      value={numberOfOffices}
                      onChange={(e) => setNumberOfOffices(e.target.value)}
                    ></input>
                  </div>
                  <div className="input_div_modal">
                    <label style={{ fontWeight: "bold" }}>
                      Private offices available (red = Already booked, green =
                      available, blue = selected)
                    </label>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "20px",
                        columnGap: "20px",
                        borderRadius: "10px",
                        rowGap: "10px",
                      }}
                    >
                      {PrivateOffices?.map((item, index) => {
                        if (AVP[index] === true) {
                          return (
                            <div className="seat_no">
                              <i style={{ color: "white" }}>
                                <MdEventSeat />
                              </i>
                              <span style={{ color: "white" }}>P{index}</span>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className={
                                selectedOffice?.includes(index)
                                  ? "seat_yes_active"
                                  : "seat_yes"
                              }
                              onClick={() => handleOfficeSelection(index)}
                            >
                              <i style={{ color: "white" }}>
                                <MdEventSeat />
                              </i>
                              <span style={{ color: "white" }}>P{index}</span>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </>
              )}
              {type === "coWorking" && (
                <>
                  <div className="input_div_modal">
                    <label>Number of Dedicated Desks</label>
                    <input
                      placeholder="Please select the number of dedicated desks you want to book"
                      value={numberOfDesks}
                      onChange={(e) => setNumberOfDesks(e.target.value)}
                    ></input>
                  </div>
                  <div className="input_div_modal">
                    <label style={{ fontWeight: "bold" }}>
                      Dedicated desks available (red = Already booked, green =
                      available, blue = selected)
                    </label>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "20px",
                        columnGap: "20px",
                        borderRadius: "10px",
                        rowGap: "10px",
                      }}
                    >
                      {Desks.map((item, index) => {
                        if (AVD[index] === true) {
                          return (
                            <div className="seat_no">
                              <i style={{ color: "white" }}>
                                <MdEventSeat />
                              </i>
                              <span style={{ color: "white" }}>D{index}</span>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className={
                                selectedDesks?.includes(index)
                                  ? "seat_yes_active"
                                  : "seat_yes"
                              }
                              onClick={() => handleDeskSelection(index)}
                            >
                              <i style={{ color: "white" }}>
                                <MdEventSeat />
                              </i>
                              <span style={{ color: "white" }}>D{index}</span>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </>
              )}
              {type === "Mix" && (
                <>
                  <>
                    <div className="input_div_modal">
                      <label>Number of Private offices</label>
                      <input
                        placeholder="Please select the number of private offices you want to book"
                        value={numberOfOffices}
                        onChange={(e) => setNumberOfOffices(e.target.value)}
                      ></input>
                    </div>
                    <div className="input_div_modal">
                      <label style={{ fontWeight: "bold" }}>
                        Private offices available (red = Already booked, green =
                        available, blue = selected)
                      </label>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          marginTop: "20px",
                          columnGap: "20px",
                          borderRadius: "10px",
                          rowGap: "10px",
                        }}
                      >
                        {PrivateOffices?.map((item, index) => {
                          if (!item?.reserved) {
                            if (AVP[index] === true) {
                              return (
                                <div className="seat_no">
                                  <i style={{ color: "white" }}>
                                    <MdEventSeat />
                                  </i>
                                  <span style={{ color: "white" }}>
                                    P{index}
                                  </span>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className={
                                    selectedOffice?.includes(index)
                                      ? "seat_yes_active"
                                      : "seat_yes"
                                  }
                                  onClick={() => handleOfficeSelection(index)}
                                >
                                  <i style={{ color: "white" }}>
                                    <MdEventSeat />
                                  </i>
                                  <span style={{ color: "white" }}>
                                    P{index}
                                  </span>
                                </div>
                              );
                            }
                          }
                        })}
                      </div>
                    </div>
                  </>
                  <>
                    <div className="input_div_modal">
                      <label>Number of Dedicated Desks</label>
                      <input
                        placeholder="Please select the number of dedicated desks you want to book"
                        value={numberOfDesks}
                        onChange={(e) => setNumberOfDesks(e.target.value)}
                      ></input>
                    </div>
                    <div className="input_div_modal">
                      <label style={{ fontWeight: "bold" }}>
                        Dedicated desks available (red = Already booked, green =
                        available, blue = selected)
                      </label>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          marginTop: "20px",
                          columnGap: "20px",
                          borderRadius: "10px",
                          rowGap: "10px",
                        }}
                      >
                        {Desks?.map((item, index) => {
                          if (AVD[index] === true) {
                            return (
                              <div className="seat_no">
                                <i style={{ color: "white" }}>
                                  <MdEventSeat />
                                </i>
                                <span style={{ color: "white" }}>D{index}</span>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                className={
                                  selectedDesks?.includes(index)
                                    ? "seat_yes_active"
                                    : "seat_yes"
                                }
                                onClick={() => handleDeskSelection(index)}
                              >
                                <i style={{ color: "white" }}>
                                  <MdEventSeat />
                                </i>
                                <span style={{ color: "white" }}>D{index}</span>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </>
                </>
              )}
              {type === "conferenceRoom" && (
                <>
                  <div className="input_div_modal"></div>
                  {selectedConference === "smallC" && (
                    <>
                      <div className="input_div_modal">
                        <label>Number of Small conference rooms</label>
                        <input
                          placeholder="Please select the number of conference rooms you want to book"
                          value={numberOfSmallC}
                          onChange={(e) => setNumberOfSmallC(e.target.value)}
                        ></input>
                      </div>
                      <div className="input_div_modal">
                        <label style={{ fontWeight: "bold" }}>
                          small conference rooms available (red = Already
                          booked, green = available, blue = selected)
                        </label>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            marginTop: "20px",
                            columnGap: "20px",
                            borderRadius: "10px",
                            rowGap: "10px",
                          }}
                        >
                          {SmallC?.map((item, index) => {
                            if (AVSC[index] === true) {
                              return (
                                <div className="seat_no">
                                  <i style={{ color: "white" }}>
                                    <MdEventSeat />
                                  </i>
                                  <span style={{ color: "white" }}>
                                    SC{index}
                                  </span>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className={
                                    selectedSmallC?.includes(index)
                                      ? "seat_yes_active"
                                      : "seat_yes"
                                  }
                                  onClick={() => handleSmallCSelection(index)}
                                >
                                  <i style={{ color: "white" }}>
                                    <MdEventSeat />
                                  </i>
                                  <span style={{ color: "white" }}>
                                    SC{index}
                                  </span>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </>
                  )}
                  {selectedConference === "mediumC" && (
                    <>
                      <div className="input_div_modal">
                        <label>Number of Medium conference rooms</label>
                        <input
                          placeholder="Please select the number of conference rooms you want to book"
                          value={numberOfMediumC}
                          onChange={(e) => setNumberOfMediumC(e.target.value)}
                        ></input>
                      </div>
                      <div className="input_div_modal">
                        <label style={{ fontWeight: "bold" }}>
                          medium conference rooms available (red = Already
                          booked, green = available, blue = selected)
                        </label>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            marginTop: "20px",
                            columnGap: "20px",
                            borderRadius: "10px",
                            rowGap: "10px",
                          }}
                        >
                          {MediumC?.map((item, index) => {
                            if (AVMC[index] === true) {
                              return (
                                <div className="seat_no">
                                  <i style={{ color: "white" }}>
                                    <MdEventSeat />
                                  </i>
                                  <span style={{ color: "white" }}>
                                    MC{index}
                                  </span>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className={
                                    selectedMediumC?.includes(index)
                                      ? "seat_yes_active"
                                      : "seat_yes"
                                  }
                                  onClick={() => handleMediumCSelection(index)}
                                >
                                  <i style={{ color: "white" }}>
                                    <MdEventSeat />
                                  </i>
                                  <span style={{ color: "white" }}>
                                    MC{index}
                                  </span>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </>
                  )}
                  {selectedConference === "largeC" && (
                    <>
                      <div className="input_div_modal">
                        <label>Number of Large conference rooms</label>
                        <input
                          placeholder="Please select the number of conference rooms you want to book"
                          value={numberOfLargeC}
                          onChange={(e) => setNumberOfLargeC(e.target.value)}
                        ></input>
                      </div>
                      <div className="input_div_modal">
                        <label style={{ fontWeight: "bold" }}>
                          large conference rooms available (red = Already
                          booked, green = available, blue = selected)
                        </label>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            marginTop: "20px",
                            columnGap: "20px",
                            borderRadius: "10px",
                            rowGap: "10px",
                          }}
                        >
                          {LargeC?.map((item, index) => {
                            if (AVLC[index] === true) {
                              return (
                                <div className="seat_no">
                                  <i style={{ color: "white" }}>
                                    <MdEventSeat />
                                  </i>
                                  <span style={{ color: "white" }}>
                                    LC{index}
                                  </span>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className={
                                    selectedLargeC?.includes(index)
                                      ? "seat_yes_active"
                                      : "seat_yes"
                                  }
                                  onClick={() => handleLargeCSelection(index)}
                                >
                                  <i style={{ color: "white" }}>
                                    <MdEventSeat />
                                  </i>
                                  <span style={{ color: "white" }}>
                                    LC{index}
                                  </span>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
          <div className="modal_submit">
            {loading2 ? (
              <FadeLoader />
            ) : (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </>
      ) : (
        <>
          <center>
            <h2>Payment</h2>
            <p className="payment_text">
              Please select one of the below given options
            </p>
          </center>
          <div className="input_div_modal">
            <label>payment options</label>
            <select value={options} onChange={(e) => setOption(e.target.value)}>
              <option selected disabled>
                Please select one of the options
              </option>
              <option value="token">
                {type === "conferenceRoom"
                  ? `payment for ${hours} hours`
                  : `payment for ${days} days`}
              </option>
              {days > 30 && <option value="member">Membership</option>}
            </select>
          </div>
          {options === "token" ? (
            <div>
              {numberOfOffices > 0 && (
                <p className="payment_text">
                  Price of private Offices: {numberOfOffices} Offices x{" "}
                  {property?.pricePerOffice} x {days} days = Rs{" "}
                  {numberOfOffices * property?.pricePerOffice * days}/-
                </p>
              )}
              {numberOfDesks > 0 && (
                <p className="payment_text">
                  Price of Desks: {numberOfDesks} Desks x{" "}
                  {property?.pricePerDesk} x {days} days = Rs{" "}
                  {numberOfDesks * property?.pricePerDesk * days}/-
                </p>
              )}
              {numberOfSmallC > 0 && (
                <p className="payment_text">
                  Price of Small conference rooms: {numberOfSmallC} Small
                  conference rooms x {property?.SmallCPrice} x {hours} hours =
                  Rs {numberOfSmallC * property?.SmallCPrice * hours}/-
                </p>
              )}
              {numberOfMediumC > 0 && (
                <p className="payment_text">
                  Price of Medium conference rooms: {numberOfMediumC} Medium
                  conference rooms x {property?.MediumCPrice} x {hours} hours =
                  Rs {numberOfMediumC * property?.MediumCPrice * hours}/-
                </p>
              )}
              {numberOfLargeC > 0 && (
                <p className="payment_text">
                  Price of Large conference rooms: {numberOfLargeC} Large
                  conference rooms x {property?.LargeCPrice} x {hours} hours =
                  Rs {numberOfLargeC * property?.LargeCPrice * hours}/-
                </p>
              )}
              <p className="payment_text">
                {type === "conferenceRoom"
                  ? `Total Price: Rs ${hoursPrice}/-`
                  : `Total Price: Rs ${getFinalPrice(days)}/-`}
              </p>
              <p className="payment_text">Payment Method: Card</p>
              <div className="card_element">
                <CardElement />
              </div>
              <div className="pay_button">
                {!loading ? (
                  <button onClick={handleSubmi}>Pay</button>
                ) : (
                  <FadeLoader />
                )}
              </div>
            </div>
          ) : options === "member" ? (
            <div>
              <h3>Please select the membership plan</h3>
              <div className="memeber_div">
                {members?.map((mem) => {
                  return (
                    <div
                      className={
                        mem?._id === selectedMemeber?._id
                          ? "memebr_inner"
                          : "memebr_inneer"
                      }
                      onClick={() => setMemeberShip(mem)}
                    >
                      <p>{mem?.title}</p>
                      <p>Rs {mem?.amountPerMonth}/- per person</p>
                      <p>
                        Total amount: RS {mem?.amountPerMonth * mem?.noOfPeople}
                        /-
                      </p>
                    </div>
                  );
                })}
              </div>
              <p className="payment_text">
                Amount to be payed: Rs{" "}
                {selectedMemeber?.amountPerMonth * selectedMemeber?.noOfPeople}
                /-
              </p>
              <p className="payment_text">Payment Method: Card</p>
              <div className="card_element">
                <CardElement />
              </div>
              <div className="pay_button">
                {!loading ? (
                  <button onClick={handleSubmi}>Pay</button>
                ) : (
                  <FadeLoader />
                )}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default QuoteModal;
