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
    }
});


require(['kineticjs', 'objects'],function(Kinetic, obj){

    // Stage and background setup
    var stage = new Kinetic.Stage({
        width: 800,
        height: 600,
        container: 'stage-container'
    });
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
            stage.add(bgrdlayer);
            bgrdlayer.setZIndex(0);
        };

        backgroundImage.src = 'resources/' + image;
    }


    //testing
    var l = new Kinetic.Layer();

    var a = obj.trunk(150,200);
    var b = obj.trunk(350,300);

    l.add(a);
    l.add(b);
    b.start();

    stage.add(l);

} );