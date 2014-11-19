/**
 * Created by micro3x on 13.11.14.
 */

//todo: load modules, init modules (kineticJS, objects, gameEngine)
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

    var foodLayer = new Kinetic.Layer();
    stage.add(foodLayer);
    foodLayer.setZIndex(3);

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
            for (var j = 0; j < trees[i].length; j++) {
                var speed = (Math.abs(3 - i));
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
        //if (pointOfCollision.y < 530 && pointOfCollision.y > 170 && !hero.getAttr('inCollision')) {
        //    if (hero.animation() != 'die') {
        //        hero.animation('die');
        //        lives();
        //        timeout = 1000;
        //    }
        //}
        
        if(pointOfCollision.y < 168 && !hero.getAttr('carryingObject')) {
            for (var foods = 0; foods < displayFood.length; foods++) {
                if(engine.collision(displayFood[foods], pointOfCollision.x,pointOfCollision.y)) {
                    hero.setAttr('carryingObject',displayFood[foods]);
                }
            }
        }

        if(pointOfCollision.y > 530 && hero.getAttr('carryingObject')) {
            var carry = hero.getAttr('carryingObject');
            hero.setAttr('carryingObject',null);
            carry.x(hero.x());
            carry.y(hero.y());

            score += carry.getAttr('points');
            console.log(score);
            fieldScore.innerText = score.toString();
        }

        engine.clearTrees(trees);
        engine.checkTrees(trees,treesLayer);
        setTimeout(timeout);
        requestAnimationFrame(executeFrame);
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

    var displayHeads = [
        obj.live(735, 240),
        obj.live(735, 265),
        obj.live(735, 290)
    ];
    for (var i = 0; i < displayHeads.length; i++){
        heroLayer.add(displayHeads[i]);
    }

    var liveCounter = 3;
    function lives(){
        liveCounter -= 1;
        displayHeads[liveCounter].image(null);
        if(liveCounter <= 0){
            document.getElementById('final').style.display = 'table-cell';
        }
    }

    var displayFood = [
        obj.food(150,117,'steak'),
        obj.food(250,117,'drink'),
        obj.food(350,117,'axe'),
        obj.food(450,117,'cow'),
        obj.food(550,117,'gold')
    ];

    for (var j = 0; j < displayFood.length; j++) {
        heroLayer.add(displayFood[j]);
    }
});
