import { data } from './data/chartData';
import mouseStore from './stores/mouseStore';

const WIDTH = 800; // width canvas
const HEIGHT = 400; // height canvas
const PADDING_CANVAS = 50; // base padding

const COEFFICIENT_DPI = 2;

// Params main chart
const INNER_WIDTH = WIDTH * COEFFICIENT_DPI; // inner width canvas
const INNER_HEIGHT = HEIGHT * COEFFICIENT_DPI; // inner height canvas
const INNER_PADDING_CANVAS = PADDING_CANVAS * COEFFICIENT_DPI; // inner padding

const LINE_WIDTH = 4; // width line on main chart
// Params main chart

const DEFAULT_STEP = 10; // default distance between line
const MIN_STEP = 5; // min distance between line
const COUNT_ROWS = 5;
const STEP_ROW = (INNER_HEIGHT - INNER_PADDING_CANVAS * 2) / COUNT_ROWS;

const SPEED_SIZING = 100; // distance increase factor between line

let stepState = DEFAULT_STEP; // variable distance between line

const KEY_LINE = 'line'; // key line in data telegram

type OptionsLine = {
  top: number;
  left: number;
  color: string;
  yRatio: number;
}

type Data = typeof data;

const canvasInitBaseStyle = (ctx: CanvasRenderingContext2D) => {
  ctx.canvas.width = INNER_WIDTH;
  ctx.canvas.height = INNER_HEIGHT;
  ctx.canvas.style.width = `${WIDTH}px`;
  ctx.canvas.style.height = `${HEIGHT}px`;
};

type LinesData = {
  coordinates: number[];
  colorLine: string;
  min: number;
  max: number
}

type NormalizeData = {
  lines: LinesData[];
  dates: number[];
  min: number;
  max: number;
}

// @ts-ignore
const isLine = (lineKey: string, itemData: Data) => itemData.types[lineKey] === KEY_LINE;
// @ts-ignore
const getColorLine = (lineKey: string, itemData: Data) => itemData.colors[lineKey];
const getNormalizeData = (data: Data) => {
  const result: NormalizeData = {
    lines: [],
    dates: [],
    min: -1,
    max: -1,
  };

  data.columns.forEach((coordinates) => {
    const lineKey = coordinates?.[0] as string;
    if (isLine(lineKey, data)) {
      const colorLine = getColorLine(lineKey, data);
      const normalizeCoordinates = coordinates.slice(1) as number[];
      const min = Math.min(...normalizeCoordinates);
      const max = Math.max(...normalizeCoordinates);
      if (result.min === -1 || result.min > min) {
        result.min = min;
      }

      if (result.max === -1 || result.max < max) {
        result.max = max;
      }

      result.lines.push({
        coordinates: normalizeCoordinates,
        colorLine,
        min,
        max,
      });
    } else {
      result.dates = coordinates.slice(1) as number[];
    }
  });

  return result;
};

const paintLine = (ctx: CanvasRenderingContext2D, {
  left, top, color,
}: OptionsLine) => {
  ctx.lineWidth = LINE_WIDTH;
  ctx.strokeStyle = color;
  ctx.lineTo(left, top);
};

const paintLines = (ctx: CanvasRenderingContext2D, normalizeData: NormalizeData) => {
  normalizeData.lines.forEach((line) => {
    ctx.beginPath();
    line.coordinates.forEach((item, index) => {
      const yRatio = (INNER_HEIGHT) / (normalizeData.max + INNER_PADDING_CANVAS);

      const left = index * (INNER_WIDTH / stepState);
      const top = INNER_HEIGHT - (item * yRatio) - INNER_PADDING_CANVAS;

      paintLine(ctx, {
        left, top, color: line.colorLine, yRatio,
      });
    });
    ctx.stroke();
    ctx.closePath();
  });
};

/// STEPS START

const getMaxStep = (data: NormalizeData) => {
  let maxStep = 0;

  data.lines.forEach((line) => {
    const amountCords = line.coordinates.length;
    if (maxStep === 0 || maxStep < amountCords) {
      maxStep = amountCords;
      return null;
    }
  });
  return maxStep;
};

/// STEPS END

/// EVENTS START

const getHandleOnWheel = (maxStep: number, canvas: HTMLCanvasElement) => (e: WheelEvent) => {
  if (canvas === mouseStore.getTargetElement()) {
    e.preventDefault();
    const nextStep = stepState + Number((e.deltaY / SPEED_SIZING).toFixed(3));
    if (nextStep < maxStep && nextStep > MIN_STEP) {
      stepState = nextStep;
    }
  }
};

const addListeners = (el: HTMLCanvasElement, data: NormalizeData) => {
  const maxStep = getMaxStep(data);
  const handleOnWheel = getHandleOnWheel(maxStep, el);
  el.addEventListener('wheel', handleOnWheel);
};

/// EVENTS STOP

// eslint-disable-next-line no-shadow
const chart = (canvas: HTMLCanvasElement | null, data: Data) => {
  if (!canvas) {
    console.error('Canvas not found');
    return null;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Context not found');
    return null;
  }

  mouseStore.init();
  canvasInitBaseStyle(ctx);

  const normalizeData = getNormalizeData(data);
  addListeners(canvas, normalizeData);

  paintLines(ctx, normalizeData);
  const render = () => {
    ctx.clearRect(0, 0, INNER_WIDTH, INNER_HEIGHT);
    paintLines(ctx, normalizeData);
    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);
};

const main = (data: Data) => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;

  chart(canvas, data);
};

window.onload = () => {
  main(data);
};
