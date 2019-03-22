import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import { Airplay } from "@material-ui/icons";
import HelpOutline from "@material-ui/icons/HelpOutline";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import NavPills from "../../components/NavPills/NavPills.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

import StoreMallDirectory from "@material-ui/icons/StoreMallDirectory";
import { OfficeRoutes } from "../../config/routes-constant/OfficeRoutes";

import {
  cardTitle,
  defaultFont,
  grayColor,
  hexToRgb,
  roseColor,
  whiteColor
} from "../../assets/jss/material-dashboard-pro-react.jsx";

import Typography from "@material-ui/core/Typography";

const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  },
  noTopMargin: {
    margin: "0",
    zDepthShadows: "none"
  },
  title: {
    ...defaultFont,
    color: whiteColor,
    marginTop: "5vh",
    marginBottom: "30px",
    textAlign: "center"
  },
  description: {
    fontSize: "18px",
    color: whiteColor,
    textAlign: "center"
  },
  cardTitleWhite: {
    ...cardTitle,
    color: whiteColor + " !important"
  },
  cardCategory: {
    color: grayColor[0],
    marginTop: "10px"
  },
  cardCategoryWhite: {
    color: whiteColor,
    marginTop: "10px"
  },
  icon: {
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.76)",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid " + grayColor[11],
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px"
    }
  },
  iconWhite: {
    color: whiteColor
  },
  marginTop30: {
    marginTop: "30px"
  }
};

