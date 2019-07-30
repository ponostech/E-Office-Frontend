import React, { Component } from "reactn";
import NavPills from "../../components/NavPills/NavPills";
import ShopIcon from "@material-ui/icons/LocalGroceryStore";
import HotelIcon from "@material-ui/icons/Hotel";
import BannerIcon from "@material-ui/icons/PictureInPicture";
import ShopLicenseList from "./applicant-layout/ShopLicenseList";
import BannerList from "./applicant-layout/BannerList";
import { Card, CardContent, CardHeader, Grid, Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import LicenseList from "./applicant-layout/LicenseList";

class ApplicantDashboard extends Component {

  render() {
    const { phone, shops, hotels, banners } = this.props;
    return (
        <Card>
          <CardHeader title={`Dashboard of ${phone}`}/>
          <CardContent>
            <Grid container={true} spacing={3} justify={"center"}>

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
                      tabContent: (<ShopLicenseList refresh={this.props.refresh} shops={shops}/>)
                    }, {
                      tabButton: "Hotel ",
                      tabIcon: HotelIcon,
                      tabContent: (<p>fdf</p>)
                    }, {
                      tabButton: "Banners",
                      tabIcon: BannerIcon,
                      tabContent: (<BannerList/>)
                    }, {
                      tabButton: "License",
                      tabIcon: BannerIcon,
                      tabContent: (<LicenseList phone={phone}/>)
                    }
                  ]}
                />
              </Grid>

            </Grid>
          </CardContent>

        </Card>

    );
  }
}

ApplicantDashboard.propTypes = {
  phone: PropTypes.string.isRequired,
  shops: PropTypes.array.isRequired,
  hotels: PropTypes.array.isRequired,
  banners: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired
};
export default ApplicantDashboard;