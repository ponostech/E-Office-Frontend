import {
  defaultFont,
  container,
  containerFluid,
  primaryColor,
  whiteColor,
  grayColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const footerStyle = {
  margin:20,
  block: {},
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    margin: "0",
    fontSize: "14px",
    float: "right!important",
    padding: "15px"
  },
  footer: {
    background:"#26b99a",
    width:"100%",
    height:"70px",
    position:'absolute',
    color:"white",
    bottom: "0",
    borderTop: "1px solid " + grayColor[15],
    padding: "15px 0",
    ...defaultFont,
    zIndex: 4
  },
  container: {
    zIndex: 3,
    ...container,
    position: "relative"
  },
  containerFluid: {
    zIndex: 3,
    ...containerFluid,
    position: "relative"
  },
  a: {
    color: "white",
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0",
    width: "auto"
  },
  whiteColor: {
    "&,&:hover,&:focus": {
      color: whiteColor
    }
  }
};
export default footerStyle;
