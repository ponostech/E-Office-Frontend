const container = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  "@media (min-width: 768px)": {
    width: "750px"
  },
  "@media (min-width: 992px)": {
    width: "970px"
  },
  "@media (min-width: 1200px)": {
    width: "1170px"
  },
  "&:before,&:after": {
    display: "table",
    content: "\" \""
  },
  "&:after": {
    clear: "both"
  }
};
const officeStyle = theme => ({
  wrapper: {
    margin: 0,
    padding: 0,
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "flex-start",
    flexDirection: "column",
    zIndex:800,

    "@media (min-width: 768px)": {
      width: "750px"
    },
    "@media (min-width: 992px)": {
      width: "970px"
    },
    "@media (min-width: 1200px)": {
      width: "1170px"
    },
    "&:before,&:after": {
      display: "table",
      content: "\" \""
    },
    "&:after": {
      clear: "both"
    }
  },
  head: {
    position:"relative",
    margin: 0,
    padding: 0,
  },
  content: {
    position:"relative",
    width:"100vw",
    marginTop: 65,
    marginBottom:0,
    marginLeft:0,
    marginRight:0,
    padding: 0,
    flexGrow: 1,

  }
});

export default officeStyle;
