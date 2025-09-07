import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const CosmosBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      const stars: Star[] = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 8000);

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }

      starsRef.current = stars;
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Add twinkling effect
        star.opacity += (Math.random() - 0.5) * 0.02;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));

        // Move stars slowly
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -star.size;
          star.x = Math.random() * canvas.width;
        }
      });

      animationFrameRef.current = requestAnimationFrame(drawStars);
    };

    resizeCanvas();
    createStars();
    drawStars();

    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {/* Option 2: Deep Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      
      {/* Stars canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Minimal accent spots */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500 opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-cyan-400 opacity-3 rounded-full blur-2xl" />
    </div>
  );
};

export default CosmosBackground;
