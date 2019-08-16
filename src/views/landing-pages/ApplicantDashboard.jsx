import React, { Component } from "reactn";
import NavPills from "../../components/NavPills/NavPills";
import AppIcon from "@material-ui/icons/Apps";
import BannerIcon from "@material-ui/icons/PictureInPicture";
import WarningIcon from "@material-ui/icons/Warning";
import DnsIcon from "@material-ui/icons/Dns";
import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import LicenseList from "./applicant-layout/LicenseList";
import LicenseExpiringList from "./applicant-layout/LicenseExpiringList";
import UserChallanList from "./applicant-layout/UserChallanList";
import { LicenseService } from "../../services/LicenseService";
import ChallanService from "../../services/ChallanService";
import ApplicationList from "./applicant-layout/ApplicationList";

class ApplicantDashboard extends Component {

  constructor(props) {
    super(props);
    const { hotels, shops, banners } = props;
    this.state = {
      shops: hotels ? hotels : [],
      hotels: shops ? shops : [],
      banners: banners ? banners : [],

      bannerLicenses: [],
      shopLicenses: [],
      hotelLicenses: [],

      challans: [],
      renewableLicenses: []
    };
    this.licenseService = new LicenseService();
    this.challanService = new ChallanService();
  }

  getApplications = () => {
    const { phone } = this.props;
    this.setGlobal({ loading: true });
    this.licenseService.getApplications(phone,
      errorMsg => this.setGlobal({ errorMsg }),
      data => this.setState({ shops: data.shops, hotels: data.hotels, banners: data.banners }))
      .finally(() => this.setGlobal({ loading: false }));
  };

  getLicenses = () => {
    const { phone } = this.props;
    this.licenseService.getLicenses(phone,
      errorMsg => this.setGlobal({ errorMsg }),
      (shopLicenses, hotelLicenses, bannerLicenses) => this.setState({
        shopLicenses, hotelLicenses, bannerLicenses
      }))
      .finally(() => console.log("get licenses request complete"));
  };

  getRenewableLicenses = () => {
    const { phone } = this.props;
    this.setGlobal({ loading: true });
    this.licenseService.getRenewablePermitList(phone,
      errorMsg => this.setGlobal({ errorMsg }),
      renewableLicenses => this.setState({ renewableLicenses }))
      .finally(() => this.setGlobal({ loading: false }));
  };
  getChallans = () => {
    const { phone } = this.props;
    this.setGlobal({ loading: true });
    this.challanService.getUserChallan(phone,
      errorMsg => this.setGlobal({ errorMsg }),
      (shop, hotel, banner) => this.setState({ challans: { shop, hotel, banner } }))
      .finally(() => this.setGlobal({ loading: false }));
  };

  render() {
    const { shops, hotels, banners, licenses, renewableLicenses, challans } = this.state;
    const { hotelLicenses, bannerLicenses, shopLicenses } = this.state;
    const { phone } = this.props;
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
                    onTabClick: this.getApplications,
                    tabButton: "Application",
                    tabIcon: AppIcon,
                    tabContent: (<ApplicationList phone={phone}
                                                  bannerApplications={banners}
                                                  hotelApplications={hotels}
                                                  shopApplications={shops}
                                                  refresh={this.props.refresh}/>)
                  }, {
                    onTabClick: this.getLicenses,
                    tabButton: "License",
                    tabIcon: BannerIcon,
                    tabContent: (<LicenseList bannerLicenses={bannerLicenses} hotelLicenses={hotelLicenses}
                                              shopLicenses={shopLicenses} phone={phone}/>)
                  }, {
                    onTabClick: this.getRenewableLicenses,
                    tabButton: "Expiring/ Expired License",
                    tabIcon: WarningIcon,
                    tabColor: "secondary",
                    tabContent: (<LicenseExpiringList permits={renewableLicenses} phone={phone}/>)
                  }, {
                    onTabClick: this.getChallans,
                    tabButton: "Challan List",
                    tabIcon: DnsIcon,
                    tabContent: (<UserChallanList
                      banner={challans ? challans.banner : []}
                      hotel={challans ? challans.hotel : []}
                      shop={challans ? challans.shop : []} phone={phone}/>)
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