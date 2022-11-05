import { DraggableCard } from "./CardDraggable";

export class PlayerCard extends DraggableCard {
    constructor(data) {
        let { health } = data;
        super(data);

        this.textHealth = new Phaser.GameObjects.BitmapText(this.scene, 0, -104, 'pressstart', health, 11);
        this.textMaxHealth = new Phaser.GameObjects.BitmapText(this.scene, -45, -90, 'pressstart', health, 9);
        this.textArmor = new Phaser.GameObjects.BitmapText(this.scene, 0, 0, 'pressstart');
        this.spriteArmor = new Phaser.GameObjects.Sprite(this.scene, 50, -88, 'armor');
        this.textHealth.tint = 0; // TEXT COLOR => BLACK
        this.textMaxHealth.tint = 0; // TEXT COLOR => BLACK

        // ADD ELEMENTS TO COMPONENT
        this.add([this.textHealth, this.textMaxHealth, this.textArmor, this.spriteArmor]);

        // POSITIONING
        this.health = health;
        this.maxHealth = health;
        this.armor = 0;
    }

    set health(newHealth) {
        this._health = newHealth;
        this.textHealth.text = this._health;
        this.textHealth.x = -58 - this.textHealth.width / 2;
    }

    get health() {
        return this._health;
    }

    set maxHealth(newMaxHealth) {
        this._maxHealth = newMaxHealth;
        this.maxHealth.text = this._maxHealth;
        // this.maxHealth.x = TODO: POSITIONG ME!!!
    }

    get maxHealth() {
        return this._maxHealth;
    }

    set armor(newArmor) {
        this._armor = newArmor;
        this.textArmor.text = this._armor;
        this.textArmor.x = 46 - this.textArmor.width / 2;
        this.textArmor.alpha = this._armor === 0 ? 0 : 1; // Armor only shown when not 0
        this.spriteArmor.alpha = this._armor === 0 ? 0 : 1; // Armor only shown when not 0
    }

    get armor() {
        return this._armor;
    }

}
