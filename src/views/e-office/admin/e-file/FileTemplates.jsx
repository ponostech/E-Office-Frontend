import React, { Component } from "react";
import { Card, CardContent, CardHeader, withStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HoardingPermitTemplate from "./permits/HoardingPermitTemplate";
import KioskPermitTemplate from "./permits/KioskPermitTemplate";
import BannerPermitTemplate from "./permits/BannerPermitTemplate";


const styles = theme => ({
  root: {
    flexGrow: 1,
    borderBottom: '1px solid #e8e8e8',
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: "1px solid #black"
  },
  tabsIndicator: {
    backgroundColor: "#1890ff"
  },
  tabRoot: {
    padding: "3px",
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

class FileTemplates extends Component {
  state = {
    value: "group-head"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Card>
        <CardHeader style={{ padding: "5px 16px" }} title={"FILE INDEX"}/>
        <CardContent style={{ padding: "5px 16px" }}>
         <div className={classes.root}>
           <Tabs component={"div"}
                 value={value}
                 onChange={this.handleChange}
                 classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
           >

             <Tab href={"#"} value={"group-head"}
                  disableRipple
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  label={"Group Head"}/>
             <Tab href={"#"} disableRipple value={"main-head"}
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  label={"Main Head"}/>
             <Tab href={"#"} disableRipple value={"sub-head"}
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  label={"Sub Head"}/>

           </Tabs>
         </div>
        </CardContent>
        <div>
          {value === "group-head" && <HoardingPermitTemplate doLoad={this.props.doLoad}/>}
          {value === "main-head" && <KioskPermitTemplate doLoad={this.props.doLoad}/>}
          {value === "sub-head" && <BannerPermitTemplate doLoad={this.props.doLoad}/>}
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(FileTemplates);
