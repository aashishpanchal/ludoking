import React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import {deviceHeight, deviceWidth} from '../constants/Scaling';
import BG from '../assets/images/bg.jpg';

const Wrapper = ({children, style}) => {
  return (
    <ImageBackground source={BG} resizeMode="cover" style={[styles.container]}>
      <SafeAreaView style={[styles.safeArea, {...style}]}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Wrapper;
