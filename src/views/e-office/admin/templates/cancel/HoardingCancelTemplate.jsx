import React, { Component } from "reactn";
import TextEditor from "../../../common/Editor";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import SubmitDialog from "../../../../../components/SubmitDialog";
import CancelTemplateService from "../../../../../services/CancelTemplateService";

class HoardingCancelTemplate extends Component {
  cancelTemplateService = new CancelTemplateService();

  state = {
    id: null,
    content: "",
    type: "hoarding",
    edit: false,
    submit: false

  };

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.cancelTemplateService.get("hoarding",
      errorMsg => this.setGlobal({ errorMsg }),
      template => {
        if (template)
          this.setState({ content: template.content, id: template.id, type: template.type, edit: true });
      })
      .finally(() => this.setGlobal({ loading: false }));
  }

  doUpdate = () => {
    let template = {
      id: this.state.id,
      content: this.state.content,
      type: this.state.type
    };
    this.setState({ submit: true });
    this.cancelTemplateService.update(template, errorMsg => this.setGlobal({ errorMsg }),
      successMsg => this.setState({ successMsg }))
      .finally(() => this.setState({ submit: false }));
  };

  doSave = () => {
    let data = {
      content: this.state.content,
      type: this.state.type
    };
    this.setState({ submit: true });
    this.cancelTemplateService.create(data, errorMsg => this.setGlobal({ errorMsg }),
      (successMsg, id) => {
        this.setGlobal({ successMsg });
        this.setState({ edit: true, id });
      })
      .finally(() => this.setState({ submit: false }));
  };

  handleClick = (identifier) => {
    switch (identifier) {
      case "save":
        if (this.state.edit) {
          this.doUpdate();
        } else {
          this.doSave();
        }
        break;
      case "reset":
        this.setState({ content: "" });
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
            <Button href={"#"} variant={"outlined"} color={"primary"}
                    onClick={this.handleClick.bind(this, "save")}>{edit ? "Update" : "Save"}</Button>
            <Button href={"#"} variant={"outlined"} color={"secondary"}
                    onClick={this.handleClick.bind(this, "reset")}>Reset</Button>
          </CardActions>
        </Card>
        <SubmitDialog open={this.state.submit} title={"Submit Template"}
                      text={"Hote License template is submitting ..."}/>

      </>
    );
  }
}

export default HoardingCancelTemplate;