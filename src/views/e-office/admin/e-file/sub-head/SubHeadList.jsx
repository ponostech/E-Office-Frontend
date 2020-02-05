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
import SubHeadCreateDialog from "./SubHeadCreateDialog";
import { MuiThemeProvider } from "@material-ui/core/styles";

class SubHeadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subHeads: [],
      selectedSubHead: null,

      openCreate: false,
      openEdit: false,
      openConfirm: false,

      submit: false,
      submitTitle: "Creating Sub Head"
    };
    this.fileHeadService = new FileHeadService();
  }

  componentDidMount() {
    this.setGlobal({ loading: false });
    this.fileHeadService
      .getHead(
        errorMsg => this.setGlobal({ errorMsg }),
        groupHeads => this.setState({ groupHeads })
      )
      .finally(() => this.setGlobal({ loading: false }));
  }

  onCreate = data => {
    this.setState({
      submitTitle: "Creating Sub Head",
      openCreate: false,
      submit: true
    });
    this.fileHeadService
      .create(
        data,
        errorMsg => this.setGlobal({ errorMsg }),
        successMsg => this.setGlobal({ successMsg })
      )
      .finally(() => {
        this.setState({ submit: false });
        this.componentDidMount();
      });
  };
  onDelete = () => {
    this.setState({
      submitTitle: "Deleting Group Head",
      openConfirm: false,
      submit: true
    });
    this.fileHeadService
      .delete(
        this.selectedGroupHead.id,
        errorMsg => this.setGlobal({ errorMsg }),
        successMsg => this.setGlobal({ successMsg })
      )
      .finally(() => {
        this.setState({ submit: false });
        this.componentDidMount();
      });
  };

  render() {
    const { subHeads } = this.state;
    const { submit, submitTitle, openCreate, openConfirm } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      rowsPerPage: 15
    };

    const tableColumns = [
      {
        name: "value",
        label: "VALUE"
      },
      {
        name: "label",
        label: "LABEL"
      },
      {
        name: "label",
        label: "MAIN"
      },
      {
        name: "created_at",
        label: "CREATED AT",
        options: {
          customBodyRender: rate => moment(rate).format("Do MMM YYY")
        }
      },
      {
        name: "id",
        label: "ACTION",
        options: {
          customBodyRender: (value, tableMeta) => {
            const { rowIndex } = tableMeta;
            let selectedSubHead = subHeads[rowIndex];

            return (
              <>
                <Tooltip title={"Edit"}>
                  <IconButton
                    href={"#"}
                    onClick={event =>
                      this.setState({ openEdit: true, selectedSubHead })
                    }
                  >
                    <Icon fontSize={"small"} color={"primary"}>
                      edit
                    </Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Delete"}>
                  <IconButton
                    href={"#"}
                    onClick={event =>
                      this.setState({ confirmDelete: true, selectedSubHead })
                    }
                  >
                    <Icon color={"secondary"} fontSize={"small"}>
                      delete
                    </Icon>
                  </IconButton>
                </Tooltip>
              </>
            );
          }
        }
      }
    ];
    return (
      <>
        <MuiThemeProvider theme={this.props.theme}>
          {this.global.loading ? (
            <LoadingView />
          ) : (
            <CardContent>
              <MUIDataTable
                title={"List of file sub-head"}
                data={subHeads}
                columns={tableColumns}
                options={tableOptions}
              />
              <Tooltip title="Add Note" aria-label="Add New Group Head">
                <Fab
                  onClick={event => this.setState({ openCreate: true })}
                  href={"#"}
                  color="primary"
                  aria-label="Add"
                  style={{ position: "fixed", right: 80, bottom: 100 }}
                >
                  <Icon>add</Icon>
                </Fab>
              </Tooltip>
            </CardContent>
          )}
          <SubHeadCreateDialog
            open={openCreate}
            onClose={e => this.setState({ openCreate: false })}
            onCreate={this.onCreate.bind(this)}
          />
          <SubmitDialog
            open={submit}
            title={submitTitle}
            text={"Please wait ... "}
          />
          <ConfirmDialog
            onCancel={e => this.setState({ openConfirm: false })}
            open={openConfirm}
            onConfirm={this.onDelete.bind(this)}
          />
        </MuiThemeProvider>
      </>
    );
  }
}

export default SubHeadList;
