/**
 * Created by adirect on 16/11/2014.
 */


define(['kineticjs', 'objects'], function(Kinetic, obj){

    return new function() {
        // check if point is outside of the play field
        this.outOfBounds = function (x, y) {
            if (x > 30 && x < 670 && y < 550 && y > 100) {
                return true
            } else {
                return false;
            }
        };

        // check for collision with the tree
        this.collision = function (tree, x, y) {
            if (x > tree.x() && x < tree.x() + tree.width() && y < tree.y() + tree.height() && y > tree.y()) {
                return true;
            }
            return false;
        };

        // returns the size of the step depending on the location
        this.rowCheck = function rowCheck(point, direcetion) {
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

        // function for clearing trees that are obsolete
        this.clearTrees = function (trees) {
            for (var i = 0; i < trees.length; i++) {
                var t = trees[i][0];
                if (t) {
                    if (t.x() + t.width() < 0) {
                        t.stop();
                        delete trees[i].shift();
                    }
                }
            }
        };

        // Background Init
        this.loadBackground = function loadBackground(image, stage) {
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
        };

        // Add trees to all rows
        this.initInitialTrees = function(treesArray, treesLayer){
            var testTree = obj.trunk(800, 170);
            treesLayer.add(testTree);
            testTree.start();
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

            treesArray[0].push(testTree);
            treesArray[1].push(testTreeTwo);
            treesArray[2].push(testTreeThree);
            treesArray[3].push(testTreeFour);
            treesArray[4].push(testTreeFive);
            treesArray[5].push(testTreeSix);
            treesArray[6].push(testTreeSeven);
        };

        // initial random distance between trees
        var distance = randomGenerator(10, 100);

        // function for generating new trees
        this.checkTrees = function (trees,treesLayer) {
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
        };

        // helper for generating random numbers in range
        function randomGenerator(min, max) {
            var returnValue = Math.floor((max - min) * Math.random() + min);
            return returnValue;
        }

        this.saveScore = function(name, score){
            if(!localStorage['scores']){
                var scores = [];
                localStorage['scores'] = JSON.stringify(scores);
            }

            var previousScores = JSON.parse(localStorage['scores']);
            previousScores.push({name:name, score: score});
            localStorage['scores'] = JSON.stringify(previousScores);
        };

        this.loadScores = function(){
            if(!localStorage['scores']){
                var scores = [];
                localStorage['scores'] = JSON.stringify(scores);
            }
            var previousScores = JSON.parse(localStorage['scores']);
            previousScores.sort(function(a,b){
                return (b.score) - (a.score) ;
            });
            console.log(typeof previousScores[0].score);


            return previousScores;
        }

        this.heroDie = function (hero){
            if (hero.animation() != 'die') {
                hero.animation('die');
                if(hero.getAttr('carryingObject')){
                    var reset = hero.getAttr('carryingObject');
                    hero.setAttr('carryingObject', null);
                    reset.x(reset.getAttr('baseX'));
                    reset.y(reset.getAttr('baseY'));
                }
            }
        }

        this.loadHeroLayer = function (heroLayer,displayHeads,displayFood){
            for (var i = 0; i < displayHeads.length; i++){
                heroLayer.add(displayHeads[i]);
            }
            for (var j = 0; j < displayFood.length; j++) {
                heroLayer.add(displayFood[j]);
            }
        }

        this.dropFood = function (hero){
            var carry = hero.getAttr('carryingObject');
            hero.setAttr('carryingObject',null);
            carry.x(hero.x());
            carry.y(hero.y());
            return carry.getAttr('points');
        }

        this.gameOver = function (score){
            var gameover = document.getElementById('final');
            gameover.style.display = 'table-cell';
            this.saveScore( prompt('Give me your name?'), score);

            var list = document.createElement('ul');
            list.className = "high_scores";
            var previousScores = this.loadScores();

            for(var index in previousScores){
                if(index > 9){
                    break;
                }
                var item = document.createElement('li');
                item.innerText = (parseInt(index) + 1).toString() + " " + previousScores[index].name + ' - ' + previousScores[index].score;
                list.appendChild(item);
            }
            gameover.appendChild(list);
        }
    };
});