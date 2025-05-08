class Firstwave extends Phaser.Scene{
    curve;
    constructor(){
    super("firstwave");
    this.my={sprite:{},text: {}};
    this.HP=10;
    this.myScore = 0;  
    }
    preload(){
        this.load.spritesheet("player", "assets/spritesheet.png",{
            frameWidth:32,
            frameHeight:32,
        });
        this.load.spritesheet("fireball", "assets/OBJ_Candles_Lights.png",{
            frameWidth:32,
            frameHeight:32,
        })
        this.load.spritesheet("dragon", "assets/flying_twin_headed_dragon-blue.png",{
            frameWidth:144,
            frameHeight:128,
        });
        this.load.spritesheet("dfire","assets/fireball.png",{
                frameWidth:32,
                frameHeight:32,
        });
        this.load.audio("dadada", "assets/jingles_NES13.ogg");
        this.load.image("whitePuff00", "whitePuff00.png");
            this.load.image("whitePuff01", "whitePuff01.png");
            this.load.image("whitePuff02", "whitePuff02.png");
            this.load.image("whitePuff03", "whitePuff03.png");
    
    
    }
    create(){

        this.anims.create({
            key: "puff",
            frames: [
                { key: "whitePuff00" },
                { key: "whitePuff01" },
                { key: "whitePuff02" },
                { key: "whitePuff03" },
            ],
            frameRate: 20,  
            repeat: 5,
            hideOnComplete: true
        });

        this.point1=[
            850,200,
            850,400,
            850,500,
            900,300,
            950,200,
            950,500,
            950,550,
            1000,300,
            1000,500,
            1100,400
        ]
        this.point2=[

            850,300,
            850,100,
            850,500,
            900,300,
            950,100,
            950,500,
            950,550,
            1000,300,
            1000,450,
            1100,200

        ]
        this.point3=[
            600,300,
            600,150,
            600,100,
            700,200,
            700,400,
            700,350
        ]
        this.wave1=true;
        this.t1=true;
        this.wave2=false;
        this.t2=true;
        this.wave3=false;
        this.t3=true;
        
        let my=this.my;
        this.dragonyp1=100;
       this. dragonyp2=500;
    
        this.anims.create({
            key:"walk",
            frames:this.anims.generateFrameNumbers("player",{frames:[66,67,68]}),
            frameRate:16,
            repeat:-1
        })
        my.sprite.player=this.add.sprite(100,100,"player",73);
        my.sprite.player.setScale(2);
        my.sprite.player.hp=3;
        my.text.playHP=this.add.text(100,0,"HP"+my.sprite.player.hp).setScale(3);
    
        //龙
        
        my.sprite.dragon=this.add.sprite(800,300,"dragon",10).setScale(2);
        my.sprite.dragon.hp=30;
        my.text.dragonhp=this.add.text(300,500,"DragonHP"+ my.sprite.dragon.hp).setScale(3);
        my.sprite.dragon.active=false;
        my.sprite.dragon.visible=false;
        this.anims.create({
            key:"fly",
            frames:this.anims.generateFrameNumbers("dragon",{frames:[10,11,12]}),
            frameRate:4,
            repeat:-1
        })
        this.p=true;
        my.sprite.dragon.coolcount=0;
        my.sprite.dragon.cooldown=30;
        this.keyW=this.input.keyboard.addKey("W");
        this.keyS=this.input.keyboard.addKey("S");
        this.kspace=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        my.text.Score=this.add.text(500,0,"score"+this.myScore).setScale(3);
        
        //巫女组
        my.sprite.witchs=this.add.group({
            defaultKey:"player",
            maxSize:6
        });
        my.sprite.witchs.createMultiple({
            active:false,
            key:my.sprite.witchs.defaultKey,
            repeat:5,
            frame:22,
    
        });
        for(let witch of my.sprite.witchs.getChildren()){
            witch.coolcount = 0; 
            witch.cooldown = 30;
        }
        //敌人火球组
        my.sprite.mfire=this.add.group({
            defaultKey:"fireball",
            maxSize:20
        })
        my.sprite.mfire.createMultiple({
            active:false,
            key:my.sprite.mfire.defaultKey,
            repeat:100,
            frame:13,
        })
        //
    
        //主人公火球组
        my.sprite.firegroup=this.add.group({
            defaultKey: "fireball",
            maxSize:10
    
        })
        my.sprite.firegroup.createMultiple({
            active:false,
            key:my.sprite.firegroup.defaultKey,
            hasHit:false, 
            repeat:9
        });
        //怪物组
        my.sprite.monsters=this.add.group({
            defaultKey:"player",
            maxSize:15
        });
    
        my.sprite.monsters.createMultiple({
            active:false,
            key:my.sprite.monsters.defaultKey,
            frame:67,
            repeat:14
    
        })
        
        //怪物位置生成
       /* for(let monster of my.sprite.monsters.getChildren()){
            
            monster.x=Math.random()*(1000-800)+800 ;
            monster.y=Math.random()*(560-40)+40;
            monster.visible=true;
            monster.setScale(2);
        }*/
        
    
    }
    
    
    update(){
    
    
    
        let my=this.my;
       my.text.playHP.setText("HP"+my.sprite.player.hp);
    
        //按键设定
        if(this.keyW.isDown){
        my.sprite.player.y-=5;
    }
    
    if(this.keyS.isDown){
    my.sprite.player.y+=5;
    }
    // 龙的行为
    if(my.sprite.dragon.active){

    my.sprite.dragon.play("fly",true);
    if(my.sprite.dragon.x>400){
        my.sprite.dragon.x--;
    }
    else{
        my.sprite.dragon.coolcount--;
        if(this.p==true){
            my.sprite.dragon.y+=5;
        }
        if(this.p==false){
            my.sprite.dragon.y-=5;
        }
        if(my.sprite.dragon.y<=this.dragonyp1){
            this.p=true;
    
        }
        if(my.sprite.dragon.y>=this.dragonyp2){
            this.p=false;
        }
        if( my.sprite.dragon.coolcount<=0){
            let mf= my.sprite.mfire.getFirstDead();
               if(mf!=null){
                   mf.x=my.sprite.dragon.x;
                   mf.y=my.sprite.dragon.y;
                   mf.visible=true;
                   mf.active=true;
                   mf.setScale(2);
                   my.sprite.dragon.coolcount=my.sprite.dragon.cooldown;
               }
       }



    }
        
    }
    for (let fire of my.sprite.firegroup.getChildren()){
        if(this.collides(fire,my.sprite.dragon)&&my.sprite.dragon.active){
            if(fire.active){
                my.sprite.dragon.hp--;
                fire.active=false;
                fire.visible=false;
            }
        }
}
    
    //
    
    if(Phaser.Input.Keyboard.JustDown(this.kspace)){
        let fire=my.sprite.firegroup.getFirstDead();
        if(fire!=null){
            fire.active=true;
            fire.visible=true;
            fire.x=my.sprite.player.x;
            fire.y=my.sprite.player.y;
            fire.setScale(2);
            fire.hasHit=false; 
        }
     
    }
    
    
    for(let witch of my.sprite.witchs.getChildren()){
        if(witch.active==true){
        witch.coolcount--;
    
        if(witch.x>400){
            witch.x-=1; 
        }
        if(witch.x<=400){
            if(witch.coolcount<=0){
         let mf= my.sprite.mfire.getFirstDead();
            if(mf!=null){
                mf.x=witch.x;
                mf.y=witch.y;
                mf.visible=true;
                mf.active=true;
                mf.setScale(2);
                witch.coolcount=witch.cooldown;
            }
    
    }
        }
    }
    }
    for(let mf of my.sprite.mfire.getChildren()){
            if(mf.active){
                mf.x-=5;
            
            if(mf.x<=0){
                mf.active=false;
                mf.visible=false;
            }
            if(this.collides(mf,my.sprite.player)){
                

            }
        }
        
    }
    
    for(let monster of my.sprite.monsters.getChildren()){
        if(monster.active){
        monster.x-=1;
        monster.play("walk",true);
        } 
    }
    
    for(let fire of my.sprite.firegroup.getChildren()){
        if (fire.active) {  
            fire.x += 10;
            if (fire.x > 700) {
                fire.active = false;
                fire.visible = false;
                fire.hasHit = false; 
            }
            my.sprite.monsters.getChildren().forEach(monster=>{
                if(monster.active&&this.collides(fire,monster)){
                    fire.active=false;
                    fire.visible=false;
                    monster.visible=false;
                    monster.active=false;  
                    this.sound.play("dadada", {
                        volume: 0    
                    });
    
                    this.myScore+=50;
                    this.updateScore() ;
                }
            })
            my.sprite.witchs.getChildren().forEach(witch=>{
                if(witch.active&&this.collides(fire,witch)){
                    fire.active=false;
                    fire.visible=false;
                    witch.visible=false;
                    witch.active=false;  
                    this.sound.play("dadada", {
                        volume: 0    
                    });
                    this.myScore+=100;
                    this.updateScore() ;
                }
            })
         
    }
    }

   
    if(my.sprite.dragon.hp<=0){
        my.sprite.dragon.visible=false;
        my.sprite.dragon.active=false;
    }

                if(this.wave1){

                        if(this.t1==true){
                    for (let i = 0; i < this.point1.length; i += 2) {
                        let p = my.sprite.monsters.getFirstDead();
                        if (p != null) {
                            p.x = this.point1[i];
                            p.y = this.point1[i + 1];
                            p.visible = true;
                            p.active = true;
                            p.setScale(2);
                        }
                    } 
                    this.t1=false;
                }
                


                    if(this.myScore>=500){
                        this.wave1=false;
                        this.wave2=true;
                    }


                }
                if(this.wave2){

                        if(this.t2==true){
                            for (let i = 0; i < this.point2.length; i += 2) {
                                let p = my.sprite.monsters.getFirstDead();
                                if (p != null) {
                                    p.x = this.point2[i];
                                    p.y = this.point2[i + 1];
                                    p.visible = true;
                                    p.active = true;
                                    p.setScale(2);
                                }
                            } 
                          
                                for (let i = 0; i < this.point3.length; i += 2) {
                                    let p = my.sprite.witchs.getFirstDead();
                                    if (p != null) {
                                        p.x = this.point3[i];
                                        p.y = this.point3[i + 1];
                                        p.visible = true;
                                        p.active = true;
                                        p.setScale(2);
                                    }
                                
                             }
                           
                            this.t2=false;
                }
                if(this.myScore>=1600){
                    this.wave2=false;
                    this.wave3=true;

                }

            }
            if(this.wave3){
                if(this.t3==true){
                    my.sprite.dragon.active=true;
                    my.sprite.dragon.visible=true;
                    this.t3=false;
                }
               


                my.text.dragonhp.setText("DragonHP"+my.sprite.dragon.hp);

            }
           

    
    
    
    
    }
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
    updateScore() {
        let my = this.my;
        my.text.Score.setText("Score"+this.myScore);
    }
    
    
    }