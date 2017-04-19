import React from 'react';
import ContentEditable from './contenteditable.jsx';
import CardContainer from './cardcontainer.jsx';

export default class SwimLane extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let {container, actions} = this.props;

    return (
      <div style={{margin:20, position: 'relative'}}>
        <div style={{position: 'relative'}}>
          <div style={{textAlign:'center',fontSize: '30px', background: '#F9B24F', margin: '0', color: 'white', cursor: 'cell',padding: 5, width: 'calc(300px - 10px)'}}>  
            <ContentEditable html = {container.title} container = {container} onChange={(target)=>{actions.handleTitleChange({target: target.target,container})}} />           
          </div>
          <span style={{position: 'absolute', color: 'white', top: 5, right: 10, fontSize: '20px', fontWeight:'bold', cursor: 'pointer'}} onClick={()=>{actions.deleteContainer(container)}}>X</span>
        </div>
        <CardContainer container = {container} actions = {actions} />
        <div className="add-card" onClick={()=>{actions.addCardInSwimLane(container)}}>
          Add Card +
         </div>
      </div>
    );
  }
}