import {Colors} from '../constants/Colors';

interface Image {
  name: string | number;
  image: any;
}
export class BackgroundImage {
  private static images: Array<Image> = [
    {
      name: 1,
      image: require('../assets/images/dice/1.png'),
    },
    {
      name: 2,
      image: require('../assets/images/dice/2.png'),
    },
    {
      name: 3,
      image: require('../assets/images/dice/3.png'),
    },
    {
      name: 4,
      image: require('../assets/images/dice/4.png'),
    },
    {
      name: 5,
      image: require('../assets/images/dice/5.png'),
    },
    {
      name: 6,
      image: require('../assets/images/dice/6.png'),
    },
    {
      name: Colors.green,
      image: require('../assets/images/piles/green.png'),
    },
    {
      name: Colors.red,
      image: require('../assets/images/piles/red.png'),
    },
    {
      name: Colors.yellow,
      image: require('../assets/images/piles/yellow.png'),
    },
    {
      name: Colors.blue,
      image: require('../assets/images/piles/blue.png'),
    },
  ];
  static GetImage = (name: string) => {
    const found = BackgroundImage.images.find(e => e.name === name);
    return found ? found.image : null;
  };
}
