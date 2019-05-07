import React, { Component } from "react";
import UserIcon from "@material-ui/core/SvgIcon/SvgIcon";
import NavPills from "../../components/NavPills/NavPills";
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip
} from "@material-ui/core";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";

function ShopInfo(props) {
  const { application } = props;
  let view = application ? (
    <>
      <TextField variant={"filled"} margin={"dense"} fullWidth={true} value={application.name} label={"Shop Name"}/>
      <TextField variant={"filled"} margin={"dense"} fullWidth={true} value={application.estd} label={"Shop ESTD"}/>
      <TextField variant={"filled"} margin={"dense"} fullWidth={true} value={application.address} label={"Location"}/>
    </>
  ) : "";
  return  view ;
}

function ApplicantInfo(props) {
  const { application } = props;
  let view = application ? (
    <>
      <TextField variant={"filled"} margin={"dense"} fullWidth={true} value={application.owner}
                 label={"Shop Owner Name"}/>
      <TextField variant={"filled"} margin={"dense"} fullWidth={true} value={application.phone} label={"Phone"}/>
      <TextField variant={"filled"} margin={"dense"} fullWidth={true} value={application.email} label={"Email"}/>
      <TextField variant={"filled"} margin={"dense"} fullWidth={true} value={application.owner_address}
                 label={"Address"}/>
    </>
  ) : "";
  return  view ;
}

function DocumentView(props) {
  const { documents } = props;
  let view = props.shop ? (
    <List>
      {
        documents.map(function(item, index) {
          return (
            <ListItem key={index}>
              <ListItemText>
                {item.name}
              </ListItemText>
            </ListItem>
          );
        })
      }
    </List>
  ) : "";
  return { view };
}

class ShopApplicationDialog extends Component {
  render() {
    const { open, onClose, application } = this.props;
    return (
      <Dialog onClose={onClose} open={open} fullWidth={true} maxWidth={"lg"}>
        <CardHeader action={
          <>
            <Tooltip title={"Close"}>
              <IconButton onClick={onClose}><CloseIcon/></IconButton>
            </Tooltip>
          </>
        }/>
        {
          application ?
            <NavPills
              horizontal={{
                tabsGrid: { xs: 12, sm: 12, md: 2 },
                contentGrid: { xs: 12, sm: 12, md: 10 }
              }}
              tabs={[
                {
                  tabButton: "Applicant Info",
                  tabIcon: UserIcon,
                  tabContent: (<ApplicantInfo application={application}/>)
                },
                {
                  tabButton: "Shop Info",
                  tabIcon: UserIcon,
                  tabContent: (<ShopInfo application={application}/>)
                }, {
                  tabButton: "Documents",
                  tabIcon: UserIcon,
                  tabContent: (<DocumentView documents={application.documents}/>)
                }
              ]}
            />
            : ""
        }

        <DialogActions>
          <Button variant={"outlined"} color={"secondary"} onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ShopApplicationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  application: PropTypes.object
};
export default ShopApplicationDialog;