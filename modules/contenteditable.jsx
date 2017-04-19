import React from 'react';
import ReactDOM from 'react-dom';

export default class ContentEditable extends React.Component {
    constructor(props){
        super(props);
        this.emitChange = this.emitChange.bind(this);
    }
    render(){
        return <div 
            onInput={this.emitChange} 
            onBlur={this.emitChange}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
    }

    shouldComponentUpdate(nextProps){
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }

    emitChange(e){
        var html = ReactDOM.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
}
