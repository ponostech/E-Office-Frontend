import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle";
import { AppBar, Toolbar } from "@material-ui/core";

function Footer({classes}) {

    return (
      <AppBar elevation={5} position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
              <div className={classes.left}>
                  <List className={classes.list}>
                      <ListItem className={classes.inlineBlock}>
                          <a href="https://amcmizoram.com" target="_blank" className={classes.block}>
                              AMC Website
                          </a>
                      </ListItem>
                      <ListItem className={classes.inlineBlock}>
                          <a href="https://obpas.amcmizoram.com" className={classes.block}>
                              OBPAS
                          </a>
                      </ListItem>
                      <ListItem className={classes.inlineBlock}>
                          <a href="https://amcmizoram.com/page/about-us" className={classes.block}>
                              About Us
                          </a>
                      </ListItem>
                  </List>
              </div>
              <div style={{flexGrow:1}}/>
              <p className={classes.right}>
                  &copy; {1900 + new Date().getYear()}{" "}
                  <a href="https://www.amcmizoram.com" className={classes.anchor}>
                      Aizawl Municipal Corporation (AMC)
                  </a>
              </p>
          </Toolbar>
      </AppBar>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    fluid: PropTypes.bool,
    white: PropTypes.bool,
    rtlActive: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
