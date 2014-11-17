/**
 * Created by micro3x on 13.11.14.
 */
define(['kineticjs'],
    function (Kinetic) {
        return  {
            trunk: function (x, y, type) {
                var imageObj = new Image();
                var imageFile = 'resources/trunk1.png';
                var picWidth = 150;
                var picHeight = 50;

                switch (type){
                    case 1:
                        imageFile = 'resources/trunk1.png';
                        picWidth = 150;
                        picHeight = 50;
                        break;
                    case 2:
                        imageFile = 'resources/trunk2.png';
                        picWidth = 90;
                        picHeight = 50;
                        break;
                    case 3:
                        break;
                }

                imageObj.src = imageFile;


                var blob = new Kinetic.Sprite({
                    x: x,
                    y: y,
                    width:picWidth,
                    height:picHeight,
                    image: imageObj,
                    animation: 'idle',
                    animations: {
                        // x, y, width, height (9 frames)
                        idle: [
                            0, 0, picWidth, 50,
                            0, 0, picWidth, 50
                        ],
                        roll: [
                            0, 0, picWidth, 50,
                            0, 50, picWidth, 50,
                            0, 100, picWidth, 50,
                            0, 150, picWidth, 50,
                            0, 200, picWidth, 50,
                            0, 250, picWidth, 50,
                            0, 300, picWidth, 50,
                            0, 350, picWidth, 50,
                            0, 400, picWidth, 50
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
            },

            hero: function (x, y){
                var imageObj = new Image();
                imageObj.src = 'resources/mainChar.png';


                var blob = new Kinetic.Sprite({
                    x: x,
                    y: y,
                    width:50,
                    height:55,
                    image: imageObj,
                    animation: 'run',
                    animations: {
                        // x, y, width, height (9 frames)
                        idle: [
                            0, 0, 50, 55,
                            0, 0, 50, 55
                        ],
                        run: [
                            0, 0, 50, 55,
                            50, 0, 50, 55,
                            100, 0, 50, 55,
                            150, 0, 50, 55
                        ]
                    },
                    frameRate: 12,
                    frameIndex: 0
                });


                return blob;
            }
        }
    }
);