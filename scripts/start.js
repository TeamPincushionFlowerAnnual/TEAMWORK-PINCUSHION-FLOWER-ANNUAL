/**
 * Created by micro3x on 13.11.14.
 */

//todo: load modules, init modules (kineticJS, objects, gameEngine)
require.config({
    //By default load any module IDs from js/lib
    //baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        objects: 'objects',
        kineticjs: 'libs/kinetic-v5.1.0.min'
        //gameEngine: 'gameEngine'
    }
});

require(['kineticjs', 'objects'],function(Kinetic, obj){

    // Stage and background setup
    var stage = new Kinetic.Stage({
        width: 800,
        height: 600,
        container: 'stage-container'
    });
    obj['stage'] = stage;
    console.log(obj.stage);
    loadBackground('bkground.jpg');
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
            obj.stage.add(bgrdlayer);
            bgrdlayer.setZIndex(0);
        };

        backgroundImage.src = 'resources/' + image;
    }


    //testing
    var trees = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    var testTree = obj.trunk(800, 300);
    var treesLayer = new Kinetic.Layer();
    treesLayer.add(testTree);
    stage.add(treesLayer);

    var testTreeTwo = obj.trunk(800, 350);
    treesLayer.add(testTreeTwo);

    testTree.start();

    trees[0].push(testTree);
    trees[1].push(testTreeTwo);
    function executeFrame(){
        for (var i = 0; i < trees.length; i++){
            for (var j = 0; j < trees[i].length; j++){
                trees[i][j].x(trees[i][j].getX() - 5);
            }
        }
        checkTrees();
        setTimeout(executeFrame, 150);


    }
    executeFrame();
    var distance = randomGenerator(50, 100);
    function checkTrees(){
        var lastTrees = [];

        for (var i = 0; i < trees.length; i++){
            var t = trees[i][trees[i].length - 1];
            if(t){
                lastTrees.push(t)
            }
        }

        for (var j = 0; j < lastTrees.length; j++){
            var checker = lastTrees[j].getX() + 150 + distance < 800;
            console.log(checker);
            if(checker){
                distance = randomGenerator(50, 100);
                var newTree = obj.trunk(800, lastTrees[j].getY());
                treesLayer.add(newTree);
                newTree.start();
                trees[j].push(newTree);
            }
        }
    }

    function randomGenerator(min, max){
        var returnValue = (max - min) * Math.random() + min;
        return returnValue;
    }

} );