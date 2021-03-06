import React, { Component } from "reactn";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  TextField
} from "@material-ui/core";
import FileUpload from "../../../components/FileUpload";
import Grid from "@material-ui/core/Grid";
import LoadingView from "../../common/LoadingView";
import OfficeSelect from "../../../components/OfficeSelect";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import ReceiptService from "../../../services/ReceiptService";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import SubmitDialog from "../../../components/SubmitDialog";

const delivery_modes = [
  { value: "by Hand", label: "By Hand" },
  { value: "by Post", label: "By Post" },
  { value: "by Courier", label: "By Courier" },
  { value: "by Diplomatic Bag", label: "By Diplomatic Bag" },
  { value: "by Email", label: "By Email" },
  { value: "by Fax", label: "By Fax" },
  { value: "by File", label: "By File" },
  { value: "by Registered", label: "By Registered" },
  { value: "by Post", label: "By Post" },
  { value: "by Self Generated", label: "By Self Generated" },
  { value: "Special", label: "Special" },
  { value: "speed post", label: "Speed post" }
];

let branches = [];
let classifications = [];
let types = [
  { value: "Letter", label: "Letter" },
  { value: "Meeting", label: "Meeting" },
  { value: "Notice", label: "Notice" },
  { value: "Minute", label: "Minute" },
  { value: "Document", label: "Document" },
  { value: "EFC", label: "EFC" },
  { value: "EGOM", label: "EGOM" },
  { value: "File", label: "File" },
  { value: "Acknowledgement", label: "Acknowledgement" },
  { value: "Bill", label: "Bill" },
  { value: "Memorandum", label: "Memorandum" },
  { value: "Others", label: "Others" }
];

class ReceiptEdit extends Component {
  receiptService = new ReceiptService();
  state = {
    id: null,
    subject: "",
    classification: undefined,
    language: "",
    delivery_mode: undefined,
    type: undefined,
    received_date: Date(),
    letter_date: Date(),
    sender_type: "",
    sender_address: "",
    letter_ref_no: "",
    branch: undefined,
    document: "",

    subjectError: "",
    classificationError: "",
    languageError: "",
    deliveryModeError: "",
    typeError: "",
    receiveDateError: "",
    letterDateError: "",
    senderTypeError: "",
    senderAddressError: "",
    branchError: "",

    submit: false
  };

  componentDidMount() {
    console.log();
    this.setGlobal({ loading: true });

    Promise.all([this.getReceipt(), this.fetchResource()]).finally(() =>
      this.setGlobal({ loading: false })
    );
  }

  getReceipt = async () => {
    const { id } = this.props.match.params;
    await this.receiptService.get(
      id,
      errorMsg => this.setGlobal({ errorMsg }),
      receipt => {
        this.setState({
          id: receipt.id,
          subject: receipt.subject,
          classification: {
            value: receipt.classification,
            label: receipt.classification
          },
          language: receipt.language,
          delivery_mode: {
            value: receipt.delivery_mode,
            label: receipt.delivery_mode
          },
          type: { value: receipt.type, label: receipt.type },
          received_date: moment(receipt.received_date),
          letter_date: moment(receipt.letter_date),
          sender_type: receipt.sender_type,
          sender_address: receipt.sender_address,
          letter_ref_no: receipt.letter_ref_no,
          branch: { value: receipt.branch, label: receipt.branch },
          document: receipt.document
        });
      }
    );
  };

  fetchResource = async () => {
    await this.receiptService.fetchResource(
      errorMsg => this.setGlobal({ errorMsg }),
      (b, c) => {
        branches = b;
        classifications = c;
      }
    );
  };

