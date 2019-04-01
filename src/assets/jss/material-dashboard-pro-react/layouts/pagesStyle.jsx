const container = {

  marginRight: "auto",
  marginLeft: "auto",
  width:'100%',
  "@media (min-width: 768px)": {
    width: "750px"
  },
  "@media (min-width: 992px)": {
    width: "970px"
  },
  "@media (min-width: 1200px)": {
    width: "100%"
  },
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
    background:"white",
    top: "0",
  },
  container: {
    ...container,
    paddingBottom: "70px",
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "40px"
    }
  },

  fullPage: {
    background:'white',
    position: "relative",
    minHeight: "70vh",
    display: "flex!important",
    margin: "0",
    paddingBottom:"30px",
    border: "0",
    // color: "#fff",
    // alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      minHeight: "fit-content!important"
    },

  }
});

export default pagesStyle;
