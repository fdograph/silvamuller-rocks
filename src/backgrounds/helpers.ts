export interface Point {
    x: number;
    y: number;
}

function lineIntersection (m1: number, b1: number, m2: number, b2: number): Point {
    if (m1 === m2) {
        throw new Error("parallel slopes");
    }
    const x = (b2 - b1) / (m1 - m2);
    return {x: x, y: m1 * x + b1};
}

function pStr (point: Point): string {
    return `${point.x},${point.y} `;
}

export function getPath (
    center: Point,
    startRadius: number,
    spacePerLoop: number,
    startTheta: number,
    endTheta: number,
    thetaStep: number
): string {
    // Rename spiral parameters for the formula r = a + bθ
    const a = startRadius;  // start distance from center
    const b = spacePerLoop / Math.PI / 2; // space between each loop
    let newTheta = startTheta;

    // convert angles to radians
    let oldTheta = newTheta = startTheta * Math.PI / 180;
    endTheta = endTheta * Math.PI / 180;
    thetaStep = thetaStep * Math.PI / 180;

    // radii
    let oldR,
        newR = a + b * newTheta;

    // start and end points
    const oldPoint = {x: 0, y: 0};
    const newPoint = {
        x: center.x + newR * Math.cos(newTheta),
        y: center.y + newR * Math.sin(newTheta)
    };

    // slopes of tangents
    let oldSlope,
        newSlope = (b * Math.sin(oldTheta) + (a + b * newTheta) * Math.cos(oldTheta)) /
            (b * Math.cos(oldTheta) - (a + b * newTheta) * Math.sin(oldTheta));

    let path = "M " + pStr(newPoint);

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
        newSlope = (b * Math.sin(newTheta) + aPlusBTheta * Math.cos(newTheta)) /
            (b * Math.cos(newTheta) - aPlusBTheta * Math.sin(newTheta));

        const oldIntercept = -(oldSlope * oldR * Math.cos(oldTheta) - oldR * Math.sin(oldTheta));
        const newIntercept = -(newSlope * newR* Math.cos(newTheta) - newR * Math.sin(newTheta));

        const controlPoint = lineIntersection(oldSlope, oldIntercept, newSlope, newIntercept);

        // Offset the control point by the center offset.
        controlPoint.x += center.x;
        controlPoint.y += center.y;

        path += "Q " + pStr(controlPoint) + pStr(newPoint);
    }

    return path;
}

export const randomBetween = (min: number, max: number) => Math.round(Math.random() * max) + min;