class HomePage extends Component {
  handleLink = link => event => {
    const { history } = this.props;
    history.push(link);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={10} sm={10} md={10}>
            <Card style={styles.noTopMargin}>
              <h3 className={classes.pageSubcategoriesTitle}>
                Services Provided by Aizawl Municipal Corporation
              </h3>
              <div className={classes.container}>
                <NavPills
                  xs={10} sm={6} md={6}
                  color="primary"
                  alignCenter
                  tabs={[
                    {
                      tabButton: "Shop License",
                      tabIcon: StoreMallDirectory,
                      tabContent: (
                        <Card>
                          <CardHeader>
                            <Typography variant='h5' align="center">
                              What are you planning to do?
                            </Typography>
                          </CardHeader>
                          <CardBody>
                            <GridContainer justify="center">
                              <GridItem xs={12} sm={12} md={4} lg={3}>
                                <Card pricing raised>
                                  <CardBody pricing>
                                    <h6 className={classes.cardCategory}>New Shop
                                      Licensing</h6>
                                    <div className={classes.icon}>
                                      <StoreMallDirectory color="primary"/>
                                    </div>
                                    <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                      Application for Shop Licensing
                                    </h3>
                                    <p className={classes.cardDescription}>
                                      Click the button below to get a shop License
                                    </p>
                                    <Button color="primary"
                                            round
                                            onClick={this.handleLink(OfficeRoutes.APPLY_SHOP_LICENSE)}>
                                      Apply for Shop Licensing
                                    </Button>
                                  </CardBody>
                                </Card>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={4} lg={3}>
                                <Card pricing raised>
                                  <CardBody pricing>
                                    <h6 className={classes.cardCategory}>Renew Shop
                                      Licensing</h6>
                                    <div className={classes.icon}>
                                      <StoreMallDirectory color="primary"/>
                                    </div>
                                    <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                      Renewal of Shop License
                                    </h3>
                                    <p className={classes.cardDescription}>
                                      Submit your renewal application by clicking on the button below
                                    </p>
                                    <Button color="primary" onClick={this.handleLink(OfficeRoutes.RENEW_SHOP_LICENSE)} round>
                                      Renew Shop Licensing
                                    </Button>
                                  </CardBody>
                                </Card>
                              </GridItem>
                            </GridContainer>
                          </CardBody>
                        </Card>
                      )
                    },
                    {
                      tabButton: "Banner/Poster",
                      tabIcon: Airplay,
                      tabContent: (
                        <Card>
                          <CardHeader>
                            <Typography variant='h5' align="center">
                              Select your option below
                            </Typography>
                          </CardHeader>
                          <CardBody>
                            <GridContainer justify="center">
                              <GridItem xs={12} sm={12} md={4} lg={3}>
                                <Card pricing raised>
                                  <CardBody pricing>
                                    <h6 className={classes.cardCategory}>Apply for
                                      New Banner/Poster</h6>
                                    <div className={classes.icon}>
                                      <StoreMallDirectory color="primary"/>
                                    </div>
                                    <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                      Click button Below
                                    </h3>
                                    <p className={classes.cardDescription}>

                                    </p>
                                    <Button color="primary" round  onClick={this.handleLink(OfficeRoutes.APPLY_BANNER)}>
                                      Apply for Banner
                                    </Button>
                                  </CardBody>
                                </Card>
                              </GridItem>
                            </GridContainer>
                          </CardBody>
                        </Card>
                      )
                    },
                    {
                      tabButton: "Kiosk",
                      tabIcon: Airplay,
                      tabContent: (
                        <Card>
                          <CardHeader>
                            <Typography variant='h5' align="center">

                            </Typography>
                          </CardHeader>
                          <CardBody>
                            <GridContainer justify="center">
                              <GridItem xs={12} sm={12} md={4} lg={3}>
                                <Card pricing raised>
                                  <CardBody pricing>
                                    <h6 className={classes.cardCategory}>Apply for
                                      New Hoarding</h6>
                                    <div className={classes.icon}>
                                      <StoreMallDirectory color="primary"/>
                                    </div>
                                    <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                      Click button Below
                                    </h3><p className={classes.cardDescription}>
                                    Click here to download
                                  </p>
                                    <Button color="primary" round
                                            onClick={this.handleLink(OfficeRoutes.ADVERTISER_LOGIN)}>
                                      Apply for New Kiosk
                                    </Button>
                                  </CardBody>
                                </Card>
                              </GridItem>
                            </GridContainer>
                          </CardBody>
                        </Card>
                      )
                    }, {
                      tabButton: "Hoarding",
                      tabIcon: Airplay,
                      tabContent: (
                        <Card>
                          <CardHeader>
                            <Typography variant='h5' align="center">

                            </Typography>
                          </CardHeader>
                          <CardBody>
                            <GridContainer justify="center">
                              <GridItem xs={12} sm={12} md={4} lg={3}>
                                <Card pricing raised>
                                  <CardBody pricing>
                                    <h6 className={classes.cardCategory}>Apply for
                                      New Hoarding</h6>
                                    <div className={classes.icon}>
                                      <StoreMallDirectory color="primary"/>
                                    </div>
                                    <h3
                                      className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                      Click button Below
                                    </h3><p className={classes.cardDescription}>
                                    Click here to download
                                  </p>
                                    <Button color="primary" round
                                            onClick={this.handleLink(OfficeRoutes.ADVERTISER_LOGIN)}>
                                      Apply for New Hoarding
                                    </Button>
                                  </CardBody>
                                </Card>
                              </GridItem>
                            </GridContainer>
                          </CardBody>
                        </Card>
                      )
                    },
                    {
                      tabButton: "Advertiser",
                      tabIcon: Airplay,
                      tabContent: (
                        <Card>
                          <CardHeader>
                            <Typography variant='h5' align="center">

                            </Typography>
                          </CardHeader>
                          <CardBody>
                            <GridContainer justify="center">
                              <GridItem xs={12} sm={12} md={4} lg={3} lg={3}>
                                <Card pricing raised>
                                  <CardBody pricing>
                                    <h6 className={classes.cardCategory}>Advertiser Registration</h6>
                                    <div className={classes.icon}>
                                      <StoreMallDirectory color="primary"/>
                                    </div>
                                    <h3
                                      className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                      Advertiser License
                                    </h3><p className={classes.cardDescription}>
                                    Click the button below to get the license of advertiser
                                  </p>
                                    <Button color="primary" round
                                            onClick={this.handleLink(OfficeRoutes.APPLY_ADVERTISER)}>
                                      New Registration
                                    </Button>
                                  </CardBody>
                                </Card>
                              </GridItem>
                            </GridContainer>
                          </CardBody>
                        </Card>
                      )
                    },
                    {
                      tabButton: "Check License Validity",
                      tabIcon: HelpOutline,
                      tabContent: (
                        <Card>
                          <CardHeader>
                            <h4 className={classes.cardTitle}>

                            </h4>
                            <p className={classes.cardCategory}>

                            </p>
                          </CardHeader>
                          <CardBody>
                            Description
                          </CardBody>
                        </Card>
                      )
                    }
                  ]}
                />
              </div>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);