/// <reference path="../bower_components/phaser/typescript/phaser.d.ts" />

class Platformer {

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }

    game: Phaser.Game;
    platforms: Phaser.Group;
    player: Phaser.Sprite;
    stars: Phaser.Group;
    score: number;
    text: Phaser.Text;
    cursors: Phaser.CursorKeys;
    state: any;

    preload() {
        this.game.load.image('sky', '../client/plat/assets/sky.png');
        this.game.load.image('ground', '../client/plat/assets/platform.png');
        this.game.load.image('star', '../client/plat/assets/star.png');
        this.game.load.spritesheet('dude', '../client/plat/assets/dude.png', 32, 48);
    }

    create() {
        this.state = {running: true};
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        var sky = this.game.add.sprite(0, 0, 'sky');

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;


        var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        var ledge = this.platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = this.platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

        this.game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.stars = this.game.add.group();
        this.stars.enableBody = true;
        this.score = 0;
        this.text = this.game.add.text(this.game.world.centerX, this.game.world.height - 20, "- Time: 15s Score: 0", {
            font: "18px Arial",
            fill: "#ff0044",
            align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);
        this.game.time.events.add(Phaser.Timer.SECOND * 15, endGame, this.game, this.state, this.text, this.score);

        //anywhere from 15 - 25 stars
        var numOfStars = Math.ceil((Math.random() * 10) + 15);
        for (var i = 0; i < numOfStars; i++) {
            //  Create a star inside of the 'stars' group
            var star = this.stars.create(i * 35, 0, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 300;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.state.running) {
            var timeLeft = this.game.time.events.duration / 1000;
            this.text.setText("Time: " + timeLeft +  "s Score:" + this.score);
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.stars, this.platforms);
            this.game.physics.arcade.overlap(this.player, this.stars, collectStar, null, this);

            this.player.body.velocity.x = 0;

            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -150;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 150;
                this.player.animations.play('right');
            }
            else {
                this.player.animations.stop();
                this.player.frame = 4;
            }

            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.body.velocity.y = -350;
            }
        }
        else {
            
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.stars, this.platforms);
            this.player.animations.stop();
            this.player.frame = 4;
        }
    }
}

function collectStar(player, star){
    star.kill();
    this.score++;
}

function endGame(state: any, text: Phaser.Text, score: number) {
    state.running = false;
    text.setText("Time: 0s Score:" + score);
}

window.onload = () => {

    var game = new Platformer();

    var restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", function (event) {
        document.body.removeChild(document.getElementsByTagName("canvas")[0]);
        game = new Platformer();
    });
};