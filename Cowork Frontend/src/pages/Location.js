import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./location.scss";
import ListCard from "../components/ListCard";
import Footer from "../components/Footer";
import { getService } from "../services/service";
import { cities } from "../assets/data";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function Location() {
  const [locations, setLocations] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState();
  const [size, setSize] = useState();
  const [type, setType] = useState();
  const [value, setValue] = useState({
    min: 0,
    max: 10000,
  });
  const getData = async () => {
    const result = await getService("approvedProperty");
    setLocations(result?.data?.data);
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(window.location.search?.split("=")[1]);

  const getIt = async () => {
    const result = await axios.get(
      "http://localhost:5000/api/searchProperties",
      {
        params: {
          ...(city && { city: city }),
          ...(size && { size: size }),
          ...(type && { type: type }),
        },
      }
    );
    setLocations(result?.data?.data);
  };

  useEffect(() => {
    getIt();
  }, [city, size, type]);
  useEffect(() => {
    if (window.location.search) {
      setCity(window.location.search?.split("=")[1]);
    }
  }, [window.location.search]);

  return (
    <div>
      <Header />
      <div className="location__Main">
        <div className="locations_left">
          <h2>Filters</h2>
          <h4>Property Type</h4>
          <select
            className="filter_select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option selected disabled>
              Property Type
            </option>
            <option value="private office">Private office</option>
            <option value="coWorking">Co-Working</option>
            <option value="mix">Mix</option>
          </select>
          <h4>City</h4>
          <select
            className="filter_select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option selected disabled>
              City
            </option>
            {cities?.map((city) => {
              return <option value={city}>{city}</option>;
            })}
          </select>
          <h4>Size</h4>
          <input
            placeholder="Capacity"
            className="filter_select"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          ></input>
        </div>
        <div className="locations_right">
          {locations?.map((location) => {
            return <ListCard data={location} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Location;
