/**
 * Created by micro3x on 13.11.14.
 */
define(['kineticjs'],
    function (Kinetic) {
        return  {
            trunk: function (x, y) {
                var imageObj = new Image();
                imageObj.src = "resources/trunk1.png";
                var blob = new Kinetic.Sprite({
                    x: x,
                    y: y,
                    image: imageObj,
                    animation: 'idle',
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
            },

            food: function (x, y, type) {
                var imageFile;
                var imgHeight;
                var imgWidth;
                switch (type) {
                    case 'steak':
                        imageFile = 'resources/56.png';
                        imgWidth = 45;
                        imgHeight = 25;
                        break;
                    case 'drink':
                        imageFile = 'resources/57.png';
                        imgWidth = 30;
                        imgHeight = 49;
                        break;
                    case 'axe':
                        imageFile = 'resources/58.png';
                        imgWidth = 47;
                        imgHeight = 26;
                        break;
                    case 'cow':
                        imageFile = 'resources/59.png';
                        imgWidth = 47;
                        imgHeight = 39;
                        break;
                    case 'gold':
                        imageFile = 'resources/61.png';
                        imgWidth = 35;
                        imgHeight = 46;
                        break;
                    default :
                        imageFile = 'resources/56.png';
                        imgWidth = 45;
                        imgHeight = 25;
                }

                var imageObj = new Image();

                var blob = new Kinetic.Image({
                    x: x,
                    y: y,
                    width: imgWidth,
                    height: imgHeight,
                    image: imageObj
                });
                imageObj.src = imageFile;
                return blob;
            }
        }
    }
);