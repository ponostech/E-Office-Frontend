import React, { Component } from "react";
import {
  AppBar,
  Button, Card, CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent, DialogTitle,
  Divider,
  IconButton, List, Slide, Toolbar, Typography, withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import GridItem from "../../Grid/GridItem";
import FormFieldFactory from "../FormFieldFactory";
import GridContainer from "../../Grid/GridContainer";
import LoadingView from "../../../views/common/LoadingView";
const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  editor: {
    minHeight: 200
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class SiteVerificationFormPreviewDialog extends Component {
  // siteVerificationService = new SiteVerificationService();

  state = {
    formElements: [],
    loading: false
  };

  componentDidMount() {
    const { type } = this.props;
    // this.siteVerificationService.getTemplate(type,
    //   errorMessage => this.setState({ errorMessage }),
    //   formElements => this.setState({ formElements }))
    //   .finally(() => this.setState({ loading: false }));
  }

  inputChangedHandler = (event, index) => {

  };

  render() {
    const { open, onClose, template,classes } = this.props;
    const { loading } = this.state;
    let title = "Site verification form";
    let subheader = template ? template.type : "unknown";
    return (
      <Dialog TransitionComponent={Transition} fullScreen={true}  open={open} onClose={onClose} maxWidth={"md"} fullWidth={true}>
        <AppBar  className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Site Verfication Form Template
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <List>
            <Card>
              <CardContent>
                {loading ? "loading" :
                  <GridContainer spacing={3} justify={"flex-start"}>
                    {template ? template.data.formElements.map((element, index) => (
                      <GridItem key={index} md={6}>

                        <FormFieldFactory
                          key={index}
                          elementType={element.elementType}
                          elementConfig={element.elementConfig}
                          validation={element.validation}
                          value={element.value}
                          changed={event => this.inputChangedHandler(event, index)}
                        />
                      </GridItem>
                    )) : "No template found"}
                  </GridContainer>
                }
              </CardContent>
            </Card>
          </List>

        </DialogContent>
        <Divider/>

        <DialogActions>
          <Button variant={"outlined"} color={"secondary"} onClick={onClose}>Close</Button>
        </DialogActions>

      </Dialog>
    );
  }
}

SiteVerificationFormPreviewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  template: PropTypes.object.isRequired
};

export default withStyles(styles)(SiteVerificationFormPreviewDialog);