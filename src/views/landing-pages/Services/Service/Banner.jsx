import React from 'react';
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import Card from "../../../../components/Card/Card.jsx";
import CardHeader from "../../../../components/Card/CardHeader.jsx";
import CardBody from "../../../../components/Card/CardBody.jsx";
import Button from "../../../../components/CustomButtons/Button.jsx";
import {OfficeRoutes} from "../../../../config/routes-constant/OfficeRoutes";
import Typography from "@material-ui/core/Typography";
import {Gradient} from "@material-ui/icons";

const banner = (props) => (
    <Card>
        <CardHeader>
            <Typography variant='h5' align="center">
                Select your option below
            </Typography>
        </CardHeader>
        <CardBody>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4} lg={3}>
                    <Card pricing raised>
                        <CardBody pricing>
                            <h6 className={props.classes.cardCategory}>Apply for New Banner/Poster</h6>
                            <div className={props.classes.icon}>
                                <Gradient color="primary"/>
                            </div>
                            <h3 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                                Click button Below
                            </h3>
                            <p className={props.classes.cardDescription}>

                            </p>
                            <Button color="primary" round
                                    onClick={props.click(OfficeRoutes.APPLY_BANNER)}>
                                Apply for Banner
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </CardBody>
    </Card>
);

export default banner;