import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
// core components

import navPillsStyle from "assets/jss/material-dashboard-pro-react/components/navPillsStyle.jsx";
import { Grid, Hidden } from "@material-ui/core";

class NavPills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active
    };
  }

  handleChange = (event, active) => {
    // this.setState({ active });
    this.props.changeTabValue(active)
  };
  handleChangeIndex = index => {
    // this.setState({ active: index });
    // this.props.changeTabValue(index)
  };

  render() {
    const {
      classes,
      tabs,
      direction,
      color,
      horizontal,
      alignCenter,
      changeTabValue,
      active
    } = this.props;
    const flexContainerClasses = classNames({
      [classes.flexContainer]: true,
      [classes.horizontalDisplay]: horizontal !== undefined
    });
    const tabButtons = (
      <Tabs
        classes={{
          root: classes.root,
          fixed: classes.fixed,
          flexContainer: flexContainerClasses,
          indicator: classes.displayNone
        }}
        value={active}
        onChange={(event, value) => {
          console.log(value)
          changeTabValue(value)
        }}
        centered={alignCenter}
      >
        {tabs.map((prop, key) => {
          var icon = <prop.tabIcon style={{ width: 50, height: 50 }}/>;

          // let iconStyle = {}
          // if (typeof prop.iconColor !== 'undefined' && prop.iconColor === 'secondary') iconStyle = {color: '#b93e46'}
          // if (prop.tabIcon !== undefined) {
          //   icon["icon"] = <prop.tabIcon className={classes.tabIcon} style={iconStyle}/>;
          // }
          const pillsClasses = classNames({
            [classes.pills]: true,
            [classes.horizontalPills]: horizontal !== undefined,
            [classes.pillsWithIcons]: prop.tabIcon !== undefined
          });
          return (
            <Tab
              value={prop.value}
              onClick={(event) =>prop.onTabClick(prop.value)}
              label={prop.tabButton}
              key={key}
              icon={icon}
              classes={{
                root: pillsClasses,
                labelContainer: classes.labelContainer,
                label: classes.label,
                selected: classes[color]
              }}
            />
          );
        })}
      </Tabs>
    );
    const tabContent = (
      <div className={classes.contentWrapper}>
        <SwipeableViews
          axis={direction === "rtl" ? "x-reverse" : "x"}
          index={this.props.active}
          onChangeIndex={this.handleChangeIndex}
        >
          {tabs.map((prop, key) => {
            return (
              <div className={classes.tabContent} key={key}>
                {prop.tabContent}
              </div>
            );
          })}
        </SwipeableViews>
      </div>
    );

    return horizontal !== undefined ? (
      <>
        <Grid style={{padding:0}} container={true}>
          <Hidden only={["sm", "xs"]}>
            <Grid item={true} {...horizontal.tabsGrid}>
              {tabButtons}
            </Grid>
            <Grid item={true} {...horizontal.contentGrid}>
              {tabContent}
            </Grid>
          </Hidden>
        </Grid>

        <Grid style={{padding:0}} container={true} direction={"column"}>
          <Hidden only={["md", "lg", "xl"]}>
            <Grid zeroMinWidth={true} item={true} xs={12} sm={12}>
              {tabContent}
            </Grid>
          </Hidden>
        </Grid>
      </>
    ) : (
      <div>
        {tabButtons}
        {tabContent}
      </div>
    );
  }
}

NavPills.defaultProps = {
  active: 0,
  color: "primary"
};

NavPills.propTypes = {
  classes: PropTypes.object.isRequired,
  // index of the default active pill
  active: PropTypes.number,
  changeTabValue:PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      tabButton: PropTypes.string,
      onTabClick: PropTypes.func,
      tabIcon: PropTypes.func,
      tabContent: PropTypes.node
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object
  }),
  alignCenter: PropTypes.bool
};

export default withStyles(navPillsStyle)(NavPills);
