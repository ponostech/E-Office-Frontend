import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import MenuList from "@material-ui/core/MenuList"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"
import {LoginService} from "../../../services/LoginService"
import * as OfficeRoutes from "../../../config/routes-constant/OfficeRoutes"
import {withRouter} from "react-router-dom"

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
  menuList: {
    fontSize: 13,
  },
  logOut: {
    color: 'red',
    marginLeft: 4,
  }
}));

export const logOut = (props) => {
  new LoginService()
      .logout(errorMessage => console.log(errorMessage), successMessage => props.history.push(OfficeRoutes.HOME))
      .finally(() => console.log("log out request has been made"));
}

const SimplePopper = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const currentUser = JSON.parse(localStorage.getItem('current_user'));

  function toggleRightMenu(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
      <div>
        <Button
            aria-controls="menu-list-grow"
            aria-haspopup="true"
            onClick={toggleRightMenu}
        >
          <IconButton href={"#"}>
            <Icon>account_circle_rounded</Icon>
          </IconButton>
        </Button>

        <Popper style={{zIndex: 100000}} id={id} open={open} anchorEl={anchorEl} transition>
          {({TransitionProps}) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <ClickAwayListener onClickAway={toggleRightMenu}>
                    <MenuList>
                      <MenuItem className={classes.menuList}>
                        Hello {currentUser.staff.name} ({currentUser.staff.designation})
                      </MenuItem>
                      <MenuItem onClick={toggleRightMenu} className={classes.menuList}>
                        My Account
                      </MenuItem>
                      <MenuItem className={classes.menuList}>
                        Settings
                      </MenuItem >
                      <MenuItem onClick={() => logOut(props)} className={classes.menuList}>
                        Log Out <Icon className={classes.logOut}>power_settings_new</Icon>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Fade>
          )}
        </Popper>
      </div>
  );
}

export default withRouter(SimplePopper);


    {/*<div>
          <Button
              aria-controls="menu-list-grow"
              aria-haspopup="true"
              onClick={toggleRightMenu}
          >
            <IconButton href={"#"}>
              <Icon>account_circle_rounded</Icon>
            </IconButton>
          </Button>

          <Popper
              placement="left-start"
              open={Boolean(openRightMenu)}
              transition disablePortal>
            {({TransitionProps, placement}) => (
                <Grow
                    {...TransitionProps}
                    style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                >
                  <Paper id="menu-list-grow">
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList>
                        <MenuItem
                            onClick={handleClose}>Hello {currentUser.staff.name} ({currentUser.staff.designation})</MenuItem>
                        <MenuItem onClick={handleClose}>My Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Tooltip title={"Click here to log user out"}>
                            <IconButton style={{color: "red"}} onClick={() => logOut(props)} href={"#"}>
                              <Icon>power_settings_new</Icon>
                            </IconButton>
                          </Tooltip>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
            )}
          </Popper>
        </div>*/
}