import React, { Component } from "react";
import { Card, CardContent, CardHeader, withStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HotelLicenseTemplate from "./licenses/HotelLicenseTemplate";
import ShopLicenseTemplate from "./licenses/ShopLicenseTemplate";
import AdvertiserLicenseTemplate from "./licenses/AdvertiserLicenseTemplate";
import TechnicalPersonLicenseTemplate from "./licenses/TechnicalPersonLicenseTemplate";
import BannerPermitTemplate from "./permits/BannerPermitTemplate";
import KioskPermitTemplate from "./permits/KioskPermitTemplate";
import HoardingPermitTemplate from "./permits/HoardingPermitTemplate";


const styles = theme => ({
  root: {
    flexGrow: 1,
    borderBottom: "1px solid #e8e8e8",
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: "1px solid #black"
  },
  tabsIndicator: {
    backgroundColor: "#1890ff"
  },
  tabRoot: {
    textTransform: "initial",
    minWidth: 60,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "\"Segoe UI\"",
      "Roboto",
      "\"Helvetica Neue\"",
      "Arial",
      "sans-serif",
      "\"Apple Color Emoji\"",
      "\"Segoe UI Emoji\"",
      "\"Segoe UI Symbol\""
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$tabSelected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3
  }
});

class LicenseTemplate extends Component {
  state = {
    value: "shop"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Card>
        <CardHeader style={{ padding: "5px 16px" }} title={"LICENSE/PERMIT TEMPLATE"}/>
        <CardContent style={{ padding: "5px 16px" }}>
          <div className={classes.root}>
            <Tabs
              value={value}
              onChange={this.handleChange}
              classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            >

              <Tab value={"shop"}
                   disableRipple
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"Shop License"}/>
              <Tab disableRipple value={"hotel"}
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"Hotel License"}/>
              <Tab disableRipple value={"advertiser"}
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"Advertiser License"}/>
              <Tab disableRipple value={"technical"}
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"Techinical Person License"}/>
              <Tab disableRipple value={"banner"}
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"Banner Permit"}/>
              <Tab disableRipple value={"kiosk"}
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"Kiosk Permit"}/>
              <Tab disableRipple value={"hoarding"}
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"Hoarding Permit"}/>
            </Tabs>
          </div>
        </CardContent>
        <div>
          {value === "hotel" && <HotelLicenseTemplate doLoad={this.props.doLoad}/>}
          {value === "shop" && <ShopLicenseTemplate doLoad={this.props.doLoad}/>}
          {value === "advertiser" && <AdvertiserLicenseTemplate doLoad={this.props.doLoad}/>}
          {value === "technical" && <TechnicalPersonLicenseTemplate doLoad={this.props.doLoad}/>}
          {value === "banner" && <BannerPermitTemplate doLoad={this.props.doLoad}/>}
          {value === "kiosk" && <KioskPermitTemplate doLoad={this.props.doLoad}/>}
          {value === "hoarding" && <HoardingPermitTemplate doLoad={this.props.doLoad}/>}
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(LicenseTemplate);
