var draw = function(snakeToDraw, apple) {
  var drawableSnake = { color: "pink", pixels: snakeToDraw };
  var drawableApple = { color: "yellow", pixels: [apple] };
  var drawableObjects = [drawableSnake, drawableApple];
  CHUNK.draw(drawableObjects);
}

var moveSegment = function(segment) {
switch(segment.direction) {
  case "down":
    return { top: segment.top + 1, left: segment.left }
   case "up":
    return { top: segment.top - 1, left: segment.left }
   case "right":
    return { top: segment.top, left: segment.left + 1 }
  case "left":
    return { top: segment.top, left: segment.left - 1}
  default:
  return segment;
}
}

var segmentFurtherForwardThan = function(index, snake) {
if (snake[index - 1] === undefined) {
  return snake [index];
} else {
  return snake[index - 1]
}
}

var growSnake = function(snake) {
  var indexOfLastSegment = snake.length - 1;
  var lastSegment = snake[indexOfLastSegment];
  snake.push({ top: lastSegment.top, left: lastSegment.left });
  return snake;
}

var ate = function(snake, otherThing) {
  var head = snake[0];
  return CHUNK.detectCollisionBetween([head], otherThing);
}

//ARRAY.MAP function, that automatically identifies everything in an array, changes it, and returns the code to you
  var moveSnake = function(snake) {
    return snake.map(function(oldSegment, segmentIndex) {
      var newSegment = moveSegment(oldSegment);
      newSegment.direction = segmentFurtherForwardThan(segmentIndex, snake).direction;
      return newSegment;
    });
  }

  var advanceGame = function() {
    var newSnake = moveSnake(snake);

    if (ate(newSnake, snake)) {
      CHUNK.endGame();
      CHUNK.flashMessage("Cannabalism is not allowed");
    }

    if (ate(newSnake, [apple])) {
      newSnake = growSnake(newSnake);
      apple = CHUNK.randomLocation();
    }

    if (ate(newSnake, CHUNK.gameBoundaries())) {
    CHUNK.endGame();
    CHUNK.flashMessage("Ouch! Don't run into walls!");
}
snake = newSnake;
draw(snake, apple);
}


  var changeDirection = function(direction) {
    snake[0].direction = direction;
  }

  var apple = { top:8, left: 10}
  var snake = [{ top: 1, left: 0, direction: "right" }, { top: 0, left: 0, direction: "down"}];

  CHUNK.executeNTimesPerSecond(advanceGame, 6);
  CHUNK.onArrowKey(changeDirection);


  // var drawSnake = function(snakeToDraw) {
  //   var drawableSnake = { color: "teal", pixels: snakeToDraw };
  //   var drawableObjects = [drawableSnake];
  //   CHUNK.draw(drawableObjects);
  // }


  //     snake = moveSnake(snake);
  //
  //   if (CHUNK.detectCollisionBetween([apple], snake)) {
  //   snake=growSnake(snake);
  //   apple = CHUNK.randomLocation();
  // }
  //   if (CHUNK.detectCollisionBetween(snake, CHUNK.gameBoundaries())) {
  //     CHUNK.endGame();
  //     CHUNK.flashMessage("YOU FAILED");
  //   }
  //   draw(snake, apple);
  //    drawSnake(snake);
  //   }


  // "While" loop
  // var moveSnake = function(snake) {
  //   var newSnake = [];
  // var i = 0
  //   while (i<snake.length) {
  //       var oldSegment = snake[i]
  //       var newSegment = moveSegment(oldSegment);
  //       newSegment.direction = oldSegment.direction;
  //       newSnake.push(newSegment);
  //       i++}
  // return newSnake
  // }

  // //"For" loop
  // var moveSnake = function(snake) {
  //   var newSnake = [];
  //   for (var i = 0; i < snake.length; i++) {
  //     var oldSegment = snake[i]
  //     var newSegment = moveSegment(oldSegment);
  //     newSegment.direction = oldSegment.direction;
  //     newSnake.push(newSegment);
  //   }
  //   return newSnake
  // }


//FOR EACH function you could use instead of an array map
  // var moveSnake = function(snake) {
  //   var newSnake = [];
  //   snake.forEach(function(oldSegment) {
  //     var newSegment = moveSegment(oldSegment);
  //     newSegment.direction = oldSegment.direction;
  //     newSnake.push(newSegment);
  //   });
  //
  //   return newSnake;
  // }