  handleRequired = (name, event) => {
    switch (name) {
      case "subject":
        !Boolean(this.state.subject)
          ? this.setState({ subjectError: "Subject is required" })
          : this.setState({ subjectError: "" });
        break;
      case "language":
        !Boolean(this.state.language)
          ? this.setState({ languageError: "Language is required" })
          : this.setState({ languageError: "" });
        break;
      case "letter_date":
        !Boolean(this.state.letter_date)
          ? this.setState({ letterDateError: "Letter date is required" })
          : this.setState({ letterDateError: "" });
        break;
      case "received_date":
        !Boolean(this.state.received_date)
          ? this.setState({ receiveDateError: "Received date is required" })
          : this.setState({ receiveDateError: "" });
        break;
      case "branch":
        this.state.branch === undefined
          ? this.setState({ branchError: "Branch is required" })
          : this.setState({ branchError: "" });
        break;
      case "classification":
        this.state.classification === undefined
          ? this.setState({ classificationError: "Classification is required" })
          : this.setState({ classificationError: "" });
        break;
      case "type":
        this.state.type === undefined
          ? this.setState({ typeError: "Type of receipt is required" })
          : this.setState({ typeError: "" });
        break;
      case "delivery_mode":
        this.state.delivery_mode === undefined
          ? this.setState({ deliveryModeError: "Delivery mode is required" })
          : this.setState({ deliveryModeError: "" });
        break;
      default:
        break;
    }
  };
  handleChanged = (name, event) => {
    switch (name) {
      case "letter_date":
        this.setState({ letter_date: event });
        break;
      case "received_date":
        this.setState({ received_date: event });
        break;
      case "branch":
        this.setState({ branch: event });
        break;
      case "classification":
        this.setState({ classification: event });
        break;
      case "type":
        this.setState({ type: event });
        break;
      case "delivery_mode":
        this.setState({ delivery_mode: event });
        break;
      default:
        this.setState({ [name]: event.target.value });
        break;
    }
  };
  handleClick = (name, event) => {
    const {
      id,
      subject,
      classification,
      language,
      delivery_mode,
      type,
      received_date,
      letter_date,
      sender_address,
      sender_type,
      branch,
      document,
      letter_ref_no
    } = this.state;

    switch (name) {
      case "submit":
        let data = {
          receipt_no: Date.now(),
          subject,
          classification: classification.value,
          language,
          branch: branch.value,
          delivery_mode: delivery_mode.value,
          type: type.value,
          received_date: moment(received_date).format("Y-MM-DD"),
          letter_date: moment(letter_date).format("Y-MM-DD"),
          sender_address,
          sender_type,
          letter_ref_no,
          document
        };
        this.setState({ submit: true });
        this.receiptService
          .update(
            id,
            data,
            errorMsg => this.setGlobal({ errorMsg }),
            successMsg => this.setGlobal({ successMsg })
          )
          .finally(() => this.setState({ submit: false }));
        break;
      case "clear":
        window.location.reload();
        break;
      default:
        break;
    }
  };

