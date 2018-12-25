function onFormSubmit(e) {
  //https://docs.google.com/forms/d/e/1FAIpQLSdhMspXZUvDzepaIO-rh6Lsw1FzM4C7oneRaRJNRausg2seEg/viewform?usp=pp_url&entry.1547128013=Alexandre+PILARD&entry.429270539=qdqd&entry.657462780=0004-03-23&entry.1043933420=qsdqs&entry.629824523=mokpok&entry.520594836=6 rue Eugène Millon&entry.1753126578=Non,+je+vais+demander+%C3%A0+la+RH+de+l'informer+concernant+l'action&entry.1014407746=Dermatologie&entry.907106872=24
  
  var comm = new CommunicationClass();
  var colnames = ["Contact mutuelle partenaire","Date de l'action de PSS","Nom du partenaire","Adresse du partenaire","Type de PSS","Nombre de personnes qui participeront  (potentiel)","Responsable commercial","Nom de l'entreprise","Le médecin du travail est au courant de l'action ?"];
  var dataname = ["contact","date","partenaire","adresse","type","nombre","responsable","entreprise","drdutravail"];
  var data = {};
  
  for (i in colnames){
    data[dataname[i]]=e.namedValues[colnames[i]][0]
  }
  
  switch(data["responsable"]){
    case "Alexandre PILARD" :
      data["trelloresponsable"] = "5ab9fe89f1ede8b91b1328a2";
      data["slackuser"] = "DA06VSRT5";
      break;
    case "Clara THIERRY" :
      data["trelloresponsable"] = "58b03e3707b64b008b9aae91";
      data["slackuser"] = "D8UV8M5EV";
      break;
    case "Magaly FREON" :
      data["trelloresponsable"] = "5b333d76be7c2fd037bfccadn";
      data["slackuser"] = "DB3LE4MTK";
      break;
    case "Marc GUILLEMAUT" :
      data["trelloresponsable"] = "5b9627aa69b08352720ed452";
      data["slackuser"] = "D8UPMCXK4";
      break;
  }
  
  var fecha = data["date"].split("/");
    
  var trellodata = {
    "pos": "top",
    "name": "Nombre",
    //"idMembers": data["trelloresponsable"],
    "idLabels" : "5b604ccc9c16fb124a1f0d36",
    "due": new Date(fecha[0]+"-"+fecha[1]+"-"+fecha[2]).toISOString(),
    "desc" : "**Responsable** : "+data["responsable"]+"%0A"+"**Contact Mutuelle** : "+data["contact"]+"%0A"+"**Nom du partenaire** : "+data["partenaire"]+"%0A"+"**Nom de l'entreprise** : "+data["entreprise"]+"%0A"+"**Adresse de l'entreprise** : ["+data["entreprise"]+"](https://www.google.com/maps/search/"+data["adresse"].replace(" ", "+")+")"+"%0A"+"**Type de PSS** : "+data["type"]+"%0A"+"**Médecin du travail** : "+data["drdutravail"]+"%0A"+"**Nombre de patients prévu** : "+data["nombre"]
  }
  
  //createCardinList
  var trello = new Trello.TrelloClass(llave,token);
  trello.createCardinList("5b604d162ee8b571530914fa",trellodata);
  
  var excel = new Sheets.ExcelClass();
  excel.setsheetbyId("147OUgM7qrnnMXE5qcv97ri_DmW2uhwoeUGWaWQwycvU",2);
  Logger.log(excel.getLastRow());
  
  //comm.sendtowebhook("https://webhook.site/660ed0d4-8c3f-4278-ad66-8e5c858196cf",data);  
  comm.sendtowebhook("https://hookb.in/QJKEyKmwDpCV3rGng9Wp",trellodata);
  
  /*var options = {
  'method' : 'post',
  'contentType': 'application/json',
  'payload' : JSON.stringify(data)
  };
  UrlFetchApp.fetch('https://script.google.com/a/medecindirect.fr/macros/s/AKfycbxBvpI1cw4D6JLFhoL33GgPyw3BlwegIfsrPYAhnGLSMtKF0Q8/exec', options);*/
  
}

function myFunction(){
  // Was separated line by line for debugging purposes
  // You have to go to Edition > Triggers > Form being sent
  // See https://stackoverflow.com/questions/43429161/how-to-get-form-values-in-the-submit-event-handler to install in a form Directly
  
  var sheet = SpreadsheetApp.getActive();
  var a = ScriptApp.newTrigger("onFormSubmit");
  var b = a.forSpreadsheet(sheet);
  var c = b.onFormSubmit();
  var d = c.create();
}