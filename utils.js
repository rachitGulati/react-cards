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
    
    let allContainter = containers.map((cont) => {
      if(cont.id == container.id){
        cont.cards.map((c) => {
          if(c.id == card.id) { 
            switch(type) {
              case 'user':
                c.user = value;
                break;
              case 'description':
                c.description = value;
                break;
              case 'status':
                c.status = value;
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

    return allContainter;
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