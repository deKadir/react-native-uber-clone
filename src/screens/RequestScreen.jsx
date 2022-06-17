import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

//local imports
import {
  colors,
  parameters,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from './../constants/styles';
import { MapComponent } from '../components';
import { Avatar, Icon } from 'react-native-elements';
import { useContext } from 'react';
import { OriginContext } from '../context/Contexts';

const RequestScreen = ({ navigation }) => {
  const { origin, destination } = useContext(OriginContext);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.headerLeftIcon}
            onPress={() => navigation.goBack()}
          >
            <Icon
              type="material-community"
              name="arrow-left"
              size={32}
              color={colors.grey1}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }}>
            <View style={styles.headerTopContent}>
              <Avatar
                rounded
                size={30}
                source={require('../../assets/blankProfilePic.jpg')}
              />
              <Text style={{ marginLeft: 5 }}>For someone</Text>
              <Icon
                type="material-community"
                name="chevron-down"
                color={colors.grey1}
                size={26}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.headerContent}>
          <Image
            style={styles.transitImg}
            source={require('../../assets/transit.png')}
          />
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.btnCurrent}
              onPress={() => navigation.navigate('DestinationScreen')}
            >
              <Text style={{ color: colors.grey1 }}>
                {origin.address ? origin.address : 'From where?'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDestination}>
              <Text style={{ color: colors.grey2, flex: 1 }}>
                {destination.address ? destination.address : 'To'}
              </Text>
              <Icon
                type="material-community"
                name="plus-thick"
                size={32}
                color={colors.grey1}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <MapComponent origin={origin} destination={destination} />
    </View>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: parameters.statusBarHeight,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: 'relative',
    backgroundColor: colors.white,
  },

  headerTop: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  headerLeftIcon: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
    padding: 5,
  },
  headerTopContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnCurrent: {
    flexDirection: 'row',
    backgroundColor: colors.grey4,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  btnDestination: {
    flexDirection: 'row',
    backgroundColor: colors.grey6,
    borderRadius: 16,
    padding: 12,
  },
});
