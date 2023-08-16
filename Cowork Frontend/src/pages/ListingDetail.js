import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./listingdetail.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getService, postService, putService } from "../services/service";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import QuoteModal from "../modals/QuoteModal";
import { FaInternetExplorer } from "react-icons/fa";
import { MdPower } from "react-icons/md";
import { TbToolsKitchen2 } from "react-icons/tb";
import { AiTwotonePrinter } from "react-icons/ai";
import { FcConferenceCall } from "react-icons/fc";
import { FaReadme } from "react-icons/fa";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { FadeLoader } from "react-spinners";
import { MdEventSeat } from "react-icons/md";

function ListingDetail() {
  const [property, setProperty] = useState();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [rat, setRat] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reservedOffcies, setReservedOffcies] = useState([]);
  const [reservedDesks, setReservedDesks] = useState([]);
  const [privateOffices, setPrivateOffices] = useState([]);
  const [desks, setDesks] = useState([]);
  const [review, setReview] = useState({
    name: "",
    description: "",
    rating: "",
  });
  const getData = async () => {
    const result = await getService(`/property/${id}`);
    console.log(result?.data?.data);
    setReviews(result?.data?.data?.reviews);
    setProperty(result?.data?.data);
    setReservedOffcies(result?.data?.data?.reservedOffices);
    setReservedDesks(result?.data?.data?.reservedDesks);
    setPrivateOffices(result?.data?.data?.privateOffices);
    setDesks(result?.data?.data?.desks);
  };

  useEffect(() => {
    getData();
  }, []);

  const handles = () => {
    if (reviews?.length > 0) {
      const temp = reviews?.reduce(
        (curr, acc) => curr + acc?.review?.rating,
        0
      );
      setRating(temp / reviews?.length);
    }
  };

  useEffect(() => {
    handles();
  }, [reviews]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const handleClose = () => {
    setVisible(false);
  };

  const [loading4, setLoading4] = useState(false);
  const [count, setCOunt] = useState(0);
  const handleOffice = (index) => {
    const temp = reservedOffcies;
    const i = reservedOffcies.indexOf(index);
    if (i === -1) {
      temp.push(index);
      setReservedOffcies(temp);
      const te = privateOffices;
      te[index]["reserved"] = true;
      setPrivateOffices(te);
    } else {
      temp.splice(i, 1);
      setReservedOffcies(temp);
      const te = privateOffices;
      te[index]["reserved"] = false;
      setPrivateOffices(te);
    }
    setCOunt(count + 1);
  };

  console.log(privateOffices, reservedOffcies, desks, reservedDesks);

  const handleDesks = (index) => {
    const temp = reservedDesks;
    const i = reservedDesks.indexOf(index);
    if (i === -1) {
      temp.push(index);
      setReservedDesks(temp);
      const te = desks;
      te[index]["reserved"] = true;
      setDesks(te);
    } else {
      temp.splice(i, 1);
      setReservedDesks(temp);
      const te = desks;
      te[index]["reserved"] = false;
      setDesks(te);
    }
    setCOunt(count + 1);
  };

  const handleCHange = async () => {
    setLoading4(true);
    const data = {
      _id: property._id,
      reservedOffices: reservedOffcies,
      reservedDesks: reservedDesks,
      privateOffices: privateOffices,
      desks: desks,
    };
    const res = await postService("/changeReserve", data);
    if (res?.data?.success) {
      toast.success("Reserved Successfully");
    }
    setLoading4(false);
  };

  return (
    <>
      <Dialog
        header="Booking"
        visible={visible}
        style={{
          width: "750px",
        }}
        onHide={() => setVisible(false)}
      >
        <QuoteModal property={property} handleClose={handleClose} />
      </Dialog>
      <Header />
      <div
        style={{
          padding: "30px 70px",
          minHeight: "100vh",
          backgroundColor: "#f4ede5",
          marginTop: "-35px",
        }}
      >
        <div className="property_main">
          <div className="property__inner">
            <Slider {...settings}>
              {property?.images?.map((image) => {
                return (
                  <div>
                    <img
                      src={image?.image}
                      className="inner_image_property"
                    ></img>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="property_right">
            <h1 className="property_title">{property?.name}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: property?.description }}
            ></div>

            <div style={{ display: "flex", marginTop: "60px" }}>
              <div>
                <div className="property_wrapper">
                  <p className="sub_title">Location</p>
                  <p className="desctiption_property">
                    {property?.area} {property?.city}
                  </p>
                </div>
                <div className="property_wrapper">
                  <p className="sub_title">Capacity</p>
                  <p className="desctiption_property">
                    {property?.capacity} persons
                  </p>
                </div>

                <div className="property_wrapper">
                  <p className="sub_title">Availablility</p>
                  <p className="desctiption_property">
                    {property?.availability ? "available" : "not available"}
                  </p>
                </div>
                <div className="property_wrapper">
                  <p className="sub_title">Address</p>
                  <p className="desctiption_property">{property?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "50px 0px",
          }}
        >
          {property?.type === "private office" && (
            <div className="description__ionner">
              <h2 style={{ textAlign: "center" }}> Private Offices</h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <div className="property_wrapper2">
                    <p className="sub_title">Private Offices</p>
                    <p className="desctiption_property">
                      {property?.privateOfficeNumber}
                    </p>
                  </div>
                  <div className="property_wrapper2">
                    <p className="sub_title">Price per private Office</p>
                    <p className="desctiption_property">
                      Rs {property?.pricePerOffice}/- per day
                    </p>
                  </div>
                  {property?.reservedOffices?.length > 0 ? (
                    <>
                      <div className="property_wrapper2">
                        <p className="sub_title">reserved offices</p>
                        <div style={{ display: "flex", columnGap: "5px" }}>
                          {property?.reservedOffices?.map((office) => {
                            return (
                              <p
                                style={{
                                  padding: "5px",
                                  border: "1px solid #cecece",
                                }}
                              >
                                P{office}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                      <div style={{ display: "flex", columnGap: "10px" }}>
                        {privateOffices?.map((office, index) => {
                          return (
                            <div
                              className={
                                reservedOffcies?.includes(index)
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
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          )}
          {property?.type === "coworking" && (
            <div className="description__ionner">
              <h2 style={{ textAlign: "center" }}> Dedicated Desks</h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <div className="property_wrapper2">
                    <p className="sub_title">Dedicated Desks</p>
                    <p className="desctiption_property">
                      {property?.numberOfDesks}
                    </p>
                  </div>
                  <div className="property_wrapper2">
                    <p className="sub_title">Price per dedicated desk</p>
                    <p className="desctiption_property">
                      Rs {property?.pricePerDesk}/- per day
                    </p>
                  </div>
                  {property?.reservedDesks?.length > 0 ? (
                    <>
                      <div className="property_wrapper2">
                        <p className="sub_title">reserved offices</p>
                        <div style={{ display: "flex", columnGap: "5px" }}>
                          {property?.reservedDesks?.map((office) => {
                            return (
                              <p
                                style={{
                                  padding: "5px",
                                  border: "1px solid #cecece",
                                }}
                              >
                                D{office}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                      <div style={{ display: "flex", columnGap: "10px" }}>
                        {desks?.map((office, index) => {
                          return (
                            <div
                              className={
                                reservedDesks?.includes(index)
                                  ? "seat_yes_active"
                                  : "seat_yes"
                              }
                              onClick={() => handleDesks(index)}
                            >
                              <i style={{ color: "white" }}>
                                <MdEventSeat />
                              </i>
                              <span style={{ color: "white" }}>P{index}</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          )}
          {property?.type === "mix" && (
            <>
              <div className="description__ionner">
                <h2 style={{ textAlign: "center" }}> Private Offices</h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <div className="property_wrapper2">
                      <p className="sub_title">Private Offices</p>
                      <p className="desctiption_property">
                        {property?.privateOfficeNumber}
                      </p>
                    </div>
                    <div className="property_wrapper2">
                      <p className="sub_title">Price per private Office</p>
                      <p className="desctiption_property">
                        Rs {property?.pricePerOffice}/- per day
                      </p>
                    </div>
                    {property?.reservedOffices?.length > 0 ? (
                      <>
                        <div className="property_wrapper2">
                          <p className="sub_title">reserved offices</p>
                          <div style={{ display: "flex", columnGap: "5px" }}>
                            {property?.reservedOffices?.map((office) => {
                              return (
                                <p
                                  style={{
                                    padding: "5px",
                                    border: "1px solid #cecece",
                                  }}
                                >
                                  P{office}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                        <div style={{ display: "flex", columnGap: "10px" }}>
                          {privateOffices?.map((office, index) => {
                            return (
                              <div
                                className={
                                  reservedOffcies?.includes(index)
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
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="description__ionner">
                <h2 style={{ textAlign: "center" }}> Dedicated Desks</h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <div className="property_wrapper2">
                      <p className="sub_title">Dedicated Desks</p>
                      <p className="desctiption_property">
                        {property?.numberOfDesks}
                      </p>
                    </div>
                    <div className="property_wrapper2">
                      <p className="sub_title">Price per dedicated desk</p>
                      <p className="desctiption_property">
                        Rs {property?.pricePerDesk}/- per day
                      </p>
                    </div>
                    {property?.reservedDesks?.length > 0 ? (
                      <>
                        <div className="property_wrapper2">
                          <p className="sub_title">reserved offices</p>
                          <div style={{ display: "flex", columnGap: "5px" }}>
                            {property?.reservedDesks?.map((office) => {
                              return (
                                <p
                                  style={{
                                    padding: "5px",
                                    border: "1px solid #cecece",
                                  }}
                                >
                                  D{office}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                        <div style={{ display: "flex", columnGap: "10px" }}>
                          {desks?.map((office, index) => {
                            return (
                              <div
                                className={
                                  reservedDesks?.includes(index)
                                    ? "seat_yes_active"
                                    : "seat_yes"
                                }
                                onClick={() => handleDesks(index)}
                              >
                                <i style={{ color: "white" }}>
                                  <MdEventSeat />
                                </i>
                                <span style={{ color: "white" }}>P{index}</span>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {property?.conferenceRoom && (
          <>
            <h2 style={{ textAlign: "center" }}> Conference Rooms</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "50px 0px",
              }}
            >
              {property?.NSmallC > 0 && (
                <div className="description__ionner">
                  <h2 style={{ textAlign: "center" }}>
                    Small Conference Rooms
                  </h2>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <div className="property_wrapper3">
                        <p className="sub_title">conference rooms</p>
                        <p className="desctiption_property">
                          {property?.NSmallC}
                        </p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Price per room</p>
                        <p className="desctiption_property">
                          Rs {property?.SmallCPrice}/- per hour
                        </p>
                      </div>

                      <div className="property_wrapper3">
                        <p className="sub_title">Capacity</p>
                        <p className="desctiption_property">1-5 persons</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {property?.NMediumC > 0 && (
                <div className="description__ionner">
                  <h2 style={{ textAlign: "center" }}>
                    Medium Conference Rooms
                  </h2>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Conference rooms</p>
                        <p className="desctiption_property">
                          {property?.NMediumC}
                        </p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Price per room</p>
                        <p className="desctiption_property">
                          Rs {property?.MediumCPrice}/- per hour
                        </p>
                      </div>

                      <div className="property_wrapper3">
                        <p className="sub_title">Capacity</p>
                        <p className="desctiption_property">6-10 persons</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {property?.NLargeC > 0 && (
                <div className="description__ionner">
                  <h2 style={{ textAlign: "center" }}>
                    Large conference rooms
                  </h2>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Conference rooms</p>
                        <p className="desctiption_property">
                          {property?.NLargeC}
                        </p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Price per room</p>
                        <p className="desctiption_property">
                          Rs {property?.LargeCPrice}/- per hour
                        </p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Capacity</p>
                        <p className="desctiption_property">10-20 persons</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {loading4 ? (
            <FadeLoader />
          ) : (
            <button className="property_bookNow" onClick={handleCHange}>
              Save Changes
            </button>
          )}
        </div>
        <hr />
        <h2 style={{ textAlign: "center" }}> Detailed amenities</h2>
        <div className="detailed_it_is">
          <div className="property_wrapper">
            <i className="propert_icon">
              <FaInternetExplorer />
            </i>
            <p className="desctiption_property">
              {property?.amenities?.internet ? (
                <i style={{ color: "green" }}>
                  <GiConfirmed />
                </i>
              ) : (
                <i style={{ color: "red" }}>
                  <GiCancel />
                </i>
              )}
            </p>
          </div>
          <div className="property_wrapper">
            <i className="propert_icon">
              <MdPower />
            </i>
            <p className="desctiption_property">
              {property?.amenities?.powerBackup ? (
                <i style={{ color: "green" }}>
                  <GiConfirmed />
                </i>
              ) : (
                <i style={{ color: "red" }}>
                  <GiCancel />
                </i>
              )}
            </p>
          </div>
          <div className="property_wrapper">
            <i className="propert_icon">
              <TbToolsKitchen2 />
            </i>
            <p className="desctiption_property">
              {" "}
              {property?.amenities?.Kitchen ? (
                <i style={{ color: "green" }}>
                  <GiConfirmed />
                </i>
              ) : (
                <i style={{ color: "red" }}>
                  <GiCancel />
                </i>
              )}
            </p>
          </div>
          <div className="property_wrapper">
            <i className="propert_icon">
              <FaReadme />
            </i>
            <p className="desctiption_property">
              {" "}
              {property?.amenities?.waitingArea ? (
                <i style={{ color: "green" }}>
                  <GiConfirmed />
                </i>
              ) : (
                <i style={{ color: "red" }}>
                  <GiCancel />
                </i>
              )}
            </p>
          </div>
          <div className="property_wrapper">
            <i className="propert_icon">
              <AiTwotonePrinter />
            </i>
            <p className="desctiption_property">
              {" "}
              {property?.amenities?.printingAndScanning ? (
                <i style={{ color: "green" }}>
                  <GiConfirmed />
                </i>
              ) : (
                <i style={{ color: "red" }}>
                  <GiCancel />
                </i>
              )}
            </p>
          </div>
          <div className="property_wrapper">
            <i className="propert_icon">
              <FcConferenceCall />
            </i>
            <p className="desctiption_property">
              {" "}
              {property?.amenities?.conferenceRoom ? (
                <i style={{ color: "green" }}>
                  <GiConfirmed />
                </i>
              ) : (
                <i style={{ color: "red" }}>
                  <GiCancel />
                </i>
              )}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ListingDetail;
