import React, { Component } from "react";
import { Card, CardContent, CardHeader, withStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AdvertiserRejectTemplate from "./reject/AdvertiserRejectTemplate";
import HotelRejectTemplate from "./reject/HotelRejectTemplate";
import ShopRejectTemplate from "./reject/ShopRejectTemplate";
import HoardingRejectTemplate from "./reject/HoardingRejectTemplate";
import KioskRejectTemplate from "./reject/KioskRejectTemplate";
import BannerRejectTemplate from "./reject/BannerRejectTemplate";
import TechnicalPersonRejectTemplate from "./reject/TechnicalPersonRejectTemplate";
import BuildingRejectTemplate from "./reject/BuildingRejectTemplate";


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

class RejectTemplate extends Component {
  state = {
    value: "advertiser"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Card>
        <CardHeader style={{padding:"5px 16px"}} title={"REJECTED TEMPLATE"}/>
        <CardContent style={{padding:"5px 16px"}}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          >

            <Tab value={"advertiser"}
                 disableRipple
                 classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label={"Advertising "}/>
            <Tab disableRipple value={"shop"}
                 classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label={"Shop"}/>
            <Tab disableRipple value={"hotel"}
                 classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label={"Hotel& Lodging"}/>

            <Tab disableRipple value={"hoarding"}
                 classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label={"Hoarding"}/>

            <Tab disableRipple value={"kiosk"}
                 classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label={"Kiosk"}/>

            <Tab disableRipple value={"banner"}
                 classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label={"Banner"}/>

            <Tab disableRipple value={"technical"}
                 classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label={"Techinical Person "}/>

            <Tab disableRipple value={"building"}
                 classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                 label={"Building"}/>

          </Tabs>
        </CardContent>
        <div>
          {value === "advertiser" && <AdvertiserRejectTemplate doLoad={this.props.doLoad}/>}
          {value === "hotel" && <HotelRejectTemplate doLoad={this.props.doLoad}/>}
          {value === "shop" && <ShopRejectTemplate doLoad={this.props.doLoad}/>}
          {value === "hoarding" && <HoardingRejectTemplate doLoad={this.props.doLoad}/>}
          {value === "kiosk" && <KioskRejectTemplate doLoad={this.props.doLoad}/>}
          {value === "banner" && <BannerRejectTemplate doLoad={this.props.doLoad}/>}
          {value === "technical" && <TechnicalPersonRejectTemplate doLoad={this.props.doLoad}/>}
          {value === "building" && <BuildingRejectTemplate doLoad={this.props.doLoad}/>}
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(RejectTemplate);
