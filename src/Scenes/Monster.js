class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
        this.bullets = { bullet: [] };
        this.spaceship=null;
       

        //Create constants for the monster location
        this.bX=400;
        this.bY=500;
        this.bodyX = 300;
        this.bodyY = 350;
        this.eyeX=this.bodyX;
        this.eyeY=this.bodyY;
        this.mouthX=this.bodyX;
        this.mouthY=this.bodyY+50;
        this.leftHandX = this.bodyX - 90;
        this.leftHandY = this.bodyY + 50;
        this.rightHandX = this.bodyX + 90;
        this.rightHandY = this.bodyY + 50;
        this.rightlegX=this.bodyX+60;
        this.rightlegY=this.bodyY+120;
        this.leftlegX=this.bodyX-60;
        this.leftlegY=this.bodyY+120;
        this.detailX=this.bodyX;
        this.detailY=this.bodyY-90;

    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");
        

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        this.load.image("bullet", "laserBlue01.png");
        this.load.image("playerShip1_blue","playerShip1_blue.png")
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.righthand = this.add.sprite(this.rightHandX, this.rightHandY, "monsterParts", "arm_blueB.png");  
        my.sprite.lefthand = this.add.sprite(this.leftHandX, this.leftHandY, "monsterParts", "arm_blueB.png"); 
        my.sprite.lefthand.flipX = true;
        my.sprite.rightleg = this.add.sprite(this.rightlegX, this.rightlegY, "monsterParts", "leg_blueD.png");  
        my.sprite.leftleg = this.add.sprite(this.leftlegX, this.leftlegY, "monsterParts", "leg_blueD.png");  
        my.sprite.leftleg.flipX=true;
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_blueD.png");
        my.sprite.dimeple = this.add.sprite(this.eyeX, this.eyeY, "monsterParts", "eye_angry_blue.png");
        my.sprite.smilee=this.add.sprite(this.eyeX, this.eyeY, "monsterParts","eye_cute_light.png" );
        my.sprite.smilee.visible=false;
        my.sprite.fangs= this.add.sprite( this.mouthX, this.mouthY,"monsterParts","mouthF.png");
        my.sprite.smilem=this.add.sprite( this.mouthX, this.mouthY,"monsterParts","mouthA.png");
        my.sprite.smilem.visible=false;
        my.sprite.detail=this.add.sprite( this.detailX, this.detailY,"monsterParts","detail_blue_antenna_large.png" );
        this.keyspace=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


        this.keyS.on('down', () => {
            my.sprite.fangs.visible = false;
            my.sprite.smilem.visible=true;
            my.sprite.dimeple.visible=false;
            my.sprite.smilee.visible=true;
        });
        this.keyF=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyF.on('down', () => {
            my.sprite.fangs.visible = true;
            my.sprite.smilem.visible=false;
            my.sprite.dimeple.visible=true;
            my.sprite.smilee.visible=false;
        });
        
        this.keyA=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyspace=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //this.spaceship=this.add.sprite(this.bX,this.bY,"playerShip1_blue");
        
        
    }

    update() {
       // let spaceship=this.spaceship;
        let my = this.my;    // create an alias to this.my for readability
        if (this.keyA.isDown) {
            for (let part in my.sprite) {
                my.sprite[part].x -= 1; 
            }
        
        }
            
        if (this.keyD.isDown) {
            for (let part in my.sprite) {
                my.sprite[part].x += 1; 
            }
        
        }
          /*  if (this.keyA.isDown) {
               this.spaceship.x-=5;
            
            }
            if (this.keyD.isDown) {
                this.spaceship.x+=5;
             
             }

        if(this.keyspace.isDown){
            let bullet = this.add.sprite(this.spaceship.x, this.spaceship.y,"bullet");
            this.bullets.bullet.push(bullet);
        }
        this.bullets.bullet.forEach((bullet) => {
            bullet.y -= 5; 
        });*/

        

       
    }

}