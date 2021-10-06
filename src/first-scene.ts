import Phaser from 'phaser';

/**
 * FirstGameScene is an example Phaser Scene
 * @class
 * @constructor
 * @public
 */
export class FirstGameScene extends Phaser.Scene {

    private gameOver!: boolean;
    private score!: number;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars!: Phaser.Physics.Arcade.Group;
    private bombs!: Phaser.Physics.Arcade.Group;
    private scoreText!: Phaser.GameObjects.Text;

    constructor() {
        super('FirstGameScene');
        console.log('FirstGameScene.constructor()');
    }

    preload() {
        console.log('FirstGameScene.preload');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        console.log('FirstGameScene.create');
        // initialize variables
        this.gameOver = false;
        this.score = 0;

        //  A simple background for our game
        this.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // The player and its settings
        this.player = this.physics.add.sprite(100, 450, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate((child: Phaser.GameObjects.GameObject) => {
            //  Give each star a slightly different bounce
            (child as Phaser.Physics.Arcade.Sprite).setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.bombs = this.physics.add.group();

        //  The score
        this.scoreText = this.add.text(16, 16, 'score: 0');
        this.scoreText.style.fontSize = '32px';
        this.scoreText.style.setFill('#000');

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb, undefined, this);
    }

    update() {
        if (this.gameOver) {
            return;
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    collectStar(playerGO: Phaser.GameObjects.GameObject, starGO: Phaser.GameObjects.GameObject) {
        const player = playerGO as Phaser.Physics.Arcade.Sprite;
        const star = starGO as Phaser.Physics.Arcade.Sprite;
        star.disableBody(true, true);
        //  Add and update the score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        if (this.stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            this.stars.children.iterate((childGO: Phaser.GameObjects.GameObject) => {
                const child = childGO as Phaser.Physics.Arcade.Sprite;
                child.enableBody(true, child.x, 0, true, true);
            });
            const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
    }

    hitBomb(playerGO: Phaser.GameObjects.GameObject) {
        const player = playerGO as Phaser.Physics.Arcade.Sprite;
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.gameOver = true;
    }
}
