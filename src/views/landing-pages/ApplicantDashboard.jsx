import React, { Component } from "react";
import NavPills from "../../components/NavPills/NavPills";
import ShopIcon from "@material-ui/icons/LocalGroceryStore";
import HotelIcon from "@material-ui/icons/Hotel";
import BannerIcon from "@material-ui/icons/PictureInPicture";
import ShopLicenseList from "./applicant-layout/ShopLicenseList";
import HotelLicenseList from "./applicant-layout/HotelLicenseList";
import BannerList from "./applicant-layout/BannerList";
import { Grid, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

class ApplicantDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNo: "000000",

      hotels: [],
      shops: [],
      banners: []
    };
  }

  componentDidMount() {

  }

  render() {
    const { phoneNo } = this.state;
    return (
     <Grid container={true} spacing={3} justify={"center"}>

       {/*<Grid item={true} md={12} sm={12} xs={12}>*/}
         <Typography style={{textAlign:"center",marginTop:20}} color={"textPrimary"} variant={"h6"}>Dashboard of {phoneNo}</Typography>
       {/*</Grid>*/}

       {/*<Grid item={true} md={12} sm={12} xs={12}>*/}
       {/*  <Divider component={"div"}/>*/}
       {/*</Grid>*/}

       <Grid item={true} xs={12} sm={12} md={12}>
         <NavPills
           color={"primary"}
           horizontal={{
             tabsGrid: { xs: 12, sm: 12, md: 1 },
             contentGrid: { xs: 12, sm: 12, md: 11 }
           }}
           tabs={[
             {
               tabButton: "Shop ",
               tabIcon: ShopIcon,
               tabContent: (<ShopLicenseList/>)
             }, {
               tabButton: "Hotel ",
               tabIcon: HotelIcon,
               tabContent: (<HotelLicenseList/>)
             }, {
               tabButton: "Banners",
               tabIcon: BannerIcon,
               tabContent: (<BannerList/>)
             }
           ]}
         />
       </Grid>

     </Grid>
    );
  }
}

export default ApplicantDashboard;