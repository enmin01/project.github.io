class Startscene extends Phaser.Scene {
    constructor(){
        super("startscene");
        this.my={spirit:{}};
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("map", "map.png");
        this.load.bitmapFont("minecraft", "dsd.png", "dsd.fnt");

    }
    create(){
        this.startkey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.map=this.add.image(400,300,"map");
        document.getElementById('description').innerHTML = '<h2>Array Boom.js</h2><br>A: left // D: right // Space:Start the game'
        this.starttext=this.add.text(350,400,"start",{
            font:"50px minecraft",
            fill:'#ffffff'
        });
        
        this.starttext.setInteractive();
        this.starttext.on('pointerover', () => {
            this.starttext.setScale(1.2); 
            this.starttext.setColor('#ffff00'); 
        });

        this.starttext.on('pointerout', () => {
            this.starttext.setScale(1);
            this.starttext.setColor('#ffffff'); 
        });

        this.starttext.on('pointerdown', () => {
            this.scene.start("firstwave"); 
        });
    }
    update(){
       
            if (Phaser.Input.Keyboard.JustDown(this.startkey)) {
                this.scene.start("firstwave");
            }
    
            
        }



}