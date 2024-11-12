import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {
  PlayPauseIcon,
  PlayCircleIcon,
  ComputerDesktopIcon,
  UsersIcon,
  HomeIcon,
} from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {playSound} from '../helpers/SoundUtility';

const iconSize = RFValue(20);

const GradientButton = ({title, onPress, iconColor = '#d5be3e'}) => {
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        marginVertical: 10,
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          playSound('ui');
          onPress();
        }}
        style={styles.btnContainer}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.button}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          {title == 'RESUME' ? (
            <PlayPauseIcon size={iconSize} color={iconColor} />
          ) : title == 'NEW GAME' ? (
            <PlayCircleIcon size={iconSize} color={iconColor} />
          ) : title == 'VS CPU' ? (
            <ComputerDesktopIcon size={iconSize} color={iconColor} />
          ) : title == 'HOME' ? (
            <HomeIcon size={iconSize} color={iconColor} />
          ) : (
            <UsersIcon size={iconSize} color={iconColor} />
          )}
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  btnContainer: {
    borderWidth: 2,

    borderWidth: 5,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: '#d5be3e',
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 10,
    borderColor: '#d5be3e',
    width: 220,
  },
  buttonText: {
    color: 'white',
    fontSize: RFValue(16),
    width: '70%',
    textAlign: 'left',
    fontFamily: 'Philosopher-Bold',
  },
});

export default GradientButton;
