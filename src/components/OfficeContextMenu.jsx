import React from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { ListItemIcon, ListItemText, Menu } from "@material-ui/core";

const OfficeContextMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { menu } = props;
  const { menuItems } = menu;

  function toggleRightMenu(event) {
    setAnchorEl(anchorEl ? null : event.target);
  }

  return (
    <>
      {menu.textOnly ? (
        <Button
          variant={"text"}
          aria-controls="menu-list-grow"
          aria-haspopup="true"
          href={"#"}
          onClick={toggleRightMenu}
        >
          {menu.text}
        </Button>
      ) : (
        <IconButton onClick={toggleRightMenu} href={"#"}>
          {menu.icon}
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={event => setAnchorEl(null)}
        elevation={4}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        {menuItems.map((menuItem, index) => (
          <MenuItem
            key={index}
            component={"div"}
            divider={Boolean(menuItem.divider)}
            dense={true}
            button={true}
            onClick={e => {
              toggleRightMenu(e);
              menuItem.onClick(menuItem.name);
            }}
          >
            {menuItem.icon ? (
              <>
                <ListItemIcon style={{ minWidth: 40 }}>
                  {" "}
                  {menuItem.icon ? menuItem.icon : ""}
                </ListItemIcon>
                <ListItemText style={{ fontSize: 11 }}>
                  {menuItem.text}{" "}
                </ListItemText>
              </>
            ) : (
              <>
                <ListItemText>{menuItem.text} </ListItemText>
              </>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
OfficeContextMenu.propTypes = {
  menu: PropTypes.shape({
    textOnly: PropTypes.bool.isRequired,
    text: PropTypes.string,
    icon: PropTypes.node,
    menuItems: PropTypes.array
  }).isRequired
};
export default withRouter(OfficeContextMenu);
