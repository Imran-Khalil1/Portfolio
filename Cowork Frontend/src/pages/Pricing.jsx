import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useStyles from "./pricing";
import { Box, Typography } from "@material-ui/core";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PeopleIcon from "@material-ui/icons/People";
import "./pricing.scss";
import { BiGitCompare } from "react-icons/bi";
import { GiPriceTag } from "react-icons/gi";
import { MdOutlineAdsClick } from "react-icons/md";
import { getService } from "../services/service";
import { useNavigate } from "react-router-dom";
import { cities } from "../assets/data";

function Pricing() {
  const classes = useStyles();
  const [city, setCity] = useState("Islamabad");
  const [props, setProps] = useState([]);
  const [compare, setcompare] = useState(false);
  const [selected, setSelected] = useState([]);
  const [count, setcount] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [priva, setPrivate] = useState(true);
  const [coWork, setCoWork] = useState(true);
  const [filters, setFilters] = useState({
    compare: false,
    price: false,
  });

  const getData = async () => {
    const result = await getService(`cityProperty?city=${city}`);
    setProps(result?.data?.data);
  };

  useEffect(() => {
    getData();
  }, [city]);

  const handleCompare = (e, value) => {
    e.stopPropagation();
    const temp = selected;
    const index = selected?.map((e) => e.area).indexOf(value?.area);
    if (index === -1) {
      temp.push(value);
    } else {
      temp.splice(index, 1);
    }
    setSelected(temp);
    setcount(count + 1);
  };
  const handleApply = () => {
    setcompare(false);
    setProps(selected);
    setFilters({ ...filters, compare: true });
  };
  const handleResetCompare = () => {
    setSelected([]);
    getData();
    setFilters({ ...filters, compare: false });
  };
  const handleMinPrice = (value) => {
    setMinPrice(value);
    setFilters({
      ...filters,
      price: true,
    });
  };

  const HandleMaxPrice = (value) => {
    setFilters({
      ...filters,
      price: true,
    });
    setMaxPrice(value);
  };

  const handlePriceReset = () => {
    setFilters({
      ...filters,
      price: false,
    });
    setMinPrice(0);
    setMaxPrice(10000);
  };
  const naviagate = useNavigate();
  return (
    <Box>
      <Header />
      <Box className={classes.maindiv}>
        <div className="pricing_top">
          <div className="pricing_top_inner">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="pricingSelect"
            >
              {cities?.map((city) => {
                return (
                  <option
                    selected={city === "Islamabad" ? true : false}
                    onClick={() => setCity(city)}
                  >
                    {city}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="pricing_top_inner_right">
            <div className={filters?.compare ? "right_card2" : "right_card"}>
              <i>
                <BiGitCompare />
              </i>
              <p>Compare Areas</p>
              <div className="ye_it">
                {!compare ? (
                  <button onClick={() => setcompare(!compare)}>Active</button>
                ) : (
                  <button onClick={handleApply}>Apply</button>
                )}
                <button onClick={handleResetCompare}>Reset</button>
              </div>
            </div>
            <div className={filters?.price ? "right_card2" : "right_card"}>
              <i>
                <GiPriceTag />
              </i>
              <p>Filter Prices</p>
              <div className="oh_yesssss">
                <input
                  placeholder="min Price"
                  value={minPrice}
                  onChange={(e) => handleMinPrice(e.target.value)}
                ></input>
                <input
                  placeholder="max Price"
                  value={maxPrice}
                  onChange={(e) => HandleMaxPrice(e.target.value)}
                ></input>
              </div>
              <button className="butonnes" onClick={handlePriceReset}>
                Reset
              </button>
            </div>
            <div className="right_card">
              <i>
                <MdOutlineAdsClick />
              </i>
              <p>Filter workspaces</p>
              <div>
                <input
                  type="checkbox"
                  checked={priva === true ? true : false}
                  onClick={() => setPrivate(!priva)}
                ></input>
                <label>Private office</label>
              </div>
              <div style={{ marginTop: "10px" }}>
                <input
                  type="checkbox"
                  checked={coWork === true ? true : false}
                  onClick={() => setCoWork(!coWork)}
                ></input>
                <label>CoWorking</label>
              </div>
            </div>
          </div>
        </div>
        <div className="pricing_lower">
          <div className="pricing_lower_left">
            <p>Map/chart displays average monthly desk prices for areas.</p>
            <div></div>
          </div>
          <div className="pricing_lower_right">
            <div className="pricing_table_top">
              <div></div>
              <div>Area</div>
              {priva && <div>Private offices</div>}
              {coWork && <div>coWorking</div>}
            </div>
            {props?.map((prop) => {
              return (
                <div
                  className="pricing_table_lower"
                  onClick={() => naviagate(`/location?area=${prop?.area}`)}
                >
                  <div>
                    {compare && (
                      <input
                        type="checkbox"
                        style={{ transform: "scale(1.2)" }}
                        onClick={(e) => handleCompare(e, prop)}
                      ></input>
                    )}
                  </div>
                  <div>
                    <p>{prop?.area}</p>
                  </div>
                  {priva && (
                    <div>
                      <p
                        className={
                          filters?.price
                            ? prop?.privateOfficePrice >= minPrice &&
                              prop?.privateOfficePrice <= maxPrice
                              ? ""
                              : "oh_nooo"
                            : ""
                        }
                      >
                        {prop?.privateNumber === 0 ? (
                          <span>No Offices </span>
                        ) : (
                          `Rs ${prop.privateOfficePrice} (${prop?.privateNumber}) office/s`
                        )}
                      </p>
                    </div>
                  )}
                  {coWork && (
                    <div>
                      <p
                        className={
                          filters?.price
                            ? prop?.CoWorkingPrice >= minPrice &&
                              prop?.CoWorkingPrice <= maxPrice
                              ? ""
                              : "oh_nooo"
                            : ""
                        }
                      >
                        {prop?.coWorkingNumber === 0 ? (
                          <span>No Offices </span>
                        ) : (
                          `Rs ${prop.CoWorkingPrice} (${prop?.coWorkingNumber}) office/s`
                        )}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="pricing_table_top">
              <div></div>
              <div>Average</div>
              {priva && (
                <div>
                  Rs{" "}
                  {props?.reduce(
                    (curr, acc) => curr + acc.privateOfficePrice,
                    0
                  ) / props?.reduce((curr, acc) => curr + acc.privateNumber, 0)}
                </div>
              )}
              {coWork && (
                <div>
                  {" "}
                  Rs{" "}
                  {Math.round(
                    props?.reduce((curr, acc) => curr + acc.CoWorkingPrice, 0) /
                      props?.reduce(
                        (curr, acc) => curr + acc.coWorkingNumber,
                        0
                      )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Box>
      <Footer />
    </Box>
  );
}
export default Pricing;
