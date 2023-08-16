import React, { useEffect, useState } from "react";
import "./bookingCard.scss";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";

function BookingCard({ data }) {
  const navigate = useNavigate();

  const Completionist = async () => {
    return <span>Expired</span>;
  };

  // Renderer callback with condition
  const renderer = (time) => {
    if (time?.completed) {
      // Render a completed state
      <Completionist />;
    } else {
      // Render a countdown
      return (
        <div style={{ display: "flex", columnGap: "20px", marginTop: "-10px" }}>
          <div>
            <p>{time?.days}</p>
            <p>days</p>
          </div>
          <div>
            <p>{time?.hours}</p>
            <p>hours</p>
          </div>
          <div>
            <p>{time?.minutes}</p>
            <p>minutes</p>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="nookcard__main">
        <div className="listCards_imageSectiuon">
          <img src={data?.property?.images?.[0]?.image}></img>
        </div>
        <div className="below_section">
          <div>
            <p>{data?.property?.name}</p>
          </div>
        </div>
        <div className="amneties_list">
          <div className="amn_inner">
            <p>Private Offices booked</p>
            <p>{data?.numberOfPrivateOffices}</p>
          </div>
          <div className="amn_inner">
            <p>private offices</p>
            <div style={{ display: "flex", columnGap: "3px" }}>
              {data?.listOFPrivateOffices?.map((li) => {
                return (
                  <div>
                    <p>P{li}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="amn_inner">
            <p>Amount Payed</p>
            <p>RS {data?.totalPrice}/-</p>
          </div>
          <div className="amn_inner">
            <p>Expiring In</p>
            <p>
              <Countdown date={parseInt(data?.endDate)} renderer={renderer} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingCard;
