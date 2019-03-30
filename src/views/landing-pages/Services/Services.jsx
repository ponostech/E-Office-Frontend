import React from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import {Airplay, HelpOutline, Person, StoreMallDirectory, Dock, Gradient} from "@material-ui/icons";
// core components
import GridItem from "../../../components/Grid/GridItem.jsx";
import NavPills from "../../../components/NavPills/NavPills.jsx";
import Card from "../../../components/Card/Card.jsx";

import ShopNavPillContent from "./Service/Shop";
import BannerNavPillContent from "./Service/Banner";
import KioskNavPillContent from "./Service/Kiosk";
import HoardingNavPillContent from "./Service/Hoarding";
import AdvertiserNavPillContent from "./Service/Advertiser";

import {
    cardTitle,
    defaultFont,
    grayColor,
    hexToRgb,
    whiteColor
} from "../../../assets/jss/material-dashboard-pro-react.jsx";
import LicenseValidity from "./Service/LicenseValidity";

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

const services = (props) => {
    const {classes} = props;
    return (
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
                                tabIcon:StoreMallDirectory,
                                tabContent: (
                                    <ShopNavPillContent classes={classes} click={props.click}/>
                                )
                            },
                            {
                                tabButton: "Banner/Poster",
                                tabIcon: Gradient,
                                tabContent: (
                                    <BannerNavPillContent classes={classes} click={props.click}/>
                                )
                            },
                            {
                                tabButton: "Kiosk",
                                tabIcon: Dock,
                                tabContent: (
                                    <KioskNavPillContent classes={classes} click={props.click}/>
                                )
                            }, {
                                tabButton: "Hoarding",
                                tabIcon: Airplay,
                                tabContent: (
                                    <HoardingNavPillContent classes={classes} click={props.click}/>
                                )
                            },
                            {
                                tabButton: "Advertiser",
                                tabIcon: Person,
                                tabContent: (
                                    <AdvertiserNavPillContent classes={classes} click={props.click}/>
                                )
                            },
                            {
                                tabButton: "Check License Validity",
                                tabIcon: HelpOutline,
                                tabContent: (
                                    <LicenseValidity classes={classes}/>
                                )
                            }
                        ]}
                    />
                </div>
            </Card>
        </GridItem>
    )
};

export default withStyles(styles)(services);