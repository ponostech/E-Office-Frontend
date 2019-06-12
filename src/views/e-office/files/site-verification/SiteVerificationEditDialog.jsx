import React, { Component } from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import { SiteVerificationService } from "../../../../services/SiteVerificationService";
import WidgetConstant from "../../../../components/form-builder/WidgetConstant";
import FormFieldFactory from "../../../../components/form-builder/FormFieldFactory";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import LoadingView from "../../../common/LoadingView";
import Grid from "@material-ui/core/Grid";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SiteVerificationEditDialog extends Component {
  siteVerification = new SiteVerificationService();
  state = {

    formElements: [],

    loading: false,
    errorMessage: ""
  };

  componentDidMount() {
    const { type } = this.props;
    this.setState({ loading: true });
    this.siteVerification.getTemplate(type, errorMessage => this.setState({ errorMessage }), template => {
      this.mergeFormElements(template.data.formElements)
    })
      .finally(() => this.setState({ loading: false }));
  }

  mergeFormElements = (newElements) => {
    if (this.props.verification) {
      const { formElements } = this.props.verification.template;

      let merge=this.merge(formElements,newElements);
      this.setState({formElements:merge})
    }
    console.log("about to merge")
  };

  merge = (a, b) => a.filter(elem => !b.find(subElem => subElem.elementConfig.name === elem.elementConfig.name)).concat(b);

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.verification)
      this.setState({ formElements: nextProps.verification.template.formElements });
  }

  checkValidity(value, validation) {
    let isValid = true;

    if (validation.required) {
      isValid = Boolean(value);
    } else if (validation.pattern) {
      isValid = new RegExp(validation.pattern).test(value);
    }

    return isValid;
  }

  inputChangedHandler = (event, key) => {
    const newElements = [
      ...this.state.formElements
    ];

    let element = newElements[key];
    if (element.elementType === WidgetConstant.SELECT) {
      element.value = event;
    } else if (element.elementType === WidgetConstant.CHECKBOX) {
      element.value = event.target.checked;
    } else if (element.elementType === WidgetConstant.ADDRESS) {
      element.value = event;
    } else if (element.elementType === WidgetConstant.FILE_UPLOAD) {
      element.value = event;
    } else if (element.elementType === WidgetConstant.IMAGE_UPLOAD) {
      element.value = event;
    } else {
      element.value = event.target.value;
    }
    element.valid = this.checkValidity(element.value, element.validation);

    this.setState({ formElements: newElements });
  };
  onSubmit = (e) => {
    const { file, verification } = this.props;
    const formData = {};
    const elements = this.state.formElements;
    let valid = true;
    elements.forEach(function(element, index) {
      if (!element.valid) {
        valid = false;
      }
      formData[element.elementConfig.name] = element.value.value ? element.value.value : element.value;
    });
    if (!valid) {
      this.setState({ errorMessage: "Please fill all the required field" });
    } else {
      let url = `site-verifications/${verification.id}`;
      let template = {
        title: this.state.title,
        subTitle: this.state.subTitle,
        formElements: this.state.formElements
      };

      this.props.onClose(url, formData, template);
    }
  };

  render() {
    const { formElements, loading, errorMessage } = this.state;
    const { open, onClose, file, classes } = this.props;

    let form = (<p>No site verification form is generated</p>);
    if (formElements) {
      form = (
        <>
          {formElements.map((element, index) => (
            <Grid style={{margin:10}} key={index} md={6}>
              <FormFieldFactory
                key={index}
                elementType={element.elementType}
                elementConfig={element.elementConfig}
                validation={element.validation}
                value={element.value}
                changed={event => this.inputChangedHandler(event, index)}
              />
            </Grid>
          ))}

        </>
      );
    }
    return (
      <Dialog TransitionComponent={Transition} fullScreen={true} fullWidth={true} maxWidth={"lg"} open={open}>
        <AppBar className={classes.appBar}>

          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={e => onClose(null, null, null)} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Edit Site verification
            </Typography>
            <Button href={"#"} onClick={e => onClose(null, null, null)} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <DialogTitle title={"title"}>
          <Typography variant={"title"}>FILE NO: {file.number}</Typography>
          <Typography variant={"subtitle1"}>SITE VERIFICATION OF {file.subject}</Typography>
          <Typography hidden={!Boolean(errorMessage)} color={"secondary"}
                      variant={"caption"}>{errorMessage}</Typography>
        </DialogTitle>

        <Divider component={"li"}/>

        <DialogContent>
          <Grid container={true} justify={"flex-start"} spacing={3}>
            {loading ? <LoadingView/> : form}
          </Grid>
        </DialogContent>
        <Divider component={"li"}/>
        <DialogActions>
          <Button href={"#"} variant={"outlined"} onClick={this.onSubmit.bind(this)} color={"primary"}> Update</Button>
          {"\u00A0 "}
          {"\u00A0 "}
          {"\u00A0 "}
          {"\u00A0 "}
          <Button href={"#"} variant={"outlined"} color={"secondary"}
                  onClick={e => onClose(null, null, null)}> Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SiteVerificationEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
  verification: PropTypes.object.isRequired,
  type: PropTypes.object.isRequired
};

export default withStyles(styles)(SiteVerificationEditDialog);