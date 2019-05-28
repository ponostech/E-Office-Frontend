import React, { Component } from "react";
import GridContainer from "../../../../components/Grid/GridContainer";
import { Card, CardContent, CardHeader, withStyles } from "@material-ui/core";
import { SettingViewModel } from "../../../model/SettingViewModel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HotelLicenseTemplate from "./licenses/HotelLicenseTemplate";
import ShopLicenseTemplate from "./licenses/ShopLicenseTemplate";
import AdvertiserLicenseTemplate from "./licenses/AdvertiserLicenseTemplate";
import TechnicalPersonLicenseTemplate from "./licenses/TechnicalPersonLicenseTemplate";
import HoardingPermitTemplate from "./permits/HoardingPermitTemplate";
import KioskPermitTemplate from "./permits/KioskPermitTemplate";
import BannerPermitTemplate from "./permits/BannerPermitTemplate";



const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: "1px solid #black"
  },
  tabsIndicator: {
    backgroundColor: "#1890ff"
  },
  tabRoot: {
    padding:"3px",
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

class PermitTemplates extends Component {
  state = {
    value: "hoarding"
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const { classes } = this.props;
    const {value} = this.state;

    return (
      <Card style={{padding: 20}}>
        <CardHeader title={"PERMIT TEMPLATE"}/>
        <CardContent>
          <Tabs
            value={value}
            onChange={this.handleChange}
            classes={{root: classes.tabsRoot, indicator: classes.tabsIndicator}}
          >

            <Tab value={"hoarding"}
                 disableRipple
                 classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                 label={"Hoarding"}/>
            <Tab disableRipple value={"kiosk"}
                 classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                 label={"Kiosk"}/>
            <Tab disableRipple value={"banner"}
                 classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                 label={"Banner"}/>

          </Tabs>
        </CardContent>
        <div style={{marginTop: 20}}>
          {value === "hoarding" && <HoardingPermitTemplate doLoad={this.props.doLoad}/>}
          {value === "kiosk" && <KioskPermitTemplate doLoad={this.props.doLoad}/>}
          {value === "banner" && <BannerPermitTemplate doLoad={this.props.doLoad}/>}
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(PermitTemplates);
