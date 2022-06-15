"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chartData_1 = require("./data/chartData");
var WIDTH = 800;
var HEIGHT = 400;
var INNER_WIDTH = WIDTH * 2;
var INNER_HEIGHT = HEIGHT * 2;
var LINE_WIDTH = 4;
var STEP = 10;
var KEY_LINE = 'line';
var KEY_DATES = 'x';
var canvasInitBaseStyle = function (ctx) {
    ctx.canvas.width = INNER_WIDTH;
    ctx.canvas.height = INNER_HEIGHT;
    ctx.canvas.style.width = "".concat(WIDTH, "px");
    ctx.canvas.style.height = "".concat(HEIGHT, "px");
};
var paintLine = function (ctx, _a) {
    var left = _a.left, top = _a.top, color = _a.color, yRatio = _a.yRatio;
    ctx.lineWidth = LINE_WIDTH;
    ctx.strokeStyle = color;
    console.log(Math.round(INNER_HEIGHT - (top * yRatio)), INNER_HEIGHT);
    ctx.lineTo(left, Math.round(INNER_HEIGHT - (top * yRatio)));
};
// @ts-ignore
var isLine = function (lineKey, itemData) { return itemData.types[lineKey] === KEY_LINE; };
// @ts-ignore
var getColorLine = function (lineKey, itemData) { return itemData.colors[lineKey]; };
var getNormalizeData = function (data) { return data.map(function (itemData) {
    var result = {
        lines: [],
        dates: [],
    };
    itemData.columns.forEach(function (coordinates) {
        var lineKey = coordinates === null || coordinates === void 0 ? void 0 : coordinates[0];
        if (isLine(lineKey, itemData)) {
            var colorLine = getColorLine(lineKey, itemData);
            var normalizeCoordinates = coordinates.slice(1);
            var min = Math.min.apply(Math, normalizeCoordinates);
            var max = Math.max.apply(Math, normalizeCoordinates);
            result.lines.push({
                coordinates: normalizeCoordinates,
                colorLine: colorLine,
                min: min,
                max: max,
            });
        }
        else {
            result.dates = coordinates.slice(1);
        }
    });
    return result;
}); };
// eslint-disable-next-line no-shadow
var chart = function (canvas, data) {
    if (!canvas) {
        console.error('Canvas not found');
        return null;
    }
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Context not found');
        return null;
    }
    canvasInitBaseStyle(ctx);
    var normalizeData = getNormalizeData(data);
    normalizeData.forEach(function (itemData) {
        itemData.lines.forEach(function (line) {
            ctx.beginPath();
            ctx.lineWidth = LINE_WIDTH;
            var yRatio = INNER_HEIGHT / (line.max - line.min);
            var xRatio = INNER_WIDTH / line.coordinates.length;
            line.coordinates.forEach(function (item, index) {
                paintLine(ctx, {
                    left: index * STEP, top: item, color: line.colorLine,
                    yRatio: yRatio,
                    xRatio: xRatio,
                });
            });
            ctx.stroke();
            ctx.closePath();
        });
    });
};
var main = function (data) {
    var canvas = document.getElementById('canvas');
    chart(canvas, data);
};
window.onload = function () {
    main(chartData_1.data);
};
