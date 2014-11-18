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
        for (var i = 0; i < trees.length; i++) {
            for (var j = 0; j < trees[i].length; j++) {
                var speed = (Math.abs(3 - i));
                trees[i][j].x(trees[i][j].x() - (speed || 2));
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
                // todo: move up
                if(outOfBounds(hero.x(),hero.y() + rowCheck((step)))) {
                    hero.y(hero.y() -  rowCheck((hero.y() + hero.height()),'up'));
                }
                break;
            case 40:
                // todo: move down
                if(outOfBounds(hero.x(),hero.y() + step + hero.height())){
                    hero.y(hero.y() + step);
                }
                break;
            case 37:
                if(outOfBounds(hero.x() -10,hero.y())){
                    hero.x(hero.x() - 10);
                }
                // todo: move left
                break;
            case 39:
                // todo: move right
                if(outOfBounds(hero.x() + 10,hero.y())) {
                    hero.x(hero.x() + 10);
                }
                break;
        }
    }
    
    function outOfBounds(x,y) {
        if (x > 30 && x < 670 && y < 550 && y > 130) {
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

    function collision() {
        var dead = false;
        var rect1 = {x:trees.x, y:trees.y, width:trees.width, height:trees.height};
        var rect2 = {x:hero.x, y:hero.y, width:hero.width, height:hero.height};
        if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) {
            dead = true;
        }
        if(dead == true) {
            if (lives > 0) {
                lives -= 1;
                // TODO restart with one less life
            }
            else {
                theEnd();
                // TODO theEnd function
            }
        }
    }
});
