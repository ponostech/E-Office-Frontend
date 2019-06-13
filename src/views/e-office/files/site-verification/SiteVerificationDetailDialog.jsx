import React, { Component } from "react";
import {
  AppBar,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText, Toolbar, Typography, withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import DetailViewRow from "../../common/DetailViewRow";
import WidgetConstant from "../../../../components/form-builder/WidgetConstant";
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  docsItem: {
    cursor: 'pointer',
  },
  editor: {
    minHeight: 200
  }
};

class SiteVerificationDetailDialog extends Component {
  state = {
    rows: [],
    images: [],
    attachments: [],
  };

  componentDidMount() {
   };

  componentWillReceiveProps(nextProps, nextContext) {
    const { open, onClose, file, verification } = nextProps;
    let rows = [];
    let attachments = [];
    let images = [];

    if (verification) {
      const elements = verification.template.formElements;
      console.log("she called me")
      elements.forEach(function(element, index) {
        let row={};
        let attachment={};
        let image={};
        switch (element.elementType) {
          case WidgetConstant.FILE_UPLOAD:
            attachment.value=element.value.name;
            attachment.path=element.value.path;

            attachments.push(attachment);
            break;
          case WidgetConstant.IMAGE_UPLOAD:
            image.value=element.value.name;
            image.path=element.value.path;

            images.push(image);
            break;
          case WidgetConstant.SELECT:
            row.label=element.elementConfig.label;
            row.value=element.value.value;
            rows.push(row);
            break;
          default:
            row.label=element.elementConfig.label;
            row.value=element.value;

            rows.push(row)
        }
      });
    }

    this.setState({ rows,attachments,images });

  }

  render() {
    const { open, onClose, file,classes } = this.props;
    const { rows, images, attachments } = this.state;

    return (
      <Dialog fullScreen={true} fullWidth={true} maxWidth={"md"} open={open} onClose={onClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={this.props.close} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Details of site verification
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <CardHeader title={`FILE NUMBER : ${file.number}`} subheader={`SITE VERIFICATION OF ${file.subject}`}/>
        <Divider component={"li"}/>

        <DialogContent>
          <GridContainer spacing={3}>
            <GridItem md={6}>
              <List component={"div"}>
                {
                  rows.map((row, index) => (
                    <> <DetailViewRow key={index} primary={row.label} secondary={row.value}/> </>
                  ))
                }
              </List>
            </GridItem>
            <GridItem md={6}>
              {attachments.length!==0 && <Typography variant={"h6"}>Attachment</Typography>}
              <List component={"div"}>
                {
                  attachments.map((item, index) => (
                    <>
                      <DetailViewRow secondary={item.value}>
                        <IconButton href={item.path}><EyeIcon color={"primary"}/></IconButton>
                      </DetailViewRow>
                    </>
                  ))
                }
              </List>
              {images.length!==0 && <Typography variant={"h6"}>Images</Typography>}
              <List component={"div"}>
                {
                  images.map((item, index) => (
                    <>
                     <img src={item.path} height={200} width={100}  onClick={e=>window.open(item.path)}/>
                    </>
                  ))
                }
              </List>
            </GridItem>
          </GridContainer>


        </DialogContent>

        <Divider component={"li"}/>
        <DialogActions>
          <Button href={"#"} variant={"outlined"} color={"secondary"} onClick={onClose}>Close</Button>
        </DialogActions>

      </Dialog>
    );
  }
}

SiteVerificationDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
  verification: PropTypes.object.isRequired
};

export default withStyles(styles)(SiteVerificationDetailDialog);