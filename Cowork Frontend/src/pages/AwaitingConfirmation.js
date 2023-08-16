import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./lessorlisting.scss";
import ListCard from "../components/ListCard";
import Footer from "../components/Footer";
import { getService } from "../services/service";
import "react-input-range/lib/css/index.css";
import { useNavigate } from "react-router-dom";

function AwaitingConfirmation() {
  const [locations, setLocations] = useState([]);
  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("coWorkUser"));
    const result = await getService(
      `userProperites?id=${user?._id}&status=pending`
    );
    setLocations(result?.data?.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Header />
      <div className="locatio__Main">
        {locations?.length === 0 ? (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <h1 style={{ textAlign: "center" }}>No awaiting listings</h1>
          </div>
        ) : null}
        {locations?.map((location) => {
          return <ListCard data={location} />;
        })}
      </div>
      <Footer />
    </div>
  );
}

export default AwaitingConfirmation;
