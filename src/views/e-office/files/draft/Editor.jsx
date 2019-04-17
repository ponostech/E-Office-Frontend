import React, {Component} from 'react';
import Editor from "nib-core";

class TextEditor extends Component {

    onChange(content) {
        console.log('onChange', content);
    }

    render() {
        return (
            <Editor onChange={this.onChange} />
        );
    }
}

export default TextEditor;