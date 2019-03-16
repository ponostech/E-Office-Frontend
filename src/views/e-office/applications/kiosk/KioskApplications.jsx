import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Card, CardHeader, IconButton } from "@material-ui/core";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import KioskViewModel from "../../../model/KioskViewModel";
import NewKioskApplications from "./NewKioskApplications";
import GrantedKioskApplications from "../hoarding/GrantedHoardingApplications";
import RejectedKioskApplications from "./RejectedKioskApplications";
import FilterIcon from "@material-ui/icons/FilterList";
import PendingKioskApplications from "./PendingKioskApplications";

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
    minWidth: 72,
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

class KioskApplications extends React.Component {
  state = {
    value: "new"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, history } = this.props;
    const { value } = this.state;

    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader title={KioskViewModel.TITLE} action={
              <IconButton>
                <FilterIcon/>
              </IconButton>
            }/>
            <Tabs
              value={value}
              onChange={this.handleChange}
              classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            >
              <Tab disableRipple value={"new"}
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"New Applications"}/>
              <Tab value={"granted"}
                   disableRipple
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"Granted Applications"}/>

              <Tab value={"pending"}
                   disableRipple
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"On Process"}/>

              <Tab value={"rejected"}
                   disableRipple
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"Rejected Applications"}/>

            </Tabs>
            <div style={{ marginTop: 20 }}>
              {value === "new" && <NewKioskApplications/>}
              {value === "granted" && <GrantedKioskApplications/>}
              {value === "pending" && <PendingKioskApplications/>}
              {value === "rejected" && <RejectedKioskApplications/>}
            </div>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

KioskApplications.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(KioskApplications);
