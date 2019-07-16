import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { ListItemIcon, ListItemText, Menu } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  },
  menuList: {
    fontSize: 13
  },
  logOut: {
    color: "red",
    marginLeft: 4
  }
}));

const OfficeContextMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { menu } = props;
  const { menuItems } = menu;

  function toggleRightMenu(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  return (
    <>
      {menu.textOnly ?
        <Button variant={"text"} aria-controls="menu-list-grow"
                aria-haspopup="true" href={"#"} onClick={toggleRightMenu}>{menu.text}
        </Button> :
        <IconButton onClick={toggleRightMenu} href={"#"}>
          {menu.icon}
        </IconButton>}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={event => setAnchorEl(null)}
        elevation={4}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        {menuItems.map((menuItem, index) =>
          <MenuItem component={"div"} button={""}>
            <ListItem component={"div"} button={true} onClick={event => menuItem.onClick()}>
              {
                menuItem.icon?
                  <>
                    <ListItemIcon style={{ minWidth: 40 }}> {menuItem.icon ? menuItem.icon : ""}</ListItemIcon>
                    <ListItemText>{menuItem.text} </ListItemText>
                  </>:
                  <>
                    <ListItemText>{menuItem.text} </ListItemText>
                  </>
              }

            </ListItem>
          </MenuItem>
        )}
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