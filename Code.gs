var TrelloClass = function(key, token){
  /*
  var Trello = new TrelloClass(llave, token);
  var cards = Trello.getCardsfromList("5b604cf3de3db23095c24b10");
  */
  
  this.llave = key;
  this.token = token;
  this.url = "https://api.trello.com/1/"
  
  this.getChecklistsFromCard = function (card){
    var requesturl = this.url+"cards/"+card+"/checklists?key="+this.llave+"&token="+this.token;
    var response = UrlFetchApp.fetch(requesturl);
    var json = response.getContentText();
    var data = JSON.parse(json);
    return data;
  }
  
  this.getCardsfromList = function (list){
    var requesturl = this.url+"lists/"+list+"/cards?key="+this.llave+"&token="+this.token;
    var response = UrlFetchApp.fetch(requesturl);
    var json = response.getContentText();
    var data = JSON.parse(json);
    return data;
  }
  
  this.addChecklistToCard = function (card,checklistid,pos){
    var requesturl = this.url+"cards/"+card+"/checklists?key="+this.llave+"&token="+this.token+"&idChecklistSource="+checklistid+"&pos="+pos;
    Logger.log(requesturl);
    var options = {
      'method' : 'post'
    };
    var response = UrlFetchApp.fetch(requesturl,options);
    var json = response.getContentText();
    var data = JSON.parse(json);
    return data;
  }

}