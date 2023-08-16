import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./bookingdetail.scss";
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

function BookingDetail() {
  const [property, setProperty] = useState();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [rat, setRat] = useState(0);
  const [visible, setVisible] = useState(false);
  const [review, setReview] = useState({
    name: "",
    description: "",
    rating: "",
  });
  const getData = async () => {
    const result = await getService(`/bookingById/${id}`);
    console.log(result?.data?.data);
    setReviews(result?.data?.data?.reviews);
    setProperty(result?.data?.data);
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

  const handleReview = async () => {
    const temp = reviews;
    review.rating = rat;
    temp.push({
      review: review,
    });
    const data = {
      id: property?._id,
      reviews: temp,
    };
    const result = await putService("addReview", data);
    if (result?.data?.success) {
      toast.success("review Added");
      setReview({
        name: "",
        description: "",
        rating: "",
      });
      setRat(0);
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  const [loading4, setLoading4] = useState(false);

  const handleopen = async () => {
    const user = JSON.parse(localStorage.getItem("coWorkUser"));
    console.log(user);
    if (user?.type === "lessor") {
      toast.info(
        "You are not allowed to book. please login form the tenet account"
      );
    } else {
      setLoading4(true);
      const result = await postService("releaseBooking", {
        propertyId: property?._id,
      });
      if (result?.data?.success) {
        setVisible(true);
        setLoading4(false);
      }
    }
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "50px 0px",
            marginTop: "100px",
          }}
        >
          {property?.property?.type === "private office" && (
            <div className="description__ionner">
              <h2 style={{ textAlign: "center" }}> Private Offices</h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <div className="property_wrapper2">
                    <p className="sub_title">Private Offices booked</p>
                    <p className="desctiption_property">
                      {property?.numberOfPrivateOffices}
                    </p>
                  </div>
                  <div className="property_wrapper2">
                    <p className="sub_title">Price per private Office</p>
                    <p className="desctiption_property">
                      Rs {property?.property?.pricePerOffice}/- per day
                    </p>
                  </div>
                  <div className="property_wrapper2">
                    <p className="sub_title">private Offices</p>
                    <div style={{ display: "flex", columnGap: "5px" }}>
                      {property?.listOFPrivateOffices?.map((item) => {
                        return (
                          <p
                            className="desctiption_property"
                            style={{
                              border: "1px solid #cecece",
                              padding: "3px",
                              borderRadius: "6px",
                            }}
                          >
                            P{item}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {property?.type === "coworking" && (
            <div className="description__ionner">
              <h2 style={{ textAlign: "center" }}> Dedicated Desks booked</h2>
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
                      Rs {property?.property?.pricePerDesk}/- per day
                    </p>
                  </div>
                  <div className="property_wrapper2">
                    <p className="sub_title">Dedicated desks</p>
                    <div style={{ display: "flex", columnGap: "5px" }}>
                      {property?.listOFDesks?.map((item) => {
                        return (
                          <p
                            className="desctiption_property"
                            style={{
                              border: "1px solid #cecece",
                              padding: "3px",
                              borderRadius: "6px",
                            }}
                          >
                            D{item}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {property?.type === "Mix" && (
            <>
              <div className="description__ionner">
                <h2 style={{ textAlign: "center" }}> Private Offices</h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <div className="property_wrapper2">
                      <p className="sub_title">Private Offices booked</p>
                      <p className="desctiption_property">
                        {property?.numberOfPrivateOffices}
                      </p>
                    </div>
                    <div className="property_wrapper2">
                      <p className="sub_title">Price per private Office</p>
                      <p className="desctiption_property">
                        Rs {property?.property?.pricePerOffice}/- per day
                      </p>
                    </div>
                    <div className="property_wrapper2">
                      <p className="sub_title">private Offices</p>
                      <div style={{ display: "flex", columnGap: "5px" }}>
                        {property?.listOFPrivateOffices?.map((item) => {
                          return (
                            <p
                              className="desctiption_property"
                              style={{
                                border: "1px solid #cecece",
                                padding: "3px",
                                borderRadius: "6px",
                              }}
                            >
                              P{item}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="description__ionner">
                <h2 style={{ textAlign: "center" }}> Dedicated Desks booked</h2>
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
                        Rs {property?.property?.pricePerDesk}/- per day
                      </p>
                    </div>
                    <div className="property_wrapper2">
                      <p className="sub_title">Dedicated desks</p>
                      <div style={{ display: "flex", columnGap: "5px" }}>
                        {property?.listOFDesks?.map((item) => {
                          return (
                            <p
                              className="desctiption_property"
                              style={{
                                border: "1px solid #cecece",
                                padding: "3px",
                                borderRadius: "6px",
                              }}
                            >
                              D{item}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {property?.property?.conferenceRoom && (
          <>
            <h2 style={{ textAlign: "center" }}> Conference Rooms</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "50px 0px",
              }}
            >
              {property?.numberOfSmallConferenceRooms > 0 && (
                <div className="description__ionner">
                  <h2 style={{ textAlign: "center" }}>
                    Small Conference Rooms
                  </h2>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <div className="property_wrapper3">
                        <p className="sub_title">conference rooms booked</p>
                        <p className="desctiption_property">
                          {property?.numberOfSmallConferenceRooms}
                        </p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Price per room</p>
                        <p className="desctiption_property">
                          Rs {property?.property?.SmallCPrice}/- per hour
                        </p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Capacity</p>
                        <p className="desctiption_property">1-5 persons</p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">conference rooms</p>
                        <div style={{ display: "flex", columnGap: "5px" }}>
                          {property?.listOFSmallConferenceRooms?.map((item) => {
                            return (
                              <p
                                className="desctiption_property"
                                style={{
                                  border: "1px solid #cecece",
                                  padding: "3px",
                                  borderRadius: "6px",
                                }}
                              >
                                SC{item}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {property?.numberOfMediumConferenceRooms > 0 && (
                <div className="description__ionner">
                  <h2 style={{ textAlign: "center" }}>
                    Medium Conference Rooms
                  </h2>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Conference rooms booked</p>
                        <p className="desctiption_property">
                          {property?.numberOfMediumConferenceRooms}
                        </p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Price per room</p>
                        <p className="desctiption_property">
                          Rs {property?.property?.BookingDetailMediumCPrice}/-
                          per hour
                        </p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Capacity</p>
                        <p className="desctiption_property">6-10 persons</p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">conference rooms</p>
                        <div style={{ display: "flex", columnGap: "5px" }}>
                          {property?.listOFMediumConferenceRooms?.map(
                            (item) => {
                              return (
                                <p
                                  className="desctiption_property"
                                  style={{
                                    border: "1px solid #cecece",
                                    padding: "3px",
                                    borderRadius: "6px",
                                  }}
                                >
                                  MC{item}
                                </p>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {property?.numberOfLargeConferenceRooms > 0 && (
                <div className="description__ionner">
                  <h2 style={{ textAlign: "center" }}>
                    Large conference rooms
                  </h2>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Conference rooms booked</p>
                        <p className="desctiption_property">
                          {property?.numberOfLargeConferenceRooms}
                        </p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Price per room</p>
                        <p className="desctiption_property">
                          Rs {property?.property?.LargeCPrice}/- per hour
                        </p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">Capacity</p>
                        <p className="desctiption_property">10-20 persons</p>
                      </div>
                      <div className="property_wrapper3">
                        <p className="sub_title">conference rooms</p>
                        <div style={{ display: "flex", columnGap: "5px" }}>
                          {property?.listOFLargeConferenceRooms?.map((item) => {
                            return (
                              <p
                                className="desctiption_property"
                                style={{
                                  border: "1px solid #cecece",
                                  padding: "3px",
                                  borderRadius: "6px",
                                }}
                              >
                                LC{item}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default BookingDetail;
