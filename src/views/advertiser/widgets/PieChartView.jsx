import React from "react";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import { Icon } from "@material-ui/core";
import CardFooter from "../../../components/Card/CardFooter";
import PropTypes from "prop-types";

import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import withStyles from "@material-ui/core/es/styles/withStyles";
import CardBody from "../../../components/Card/CardBody";
import ChartistGraph from "react-chartist";

var options = {
  height:200,
  high: 100,
  low: -10,
  axisX: {
    labelInterpolationFnc: function(value, index) {
      return index % 2 === 0 ? value : null;
    }
  }
};

const PieChartView = (props) => {
  const { color,data, icon, head,title,caption, classes } = props;
  return (
    <Card raised={true}>
      <CardHeader color={color} stats icon>
        <CardIcon color={color}>
          <Icon>{icon}</Icon>
        </CardIcon>
        <h6 className={classes.cardCategory}>{head}</h6>
      </CardHeader>
      <CardBody>
        <ChartistGraph data={data} options={options} type={"Pie"}/>
      </CardBody>
      <CardFooter stats>

        <h3 className={classes.cardTitle}>
          {title}
        </h3>

        <h6 className={classes.cardCategory}>{caption}</h6>

      </CardFooter>
    </Card>
  );
};
PieChartView.defaultProps = {
  color: "primary",
  icon: "info",
  caption: "Welcome",
  head:"Head",
  title:"Title",
};
PieChartView.propTypes = {
  color: PropTypes.string,
  data: PropTypes.object.isRequired,
  icon: PropTypes.string,
  caption: PropTypes.string,
  head: PropTypes.string,
  title: PropTypes.string,
};
export default withStyles(dashboardStyle)(PieChartView);