import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import Icon from "@material-ui/core/Icon";
import Button from "../../../components/CustomButtons/Button";
import * as OfficeRoutes from "../../../config/routes-constant/OfficeRoutes";
import React from "react";
import StoreMallDirectory from "@material-ui/icons/StoreMallDirectory";
import {Airplay, Gradient} from "@material-ui/icons";

export const BuildingPermission = (props) => {
    let click = (url) => window.open(url).focus();

    return (
        <div className={props.classes.card}>
            <Card pricing raised>
                <CardBody pricing>
                    <h4 className={props.classes.cardCategory}>Building Permission</h4>
                    <div className={props.classes.icon}>
                        <Icon color="primary">person</Icon>
                    </div>
                    <h4 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                        Building Permission
                    </h4>
                    <Button color="primary" round onClick={() => click('https://obpas.amcmizoram.com')}>
                        Apply
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};

export const ApplyBanner = (props) => {
    return (
        <div className={props.classes.card}>
            <Card pricing raised>
                <CardBody pricing>
                    <h4 className={props.classes.cardCategory}>Banner/Poster</h4>
                    <div className={props.classes.icon}>
                        <Gradient color="primary"/>
                    </div>
                    <h4 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                        Click Button Below
                    </h4>
                    <p className={props.classes.cardDescription}>
                        To Apply for Banner/Poster
                    </p>
                    <Button color="primary" round onClick={props.click(OfficeRoutes.APPLY_BANNER)}>
                        Apply
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};

export const ShopLicensing = (props) => {
    return (
        <div className={props.classes.card}>

            <Card pricing raised>
                <CardBody pricing>
                    <h4 className={props.classes.cardCategory}> Shop Licensing</h4>
                    <div className={props.classes.icon}>
                        <StoreMallDirectory color="primary"/>
                    </div>
                    <h4 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                        Application for <br/>Shop Licensing
                    </h4>
                    <p className={props.classes.cardDescription}>
                    </p>
                    <Button color="primary"
                            round
                            onClick={props.click(OfficeRoutes.APPLY_SHOP_LICENSE)}>
                        Apply
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};

export const ApplyHotel = (props) => {
    return (
        <div className={props.classes.card}>
            <Card pricing raised>
                <CardBody pricing>
                    <h4 className={props.classes.cardCategory}>Hotel/Lodging</h4>
                    <div className={props.classes.icon}>
                        <StoreMallDirectory color="primary"/>
                    </div>
                    <h4 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                        Application for <br/>Hotel/Lodging Licensing
                    </h4>
                    <p className={props.classes.cardDescription}>

                    </p>
                    <Button color="primary"
                            round
                            onClick={props.click(OfficeRoutes.APPLY_HOTEL_LICENSE)}>
                        Apply
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};

export const ApplyHoarding = (props) => {
    return (
        <div className={props.classes.card}>
            <Card pricing raised>
                <CardBody pricing>
                    <h4 className={props.classes.cardCategory}>Hoarding</h4>
                    <div className={props.classes.icon}>
                        <Airplay color="primary"/>
                    </div>
                    <h4 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                        Click Button Below
                    </h4>
                    <p className={props.classes.cardDescription}>
                        To Apply for New Hoarding
                    </p>
                    <Button color="primary" round onClick={props.click(OfficeRoutes.ADVERTISER_LOGIN)}>
                        Apply
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};

export const ApplyKiosk = (props) => {
    return (
        <div className={props.classes.card}>
            <Card pricing raised>
                <CardBody pricing>
                    <h4 className={props.classes.cardCategory}> Kiosk</h4>
                    <div className={props.classes.icon}>
                        <Airplay color="primary"/>
                    </div>
                    <h4 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                        Click Button Below
                    </h4>
                    <p className={props.classes.cardDescription}>
                        To Apply for New Kiosk
                    </p>
                    <Button color="primary" round
                            onClick={props.click(OfficeRoutes.LOGIN)}>
                        Apply
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};

export const ApplyAdvertiser = (props) => {
    return (
        <div className={props.classes.card}>
            <Card pricing raised>
                <CardBody pricing>
                    <h4 className={props.classes.cardCategory}>Advertiser Registration</h4>
                    <div className={props.classes.icon}>
                        <Icon color="primary">person</Icon>
                    </div>
                    <h4 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                        Click Button Below
                    </h4>
                    <p className={props.classes.cardDescription}>
                        To Apply Advertiser License
                    </p>
                    <Button color="primary" round
                            onClick={props.click(OfficeRoutes.APPLY_ADVERTISER)}>
                        New Registration
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};
export const Grievance = (props) => {
    return (
        <div className={props.classes.card}>
            <Card pricing raised>
                <CardBody pricing>
                    <h4 className={props.classes.cardCategory}>Grievance</h4>
                    <div className={props.classes.icon}>
                        <Icon color="primary">person</Icon>
                    </div>
                    <h4 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                        Submit Your Grievance
                    </h4>
                    <p className={props.classes.cardDescription}>

                    </p>
                    <Button color="primary" round
                                onClick={props.click(OfficeRoutes.GRIEVANCE_CREATE)}>
                        Submit
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};
export const CheckLicense = (props) => {
    return (
        <div className={props.classes.card}>
            <Card pricing raised>
                <CardBody pricing>
                    <h4 className={props.classes.cardCategory}>Check License</h4>
                    <div className={props.classes.icon}>
                        <Icon color="primary">person</Icon>
                    </div>
                    <h4 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
                        Advertiser License
                    </h4>
                    <p className={props.classes.cardDescription}>
                    </p>
                    <Button color="primary" round
                            onClick={props.click(OfficeRoutes.CHECK_LICENSE)}>
                        Check
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};