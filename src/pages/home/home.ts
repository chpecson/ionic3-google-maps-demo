import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { GoogleMaps,
         GoogleMap,
         GoogleMapOptions,
         GoogleMapsEvent,
         Marker,
         MarkerOptions,
         HtmlInfoWindow,
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
    const locations: Array<{ position: LatLng }> = [
      {
        position: new LatLng(10.663772, 122.944702),
      },
      {
        position: new LatLng(10.659501, 122.944316),
      },
      {
        position: new LatLng(10.660819, 122.943082),
      },
    ]

    const mapElement = this.mapRef.nativeElement;
    const map: GoogleMap = this.googleMaps.create(mapElement);
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: location,
        zoom: 15
      },
      mapType: 'MAP_TYPE_TERRAIN'
    };

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      map.moveCamera(mapOptions.camera);

      this.addMarker(location, map);
      this.addMarkers(locations, map);
    });
  }

  // Add marker in a map.
  addMarker(position: LatLng, 
            map: GoogleMap,
            content: string = `
    <h1>Hello world!</h1>
    <p>The quick brown fox jumps over the lazy dog.</p>
  `) {
    const htmlInfoWindow: HtmlInfoWindow<any> = new HtmlInfoWindow;
    htmlInfoWindow.setContent(content);

    const markerOptions: MarkerOptions = {
      icon: 'blue',
      animation: 'DROP',
      position: position
    };
    map.addMarker(markerOptions)
       .then((marker: Marker) => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  htmlInfoWindow.open(marker);
                });
       });
  }

  addMarkers(locations: Array<{position: LatLng}>, map: GoogleMap) {
    locations.forEach(location => {
      this.addMarker(location.position, map);
    })
  }
}
