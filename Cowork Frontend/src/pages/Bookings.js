import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./bookings.scss";
import { getService } from "../services/service";
import { AiFillEye } from "react-icons/ai";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Countdown from "react-countdown";
import { Navigate, useNavigate } from "react-router-dom";

function Bookings() {
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

  const user = JSON.parse(localStorage.getItem("coWorkUser"));
  const [bookings, setBookings] = useState([]);
  const getData = async () => {
    const result = await getService(`/bookings/${user?._id}`);
    setBookings(result?.data?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const TitleTemplate = (rowData) => {
    return rowData?.property?.name;
  };

  const addRessTemplate = (rowData) => {
    return rowData?.property?.address;
  };

  const privteTemplate = (rowData) => {
    return (
      <i onClick={() => navigate(`/booking/${rowData?._id}`)}>
        <AiFillEye />
      </i>
    );
  };

  const deskTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", columnGap: "10px" }}>
        {rowData?.listOFDesks?.map((li) => {
          return (
            <div>
              <p>D{li}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const expireTemplate = (rowData) => {
    return <Countdown date={parseInt(rowData?.endDate)} renderer={renderer} />;
  };
  return (
    <div>
      <Header />
      <div className="booking_main">
        <h2 style={{ textAlign: "center" }}>Bookings</h2>
        <DataTable value={bookings} tableStyle={{ minWidth: "50rem" }}>
          <Column field="code" header="Property" body={TitleTemplate}></Column>
          <Column field="name" header="Address" body={addRessTemplate}></Column>
          <Column header="Type" field="type"></Column>
          <Column header="amount payed" field="totalPrice"></Column>
          <Column header="Expiring in" body={expireTemplate}></Column>
          <Column header="Actions" body={privteTemplate}></Column>
        </DataTable>
      </div>
      <Footer />
    </div>
  );
}

export default Bookings;
