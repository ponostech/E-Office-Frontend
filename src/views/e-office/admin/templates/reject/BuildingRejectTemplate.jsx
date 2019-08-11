import React, { Component } from "reactn";
import TextEditor from "../../../common/Editor";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import SubmitDialog from "../../../../../components/SubmitDialog";
import RejectTemplateService from "../../../../../services/RejectTemplateService";

class BuildingRejectTemplate extends Component {

  rejectTemplateService = new RejectTemplateService();

  state = {
    id: null,
    content: "",
    type: "building",

    edit: false,
    submit: false
  };


  componentDidMount() {
    this.setGlobal({ loading: false });
    this.rejectTemplateService.get("building",
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
    this.rejectTemplateService.update(template, errorMsg => this.setGlobal({ errorMsg }),
      successMsg => this.setGlobal({ successMsg }))
      .finally(() => this.setState({ submit: false }));
  };
  doSave = () => {
    let data = {
      content: this.state.content,
      type: this.state.type
    };
    this.setState({ submit: true });
    this.rejectTemplateService.create(data, errorMsg => this.setGlobal({ errorMsg }),
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
            <Button variant={"outlined"} color={"primary"}
                    onClick={this.handleClick.bind(this, "save")}>{edit ? "Update" : "Save"}</Button>
            <Button variant={"outlined"} color={"secondary"}
                    onClick={this.handleClick.bind(this, "reset")}>Reset</Button>
          </CardActions>

        </Card>
        <SubmitDialog open={this.state.submit} title={"Submit Template"}
                      text={"Hote License template is submitting ..."}/>

      </>
    );
  }
}

export default BuildingRejectTemplate;