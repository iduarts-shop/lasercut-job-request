var submissionSSKey = '1h4lW0j9465x9_btsfzGKC9NGmQ5rScLzFhaIwp27XWs';
var folderId = "0B-lQ-Qfi898NakNnUWJuSmJPcGc";

function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Form.html');
  template.action = ScriptApp.getService().getUrl();
  return template.evaluate();
}


function processForm(theForm) {
  var fileBlob = theForm.myFile;
  var folder = DriveApp.getFolderById(folderId);
  var doc = folder.createFile(fileBlob);

  // Fill in response template
  var template = HtmlService.createTemplateFromFile('Thanks.html');
  var name = template.name = theForm.name;
  var major = template.major = theForm.major;
  var message = template.message = theForm.message;
  var material = template.material = theForm.material;
  var estimate = template.estimate = theForm.estimate;
  var cut = template.cut = theForm.cut;
  var raster = template.raster = theForm.raster;
  var email = template.email = theForm.email;
  var fileUrl = template.fileUrl = doc.getUrl();
  var timestamp = template.timestamp = new Date(); //var time = template.time = java.sql.Timestamp;



  MailApp.sendEmail(email + ", iduarts.shop@gmail.com", "LaserBot " + timestamp, name);

  // Record submission in spreadsheet
  var sheet = SpreadsheetApp.openById(submissionSSKey).getSheets()[0];
  var lastRow = sheet.getLastRow();
  var targetRange = sheet.getRange(lastRow+1, 1, 1, 10).setValues([[timestamp,name,major,message,estimate,cut,raster,material,email,fileUrl]]);


  // Return HTML text for display in page.
  return template.evaluate().getContent();


 }
