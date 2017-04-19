import React from 'react';
import ContentEditable from './contenteditable.jsx';

export default class Card extends React.Component {
  constructor (props) {
    super(props);
  }
  
  render () {
    let {card, actions, container} = this.props;
    return (
      <div className="card" id={'card'+card.id}>
        <span style={{position: 'absolute', color: 'black', top: 5, right: 10, fontSize: '15px', fontWeight:'bold', cursor: 'pointer'}} onClick={()=>{actions.deleteCard(container, card)}}>X</span>
        <div className="card-header">
          <ContentEditable html = {card.user} container = {card} 
            onChange={(target)=>{actions.handleCardChange({type:'user',value: target.target.value,card:card, container: container})}} />
        </div>
        <div className="card-body">
          <ContentEditable html = {card.description} container = {card} 
            onChange={(target)=>{actions.handleCardChange({type:'description',value: target.target.value, card:card, container: container})}} />
        </div>
        <div className="card-status">
        <ContentEditable html = {card.status} container = {card} 
            onChange={(target)=>{actions.handleCardChange({type:'status',value: target.target.value,card:card, container: container})}} />
        </div>
      </div>
    );
  }
}