// Container is a collection of Game Objects
// They will move around with eachother
// bundeling them into one Group basicly
export class CardBase extends Phaser.GameObjects.Container {
    constructor(data) {
        let { scene, x, y, name, card, image, depth } = data;
        let spriteCard = new Phaser.GameObjects.Sprite(scene, 0, 0, card);
        let spriteImage = new Phaser.GameObjects.Sprite(scene, 0, 10, image);
        let textName = new Phaser.GameObjects.BitmapText(scene, 0, 0, 'pressstart', name, 14, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        
        // pass information to container:
        super(scene, x, y, [spriteCard, spriteImage, textName]);
        
        this.spriteCard = spriteCard;
        this.spriteImage = spriteImage;
        this.textName = textName;
        this.cardName = name;
        this.depth = depth;
        this.scene = scene;
        this.scene.add.existing(this);
    }

    // POSITIONING CARD NAME TEXT
    set cardName(newName) {
        this._cardName = newName;
        this.textName.text = this._cardName;
        this.textName.maxWidth = this.spriteCard.width;
        this.textName.tint = 0; // text color (0 => BLACK)
        this.textName.x = -this.textName.width / 2;
        this.textName.y = 115 - this.textName.height;
    }
}
