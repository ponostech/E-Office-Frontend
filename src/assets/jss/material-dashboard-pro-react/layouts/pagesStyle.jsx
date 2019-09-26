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
  wrapper:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    margin:0,
    padding:0
  },
  drawer:{
    root:{
      background:"#26b99a"
    }
  },
  header:{
    display:"flex"
  },
  main:{
    flexGrow:1,
    marginTop:70,
    padding:0,
  },
  footer:{

  },

  container: {
    ...container,
    // paddingBottom: "70px",
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "40px"
    }
  },
});

export default pagesStyle;
