import React from 'react';
import ReactDom from 'react-dom';
import SwimLane from './modules/swimlane.jsx'
import Utils from './utils.js'
import dragula from 'react-dragula'

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {containers: JSON.parse(localStorage.getItem('data')) || []};
    this.addNewSwimLane = this.addNewSwimLane.bind(this);
    this.addCardInSwimLane = this.addCardInSwimLane.bind(this);
    this.deleteContainer = this.deleteContainer.bind(this);
    this.getEmptyContainer = this.getEmptyContainer.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.syncStoreWithState = this.syncStoreWithState.bind(this);
  }

  syncStoreWithState(allContainter){
    this.setState({containers:allContainter});
    localStorage.setItem('data', JSON.stringify(allContainter));
  }

  deleteContainer(container){
    let answer = confirm('Are your sure to delete it? If yes, click `OK`.')
    if(answer){
      let containersLeft = Utils.removeContainer(this.state.containers, container);
      this.syncStoreWithState(containersLeft);
    }
  }

  deleteCard(container, card) {
    let allContainter = Utils.deleteCard(this.state.containers, container, card);
    this.syncStoreWithState(allContainter);
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
    
    this.syncStoreWithState(allContainter);
    
  }

  addNewSwimLane(){
    if(this.state.containers){
      let containers = this.state.containers.concat(this.getEmptyContainer());
      this.syncStoreWithState(containers);
    }
  }

  handleTitleChange({target,container}){
    let allContainter = Utils.changeContainerTitle(this.state.containers, container, target.value);
    this.syncStoreWithState(allContainter);
  }
  
  handleCardChange({type, container, card, value}){
    let {allContainter, synch} = Utils.updateCard(this.state.containers, container, card, type, value);
    if(synch){
      this.syncStoreWithState(allContainter);  
    }
  }

  componentDidMount(){
    var self = this;
    window.drake.on('drop',function(el, target, source, sibling){
      let cardId = el.id.replace('card','');
      let targetContainerId = target.id.replace('swim','');
      let sourceContainerId = source.id.replace('swim','');
      let siblingCardId = -1;
      if(sibling){
        siblingCardId = sibling.id.replace('card','');
      }
      let allContainter = JSON.parse(localStorage.getItem('data'));
      let allNewContainers = Utils.changeCardPosition(allContainter, targetContainerId, sourceContainerId, cardId, siblingCardId);
      localStorage.setItem('data', JSON.stringify(allContainter));
      drake.cancel(true); // Hack to stop changing DOM.
      self.setState({containers:allContainter});
    });
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
/*Init the drag and drop library*/
window.drake = dragula([]);
ReactDom.render(<App/>, document.getElementById('app'));