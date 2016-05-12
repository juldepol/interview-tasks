var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
	ctx.lineWidth = 1;
  ctx.strokeStyle = "#727272";
  ctx.moveTo(0, 300);
  ctx.lineTo(800, 300);
  ctx.stroke();
}

$.get("/api/v1/config", function(config) {
  var xAxis = canvas.height / 2;
  var xScale = canvas.width / config.POINTS.QTY;
  var yScale = canvas.height / (config.POINTS.MAX - config.POINTS.MIN);
  setInterval(function() {
    $.get("/api/v1/points", function(points) {
      clearCanvas();
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#303F9F";
      for (var i = 0; i < points.length; i++) {
        ctx.lineTo(i * xScale, points[i] * yScale + xAxis);
      }
      ctx.stroke();
    });
  }, config.POINTS.UPDATE_INTERVAL);
});
