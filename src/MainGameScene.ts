import Phaser from "phaser";

import { CardPlayer } from "./CARDPLAYERRRRRR";
import { Grid } from "./Grid";

export class MainGameScene extends Phaser.Scene {
    constructor() {
        super('MainGameScene');
    }

    preload() {
        // ICONS
        this.load.image('dead', 'assets/icons/Died.png');
        this.load.image('armor', 'assets/icons/Shield.png');
        this.load.image('player', 'assets/icons/Player_Icon.png');

        // ITEMS
        this.load.image('healthpotion', 'assets/items/Health_Potion.png');

        // MONSTERS
        this.load.image('corruptedelfwizard', 'assets/monsters/Corrupted_Elf_Wizard.png');
        this.load.image('goblin', 'assets/monsters/Goblin.png');
        this.load.image('kobold', 'assets/monsters/Kobold.png');
        this.load.image('lich', 'assets/monsters/Lich.png');
        this.load.image('orcknight', 'assets/monsters/Orc_Knight.png');
        this.load.image('siren', 'assets/monsters/Siren.png');
        this.load.image('butcher', 'assets/monsters/The_Butcher.png');

        // UI
        this.load.image('card', 'assets/UI/Card.png');
        this.load.image('playercard', 'assets/UI/Player_Card.png');
        this.load.image('restartbtn', 'assets/UI/Restart_Button.png');

        // FONT
        this.load.bitmapFont('pressstart', 'assets/fonts/PressStart2P.png', 'assets/fonts/PressStart2P.xml');
    }

    create() {
        this.grid = new Grid({scene: this, columns: 9, rows: 9});

        this.player = new CardPlayer({
            scene: this,
            name: 'Player',
            x: this.game.config.width / 2,
            y: this.game.config.height - 150,
            card: 'playercard',
            image: 'player',
            health: 100,
            depth: 1, // player card should be on top of all other cards
            ondragend: (pointer, gameObject) => {},
        });
    }

}
