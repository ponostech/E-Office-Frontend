import React, { Component } from "reactn";
import { Fab, Icon, Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import LoadingView from "../../../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { FileHeadService } from "../../../../../services/FileHeadService";
import SubmitDialog from "../../../../../components/SubmitDialog";
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import MainHeadCreateDialog from "./MainHeadCreateDialog";
import { MuiThemeProvider } from "@material-ui/core/styles";

class MainHeadList extends Component {
  constructor(props) {
    super(props);
    this.state = {

      mainHeads: [],
      selectedMainHead: null,

      openCreate: false,
      openEdit: false,
      openConfirm: false,

      submit: false,
      submitTitle: "Creating Group Head"
    };
    this.fileHeadService = new FileHeadService();
  }

  componentDidMount() {
    this.setGlobal({ loading: false });
    this.fileHeadService.getAllMain("main", errorMsg => this.setGlobal({ errorMsg }),
      mainHeads => this.setState({ mainHeads }))
      .finally(() => this.setGlobal({ loading: false }));
  }

  onCreate = (data) => {
    this.setState({ submitTitle: "Creating Main Head", openCreate: false, submit: true });
    this.fileHeadService.create(data,
      errorMsg => this.setGlobal({ errorMsg }),
      successMsg => this.setGlobal({ successMsg }))
      .finally(() => {
        this.setState({ submit: false });
        this.componentDidMount();
      });
  };
  onDelete = () => {
    this.setState({ submitTitle: "Creating Group Head", openConfirm: false, submit: true });
    this.fileHeadService.delete(this.selectedGroupHead.id,
      errorMsg => this.setGlobal({ errorMsg }),
      successMsg => this.setGlobal({ successMsg }))
      .finally(() => {
        this.setState({ submit: false });
        this.componentDidMount();
      });
  };

  render() {
    const { mainHeads, selectedMainHead } = this.state;
    const { submit, submitTitle, openCreate, openConfirm, openEdit } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      rowsPerPage: 15
    };

    const tableColumns = [
      {
        name: "value",
        label: "VALUE"
      }, {
        name: "label",
        label: "LABEL"
      }, {
        name: "created_at",
        label: "CREATED AT",
        options: {
          customBodyRender: rate => moment(rate).format("Do MMM YYY")
        }
      }, {
        name: "category",
        label: "CATEGORY"
      }, {
        name: "id",
        label: "ACTION",
        options: {
          customBodyRender: (value, tableMeta) => {
            const { rowIndex } = tableMeta;
            let selectedMainHead = mainHeads[rowIndex];

            return (
              <>
                <Tooltip title={"Edit"}>
                  <IconButton href={"#"} onClick={event => this.setState({ openEdit: true, selectedMainHead })}>
                    <Icon fontSize={"small"} color={"primary"}>edit</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Delete"}>
                  <IconButton href={"#"} onClick={event => this.setState({ confirmDelete: true, selectedMainHead })}>
                    <Icon color={"secondary"} fontSize={"small"}>delete</Icon>
                  </IconButton>
                </Tooltip>
              </>
            );
          }
        }
      }];
    return (
      <>
        <MuiThemeProvider theme={this.props.theme}>
          {this.global.loading ? <LoadingView/> :
            <CardContent>
              <MUIDataTable
                title={"Rate of advertisement"}
                data={mainHeads}
                columns={tableColumns}
                options={tableOptions}
              />
              <Tooltip title="Create New Main Head" aria-label="Add New Group Head">
                <Fab onClick={event => this.setState({ openCreate: true })} href={"#"} color="primary" aria-label="Add"
                     style={{ position: "fixed", right: 80, bottom: 100 }}>
                  <Icon>add</Icon>
                </Fab>
              </Tooltip>
            </CardContent>
          }
          <MainHeadCreateDialog open={openCreate} onClose={e => this.setState({ openCreate: false })}
                                onCreate={this.onCreate.bind(this)}/>
          <SubmitDialog open={submit} title={submitTitle} text={"Please wait ... "}/>
          <ConfirmDialog onCancel={e => this.setState({ openConfirm: false })} open={openConfirm}
                         onConfirm={this.onDelete.bind(this)}/>
        </MuiThemeProvider>
      </>
    );
  }
}

export default MainHeadList;