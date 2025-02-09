const canvasProperties = {
  width: window.innerWidth / 2,
  height: window.innerHeight,
  center: {
    x: window.innerWidth / 4,
    y: window.innerHeight / 2,
  },
};

const stageProperties = {
  width: 600,
  height: 480,
  left: canvasProperties.center.x - 600 / 2,
  top: canvasProperties.center.y - 480 / 2,
};

myCanvas.width = canvasProperties.width;
myCanvas.height = canvasProperties.height;
helperCanvas.width = canvasProperties.width;
helperCanvas.height = canvasProperties.height;

const ctx = myCanvas.getContext("2d");
const helperCtx = helperCanvas.getContext("2d");
helperCtx.fillStyle = "red";
helperCtx.fillRect(0, 0, canvasProperties.width, canvasProperties.height);
clearCanvas();
const shapes = [];
currentShape = null;

const downCallbackForRect = function (e) {
  const mousePosition = {
    y: e.offsetY,
    x: e.offsetX,
  };

  currentShape = new Rect(mousePosition, getOptions());

  const moveCallback = function (e) {
    const mousePosition = {
      y: e.offsetY,
      x: e.offsetX,
    };

    currentShape.setCorner2(mousePosition);
    drawShapes([...shapes, currentShape]);
  };

  const upCallback = function (e) {
    myCanvas.removeEventListener("pointermove", moveCallback);
    myCanvas.removeEventListener("pointerup", upCallback);

    shapes.push(currentShape);
  };
  myCanvas.addEventListener("pointermove", moveCallback);
  myCanvas.addEventListener("pointerup", upCallback);
};
const downCallbackForSelect = function (e) {
  const mousePosition = {
    y: e.offsetY,
    x: e.offsetX,
  };

  const [r, g, b, a] = helperCtx.getImageData(
    mousePosition.x,
    mousePosition.y,
    1,
    1
  ).data;

  const id = (r << 16) | (g << 8) | b;
  const shape = shapes.find((s) => s.id === id);
  if (shape) {
    // console.log(shape);
    shape.selected = !shape.selected;
    drawShapes(shapes);
  }
};

const downCallbackForPath = function (e) {
  const mousePosition = {
    y: e.offsetY,
    x: e.offsetX,
  };

  currentShape = new Path(mousePosition, getOptions());

  const moveCallback = function (e) {
    const mousePosition = {
      y: e.offsetY,
      x: e.offsetX,
    };

    currentShape.addPoint(mousePosition);

    drawShapes([...shapes, currentShape]);
  };

  const upCallback = function (e) {
    myCanvas.removeEventListener("pointermove", moveCallback);
    myCanvas.removeEventListener("pointerup", upCallback);

    shapes.push(currentShape);
  };
  myCanvas.addEventListener("pointermove", moveCallback);
  myCanvas.addEventListener("pointerup", upCallback);
};

function getOptions() {
  console.log(strokeWidth.value);
  return {
    fillColor: fillColor.value,
    strokeColor: strokeColor.value,
    fill: fill.checked,
    stroke: stroke.checked,
    strokeWidth: Number(strokeWidth.value),
  };
}

function clearCanvas() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

  ctx.fillStyle = "white";

  ctx.fillRect(
    stageProperties.left,
    stageProperties.top,
    stageProperties.width,
    stageProperties.height
  );
}

myCanvas.addEventListener("pointerdown", downCallbackForPath);
// myCanvas.addEventListener("pointerdown", downCallbackForRect);

function changeTool(info) {
  myCanvas.removeEventListener("pointerdown", downCallbackForPath);
  myCanvas.removeEventListener("pointerdown", downCallbackForRect);
  myCanvas.removeEventListener("pointerdown", downCallbackForSelect);

  switch (info) {
    case "rect":
      myCanvas.addEventListener("pointerdown", downCallbackForRect);
      break;
    case "path":
      myCanvas.addEventListener("pointerdown", downCallbackForPath);
      break;
    case "select":
      myCanvas.addEventListener("pointerdown", downCallbackForSelect);
      break;
  }
}
function drawShapes(shapes) {
  clearCanvas();
  for (const shape of shapes) {
    shape.draw(ctx);
  }
  helperCtx.clearRect(0, 0, canvasProperties.width, canvasProperties.height);
  for (const shape of shapes) {
    shape.drawHitRegion(helperCtx);
  }
}
