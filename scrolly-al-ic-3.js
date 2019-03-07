// script that gets loaded: 
var bookmarklet = (function(w,d,sb,$,models,cards,pub){

  var mainLoadable;

  var settings = { 
    consumer: { 
      firstName: "Dan",
      lastName: "Lee",
      addressLine1: "1029 E8th Ave",
      postalCode: "99547",
      city: "Denver",
      state: "CO",
      phone: '9177271311'
    }
  }; 

  var lastCard = null, doneSubmitting = false;

  var start = function(){
    doneSubmitting = false; 
    var postalCode = prompt('What postalCode would you like to use?', models.consumer.postalCode || '80218'); 
    mainLoadable = HA.ui.loadable('scrollingInterview');
    if(mainLoadable.getState() != 'initial') return mainLoadable.on('initial',start);
    $.extend(models.consumer,settings.consumer,models.consumer);
    models.consumer.email = "djlee5a1b2c." + Math.round(Math.random()*100000) + ".ememnemei2@edify.com";
    models.consumer.postalCode = postalCode;
    sb.bind('consumer',models.consumer);
    doSomeSubmitting();
  };

  var doSomeSubmitting = function(){
    if(cards.state.lastCard && cards.state.lastCard != lastCard) {
      lastCard = cards.state.lastCard;
      var name = cards.state.lastCard.getAttribute('name');  
      if(name == 'contactSubmitThree') doneSubmitting = true;
      $(cards.state.lastCard).find('form').find('input[type="submit"]').first().click();
    } 
    if(!doneSubmitting) { 
      w.setTimeout(doSomeSubmitting,80);
    }
  };

  pub.start = start; 

  return pub; 

})(window,document,simpleBind,HA.dom,HA.models,HA.interviewCards,EmitterFactory({}));