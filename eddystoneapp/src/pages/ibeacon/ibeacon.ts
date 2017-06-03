import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//var locationManager;
declare var cordova;
@IonicPage()
@Component({
  selector: 'page-ibeacon',
  templateUrl: 'ibeacon.html',
})
export class IbeaconPage {
 public beacons = {};
 public notificationID = 0;
	public inBackground = false;
   public message : string ="";
  public status : string;
  public timer;
  public regions =
	[
		// Estimote Beacon factory UUID.
	//	{uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D'},
		// Sample UUIDs for beacons in our lab.
		{uuid:'8492E75F-4FD6-469D-B132-043FE94921D8'}, // estimore becan
		// {uuid:'8DEEFBB9-F738-4297-8040-96668BB44281'},
		// {uuid:'A0B13730-3A9A-11E3-AA6E-0800200C9A66'},
		// {uuid:'E20A39F4-73F5-4BC4-A12F-17D1AD07A961'},
		// {uuid:'A4950001-C5B1-4B44-B512-1370F02D74DE'},
		// {uuid:'585CDE93-1B01-42CC-9A13-25009BEDC65E'},	// Dialog Semiconductor.
    
	];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
this.message = "Not Started";  
 this.timer = setInterval(()=>{
              this.displayBeacons();
            }, 3000);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad IbeaconPage');
  }

stopscan()
	{
    var uuid = '8492E75F-4FD6-469D-B132-043FE94921D8';
    var identifier = 'beaconOnTheMacBooksShelf';
var minor = 1000;
var major = 5;
var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
 
cordova.plugins.locationManager.stopMonitoringForRegion(this.regions)
    .fail(console.error)
    .done();
  }

 startScan()
	{
    this.message = "....scanning started....";  
		// The delegate object holds the iBeacon callback functions
		// specified below.
    if (cordova.plugins.LocationManager)
    this.message = "....LocationManager found....";
    else
     this.message = "....LocationManager found....";
		var delegate = new cordova.plugins.locationManager.Delegate();

		// Called continuously when ranging beacons.
		delegate.didRangeBeaconsInRegion = function(pluginResult)
		{
			console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
			// for (var i in pluginResult.beacons)
			// {
			// 	// Insert beacon into table of found beacons.
			// 	var beacon = pluginResult.beacons[i];
      //   console.log('didRangeBeaconsInRegion: ' + JSON.stringify(beacon));
      //   if (beacon){
			// 	beacon.timeStamp = Date.now();
			// 	var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
			// 	this.beacons[key] = beacon;
      //   }
			// }
		};

		// Called when starting to monitor a region.
		// (Not used in this example, included as a reference.)
		delegate.didStartMonitoringForRegion = function(pluginResult)
		{
			//console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
		};

		// Called when monitoring and the state of a region changes.
		// If we are in the background, a notification is shown.
		delegate.didDetermineStateForRegion = function(pluginResult)
		{
		
    for (var i in pluginResult.beacons)
			{
				// Insert beacon into table of found beacons.
				var beacon = pluginResult.beacons[i];
        console.log('didRangeBeaconsInRegion: ' + JSON.stringify(beacon));
        if (beacon){
				beacon.timeStamp = Date.now();
				var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
				this.beacons[key] = beacon;
        }
			}

    	// if (this.inBackground)
			// {
			// 	// Show notification if a beacon is inside the region.
			// 	// TODO: Add check for specific beacon(s) in your app.
			// 	if (pluginResult.region.typeName == 'BeaconRegion' &&
			// 		pluginResult.state == 'CLRegionStateInside')
			// 	{
			// 		cordova.plugins.notification.local.schedule(
			// 			{
			// 				id: ++this.notificationID,
			// 				title: 'Beacon in range',
			// 				text: 'iBeacon Scan detected a beacon, tap here to open app.'
			// 			});
			// 	}
			// }
		};

		// Set the delegate object to use.
		cordova.plugins.locationManager.setDelegate(delegate);

		// Request permission from user to access location info.
		// This is needed on iOS 8.
		cordova.plugins.locationManager.requestAlwaysAuthorization();

		// Start monitoring and ranging beacons.
		for (var i in this.regions)
		{
			var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
				i + 1,
				this.regions[i].uuid);

			// Start ranging.
			cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
				.fail(console.error)
				.done();

			// Start monitoring.
			// (Not used in this example, included as a reference.)
		cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
				.fail(console.error)
				.done();
		}
	}

 getbeaconList(beacons : any){
      var list = [];
      for(var key in beacons){
        list.push(beacons[key]);
      }
      return list;
  }

  displayBeacons()
	{
		// Clear beacon list.
	  this.message += "....display started....";  
		var timeNow = Date.now();
var html = '';
		// Update beacon list.
    var list = this.getbeaconList(this.beacons);
    for(var i=0;i<list.length;i++){
      var beacon = list[i];
      var htmlbeacon = 
					'<li>'
					+	'<strong>UUID: ' + beacon.uuid + '</strong><br />'
					+	'Major: ' + beacon.major + '<br />'
					+	'Minor: ' + beacon.minor + '<br />'
					+	'Proximity: ' + beacon.proximity + '<br />'
					+	'RSSI: ' + beacon.rssi + '<br />'
					+ 	'<div style="background:rgb(255,128,64);height:20px;width:'
					+ 		beacon.rssiWidth + '%;"></div>'
					+ '</li>'
				;    
html += htmlbeacon;   
    }
    	this.message = html;

		
	}


}
