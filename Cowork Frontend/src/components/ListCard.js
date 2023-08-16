import React, { useEffect, useState } from "react";
import "./listcard.scss";
import StarRatings from "react-star-ratings";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { addToFav, getFav, removeFromFav } from "../utils/favourities";
import { toast } from "react-toastify";

function ListCard({ data }) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  const clacluateRating = () => {
    if (data?.reviews?.length === 0) {
      setRating(0);
    } else {
      const rat =
        data?.reviews?.reduce((acc, curr) => acc + curr.review.rating, 0) /
        data?.reviews?.length;
      setRating(rat);
    }
  };

  useEffect(() => {
    clacluateRating();
  }, [data]);
  const handleMove = () => {
    if (window.location.pathname === "/userListing") {
      navigate(`/listing/${data?._id}`);
    } else if (window.location.pathname !== "/awaitingConfirmation") {
      navigate(`/property/${data?._id}`);
    } else {
      toast.info("This property is not live yet");
    }
  };

  const [fav, setFav] = useState();

  const handleFav = (e) => {
    if (window.location.pathname !== "/awaitingConfirmation") {
      e.stopPropagation();
      addToFav(data);
      setFav(data?._id);
    } else {
      toast.info("This property is not live yet");
    }
  };

  const removeFav = (e) => {
    e.stopPropagation();
    removeFromFav(data?._id);
    setFav();
  };

  const getIt = async () => {
    const fav = await getFav();
    if (data) {
      const filtered = fav.filter((x) => x.product?._id === data?._id);
      console.log(filtered);
      if (filtered?.length > 0) {
        setFav(filtered?.[0]?.product?._id);
      }
    }
  };

  useEffect(() => {
    getIt();
  }, [data]);

  console.log(rating);
  return (
    <>
      <div className="listcard__main" onClick={handleMove}>
        <div className="listCards_imageSectiuon">
          <img src={data?.images?.[0]?.image}></img>
        </div>
        <div className="below_section">
          <div>
            <p>{data?.name}</p>
            <div>
              <StarRatings
                rating={rating}
                starRatedColor="blue"
                // changeRating={this.changeRating}
                numberOfStars={5}
                name="rating"
                starDimension="16px"
                starSpacing="2px"
              />
            </div>
          </div>
          {fav ? (
            <i
              className="hear_list_card"
              onClick={(e) => removeFav(e)}
              style={{ color: "orange" }}
            >
              <AiFillHeart />
            </i>
          ) : (
            <i className="hear_list_card" onClick={(e) => handleFav(e)}>
              <AiOutlineHeart />
            </i>
          )}
        </div>
        <div className="amneties_list">
          <div className="amn_inner">
            <p>Capacity</p>
            <p>{data?.capacity} persons</p>
          </div>
          <div className="amn_inner">
            <p>Price</p>
            <p>RS {data?.pricePerOffice} /- per day</p>
          </div>
          <div className="amn_inner">
            <p>City</p>
            <p>{data?.city}</p>
          </div>
          <div className="amn_inner">
            <p>Area</p>
            <p>{data?.area}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListCard;
