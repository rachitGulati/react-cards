import React from 'react';
import ReactDom from 'react-dom';
import SwimLane from './modules/swimlane.jsx'
import Utils from './utils.js'
import dragula from 'react-dragula'

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {containers: props.containers || []};
    this.addNewSwimLane = this.addNewSwimLane.bind(this);
    this.addCardInSwimLane = this.addCardInSwimLane.bind(this);
    this.deleteContainer = this.deleteContainer.bind(this);
    this.getEmptyContainer = this.getEmptyContainer.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.synchStoreWithState = this.synchStoreWithState.bind(this);
  }
  synchStoreWithState(allContainter){
    this.setState({containers:allContainter});
    localStorage.setItem('data', JSON.stringify(allContainter));
  }
  deleteContainer(container){
    let answer = confirm('Are your sure to delete it? If yes, click `OK`.')
    if(answer){
      let containersLeft = Utils.removeContainer(this.state.containers, container);
      this.synchStoreWithState(containersLeft);
    }
  }
  
  deleteCard(container, card) {
    let allContainter = Utils.deleteCard(this.state.containers, container, card);
    this.synchStoreWithState(allContainter);
  }

  getEmptyContainer(){
    return {title:'New  title',id:Date.now(),cards:[]};
  }

  addCardInSwimLane(container){
    let card = {
      user:'Type User Name...',
      description: 'Type Description...',
      id: Date.now(),
      status: 'Status...'
    };
    
    let allContainter = Utils.addCard(this.state.containers, container, card, -1);
    
    this.synchStoreWithState(allContainter);
    
  }

  addNewSwimLane(){
    if(this.state.containers){
      let containers = this.state.containers.concat(this.getEmptyContainer());
      this.synchStoreWithState(containers);
    }
  }

  handleTitleChange({target,container}){
    let allContainter = Utils.changeContainerTitle(this.state.containers, container, target.value);
    this.synchStoreWithState(allContainter);
  }
  
  handleCardChange({type, container, card, value}){
    let allContainter = Utils.updateCard(this.state.containers, container, card, type, value);
    this.synchStoreWithState(allContainter);
  }

  render () {
    let {containers} = this.state,
    actions = {addCardInSwimLane: this.addCardInSwimLane, deleteContainer: this.deleteContainer, 
        handleTitleChange: this.handleTitleChange, handleCardChange: this.handleCardChange, 
        deleteCard: this.deleteCard}
    return (<div>
      <p className="main-title">IXIGO Task Board</p>
      <div className="main-container">
      {
        containers.length >0 && containers.map((container)=>{
         
        return <SwimLane container = {container} actions = {actions} key={container.id} />

      })
      }
        <div id='dummy' className="swime-lanes" style={{position: 'relative', margin: 20, height: 535}}>
          <p style={{color: 'black', position:'absolute', top: '50%', left:'50%', transform: 'translate(-50%, -50%)', fontSize:'1.5em', cursor:'pointer'}} onClick={this.addNewSwimLane}>(+) New Lane</p>
        </div>
      </div>
    </div>
    );
  }
}

let containersList = JSON.parse(localStorage.getItem('data'));
window.drake = dragula([]);
ReactDom.render(<App containers = {containersList} />, document.getElementById('app'));

// window.drake.on('drop',function(el, target, source, sibling){
//   let cardid = el.id.replace('card','');
//   let targetid = target.id.replace('swim','');
//   let sourceid = source.id.replace('swim','');
//   let siblingId = -1;
//   console.log(el, target, source, sibling);
//   if(sibling){
//     siblingId = el.id.replace('card','');
//   }
//   if(sourceid === targetid){
//     allContainter = containers.map((cont) => {
//       let siblingIndex = -1, cardIndex;
      
//       if(cont.id == sourceid){
//         for(let i=0;i<cont.cards.length;i++) {
//           if(cont.cards[i].id == cardid) {
//             cardIndex = i;
//           }else if(cont.cards[i].id == siblingId) {
//             siblingIndex = i;
//           }
//         }
//         if(siblingIndex == -1){
//           let card ;
//           cont.cards = cont.cards.filter(function(c){
//             if(c.id != cardid){
//               return true;
//             }else{
//               card = c;
//             }
//           });
//           cont.cards.concat(card);
//         }else{
//           cont.cards.splice(siblingIndex - 1, 0, this.splice(cardIndex, 1)[0]);
//         }
//       }
//       return cont;
//     });