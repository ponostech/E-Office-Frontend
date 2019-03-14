import React, {Component} from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import StoreMallDirectory from "@material-ui/icons/StoreMallDirectory";
import {Airplay, Dock} from "@material-ui/icons";
import HelpOutline from "@material-ui/icons/HelpOutline";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import NavPills from "../../components/NavPills/NavPills.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

import {OfficeRoutes} from "../../config/routes-constant/OfficeRoutes";

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
        margin: "0"
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
    iconRose: {
        color: roseColor[0]
    },
    marginTop30: {
        marginTop: "30px"
    }
};

class HomePage extends Component {
    handleLink = link => event => {
        const {history} = this.props;
        history.push(link);
    };

    render() {
        const {classes} = this.props;

        /*const cardItems = CARD_DATA.map((item, index) => (
            <GridItem key={index} xs={12} sm={12} md={4}>
                <Card key={index} style={{marginBottom: 10}}>
                    <CardHeader color={"primary"} title={item.title} subheader={item.subTitle}/>
                    <CardActions>
                        <Button name={item.id} onClick={this.handleLink.bind(this)} color={"primary"} variant={"text"}>Apply</Button>
                    </CardActions>
                </Card>
            </GridItem>
        ));*/

        return (
            <div>
                <GridContainer justify="center">
                    <GridItem xs={10} sm={10} md={10}>
                        <Card style={styles.noTopMargin}>
                            <h3 className={classes.pageSubcategoriesTitle}>
                                Service Provided by Aizawl Municipal Corporation
                            </h3>
                            <div className={classes.container}>
                                <NavPills
                                    xs={10} sm={6} md={6}
                                    color="success"
                                    alignCenter
                                    tabs={[
                                        {
                                            tabButton: "Shop License",
                                            tabIcon: StoreMallDirectory,
                                            tabContent: (
                                                <Card>
                                                    <CardHeader>
                                                        <Typography variant='headline' align="center">
                                                            Select your option below
                                                        </Typography>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <GridContainer justify="center">
                                                            <GridItem xs={12} sm={12} md={3}>
                                                                <Card pricing raised>
                                                                    <CardBody pricing>
                                                                        <h6 className={classes.cardCategory}>New Shop
                                                                            Licensing</h6>
                                                                        <div className={classes.icon}>
                                                                            <StoreMallDirectory
                                                                                className={classes.iconRose}/>
                                                                        </div>
                                                                        <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                                                            Title
                                                                        </h3>
                                                                        <p className={classes.cardDescription}>
                                                                            Write Description Here
                                                                        </p>
                                                                        <Button color="rose" round onClick={this.handleLink(OfficeRoutes.APPLY_SHOP_LICENSE)}>
                                                                            Apply for Shop Licensing
                                                                        </Button>
                                                                    </CardBody>
                                                                </Card>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={3}>
                                                                <Card pricing raised>
                                                                    <CardBody pricing>
                                                                        <h6 className={classes.cardCategory}>Renew Shop
                                                                            Licensing</h6>
                                                                        <div className={classes.icon}>
                                                                            <StoreMallDirectory className={classes.iconRose}/>
                                                                        </div>
                                                                        <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                                                            Title
                                                                        </h3>
                                                                        <p className={classes.cardDescription}>
                                                                            Write Description Here
                                                                        </p>
                                                                        <Button color="rose" onClick={this.handleLink(OfficeRoutes.RENEW_SHOP_LICENSE)} round>
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
                                                        <Typography variant='headline' align="center">
                                                            Select your option below
                                                        </Typography>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <GridContainer justify="center">
                                                            <GridItem xs={12} sm={12} md={3}>
                                                                <Card pricing raised>
                                                                    <CardBody pricing>
                                                                        <h6 className={classes.cardCategory}>Apply for New Banner/Poster</h6>
                                                                        <div className={classes.icon}>
                                                                            <StoreMallDirectory
                                                                                className={classes.iconRose}/>
                                                                        </div>
                                                                        <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                                                            Title
                                                                        </h3>
                                                                        <p className={classes.cardDescription}>
                                                                            Write Description Here
                                                                        </p>
                                                                        <Button color="rose" round
                                                                                onClick={this.handleLink(OfficeRoutes.APPLY_BANNER)}>
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
                                            tabIcon: Dock,
                                            tabContent: (
                                                <Card>
                                                    <CardHeader>
                                                        <Typography variant='headline' align="center">
                                                            Select your option below
                                                        </Typography>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <GridContainer justify="center">
                                                            <GridItem xs={12} sm={12} md={3}>
                                                                <Card pricing raised>
                                                                    <CardBody pricing>
                                                                        <h6 className={classes.cardCategory}>Apply for New Banner/Poster</h6>
                                                                        <div className={classes.icon}>
                                                                            <Dock
                                                                                className={classes.iconRose}/>
                                                                        </div>
                                                                        <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                                                            Title
                                                                        </h3>
                                                                        <p className={classes.cardDescription}>
                                                                            Write Description Here
                                                                        </p>
                                                                        <Button color="info" round
                                                                                onClick={this.handleLink(OfficeRoutes.APPLY_KIOSK)}>
                                                                            Apply for KIOSK
                                                                        </Button>
                                                                    </CardBody>
                                                                </Card>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={3}>
                                                                <Card pricing raised>
                                                                    <CardBody pricing>
                                                                        <h6 className={classes.cardCategory}>Apply for New Banner/Poster</h6>
                                                                        <div className={classes.icon}>
                                                                            <Dock
                                                                                className={classes.iconRose}/>
                                                                        </div>
                                                                        <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                                                            Title
                                                                        </h3>
                                                                        <p className={classes.cardDescription}>
                                                                            Write Description Here
                                                                        </p>
                                                                        <Button color="warning" round
                                                                                onClick={this.handleLink(OfficeRoutes.RENEW_KIOSK)}
                                                                        >
                                                                            Renew KIOSK
                                                                        </Button>
                                                                    </CardBody>
                                                                </Card>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={3}>
                                                                <Card pricing raised>
                                                                    <CardBody pricing>
                                                                        <h6 className={classes.cardCategory}>Apply for New Banner/Poster</h6>
                                                                        <div className={classes.icon}>
                                                                            <Dock
                                                                                className={classes.iconRose}/>
                                                                        </div>
                                                                        <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                                                            Title
                                                                        </h3>
                                                                        <p className={classes.cardDescription}>
                                                                            Write Description Here
                                                                        </p>
                                                                        <Button color="info" round
                                                                                onClick={this.handleLink(OfficeRoutes.PROPOSED_KIOSK)}>
                                                                            Propose new KIOSK
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
                                            tabButton: "Hoarding",
                                            tabIcon: Airplay,
                                            tabContent: (
                                                <Card>
                                                    <CardHeader>
                                                        <Typography variant='headline' align="center">
                                                            Select your option below
                                                        </Typography>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <GridContainer justify="center">
                                                            <GridItem xs={12} sm={12} md={3}>
                                                                <Card pricing raised>
                                                                    <CardBody pricing>
                                                                        <h6 className={classes.cardCategory}>Apply for New Banner/Poster</h6>
                                                                        <div className={classes.icon}>
                                                                            <Airplay
                                                                                className={classes.iconRose}/>
                                                                        </div>
                                                                        <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                                                            Title
                                                                        </h3>
                                                                        <p className={classes.cardDescription}>
                                                                            Write Description Here
                                                                        </p>
                                                                        <Button color="rose" round
                                                                                onClick={this.handleLink(OfficeRoutes.APPLY_HOARDING)}>
                                                                            Apply for Hoarding
                                                                        </Button>
                                                                    </CardBody>
                                                                </Card>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={3}>
                                                                <Card pricing raised>
                                                                    <CardBody pricing>
                                                                        <h6 className={classes.cardCategory}>Apply for New Banner/Poster</h6>
                                                                        <div className={classes.icon}>
                                                                            <Airplay
                                                                                className={classes.iconRose}/>
                                                                        </div>
                                                                        <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                                                            Title
                                                                        </h3>
                                                                        <p className={classes.cardDescription}>
                                                                            Write Description Here
                                                                        </p>
                                                                        <Button color="rose" round
                                                                                onClick={this.handleLink(OfficeRoutes.RENEW_HOARDING)}>
                                                                            Renew Hoarding
                                                                        </Button>
                                                                    </CardBody>
                                                                </Card>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={3}>
                                                                <Card pricing raised>
                                                                    <CardBody pricing>
                                                                        <h6 className={classes.cardCategory}>Apply for New Banner/Poster</h6>
                                                                        <div className={classes.icon}>
                                                                            <Airplay
                                                                                className={classes.iconRose}/>
                                                                        </div>
                                                                        <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                                                                            Title
                                                                        </h3>
                                                                        <p className={classes.cardDescription}>
                                                                            Write Description Here
                                                                        </p>
                                                                        <Button color="rose" round
                                                                                onClick={this.handleLink(OfficeRoutes.PROPOSED_HOARDING)}>
                                                                            Propose new Hoarding
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

                {/*<GridContainer spacing={8} justify={"center"}>
                    {cardItems}
                    <GridContainer justify={"space-around"}>
                        <Divider color={"primary"} style={{marginTop: 30}} absolute={true}/>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card>
                                <CardHeader title={"Check your shopping license"} placeholder={"It is mandaroty to Enter your shopping license no to check your License Status"}/>
                                <CardContent>
                                    <TextField fullWidth={true} variant={"outlined"} placeholder={"Enter your license no"} label={"License No"}/>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth={true} variant={"outlined"} color={"primary"}>Check </Button>
                                </CardActions>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card>
                                <CardHeader title={"Check Advertiser License"} placeholder={"It is Mandatory to enter your advertisement license no to check it's Status"}/>
                                <CardContent>
                                    <TextField fullWidth={true} variant={"outlined"} placeholder={"Enter your license no"} label={"License No"}/>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth={true} variant={"outlined"} color={"primary"}>Check </Button>
                                </CardActions>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </GridContainer>*/}
            </div>
        );
    }
}

export default withStyles(styles)(HomePage);