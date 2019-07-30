import React, { Component } from "reactn";
import { Card, CardContent, CardHeader, Grid, Icon, Paper, Tab, Tabs } from "@material-ui/core";
import OfficeContextMenu from "../../../components/OfficeContextMenu";
import IconButton from "@material-ui/core/IconButton";
import { LicenseService } from "../../../services/LicenseService";
import PropTypes from "prop-types";

const LicenseCard = (props) => {

  const onContextMenuClick = (menu) => {
    console.log(menu);
  };
  const menu = {
    icon: <Icon>more_vert</Icon>,
    textOnly: false,
    menuItems: [
      {
        name: "profile",
        icon: <Icon fontSize={"small"}>user</Icon>,
        text: "Download License",
        onClick: onContextMenuClick
      },
      { name: "profile", icon: <Icon fontSize={"small"}>edit</Icon>, text: "My Account", onClick: onContextMenuClick },
      {
        name: "log_out",
        icon: <Icon fontSize={"small"}>power_settings_new</Icon>,
        text: "Log out",
        onClick: onContextMenuClick
      }
    ]
  };
  const { license } = props;
  return (
    <Paper>
      <Card>
        <CardHeader title={license.number} subheader={license.type} action={
            <OfficeContextMenu menu={menu}/>
        }/>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: license.content }}/>
        </CardContent>
      </Card>
    </Paper>
  );
};

const ShopLicensesView = (props) => {
  const { licenses } = props;
  return (
    <Grid style={{padding:16}} container={true} spacing={2}>
      {licenses.map(item =>
        <Grid key={item.id} item={true} md={4} sm={12} xs={12}>
          <LicenseCard license={item}/>
        </Grid>
      )}
    </Grid>
  );
};

const HotelLicensesView = (props) => {

  const { licenses } = props;
  return (
    <Grid container={true} spacing={2}>
      {licenses.map(item =>
        <Grid key={item.id} item={true} md={3} sm={12} xs={12}>
          <LicenseCard license={item}/>
        </Grid>
      )}
    </Grid>
  );
};
const BannerLicensesView = (props) => {

  return (
    "card"
  );
};

class LicenseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopLicenses: [],
      hotelLicenses: [],
      bannerLicenses: [],

      tabValue: "shop"
    };
    this.licenseService = new LicenseService();
  }

  componentDidMount() {
    const { phone } = this.props;
    this.licenseService.getLicenses(phone,
      errorMsg => this.setGlobal({ errorMsg }),
      (shopLicenses, hotelLicenses, bannerLicenses) => this.setState({
        shopLicenses, hotelLicenses, bannerLicenses
      }))
      .finally(() => console.log("get licenses request complete"));
  }

  selectTab = (event, tabValue) => {
    this.setState({ tabValue });
  };

  render() {
    const { tabValue, shopLicenses, hotelLicenses, bannerLicenses } = this.state;
    return (
      <>
        <Card>
          <CardContent>
            <Paper>

              <Tabs
                component={"div"}
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.selectTab}
                aria-label="Disabled tabs example"
              >
                <Tab href={"#"} label="Shop" value={"shop"}/>
                <Tab href={"#"} label="Hotel" value={"hotel"}/>
                <Tab href={"#"} label="Banner" value={"banner"}/>
              </Tabs>

              {tabValue === "shop" && <ShopLicensesView licenses={shopLicenses}/>}
              {tabValue === "hotel" && <HotelLicensesView licenses={hotelLicenses}/>}
              {tabValue === "banner" && <BannerLicensesView licenses={bannerLicenses}/>}
            </Paper>
          </CardContent>
        </Card>
      </>
    );
  }
}

LicenseList.propTypes = {
  phone: PropTypes.string.isRequired
};

export default LicenseList;