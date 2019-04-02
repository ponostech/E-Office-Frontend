import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display:'flex',
    justify:"center"
  }
});

function convertMessage(messages) {
  let arr = [];
  messages.forEach(function(msg, index) {
    let para=<p>{msg}</p>
    arr.push(para)
  });
  return arr;
}

function OfficeSnackbar(props) {
  const { classes, duration, position, open, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <Snackbar open={open}
              onClose={onClose}
              autoHideDuration={duration}
              anchorOrigin={position}
              bodyStyle={{ height: 'auto', lineHeight: '28px', padding: 24, whiteSpace: 'pre-line' }}
    >
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <div id="client-snackbar"  className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)}/>
            {
              Array.isArray(message)?convertMessage(message):<p>{message}</p>
            }

        </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon}/>
          </IconButton>
        ]}
        {...other}
      />
    </Snackbar>
  );
}

OfficeSnackbar.defaultProps = {
  variant: "success",
  duration: 5000,
  position:
    { vertical: "top", horizontal: "right" }
};
OfficeSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired,
  open: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  position: PropTypes.object
};

export default withStyles(styles1)(OfficeSnackbar);


