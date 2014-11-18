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

    // Stage and background setup
    var stage = new Kinetic.Stage({
        width: 800,
        height: 600,
        container: 'stage-container'
    });

    function loadBackground(image) {
        var backgroundImage = new Image();
        var bgrdlayer = new Kinetic.Layer();

        backgroundImage.onload = function () {
            var levelBackground = new Kinetic.Image({
                x: 0,
                y: 0,
                width: stage.getWidth(),
                height: stage.getHeight(),
                image: backgroundImage
            });
            bgrdlayer.add(levelBackground);
            stage.add(bgrdlayer);
            bgrdlayer.setZIndex(1);
        };

        backgroundImage.src = 'resources/' + image;
    }

    //testing (Engine)

    // array with all trees
    var trees = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    // layers for our game

    var treesLayer = new Kinetic.Layer();
    stage.add(treesLayer);

    var heroLayer = new Kinetic.Layer();
    stage.add(heroLayer);

    loadBackground('bkground.png');

    // main character create and put on screen

    var hero = obj.hero(400, 480);
    heroLayer.add(hero);
    hero.start();

    // 7 trees for the 7 rows (Create, add to screen, add to array of trees)
    var testTree = obj.trunk(800, 170);
    treesLayer.add(testTree);
    var testTreeTwo = obj.trunk(800, 220);
    treesLayer.add(testTreeTwo);
    var testTreeThree = obj.trunk(800, 270);
    treesLayer.add(testTreeThree);
    var testTreeFour = obj.trunk(800, 320);
    treesLayer.add(testTreeFour);
    var testTreeFive = obj.trunk(800, 370);
    treesLayer.add(testTreeFive);
    var testTreeSix = obj.trunk(800, 420);
    treesLayer.add(testTreeSix);
    var testTreeSeven = obj.trunk(800, 470);
    treesLayer.add(testTreeSeven);

    trees[0].push(testTree);
    trees[1].push(testTreeTwo);
    trees[2].push(testTreeThree);
    trees[3].push(testTreeFour);
    trees[4].push(testTreeFive);
    trees[5].push(testTreeSix);
    trees[6].push(testTreeSeven);

    // animation of moving trees
    function executeFrame() {

        hero.setAttr('inCollision', false);
        var inCollision = true;


        var pointOfCollision = {
            x: hero.x() + (hero.width() / 2),
            y: hero.y() + hero.height()
        };

        for (var i = 0; i < trees.length; i++) {
            for (var j = 0; j < trees[i].length; j++) {
                var speed = (Math.abs(3 - i));
                trees[i][j].x(trees[i][j].x() - (speed || 2));
                inCollision = collision(trees[i][j], pointOfCollision.x, pointOfCollision.y);
                if (inCollision) {
                    hero.x(hero.x() - speed);
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
            if (hero.animation() != 'die') {
                hero.animation('die');
            }
        }

        clearTrees();
        checkTrees();
        requestAnimationFrame(executeFrame, document);
    }

    // start of animation
    requestAnimationFrame(executeFrame, document);

    // initial random distance between trees
    var distance = randomGenerator(10, 100);

    // function for generating new trees
    function checkTrees() {
        for (var i = 0; i < trees.length; i++) {
            var t = trees[i][trees[i].length - 1];
            if (t) {
                var checker = t.x() + t.width() + distance < 800;
                if (checker) {
                    distance = randomGenerator(10, 100);
                    var newTree = obj.trunk(800, t.y(), randomGenerator(1, 3));
                    treesLayer.add(newTree);
                    newTree.start();
                    trees[i].push(newTree);
                }
            }
        }
    }

    // function for clearing trees that are obsolete
    function clearTrees() {
        for (var i = 0; i < trees.length; i++) {
            var t = trees[i][0];
            if (t) {
                if (t.x() + t.width() < 0) {
                    t.stop();
                    delete trees[i].shift();
                }
            }
        }
    }

    // helper for generating random numbers in range
    function randomGenerator(min, max) {
        var returnValue = Math.floor((max - min) * Math.random() + min);
        return returnValue;
    }

    document.addEventListener("keydown", movement);

    function movement(evn) {
        var step = rowCheck(hero.y() + hero.height());
        switch (evn.keyCode) {
            case 38:
                if (outOfBounds(hero.x(), hero.y() - rowCheck((hero.y() + hero.height()), 'up'))) {
                    hero.y(hero.y() - rowCheck((hero.y() + hero.height()), 'up'));
                }
                break;
            case 40:
                if (outOfBounds(hero.x(), hero.y() + step + hero.height())) {
                    hero.y(hero.y() + step);
                }
                break;
            case 37:
                if (outOfBounds(hero.x() - 10, hero.y())) {
                    hero.x(hero.x() - 10);
                }
                break;
            case 39:
                if (outOfBounds(hero.x() + 10, hero.y())) {
                    hero.x(hero.x() + 10);
                }
                break;
        }
    }

    function outOfBounds(x, y) {
        if (x > 30 && x < 670 && y < 550 && y > 100) {
            return true
        } else {
            return false;
        }
    }


    function rowCheck(point, direcetion) {
        if (point >= 490) {
            return 50;
        } else if (point > 170 && point < 220) {
            if (direcetion == 'up') {
                return 20;
            } else {
                return 50;
            }
        } else if (point < 170) {
            return 20;
        }
        return 50;
    }
    function collision(tree, x, y) {
        if (x > tree.x() && x < tree.x() + tree.width() && y < tree.y() + tree.height() && y > tree.y()) {
            return true;
            // TODO make hero move with the tree
        } else {
            dead = true;
        }
        var lives = 100; // deklarirame jivotite v nachaloto na igrata i ako dead
        //e ravno na true jivotite se namalqvat. Ako sa ravni na nula -> gameOver
        if (dead == true && lives > 0) {
            lives -= 1;
            // TODO restart with one less life
        }
        else {
            theEnd();
            // TODO theEnd function
        }
    }
});