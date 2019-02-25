import React, { Component } from "react";
import { Button, Card, CardActions, CardContent, CardHeader } from "@material-ui/core";

class ShopLicenseForm extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader/>
          <CardContent>
          </CardContent>
          <CardActions>

            <Button> submit</Button>
            <Button> reset</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ShopLicenseForm;