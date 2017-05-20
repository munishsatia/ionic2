import { Component } from '@angular/core';
import { Platform,NavController } from 'ionic-angular';

declare var cordova;
declare var evothings;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  public message : string;
  public beacons = {};
  public timer;
  constructor(public navCtrl: NavController, public plt:Platform) {
      this.message = "Not Started";
      plt.ready().then(()=> {
         // setTimeout(this.startscan, 500);
         this.message += "...Platform Ready";

          if (<any>evothings.eddystone){
            this.message += "...scanning started...";
           // evothings.eddystone.startScan(this.success,this.error);
           this.startscan();
            setTimeout(function() {
               this.message += "...scanning started...";
              //evothings.eddystone.startScan(this.success,this.error);
              this.startscan();
            }, 1000);
            // setTimeout(()=>{
            //   evothings.eddystone.startScan(this.success,this.error);
            // }, 1000);

            this.timer = setInterval(()=>{
              this.displayBeacons();
            }, 3000);
          }
          else{
            this.message += "-evothings.eddystone  not found...";
          }
        });
  }

 
  startscan(){
    // this.message += "... startscan button clicjed ...";
     //evothings.eddystone.startScan(this.success,this.error);
     evothings.eddystone.startScan((beacon)=>
     {
        beacon.timeStamp = Date.now();
        beacon.name = beacon.name || "testname";
        this.beacons[beacon.address] = beacon;
        console.log(beacon);
     },(beacon)=>{this.error});
     }

  // success(beacon){
  //   // alert( "....Scanning Scanning...");
  //     beacon.timeStamp = Date.now();
  //     this.beacons[beacon.address] = beacon;
  //     console.log(beacon);
  // }

  displayBeacons(){
     this.message += "...update...";
    var html = '';
    var list = this.getbeaconList(this.beacons);
   // console.log(list);
    for(var i=0;i<list.length;i++){
      var beacon = list[i];
      var htmlbeacon = '<p>'
                        + this.htmlBeaconName(beacon)
                        + '</p>';
				html += htmlbeacon;
    }
    this.message = html;
  }
  htmlBeaconName(beacon)
	{
			var name = beacon.name || 'no name';
			return '<strong>' + name + '</strong><br/>';
	}

  getbeaconList(beacons : any){
      var list = [];
      for(var key in beacons){
        list.push(beacons[key]);
      }
      return list;
  }

  error(err){
      this.message = "...Error Eddystone scan error:.... " + err;
  }
   debugmessages(){
     this.message += "-Start Scanning...";
          if ((<any>cordova)){
              this.message += "-cordova found...";
          }
          else{
            this.message += "-cordova not found...";
          }

          if (window){
              this.message += "-window found...";
          }
          else{
            this.message += "-window not found...";
          }
          if ((<any>cordova).plugins){
              this.message += "-codova plugins found...";
          }
          else{
            this.message += "-cordova plugins not found...";
          }
          if (<any>evothings.eddystone){
              this.message += "-evothings.eddystone plugins found...";
              // evothings.eddystone.startScan(this.success,this.error);
          }
          else{
            this.message += "-evothings.eddystone plugins not found...";
          }
  }

}
