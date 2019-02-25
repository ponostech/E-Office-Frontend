import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { Button, Card, CardActions, CardContent, CardHeader, Divider } from "@material-ui/core";
import TextField from "@material-ui/core/es/TextField/TextField";
import { CARD_DATA } from "../model/HomeModel";
import { OfficeRoutes } from "../../config/routes-constant/OfficeRoutes";

class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(CARD_DATA);
  }

  handleLink = (event) => {
    const { history } = this.props;
    switch (event.target.name) {
      case "shopping-license":
        history.push(OfficeRoutes.APPLY_SHOP_LICENSE);
        break;

      case "advertiser":
        history.push(OfficeRoutes.APPLY_ADVERTISER);
        break;
      case "propose-hoarding":
        history.push(OfficeRoutes.PROPOSED_HOARDING);
        break;
      case "new-hoarding":
        history.push(OfficeRoutes.APPLY_HOARDING);
        break;
      case "new-kiosk":
        history.push(OfficeRoutes.NEW_KIOSK);
        break;
      case "propose-kiosk":
        history.push(OfficeRoutes.PROPOSED_KIOSK);
        break;

      case "new-banner":
        history.push(OfficeRoutes.APPLY_BANNER);
        break;

      case "check-shopping":
        break;
      case "check-advertiser":
        break;
      default:
        history.push(OfficeRoutes.HOME);
        break;
    }
  };

  render() {
    const cardItems = CARD_DATA.map((item, index) =>
      (
        <GridItem key={index} xs={12} sm={12} md={4}>

          <Card key={index} style={{ marginBottom: 10 }}>
            <CardHeader color={"primary"} title={item.title}
                        subheader={item.subTitle}/>
            <CardActions>
              <Button name={item.id} onClick={this.handleLink.bind(this)} color={"primary"}
                      variant={"text"}> apply</Button>
            </CardActions>
          </Card>
        </GridItem>));

    return (

      <GridContainer spacing={8} justify={"center"}>
        {cardItems}

        <GridContainer justify={"space-around"}>
          <Divider color={"primary"} style={{ marginTop: 30 }} absolute={true}/>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader title={"Check your shopping license"}
                          placeholder={"It is mandaroty to Enter your shopping license no to check your License Status"}/>
              <CardContent>
                <TextField fullWidth={true} variant={"outlined"} placeholder={"Enter your license no"}
                           label={"License No"}/>
              </CardContent>
              <CardActions>
                <Button fullWidth={true} variant={"outlined"} color={"primary"}>Check </Button>
              </CardActions>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader title={"Check Advertiser License"}
                          placeholder={"It is Mandatory to enter your advertisement license no to check it's Status"}/>
              <CardContent>
                <TextField fullWidth={true} variant={"outlined"} placeholder={"Enter your license no"}
                           label={"License No"}/>
              </CardContent>
              <CardActions>
                <Button fullWidth={true} variant={"outlined"} color={"primary"}>Check </Button>
              </CardActions>
            </Card>
          </GridItem>
        </GridContainer>
      </GridContainer>
    );
  }
}

export default HomePage;