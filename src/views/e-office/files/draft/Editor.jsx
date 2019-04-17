import React, {Component} from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';


//Import bootstrap(v3 or v4) dependencies
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

const styles = theme => {

};

class Editor extends Component {
    onChange(content) {
        console.log('onChange', content);
    }

    render() {
        return (
            <ReactSummernote
                value="Default value"
                options={{
                    height: 350,
                    dialogsInBody: true,
                    toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['fontname', ['fontname']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture', 'video']],
                        ['view', ['fullscreen', 'codeview']]
                    ]
                }}
                onChange={this.onChange}
            />
        );
    }
}

export default Editor;