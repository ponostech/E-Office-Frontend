import React, { Component } from "react";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem, ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip
} from "@material-ui/core";
import { SITE_VERIFICATION } from "../../../config/routes-constant/OfficeRoutes";
import AddIcon from "@material-ui/icons/Add";
import { SiteVerificationService } from "../../../services/SiteVerificationService";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import ConfirmDialog from "../../../components/ConfirmDialog";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ViewIcon from "@material-ui/icons/RemoveRedEye";
import EditIcon from "@material-ui/icons/Edit";

class SiteVerificationFormList extends Component {
  siteVerificationService = new SiteVerificationService();
  state = {
    templates: [],
    selectedData: null,

    openDelete: false,
    loading: false,

    errorMessage: ""
  };

  componentDidMount() {
    this.props.doLoad(true);
    this.siteVerificationService.allTemplate(errorMessage => this.setState({ errorMessage }),
      templates => this.setState({ templates }))
      .finally(() => this.props.doLoad(false));
  }

  viewDetails = (data) => {

  };
  edit = (data) => {

  };
  confirmDelete = (data) => {
    this.setState({ openDelete: false });
    // this.siteVerificationService.deleteTemplate(data.id)

  };

  render() {
    const { templates, loading } = this.state;

    return (
      <div>
        <Card>
          <CardHeader title={"List of site verification templates"} subheader={"Be careful to edit and create"}/>
          <Divider/>
          <CardContent>

            <GridContainer justify={"center"}>
              <GridItem md={8}>
                <GridItem md={12}>
                  <List>
                    {this.state.templates.map((item, index) => (
                      <ListItem>
                        <ListItemIcon color={"primary"} >
                          {index}
                        </ListItemIcon>
                        <ListItemText primary={"Type of Site verification (" + item.type + ")"}
                                      secondary={"Created at :" + moment(item.created_at).format("Do-MMMM-YYYY")}/>
                        <ListItemSecondaryAction>
                          <>
                            <Tooltip title={"View form"}>
                              <IconButton>
                                <ViewIcon fontSize={"small"} color={"action"}/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={"Edit"}>
                              <IconButton>
                                <EditIcon fontSize={"small"} color={"action"}/>
                              </IconButton>
                            </Tooltip>
                          </>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </GridItem>
              </GridItem>
            </GridContainer>

          </CardContent>
          <CardActions>

          </CardActions>
        </Card>

        <Fab style={{ position: "absolute", bottom: 60, right: 60 }} href={SITE_VERIFICATION}
             color={"primary"}><AddIcon/></Fab>
        <OfficeSnackbar variant={"error"} open={Boolean(this.state.errorMessage)} message={this.state.errorMessage}
                        onClose={e => this.setState({ errorMessage: "" })}/>
        <ConfirmDialog onCancel={e => this.setState({ openDelete: false })} open={this.state.openDelete}
                       onConfirm={this.confirmDelete.bind(this)}/>
      </div>
    );
  }
}

export default SiteVerificationFormList;