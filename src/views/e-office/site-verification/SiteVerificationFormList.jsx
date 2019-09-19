import React, { Component } from "reactn";
import moment from "moment";
import {
  Avatar, Button,
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
  Tooltip, withStyles
} from "@material-ui/core";
import { SiteVerificationService } from "../../../services/SiteVerificationService";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ViewIcon from "@material-ui/icons/RemoveRedEye";
import EditIcon from "@material-ui/icons/Edit";
import LoadingView from "../../common/LoadingView";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SiteVerificationFormPreviewDialog
  from "../../../components/form-builder/preview/SiteVerificationFormPreviewDialog";
import AddIcon from "@material-ui/icons/Add";
import { SITE_VERIFICATION, SITE_VERIFICATION_EDIT } from "../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";


const styles = theme => ({
  action:{
    margin:0
  }
});
class SiteVerificationFormList extends Component {
  siteVerificationService = new SiteVerificationService();
  state = {
    templates: [],
    template: null,

    openDelete: false,
    openPreview: false

  };

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.siteVerificationService.allTemplate(errorMsg => this.setState({ errorMsg }),
      templates => this.setState({ templates }))
      .finally(() => {
        this.setGlobal({ loading: false });
      });
  }

  handlePreview = (template) => {
    this.setState({ openPreview: true, template });
  };
  edit = (template) => {
    const { history } = this.props;
    history.push(SITE_VERIFICATION_EDIT(template.type));

  };
  confirmDelete = (data) => {
    this.setState({ openDelete: false });
    // this.siteVerificationService.deleteTemplate(data.id)

  };

  render() {
    const { history,classes } = this.props;

    return (
      <>
        {
          this.global.loading ? <LoadingView/> :


            <GridContainer justify={"flex-start"}>
              <GridItem md={8}>
                <Card>
                  <CardHeader classes={{action:classes.action}} title={"List of site verification templates"} action={
                                <Button onClick={e=>history.push(SITE_VERIFICATION)}  href={"#"} color={"primary"} variant={"outlined"}>
                                  New Site Verification
                                </Button>
                  } />
                  <Divider component={"hr"}/>
                  <CardContent>
                    <List component={"div"}>
                      {this.state.templates.map((item, index) => (
                        <ListItem component={"div"}>
                          <ListItemIcon color={"primary"}>
                            <Avatar component={"div"} style={{ margin: 10 }}>{index}</Avatar>
                          </ListItemIcon>
                          <ListItemText primary={"Type of Site verification (" + item.type + ")"}
                                        secondary={"Created at :" + moment(item.created_at).format("Do-MMMM-YYYY")}/>
                          <ListItemSecondaryAction>
                            <>
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
                  </CardContent>
                  <CardActions style={{justifyContent:"flex-end"}}>
                    {/*< Fab href={"#"}*/}
                    {/*      onClick={e => history.push(SITE_VERIFICATION)}*/}
                    {/*      color={"primary"}><AddIcon/></Fab>*/}

                  </CardActions>
                </Card>
              </GridItem>
            </GridContainer>


        }

        <ConfirmDialog onCancel={e => this.setState({ openDelete: false })} open={this.state.openDelete}
                       onConfirm={this.confirmDelete.bind(this)}/>

      </>
    );
  }
}

export default withStyles(styles)(withRouter(SiteVerificationFormList));