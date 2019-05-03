import React, { Component } from "react";
import { CardContent, Grid, Icon } from "@material-ui/core";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardFooter from "../../components/Card/CardFooter";

import {
  drawerWidth,
  drawerMiniWidth,
  transition,
  containerFluid
} from "assets/jss/material-dashboard-pro-react.jsx";
import withStyles from "@material-ui/core/es/styles/withStyles";
import ChartistGraph from "react-chartist";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
    "&:after": {
      display: "table",
      clear: "both",
      content: '" "'
    }
  },
  mainPanel: {
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },
  container: {
    ...containerFluid,
    position:"relative"
  },
  map: {
    marginTop: "70px"
  },
  mainPanelSidebarMini: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerMiniWidth}px)`
    }
  },
  mainPanelWithPerfectScrollbar: {
    overflow: "hidden !important"
  }
});
var simpleLineChartData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  series: [
    [12, 9, 7, 8, -10],
    [2, 1, 3.5, 7, 3],
    [134, 37, 87, 5, 6],
    [14, 37, 4, 77, 6],
    [15, 37, 9, 5, 78],
    [14, 3, 67, 5, 6],
    [17, 3, 4, 56, 89],
  ]
};
var options = {
  height:"400px",
  high: 100,
  low: -10,
  axisX: {
    labelInterpolationFnc: function(value, index) {
      return index % 2 === 0 ? value : null;
    }
  }
};

class AdvertiserDashboard extends Component {
  render() {
    const{classes}=this.props
    return (
      <Grid spacing={16} container={true}>
        <Grid item={true} xs={12} sm={12} md={3}>
          <Card raised={true}>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                Under Process Applications
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  view detail
                </a>
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={3}>
          <Card raised={true}>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={3}>
          <Card raised={true}>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={3}>
          <Card raised={true}>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid xs={12} sm={12} md={12}>
          <Card raised={true}>
            <CardHeader stats icon>
              <CardIcon color="success">
                <Icon>table_chart</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Chart of something</p>

            </CardHeader>
              <CardContent>
                <ChartistGraph data={simpleLineChartData} options={options} type={'Line'} />
              </CardContent>
          </Card>

        </Grid>

      </Grid>
    );
  }
}

export default withStyles(appStyle)(AdvertiserDashboard);