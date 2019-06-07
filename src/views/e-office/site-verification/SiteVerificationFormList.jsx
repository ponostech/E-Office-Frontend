import React, {Component} from "reactn";
import moment from "moment";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip
} from "@material-ui/core";
import {SiteVerificationService} from "../../../services/SiteVerificationService";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ViewIcon from "@material-ui/icons/RemoveRedEye";
import EditIcon from "@material-ui/icons/Edit";
import LoadingView from "../../common/LoadingView";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SiteVerificationFormPreviewDialog
  from "../../../components/form-builder/preview/SiteVerificationFormPreviewDialog";
import AddIcon from "@material-ui/icons/Add";
import {SITE_VERIFICATION, SITE_VERIFICATION_EDIT} from "../../../config/routes-constant/OfficeRoutes";
import {withRouter} from "react-router-dom";

class SiteVerificationFormList extends Component {
  siteVerificationService = new SiteVerificationService();
  state = {
    templates: [],
    template: null,

    openDelete: false,
    openPreview: false,

  };

  componentDidMount() {
    this.setGlobal({loading: true});
    this.siteVerificationService.allTemplate(errorMsg => this.setState({errorMsg}),
        templates => this.setState({templates}))
        .finally(() => {
          this.setGlobal({loading: false})
        });
  }

  handlePreview = (template) => {
    this.setState({openPreview: true, template});
  };
  edit = (template) => {
    const {history} = this.props;
    history.push(SITE_VERIFICATION_EDIT(template.type))

  };
  confirmDelete = (data) => {
    this.setState({openDelete: false});
    // this.siteVerificationService.deleteTemplate(data.id)

  };

  render() {
    const {history} = this.props;

    return (
        <>
          {
            this.global.loading ? <LoadingView/> :
                <Card>
                  <CardHeader title={"List of site verification templates"}
                              subheader={"Be careful to edit and create"}/>
                  <Divider component={"hr"}/>
                  <CardContent>

                    <GridContainer justify={"center"}>
                      <GridItem md={8}>
                        <GridItem md={12}>
                          <List component={"div"}>
                            {this.state.templates.map((item, index) => (
                                <ListItem component={"div"}>
                                  <ListItemIcon color={"primary"}>
                                    <Avatar component={"div"} style={{margin: 10}}>{index}</Avatar>
                                  </ListItemIcon>
                                  <ListItemText primary={"Type of Site verification (" + item.type + ")"}
                                                secondary={"Created at :" + moment(item.created_at).format("Do-MMMM-YYYY")}/>
                                  <ListItemSecondaryAction>
                                    <>
                                      <Tooltip title={"View form"}>
                                        <IconButton href={"#"} onClick={this.handlePreview.bind(this, item)}>
                                          <ViewIcon fontSize={"small"} color={"action"}/>
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title={"Edit"}>
                                        <IconButton href={"#"} onClick={this.edit.bind(this, item)}>
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
                  < Fab style={{position: "absolute", bottom: 90, right: 90}}
                        onClick={e => history.push(SITE_VERIFICATION)}
                        color={"primary"}><AddIcon/></Fab>
                </Card>


          }

          <ConfirmDialog onCancel={e => this.setState({openDelete: false})} open={this.state.openDelete}
                         onConfirm={this.confirmDelete.bind(this)}/>

          <SiteVerificationFormPreviewDialog open={this.state.openPreview}
                                             onClose={e => this.setState({openPreview: false})}
                                             template={this.state.template}/>
        </>
    );
  }
}

export default withRouter(SiteVerificationFormList);