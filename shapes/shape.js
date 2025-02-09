class Shape {
  constructor(options) {
    this.options = options;
    this.id = Math.floor(16777216 * Math.random());
    this.selected = false;
  }

  applyHitRegionStyle(ctx) {
    // console.log(this.id);

    const red = (this.id & 0xff0000) >> 16;
    const green = (this.id & 0x00ff00) >> 8;
    const blue = this.id & 0x0000ff;
    ctx.fillStyle = `rgb(${red},${green},${blue})`;
    ctx.strokeStyle = `rgb(${red},${green},${blue})`;
    ctx.lineWidth = this.options.strokeWidth + 10;
    // console.log(ctx.lineWidth, this.options.strokeWidth);

    if (this.options.fill) {
      ctx.fill();
    }
    if (this.options.stroke) {
      ctx.stroke();
    }
  }
  applyStyle(ctx) {
    ctx.save();
    ctx.strokeStyle = this.options.strokeColor;
    ctx.fillStyle = this.options.fillColor;
    ctx.lineWidth = this.options.strokeWidth;
    if (this.options.fill) {
      ctx.fill();
    }
    if (this.options.stroke) {
      ctx.stroke();
    }
    ctx.restore();
  }
  drawGizmo(ctx) {
    throw new Error("draw method must e implemented");
  }
  draw(ctx) {
    throw new Error("draw method not implemented");
  }
  drawHitRegion(ctx) {
    throw new Error("draw method not implemented");
  }
}
