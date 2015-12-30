/// <reference path="../bower_components/phaser/typescript/phaser.d.ts" />
var Platformer = (function () {
    function Platformer() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    Platformer.prototype.preload = function () {
        this.game.load.image('sky', '../client/plat/assets/sky.png');
        this.game.load.image('ground', '../client/plat/assets/platform.png');
        this.game.load.image('star', '../client/plat/assets/star.png');
        this.game.load.spritesheet('dude', '../client/plat/assets/dude.png', 32, 48);
    };
    Platformer.prototype.create = function () {
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
        var text = this.game.add.text(this.game.world.centerX, this.game.world.height - 20, "- Time: 15s Score: 0", {
            font: "18px Arial",
            fill: "#ff0044",
            align: "center"
        });
        this.gameInfo = {
            score: 0,
            running: true,
            text: text
        };
        this.gameInfo.text.anchor.setTo(0.5, 0.5);
        this.game.time.events.add(Phaser.Timer.SECOND * 15, endGame, this.game, this.gameInfo);
        var numOfStars = Math.ceil((Math.random() * 10) + 15);
        for (var i = 0; i < numOfStars; i++) {
            var star = this.stars.create(i * 35, 0, 'star');
            //star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        this.cursors = this.game.input.keyboard.createCursorKeys();
    };
    Platformer.prototype.update = function () {
        if (this.gameInfo.running) {
            var timeLeft = this.game.time.events.duration / 1000;
            this.gameInfo.text.setText("Time: " + timeLeft + "s Score:" + this.gameInfo.score);
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.stars, this.platforms);
            this.game.physics.arcade.collide(this.stars, this.stars);
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
            this.player.body.velocity.x = 0;
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.stars, this.platforms);
            this.player.animations.stop();
            this.player.frame = 4;
        }
    };
    return Platformer;
})();
function collectStar(player, star) {
    star.kill();
    this.gameInfo.score++;
}
function endGame(gameInfo) {
    gameInfo.running = false;
    gameInfo.text.setText("Time: 0s Score:" + gameInfo.score);
}
//function to calculate if a given rectangular area collides with any other object already
//in the game
function isFreeSpace(startPoint, endPoint) {
}
window.onload = function () {
    var game = new Platformer();
    var restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", function (event) {
        document.body.removeChild(document.getElementsByTagName("canvas")[0]);
        game = new Platformer();
    });
};
//# sourceMappingURL=plat.js.map