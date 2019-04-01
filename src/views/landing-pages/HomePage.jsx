import React, { Component } from "react";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import Slider from "react-slick";
import { cardTitle, defaultFont, grayColor, hexToRgb, whiteColor } from "../../assets/jss/material-dashboard-pro-react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Card from "../../components/Card/Card";
import GridItem from "../../components/Grid/GridItem";
import { AdvertiserRegistration, ApplyAdvertiser, ApplyBanner, ApplyHoarding, ApplyKiosk } from "./Services/Services";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrevIcon from "@material-ui/icons/ArrowLeft";
import NextIcon from "@material-ui/icons/ArrowRight";

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
    padding: 40
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

var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  prevArrow: <PrevIcon fontSize={"large"} color={"primary"}/>,
  nextArrow: <NextIcon fontSize={"large"} color={"primary"}/>,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

class HomePage extends Component {

  handleLink = link => event => {
    const { history } = this.props;
    history.push(link);
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={10} sm={10} md={12}>
          <Card style={styles.noTopMargin}>
            <h3 className={classes.pageSubcategoriesTitle}>
              Services Provided by Aizawl Municipal Corporation
            </h3>
            <Slider {...settings}>
              <AdvertiserRegistration classes={classes} click={this.handleLink}/>
              <ApplyBanner classes={classes} click={this.handleLink}/>
              <ApplyHoarding classes={classes} click={this.handleLink}/>
              <ApplyKiosk classes={classes} click={this.handleLink}/>
              <ApplyAdvertiser classes={classes} click={this.handleLink}/>

            </Slider>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <p>Another item</p>
          <p>Another item</p>
        </GridItem>

      </GridContainer>
    );
  }
}

export default withStyles(styles)(HomePage);