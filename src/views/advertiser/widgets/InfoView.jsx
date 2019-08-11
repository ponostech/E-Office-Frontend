import React, { Component } from "react";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import { Grid, Icon } from "@material-ui/core";
import CardFooter from "../../../components/Card/CardFooter";
import PropTypes from "prop-types";

import dashboardStyle from '../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle'
import withStyles from "@material-ui/core/es/styles/withStyles";

const InfoView=(props)=> {
  const { color, icon, message, link, onLickClick ,classes} = props;
    return (
      <Card raised={true}>
        <CardHeader color={color} stats icon>
          <CardIcon color={color}>
            <Icon>{icon}</Icon>
          </CardIcon>
          <p className={classes.cardCategory}>{message}</p>
          <h3 className={classes.cardTitle}>
            49/50 <small>GB</small>
          </h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <a href="#pablo" onClick={e => onLickClick()}>
              {link}
            </a>
          </div>
        </CardFooter>
      </Card>
    );
}
InfoView.defaultProps={
  color: "primary",
  icon: "info",
  message: "Welcome",
  link:"Click here",
}
InfoView.propTypes={
  color:PropTypes.string,
  icon:PropTypes.string,
  message:PropTypes.string,
  link:PropTypes.string,
  onLinkClick:PropTypes.string.isRequired
}
export default withStyles(dashboardStyle)(InfoView);