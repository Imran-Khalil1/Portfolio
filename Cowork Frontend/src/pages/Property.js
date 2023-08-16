import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./property.scss";
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

function Property() {
  const [property, setProperty] = useState();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [rat, setRat] = useState(0);
  const [visible, setVisible] = useState(false);
  const [officesLeft, setOfficesLeft] = useState(0);
  const [smallConference, setSmallConference] = useState(0);
  const [largeConference, setLargeConference] = useState(0);
  const [mediumConference, setMediumConference] = useState(0);
  const [deskLeft, setDeskLeft] = useState(0);
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
      <div className="proprrrsss">
        <Header />
        <div className="property_header">
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
            <img src={property?.images?.[0]?.image} className="inner_imaaae" />
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
          <div className="__wrapper__">
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
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {property?.conferenceRoom && (
            <>
              <h2 style={{ textAlign: "center" }}> Conference Rooms</h2>
              <div className="property_wrapper_____">
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            {loading4 ? (
              <FadeLoader />
            ) : (
              <button className="property_bookNow" onClick={handleopen}>
                Book Now
              </button>
            )}
          </div>
          <hr />
          <center>
            <h1>Reviews by users</h1>
          </center>
          <div className="review_property">
            <div className="review_left">
              <center>
                <h3>Overall Rating</h3>
              </center>
              <div className="left_inner">
                <StarRatings
                  rating={rating}
                  starRatedColor="blue"
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                  starSpacing="5px"
                />
                <p>{rating} out of 5</p>
              </div>
              <center>
                <h3>Add public review</h3>
                <StarRatings
                  rating={rat}
                  starRatedColor="blue"
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                  starSpacing="5px"
                  changeRating={setRat}
                />
              </center>
              <div className="very_inner">
                <input
                  placeholder="name"
                  value={review.name}
                  onChange={(e) =>
                    setReview({ ...review, name: e.target.value })
                  }
                ></input>
                <textarea
                  placeholder="description"
                  value={review.description}
                  onChange={(e) =>
                    setReview({ ...review, description: e.target.value })
                  }
                ></textarea>
                <button
                  className="property_bookNow"
                  style={{ marginTop: "20px" }}
                  onClick={handleReview}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="review_right">
              {reviews?.length > 0 ? (
                reviews?.map((review) => {
                  return (
                    <div className="review_card">
                      <img src="https://res.cloudinary.com/dd77cqt5fs/image/upload/v1677009385/WhatsApp_Image_2023-02-22_at_12.04.10_AM_b3qcqt.jpg"></img>
                      <div>
                        <StarRatings
                          rating={review?.review?.rating}
                          starRatedColor="blue"
                          numberOfStars={5}
                          name="rating"
                          starDimension="18px"
                          starSpacing="5px"
                        />
                        <p>{review?.review?.name}</p>

                        <p>{review?.review?.description}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No review yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Property;
