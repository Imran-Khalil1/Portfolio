import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  maindiv: {
    height: "100%",
    paddingTop: "231px",
    paddingLeft: "131px",
    paddingRight: "131px",
  },
  seconddiv: {
    backgroundColor: "#F1B47B",
    height: "auto",
    paddingLeft: "100px",
    paddingRight: "100px",
    paddingTop: "40px",
    borderRadius: "10px",
    marginBottom: "100px",
    paddingBottom: "20px",
  },
  innerDiv: {
    backgroundColor: "#F4EDE5",
    opacity: "0.53",
    borderRadius: "10px",
    marginBottom: "50px",
    padding: "20px 70px",
    borderRadius: "10px",
  },
  Answers: {
    marginTop: "10px",
    paddingLeft: "40px",
  },
  Questions: {
    paddingTop: "40px",
    paddingLeft: "40px",
  },
  submitButton: {
    marginLeft: "50%",
    backgroundColor: "#F1B47B",
    color: "white",
    boxShadow: "1px 18px 20px rgba(0, 0, 0, 0.1)",
    width: "100px",
    height: "50px",
    borderRadius: "5px",
  },
}));

export default useStyles;
