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

import { OfficeRoutes } from "../../config/routes-constant/OfficeRoutes";
import {cardTitle} from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
    cardTitle,
    pageSubcategoriesTitle: {
        color: "#3C4858",
        textDecoration: "none",
        textAlign: "center"
    },
    cardCategory: {
        margin: "0",
        color: "#999999"
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
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={10} sm={10} md={10}>
                        <Card>
                            <h3 className={classes.pageSubcategoriesTitle}>
                                Aizawl Municipal Corporation
                            </h3>
                            <div className={classes.container}>
                                <NavPills
                                    xs={10} sm={6} md={6}
                                    color="success"
                                    alignCenter
                                    tabs={[
                                        {
                                            tabButton: "Apply Shop License",
                                            tabIcon: StoreMallDirectory,
                                            tabContent: (
                                                <Card>
                                                    <CardHeader>
                                                        <h4 className={classes.cardTitle}>
                                                            Description about product
                                                        </h4>
                                                        <p className={classes.cardCategory}>
                                                            <Button color="primary" round
                                                                    onClick={this.handleLink(OfficeRoutes.APPLY_ADVERTISER)}>Apply</Button>
                                                        </p>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <br/>
                                                        <br/>
                                                        Collaboratively administrate empowered markets via
                                                        plug-and-play networks. Dynamically procrastinate B2C
                                                        users after installed base benefits.
                                                        <br/>
                                                        <br/>
                                                    </CardBody>
                                                </Card>
                                            )
                                        },
                                        {
                                            tabButton: "Apply Banner/Poster",
                                            tabIcon: Airplay,
                                            tabContent: (
                                                <Card>
                                                    <CardHeader>
                                                        <h4 className={classes.cardTitle}>
                                                            Location of the product
                                                        </h4>
                                                        <p className={classes.cardCategory}>
                                                            <Button color="primary" round onClick={this.handleLink(OfficeRoutes.APPLY_BANNER)}>Apply</Button>
                                                        </p>
                                                    </CardHeader>
                                                    <CardBody>
                                                        Efficiently unleash cross-media information without
                                                        cross-media value. Quickly maximize timely deliverables
                                                        for real-time schemas.
                                                        <br/>
                                                        <br/>
                                                        Dramatically maintain clicks-and-mortar solutions
                                                        without functional solutions.
                                                    </CardBody>
                                                </Card>
                                            )
                                        },
                                        {
                                            tabButton: "Apply Kiosk",
                                            tabIcon: Dock,
                                            tabContent: (
                                                <Card>
                                                    <CardHeader>
                                                        <h4 className={classes.cardTitle}>
                                                            Apply for KIOSK
                                                        </h4>
                                                        <p className={classes.cardCategory}>
                                                            More information here
                                                        </p>
                                                    </CardHeader>
                                                    <CardBody>
                                                        Completely synergize resource taxing relationships via
                                                        premier niche markets. Professionally cultivate
                                                        one-to-one customer service with robust ideas.
                                                        <br/>
                                                        <br/>
                                                        Dynamically innovate resource-leveling customer service
                                                        for state of the art customer service.
                                                    </CardBody>
                                                </Card>
                                            )
                                        },
                                        {
                                            tabButton: "Help Center",
                                            tabIcon: HelpOutline,
                                            tabContent: (
                                                <Card>
                                                    <CardHeader>
                                                        <h4 className={classes.cardTitle}>Help center</h4>
                                                        <p className={classes.cardCategory}>
                                                            More information here
                                                        </p>
                                                    </CardHeader>
                                                    <CardBody>
                                                        From the seamless transition of glass and metal to the
                                                        streamlined profile, every detail was carefully
                                                        considered to enhance your experience. So while its
                                                        display is larger, the phone feels just right.
                                                        <br/>
                                                        <br/>
                                                        Another Text. The first thing you notice when you hold
                                                        the phone is how great it feels in your hand. The cover
                                                        glass curves down around the sides to meet the anodized
                                                        aluminum enclosure in a remarkable, simplified design.
                                                    </CardBody>
                                                </Card>
                                            )
                                        },
                                        {
                                            tabButton: "Help Center",
                                            tabIcon: HelpOutline,
                                            tabContent: (
                                                <Card>
                                                    <CardHeader>
                                                        <h4 className={classes.cardTitle}>Help center</h4>
                                                        <p className={classes.cardCategory}>
                                                            More information here
                                                        </p>
                                                    </CardHeader>
                                                    <CardBody>
                                                        From the seamless transition of glass and metal to the
                                                        streamlined profile, every detail was carefully
                                                        considered to enhance your experience. So while its
                                                        display is larger, the phone feels just right.
                                                        <br/>
                                                        <br/>
                                                        Another Text. The first thing you notice when you hold
                                                        the phone is how great it feels in your hand. The cover
                                                        glass curves down around the sides to meet the anodized
                                                        aluminum enclosure in a remarkable, simplified design.
                                                    </CardBody>
                                                </Card>
                                            )
                                        },
                                        {
                                            tabButton: "Help Center",
                                            tabIcon: HelpOutline,
                                            tabContent: (
                                                <Card>
                                                    <CardHeader>
                                                        <h4 className={classes.cardTitle}>Help center</h4>
                                                        <p className={classes.cardCategory}>
                                                            More information here
                                                        </p>
                                                    </CardHeader>
                                                    <CardBody>
                                                        From the seamless transition of glass and metal to the
                                                        streamlined profile, every detail was carefully
                                                        considered to enhance your experience. So while its
                                                        display is larger, the phone feels just right.
                                                        <br/>
                                                        <br/>
                                                        Another Text. The first thing you notice when you hold
                                                        the phone is how great it feels in your hand. The cover
                                                        glass curves down around the sides to meet the anodized
                                                        aluminum enclosure in a remarkable, simplified design.
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