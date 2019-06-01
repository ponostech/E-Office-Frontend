import React, {Component} from 'reactn';
import OfficeSnackbar from "../../components/OfficeSnackbar";

class ErrorHandler extends Component {
  /*
    componentDidMount() {
      this.setState({errorMessage: this.props.messages});
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
      if (this.state.open === false) this.setState({open: true, errorMessage: nextProps.messages});
    }
  */

  onClose = () => this.setGlobal({errorMsg: ''});

  render() {
    return <OfficeSnackbar open={Boolean(this.global.errorMsg)} onClose={this.onClose} variant="error" message={this.global.errorMsg}/>;
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