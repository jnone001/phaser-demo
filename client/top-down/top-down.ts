/// <reference path="../bower_components/phaser/typescript/phaser.d.ts" />

class TopDownAdvGame {

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }

    game: Phaser.Game;
    platforms: Phaser.Group;
    player: Phaser.Sprite;
    cursors: Phaser.CursorKeys;

    preload() {
        //this.game.load.image('sky', 'client/assets/sky.png');
        //this.game.load.image('ground', 'client/assets/platform.png');
        //this.game.load.image('star', 'client/assets/star.png');
        //this.game.load.spritesheet('dude', 'client/assets/dude.png', 32, 48);
    }

    create() {
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //var sky = this.game.add.sprite(0, 0, 'sky');

        //this.platforms = this.game.add.group();
        //this.platforms.enableBody = true;


        //var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
        //ground.scale.setTo(2, 2);
        //ground.body.immovable = true;

        //var ledge = this.platforms.create(400, 400, 'ground');
        //ledge.body.immovable = true;
        //ledge = this.platforms.create(-150, 250, 'ground');
        //ledge.body.immovable = true;

        //this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

        //this.game.physics.arcade.enable(this.player);
        //this.player.body.bounce.y = 0.2;
        //this.player.body.gravity.y = 300;
        //this.player.body.collideWorldBounds = true;

        //this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        //this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        //this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        //this.game.physics.arcade.collide(this.player, this.platforms);

        //this.player.body.velocity.x = 0;

        //if (this.cursors.left.isDown) {
        //    this.player.body.velocity.x = -150;
        //    this.player.animations.play('left');
        //}
        //else if (this.cursors.right.isDown) {
        //    this.player.body.velocity.x = 150;
        //    this.player.animations.play('right');
        //}
        //else {
        //    this.player.animations.stop();
        //    this.player.frame = 4;
        //}

        //if (this.cursors.up.isDown && this.player.body.touching.down) {
        //    this.player.body.velocity.y = -350;
        //}
    }
}

window.onload = () => {

    var game = new TopDownAdvGame();

};