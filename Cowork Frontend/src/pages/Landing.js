import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./landing.scss";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/landing1.jpg";
import img2 from "../assets/landing2.jpg";
import img3 from "../assets/landing3.jpg";
import meetingRoom from "../assets/meeting-room.png";
import parking from "../assets/parking.png";
import projector from "../assets/projector.png";
import tracking from "../assets/tracking.png";
import wifiRouter from "../assets/wifi-router.png";
import workstation from "../assets/workstation.png";
import airConditioner from "../assets/air-conditioner.png";
import clock from "../assets/clock.png";
import { getService } from "../services/service";

function Landing() {
  const naviagte = useNavigate();
  const token = localStorage.getItem("coWorkToken");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (token) {
      naviagte("/location");
    }
  }, []);
  const navigate = useNavigate();
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const getData = async () => {
    const result = await getService("findProp");
    setData(result?.data?.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const filterPrivate = (name) => {
    const dat = data.filter((item) => item.city === name);
    return dat?.[0]?.["privateOffice"];
  };

  const filterCoworking = (name) => {
    const dat = data.filter((item) => item.city === name);
    return dat?.[0]?.["desk"];
  };
  return (
    <>
      <div className="landing_main">
        <Header />
        <button className="signin-Button" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
        <Slider {...settings}>
          <div className="image_div" style={{ backgroundImage: `url()` }}>
            <img className="inner_image" src={img1} alt="landing page "></img>
          </div>
          <div>
            <img className="inner_image" src={img2} alt="landing page "></img>
          </div>
          <div>
            <img className="inner_image" src={img3} alt="landing page "></img>
          </div>
        </Slider>
        <div className="information_outer">
          <h1 className="about">About Us</h1>
          <div className="information_inner">
            <div className="information_specific">
              <img src={clock} alt="clock" className="information_image" />
              <h2 className="information_text">Flexible Timings</h2>
            </div>
            <div className="information_specific">
              <img
                src={meetingRoom}
                alt="meetingRoom"
                className="information_image"
              />
              <h2 className="information_text">Conference Room</h2>
            </div>
            <div className="information_specific">
              <img src={parking} alt="parking" className="information_image" />
              <h2 className="information_text">Parking</h2>
            </div>
            <div className="information_specific">
              <img
                src={projector}
                alt="projector"
                className="information_image"
              />
              <h2 className="information_text">Projector</h2>
            </div>
            <div className="information_specific">
              <img
                src={wifiRouter}
                alt="wifiRouter"
                className="information_image"
              />
              <h2 className="information_text">Fast Internet</h2>
            </div>
            <div className="information_specific">
              <img
                src={workstation}
                alt="workstation"
                className="information_image"
              />
              <h2 className="information_text">Modern Design</h2>
            </div>
            <div className="information_specific">
              <img
                src={airConditioner}
                alt="airconditioner"
                className="information_image"
              />
              <h2 className="information_text">Air Conditioner</h2>
            </div>
            <div className="information_specific">
              <img
                src={tracking}
                alt="tracking"
                className="information_image"
              />
              <h2 className="information_text"> Storage Location</h2>
            </div>
          </div>
        </div>
        <div className="Locations_main">
          <h1>Locations</h1>
          <div className="locations_inner">
            <div
              className="location_card"
              onClick={() => naviagte("/location?city=Islamabad")}
            >
              <div className="image_left">
                <img src="https://res.cloudinary.com/dd77cqt5fs/image/upload/v1680659142/isb_zarmpu.jpg"></img>
              </div>
              <div className="location_left">
                <p>Islamabad</p>
                <p>Private offices: {filterPrivate("Islamabad")}</p>
                <p>Coworking spaces: {filterCoworking("Islamabad")}</p>
              </div>
            </div>
            <div
              className="location_card"
              onClick={() => naviagte("/location?city=Rawalpindi")}
            >
              <div className="image_left">
                <img src="https://res.cloudinary.com/dd77cqt5fs/image/upload/v1680659142/rwp_jzqbsm.jpg"></img>
              </div>
              <div className="location_left">
                <p>Rawalpindi</p>
                <p>Private offices: {filterPrivate("Rawalpindi")}</p>
                <p>Coworking spaces: {filterCoworking("Rawalpindi")}</p>
              </div>
            </div>
            <div
              className="location_card"
              onClick={() => naviagte("/location?city=Haiderabad")}
            >
              <div className="image_left">
                <img src="https://res.cloudinary.com/dd77cqt5fs/image/upload/v1680659142/hadier_zmyhg8.jpg"></img>
              </div>
              <div className="location_left">
                <p>Haiderabad</p>
                <p>Private offices: {filterPrivate("Haiderabad")}</p>
                <p>Coworking spaces: {filterCoworking("Haiderabad")}</p>
              </div>
            </div>
            <div
              className="location_card"
              onClick={() => naviagte("/location?city=Peshawar")}
            >
              <div className="image_left">
                <img src="https://res.cloudinary.com/dd77cqt5fs/image/upload/v1680659142/pash_bdd2ax.jpg"></img>
              </div>
              <div className="location_left">
                <p>Peshawar</p>
                <p>Private offices: {filterPrivate("Peshawar")}</p>
                <p>Coworking spaces: {filterCoworking("Peshawar")}</p>
              </div>
            </div>
            <div
              className="location_card"
              onClick={() => naviagte("/location?city=Karachi")}
            >
              <div className="image_left">
                <img src="https://res.cloudinary.com/dd77cqt5fs/image/upload/v1680659142/kha_d6nb7j.jpg"></img>
              </div>
              <div className="location_left">
                <p>Karachi</p>
                <p>Private offices: {filterPrivate("Karachi")}</p>
                <p>Coworking spaces: {filterCoworking("Karachi")}</p>
              </div>
            </div>
            <div
              className="location_card"
              onClick={() => naviagte("/location?city=Multan")}
            >
              <div className="image_left">
                <img src="https://res.cloudinary.com/dd77cqt5fs/image/upload/v1680659141/mul_xk3ms2.jpg"></img>
              </div>
              <div className="location_left">
                <p>Multan</p>
                <p>Private offices: {filterPrivate("Multan")}</p>
                <p>Coworking spaces: {filterCoworking("Multan")}</p>
              </div>
            </div>
            {/* <div
              className="location_card"
              onClick={() => naviagte("/location?city=Faisalabad")}
            >
              <div className="image_left">
                <img src="https://res.cloudinary.com/dd77cqt5fs/image/upload/v1680659141/faisal_owqlhg.jpg"></img>
              </div>
              <div className="location_left">
                <p>Faisalabad</p>
                <p>Private offices: {filterPrivate("Faisalabad")}</p>
                <p>Coworking spaces: {filterCoworking("Faisalabad")}</p>
              </div>
            </div> */}
            <div
              className="location_card"
              onClick={() => naviagte("/location?city=Lahore")}
            >
              <div className="image_left">
                <img src="https://res.cloudinary.com/dd77cqt5fs/image/upload/v1680659141/lahore_ke5mjm.jpg"></img>
              </div>
              <div className="location_left">
                <p>Lahore</p>
                <p>Private offices: {filterPrivate("Lahore")}</p>
                <p>Coworking spaces: {filterCoworking("Lahore")}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Landing;
