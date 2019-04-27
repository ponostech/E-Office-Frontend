import React, {Component} from "react";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import {cardTitle, defaultFont, grayColor, hexToRgb, whiteColor} from "../../assets/jss/material-dashboard-pro-react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Card from "../../components/Card/Card";
import GridItem from "../../components/Grid/GridItem";
import {
    ApplyAdvertiser,
    ApplyBanner,
    ApplyHoarding,
    ApplyHotel,
    ApplyKiosk,
    BuildingPermission,
    CheckLicense,
    Grievance,
    ShopLicensing
} from "./Services/Services";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typography from "@material-ui/core/Typography";

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
    },
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

/*var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,

    prevArrow: <PrevIcon fontSize={"large"} color={"primary"}/>,
    nextArrow: <NextIcon fontSize={"large"} color={"primary"}/>,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
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
};*/

class HomePage extends Component {
    handleLink = link => event => {
        const {history} = this.props;
        history.push(link);
    };

    render() {
        const {classes} = this.props;
        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={10}>
                    <Card style={styles.noTopMargin}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={12}>
                                <h3 className={classes.pageSubcategoriesTitle}>
                                    Services Provided by Aizawl Municipal Corporation
                                </h3>
                                <br/>
                                <Typography variant="h6" align="center">Hoarding & Advertisement</Typography>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <ApplyHoarding classes={classes} click={this.handleLink}/>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <ApplyKiosk classes={classes} click={this.handleLink}/>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <ApplyBanner classes={classes} click={this.handleLink}/>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <ApplyAdvertiser classes={classes} click={this.handleLink}/>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <Typography variant="h6" align="center">Shop Licensing</Typography>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <ShopLicensing classes={classes} click={this.handleLink}/>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <ApplyHotel classes={classes} click={this.handleLink}/>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <Typography variant="h6" align="center">Others</Typography>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <BuildingPermission classes={classes} click={this.handleLink}/>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <Grievance classes={classes} click={this.handleLink}/>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CheckLicense classes={classes} click={this.handleLink}/>
                            </GridItem>
                        </GridContainer>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default withStyles(styles)(HomePage);