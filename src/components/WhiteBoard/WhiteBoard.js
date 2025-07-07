import React, { useRef, useEffect, useState } from 'react';
import { Pencil, Eraser, RotateCcw, Download } from 'lucide-react';
import './WhiteBoard.css';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Set initial canvas background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing properties
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const getTouchPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (pos) => {
    setIsDrawing(true);
    setLastPos(pos);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (tool === 'pen') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    } else if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2;
    }
  };

  const draw = (currentPos) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();
    
    setLastPos(currentPos);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    const pos = getMousePos(e);
    startDrawing(pos);
  };

  const handleMouseMove = (e) => {
    const pos = getMousePos(e);
    draw(pos);
  };

  const handleMouseUp = () => {
    stopDrawing();
  };

  // Touch events
  const handleTouchStart = (e) => {
    e.preventDefault();
    const pos = getTouchPos(e);
    startDrawing(pos);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const pos = getTouchPos(e);
    draw(pos);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    stopDrawing();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
    '#800080', '#FFC0CB', '#A52A2A', '#808080'
  ];

  return (
    <div className="whiteboard-container">
      {/* Toolbar */}
      <div className="toolbar">
        {/* Tools */}
        <div className="tools-group">
          <button
            onClick={() => setTool('pen')}
            className={`tool-btn ${tool === 'pen' ? 'active' : ''}`}
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
          >
            <Eraser size={20} />
          </button>
        </div>

        {/* Colors */}
        <div className="colors-group">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`color-btn ${color === c ? 'active' : ''}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Brush Size */}
        <div className="size-group">
          <label className="size-label">Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="size-slider"
          />
          <span className="size-value">{brushSize}</span>
        </div>

        {/* Actions */}
        <div className="actions-group">
          <button
            onClick={clearCanvas}
            className="action-btn clear-btn"
          >
            <RotateCcw size={16} />
            Clear
          </button>
          <button
            onClick={downloadCanvas}
            className="action-btn save-btn"
          >
            <Download size={16} />
            Save
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          className="whiteboard-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
    </div>
  );
};

export default Whiteboard;