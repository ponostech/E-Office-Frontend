import React, { Component } from "react";
import { Card, CardContent, CardHeader, withStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AdvertiserCancelTemplate from "./cancel/AdvertiserCancelTemplate";
import HotelCancelTemplate from "./cancel/HotelCancelTemplate";
import ShopCancelTemplate from "./cancel/ShopCancelTemplate";
import HoardingCancelTemplate from "./cancel/HoardingCancelTemplate";
import KioskCancelTemplate from "./cancel/KioskCancelTemplate";
import BannerCancelTemplate from "./cancel/BannerCancelTemplate";
import BuildingCancelTemplate from "./cancel/BuildingCancelTemplate";
import TechnicalPersonCancelTemplate from "./cancel/TechnicalPersonCancelTemplate";


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

class CancelTemplate extends Component {
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
      <Card style={{ padding: 20 }}>
        <CardHeader title={"CANCELLED TEMPLATE"}/>
        <CardContent>
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
                 label={"Shop "}/>
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
                 label={"Building "}/>

          </Tabs>
        </CardContent>
        <div style={{ marginTop: 20 }}>
          {value === "advertiser" && <AdvertiserCancelTemplate doLoad={this.props.doLoad}/>}
          {value === "hotel" && <HotelCancelTemplate doLoad={this.props.doLoad}/>}
          {value === "shop" && <ShopCancelTemplate doLoad={this.props.doLoad}/>}
          {value === "hoarding" && <HoardingCancelTemplate doLoad={this.props.doLoad}/>}
          {value === "kiosk" && <KioskCancelTemplate doLoad={this.props.doLoad}/>}
          {value === "banner" && <BannerCancelTemplate doLoad={this.props.doLoad}/>}
          {value === "technical" && <TechnicalPersonCancelTemplate doLoad={this.props.doLoad}/>}
          {value === "building" && <BuildingCancelTemplate doLoad={this.props.doLoad}/>}
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(CancelTemplate);
