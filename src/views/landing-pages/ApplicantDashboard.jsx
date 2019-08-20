import React, {Component} from "reactn";
import NavPills from "../../components/NavPills/NavPills";
import AppIcon from "@material-ui/icons/Apps";
import BannerIcon from "@material-ui/icons/PictureInPicture";
import WarningIcon from "@material-ui/icons/Warning";
import DnsIcon from "@material-ui/icons/Dns";
import {Card, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import LicenseList from "./applicant-layout/LicenseList";
import LicenseExpiringList from "./applicant-layout/LicenseExpiringList";
import UserChallanList from "./applicant-layout/UserChallanList";
import {LicenseService} from "../../services/LicenseService";
import ChallanService from "../../services/ChallanService";
import ApplicationList from "./applicant-layout/ApplicationList";
import {whiteColor, behanceColor, boxShadow, primaryColor} from "../../assets/jss/material-dashboard-pro-react";
import Paper from "@material-ui/core/Paper";
import {green} from "@material-ui/core/colors";
const style = {
  root: {
    display: "flex",
    alignItems: "center",
    minHeight: 40,
    justifyContent: "stretch",
    backgroundColor: whiteColor,
    padding: 0,
    marginRight: 20,
  },
  numberLabel: {
    height: "100%",
    lineHeight: 2,
    lineWidth: 2,
    width: 50,
    borderRadius: "22,0,0,3",
    textAlign: "center",
    backgroundColor: "#fff",
    color: "#26B99A",
    padding: "10 3",
    margin: 0
  },
  title: {
    color: "gray",
    paddingTop: 3,
    paddingBottom: 0,
    margin: 0,
    textAlign: "center"
  },
  panel: {
    textAlign: "center",
    paddingRight: 26,
    paddingLeft: 26,
    border:"#fff #ddd #fff #fff"
  },
  divider:{
    height:"7vh",
    width:"3px",
    backgroundColor:"#ddd"
  },
  caption: {
    padding: 0,
  }
}
const LabelInfo = ({number, title, description}) => {

  return (
      <div style={style.root}>
        <Typography style={style.numberLabel} variant={"h4"}>{number}</Typography>
        <div style={style.panel}>
          <Typography style={style.title} variant={"subtitle2"}>{title}</Typography>
          <Typography style={style.caption} color={"initial"} variant={"caption"}>{description}</Typography>
        </div>
      </div>
  )
}
class ApplicantDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shops:  [],
      hotels : [],
      banners: [],

      bannerLicenses: [],
      shopLicenses: [],
      hotelLicenses: [],

      challans: [],
      renewableLicenses: []
    };
    this.licenseService = new LicenseService();
    this.challanService = new ChallanService();
  }

  componentDidMount() {
    this.getApplications()
  }

  getApplications = () => {
    const {phone} = this.props;
    this.setGlobal({loading: true});
    this.licenseService.getApplications(phone,
        errorMsg => this.setGlobal({errorMsg}),
        data => this.setState({shops: data.shops, hotels: data.hotels, banners: data.banners}))
        .finally(() => this.setGlobal({loading: false}));
  };

  getLicenses = () => {
    const {phone} = this.props;
    this.licenseService.getLicenses(phone,
        errorMsg => this.setGlobal({errorMsg}),
        (shopLicenses, hotelLicenses, bannerLicenses) => this.setState({
          shopLicenses, hotelLicenses, bannerLicenses
        }))
        .finally(() => console.log("get licenses request complete"));
  };

  getRenewableLicenses = () => {
    const {phone} = this.props;
    this.setGlobal({loading: true});
    this.licenseService.getRenewablePermitList(phone,
        errorMsg => this.setGlobal({errorMsg}),
        renewableLicenses => this.setState({renewableLicenses}))
        .finally(() => this.setGlobal({loading: false}));
  };
  getChallans = () => {
    const {phone} = this.props;
    this.setGlobal({loading: true});
    this.challanService.getUserChallan(phone,
        errorMsg => this.setGlobal({errorMsg}),
        (shop, hotel, banner) => this.setState({challans: {shop, hotel, banner}}))
        .finally(() => this.setGlobal({loading: false}));
  };

  render() {
    const {shops, hotels, banners, licenses, renewableLicenses, challans} = this.state;
    const {hotelLicenses, bannerLicenses, shopLicenses} = this.state;
    const {phone} = this.props;

    const challanShopCount=challans?challans.shop?challans.shop.length:0:0
    const challansBannerCount=challans?challans.banner?challans.banner.length:0:0
    const challanHotelCount=challans?challans.hotel?challans.hotel.length:0:0
    const labels = (
        <div style={style.root}>
          <LabelInfo title={"No. of application"} description={"No. of application submitted"}
                     number={shops ? shops.length + 1 : 0 + hotels ? hotels.length : 0 + banners ? banners.length : 0}/>
                     <div style={style.divider}/>
          <LabelInfo title={"No. of License"} description={"No. of license/permit issued"}
                     number={bannerLicenses ? bannerLicenses.length + 1 : 0 + shopLicenses ? shopLicenses.length : 0 + hotelLicenses ? hotelLicenses.length : 0}/>
          <div style={style.divider}/>

          <LabelInfo title={"Challan"} description={"No. of Challan Generated"} number={challanHotelCount+challanShopCount+challansBannerCount}/>
          <div style={style.divider}/>

          <LabelInfo title={"Expired/Expiring"} description={"No. of License Expiring/Expired"}
                     number={renewableLicenses ? renewableLicenses.length : 0}/>
        </div>
    )

    return (
        <Card>
          <CardHeader style={{paddingTop: 10, paddingBottom: 0, marginBottom: 0}} title={`Dashboard of ${phone}`}
                      action={labels}/>
          <CardContent>
            <Grid container={true} spacing={3} justify={"center"}>
              <Grid style={{marginTop: 0}} item={true} xs={12} sm={12} md={12}>
                <NavPills
                    iconColor={"secondary"}
                    color={"primary"}
                    horizontal={{
                      tabsGrid: {xs: 3, sm: 12, md: 2},
                      contentGrid: {xs: 9, sm: 12, md: 10}
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