import React from "react";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/es/styles/withStyles";
import CardBody from "../../../components/Card/CardBody";
import { Line } from "react-chartjs-2";

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

const LineChartView = props => {
  const { color, data, head, title, caption, classes } = props;
  return (
    <Card raised={true}>
      <CardHeader color={color} stats icon>
        <h6 className={classes.head}>{head}</h6>
      </CardHeader>
      <CardBody>
        <Line data={data} height={100} />
      </CardBody>
      <h3 className={classes.title}>{title}</h3>
      <h6 className={classes.caption}>{caption}</h6>
    </Card>
  );
};
LineChartView.defaultProps = {
  color: "primary",
  icon: "info",
  caption: "",
  head: "Head",
  title: ""
};
LineChartView.propTypes = {
  color: PropTypes.string,
  data: PropTypes.object.isRequired,
  icon: PropTypes.string,
  caption: PropTypes.string,
  head: PropTypes.string,
  title: PropTypes.string
};
export default withStyles(style)(LineChartView);
