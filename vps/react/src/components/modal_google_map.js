import { useState,  useEffect, useRef } from 'react';
// TODO https://react-bootstrap.github.io/components/modal/#vertically-centered
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function GoogleMapModal(props) {
  const mapRef = useRef(null)

  useEffect(() => {
    if(mapRef.current) {
      initMap()
    }
  }, [mapRef.current])

  // https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng
  function initMap() {
    const myLatlng = { lat: -25.363, lng: 131.044 };
  
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 4,
      center: myLatlng,
    });
  
    // Create the initial InfoWindow.
    let infoWindow = new window.google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: myLatlng,
    });
  
    infoWindow.open(map);
  
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
      // Close the current InfoWindow.
      infoWindow.close();
  
      // Create a new InfoWindow.
      infoWindow = new window.google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      infoWindow.open(map);
    });
  }
  
  // declare global {
  //   interface Window {
  //     initMap: () => void;
  //   }
  // }
  window.initMap = initMap;
  // export {};

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng */}
        <div style={{height: "100%"}} ref={mapRef}></div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="danger" onClick={props.handleconfirm}>
          {props.isloading &&
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          }
          Yes, I'm sure!
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
  }