import React, {Component} from 'react';
import Editor from "nib-core";

export const styles = {
  wrapper: {
    height: "250px",
  }
};

class TextEditor extends Component {
  render() {
    return (
        <Editor theme={styles} onChange={this.props.onChange} defaultValue={this.props.default}/>
    );
  }
}

export default TextEditor;