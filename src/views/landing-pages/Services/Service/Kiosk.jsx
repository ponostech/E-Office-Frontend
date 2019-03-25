import React from 'react';
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import Card from "../../../../components/Card/Card.jsx";
import CardHeader from "../../../../components/Card/CardHeader.jsx";
import CardBody from "../../../../components/Card/CardBody.jsx";
import Button from "../../../../components/CustomButtons/Button.jsx";
import {OfficeRoutes} from "../../../../config/routes-constant/OfficeRoutes";
import Typography from "@material-ui/core/Typography";
import {Airplay} from "@material-ui/icons";

const kiosk = (props) => (
    <Card>
        <CardHeader>
            <Typography variant='h5' align="center">
                Applying for Kiosk?
            </Typography>
        </CardHeader>
        <CardBody>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4} lg={3}>
                    <Card pricing raised>
                        <CardBody pricing>
                            <h6 className={props.classes.cardCategory}>Apply for New Hoarding</h6>
                            <div className={props.classes.icon}>
                                <Airplay color="primary"/>
                            </div>
                            <h3 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                                Click button Below
                            </h3>
                            <p className={props.classes.cardDescription}>
                                Click here to download
                            </p>
                            <Button color="primary" round
                                    onClick={props.click(OfficeRoutes.ADVERTISER_LOGIN)}>
                                Apply for New Kiosk
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </CardBody>
    </Card>
);

export default kiosk;