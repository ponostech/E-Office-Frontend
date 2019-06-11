import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";
import Icon from "@material-ui/core/es/Icon/Icon";
import { LoginService } from "../../../services/LoginService";
import * as OfficeRoutes from "../../../config/routes-constant/OfficeRoutes";

const styles = {
  menuWrapper: {
    display: "flex",
    alignItems: "center"
  },
  "@media print": {
    menuWrapper: {
      display: "none"
    }
  }
};

const menu = (props) => {
  const { history, classes } = props;
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  return (
    <>
      <div className={classes.menuWrapper}>
        <NavLink to={OfficeRoutes.E_OFFICE}><IconButton color="primary"><Icon>apps</Icon></IconButton></NavLink>
        <NavLink to={OfficeRoutes.DESK}><IconButton color="primary"><Icon>inbox</Icon></IconButton></NavLink>
        <CustomDropdown
          dropdownList={[
            { title: "Create New", link: OfficeRoutes.NEW_FILE },
            // {title: "List Created By You", link: OfficeRoutes.CREATED_FILES},
            // {title: "List Sent by You", link: OfficeRoutes.SENT_FILE},
            { title: "List New", link: OfficeRoutes.FILE_IN_ACTIVE_LIST },
            { title: "List Closed", link: OfficeRoutes.FILE_CLOSED_LIST },
            { title: "List Archived", link: OfficeRoutes.FILE_ARCHIVED_LIST },
            { title: "List Active", link: OfficeRoutes.FILE_ACTIVE_LIST }
          ]}
          buttonText={"File"}
          buttonProps={{ color: "transparent" }}/>

        <CustomDropdown
          dropdownList={[
            { title: "Create New", link: OfficeRoutes.NEW_RECEIPT },
            {title: "List New", link: OfficeRoutes.RECEIPT_NEW_LIST},
            {title: "List Attached", link: OfficeRoutes.RECEIPT_ATTACHED_LIST},

          ]}
          buttonText={"Receipt"}
          buttonProps={{ color: "transparent" }}/>

        <CustomDropdown
          dropdownList={[
            { title: "New Application", link: OfficeRoutes.ADVERTISER_NEW_LIST },
            { title: "Under Process", link: OfficeRoutes.ADVERTISER_IN_PROCESS_LIST },
            { title: "Approved List", link: OfficeRoutes.ADVERTISER_APPROVE_LIST },
            { title: "Rejected List", link: OfficeRoutes.ADVERTISER_REJECT_LIST },
            { title: "Cancelled List", link: OfficeRoutes.ADVERTISER_CANCEL_LIST }
          ]}
          buttonText={"Advertiser"}
          buttonProps={{ color: "transparent" }}/>

        <CustomDropdown
          dropdownList={[
            { title: "New Application", link: OfficeRoutes.NEW_HOARDINGS },
            { title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_HOARDINGS },
            { title: "Approved List", link: OfficeRoutes.APPROVED_HOARDINGS },
            { title: "Reject List", link: OfficeRoutes.REJECTED_HOARDINGS }
          ]}
          buttonText={"Hoarding"}
          buttonProps={{ color: "transparent" }}/>
        <CustomDropdown
          dropdownList={[
            { title: "New Application", link: OfficeRoutes.NEW_KIOSKS },
            { title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_KIOSKS },
            { title: "Approved List", link: OfficeRoutes.APPROVED_KIOSKS },
            { title: "Reject List", link: OfficeRoutes.REJECTED_KIOSKS }

          ]}
          buttonText={"Kiosk"}
          buttonProps={{ color: "transparent" }}/>

        <CustomDropdown
          dropdownList={[
            { title: "New Application", link: OfficeRoutes.NEW_BANNER },
            { title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_BANNER },
            { title: "Approved List", link: OfficeRoutes.APPROVED_BANNER },
            { title: "Reject List", link: OfficeRoutes.REJECTED_BANNER }

          ]}
          buttonText={"Banner"}
          buttonProps={{ color: "transparent" }}/>
        <CustomDropdown
          dropdownList={[
            { title: "New Application", link: OfficeRoutes.NEW_SHOPLICENSE },
            { title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_SHOPLICENSE },
            { title: "Approved List", link: OfficeRoutes.APPROVED_SHOPLICENSE },
            { title: "Reject List", link: OfficeRoutes.REJECTED_SHOPLICENSE },
            { title: "Cancelled List", link: OfficeRoutes.CANCELLED_SHOPLICENSE }

          ]}
          buttonText={"Shop License"}
          buttonProps={{ color: "transparent" }}/>
        <CustomDropdown
          dropdownList={[
            { title: "New Application", link: OfficeRoutes.NEW_HOTELLICENSE },
            { title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_HOTELLICENSE },
            { title: "Approved List", link: OfficeRoutes.APPROVED_HOTELLICENSE },
            { title: "Rejected List", link: OfficeRoutes.REJECTED_HOTELLICENSE },
            { title: "Cancelled List", link: OfficeRoutes.CANCELLED_HOTELLICENSE }

          ]}
          buttonText={"Hotel & Lodging"}
          buttonProps={{ color: "transparent" }}/>

        <CustomDropdown
          dropdownList={[
            { title: "New Trade", link: OfficeRoutes.TRADE_NEW },
            { title: "List Trade", link: OfficeRoutes.TRADE_LIST },
            { title: "New Staff", link: OfficeRoutes.STAFF_REGISTRATION },
            { title: "List Staff", link: OfficeRoutes.STAFF_LIST },
            { title: "Permit Template", link: OfficeRoutes.PERMIT_TEMPLATE },
            { title: "License Template", link: OfficeRoutes.LICENSE_TEMPLATE },
            { title: "Rejected Template", link: OfficeRoutes.REJECTED_TEMPLATE },
            { title: "Cancelled Template", link: OfficeRoutes.CANCELLED_TEMPLATE },
            { title: "Site Verifications", link: OfficeRoutes.SITE_VERIFICATION_LIST }

          ]}
          buttonText={"Admin Control"}
          buttonProps={{ color: "transparent" }}/>

        <CustomDropdown
          dropdownList={[
            { title: "Report One", link: OfficeRoutes.OBPAS },
            { title: "Report Two", link: OfficeRoutes.OBPAS }
          ]}
          buttonText={"Report"}
          buttonProps={{ color: "transparent" }}/>
      </div>
      <div className={classes.menuWrapper}>
        <Typography variant={"caption"}
                    color={"textSecondary"}>Hello {currentUser.staff.name} ({currentUser.staff.designation})</Typography>
        <IconButton><Icon>account_circle_rounded</Icon></IconButton>
        <NavLink to={OfficeRoutes.SETTING}>
          <IconButton><Icon>settings</Icon></IconButton>
        </NavLink>

        <Tooltip title={"Click here to log user out"}>
          <IconButton style={{ color: "red" }} onClick={() => {
            new LoginService()
              .logout(errorMessage => console.log(errorMessage), successMessage => history.push(OfficeRoutes.HOME))
              .finally(() => console.log("log out request has been made"));
          }}>
            <Icon>power_settings_new</Icon>
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default withRouter(withStyles(styles)(menu));