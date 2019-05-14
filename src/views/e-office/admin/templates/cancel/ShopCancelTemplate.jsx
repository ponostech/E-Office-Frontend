import React, { Component } from "react";
import TextEditor from "../../../files/draft/Editor";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import LicenseTemplateService from "../../../../../services/LicenseTemplateService";
import SubmitDialog from "../../../../../components/SubmitDialog";
import OfficeSnackbar from "../../../../../components/OfficeSnackbar";
import CancelTemplateService from "../../../../../services/CancelTemplateService";

class ShopCancelTemplate extends Component {

  cancelTemplateService = new CancelTemplateService();

  state = {
    id:null,
    content: "",
    type: "advertiser",

    edit: false,
    submit: false,

    errorMessage: "",
    successMessage: ""
  };


  componentDidMount() {
    this.props.doLoad(true);
    this.cancelTemplateService.get("shop",
      errorMessage => this.setState({ errorMessage }),
      template => {
        if (template)
          this.setState({ content:template.content,id:template.id,type:template.type, edit: true })
      })
      .finally(() => this.props.doLoad(false));
  }

  doUpdate = () => {
    let template={
      id:this.state.id,
      content:this.state.content,
      type:this.state.type
    }
    this.setState({submit:true})
    this.cancelTemplateService.update(template,errorMessage=>this.setState({errorMessage}),
      successMessage=>this.setState({successMessage}))
      .finally(()=>this.setState({submit:false}))
  };
  doSave = () => {
    let data={
      content:this.state.content
    }
    this.setState({submit:true})
    this.cancelTemplateService.create(data,errorMessage=>this.setState({errorMessage}),
      successMessage=>this.setState({successMessage}))
      .finally(()=>this.setState({submit:false}))
  };
  handleClick = (identifier) => {
    switch (identifier) {
      case "save":
        if (this.state.edit) {
          this.doUpdate()
        } else {
          this.doSave()
        }
        break;
      case "reset":
        break;
      default:
        break;
    }
  };
  editorChange = (e) => {
    this.setState({ content: e.target.getContent() });
  };

  render() {
    const { edit } = this.state;
    return (
      <>
        <Card>
          <CardContent>
            <TextEditor onChange={this.editorChange} default={this.state.content}/>
          </CardContent>

          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button variant={"outlined"} color={"primary"}
                    onClick={this.handleClick.bind(this, "save")}>{edit ? "Update" : "Save"}</Button>
            <Button variant={"outlined"} color={"secondary"}
                    onClick={this.handleClick.bind(this, "reset")}>Reset</Button>
          </CardActions>

        </Card>
        <SubmitDialog open={this.state.submit} title={"Submit Template"}
                      text={"Hote License template is submitting ..."}/>

        <OfficeSnackbar variant={"error"} open={Boolean(this.state.errorMessage)} message={this.state.errorMessage}
                        onClose={() => this.setState({ errorMessage: "" })}/>
        <OfficeSnackbar variant={"success"} open={Boolean(this.state.successMessage)}
                        message={this.state.successMessage} onClose={() => this.setState({ successMessage: "" })}/>
      </>
    );
  }
}

export default ShopCancelTemplate;