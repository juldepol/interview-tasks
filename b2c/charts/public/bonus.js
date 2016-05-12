var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var config=getConfig();
var min=config.POINTS.MIN;
var max=config.POINTS.MAX;
var qty=config.POINTS.QTY;
var update=config.POINTS.UPDATE_INTERVAL;
var xAxis = canvas.height / 2;
var xScale = canvas.width / qty;
var yScale = canvas.height / (max - min);

var request;
var url;
var interval;

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#727272";
  ctx.moveTo(0, 300);
  ctx.lineTo(800, 300);
  ctx.stroke();
}

function getConfig() {
  var info;
  $.ajax({
    url: "/api/v1/config",
    type: "GET",
    async: false,
    success: function(data) {
      info= data;
    }
  });
  return info;
}

function drawCart(points) {
  clearCanvas();
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#303F9F";
  for (var i = 0; i < points.length; i++) {
    ctx.lineTo(i * xScale, points[i] * yScale + xAxis);
  }
  ctx.stroke();
}

function Magic(URL) {
  clearInterval(interval);
  interval=setInterval(function () {
    request=$.ajax({
      url: url,
      type: "GET",
      async: false,
      success: function(points) {
        drawCart(points);
      }
    });
  }, update);
}

$("#one").click(function() {
  url="/api/v1/bonus1";
  Magic(url);
});

$("#two").click(function() {
  url="/api/v1/bonus2";
  Magic(url);
});

$("#three").click(function() {
  url="/api/v1/bonus3";
  Magic(url);
});

$("#four").click(function() {
  url="/api/v1/points";
  Magic(url);
});
