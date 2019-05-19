import React, {Component} from 'react';
import OfficeSnackbar from "../../components/OfficeSnackbar";

class ErrorHandler extends Component {
  state = {
    open: true,
    errorMessage: null,
  };

  componentDidMount() {
    this.setState({errorMessage: this.props.messages});
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.state.open === false) this.setState({open: true, errorMessage: nextProps.messages});
  }

  onClose = () => {this.setState({open: false, errorMessage: null})};

  render() {
    const {open, errorMessage} = this.state;
    return <OfficeSnackbar open={open} onClose={this.onClose} variant="error" message={errorMessage}/>;
  };
}

class SuccessHandler extends Component {
  state = {
    open: true,
    successMessage: null,
  };

  componentDidMount() {
    this.setState({successMessage: this.props.messages});
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.state.open === false) this.setState({open: true, successMessage: nextProps.messages});
  }

  onClose = () => this.setState({open: false, successMessage: null});

  render() {
    const {open, successMessage} = this.state;
    return <OfficeSnackbar open={open} onClose={this.props.onClose} variant="success" message={successMessage}/>;
  };
}

export {SuccessHandler};
export default ErrorHandler;