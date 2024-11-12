import SoundPlayer from 'react-native-sound-player';

export const playSound = (soundName, loop = false) => {
  try {
    const soundPath = getSoundPath(soundName);
    SoundPlayer.playAsset(soundPath);
  } catch (e) {
    console.log(`cannot play the sound file`, e);
  }
};

const getSoundPath = soundName => {
  switch (soundName) {
    case 'dice_roll':
      return require('../assets/sfx/dice_roll.mp3');
    case 'cheer':
      return require('../assets/sfx/cheer.mp3');
    case 'game_start':
      return require('../assets/sfx/game_start.mp3');
    case 'collide':
      return require('../assets/sfx/collide.mp3');
    case 'home_win':
      return require('../assets/sfx/home_win.mp3');
    case 'pile_move':
      return require('../assets/sfx/pile_move.mp3');
    case 'safe_spot':
      return require('../assets/sfx/safe_spot.mp3');
    case 'ui':
      return require('../assets/sfx/ui.mp3');
    case 'home':
      return require('../assets/sfx/home.mp3');
    case 'girl2':
      return require('../assets/sfx/girl2.mp3');
    case 'girl1':
      return require('../assets/sfx/girl1.mp3');
    case 'girl3':
      return require('../assets/sfx/girl3.mp3');
    default:
      throw new Error(`Sound ${soundName} not found`);
  }
};
