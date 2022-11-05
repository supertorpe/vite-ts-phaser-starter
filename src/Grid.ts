import { CardGrid } from "./CardGrid";
import cardTypes from "./CardTypes";

export class Grid {
    constructor(data: any) {
        let { scene, columns, rows } = data;
        this.xOffset = 120;
        this.yOffset = 280;
        this.yStart = scene.game.config.height / 2;
        this.columns = columns;
        this.rows = rows;
        this.scene = scene;
        this.cards = [];
        this.addCards(0);
    }

    addCards(startIndex: number) {
        for(let i = startIndex; i < this.columns * this.rows; i++) {
            const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            let card = new CardGrid({
                scene: this.scene,
                x: this.xOffset + (this.scene.game.config.width / 4.8 - this.xOffset) * (i % this.columns),
                y: this.yStart - this.yOffset * Math.floor(i / this.columns),
                card: 'card',
                image: cardType.image,
                value: cardType.value,
                name: cardType.name,
                type: cardType.type,
            });
            card.depth = 0;
            this.cards.push(card);
        }
    }
}
