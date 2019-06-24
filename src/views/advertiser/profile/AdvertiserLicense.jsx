import React, { Component } from "react";
import { Button, Card, CardActions, CardContent, CardHeader, Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import PrintIcon from "@material-ui/icons/Print";
import Divider from "@material-ui/core/Divider";

class AdvertiserLicense extends Component {
  constructor(props) {
    super(props);
    this.state={
      license:null,
      expired:true
    }
  }

  handleClick=(e)=>{

  }

  renew=(e)=>{

  }
  render() {
    const { expired } = this.state;

    return (
      <Card>
        <CardHeader title={"License Detail"} action={
          <>
            <Tooltip title={"Download"}>
              <IconButton href={"#"} onClick={this.handleClick}>
                <DownloadIcon/>
              </IconButton>
            </Tooltip>

            <Tooltip title={"Print"}>
              <IconButton href={"#"} onClick={this.handleClick}>
                <PrintIcon/>
              </IconButton>
            </Tooltip>
          </>
        }/>
        <Divider component={"div"}/>

        <CardContent>
          <h3>License details</h3>
        </CardContent>
        <Divider component={"div"}/>
        <CardActions style={{justifyContent:"flex-end"}}>
          {expired && <Button href={"#"} color={"primary"} variant={"outlined"} onClick={this.renew}>Renew</Button> }
        </CardActions>
      </Card>
    );
  }
}

export default AdvertiserLicense;