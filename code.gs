function doGet(e){
  return HtmlService.createTemplateFromFile("/// ADD NAME OF YOUR MAIN FILE ///////")
                     .evaluate()
                     .setTitle("Rameez Imdad Mini Bank");
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


var wss = SpreadsheetApp.openById("//// ADD  YOUR SHEET ID HERE /////")
var sn = wss.getSheetByName("//// ADD HERE HOLDER SHEET NAME //////");

var z = (num, places) => String(num).padStart(places, '0');
 function tget(){
  var tv = sn.getDataRange().getValues();
  var val ='<table class="w3-table-all w3-small"id="tabl"><tr class="w3-red"><th>Joining Date</th><th>HolderID</th><th>Holder Name</th><th>Contact No.</th><th>Total Deposit</th><th>Withdraw</th><th>Charges</th><th>Balance</th><th>Status</th></tr>';
  for(var i=1;i<tv.length;i++){
  val+='<tr><td>'+tv[i][0]+'</td><td>'+tv[i][1]+'</td><td>'+tv[i][2]+'</td><td>'+tv[i][9]+'</td><td>'+tv[i][3]+'</td><td>'+tv[i][4]+'</td><td>'+tv[i][6]+'</td><td>'+tv[i][7]+'</td><td>'+tv[i][8]+'</td></tr>';
  }
  return val+'</table>';
 }

function addholder(v){
  var l = sn.getLastRow()+1;
  var  flag  =  1 ;
  for(var i = 1;i <= l;i++){
  if(sn.getRange(i, 2).getValue() == v.hid){// checking if condidate already exist.
      flag = 0;   
  var  data = "Condidate already exist";
      return data;
    }
   }
     if(flag==1){
  var dt = Utilities.formatDate(new Date(),Intl.DateTimeFormat().resolvedOptions().timeZone, 'yyyy-MM-dd HH:mm:ss');
  var f1 = '=SUMIF(deposit!D:D,B'+l+',deposit!E:E)';
  var f2 = '=SUMIF(withdraw!D:D,B'+l+',withdraw!E:E)';
  var f3 = '=MINUS(D'+l+',E'+l+')';
  var f4 = '=SUMIF(withdraw!D:D,B'+l+',withdraw!F:F)';
  var f5 = '=MINUS(F'+l+',G'+l+')';
  var f6 = '=IFs(H'+l+'>0,"To give",H'+l+'<0,"To take",H'+l+'=0,"final")';
  sn.appendRow([dt,v.hid,v.fullname,f1,f2,f3,f4,f5,f6,v.mob,v.email]);
  sn.getRange(l,1).setNumberFormat('@STRING@');
  var data = 'Holder successfully added.';
  return data;
    } 
    };

function deposit(v){
  var dn = wss.getSheetByName("deposit");
  var l = dn.getLastRow();
  var id = "D"+z(l,5); 
  if(v.hid!=""){
  var dt = Utilities.formatDate(new Date(),Intl.DateTimeFormat().resolvedOptions().timeZone, 'yyyy-MM-dd HH:mm:ss');
  var d = dt.split(" ");
  dn.appendRow([id,d[0],d[1],v.hid,v.damount,v.note]);
  var data = 'Deposit successfull.';
  return data;
   }else{
  var data = 'Something went wrong!';
  return data;
   }}

   
function withdraw(v){
  var dn = wss.getSheetByName("withdraw");
  var z = (num, places) => String(num).padStart(places, '0');
  var l = dn.getLastRow();
  var id = "W"+z(l,5); 
  if(v.hid!=""){
  var dt = Utilities.formatDate(new Date(),Intl.DateTimeFormat().resolvedOptions().timeZone, 'yyyy-MM-dd HH:mm:ss');
  var d = dt.split(" ");
  dn.appendRow([id,d[0],d[1],v.hid,v.wamount,v.camount,v.note]);
  var data = 'Withdraw successfully.';
  return data;
   }else{
  var data = 'Something went wrong!';
  return data;
   }}
