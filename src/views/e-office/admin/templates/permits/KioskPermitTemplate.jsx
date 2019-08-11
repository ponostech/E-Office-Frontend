import React, { Component } from "reactn";
import TextEditor from "../../../common/Editor";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import SubmitDialog from "../../../../../components/SubmitDialog";
import PermitTemplateService from "../../../../../services/PermitTemplateService";

class KioskPermitTemplate extends Component {

  permitTemplateService = new PermitTemplateService();

  state = {
    id: null,
    content: "",
    type: "kiosk",

    edit: false,
    submit: false

  };


  componentDidMount() {
    this.setGlobal({ loading: true });
    this.permitTemplateService.get("kiosk",
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
    this.permitTemplateService.update(template, errorMessage => this.setState({ errorMessage }),
      successMessage => this.setState({ successMessage }))
      .finally(() => this.setState({ submit: false }));
  };
  doSave = () => {
    let data = {
      content: this.state.content,
      type: "kiosk"
    };
    this.setState({ submit: true });
    this.permitTemplateService.create(data, errorMessage => this.setState({ errorMessage }),
      (successMsg, id) => {
        this.setState({ edit: true, id });
        this.setGlobal({ successMsg });
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
                      text={"Template of permit is submitting ..."}/>

      </>
    );
  }
}

export default KioskPermitTemplate;