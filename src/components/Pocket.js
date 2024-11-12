import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  unfreezeDice,
  updatePlayerPieceValue,
} from '../redux/reducers/gameSlice';
import {Colors} from '../constants/Colors';
import {startingPoints} from '../helpers/PlotData';
import Pile from './Pile';

const Pocket = React.memo(({color, player, data}) => {
  const dispatch = useDispatch();

  const handlePress = async value => {
    let playerNo = value?.id?.slice(0, 1);
    switch (playerNo) {
      case 'A':
        playerNo = 'player1';
        break;
      case 'B':
        playerNo = 'player2';
        break;
      case 'C':
        playerNo = 'player3';
        break;
      default:
        playerNo = 'player4';
        break;
    }

    dispatch(
      updatePlayerPieceValue({
        playerNo: playerNo,
        pieceId: value.id,
        pos: startingPoints[parseInt(playerNo.match(/\d+/)[0], 10) - 1],
        travelCount: 1,
      }),
    );
    dispatch(unfreezeDice());
  };

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.childFrame}>
        <View style={styles.flexRow}>
          <Plot
            pieceNo={0}
            player={player}
            color={color}
            data={data}
            handlePress={handlePress}
          />
          <Plot
            pieceNo={1}
            player={player}
            color={color}
            data={data}
            handlePress={handlePress}
          />
        </View>
        <View style={[styles.flexRow, {marginTop: 20}]}>
          <Plot
            pieceNo={2}
            player={player}
            color={color}
            data={data}
            handlePress={handlePress}
          />
          <Plot
            pieceNo={3}
            player={player}
            color={color}
            data={data}
            handlePress={handlePress}
          />
        </View>
      </View>
    </View>
  );
});

const Plot = ({pieceNo, player, color, data, handlePress}) => {
  return (
    <View style={[styles.plot, {backgroundColor: color}]}>
      {data && data[pieceNo]?.pos === 0 && (
        <Pile
          player={player}
          color={color}
          onPress={() => {
            handlePress(data[pieceNo]);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '100%',
    borderColor: Colors.borderColor,
  },
  childFrame: {
    backgroundColor: 'white',
    borderWidth: 0.4,
    padding: 15,
    width: '70%',
    height: '70%',
    borderColor: Colors.borderColor,
  },
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '40%',
    flexDirection: 'row',
  },
  plot: {
    backgroundColor: Colors.green,
    height: '80%',
    width: '36%',
    borderRadius: 50,
  },
});

export default Pocket;
