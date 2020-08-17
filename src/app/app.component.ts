import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public CityName="";
  public monthArray=["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November","December"];
  public weekArray=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
 public CardArray=[
    {name:'chennai' , time:this.getCurrentTime()}
  ];
   ngOnInit() {
   
  }
  getCurrentTime(){
    var d = new Date(); 
   return  this.formatAMPM(d)+', '+this.weekArray[d.getDay()]+', '+this.monthArray[d.getMonth()] +''+d.getDate()+', '+d.getFullYear();
  }
  formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + '' + ampm;
      return strTime;
  }
  

  deleteThisCard(id){
   this.CardArray.splice(id,1);
  }
  
  addNewCard(){
    this.CardArray.push({name:this.CityName, time:this.getCurrentTime()});
    this.closePopUp();
  }

  closePopUp(){
    document.getElementById("myModal").style.display = "none";
  }
  openPopUp(){
    this.CityName="";
     document.getElementById("myModal").style.display = "block";
  }

}
