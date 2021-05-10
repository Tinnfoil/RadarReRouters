class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
    }

    create() {
        //Initialize start time for timer;
        this.startTime = this.getTime();

        // Set up the mouse
        this.mouse = this.input.activePointer;
        this.drawInterval = 0;
        this.lastX = -1000;
        this.lastY = -1000;

        this.boatPath = null;

        this.graphics = this.add.graphics({
            x: 0,
            y: 0,
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            },
            fillStyle: {
                color: 0xffffff,
                alpha: 1
            },
        
            add: true
        });
    }

    update() {  
        //var pointer = this.input.activePointer;
        if (this.mouse.isDown && this.drawInterval > 10) {
            let touchX = this.mouse.x;
            let touchY = this.mouse.y;
            if(this.boatPath == null){
                this.boatPath = this.add.path(touchX, touchY);
                this.lastX = touchX;
                this.lastY = touchY;
            }
            else if(Math.abs(this.lastX - touchX) > 1.5 || Math.abs(this.lastY - touchY) > 1.5){
                console.log("Drawing");
                this.drawInterval = 0;
                this.boatPath.lineTo(touchX, touchY);
                this.boatPath.draw(this.graphics);
                this.lastX = touchX;
                this.lastY = touchY;
            }

        }
        else{
            this.drawInterval += this.getDeltaTime();
        }
        // KEEP THIS ON THE BOTTOM OF UPDATE
        this.updateDeltaTime();
    }

    getTime(){
        let d = new Date();
        return d.getTime();
    }

    // Get the delta time from the last update
    getDeltaTime() {
        let elapsed = this.getTime() - this.startTime;    
        return elapsed; 
    }

    //reset the start time
    updateDeltaTime() {
        this.startTime = this.getTime(); 
    }
}