  render() {
    const {
      subject,
      classification,
      language,
      delivery_mode,
      type,
      received_date,
      letter_date,
      sender_address,
      sender_type,
      branch,
      letter_ref_no,
      document,
      submit
    } = this.state;
    const {
      subjectError,
      classificationError,
      languageError,
      deliveryModeError,
      typeError,
      receiveDateError,
      letterDateError,
      senderAddressError,
      senderTypeError,
      branchError
    } = this.state;

    let view = this.global.loading ? (
      <LoadingView />
    ) : (
      <Grid container={true} justify={"center"} alignItems={"flex-start"}>
        <Grid md={6} lg={6}>
          <Paper style={{ margin: 10, padding: 20 }}>
            <FileUpload
              document={{
                id: 0,
                mandatory: 1,
                name: "document",
                mime: "application/pdf"
              }}
              onUploadSuccess={data => {
                this.setState({
                  document: data.location
                });
              }}
              onUploadFailure={err => console.log(err)}
            />
            <object
              style={{ height: "80vh" }}
              data={this.state.document}
              type="application/pdf"
              width="100%"
              height="100%"
            >
              <p>
                It appears you don't have a PDF plugin for this browser. You can{" "}
                <a href={this.state.document}>
                  click here to download the PDF file.
                </a>
              </p>
            </object>
          </Paper>
        </Grid>

        <Grid spacing={10} md={6} lg={6}>
          <Card>
            <CardHeader title={"Edit Receipt"} />
            <Divider component={"li"} />
            <CardContent>
              <TextField
                value={subject}
                error={Boolean(subjectError)}
                helperText={subjectError}
                name={"subject"}
                margin={"dense"}
                fullWidth={true}
                required={true}
                variant={"outlined"}
                label={"Subject"}
                onBlur={this.handleRequired.bind(this, "subject")}
                onChange={this.handleChanged.bind(this, "subject")}
              />

              <OfficeSelect
                value={classification}
                label={"Classification"}
                name={"classification"}
                variant={"outlined"}
                margin={"dense"}
                required={true}
                fullWidth={true}
                helperText={classificationError}
                error={Boolean(classificationError)}
                onBlur={this.handleRequired.bind(this, "classification")}
                onChange={this.handleChanged.bind(this, "classification")}
                options={classifications}
              />

              <OfficeSelect
                value={branch}
                label={"Branch"}
                name={"branch"}
                variant={"outlined"}
                margin={"dense"}
                required={true}
                fullWidth={true}
                helperText={branchError}
                error={Boolean(branchError)}
                onBlur={this.handleRequired.bind(this, "branch")}
                onChange={this.handleChanged.bind(this, "branch")}
                options={branches}
              />

              <TextField
                value={language}
                error={Boolean(languageError)}
                helperText={languageError}
                name={"language"}
                margin={"dense"}
                fullWidth={true}
                required={true}
                variant={"outlined"}
                label={"Language"}
                onBlur={this.handleRequired.bind(this, "language")}
                onChange={this.handleChanged.bind(this, "language")}
              />

              <OfficeSelect
                value={delivery_mode}
                label={"Mode of Delivery"}
                name={"delivery_mode"}
                variant={"outlined"}
                margin={"dense"}
                required={true}
                fullWidth={true}
                helperText={deliveryModeError}
                error={Boolean(deliveryModeError)}
                onBlur={this.handleRequired.bind(this, "delivery_mode")}
                onChange={this.handleChanged.bind(this, "delivery_mode")}
                options={delivery_modes}
              />

              <OfficeSelect
                value={type}
                label={"Type of receipt"}
                name={"type"}
                variant={"outlined"}
                margin={"dense"}
                required={true}
                fullWidth={true}
                helperText={typeError}
                error={Boolean(typeError)}
                onBlur={this.handleRequired.bind(this, "type")}
                onChange={this.handleChanged.bind(this, "type")}
                options={types}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  fullWidth={true}
                  InputLabelProps={{ shrink: true }}
                  label={"Date of letter"}
                  error={Boolean(letterDateError)}
                  helperText={letterDateError}
                  margin="dense"
                  name={"letter_date"}
                  variant="outlined"
                  value={letter_date}
                  onChange={this.handleChanged.bind(this, "letter_date")}
                  format={"dd/MM/yyyy"}
                />
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  fullWidth={true}
                  InputLabelProps={{ shrink: true }}
                  label={"Received on"}
                  error={Boolean(receiveDateError)}
                  helperText={receiveDateError}
                  margin="dense"
                  name={"receive_date"}
                  variant="outlined"
                  value={received_date}
                  onChange={this.handleChanged.bind(this, "received_date")}
                  format={"dd/MM/yyyy"}
                />
              </MuiPickersUtilsProvider>

              <TextField
                value={sender_type}
                error={Boolean(senderTypeError)}
                helperText={senderTypeError}
                name={"sender_type"}
                margin={"dense"}
                fullWidth={true}
                required={true}
                variant={"outlined"}
                label={"Type of Sender"}
                onBlur={this.handleRequired.bind(this, "sender_type")}
                onChange={this.handleChanged.bind(this, "sender_type")}
              />

              <TextField
                multiline={true}
                rows={2}
                value={sender_address}
                error={Boolean(senderAddressError)}
                helperText={senderAddressError}
                name={"sender_address"}
                margin={"dense"}
                fullWidth={true}
                required={true}
                variant={"outlined"}
                label={"Address of Sender"}
                onBlur={this.handleRequired.bind(this, "sender_address")}
                onChange={this.handleChanged.bind(this, "sender_address")}
              />

              <TextField
                value={letter_ref_no}
                name={"subject"}
                margin={"dense"}
                fullWidth={true}
                variant={"outlined"}
                label={"Letter Ref. No"}
                onBlur={this.handleRequired.bind(this, "letter_ref_no")}
                onChange={this.handleChanged.bind(this, "letter_ref_no")}
              />
            </CardContent>

            <Divider component={"li"} />

            <CardActions>
              <Button
                disabled={
                  !Boolean(subject) ||
                  !Boolean(classification) ||
                  !Boolean(language) ||
                  !Boolean(delivery_mode) ||
                  !Boolean(type) ||
                  !Boolean(received_date) ||
                  !Boolean(letter_date) ||
                  !Boolean(branch) ||
                  !Boolean(document)
                }
                href={"#"}
                variant={"outlined"}
                color={"primary"}
                onClick={this.handleClick.bind(this, "submit")}
              >
                Update
              </Button>
              <Button
                href={"#"}
                variant={"outlined"}
                color={"secondary"}
                onClick={this.handleClick.bind(this, "clear")}
              >
                Reset
              </Button>
            </CardActions>
          </Card>

          <SubmitDialog
            open={submit}
            text={"Please wait ... "}
            title={"Update Receipt"}
          />
        </Grid>
      </Grid>
    );
    return view;
  }
}

export default ReceiptEdit;
