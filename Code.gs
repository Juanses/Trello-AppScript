function learning(){
  var listid = "5b604d162ee8b571530914fa";
  var url = "https://api.trello.com/1/";
  var trellodata = {
    "pos": "top",
    "name": "Nombre",
    //"idMembers": data["trelloresponsable"],
    "idLabels" : "5b604ccc9c16fb124a1f0d36",
    "due": data["date"],
    "desc" : "**Responsable** : "+data["responsable"]+"%0A"+"**Contact Mutuelle** : "+data["contact"]+"%0A"+"**Nom du partenaire** : "+data["partenaire"]+"%0A"+"**Nom de l'entreprise** : "+data["entreprise"]+"%0A"+"**Adresse de l'entreprise** : ["+data["entreprise"]+"](https://www.google.com/maps/search/"+data["adresse"].replace(" ", "+")+")"+"%0A"+"**Type de PSS** : "+data["type"]+"%0A"+"**Médecin du travail** : "+data["drdutravail"]+"%0A"+"**Nombre de patients prévu** : "+data["nombre"]
  }
  
  var trello = new TrelloClass(llave,token);
  trello.createCardinList(listid,trellodata);
}


var TrelloClass = function(key, token){
  /*
  var Trello = new TrelloClass(llave, token);
  var cards = Trello.getCardsfromList("5b604cf3de3db23095c24b10");
  */
  
  this.llave = key;
  this.token = token;
  this.url = "https://api.trello.com/1/" 
  
  /**
  * Creates a new Card in a List 
  *
  * @listid {string} the Id of the List
  * @data {object} parameters
  */
  this.createCardinList = function(listid,data,pos){
    var arguments = ""
    for (var key in data){
      arguments += "&"+key+"="+data[key]
    }
    var options = {
      'method' : 'post'
    };
    var requesturl = this.url+"cards/?key="+this.llave+"&token="+this.token+"&idList="+listid+arguments+"&pos="+pos;
    Logger.log(requesturl);
    var response = UrlFetchApp.fetch(requesturl,options);
    var json = response.getContentText();
    var data = JSON.parse(json);
    return data;
    
  }
  
  this.getListsFromBoard = function (boardid){
    var requesturl = this.url+"boards/"+boardid+"/lists?key="+this.llave+"&token="+this.token;
    var response = UrlFetchApp.fetch(requesturl);
    var json = response.getContentText();
    var data = JSON.parse(json);
    return data; 
  }
  
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
  
  /**
  * Creates a new Card in a List 
  *
  * @card {string} the Id of the Card
  * @checklistid {string} the Id of the Checklist
  * @pos {string} possition top or bottom
  */
  this.addChecklistToCard = function (card,checklistid,pos){
    var requesturl = this.url+"cards/"+card+"/checklists?key="+this.llave+"&token="+this.token+"&idChecklistSource="+checklistid+"&pos="+pos;
    var options = {
      'method' : 'post'
    };
    var response = UrlFetchApp.fetch(requesturl,options);
    var json = response.getContentText();
    var data = JSON.parse(json);
    return data;
  }
  
}
