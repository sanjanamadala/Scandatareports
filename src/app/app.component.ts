import { Injectable,ErrorHandler,Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import * as uuid from 'uuid';
import {Http, Response} from '@angular/http';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import * as FileSaver from 'file-saver';
import { FileSaverService } from 'ngx-filesaver';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  count1=0;
  totalfprice=0;
  recordcount=0;
  lo:number
categorys:[]
data=[]
final=[]
finalre=[]
link:any
sku:any
dk=[]
count=0;
filedata=[]
storedetails:any
city:any
state:any
zip:any
discount:any
country:any
address:any
vendor:any
name:any
webkitURL: any;

  constructor(private ngFlashMessageService: NgFlashMessageService,private http:Http,private modalService: NgbModal,private _FileSaverService: FileSaverService) { }


shift=function()
{
  var s=(<HTMLInputElement>document.getElementById("fname")).value
  console.log(s)
  if(s==""){
  console.log("ss")
  var x = document.getElementById("valid");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
  }
  else{

















  var hostname=(<HTMLInputElement>document.getElementById("hostname")).value;
console.log(hostname)
var user=(<HTMLInputElement>document.getElementById("user")).value;
var password=(<HTMLInputElement>document.getElementById("password")).value;

  var url='https://pb6rbw39d1.execute-api.us-west-2.amazonaws.com/V1/ftpconnect'
  var body={
"ftphostname":hostname,
"user":user,
"password":password,
"data": this.ftpdata
 }
 console.log(body)
    this.http.post(url,body).subscribe(
      (res:Response) =>{
  console.log(JSON.stringify(res.json()))
  var s=JSON.stringify(res.json())


  if (res.json()=="successfully uploaded..")
  {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  else if (s=="null"){
    console.log("sderf")
    var x = document.getElementById("snackbars");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);  }
})
}
}










catid=function(id)
{
  (<HTMLInputElement>document.getElementById("load")).hidden = false;
  (<HTMLInputElement>document.getElementById("p")).hidden = false;

  var count=0
  var todayurl='  https://pb6rbw39d1.execute-api.us-west-2.amazonaws.com/V1/category'//fetching the category items
var body={
  "catid":id
}
  this.http.post(todayurl,body).subscribe(
    (res:Response) =>{
this.category=res.json().elements
console.log(this.category)//fetched categories
for(var i in this.category){    //iterating over each category


  console.log(this.category[i].name)
  var name=this.category[i].name//category name
if(name==name)
{
  count++;
}

var todayurls=' https://pb6rbw39d1.execute-api.us-west-2.amazonaws.com/V1/weekorderdetails'//fetching the orders based on item name
var d={
  "name":name
}
console.log(d)

var vendor='https://pb6rbw39d1.execute-api.us-west-2.amazonaws.com/V1/clovervendordetails'//fetching details from dynamodb

this.http.post(vendor,d).subscribe(
  (res:Response) =>{

console.log(res.json())//fetching vendor name and item name
var kk=res.json()
this.vendor=kk[0].vendors
console.log(this.vendor)//displaying vendor name
this.http.post(todayurls,d).subscribe(
  (res:Response) =>{
this.links=res.json()//storing order id's or line items
this.dk=res.json()//storing order id's or line items
console.log(this.dk)

for(var i in this.dk)//iterating each line item
{var dis="";
var itemid=this.dk[i].item.id
console.log(itemid)
console.log(this.dk[i].orderRef.id)
var koo='https://pb6rbw39d1.execute-api.us-west-2.amazonaws.com/V1/item'
var itemd={
  "id":itemid
}
console.log(itemd)

this.http.post(koo,itemd).subscribe(
  (res:Response) =>{
    console.log(res.json())//fetching item details
    this.sku=res.json().sku
  console.log(this.sku)



console.log(this.dk[i].id)
var todayurlsss='https://pb6rbw39d1.execute-api.us-west-2.amazonaws.com/V1/discount'
var d={
  "orderid":this.dk[i].orderRef.id
}
console.log(d)
this.http.post(todayurlsss,d).subscribe(
  (res:Response) =>{


console.log(new Date(this.dk[i].orderClientCreatedTime))

this.link=res.json()
console.log(this.link)
console.log( this.link.href.split("/"))
var oid=this.link.href.split("/");
var ooid=oid[7]
console.log(ooid)
if(this.link.elements.length==0)
{
  console.log("sss")
  dis="N"
  this.discount=0
}


else{
  dis="Y"
  var price =this.dk[i].price
  var amount=this.link.elements[0].percentage/100;
  this.discount=price*amount
  console.log(this.discount)
}

var dd=new Date(this.dk[i].orderClientCreatedTime)
console.log(dd)
var s=dd.toString()
console.log(s)
var ol=s.replace("GMT+0530 (India Standard Time)","")
console.log(ol)
var sks=ol.split(" ")
console.log(sks[2])
console.log(sks[3])
console.log(sks[4])
var time=sks[4]
console.log(time)
var day=sks[2]
var year=sks[3]
var fd={
"orderClientCreatedTime":ol,
"name":this.dk[i].name,
"price":this.dk[i].price,
"orderid":this.dk[i].id,
"discoint":dis,
"noofitems":count,
"vendor":this.vendor


}
var month=new Date(this.dk[i].orderClientCreatedTime).getMonth()+1;

// this.accountnumber=(<HTMLInputElement>document.getElementById("firstname")).value ;


var data = "798965|" +
     + year + "0"+month + day + "|" +
     + year + "0"+month + day + "|"+time +"|"+
     ooid + "|" +

      "95682"+"|"+
      this.name + "|" +
     this.address+"|"+
      this.city + "|" +
      this.state + "|" +

      this.zip + "|" +"|"+
      "cigarette"+ "|" +
      this.vendor + "|" +
            this.dk[i].itemCode+"|"+this.sku+"|"+this.dk[i].name+"|"+"|"+"|"+count+
            "|"+dis+"|"+"|"+
            this.discount+"|"+
            "|"+"|"+"|"+
             "|"+"|"+"|"+"|"+
             this.dk[i].price + "|" +

     "|" +
      "|" +
      "|" +

    "|" + "|"

















console.log(fd)
this.data.push(fd)
this.filedata.push(data)
this.ftpdata=data


console.log(this.filedata)

if(this.filedata.length!=0)
{
  (<HTMLInputElement>document.getElementById("load")).hidden = true;
  (<HTMLInputElement>document.getElementById("p")).hidden = true;

}
})
})


}

})
})




}//forloop








})







}




pad=function(num) {
  return ("0"+num).slice(-2);
}

time=function(timestamp) {
  var date = new Date(timestamp * 1000);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  var time = new Date();
return this.pad(hours)+":"+this.pad(minutes)+":"+this.pad(seconds)
//  return time.setHours(hours, minutes, seconds);
}
//console.log(getTimeFromDate(1480687432))


dategen=function(unixtime) {

    var u = new Date(unixtime);

      return u.getUTCFullYear() +
        '' + ('0' + u.getUTCMonth()).slice(-2) +
        '' + ('0' + u.getUTCDate()).slice(-2)
    };

test=function(id)
{
//  (<HTMLInputElement>document.getElementById("load")).hidden = false;
//  (<HTMLInputElement>document.getElementById("p")).hidden = false;

  var count1=0
  var todayurl="https://rvyg9ib438.execute-api.us-west-2.amazonaws.com/SCAN/scandata-reports"
var body={
  "catname":id
}
  this.http.post(todayurl,body).subscribe(
    (res:Response) =>{
console.log(res.json())
this.category=res.json().DATA
//  console.log(this.category)
for(var i=0;i<this.category.length;i++){
  this.recordcount=this.recordcount+1;
  console.log(this.category[i])
  var last=this.category[i].lastweektime
  last=Math.floor(last/1000)
  var ti=this.category[i].clientCreatedTime/1000
var tim=this.time(ti)
console.log(tim)        //printing order created time
var or=this.category[i].clientCreatedTime
var orderdate=this.dategen(or)
console.log(orderdate+"         ORDER DATE ")
console.log("order time stamp  "+or)
last=last*1000
var weekdate=this.dategen(last)
console.log("WEEKEND DATE    "+weekdate)
//console.log("week time stamp  ")
console.log(last)















  console.log(" DATA "+last)
  var dis=''
  this.count1=this.count1+this.category[i].count
  if(this.category[i].discounts==0){
    dis="N"
  }else{
    dis="Y"
  }
var fprice=this.category[i].count*this.category[i].price
  console.log(fprice)
  fprice=fprice/100
  this.totalfprice=this.totalfprice+fprice
//last = last.getDate();
//console.log(last)
//console.log(last.toLocaleDateString())
//  var month=new Date(1564123385841).getMonth()+1;
//  console.log(this.month)

  var data = "798965" +"|"
       + weekdate + "|"
       + orderdate+ "|"+tim +"|"+
       this.category[i].orderid + "|" +

        "95682"+"|"+
        this.name + "|" +
       this.address+"|"+
        this.city + "|" +
        this.state + "|" +

        this.zip + "|" +
        id + "|" +
        this.category[i].vendor + "|" +
              this.category[i].skucode +"|"+this.category[i].skucode+"|"+this.category[i].skudescription+"|" + "Pack"+"|"+this.category[i].count+"|"+ "1" + 
              "|"+dis+"|"+this.category[i].count+"|"+
              this.category[i].discounts/100+"|"+
              "|"+"|"+"|"+
               "|"+"|"+"|"+"|"+
               fprice + "|" +

       "|" +
        "|" +
        "|" +

      "|" + "|"

//  console.log(fd)
//  this.data.push(fd)
// console.log(data)
  this.filedata.push(data)








}  //end of looping cat details

})
}  //test function ends here







file=function()
{

  //(<HTMLInputElement>document.getElementById("d")).hidden = true;
  console.log(this.filedata.join('\n'));
  var link=this.filedata.join('\n')
//count recordcount  totalfprice
var p=5.2

  var textFileAsBlob = new  Blob([""+this.recordcount+"|"+this.count1+"|"+this.totalfprice+"\n",'\n',link], { type: 'text/plain' });
  var fileNameToSaveAs = ""+ "this.name" + "_568953_" +" year + month+day"+".txt";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (webkitURL != null)
	{

		downloadLink.href = webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{

		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	//	downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
}















filedatas=function()
{

  var s=(<HTMLInputElement>document.getElementById("fname")).value
  console.log(s)
if(s==""){
  console.log("ss")
  var x = document.getElementById("valid");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}
else{

  var dd=new Date()
  console.log(dd)
  var s=dd.toString()
  console.log(s)
  var ol=s.replace("GMT+0530 (India Standard Time)","")
  console.log(ol)
  var sks=ol.split(" ")
  console.log(sks[2])
  console.log(sks[3])
  console.log(sks[4])
  var time=sks[4]
  console.log(time)
  var day=sks[2]
  var year=sks[3]
  var month=new Date().getMonth()+1;













  //(<HTMLInputElement>document.getElementById("d")).hidden = true;
  console.log(this.filedata.join('\n'));
var link=this.filedata.join('\n')
var count=100
var p=5.26

  var textFileAsBlob = new Blob([""+this.filedata.length+"|"+count+"|"+p,'\n',link], { type: 'text/plain' });
  var fileNameToSaveAs = ""+ this.name + "_568953_" + year + month+day+".txt";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (webkitURL != null)
	{

		downloadLink.href = webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{

		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	//	downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
}}
catalog =function()
{
  var todayurl='https://pb6rbw39d1.execute-api.us-west-2.amazonaws.com/V1/category'

  this.http.get(todayurl).subscribe(
    (res:Response) =>{
console.log(res.json())
this.categorys=res.json().elements
})
}

storedetailsof=function()
{
  var storeurl='https://pb6rbw39d1.execute-api.us-west-2.amazonaws.com/V1/storedetails'
  this.http.get(storeurl).subscribe(
    (res:Response) =>{
console.log(res.json())
this.storedetails=res.json();
console.log(this.storedetails)
this.state=this.storedetails.body.state;
this.zip=this.storedetails.body.zip;
this.country=this.storedetails.body.country;
this.address=this.storedetails.body.address1;
this.name=this.storedetails.storename;
this.city=this.storedetails.body.city;
console.log(this.name)
})
}
valid()
{
  var s=(<HTMLInputElement>document.getElementById("fname")).value
  console.log(s)
if(s==""){
  console.log("ss")
  var x = document.getElementById("valid");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}
else{
  (<HTMLInputElement>document.getElementById('id01')).style.display='block'



}
}
  ngOnInit() {
    (<HTMLInputElement>document.getElementById("p")).hidden = true;

    (<HTMLInputElement>document.getElementById("alerts")).hidden = true;
    (<HTMLInputElement>document.getElementById("alertss")).hidden = true;
    (<HTMLInputElement>document.getElementById("load")).hidden = true;
    var a = [1, 2, 3, 4, 5, 6];
    console.log(a.join('\n'));
this.storedetailsof()
this.catalog()


var query = window.location.search.substring(1);
console.log(query)











  }


  }
