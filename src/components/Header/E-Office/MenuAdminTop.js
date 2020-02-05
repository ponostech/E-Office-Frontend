import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { IconButton, Typography } from "@material-ui/core";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";
import Icon from "@material-ui/core/es/Icon/Icon";
import { LoginService } from "../../../services/LoginService";
import * as OfficeRoutes from "../../../config/routes-constant/OfficeRoutes";
import OfficeContextMenu from "../../OfficeContextMenu";
import { STAFF_PROFILE } from "../../../config/routes-constant/OfficeRoutes";

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

const menu = props => {
  const { history, classes } = props;
  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  const onContextMenuClick = menu => {
    switch (menu) {
      case "log_out":
        new LoginService()
          .logout(
            errorMsg => console.log(errorMsg),
            successMessage => history.push(OfficeRoutes.HOME)
          )
          .finally(() => console.log("log out request has been made"));
        break;
      case "account":
        history.push(STAFF_PROFILE);
        break;
      default:
        break;
    }
  };
  const contextMenu = {
    icon: <Icon>account_circle_rounded</Icon>,
    textOnly: false,
    menuItems: [
      {
        name: "profile",
        icon: <Icon fontSize={"small"}>user</Icon>,
        text: `Welcome `,
        onClick: onContextMenuClick,
        divider: true
      },
      {
        name: "account",
        icon: <Icon fontSize={"small"}>edit</Icon>,
        text: "My Account",
        onClick: onContextMenuClick
      },
      {
        name: "log_out",
        icon: <Icon fontSize={"small"}>power_settings_new</Icon>,
        text: "Log out",
        onClick: onContextMenuClick
      }
    ]
  };
  return (
    <>
      <div className={classes.menuWrapper}>
        <NavLink to={OfficeRoutes.E_OFFICE}>
          <IconButton color="primary">
            <Icon>apps</Icon>
          </IconButton>
        </NavLink>
        <NavLink to={OfficeRoutes.DESK}>
          <IconButton color="primary">
            <Icon>inbox</Icon>
          </IconButton>
        </NavLink>
        <NavLink to={OfficeRoutes.CHALLAN_LIST}>
          <IconButton color="primary">
            <Icon>account_balance_wallet</Icon>
          </IconButton>
        </NavLink>
        <CustomDropdown
          dropdownList={[
            { title: "Create New", link: OfficeRoutes.NEW_FILE },
            // {title: "List Created By You", link: OfficeRoutes.CREATED_FILES},
            // {title: "List Sent by You", link: OfficeRoutes.SENT_FILE},
            { title: "List New", link: OfficeRoutes.FILE_IN_ACTIVE_LIST },
            { title: "List Active", link: OfficeRoutes.FILE_ACTIVE_LIST },
            { title: "List Closed", link: OfficeRoutes.FILE_CLOSED_LIST },
            { title: "List Archived", link: OfficeRoutes.FILE_ARCHIVED_LIST }
          ]}
          buttonText={"File"}
          buttonProps={{ color: "transparent" }}
        />

        <CustomDropdown
          dropdownList={[
            { title: "Create New", link: OfficeRoutes.NEW_RECEIPT },
            { title: "List New", link: OfficeRoutes.RECEIPT_NEW_LIST },
            { title: "List Attached", link: OfficeRoutes.RECEIPT_ATTACHED_LIST }
          ]}
          buttonText={"Receipt"}
          buttonProps={{ color: "transparent" }}
        />

        <CustomDropdown
          dropdownList={[
            {
              title: "New Application",
              link: OfficeRoutes.ADVERTISER_NEW_LIST
            },
            {
              title: "Under Process",
              link: OfficeRoutes.ADVERTISER_IN_PROCESS_LIST
            },
            {
              title: "Approved List",
              link: OfficeRoutes.ADVERTISER_APPROVE_LIST
            },
            {
              title: "Rejected List",
              link: OfficeRoutes.ADVERTISER_REJECT_LIST
            },
            {
              title: "Cancelled List",
              link: OfficeRoutes.ADVERTISER_CANCEL_LIST
            }
          ]}
          buttonText={"Advertiser"}
          buttonProps={{ color: "transparent" }}
        />

        <CustomDropdown
          dropdownList={[
            { title: "New Application", link: OfficeRoutes.NEW_HOARDINGS },
            {
              title: "Under Process",
              link: OfficeRoutes.UNDER_PROCESS_HOARDINGS
            },
            { title: "Approved List", link: OfficeRoutes.APPROVED_HOARDINGS },
            { title: "Reject List", link: OfficeRoutes.REJECTED_HOARDINGS },
            { title: "Cancelled List", link: OfficeRoutes.CANCELLED_HOARDINGS }
          ]}
          buttonText={"Hoarding"}
          buttonProps={{ color: "transparent" }}
        />
        <CustomDropdown
          dropdownList={[
            { title: "New Application", link: OfficeRoutes.NEW_KIOSKS },
            { title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_KIOSKS },
            { title: "Approved List", link: OfficeRoutes.APPROVED_KIOSKS },
            { title: "Reject List", link: OfficeRoutes.REJECTED_KIOSKS },
            { title: "Cancelled List", link: OfficeRoutes.CANCELLED_KIOSKS }
          ]}
          buttonText={"Kiosk"}
          buttonProps={{ color: "transparent" }}
        />

        <CustomDropdown
          dropdownList={[
            { title: "New Application", link: OfficeRoutes.NEW_BANNER },
            { title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_BANNER },
            { title: "Approved List", link: OfficeRoutes.APPROVED_BANNER },
            { title: "Reject List", link: OfficeRoutes.REJECTED_BANNER },
            { title: "Cancelled List", link: OfficeRoutes.CANCELLED_BANNER }
          ]}
          buttonText={"Banner"}
          buttonProps={{ color: "transparent" }}
        />
        <CustomDropdown
          dropdownList={[
            {
              title: "Unpaid Application List",
              link: OfficeRoutes.UNPAID_SHOPLICENSE
            },
            { title: "New Application", link: OfficeRoutes.NEW_SHOPLICENSE },
            {
              title: "Under Process",
              link: OfficeRoutes.UNDER_PROCESS_SHOPLICENSE
            },
            { title: "Approved List", link: OfficeRoutes.APPROVED_SHOPLICENSE },
            { title: "Reject List", link: OfficeRoutes.REJECTED_SHOPLICENSE },
            {
              title: "Cancelled List",
              link: OfficeRoutes.CANCELLED_SHOPLICENSE
            }
          ]}
          buttonText={"Shop License"}
          buttonProps={{ color: "transparent" }}
        />
        <CustomDropdown
          dropdownList={[
            { title: "New Application", link: OfficeRoutes.NEW_HOTELLICENSE },
            {
              title: "Under Process",
              link: OfficeRoutes.UNDER_PROCESS_HOTELLICENSE
            },
            {
              title: "Approved List",
              link: OfficeRoutes.APPROVED_HOTELLICENSE
            },
            {
              title: "Rejected List",
              link: OfficeRoutes.REJECTED_HOTELLICENSE
            },
            {
              title: "Cancelled List",
              link: OfficeRoutes.CANCELLED_HOTELLICENSE
            }
          ]}
          buttonText={"Hotel & Lodging"}
          buttonProps={{ color: "transparent" }}
        />

        <CustomDropdown
          dropdownList={[
            { title: "Advertisers", link: OfficeRoutes.ADVERTISERS },
            {
              title: "Hoarding/kiosk",
              link: OfficeRoutes.EXISTING_ADVERTISEMENT
            },
            { title: "List Trade", link: OfficeRoutes.TRADE_LIST },
            { title: "New Staff", link: OfficeRoutes.STAFF_REGISTRATION },
            { title: "List Staff", link: OfficeRoutes.STAFF_LIST },
            { title: "File Index", link: OfficeRoutes.FILE_HEAD },
            { title: "Advertisement Rates", link: OfficeRoutes.RATE_LIST },
            // { title: "Permit Template", link: OfficeRoutes.PERMIT_TEMPLATE },
            {
              title: "License/Permit Template",
              link: OfficeRoutes.LICENSE_TEMPLATE
            },
            {
              title: "Rejected Template",
              link: OfficeRoutes.REJECTED_TEMPLATE
            },
            {
              title: "Cancelled Template",
              link: OfficeRoutes.CANCELLED_TEMPLATE
            },
            {
              title: "Site Verifications",
              link: OfficeRoutes.SITE_VERIFICATION_LIST
            }
          ]}
          buttonText={"Admin Control"}
          buttonProps={{ color: "transparent" }}
        />

        {/*<NavLink style={{padding:10,color:"#4d4d4d", textTransform: "capitalize", fontSize: 14}} to={OfficeRoutes.CHALLAN_LIST}>Challan</NavLink>*/}

        <CustomDropdown
          dropdownList={[
            { title: "Report One", link: OfficeRoutes.OBPAS },
            { title: "Report Two", link: OfficeRoutes.OBPAS }
          ]}
          buttonText={"Report"}
          buttonProps={{ color: "transparent" }}
        />
      </div>
      <div className={classes.menuWrapper}>
        <Typography variant={"caption"} color={"textSecondary"}>
          Hello {currentUser.staff.name} ({currentUser.staff.designation})
        </Typography>

        <OfficeContextMenu menu={contextMenu} />
      </div>
    </>
  );
};

export default withRouter(withStyles(styles)(menu));
