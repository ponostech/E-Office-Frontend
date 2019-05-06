import React, {Component} from 'react';
import Editor from "nib-core";

class TextEditor extends Component {
    render() {
        return (
            <Editor onChange={this.props.onChange} defaultValue={this.props.default}/>
        );
    }
}

export default TextEditor;