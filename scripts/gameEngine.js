/**
 * Created by adirect on 16/11/2014.
 */


define(['kineticjs', 'objects'], function(Kinetic, obj){
    var stage = new Kinetic.Stage({
        width: 800,
        height: 600,
        container: 'stage-container'
    });

    var trees = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    var testTree = obj.trunk(300, 300);
    var treesLayer = new Kinetic.Layer();
    treesLayer.add(testTree);
    stage.add(treesLayer);
    trees[0].push(testTree);
});