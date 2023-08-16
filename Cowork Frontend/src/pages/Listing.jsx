import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Typography, Box, Button } from "@material-ui/core";
import useStyles from "./listingstyles";
import { useNavigate } from "react-router-dom";

function Listing() {
  const classes = useStyles();
  const navigate = useNavigate();
  const role = localStorage.getItem("coworkRole");

  return (
    <Box>
      <Header />
      <Box className={classes.hero}>
        <Box className={classes.headingText}>
          <Typography className={classes.topText} variant="h4">
            Join the World's top operators earning millions in annual revenue
            through Cowork.
          </Typography>
          {role === "lessor" && (
            <Button
              className={classes.listingButton}
              onClick={() => navigate("/listingform")}
            >
              List for Free
            </Button>
          )}
          <Typography>Already listed? Login here</Typography>
        </Box>
        <Box className={classes.informationSection}>
          <Box className={classes.box1}>
            <Typography className={classes.text} variant="h6">
              Maximize your Revenue
            </Typography>
            <Typography variant="p">
              Sell your places by the hour, day, month or longer, all in one
              place
            </Typography>
          </Box>
          <Box className={classes.box2}>
            <Typography className={classes.text} variant="h6">
              Free and Flexible
            </Typography>
            <Typography variant="p">
              You don't pay a penny until we fill your space and our contract
              has no fixed term
            </Typography>
          </Box>
          <Box className={classes.box3}>
            <Typography className={classes.text} variant="h6">
              Internation Reach
            </Typography>
            <Typography variant="p">
              We are a global marketplace in over 100 cities across Pakistan
            </Typography>
          </Box>
          <Box className={classes.box4}>
            <Typography className={classes.text} variant="h6">
              Expert Advice
            </Typography>
            <Typography variant="p">
              Our workspace experts are here to help, with pricing, photos and
              more
            </Typography>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
export default Listing;
