import React from "react";
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import Card from "../../../../components/Card/Card.jsx";
import CardHeader from "../../../../components/Card/CardHeader.jsx";
import CardBody from "../../../../components/Card/CardBody.jsx";
import Button from "../../../../components/CustomButtons/Button.jsx";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import  CheckIcon  from "@material-ui/icons/Check";
import Divider from "@material-ui/core/es/Divider/Divider";

class LicenseValidity extends React.Component {
  state = {
    license: ""
  };

  handleClick = (e) => {

  };

  render() {
    const props = this.props;
    return (
      <Card>
        <CardHeader>
          <Typography variant='h5' align="center">
            Check your Shop License
          </Typography>
        </CardHeader>
        <CardBody>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6} lg={3}>
              <Card pricing raised>
                <CardBody pricing>
                  <h6 className={props.classes.cardCategory}>Check your shop license validity</h6>
                  <div className={props.classes.icon}>
                    <CheckIcon color="primary"/>
                  </div>
                  <div className={props.classes.cardDescription}>
                    <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                    <TextField fullWidth={true}
                               name={"license"}
                               variant={"outlined"}
                               label={"Shop License No"}
                               required={true}
                               margin={"dense"}
                               value={this.state.license}
                               onChange={(e) => {
                                 this.setState({ license: e.target.value });
                               }}
                    />
                  </div>
                  <Button disable={!Boolean(this.state.license)} fullWidth={true} color="primary" round

                          onClick={this.handleClick.bind(this)}>
                    Check validity
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}


export default LicenseValidity;