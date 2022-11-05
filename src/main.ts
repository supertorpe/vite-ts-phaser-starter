import Phaser from 'phaser';
import './style.css';

import { MainGameScene } from './MainGameScene';

const config: Phaser.Types.Core.GameConfig = {
    width: 1900,
    height: 840,
    backgroundColor: '#333333',
    type: Phaser.AUTO,
    parent: 'game-container',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [MainGameScene]
  };

new Phaser.Game(config);