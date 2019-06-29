import React, { Component } from "reactn";
import { Button, Card, CardActions, CardContent, TextField } from "@material-ui/core";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import { FileHeadService } from "../../../../services/FileHeadService";
import SubmitDialog from "../../../../components/SubmitDialog";

class GroupHeadCreate extends Component {
  constructor(props) {
    super(props);

    this.state={
      value: "",
      label: "",

      valueError: "",
      labelError: "",

      submit:false
    }
    this.fileHeadService = new FileHeadService();
  }

  handleClick=(e)=>{
    const invalid = this.state.value === "" || this.state.label === "";
    if (invalid) {
      this.setGlobal({errorMsg:"Please fill all the required fields"})
    }else{
      let data={
        value:this.state.value,
        label:this.state.label,
        type:"group"
      }
      this.setState({submit:true});
      this.fileHeadService.create(data,errorMsg=>this.setGlobal({errorMsg}),successMsg=>this.setGlobal({successMsg}))
        .finally(()=>{
          this.setState({submit:false})
          this.setState({value:"",label:""})
        })
    }
  }
  handleChange=(e)=>{
    const { name, value } = e.target;
    this.setState({
      [name]:value
    })
  }
  handleBlur=(e)=>{
    const { name, value } = e.target;
    switch (name) {
      case "value":
        value === ""? this.setState({valueError:"Value is required"}):this.setState({valueError:""});
        break;
      case "label":
        value === ""? this.setState({labelError:"Label is required"}):this.setState({labelError:""});
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <GridContainer>
        <GridItem md={6}>
          <Card>
            <CardContent>

                  <TextField
                    required={true}
                    error={Boolean(this.state.valueError)}
                    helperText={this.state.valueError}
                    margin={"dense"}
                    label={"Value"}
                    variant={"outlined"}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    name={"value"}
                    value={this.state.value}
                    fullWidth={true}/>

                  <TextField
                    required={true}
                    error={Boolean(this.state.labelError)}
                    helperText={this.state.labelError}
                    margin={"dense"}
                    label={"Label"}
                    variant={"outlined"}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    name={"label"}
                    value={this.state.label}
                    fullWidth={true}/>

            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button
                name={"submit"}
                href={"#"} variant="outlined" color="primary"
                onClick={this.handleClick.bind(this)}>Save</Button>
              {" "}
              <Button onClick={e=>window.location.reload()} href={"#"} style={{ margin: 10 }} variant="outlined" color="secondary">Reset</Button>
            </CardActions>
          </Card>
        </GridItem>

        <SubmitDialog open={this.state.submit} title={"Create Group Head"} text={"Please wait ... "}/>

      </GridContainer>


    );
  }
}

export default GroupHeadCreate;