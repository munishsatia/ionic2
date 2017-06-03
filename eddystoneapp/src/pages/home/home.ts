import { Component } from '@angular/core';
import { Platform,NavController } from 'ionic-angular';

declare var cordova;
declare var evothings;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  public message : string ="";
  public status : string;
  public beacons = {};
  public timer;
  public timerscanner;
  constructor(public navCtrl: NavController, public plt:Platform) {
      this.message = "Not Started";
      plt.ready().then(()=> {
         // setTimeout(this.startscan, 500);
         this.status += "...Platform Ready";

          if (<any>evothings.eddystone){
            this.status  += "...scanning started...";
           // evothings.eddystone.startScan(this.success,this.error);
          // this.startscan();
            setTimeout(function() {
               this.status  += "...scanning...";
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
            this.message += "- beacons library (eddystone) not loaded...";
          }
        });
  }

 
  startscan(){
     this.status  = "...scanning...";
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

  stopscan(){
     this.status  = "...scanning stopped...";
    evothings.eddystone.stopScan();
  }
  displayBeacons(){
  
   this.message += "...refreshing beacons...";
   this.removeOldBeacons();
    var html = '';
    var list = this.getbeaconList(this.beacons);
   // console.log(list);
    for(var i=0;i<list.length;i++){
      var beacon = list[i];
      var htmlbeacon = '<p>'
                        + this.htmlBeaconName(beacon)
                        + this.htmlBeaconURL(beacon)
                        + this.htmlBeaconNID(beacon)
                        + this.htmlBeaconBID(beacon)
                        + '</p>';
				html += htmlbeacon;
    }
    this.message = html;
  }
  removeOldBeacons()
  {
    var timeNow = Date.now();
    for (var key in this.beacons)
    {
      // Only show beacons updated during the last 60 seconds.
      var beacon = this.beacons[key];
      if (beacon.timeStamp + 2000 < timeNow)
      {
        delete this.beacons[key];
      }
    }
  }
  htmlBeaconName(beacon)
	{
			var name = beacon.name || 'no name';
			return '<strong>' + name + '</strong><br/>';
	}

  htmlBeaconURL(beacon)
		{
			return beacon.url ?
				'URL: ' + beacon.url + '<br/>' :  '';
		}

		htmlBeaconNID(beacon)
		{
			return beacon.nid ?
				'NID: ' + this.uint8ArrayToString(beacon.nid) + '<br/>' :  '';
		}

		htmlBeaconBID(beacon)
		{
			return beacon.bid ?
				'BID: ' + this.uint8ArrayToString(beacon.bid) + '<br/>' :  '';
		}

    uint8ArrayToString(uint8Array)
		{
			function format(x)
			{
				var hex = x.toString(16);
				return hex.length < 2 ? '0' + hex : hex;
			}

			var result = '';
			for (var i = 0; i < uint8Array.length; ++i)
			{
				result += format(uint8Array[i]) + ' ';
			}
			return result;
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
