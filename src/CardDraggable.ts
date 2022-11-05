import { CardBase } from "./CardBase";

export class DraggableCard extends CardBase {
    constructor(data) {
        let { onDragEnd } = data;
        super(data);
        this.originalX = this.x;
        this.originalY = this.y;
        this.draggable = true;
        this.dragging = false;
        this.onDragEnd = ondragend;
        this.setSize(this.spriteCard.width, this.spriteCard.height);
        this.setInteractive();
        // make draggable
        this.scene.input.setDraggable(this);
        
        // IS DRAGGING
        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if(!this.draggable) {
                return
            } else {
                this.dragging = true;
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
        });

        // STOP DARGGING
        this.scene.input.on('dragend', (pointer, gameObject) => {
            this.dragging = false;
            gameObject.ondragend(pointer, gameObject);
        })
    }
}
