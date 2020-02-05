import React, { Component } from "reactn";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import {
  cardTitle,
  defaultFont,
  grayColor,
  hexToRgb,
  whiteColor
} from "../../assets/jss/material-dashboard-pro-react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Card from "../../components/Card/Card";
import GridItem from "../../components/Grid/GridItem";
import {
  ApplyBanner,
  ApplyHoarding,
  ApplyHotel,
  ApplyKiosk,
  BuildingPermission,
  CheckLicense,
  Grievance,
  ShopLicensing
} from "./Services/Services";
import Typography from "@material-ui/core/Typography";
import { authContext } from "../../context/AuthContext";

const styles = {
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  },
  noTopMargin: {
    margin: "0",
    zDepthShadows: "none"
  },
  card: {
    padding: "20px"
  },
  title: {
    ...defaultFont,
    color: whiteColor,
    marginTop: "5vh",
    marginBottom: "30px",
    textAlign: "center"
  },
  description: {
    fontSize: "14px",
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
    width: "110px",
    height: "110px",
    border: "1px solid " + grayColor[11],
    borderRadius: "50%",
    lineHeight: "164px",
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
    marginTop: "10px"
  }
  /*responsive: {
      breakpoint: 1024,
      settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true
      },
      breakpoint: 600,
      settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
      },
      breakpoint: 480,
      settings: {
          slidesToShow: 1,
          slidesToScroll: 1
      }
  }*/
};

class HomePage extends Component {
  componentDidMount() {
    this.setGlobal({ loading: false });
  }

  handleLink = link => event => {
    const { history } = this.props;
    history.push(link);
  };

  render() {
    const { classes } = this.props;
    return (
      <Card>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.pageSubcategoriesTitle}>
              Services Provided by Aizawl Municipal Corporation
            </h3>
            <br />
            <Typography variant="h6" align="center">
              Hoarding & Advertisement
            </Typography>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <ApplyHoarding classes={classes} click={this.handleLink} />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <ApplyKiosk classes={classes} click={this.handleLink} />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <ApplyBanner classes={classes} click={this.handleLink} />
          </GridItem>
          {/*<GridItem xs={12} sm={12} md={4}>
                  <ApplyAdvertiser classes={classes} click={this.handleLink}/>
                </GridItem>*/}
          <GridItem xs={12} sm={12} md={12}>
            <Typography variant="h6" align="center">
              Shop Licensing
            </Typography>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <ShopLicensing classes={classes} click={this.handleLink} />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <ApplyHotel classes={classes} click={this.handleLink} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Typography variant="h6" align="center">
              Others
            </Typography>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <BuildingPermission classes={classes} click={this.handleLink} />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Grievance classes={classes} click={this.handleLink} />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CheckLicense classes={classes} click={this.handleLink} />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            {/*<CheckExpiredShopLicense classes={classes} click={this.handleLink}/>*/}
          </GridItem>
        </GridContainer>
      </Card>
    );
  }
}

HomePage.contextType = authContext;

export default withStyles(styles)(HomePage);
