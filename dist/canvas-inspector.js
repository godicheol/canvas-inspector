(function() {
    'use strict';

    var exports = {};

    function test(w, h) {
        var drawCanvas = document.createElement("canvas");
        var drawCtx = drawCanvas.getContext("2d");
        var testCanvas = document.createElement("canvas");
        var testCtx = testCanvas.getContext("2d");

        drawCanvas.width = w;
        drawCanvas.height = h;

        testCanvas.width = 1;
        testCanvas.height = 1;

        drawCtx.fillStyle = "#123123";
        drawCtx.fillRect(w - 1, h - 1, 1, 1);

        testCtx.drawImage(drawCanvas, w - 1, h - 1, 1, 1, 0, 0, 1, 1);

        return testCtx.getImageData(0, 0, 1, 1).data[3] !== 0;
    }

    exports.hasCanvas = function() {
        var element = document.createElement('canvas');
        return !!(element.getContext && element.getContext('2d'));
    }

    exports.test = function() {
        if (!this.hasCanvas()) {
            console.error("Canvas API not supported");
            return false;
        }

        var widthList = [8388607, 4194303, 65535, 32767, 16384, 8192, 4096, 1];
        var heightList = [8388607, 4194303, 65535, 32767, 16384, 8192, 4096, 1];
        var areaList = [65535, 32767, 16384, 14188, 11402, 11180, 10836, 8192, 4096, 1];
        var maxWidth, maxArea, maxHeight, i;

        for (i = 0; i < widthList.length; i++) {
            if (test(widthList[i], 1)) {
                maxWidth = widthList[i];
                break;
            }
        }

        for (i = 0; i < heightList.length; i++) {
            if (test(1, heightList[i])) {
                maxHeight = heightList[i];
                break;
            }
        }

        for (i = 0; i < areaList.length; i++) {
            if (test(areaList[i], areaList[i])) {
                maxArea = areaList[i];
                break;
            }
        }

        return {
            width: maxWidth,
            height: maxHeight,
            area: maxArea
        }
    }

    if (typeof(window.canvasInspector) === "undefined") {
        window.canvasInspector = exports;
    }
})();