import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import * as OfficeRoutes from "../../../config/routes-constant/OfficeRoutes";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";
import Icon from "@material-ui/core/es/Icon/Icon";
import { LoginService } from "../../../services/LoginService";
import { HOME } from "../../../config/routes-constant/OfficeRoutes";
import OfficeContextMenu from "../../OfficeContextMenu";
import { STAFF_PROFILE } from "../../../config/routes-constant/OfficeRoutes";

const menu = props => {
  const { history } = props;
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
      <div style={{ display: "flex", alignItems: "center" }}>
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
        <NavLink to={OfficeRoutes.EXISTING_ADVERTISEMENT}>
          <IconButton color="primary">
            <Icon>wallpaper</Icon>
          </IconButton>
        </NavLink>

        <CustomDropdown
          dropdownList={[
            { title: "Create New", link: OfficeRoutes.NEW_FILE },
            { title: "List Created By You", link: OfficeRoutes.CREATED_FILES },
            { title: "List Sent by You", link: OfficeRoutes.SENT_FILE },
            { title: "List New", link: OfficeRoutes.FILE_IN_ACTIVE_LIST },
            { title: "List Active", link: OfficeRoutes.FILE_ACTIVE_LIST },
            { title: "List Closed", link: OfficeRoutes.FILE_CLOSED_LIST },
            { title: "List Archived", link: OfficeRoutes.FILE_ARCHIVED_LIST }
          ]}
          linkClick={props.linkClick}
          buttonText={"File"}
          buttonProps={{ color: "transparent" }}
        />

        <CustomDropdown
          dropdownList={[
            { title: "Create New", link: OfficeRoutes.NEW_RECEIPT },
            { title: "List New", link: OfficeRoutes.RECEIPT_NEW_LIST },
            { title: "List Attached", link: OfficeRoutes.RECEIPT_ATTACHED_LIST }
          ]}
          linkClick={props.linkClick}
          buttonText={"Receipt"}
          buttonProps={{ color: "transparent" }}
        />

        <CustomDropdown
          dropup={true}
          dropdownList={[
            { title: "Advertiser", link: OfficeRoutes.ADVERTISER_NEW_LIST },
            { title: "Hoarding", link: OfficeRoutes.NEW_HOARDINGS },
            { title: "Kiosks", link: OfficeRoutes.NEW_KIOSKS },
            { title: "Banner/Advertisement", link: OfficeRoutes.NEW_BANNER },
            { title: "Shop", link: OfficeRoutes.NEW_SHOPLICENSE },
            { title: "Hotel", link: OfficeRoutes.NEW_HOTELLICENSE }
          ]}
          linkClick={props.linkClick}
          buttonText="New Applications"
          buttonProps={{ color: "transparent" }}
        />
        <OfficeContextMenu menu={contextMenu} />
        {/*<CustomDropdown
                    dropdownList={[
                        {title: "Under Process", link: OfficeRoutes.ADVERTISER_IN_PROCESS_LIST},
                        {title: "Approved List", link: OfficeRoutes.ADVERTISER_APPROVE_LIST},
                        {title: "Rejected List", link: OfficeRoutes.ADVERTISER_REJECT_LIST},
                        {title: "Cancelled List", link: OfficeRoutes.ADVERTISER_CANCEL_LIST}
                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Advertiser"}
                    buttonProps={{color: "transparent"}}/>

                <CustomDropdown
                    dropdownList={[
                        {title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_HOARDINGS},
                        {title: "Approved List", link: OfficeRoutes.APPROVED_HOARDINGS},
                        {title: "Reject List", link: OfficeRoutes.REJECTED_HOARDINGS}
                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Hoarding"}
                    buttonProps={{color: "transparent"}}/>
                <CustomDropdown
                    dropdownList={[
                        {title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_KIOSKS},
                        {title: "Approved List", link: OfficeRoutes.APPROVED_KIOSKS},
                        {title: "Reject List", link: OfficeRoutes.REJECTED_KIOSKS}

                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Kiosk"}
                    buttonProps={{color: "transparent"}}/>

                <CustomDropdown
                    dropdownList={[
                        {title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_BANNER},
                        {title: "Approved List", link: OfficeRoutes.APPROVED_BANNER},
                        {title: "Reject List", link: OfficeRoutes.REJECTED_BANNER}

                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Banner/Advertisement"}
                    buttonProps={{color: "transparent"}}/>
                <CustomDropdown
                    dropdownList={[
                        {title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_SHOPLICENSE},
                        {title: "Approved List", link: OfficeRoutes.APPROVED_SHOPLICENSE},
                        {title: "Reject List", link: OfficeRoutes.REJECTED_SHOPLICENSE}
                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Shop License"}
                    buttonProps={{color: "transparent"}}/>
                <CustomDropdown
                    dropdownList={[
                        {title: "Under Process", link: OfficeRoutes.UNDER_PROCESS_HOTELLICENSE},
                        {title: "Approved List", link: OfficeRoutes.APPROVED_HOTELLICENSE},
                        {title: "Reject List", link: OfficeRoutes.REJECTED_HOTELLICENSE}
                    ]}
                    linkClick={props.linkClick}
                    buttonText={"Hotel & Lodging"}
                    buttonProps={{color: "transparent"}}/>*/}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant={"caption"} color={"textSecondary"}>
          Hello {currentUser.staff.name} ({currentUser.staff.designation})
        </Typography>
        <IconButton>
          <Icon>account_circle_rounded</Icon>
        </IconButton>
        <NavLink to={OfficeRoutes.SETTING}>
          <IconButton>
            <Icon>settings</Icon>
          </IconButton>
        </NavLink>

        <Tooltip title={"Click here to log user out"}>
          <IconButton
            onClick={() => {
              new LoginService()
                .logout(
                  errorMessage => console.log(errorMessage),
                  successMessage => history.push(HOME)
                )
                .finally(() => console.log("log out request has been made"));
            }}
          >
            <Icon>power_settings_new</Icon>
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default withRouter(menu);
