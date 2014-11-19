/**
 * Created by micro3x on 13.11.14.
 */

require.config({
    paths: {
        objects: 'objects',
        kineticjs: 'libs/kinetic-v5.1.0.min',
        gameEngine: 'gameEngine'
    }
});


require(['kineticjs', 'objects', 'gameEngine'], function (Kinetic, obj, engine) {

    // Stage Setup
    var stage = new Kinetic.Stage({
        width: 800,
        height: 600,
        container: 'stage-container'
    });

    // array with all trees init
    var trees = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    var treesLayer = new Kinetic.Layer();
    stage.add(treesLayer);
    treesLayer.setZIndex(0);
    engine.initInitialTrees(trees, treesLayer);

    engine.loadBackground('bkground.png',stage);

    // main character create and put on screen
    var heroLayer = new Kinetic.Layer();
    stage.add(heroLayer);
    heroLayer.setZIndex(2);

    var hero = obj.hero(400, 480);
    heroLayer.add(hero);
    hero.start();

    // init all things on hero Layer
    var displayHeads = [
        obj.live(742, 240),
        obj.live(742, 300),
        obj.live(742, 360)
    ];
    var displayFood = [
        obj.food(150,117,'steak'),
        obj.food(250,117,'drink'),
        obj.food(350,117,'axe'),
        obj.food(450,117,'cow'),
        obj.food(550,117,'gold')
    ];
    engine.loadHeroLayer(heroLayer, displayHeads, displayFood);

    var score = 0;
    var fieldScore = document.getElementById('score');
    fieldScore.innerText = score.toString();

    // start of animation
    requestAnimationFrame(executeFrame, document);

    function executeFrame() {
        hero.setAttr('inCollision', false);
        var inCollision = true;
        var timeout = 10;

        var pointOfCollision = {
            x: hero.x() + (hero.width() / 2),
            y: hero.y() + hero.height()
        };

        for (var i = 0; i < trees.length; i++) {
            var speed = (Math.abs(3 - i));
            for (var j = 0; j < trees[i].length; j++) {
                trees[i][j].x(trees[i][j].x() - (speed || 2));
                inCollision = engine.collision(trees[i][j], pointOfCollision.x, pointOfCollision.y);
                if (inCollision) {
                    if(engine.outOfBounds(hero.x() - (speed || 2), hero.y())){
                        hero.x(hero.x() - (speed || 2));
                    }
                    if (trees[i][j].animation() != 'roll') {
                        trees[i][j].animation('roll');
                    }
                    if (hero.animation() != 'run') {
                        hero.animation('run');
                    }
                    hero.setAttr('inCollision', true);
                }
                else {
                    trees[i][j].animation('idle');
                }
            }
        }
        if (pointOfCollision.y < 530 && pointOfCollision.y > 170 && !hero.getAttr('inCollision')) {
            timeout = 1000;
            engine.heroDie(hero);
            if(!hasLives()){
                document.removeEventListener('keydown', movement);
                return;
            }
        }
        
        if(pointOfCollision.y < 168 && !hero.getAttr('carryingObject')) {
            pickupFood(pointOfCollision);
        }

        if(pointOfCollision.y > 530 && hero.getAttr('carryingObject')) {
            score += engine.dropFood(hero);
            fieldScore.innerText = score.toString();
        }

        engine.clearTrees(trees);
        engine.checkTrees(trees,treesLayer);
        setTimeout(function(){requestAnimationFrame(executeFrame);}, timeout);
    }

    function pickupFood(pointOfCollision){
        for (var foods = 0; foods < displayFood.length; foods++) {
            if(engine.collision(displayFood[foods], pointOfCollision.x,pointOfCollision.y)) {
                hero.setAttr('carryingObject',displayFood[foods]);
            }
        }
    }

    // Movement Controls
    document.addEventListener("keydown", movement);

    function movement(evn) {
        const HORIZONTALSTEP = 10;
        var step = engine.rowCheck(hero.y() + hero.height());
        switch (evn.keyCode) {
            case 38:
                step = engine.rowCheck((hero.y() + hero.height()), 'up');
                if (engine.outOfBounds(hero.x(), hero.y() - step)) {
                    hero.y(hero.y() - step);
                }
                break;
            case 40:
                step = engine.rowCheck((hero.y() + hero.height()), 'down');
                if (engine.outOfBounds(hero.x(), hero.y() + step + hero.height())) {
                    hero.y(hero.y() + step);
                }
                break;
            case 37:
                step = HORIZONTALSTEP;
                if (engine.outOfBounds(hero.x() - step, hero.y())) {
                    hero.x(hero.x() - step);
                }
                break;
            case 39:
                step = HORIZONTALSTEP;
                if (engine.outOfBounds(hero.x() + step, hero.y())) {
                    hero.x(hero.x() + step);
                }
                break;
        }
    }

    // Score Keeping And Lives
    var liveCounter = 3;
    function hasLives(){
        liveCounter -= 1;
        displayHeads[liveCounter].image(null);
        if(liveCounter <= 0){
            engine.gameOver(score);
            return false;
        }
        return true;
    }
});
