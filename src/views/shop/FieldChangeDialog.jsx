import React from "react";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Icon,
  List,
  Paper,
  Slide,
  Toolbar,
  Typography
} from "@material-ui/core";
import DetailViewRow from "../e-office/common/DetailViewRow";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import moment from "moment";
import ChangeForm from "./utils/ChangeForm";
import { DocumentService } from "../../services/DocumentService";


const FIELD = {
  TEXTFIELD: "textfield",
  SELECT: "select",
  RADIO: "radio",
  SWITCH: "switch"
};
const extractField = (application) => {
  let fields = [];
  return {
    owner: { key: "owner", name: "applicantName", label: "Name of Applicant", defaultValue: application["owner"] },

    phone: { key: "phone_no", name: "mobile", label: "Phone No", defaultValue: application["phone"] },
    // email:  {key:"email",name:"email",label:"Email",defaultValue:application['email']},
    type: {
      key: "applicant_type",
      name: "applicantType",
      label: "Type of Applicant",
      defaultValue: application["type"]
    },
    onwer_address: {
      key: "owner",
      name: "applicantName",
      label: "Name of Applicant",
      defaultValue: application["owner_address"]
    },

    name: { key: "shop_name", name: "shopName", label: "Name of Shop", defaultValue: application["name"] },

    address: {
      key: "address",
      name: "shopAddress",
      label: "Address of Proposed Shop",
      defaultValue: application["address"]
    },

    trade: { key: "trade_name", name: "tradeName", label: "Name of Trade ", defaultValue: application["trade"] },

    local_council: {
      key: "local_council",
      name: "shopLocalCouncil",
      label: "Local Council of Proposed Shop ",
      defaultValue: application["local_council"]
    },

    estd: { key: "estd", name: "estd", label: "Date of Establishment ", defaultValue: moment(application["estd"]) },

    details: {
      key: "details",
      name: "businessDetail",
      label: "Detail of Business",
      defaultValue: application["details"]
    },
    premise_type: {
      key: "premise_type",
      name: "premise_type",
      label: "Whether Premised of leased",
      defaultValue: application["premise_type"]
    },

    tin_no: { name: "tinNo", label: "TIN No", defaultValue: application["tin_no"] },

    cst_no: { name: "cstNo", label: "CST No", defaultValue: application["cst_no"] },

    pan_no: { name: "panNo", label: "PAN No", defaultValue: application["pan_no"] },

    gst_no: { name: "gstNO", label: "GST No", defaultValue: application["gst_no"] }

  };
};

const FieldList = ({ application, documents, isDocumentAdded, addDocument, removeDocument, isAdded, addItem, removeItem }) => {
  let fields = extractField(application);

  const getStringValue = (key, value) => {

    switch (key) {
      case "local_council":
        return value.name;
      case "estd":
        return moment(value).format("Do MMM YYYY");
      case "trade":
        return value.name;
      default:
        return typeof value === "object" ? "" : value;
    }
  };
  return (
    <Paper>
      <Card>
        <CardHeader title={"List of Fields"} subheader={"Please select a field to change"}/>
        <Divider component={"hr"}/>
        <CardContent>

          <List component={"div"}>
            {
              Object.entries(fields).map(([key, value]) => {
                return <DetailViewRow key={key} primary={value.label}
                                      secondary={getStringValue(key, value.defaultValue)}>
                  <IconButton href={"#"} onClick={e => isAdded(key) ? removeItem(key) : addItem(key, value)}>
                    {
                      isAdded(key) ? <Icon color={"primary"}>check_circle</Icon> :
                        <Icon color={"default"}>check_circle_outline</Icon>
                    }
                  </IconButton>
                </DetailViewRow>;
              })
            }
          </List>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={"List of Document"} subheader={"Please select document to change"}/>
        <Divider component={"hr"}/>
        <CardContent>

          <List component={"div"}>
            {
              documents.map((doc, key) => {
                return <DetailViewRow key={key} primary={doc.mime==="application/pdf"?"Portable Document(PDF)":"Image (JPEG,JPG,PNG)"}
                                      secondary={doc.name}>
                  <IconButton href={"#"}
                              onClick={e => isDocumentAdded(doc.name) ? removeDocument(doc.name) : addDocument(doc.name,doc)}>
                    {
                      isDocumentAdded(doc.name) ? <Icon color={"primary"}>check_circle</Icon> :
                        <Icon color={"default"}>check_circle_outline</Icon>
                    }
                  </IconButton>
                </DetailViewRow>;
              })
            }
          </List>
        </CardContent>
      </Card>
    </Paper>
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
      fields: {},
      selectedDocuments: {},
      documents: [],
      formData: []
    };
    this.documentService = new DocumentService();
  }

  componentDidMount() {
    this.documentService.fetch("shop",
      errorMsg => this.setGlobal({ errorMsg }),
      documents => {
        this.setState({
          documents
        });
      });
  }

  addField = (key, value) => {
    const { fields } = this.state;
    let arr = fields;
    arr[key] = value;
    this.setState({ fields: arr });
  };
  cancelChange = () => {
    const { fields } = this.state;
    fields.clear();
  };
  removeField = (key) => {
    const { fields } = this.state;
    let temp = fields;
    delete temp[key];
    this.setState({ fields: temp });
  };
  isAdded = (key) => {
    const { fields } = this.state;
    return Boolean(fields[key]);
  };
  addDocument = (key,document) => {
    const { selectedDocuments } = this.state;
    let temp=selectedDocuments;
    temp[key]=document;
    this.setState({selectedDocuments:temp})
  };
  isExistDocument = (key) => {
    const { selectedDocuments } = this.state;
    return Boolean(selectedDocuments[key]);
  };
  removeDocument = (key) => {
    const { selectedDocuments } = this.state;
    let temp = selectedDocuments;
    delete temp[key]
    this.setState({ selectedDocuments: temp });
  };
  submitForm = () => {

  };

  render() {
    const { open, onClose, application, classes } = this.props;
    const { fields, selectedDocuments,documents } = this.state;
    return (
      <Dialog open={open} TransitionComponent={Transition} onClose={onClose} fullScreen={true} fullWidth={true}
              maxWidth={"md"}>
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
              <FieldList documents={documents} addDocument={this.addDocument} isDocumentAdded={this.isExistDocument}
                         removeDocument={this.removeDocument} isAdded={this.isAdded} removeItem={this.removeField}
                         addItem={this.addField}
                         application={application}/>
            </Grid>
            <Grid item={true} md={9}>
              <ChangeForm selectedDocuments={selectedDocuments} application={application} selectedFields={fields}/>
              {/*<FieldForm getFieldValue={this.getFieldValue} changeInfo={this.changeInfo} application={application} fields={fields} onCancel={this.cancelChange}*/}
              {/*           onRemoveItem={this.removeField} onSubmit={this.submitForm}/>*/}
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
