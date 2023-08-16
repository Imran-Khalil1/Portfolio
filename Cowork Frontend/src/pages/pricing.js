import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  maindiv: {
    minHeight: "1000px",
    backgroundColor: "#F4EDE5",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "10%",
    marginBottom: "-5%",
  },
  citydiv: {
    height: "130px",
    backgroundColor: "#F1B47B",
    marginTop: "5%",
  },
  city: {
    color: "white",
    marginLeft: "5%",
  },
  filter1: {
    marginTop: "-5%",
    marginLeft: "40%",
    height: "120px",
    width: "12%",
    backgroundColor: "white",
    paddingLeft: "3%",
  },
  icons: {
    fontSize: "50px",
    marginLeft: "25%",
  },
  filter2: {
    marginTop: "-8%",
    marginLeft: "60%",
    height: "120px",
    width: "12%",
    backgroundColor: "white",
    paddingLeft: "3%",
  },
  filter3: {
    marginTop: "-8%",
    marginLeft: "80%",
    height: "120px",
    width: "12%",
    backgroundColor: "white",
    paddingLeft: "3%",
  },
  mapbox: {
    height: "350px",
    width: "35%",
    backgroundColor: "white",
    marginTop: "5%",
  },
}));

export default useStyles;
