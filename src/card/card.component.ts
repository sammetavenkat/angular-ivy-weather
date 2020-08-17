import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'card',
  templateUrl: './card.componet.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cityName: string='';
  @Input() id: string='';
  @Input() time: string='';
  @Output('delete') delete = new EventEmitter<any>();

  public Res=[];
  public ShowLoading=true;
  public showError=true;
  public errorMessage="";
  private BasicURL='https://api.openweathermap.org/data/2.5/weather?q='; 

  public name="";
  public icon="";
  public subDesc="";
  public temp="";
  public feelsLike="";
  public wind="";
  public pressure="";
  public humidity="";
  public visibility="";
  public tempMin="";
  public tempMax="";
  public showEditMode=false;
  ngOnInit() {
    if(this.cityName || this.cityName==''){
    this.showError=true;
    this.errorMessage="Type city name and give Enter";
    }
  }
   ngAfterViewInit(): void {
     if( this.cityName!=''){
      this.loadWeather();
     }
     //setInterval(()=>{this.loadWeather()}, 30000);
   }
  
  async loadWeather(){
   if( this.cityName!=''){
this.showError=false;
   (await this.fetchGETAPI(this.cityName)).toPromise().then(
        async (res)=>{
          this.name = res['name']+','+res['sys']['country'];
          this.icon=res['weather'][0]['icon']+'';
          this.subDesc=' Feels like is '+Math.floor(res['main']['feels_like'])+'°C. '+res['weather'][0]['description']+'.';
          this.temp = Math.floor(res['main']['temp'])+'';
          this.feelsLike == res['main']['feels_like']+'';
          this.wind=res['wind']['speed']+'';
          this.pressure= res['main']['pressure']+'';
          this.humidity= res['main']['humidity']+''; 
          this.visibility= this.formatAmount(res['visibility']/1000,1)+'';
          this.tempMin= Math.floor(res['main']['temp_min'])+'';
          this.tempMax= Math.floor(+res['main']['temp_max'])+''; 
          this.ShowLoading=false;
          },
          error => {
            this.ShowLoading=false;
            this.showError=true;
            this.errorMessage="please select valid city name."
              console.log(error);
          }
     );
   } 
   
  }
 
  constructor(private http: HttpClient){}

  deleteCard(){
    this.delete.emit(this.id);
  }
  onFoucs(){
    this.showEditMode=true;
  }
  onEditClick(){
    document.getElementById(this.id+'_Input').focus();
  }
  onSave(){
    this.showEditMode=false;
    document.getElementById(this.id+'_Input').blur()
  }
  upDateCityName(){
    this.onSave();
    this.cityName=this.name;
    this.ShowLoading=true;
    this.loadWeather();
  }
  formatAmount(number  , minFraction) {
      return number.toLocaleString('USA', { minimumFractionDigits: minFraction});
    }

  async fetchGETAPI(url: string) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    };
    url=this.BasicURL+url+'&APPID=dd609bc5f8894d831321e7e79915caa0&units=metric';
    let httpOpts = { headers: new HttpHeaders(headers) };
    return await this.http.get(url, httpOpts);
  }
}
