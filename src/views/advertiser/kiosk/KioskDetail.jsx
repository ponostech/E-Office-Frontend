import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, IconButton, Tooltip } from "@material-ui/core";
import PrinterIcon from "@material-ui/icons/Print";
import DownloadIcon from "@material-ui/icons/ArrowDownward";

class KioskDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      id:123
    }
  }

  render() {
    const { id } = this.state;
    return (
      <div>
        <Card>
          <CardHeader title={id} action={
            <div style={{display:'flex'}}>
              <Tooltip title={"Print"}>
                <IconButton>
                  <PrinterIcon color={"action"}/>
                </IconButton>
              </Tooltip>
              <Tooltip title={"Download"}>
                <IconButton>
                  <DownloadIcon color={"action"}/>
                </IconButton>
              </Tooltip>
            </div>
          }/>
          <CardContent>
            hoarding details goes here
          </CardContent>
        </Card>

      </div>
    );
  }
}


export default KioskDetail;