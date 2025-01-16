// CAPTCHA.js
import React, { useState, useEffect, useRef } from 'react';

const CAPTCHA = ({ onCaptchaGenerated }) => {

  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState('');

  const generateCaptchaText = (length = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaText(captcha);
    if (onCaptchaGenerated) onCaptchaGenerated(captcha); // Callback to pass the text back
  };

  const generateCaptchaImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = 200;
    const height = 40;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 50; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
      ctx.lineWidth = Math.random() * 2;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(captchaText, width / 2, height / 2);
  };

  useEffect(() => {
    generateCaptchaText();
  }, []);

  useEffect(() => {
    generateCaptchaImage();
  }, [captchaText]);

  // style={{ textAlign: 'center' }}
  return (
    <div className="container text-center my-4">
      <div className="d-flex justify-content-center align-items-center">
        <canvas ref={canvasRef} className="border border-secondary rounded"></canvas>
        <button
          className="btn btn-secondary ms-3"
          onClick={() => generateCaptchaText()}
          aria-label="Refresh CAPTCHA"
        >
          <i className="fa fa-refresh"></i>
        </button>
      </div>
    </div>
  );
};

export default CAPTCHA;
