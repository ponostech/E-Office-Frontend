import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  firstCell: {
    fontWeight: 'bold',
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const BannerDetailDialog = (props) => {
  const {classes} = props;
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.close}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={props.close} aria-label="Close">
            <CloseIcon/>
          </IconButton>
          <Typography variant="subtitle2" color="inherit" className={classes.flex}>
            Banner Application Details
          </Typography>
          <Button color="inherit" onClick={props.close}>
            Close Detail
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button>
          <ListItemText primary="Name of Applicant" secondary="Lalhriatrenga"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Address" secondary="Mualpui, Aizawl, Mizoram"/>
        </ListItem>
      </List>
      <Paper>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className={classes.firstCell} align="right">Name of Applicant:</TableCell>
              <TableCell>Lalhmingthanga</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.firstCell} align="right">Address:</TableCell>
              <TableCell>Republic</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.firstCell} align="right">Location:</TableCell>
              <TableCell>Lily Veng</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.firstCell} align="right">Name of Applicant:</TableCell>
              <TableCell>Lalhmingthanga</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.firstCell} align="right">Name of Applicant:</TableCell>
              <TableCell>Lalhmingthanga</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Dialog>
  );
};

export default withStyles(styles)(BannerDetailDialog);

