import React from 'react';

import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import Card from "../../../../components/Card/Card.jsx";
import CardHeader from "../../../../components/Card/CardHeader.jsx";
import CardBody from "../../../../components/Card/CardBody.jsx";
import Button from "../../../../components/CustomButtons/Button.jsx";

import StoreMallDirectory from "@material-ui/icons/StoreMallDirectory";
import {OfficeRoutes} from "../../../../config/routes-constant/OfficeRoutes";
import Typography from "@material-ui/core/Typography";

const shop = (props) => (
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
                            <h6 className={props.classes.cardCategory}>New Shop
                                Licensing</h6>
                            <div className={props.classes.icon}>
                                <StoreMallDirectory color="primary"/>
                            </div>
                            <h3 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                                Application for Shop Licensing
                            </h3>
                            <p className={props.classes.cardDescription}>
                                Click the button below to get a shop License
                            </p>
                            <Button color="primary"
                                    round
                                    onClick={props.click(OfficeRoutes.APPLY_SHOP_LICENSE)}>
                                Apply for Shop Licensing
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4} lg={3}>
                    <Card pricing raised>
                        <CardBody pricing>
                            <h6 className={props.classes.cardCategory}>Renew Shop
                                Licensing</h6>
                            <div className={props.classes.icon}>
                                <StoreMallDirectory color="primary"/>
                            </div>
                            <h3 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                                Renewal of Shop License
                            </h3>
                            <p className={props.classes.cardDescription}>
                                Submit your renewal application by clicking on the
                                button below
                            </p>
                            <Button color="primary"
                                    onClick={props.click(OfficeRoutes.RENEW_SHOP_LICENSE)}
                                    round>
                                Renew Shop Licensing
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </CardBody>
    </Card>
);

export default shop;