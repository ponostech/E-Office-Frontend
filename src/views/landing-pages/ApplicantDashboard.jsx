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

class ApplicantDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNo: "000000",

      hotels: [],
      shops: [],
      banners: []

    };
    this.licenseService = new LicenseService();
  }

  componentDidMount() {
    const{mobile_no}=this.props.match.params
    this.setState({phoneNo:mobile_no})
    this.setGlobal({loading:true})
    this.licenseService.getApplications(mobile_no,
      errorMsg=>this.setGlobal({errorMsg}),
      data=>this.setState({shops:data.shops}))
      .finally(()=>this.setGlobal({loading:false}))

  }

  render() {
    const { phoneNo,shops,hotels } = this.state;
    return (
      <Card>
        <CardHeader title={`Dashboard of ${phoneNo}`}/>
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
        </CardContent>

      </Card>

    );
  }
}

export default ApplicantDashboard;