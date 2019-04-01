import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import Icon from "@material-ui/core/Icon";
import Button from "../../../components/CustomButtons/Button";
import { OfficeRoutes } from "../../../config/routes-constant/OfficeRoutes";
import React from "react";
import StoreMallDirectory from "@material-ui/icons/StoreMallDirectory";

import { Airplay, Gradient } from "@material-ui/icons";


const handleCheck = (e) => {

};

export const BuildingPermission = (props) => {

  return (
    <div className={props.classes.card}>

      <Card pricing raised>
        <CardBody pricing>
          <h3 className={props.classes.cardCategory}>Building Permission</h3>
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
    </div>
  );
};

export const ApplyBanner = (props) => {
  return (
    <div className={props.classes.card}>

      <Card pricing raised>
        <CardBody pricing>
          <h3 className={props.classes.cardCategory}>Banner/Poster</h3>
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
    </div>
  );
};
export const ShopLicensing = (props) => {
  return (
    <div className={props.classes.card}>

      <Card pricing raised>
        <CardBody pricing>
          <h3 className={props.classes.cardCategory}> Shop Licensing</h3>
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
    </div>
  );
};

export const ApplyHoarding = (props) => {
  return (
    <div className={props.classes.card}>

      <Card pricing raised>

        <CardBody pricing>
          <h3 className={props.classes.cardCategory}>Hoarding</h3>
          <div className={props.classes.icon}>
            <Airplay color="primary"/>
          </div>
          <h3 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
            Click button Below
          </h3>
          <p className={props.classes.cardDescription}>
          </p>
          <Button color="primary" round
                  onClick={props.click(OfficeRoutes.ADVERTISER_LOGIN)}>
            Apply for New Hoarding
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
          <h3 className={props.classes.cardCategory}> Kiosk</h3>
          <div className={props.classes.icon}>
            <Airplay color="primary"/>
          </div>
          <h3 className={`${props.classes.cardTitle} ${props.classes.marginTop30}`}>
            Click button Below
          </h3>
          <p className={props.classes.cardDescription}>
          </p>
          <Button color="primary" round
                  onClick={props.click(OfficeRoutes.ADVERTISER_LOGIN)}>
            Apply for New Hoarding
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
          <h3 className={props.classes.cardCategory}>Advertiser Registration</h3>
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
    </div>
  );
};
export const Grievance = (props) => {
  return (
    <div className={props.classes.card}>

      <Card pricing raised>

        <CardBody pricing>
          <h3 className={props.classes.cardCategory}>Grievance</h3>
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
    </div>
  );
};
export const CheckLicense = (props) => {
  return (
    <div className={props.classes.card}>

      <Card pricing raised>

        <CardBody pricing>
          <h3 className={props.classes.cardCategory}>Check License</h3>
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
    </div>
  );
};