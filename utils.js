export default class Utils {
  
  static addCard(containers, container, card, position) {

    let allContainter = containers.map((cont) => {
      if(cont.id == container.id){
        if(position === -1){
          cont.cards.push(card)
        }
        else{
          cont.cards.splice(position, 0, card);
        }
      }
    return cont;
    });

    return allContainter;
  }
  
  static updateCard(containers, container, card, type, value) {
    let synch = false;
    let allContainter = containers.map((cont) => {
      if(cont.id == container.id){
        cont.cards.map((c) => {
          if(c.id == card.id) { 
            switch(type) {
              case 'user':
                if(c.user !=value){
                  c.user = value;
                  synch = true; 
                }
                break;
              case 'description':
                if(c.description != value){
                  c.description = value;
                  synch = true; 
                }
                break;
              case 'status':
                if(c.status != value){
                  c.status = value;
                  synch = true;   
                }
                break;
              default:
                break;
            }
          }
          return c;
        });
      }
    return cont;
    });

    return {allContainter:allContainter, synch:synch};
  }

  static deleteCard(containers, container, card) {
    let allContainter = containers.map((cont) => {
      if(cont.id == container.id){
        cont.cards = cont.cards.filter((c) => {
          if(c.id != card.id) { 
            return true;
          }
        });
      }
    return cont;
    });

    return allContainter;
  }
  
  static removeContainer(containerList, container) {
    
    let otherContainter = containerList.filter((cont) => {
        if(cont.id != container.id){
          return true;
        }
      });

    return otherContainter;
  }
  
  static getContainerById(allContainter, containerId){
    
    let container;
    allContainter.forEach((cont) => {
        if(cont.id == containerId){
          container = cont;
        }
      });

    return container;
  }
  
  static getCardById(container, cardId){
    let card;
    container.cards.forEach((c) => {
      if(c.id == cardId){
        card = c;
      }
    });

    return card;
  }
  static getCardPosition(container, card){
    let position = 0;

    container.cards.forEach((c, index) => {
      if(c.id == card.id){
        position = index;
      }
    });

    return position;
  }
  static changeCardPosition(allContainter, targetContainerId, sourceContainerId, cardId, siblingCardId){
    let sourceContainer = Utils.getContainerById(allContainter, sourceContainerId)
    let targetContainerForSibling = Utils.getContainerById(allContainter, targetContainerId);
    let card = Utils.getCardById(sourceContainer, cardId);
    let siblingCard;
    let positionToAddCard;

    if(siblingCardId == -1){
      positionToAddCard = -1;
    }else{
      siblingCard = Utils.getCardById(targetContainerForSibling, siblingCardId);  
      positionToAddCard = Utils.getCardPosition(targetContainerForSibling, siblingCard);
    }

    let allContainerAfterDeletiong = Utils.deleteCard(allContainter, sourceContainer, card);
    let targetContainerForAddingCard = Utils.getContainerById(allContainerAfterDeletiong, targetContainerId);
    let finalContainers = Utils.addCard(allContainter, targetContainerForAddingCard, card, positionToAddCard);
    return finalContainers;
  }

  static changeContainerTitle(containerList, container, newTitle) {
    
    let allContainter = containerList.map((cont) => {
        if(cont.id == container.id){
          cont.title = newTitle;
        }
        return cont;
      });

    return allContainter;
  }

}