/// <reference path="bower_components/phaser/typescript/phaser.d.ts" />
var Game = (function () {
    function Game() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    Game.prototype.preload = function () {
        this.game.load.image('sky', 'client/assets/sky.png');
        this.game.load.image('ground', 'client/assets/platform.png');
        this.game.load.image('star', 'client/assets/star.png');
        this.game.load.spritesheet('dude', 'client/assets/dude.png', 32, 48);
    };
    Game.prototype.create = function () {
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
        this.cursors = this.game.input.keyboard.createCursorKeys();
    };
    Game.prototype.update = function () {
        this.game.physics.arcade.collide(this.player, this.platforms);
        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            //  Move to the left
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            //  Move to the right
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        }
        else {
            //  Stand still
            this.player.animations.stop();
            this.player.frame = 4;
        }
        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
    };
    return Game;
})();
window.onload = function () {
    var game = new Game();
};
//# sourceMappingURL=game.js.map