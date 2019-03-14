import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Card, CardHeader, IconButton, Tooltip } from "@material-ui/core";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import AvailableKiosks from "./AvailableKiosks";
import PendingKiosks from "./PendingKiosks";
import KioskViewModel from "../../../model/KioskViewModel";
import FilterIcon from "@material-ui/icons/FilterList";

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

class KioskLists extends React.Component {
  state = {
    value: "available"
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
              <Tooltip title={"Filter"}>
                <IconButton>
                  <FilterIcon/>
                </IconButton>
              </Tooltip>
            }/>
            <Tabs
              value={value}
              onChange={this.handleChange}
              classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            >
              <Tab disableRipple value={"available"}
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={KioskViewModel.AVAILABLE}/>
              <Tab value={"pending"}
                   disableRipple
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={KioskViewModel.PENDING}/>

            </Tabs>
            <div style={{ marginTop: 20, padding: 10 }}>
              {value === "available" && <AvailableKiosks/>}
              {value === "pending" && <PendingKiosks/>}
            </div>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

KioskLists.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(KioskLists);
