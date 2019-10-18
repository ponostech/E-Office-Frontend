import React from "react";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/es/styles/withStyles";
import CardBody from "../../../components/Card/CardBody";
import { Doughnut } from "react-chartjs-2";

const style = {
  title: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "400"
  },
  head: {
    margin: 16,
    padding: 16,
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
    color: "#727272"
  },
  caption: {
    textAlign: "center",
    marginBottom: "14px",
    fontSize: "14px",
    fontWeight: "300",
    color: "#727272"
  }
};

var options = {
  height: 200,
  high: 100,
  low: -10,
  axisX: {
    labelInterpolationFnc: function(value, index) {
      return index % 2 === 0 ? value : null;
    }
  }
};

const DonutChartView = (props) => {
  const { color, data, icon, head, title, caption, classes } = props;
  return (
    <Card raised={true}>
      <CardHeader color={color} stats icon>
        {/*<CardIcon color={color}>*/}
        {/*  <Icon>{icon}</Icon>*/}
        {/*</CardIcon>*/}
        <h6 className={classes.head}>{head}</h6>
      </CardHeader>
      <CardBody>
        <Doughnut data={data}/>
      </CardBody>
      {/*<CardFooter stats>*/}

      <h3 className={classes.title}>
        {title}
      </h3>

      <h6 className={classes.caption}>{caption}</h6>

      {/*</CardFooter>*/}
    </Card>
  );
};
DonutChartView.defaultProps = {
  color: "primary",
  icon: "info",
  caption: "Welcome",
  head: "Head",
  title: "Title"
};
DonutChartView.propTypes = {
  color: PropTypes.string,
  data: PropTypes.object.isRequired,
  icon: PropTypes.string,
  caption: PropTypes.string,
  head: PropTypes.string,
  title: PropTypes.string
};
export default withStyles(style)(DonutChartView);