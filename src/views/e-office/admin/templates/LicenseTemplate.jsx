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
    this.setState({value});
  };

  render() {
    const { classes } = this.props;
    const {value} = this.state;

    return (
      <Card >
        <CardHeader style={{padding:"5px 16px"}} title={"LICENSE TEMPLATE"}/>
        <CardContent style={{padding:"5px 16px"}}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            classes={{root: classes.tabsRoot, indicator: classes.tabsIndicator}}
          >

            <Tab value={"shop"}
                 disableRipple
                 classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                 label={"Shop License"}/>
            <Tab disableRipple value={"hotel"}
                 classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                 label={"Hotel License"}/>
            <Tab disableRipple value={"advertiser"}
                 classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                 label={"Advertiser License"}/>
            <Tab disableRipple value={"technical"}
                 classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                 label={"Techinical Person License"}/>

          </Tabs>
        </CardContent>
        <div>
          {value === "hotel" && <HotelLicenseTemplate doLoad={this.props.doLoad}/>}
          {value === "shop" && <ShopLicenseTemplate doLoad={this.props.doLoad}/>}
          {value === "advertiser" && <AdvertiserLicenseTemplate doLoad={this.props.doLoad}/>}
          {value === "technical" && <TechnicalPersonLicenseTemplate doLoad={this.props.doLoad}/>}
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(LicenseTemplate);
