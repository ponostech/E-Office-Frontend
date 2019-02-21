import React, { Component } from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { Button, Card, CardActions, CardContent, CardHeader, Divider } from "@material-ui/core";
import TextField from "@material-ui/core/es/TextField/TextField";

class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  handleLink = (event) => {
    console.log(event.target.name);
    const { history } = this.props;
    switch (event.target.name) {
      case "shopping-license":
        break;

      case "hoarding-purposal":
        break;
      case "hoarding-purposal":
        break;
      case "hoarding-purposal":
        break;
      case "hoarding-purposal":
        break;
      case "hoarding-purposal":
        break;
      case "hoarding-purposal":
        break;
    }
  };

  render() {
    return (
      <GridContainer spacing={8} justify={"center"}>
        <GridItem xs={12} sm={12} md={4}>
          <Card style={{marginBottom:10}}>
            <CardHeader color={"primary"} title={"Banner Advertisement"}
                        subheader={"Apply your advertisement in a breeze"}/>
            <CardActions>
              <Button name={"banner"} onClick={this.handleLink.bind(this)} color={"primary"}
                      variant={"text"}> Click here to apply</Button>
            </CardActions>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>

          <Card style={{marginBottom:10}}>
            <CardHeader color={"primary"} title={"Hoarding Advertisement"}
                        subheader={"Apply your hoarding advertisement"}/>
            <CardActions>
              <Button name={"hoarding"} onClick={this.handleLink.bind(this)} color={"primary"}
                      variant={"text"}> Click here to apply</Button>
            </CardActions>
          </Card>

        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card style={{marginBottom:10}}>
            <CardHeader color={"primary"} title={"New Hoarding Proposal"}
                        subheader={"Propose a new hoarding"}/>

            <CardActions>
              <Button name={"new-hoarding"} onClick={this.handleLink.bind(this)} color={"primary"}
                      variant={"text"}> Click here to apply</Button>
            </CardActions>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card style={{marginBottom:10}}>
            <CardHeader color={"primary"} title={"Advertiser Registration"}
                        subheader={"Apply your shopping license in a breeze"}/>
            <CardActions>
              <Button name={"advertiser"} onClick={this.handleLink.bind(this)} color={"primary"}
                      variant={"text"}> Click here to apply</Button>
            </CardActions>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card style={{marginBottom:10}}>
            <CardHeader color={"primary"} title={"Shopping License"}
                        subheader={"Apply your shopping license in a breeze"}/>
            <CardActions>
              <Button name={"shopping-license"} onClick={this.handleLink.bind(this)} color={"primary"}
                      variant={"text"}> Click here to apply</Button>
            </CardActions>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card style={{marginBottom:10}}>
            <CardHeader color={"primary"} title={"Kiosk Advertisement"}
                        subheader={"Apply your kiosk advertisement"}/>
            <CardActions>
              <Button name={"kiosk"} onClick={this.handleLink.bind(this)} color={"primary"}
                      variant={"text"}> Click here to apply</Button>
            </CardActions>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card style={{marginBottom:10}}>
            <CardHeader color={"primary"} title={"New Kiosk Proposal"}
                        subheader={"Submit your new kiosk advertisement proposal"}/>
            <CardActions>
              <Button name={"new-kiosk"} onClick={this.handleLink.bind(this)} color={"primary"}
                      variant={"text"}> Click here to apply</Button>
            </CardActions>
          </Card>
        </GridItem>

        <Divider color={"primary"} style={{ marginTop: 30 }} />

        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader title={"Check License status"} placeholder={"Enter your shopping license no to check the License Status"}/>
              <CardContent>
                <TextField fullWidth={true} variant={"outlined"} placeholder={"Enter your license no"} label={"License id"}/>
              </CardContent>
              <CardActions>
                <Button fullWidth={true} variant={"outlined"} color={"primary"}>Check Status</Button>
              </CardActions>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader title={"Check License status"} placeholder={"Enter your shopping license no to check the License Status"}/>
              <CardContent>
                <TextField fullWidth={true} variant={"outlined"} placeholder={"Enter your license no"} label={"License id"}/>
              </CardContent>
              <CardActions>
                <Button fullWidth={true} variant={"outlined"} color={"primary"}>Check Status</Button>
              </CardActions>
            </Card>
          </GridItem>
        </GridContainer>
      </GridContainer>
    );
  }
}

export default HomePage;