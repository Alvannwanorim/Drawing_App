class Rect extends Shape {
  constructor(corner1, options) {
    super(options);
    this.corner1 = corner1;
    this.corner2 = corner1;
  }

  setCorner2(corner2) {
    this.corner2 = corner2;
  }

  draw(ctx) {
    ctx.beginPath();

    const minX = Math.min(this.corner1.x, this.corner2.x);
    const minY = Math.min(this.corner1.y, this.corner2.y);
    const width = Math.abs(this.corner1.x - this.corner2.x);
    const height = Math.abs(this.corner1.y - this.corner2.y);
    ctx.rect(minX, minY, width, height);
    this.applyStyle(ctx);

    if (this.selected) {
      this.drawGizmo(ctx);
    }
  }
  drawHitRegion(ctx) {
    ctx.beginPath();

    const minX = Math.min(this.corner1.x, this.corner2.x);
    const minY = Math.min(this.corner1.y, this.corner2.y);
    const width = Math.abs(this.corner1.x - this.corner2.x);
    const height = Math.abs(this.corner1.y - this.corner2.y);
    ctx.rect(minX, minY, width, height);
    this.applyHitRegionStyle(ctx);
  }

  drawGizmo(ctx) {
    const minX = Math.min(this.corner1.x, this.corner2.x);
    const minY = Math.min(this.corner1.y, this.corner2.y);
    const maxX = Math.max(this.corner1.x, this.corner2.x);
    const maxY = Math.max(this.corner1.y, this.corner2.y);
    // console.log(minX, minY, maxX - minX, maxY - minY);
    ctx.save();
    ctx.beginPath();
    ctx.rect(minX, minY, maxX - minX, maxY - minY);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.restore();
  }
}
