import React from 'react';
import dragula from 'react-dragula'
import ReactDom from 'react-dom';
import Card from './card.jsx'

export default class CardContainer extends React.Component {
  
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    var container = ReactDom.findDOMNode(this);
    window.drake.containers.push(container);
  }

  render () {
    let {container, actions} = this.props;

    return (
      <div id={'swim' + container.id} className="swime-lanes">
        {
          container.cards.map((card)=>{
            return <Card card = {card} key= {card.id} actions={actions} container= {container} />
          })
        }
      </div>
    );
  }
}