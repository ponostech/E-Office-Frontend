import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Tooltip
} from "@material-ui/core";
import PrinterIcon from "@material-ui/icons/Print";
import ViewIcon from "@material-ui/icons/RemoveRedEyeSharp";
import DownloadIcon from "@material-ui/icons/ArrowDownward";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import TextField from "@material-ui/core/es/TextField/TextField";

class KioskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kiosk: {
        application_no: 12,
        length: 123,
        height: 123,
        roadDetail: 1231,
        bothSide: true,
        collapsible: false,
        landOwner: "kimi",

        documents: [
          { name: "Tribal Cert", size: 233 },
          { name: "Residential Cert", size: 233 },
          { name: "NOC Cert", size: 233 }
        ]

      }
    };
  }

  render() {
    const { kiosk } = this.state;
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={10}>
          <Card style={{ padding: 20 }}>
            <CardHeader title={"Application No: " + kiosk.application_no} action={
              <div style={{ display: "flex" }}>

                <Tooltip title={"Download"}>
                  <Button variant={"extendedFab"} color={"primary"}>
                    <DownloadIcon color={"action"}/> Download
                  </Button>
                </Tooltip>
                <Tooltip title={"Print"}>
                  <IconButton>
                    <PrinterIcon color={"action"}/>
                  </IconButton>
                </Tooltip>
              </div>
            }/>
            <CardContent>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField variant={"filled"} disabled={true} value={kiosk.application_no}
                             label={"Application No"} fullWidth={true}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField variant={"filled"} disabled={true} value={kiosk.length} label={"Length"}
                             fullWidth={true}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField variant={"filled"} disabled={true} value={kiosk.height} label={"Height"}
                             fullWidth={true}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField variant={"filled"} disabled={true} value={kiosk.roadDetail} label={"Road Detail"}
                             fullWidth={true}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControlLabel label={"BothSide"} control={<Switch checked={kiosk.bothSide}/>} disabled={true}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControlLabel label={"Collapsible"} control={<Switch checked={kiosk.collapsible}/>}
                                    disabled={true}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField variant={"filled"} disabled={true} value={kiosk.landOwner} label={"Land Owner"}
                             fullWidth={true}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                </GridItem>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <List>

                      {kiosk.documents.map(function(item, index) {
                        return (
                          <ListItem>
                            <ListItemText primary={item.name} secondary={item.size + " kb"}/>
                            <ListItemSecondaryAction>
                              <IconButton onClick={(e)=>window.open("www.yesterdaysclassics.com/previews/nesbit_shakespeare_preview.pdf", "_blank")}>
                                <ViewIcon/>
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}

                    </List>
                  </GridItem>
                </GridContainer>


              </GridContainer>
            </CardContent>
          </Card>
        </GridItem>

      </GridContainer>
    );
  }
}


export default KioskDetail;