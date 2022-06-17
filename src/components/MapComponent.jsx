import React, { useRef, useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Image } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

//local imports

import { mapStyle } from './../constants/mapStyle';

const MapComponent = ({ origin, destination }) => {
  const map = useRef(1);
  useEffect(() => {
    setTimeout(() => {
      map.current.fitToCoordinates([origin, destination], {
        edgePadding: {
          top: 150,
          left: 50,
          right: 50,
          bottom: 150,
        },
        animated: true,
      });
    }, 1000);
  }, []);
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      ref={map}
      style={{
        height: '100%',
        marginVertical: 0,
        width: '100%',
      }}
      customMapStyle={mapStyle}
      showsUserLocation={true}
      followsUserLocation={true}
    >
      {origin.latitude !== null && (
        <MapView.Marker coordinate={origin}>
          <Image
            source={require('../../assets/location.png')}
            style={{ width: 12, height: 12 }}
            resizeMode="contain"
          />
        </MapView.Marker>
      )}
      {destination.latitude !== null && (
        <MapView.Marker coordinate={destination}>
          <Image
            source={require('../../assets/location.png')}
            style={{ width: 12, height: 12, borderRadius: 999 }}
            resizeMode="contain"
          />
        </MapView.Marker>
      )}
    </MapView>
  );
};

export default MapComponent;
