/**
 * Created by micro3x on 13.11.14.
 */
define(['kineticjs'],
    function (Kinetic) {
        return {
            trunk: function (x, y) {
                var imageObj = new Image();
                imageObj.src = "resources/trunk1.png";
                var blob = new Kinetic.Sprite({
                    x: x,
                    y: y,
                    image: imageObj,
                    animation: 'roll',
                    animations: {
                        // x, y, width, height (9 frames)
                        idle: [
                            0, 0, 150, 50,
                            0, 0, 150, 50
                        ],
                        roll: [
                            0, 0, 150, 50,
                            0, 50, 150, 50,
                            0, 100, 150, 50,
                            0, 150, 150, 50,
                            0, 200, 150, 50,
                            0, 250, 150, 50,
                            0, 300, 150, 50,
                            0, 350, 150, 50,
                            0, 400, 150, 50
                        ]
                    },
                    frameRate: 10,
                    frameIndex: 0
                });
                return blob;
            }
        }
    }
);