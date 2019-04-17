import React, {Component} from 'react';
import Editor from "nib-core";

class TextEditor extends Component {
    onChange(content) {
        console.log('onChange', content);
    }

    render() {
        return (
            <Editor />
        );
    }
}

export default TextEditor;