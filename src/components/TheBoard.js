import styled from 'styled-components';
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";

/*===========================================*/
/*              STYLED COMPONENTS            */
/*===========================================*/

const BoardBg = styled.canvas`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  height : 4000px;
  width: 4000px;
  background: var(--background-color);
  object-fit: contain;
`

/*===========================================*/
/*                  GENERAL                  */
/*===========================================*/

const STROKE_WIDTH = 6;
const STROKE_COLOR = "white";

function getEventPos(e) {

  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  return {x, y};
}

/*===========================================*/
/*                 COMPONENT                 */
/*===========================================*/

const TheBoard = () => {

  //mouse position
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPos, setLastPos] = useState({x : -1, y :-1});

  //canvas
  const canvas = useRef(null);
  const [context, setContext] = useState(null);

  //inner functions
  const drawLine = useCallback((x1, y1, x2, y2) => {
    if(!context) return;

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = STROKE_WIDTH;
    context.strokeStyle = STROKE_COLOR;
    context.stroke();
  }, [context]);

  const drawPoint = useCallback((x, y) => {
    if(!context) return;
  
    context.beginPath();
    context.arc(x, y, STROKE_WIDTH/2, 0, 2 * Math.PI, false);
    context.fillStyle = STROKE_COLOR;
    context.fill();
  }, [context]);
  
  function handleMouseDown(e) {
    setMouseDown(true);
    
    let position = getEventPos(e);

    drawPoint(position.x, position.y);
    setLastPos(position);
  }

  function handleMouseMove(e) {

    let position = getEventPos(e);

    if(!mouseDown) return;

    drawLine(lastPos.x, lastPos.y, position.x, position.y);
    drawPoint(position.x, position.y);

    setLastPos(position);
  }

  function handleMouseUp(e) {
    setMouseDown(false);
  }

  function setupCanvas() {
    setContext(canvas.current.getContext('2d'));
    canvas.current.width = 4000;
    canvas.current.height = 4000;
  }

  //ON MOUNT
  useEffect(() => {
    setupCanvas();
  }, [drawLine, drawPoint]);

  return (
    <BoardBg 
      onMouseDown={(e) => handleMouseDown(e)} 
      onMouseUp={(e) => handleMouseUp(e)}
      onMouseLeave={(e) => handleMouseUp(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      ref={canvas}
      ></BoardBg>
  );
};

export default TheBoard;