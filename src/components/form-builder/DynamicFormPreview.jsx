import React, { Component } from "reactn";
import GridItem from "../Grid/GridItem";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import FormFieldFactory from "./FormFieldFactory";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";
import OfficeSelect from "../OfficeSelect";
import GridContainer from "../Grid/GridContainer";
import { SiteVerificationService } from "../../services/SiteVerificationService";
import OfficeSnackbar from "../OfficeSnackbar";
import SubmitDialog from "../SubmitDialog";
import { withRouter } from "react-router-dom";
import { SITE_VERIFICATION_LIST } from "../../config/routes-constant/OfficeRoutes";

const options = [
  { value: "hoarding", label: "Hoarding site verification" },
  { value: "kiosk", label: "Kiosk site verification" },
  { value: "shop", label: "Shop site verification" },
  { value: "hotel", label: "Hotel site verification" }
];

class DynamicFormPreview extends Component {

  siteVerificationService = new SiteVerificationService();

  state = {
    title: "Site Verification Form Builder",
    subTitle: "",
    formElements: [],

    selectedType: { value: "hoarding", label: "Hoarding site verification" },

    errorMessage: "",
    successMessage: "",
    submit: false
  };

  componentDidMount() {
    const { edit, selectedType } = this.props;
    if (edit)
    this.setState({ selectedType });
    this.setGlobal({loading:false})
  }

  submitHandler = event => {

    const { edit, selectedType } = this.props;
    let formElements = [];
    this.state.formElements.forEach(item => {
      formElements.push(item.config);
    });
    let data = {
      title: this.state.title,
      subTitle: this.state.subTitle,
      formElements: formElements
    };
    this.setState({ submit: true });
    if (edit) {
      const id = this.props.id;
      this.siteVerificationService.editTemplate(id, {
        type:selectedType.value,
        data
        },
        errorMessage => this.setState({ errorMessage }),
        successMessage => {
          this.setState({ successMessage, formElements: [] });
          this.props.history.push(SITE_VERIFICATION_LIST);
        })
        .finally(() => this.setState({ submit: false }));
    } else {
      let type = this.state.selectedType.value;
      this.siteVerificationService.createTemplate(type, data,
        errorMessage => this.setState({ errorMessage }),
        successMessage => {
          this.setState({ successMessage, formElements: [] });
          this.props.clear();
        })
        .finally(() => this.setState({ submit: false }));
    }
  };

  removeItem = (index, e) => {
    let formElements = this.state.formElements;
    formElements.splice(index, 1);
    this.setState({ formElements });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      formElements: nextProps.formElements
    });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    console.log(inputIdentifier);
  };

  render() {
    const { formElements } = this.state;

    let form = (
      <>
        {formElements.map((element, index) => (
          <>
            <GridItem md={5}>

              <FormFieldFactory
                key={element.key}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                validation={element.config.validation}
                value={element.config.value}
                changed={event => this.inputChangedHandler(event, element.key)}
              />
            </GridItem>
            <GridItem md={1}>
              <IconButton onClick={this.removeItem.bind(this, index)}>
                <TrashIcon color={"secondary"}/>
              </IconButton>
            </GridItem>
          </>
        ))}

      </>
    );
    return (
      <Card>
        <CardHeader  onChange={event => console.log(event)} title={this.state.title}
                    subheader={this.state.subTitle} action={
          this.props.edit ?<Typography variant={"subtitle1"}> EDIT SITE VERIFICATION ( {this.props.selectedType?this.props.selectedType.value:""})</Typography> :
            <OfficeSelect
              label={"Type of site verification"}
              variant={"outlined"}
              margin={"dense"}
              value={this.state.selectedType}
              onChange={val => {
                this.setState({ selectedType: val })
                this.props.onSelectType(val.value)
              }}
              options={options}
            />
        }/>
        <Divider/>
        <CardContent>
          <Grid container={true}  style={{ height: "60vh" }} justify={"flex-start"} alignItems={"flex-start"}>

            {form}

          </Grid>
        </CardContent>
        <Divider/>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button onClick={this.submitHandler} variant={"outlined"} color={"primary"}>Save</Button>
          <Button onClick={e => this.setState({ formElements: [] })} variant={"outlined"}
                  color={"secondary"}>Reset</Button>
        </CardActions>

        <SubmitDialog open={this.state.submit} title={"Site verification"} text={"Submitting ..."}/>
        <OfficeSnackbar variant={"error"} message={this.state.errorMessage} open={Boolean(this.state.errorMessage)}
                        onClose={e => this.setState({ errorMessage: "" })}/>
        <OfficeSnackbar variant={"success"} message={this.state.successMessage}
                        open={Boolean(this.state.successMessage)} onClose={e => this.setState({ successMessage: "" })}/>
      </Card>
    );
  };
}

export default withRouter(DynamicFormPreview);