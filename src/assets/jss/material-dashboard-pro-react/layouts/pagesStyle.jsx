const container = {

  marginRight: "auto",
  marginLeft: "auto",
  width:'100%',
  // "@media (min-width: 768px)": {
  //   width: "750px"
  // },
  // "@media (min-width: 992px)": {
  //   width: "970px"
  // },
  // "@media (min-width: 1200px)": {
  //   width: "100%"
  // },
  "&:before,&:after": {
    display: "table",
    content: '" "'
  },
  "&:after": {
    clear: "both"
  }
};
const pagesStyle = theme => ({
  wrapper: {
    height: "auto",
    minHeight: "100vh",
    position: "relative",
    top: "0"
  },
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  },

  fullPage: {
    padding: "120px 0",
    position: "relative",
    minHeight: "100vh",
    display: "flex!important",
    margin: "0",
    border: "0",
    // color: "#fff",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      minHeight: "fit-content!important"
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
      border: "none !important"
    },

    "&:before,&:after": {
      display: "block",
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      zIndex: "2"
    }
  }
});

export default pagesStyle;
