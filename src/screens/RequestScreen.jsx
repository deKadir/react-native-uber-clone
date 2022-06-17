import React, { useRef, useMemo, useCallback, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

//local imports
import { colors, parameters } from './../constants/styles';
import { MapComponent } from '../components';
import { Avatar, Icon } from 'react-native-elements';
import { useContext } from 'react';
import { OriginContext } from '../context/Contexts';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { rideData } from '../constants/dummy';
import { useEffect } from 'react';

const RequestScreen = ({ navigation }) => {
  const { origin, destination } = useContext(OriginContext);
  const [sheet, setSheet] = useState(false);
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
            <TouchableOpacity
              style={styles.btnDestination}
              onPress={() => setSheet(true)}
            >
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
      <SavedPlaces active={sheet} />
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
  //bottom sheet
  itemIcon: {
    backgroundColor: colors.grey,

    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    padding: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 12,
  },
});

const SavedPlaces = ({ active }) => {
  const bottomSheetRef = useRef(1);
  const snapPoints = useMemo(() => ['75%'], []);
  const handleBottomSheet = useCallback((index) => {}, []);

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.itemIcon}>
          <Icon
            type="material-community"
            name="clock-time-four"
            color={colors.white}
            size={18}
          />
        </View>
        <View>
          <Text style={{ fontSize: 15, color: colors.grey1 }}>
            {item.street}
          </Text>
          <Text style={{ color: colors.grey4 }}>{item.area}</Text>
        </View>
      </TouchableOpacity>
    ),
    []
  );

  useEffect(() => {
    if (active) bottomSheetRef.current?.snapToIndex(0);
  }, [active]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleBottomSheet}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={-1}
    >
      <SheetHeader />
      <BottomSheetFlatList
        keyboardShouldPersistTabs="always"
        data={rideData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </BottomSheet>
  );
};

const SheetHeader = () => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemIcon}>
        <Icon
          type="material-community"
          name="star"
          color={colors.white}
          size={20}
        />
      </View>
      <View>
        <Text style={styles.text9}>Saved Places</Text>
      </View>
    </View>
  );
};
