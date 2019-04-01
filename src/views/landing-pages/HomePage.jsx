import React, { Component } from "react";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import Slider from "react-slick";
import { cardTitle, defaultFont, grayColor, hexToRgb, whiteColor } from "../../assets/jss/material-dashboard-pro-react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import ShopNavPillContent from './Services/Service/Shop';
import Card from "../../components/Card/Card";
import GridItem from "../../components/Grid/GridItem";

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
        <GridItem xs={10} sm={10} md={10}>
          <Card style={styles.noTopMargin}>
            <h3 className={classes.pageSubcategoriesTitle}>
              Services Provided by Aizawl Municipal Corporation
            </h3>
            <div className={classes.container}>
              <Slider {...settings}>
                <div>
                  <ShopNavPillContent classes={classes} click={this.handleLink.bind(this)}/>
                </div>
                <div>
                  <ShopNavPillContent classes={classes} click={this.handleLink.bind(this)}/>
                </div>
                <div>
                  <ShopNavPillContent classes={classes} click={this.handleLink.bind(this)}/>
                </div>
              </Slider>
            </div>
          </Card>
        </GridItem>

      </GridContainer>
    );
  }
}

export default withStyles(styles)(HomePage);