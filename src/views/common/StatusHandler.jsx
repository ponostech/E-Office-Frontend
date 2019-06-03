import React, {Component} from 'reactn';
import OfficeSnackbar from "../../components/OfficeSnackbar";

class ErrorHandler extends Component {
  onClose = () => {this.setGlobal({errorMsg: ''})};

  render() {
    return <OfficeSnackbar open={Boolean(this.global.errorMsg)} onClose={this.onClose} variant="error"
                           message={this.global.errorMsg}/>;
  };
}

export class SuccessHandler extends Component {
  /*state = {
    open: true,
    successMessage: null,
  };
  componentDidMount() {
    this.setState({successMessage: this.props.messages});
  }
  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.state.open === false) this.setState({open: true, successMessage: nextProps.messages});
  }
  onClose = () => this.setState({open: false, successMessage: null});*/

  onClose = () => {
    if (this.global.successMsg) this.setGlobal({successMsg: ''})
  };

  render() {
    return <OfficeSnackbar open={Boolean(this.global.successMsg)} onClose={this.onClose} variant="success"
                           message={this.global.successMsg}/>;
  };
}

export default ErrorHandler;