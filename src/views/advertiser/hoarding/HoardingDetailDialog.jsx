import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import withStyles from "@material-ui/core/es/styles/withStyles";
import EyeIcon from "@material-ui/icons/PanoramaFishEyeOutlined";
import CloseIcon from "@material-ui/icons/Close";

const style = {
  item: {
    padding: "10px 10px !important"
  }
};

const model = {
  fileNo: "123",
  subject: "Matter relating to ",
  description: "description of file",
  date: "12/12/2019",
  applicationNo: "Hoarding",
  status: "new",
  documents: [
    {
      name: "NOC of something",
      path: "https://ucaecemdp.edu.ar/wp-content/.../Short-stories-from-100-Selected-Stories.pdf"
    },
    { name: "Cert", path: "https://ucaecemdp.edu.ar/wp-content/.../Short-stories-from-100-Selected-Stories.pdf" }
  ]
};

class HoardingDetailDialog extends Component {

  getDocuments = (docs) => {
    let view = undefined;
    docs.map(function(doc, index) {
      view += (
        <>
          <ListItem key={index}>
            <ListItemText primary={doc.name}/>
            <ListItemSecondaryAction>
              <IconButton target={"_blank"} href={doc.path}>
                <EyeIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </>
      );
    });
  };
  getField = (model) => {
    let view = undefined;

    for (const [key, value] of Object.entries(model)) {
      console.log(value);
      view +=
        (
          <>
            <GridItem md={4}>
              <Typography variant={"textPrimary"}>
                {key}
              </Typography>
            </GridItem>
            <GridItem md={8}>
              <Typography variant={"textSecondary"}>
                {value}
              </Typography>
            </GridItem>
          </>
        );
    }
    return view;

  };

  render() {
    const { open, onClose, classes,hoarding } = this.props;
    return (
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>
        <DialogContent>
          <Card>
            <CardHeader title={`Application No : ${model.applicationNo}`} subheader={`Subject : ${model.subject}`}
                        action={
                          <IconButton onClick={onClose}>
                            <CloseIcon/>
                          </IconButton>
                        }/>
            <CardContent>
              <GridContainer>

                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                    <GridItem xs={4} sm={4} md={4}>
                      <Typography variant={"subtitle1"}>
                        File No :
                      </Typography>
                    </GridItem>
                    <GridItem xs={8} sm={8} md={8}>
                      <Typography variant={"subtitle2"}>
                        {hoarding.id}
                      </Typography>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                      <Typography variant={"subtitle1"}>
                        Date :
                      </Typography>
                    </GridItem>
                    <GridItem xs={8} sm={8} md={8}>
                      <Typography variant={"subtitle2"}>
                        {model.date}
                      </Typography>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                      <Typography variant={"subtitle1"}>
                        Status :
                      </Typography>
                    </GridItem>
                    <GridItem xs={8} sm={8} md={8}>
                      <Chip color={"primary"} label={model.status}/>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                      <Typography variant={"subtitle1"}>
                        Description :
                      </Typography>
                    </GridItem>
                    <GridItem xs={8} sm={8} md={8}>
                      <Typography variant={"subtitle2"}>
                        {model.description}
                      </Typography>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <List>
                    {
                      model.documents.map(function(doc, index) {
                        return (
                          <ListItem key={index}>
                            <ListItemText primary={doc.name}/>
                            <ListItemSecondaryAction>
                              <IconButton target={"_blank"} href={doc.path}>
                                <EyeIcon/>
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })
                    }
                  </List>
                </GridItem>
              </GridContainer>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} color={"secondary"} onClick={e => onClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(style)(HoardingDetailDialog);