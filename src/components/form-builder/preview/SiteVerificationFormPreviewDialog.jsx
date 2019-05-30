import React, { Component } from "react";
import {
  AppBar,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent, DialogTitle,
  Divider,
  IconButton, Toolbar
} from "@material-ui/core";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import GridItem from "../../Grid/GridItem";
import FormFieldFactory from "../FormFieldFactory";
import GridContainer from "../../Grid/GridContainer";

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
    const { open, onClose, template } = this.props;
    const { loading } = this.state;
    let title = "Site verification form";
    let subheader = template ? template.type : "unknown";
    return (
      <Dialog  open={open} onClose={onClose} maxWidth={"md"} fullWidth={true}>

        <CardHeader title={title} subheader={subheader} action={
          <IconButton onClick={onClose}>
            <CloseIcon/>
          </IconButton>
        }/>

        <Divider/>

        <DialogContent>
          {loading ? "loading" :
            <GridContainer justify={"flex-start"}>
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
        </DialogContent>

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

export default SiteVerificationFormPreviewDialog;