import React, { Component } from "reactn";
import NavPills from "../../components/NavPills/NavPills";
import ShopIcon from "@material-ui/icons/LocalGroceryStore";
import HotelIcon from "@material-ui/icons/Hotel";
import BannerIcon from "@material-ui/icons/PictureInPicture";
import ShopLicenseList from "./applicant-layout/ShopLicenseList";
import HotelLicenseList from "./applicant-layout/HotelLicenseList";
import BannerList from "./applicant-layout/BannerList";
import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { LicenseService } from "../../services/LicenseService";
import PropTypes from "prop-types";

class ApplicantDashboard extends Component {

  render() {
    const { phone,shops,hotels,banners } = this.props;
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
                    tabContent: (<ShopLicenseList shops={shops}/>)
                  }, {
                    tabButton: "Hotel ",
                    tabIcon: HotelIcon,
                    tabContent: (<p>fdf</p>)
                  }, {
                    tabButton: "Banners",
                    tabIcon: BannerIcon,
                    tabContent: (<BannerList/>)
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
  shops:PropTypes.array.isRequired,
  hotels:PropTypes.array.isRequired,
  banners:PropTypes.array.isRequired,
};
export default ApplicantDashboard;