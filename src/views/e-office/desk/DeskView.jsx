import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Card, CardContent, CardHeader, IconButton, Tooltip } from "@material-ui/core";

import FilterIcon from "@material-ui/icons/FilterList";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import DeskFiles from "./DeskFiles";
import DeskReceipts from "./DeskReceipts";


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

class DeskView extends React.Component {
  state = {
    value: "file"
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
            <CardHeader
              title={"My Desk"}
              action={

                <Tooltip title={"Filter"}>
                  <IconButton>
                    <FilterIcon/>
                  </IconButton>
                </Tooltip>
              }
            >
            </CardHeader>
            <Tabs
              value={value}
              onChange={this.handleChange}
              classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            >
              <Tab disableRipple value={"file"}
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"List of Files"}/>
              <Tab disableRipple value={"receipt"}
                   classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                   label={"List of Receipts"}/>

            </Tabs>
            <CardContent>
              <div style={{ marginTop: 20 }}>
                {value === "file" && <DeskFiles/>}
                {value === "receipt" && <DeskReceipts/>}
              </div>
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

DeskView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeskView);
