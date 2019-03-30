import React from "react";
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import Card from "../../../../components/Card/Card.jsx";
import CardHeader from "../../../../components/Card/CardHeader.jsx";
import CardBody from "../../../../components/Card/CardBody.jsx";
import Button from "../../../../components/CustomButtons/Button.jsx";
import {OfficeRoutes} from "../../../../config/routes-constant/OfficeRoutes";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import LockIcon from "@material-ui/icons/Lock";

const advertiser = (props) => (
    <Card>
        <CardHeader>
            <Typography variant='h5' align="center">
                Register as Advertiser?
            </Typography>
        </CardHeader>
        <CardBody>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4} lg={3}>
                    <Card pricing raised>
                        <CardBody pricing>
                            <h6 className={props.classes.cardCategory}>Advertiser Registration</h6>
                            <div className={props.classes.icon}>
                                <Icon color="primary">person</Icon>
                            </div>
                            <h3 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                                Advertiser License
                            </h3>
                            <p className={props.classes.cardDescription}>
                                Click the button below to get the license of advertiser
                            </p>
                            <Button color="primary" round
                                    onClick={props.click(OfficeRoutes.APPLY_ADVERTISER)}>
                                New Registration
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4} lg={3}>
                    <Card pricing raised>
                        <CardBody pricing>
                            <h6 className={props.classes.cardCategory}>Advertiser login
                                </h6>
                            <div className={props.classes.icon}>
                                <LockIcon color="primary"/>
                            </div>
                            <h3 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                                Login as advertiser
                            </h3>
                            <p className={props.classes.cardDescription}>
                               Click the button below
                            </p>
                            <Button color="primary"
                                    onClick={props.click(OfficeRoutes.ADVERTISER_LOGIN)}
                                    round>
                                Login
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </CardBody>
    </Card>
);

export default advertiser;