import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Polygon} from 'react-native-svg';
import {Colors} from '../constants/Colors';
import {deviceHeight, deviceWidth} from '../constants/Scaling';
import Fireworks from '../assets/animation/firework.json';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateFireworks} from '../redux/reducers/gameSlice';
import Pile from './Pile';
import {selectFireworks} from '../redux/reducers/gameSelectors';

const FourTriangles = React.memo(({player1, player2, player3, player4}) => {
  const size = 300;
  const isFirework = useSelector(selectFireworks);
  const [blast, setBlast] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirework) {
      setBlast(true);
      const timer = setTimeout(() => {
        setBlast(false);
        dispatch(updateFireworks(false));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isFirework, dispatch]);

  const playersData = useMemo(
    () => [
      {
        player: player1,
        top: 55,
        left: 15,
        pieceColor: Colors.red,
        translate: 'translateX',
      },
      {
        player: player3,
        bottom: 52,
        left: 15,
        pieceColor: Colors.yellow,
        translate: 'translateX',
      },
      {
        player: player2,
        top: 20,
        left: -2,
        pieceColor: Colors.green,
        translate: 'translateY',
      },
      {
        player: player4,
        top: 20,
        right: -2,
        pieceColor: Colors.blue,
        translate: 'translateY',
      },
    ],
    [player1, player2, player3, player4],
  );

  const renderPlayerPieces = useCallback(
    (data, index) => (
      <PlayerPieces
        key={index}
        player={data.player.filter(item => item.travelCount === 57)}
        style={{
          top: data.top,
          bottom: data.bottom,
          left: data.left,
          right: data.right,
        }}
        pieceColor={data.pieceColor}
        translate={data.translate}
      />
    ),
    [],
  );

  return (
    <View style={styles.mainContainer}>
      {blast && (
        <LottieView
          source={Fireworks}
          autoPlay
          loop
          hardwareAccelerationAndroid
          speed={1}
          style={styles.lottieView}
        />
      )}
      <Svg height={size} width={size - 5}>
        <Polygon
          points={`0,0 ${size / 2},${size / 2} ${size},0`}
          fill={Colors.yellow}
        />
        <Polygon
          points={`${size},0 ${size},${size} ${size / 2},${size / 2}`}
          fill={Colors.blue}
        />
        <Polygon
          points={`0,${size} ${size / 2},${size / 2} ${size},${size}`}
          fill={Colors.red}
        />
        <Polygon
          points={`0,0 ${size / 2},${size / 2} 0,${size}`}
          fill={Colors.green}
        />
      </Svg>
      {playersData.map(renderPlayerPieces)}
    </View>
  );
});

const PlayerPieces = React.memo(({player, style, pieceColor, translate}) => {
  return (
    <View style={[styles.container, style]}>
      {player.map((piece, index) => (
        <View
          key={piece.id}
          style={{
            top: 0,
            zIndex: 99,
            position: 'absolute',
            bottom: 0,
            transform: [{scale: 0.5}, {[translate]: 14 * index}],
          }}>
          <Pile
            cell={true}
            player={player}
            onPress={() => {}}
            pieceId={piece.id}
            color={pieceColor}
          />
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    width: '20%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: 'white',
    borderColor: Colors.borderColor,
  },
  lottieView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    width: deviceWidth * 0.063,
    height: deviceHeight * 0.032,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default FourTriangles;
