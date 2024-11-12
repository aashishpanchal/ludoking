import React, {useEffect, useRef, useCallback} from 'react';
import {
  Text,
  Animated,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import Wrapper from '../components/Wrapper';
import {deviceHeight, deviceWidth} from '../constants/Scaling';
import Logo from '../assets/images/logo.png';
import GradientButton from '../components/GradientButton';
import {useDispatch, useSelector} from 'react-redux';
import {resetGame} from '../redux/reducers/gameSlice';
import {navigate} from '../helpers/NavigationUtil';
import {playSound} from '../helpers/SoundUtility';
import {useIsFocused} from '@react-navigation/native';
import SoundPlayer from 'react-native-sound-player';
import LottieView from 'lottie-react-native';
import Witch from '../assets/animation/witch.json';
import {selectCurrentPositions} from '../redux/reducers/gameSelectors';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const currentPosition = useSelector(selectCurrentPositions);
  const isFocused = useIsFocused();

  const witchAnim = useRef(new Animated.Value(-deviceWidth)).current;
  const scaleXAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    if (isFocused) {
      playSound('home');
    }
  }, [isFocused]);

  useEffect(() => {
    const loopAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(witchAnim, {
              toValue: deviceWidth * 0.02,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXAnim, {
              toValue: -1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.delay(3000),
          Animated.parallel([
            Animated.timing(witchAnim, {
              toValue: deviceWidth * 2,
              duration: 8000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXAnim, {
              toValue: -1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(witchAnim, {
              toValue: -deviceWidth * 0.05,
              duration: 3000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.delay(3000),
          Animated.parallel([
            Animated.timing(witchAnim, {
              toValue: -deviceWidth * 2,
              duration: 8000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ).start();
    };

    const cleanupAnimation = () => {
      Animated.timing(witchAnim).stop();
      Animated.timing(scaleXAnim).stop();
    };

    loopAnimation();

    return cleanupAnimation;
  }, [witchAnim, scaleXAnim]);

  const startGame = async (isNew = false) => {
    SoundPlayer.stop();
    if (isNew) {
      dispatch(resetGame());
    }
    navigate('LudoBoardScreen');
    playSound('game_start');
  };

  // Memoized callbacks
  const handleResumePress = useCallback(() => {
    startGame();
  }, []);

  const handleNewGamePress = useCallback(() => {
    startGame(true);
  }, []);

  // Render function (not using useCallback here because it's simple)
  const renderButton = useCallback(
    (title, onPress) => <GradientButton title={title} onPress={onPress} />,
    [],
  );

  return (
    <Wrapper style={{justifyContent: 'flex-start'}}>
      <Animated.View style={styles.imgContainer}>
        <Image source={Logo} style={styles.img} />
      </Animated.View>

      {currentPosition.length !== 0 &&
        renderButton('RESUME', handleResumePress)}
      {renderButton('NEW GAME', handleNewGamePress)}
      {renderButton('VS CPU', () => Alert.alert('Coming Soon! Click New Game'))}
      {renderButton('2 VS 2', () => Alert.alert('Coming Soon! Click New Game'))}

      <Animated.View
        style={[
          styles.witchContainer,
          {
            transform: [{translateX: witchAnim}, {scaleX: scaleXAnim}],
          },
        ]}>
        <Pressable
          onPress={() => {
            const random = Math.floor(Math.random() * 3) + 1;
            playSound(`girl${random}`);
          }}>
          <LottieView
            hardwareAccelerationAndroid
            source={Witch}
            autoPlay
            speed={1}
            style={styles.witch}
          />
        </Pressable>
      </Animated.View>

      <Text style={styles.artist}>Made By - Aashish Panchal ™</Text>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: deviceWidth * 0.6,
    height: deviceHeight * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    alignSelf: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  artist: {
    position: 'absolute',
    bottom: 40,
    color: 'white',
    fontWeight: '800',
    opacity: 0.5,
    fontStyle: 'italic',
  },
  witchContainer: {
    position: 'absolute',
    top: '70%',
    left: '24%',
  },
  witch: {
    height: 250,
    width: 250,
    transform: [{rotate: '25deg'}],
  },
});

export default HomeScreen;
