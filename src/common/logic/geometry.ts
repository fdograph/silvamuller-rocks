export interface Point {
  x: number;
  y: number;
}

export interface LineCoords {
  a: Point;
  b: Point;
}

export const lowerBounds = (d: number, factor: number) => d * factor * -1;
export const upperBounds = (d: number, factor: number) => d * factor;

export const degree2radian = (a: number): number => a * 0.017453292519;
export const calculateX = (x: number, l: number, a: number): number =>
  x + l * Math.cos(a);
export const calculateY = (y: number, l: number, a: number): number =>
  y + l * Math.sin(a);
export const createPoint = (x: number, y: number): Point => ({ x, y });

export const centerOfSquare = (x: number, y: number, size: number) =>
  createPoint(x + size / 2, y + size / 2);

export const isEven = (n: number) => n % 2 !== 0;

export const randomPoint = (w: number, h: number): Point =>
  createPoint(randomBetween(0, w), randomBetween(0, h));
export const projectPoint = (point: Point, l: number, a: number): Point =>
  createPoint(
    calculateX(point.x, l, degree2radian(a)),
    calculateY(point.y, l, degree2radian(a))
  );
export const createLine = (
  origin: Point,
  length: number,
  angle = 0
): LineCoords => ({
  a: origin,
  b: projectPoint(origin, length, angle),
});

export const randomBetween = (min: number, max: number): number =>
  Math.round(Math.random() * max) + min;

const lineIntersection = (
  m1: number,
  b1: number,
  m2: number,
  b2: number
): Point => {
  if (m1 === m2) {
    throw new Error('parallel slopes');
  }
  const x = (b2 - b1) / (m1 - m2);
  return createPoint(x, m1 * x + b1);
};

const pStr = (point: Point): string => {
  return `${point.x},${point.y} `;
};

export function buildSpiral(
  center: Point,
  startRadius: number,
  spacePerLoop: number,
  startTheta: number,
  endTheta: number,
  thetaStep: number
): string {
  // Rename spiral parameters for the formula r = a + bθ
  const a = startRadius; // start distance from center
  const b = spacePerLoop / Math.PI / 2; // space between each loop
  let newTheta = startTheta;

  // convert angles to radians
  let oldTheta = (newTheta = (startTheta * Math.PI) / 180);
  endTheta = (endTheta * Math.PI) / 180;
  thetaStep = (thetaStep * Math.PI) / 180;

  // radii
  let oldR,
    newR = a + b * newTheta;

  // start and end points
  const oldPoint = { x: 0, y: 0 };
  const newPoint = {
    x: center.x + newR * Math.cos(newTheta),
    y: center.y + newR * Math.sin(newTheta),
  };

  // slopes of tangents
  let oldSlope,
    newSlope =
      (b * Math.sin(oldTheta) + (a + b * newTheta) * Math.cos(oldTheta)) /
      (b * Math.cos(oldTheta) - (a + b * newTheta) * Math.sin(oldTheta));

  let path = 'M ' + pStr(newPoint);

  while (oldTheta < endTheta - thetaStep) {
    oldTheta = newTheta;
    newTheta += thetaStep;

    oldR = newR;
    newR = a + b * newTheta;

    oldPoint.x = newPoint.x;
    oldPoint.y = newPoint.y;
    newPoint.x = center.x + newR * Math.cos(newTheta);
    newPoint.y = center.y + newR * Math.sin(newTheta);

    // Slope calculation with the formula:
    // (b * sinΘ + (a + bΘ) * cosΘ) / (b * cosΘ - (a + bΘ) * sinΘ)
    const aPlusBTheta = a + b * newTheta;

    oldSlope = newSlope;
    newSlope =
      (b * Math.sin(newTheta) + aPlusBTheta * Math.cos(newTheta)) /
      (b * Math.cos(newTheta) - aPlusBTheta * Math.sin(newTheta));

    const oldIntercept = -(
      oldSlope * oldR * Math.cos(oldTheta) -
      oldR * Math.sin(oldTheta)
    );
    const newIntercept = -(
      newSlope * newR * Math.cos(newTheta) -
      newR * Math.sin(newTheta)
    );

    const controlPoint = lineIntersection(
      oldSlope,
      oldIntercept,
      newSlope,
      newIntercept
    );

    // Offset the control point by the center offset.
    controlPoint.x += center.x;
    controlPoint.y += center.y;

    path += 'Q ' + pStr(controlPoint) + pStr(newPoint);
  }

  return path;
}

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): Point {
  const angleInRadians = degree2radian(angleInDegrees);

  return createPoint(
    centerX + radius * Math.cos(angleInRadians),
    centerY + radius * Math.sin(angleInRadians)
  );
}

export function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');
}

export const addUnit = (val: number, unit: string) => `${val}${unit}`;

export const gridIteration = (
  rows: number,
  cols: number,
  block: (x: number, y: number) => void
) => {
  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x <= cols; x++) {
      block(x, y);
    }
  }
};

export const sunRays = (
  center: Point,
  length: number,
  count: number,
  angleStart: number = 0,
  angleEnd: number = 360
) => {
  const angleLength = angleEnd - angleStart;
  const angleStep = Math.ceil(angleLength / count);
  return [...new Array(count)].map((v, i) =>
    createLine(center, length, angleStep * i)
  );
};

export const concentricCubes = (
  center: Point,
  min: number,
  max: number,
  count: number
) => {
  const diff = max - min;
  const step = Math.ceil(diff / count);
  return [...new Array(count)].map((v, i) => ({
    center,
    size: step + step * i,
  }));
};
