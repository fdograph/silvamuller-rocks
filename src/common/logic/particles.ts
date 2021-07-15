import {
  createPoint,
  getHypotenuse,
  Point,
  projectPoint,
  randomRange,
} from './geometry';

export class Particle {
  private aroundRadius = 700;

  private maxRadius: number = 150;
  public radius: number;
  private x: number;
  private y: number;
  private baseX: number;
  private baseY: number;
  private readonly angle: number;
  private readonly density: number;
  private destine: Point;

  constructor(x: number, y: number) {
    this.radius = randomRange(5, this.maxRadius);

    this.x = x;
    this.baseX = x;
    this.y = y;
    this.baseY = y;

    this.angle = randomRange(0, 360);
    this.density = randomRange(0.5, 2.5);
    this.destine = projectPoint({ x, y }, this.aroundRadius, this.angle);
  }

  public draw(
    ctx: CanvasRenderingContext2D | null,
    mouseX: number,
    mouseY: number
  ): void {
    if (ctx === null) {
      return;
    }

    this.update(mouseX, mouseY);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'hsl(275, 100%, 50%)';
    ctx.stroke();
  }

  public update(mouseX: number, mouseY: number) {
    const distance = getHypotenuse(
      this.x - this.destine.x,
      this.y - this.destine.y
    );

    const speed = ((distance / this.aroundRadius) * 9) / this.density;
    const newPoint = projectPoint({ x: this.x, y: this.y }, speed, this.angle);

    this.x = newPoint.x;
    this.y = newPoint.y;

    const scaleSpeed =
      this.maxRadius / (this.radius + this.maxRadius) / (this.density / 1.5);
    if (this.radius > 0 && this.radius - scaleSpeed > 0) {
      this.radius -= scaleSpeed;
    } else {
      this.radius = 0;
    }
  }
}

export class ParticleOrchestrator {
  private ctx: CanvasRenderingContext2D | null = null;
  private frame: number | null = null;

  private mouseLoc: Point = createPoint(0, 0);
  private pixelRatio = window.devicePixelRatio || 1;
  private particles: Particle[] = [];

  constructor(
    private width: number,
    private height: number,
    private canvas: HTMLCanvasElement
  ) {
    this.handlePointer = this.handlePointer.bind(this);
    this.init(width, height, canvas);
  }

  private handlePointer(event: PointerEvent): void {
    this.mouseLoc = createPoint(
      event.x * this.pixelRatio,
      event.y * this.pixelRatio
    );

    const newParticles = [...new Array(15)].map(
      () => new Particle(this.mouseLoc.x, this.mouseLoc.y)
    );
    this.particles = this.particles.concat(newParticles);
  }

  private removeListeners(): void {
    window.removeEventListener('pointermove', this.handlePointer);
    window.removeEventListener('pointerdown', this.handlePointer);
  }
  private addListeners(): void {
    window.addEventListener('pointermove', this.handlePointer);
    window.addEventListener('pointerdown', this.handlePointer);
  }

  private startAnimationLoop() {
    const loop = () => {
      this.draw();
      this.frame = requestAnimationFrame(loop);
    };

    loop();
  }
  private stopAnimationLoop() {
    this.frame && cancelAnimationFrame(this.frame);
  }

  private draw() {
    if (this.ctx === null) {
      return;
    }

    this.ctx.fillStyle = 'hsl(65, 100%, 50%)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const filteredParticles: Particle[] = [];
    this.particles.forEach((p, i) => {
      p.draw(this.ctx, this.mouseLoc.x, this.mouseLoc.y);

      if (p.radius > 0) {
        filteredParticles.push(p);
      }
    });

    this.particles = filteredParticles;
  }

  public generateInitialParticles() {
    const count = 500;
    const particles = [...new Array(count)].map(() => {
      const center = createPoint(
        randomRange(0, this.width),
        randomRange(0, this.height)
      );
      return new Particle(center.x, center.y);
    });

    this.particles = this.particles.concat(particles);
  }

  public init(width: number, height: number, canvas: HTMLCanvasElement): void {
    this.width = width * this.pixelRatio;
    this.height = height * this.pixelRatio;
    this.canvas = canvas;

    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = canvas.getContext('2d');

    this.reset();
    this.addListeners();

    this.generateInitialParticles();

    console.log('Initial particle count:', { count: this.particles.length });

    this.startAnimationLoop();

    console.log('CANVAS INITIALIZED');
  }

  public reset(): void {
    this.removeListeners();
    this.stopAnimationLoop();
    console.log('CANVAS RESET');
  }
}
