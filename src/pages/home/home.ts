import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { GoogleMaps,
         GoogleMap,
         GoogleMapOptions,
         GoogleMapsEvent,
         Marker,
         MarkerOptions,
         LatLng
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map')
  mapRef: ElementRef;

  constructor(public navCtrl: NavController,
              private platform: Platform,
              private googleMaps: GoogleMaps) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.loadMap();
    })
  }

  // Load the map
  loadMap() {
    const location: LatLng = new LatLng(10.6622214,122.9441217);
    const mapElement = this.mapRef.nativeElement;
    const map: GoogleMap = this.googleMaps.create(mapElement);
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: location,
        zoom: 10
      }
    };

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      map.moveCamera(mapOptions.camera);

      this.addMarker(location, map);
    });
  }

  // Add marker in a map.
  addMarker(position: LatLng, map: GoogleMap) {
    const markerOptions: MarkerOptions = {
      title: 'Sample Marker',
      icon: 'blue',
      animation: 'DROP',
      position: position
    };
    map.addMarker(markerOptions)
       .then((marker: Marker) => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  alert('Marker clicked');
                  marker.showInfoWindow();
                });
       });
  }
}
