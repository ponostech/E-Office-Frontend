import React from "react";
import {
  AppBar, Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Icon,
  List,
  Paper, Slide,
  TextField, Toolbar, Typography
} from "@material-ui/core";
import DetailViewRow from "../e-office/common/DetailViewRow";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";

const FIELD = {
  TEXTFIELD: "textfield",
  SELECT: "select",
  RADIO: "radio",
  SWITCH: "switch"
};
const extractField = (application) => {
  let fields = [];
  for (let key in application) {
    let temp = {
      key: key.toString(),
      label: key.toString(),
      value: application[key],
      type: FIELD.TEXTFIELD
    };
    fields.push(temp);
  }
  console.log("application list", fields);
  return fields;
};

const FieldList = ({ application, isAdded, addItem, removeItem }) => {

  return (
    <Paper>
      <Card>
        <CardHeader title={"List of Fields"}/>
        <Divider component={"hr"}/>
        <CardContent>

          <List component={"div"}>
            {extractField(application).map((app, i) =>
              <DetailViewRow key={i} primary={app.label}
                             secondary={typeof app.value === "object" ? "object" : app.value}>
                <IconButton href={"#"} onClick={e => isAdded(app) ? removeItem(app) : addItem(app)}>
                  {
                    isAdded(app) ? <Icon color={"primary"}>check_circle</Icon> :
                      <Icon color={"default"}>check_circle_outline</Icon>
                  }
                </IconButton>
              </DetailViewRow>
            )}
          </List>
        </CardContent>
      </Card>
    </Paper>
  );
};

const FieldForm = ({ fields, application, getFieldValue,changeInfo, onSubmit, onCancel }) => {

  return (
    <Card component={"div"}>
      <CardHeader title={"Change Info:"}/>
      <Divider component={"div"}/>
      <CardContent>
        <Grid container={true} spacing={3} justify={"flex-start"}>
          {fields.map((field, i) => {
            switch (field.type) {
              case FIELD.TEXTFIELD:
                return <Grid key={i} item={true} md={6}>
                  <TextField
                    required={true}
                    fullWidth={true}
                    variant={"outlined"}
                    defaultValue={application[field.key]}
                    value={getFieldValue(field.key)}
                    onChange={event => changeInfo(field.key,event.target.value)}
                    label={field.label}/>;
                </Grid>;
              default:
                break;
            }
          })
          }
        </Grid>
      </CardContent>
    </Card>
  );
};
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

class FieldChangeDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [],
      formData:[]
    };

  }

  addField = (field) => {
    const { fields } = this.state;
    let arr = [...fields];
    arr.push(field);
    this.setState({ fields: arr });
  };
  cancelChange = () => {
    const { fields } = this.state;
    fields.clear();
  };
  removeField = (field) => {
    const { fields } = this.state;
    const filtered = fields.filter(item => item.key !== field.key);
    this.setState({ fields: filtered });
  };
  isAdded = (field) => {
    const { fields } = this.state;
    return fields.find(item => item.key === field.key);
  };
  getFieldValue = (key) => {
    const { fields } = this.state;
    return fields[key]
  };

  changeInfo=(key,value)=>{
    const{formData}=this.state
    let data=[...formData]
    let index=data.indexOf({key,value})
    if (index) {
      data[index]={key,value}
    }else{
      data.push({key,value})
    }
    this.setState({formData:data})
  }
  submitForm = () => {

  };

  render() {
    const { open, onClose, application,classes } = this.props;
    const { fields } = this.state;
    return (
      <Dialog open={open} TransitionComponent={Transition} onClose={onClose} fullScreen={true} fullWidth={true} maxWidth={"md"}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={onClose} aria-label="Close">
              <Icon>close</Icon>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Change Info
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>

          <Grid container={true} spacing={3} justify={"flex-start"}>
            <Grid item={true} md={3}>
              <FieldList isAdded={this.isAdded} removeItem={this.removeField} addItem={this.addField}
                         application={application}/>
            </Grid>
            <Grid item={true} md={9}>
              <FieldForm getFieldValue={this.getFieldValue} changeInfo={this.changeInfo} application={application} fields={fields} onCancel={this.cancelChange}
                         onRemoveItem={this.removeField} onSubmit={this.submitForm}/>
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button href={"#"}>Submit</Button>
          <Button href={"#"}>Cancel</Button>

        </DialogActions>
      </Dialog>
    );
  }
}

FieldChangeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired
};
export default withStyles(styles)(FieldChangeDialog);
