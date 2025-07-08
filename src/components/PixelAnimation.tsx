
import React, { useEffect, useRef } from 'react';

interface Pixel {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  direction: number;
  pulse: number;
  pulseSpeed: number;
}

interface PixelAnimationProps {
  className?: string;
  pixelCount?: number;
  colors?: string[];
  enableInteraction?: boolean;
}

const PixelAnimation: React.FC<PixelAnimationProps> = ({
  className = '',
  pixelCount = 50,
  colors = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#f97316'],
  enableInteraction = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initializePixels = () => {
      pixelsRef.current = [];
      for (let i = 0; i < pixelCount; i++) {
        pixelsRef.current.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.5 + 0.1,
          direction: Math.random() * Math.PI * 2,
          pulse: 0,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    const drawPixel = (pixel: Pixel) => {
      ctx.save();
      
      // Calculate pulsing effect
      const pulseScale = 1 + Math.sin(pixel.pulse) * 0.3;
      const currentSize = pixel.size * pulseScale;
      
      // Create gradient for each pixel
      const gradient = ctx.createRadialGradient(
        pixel.x, pixel.y, 0,
        pixel.x, pixel.y, currentSize
      );
      gradient.addColorStop(0, pixel.color + Math.floor(pixel.opacity * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(1, pixel.color + '00');
      
      // Draw pixel with glow effect
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pixel.x, pixel.y, currentSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Add core pixel
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = pixel.color + Math.floor(pixel.opacity * 255).toString(16).padStart(2, '0');
      ctx.beginPath();
      ctx.arc(pixel.x, pixel.y, pixel.size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const updatePixel = (pixel: Pixel) => {
      // Update position
      pixel.x += Math.cos(pixel.direction) * pixel.speed;
      pixel.y += Math.sin(pixel.direction) * pixel.speed;
      
      // Update pulse
      pixel.pulse += pixel.pulseSpeed;
      
      // Mouse interaction
      if (enableInteraction) {
        const dx = mouseRef.current.x - pixel.x;
        const dy = mouseRef.current.y - pixel.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          pixel.x -= (dx / distance) * force * 2;
          pixel.y -= (dy / distance) * force * 2;
          pixel.opacity = Math.min(1, pixel.opacity + force * 0.5);
          pixel.size = Math.min(8, pixel.size + force);
        } else {
          pixel.opacity = Math.max(0.2, pixel.opacity - 0.01);
          pixel.size = Math.max(2, pixel.size - 0.02);
        }
      }
      
      // Boundary check and wrap around
      if (pixel.x < -10) pixel.x = canvas.offsetWidth + 10;
      if (pixel.x > canvas.offsetWidth + 10) pixel.x = -10;
      if (pixel.y < -10) pixel.y = canvas.offsetHeight + 10;
      if (pixel.y > canvas.offsetHeight + 10) pixel.y = -10;
      
      // Occasionally change direction
      if (Math.random() < 0.002) {
        pixel.direction += (Math.random() - 0.5) * 0.5;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      pixelsRef.current.forEach(pixel => {
        updatePixel(pixel);
        drawPixel(pixel);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      resizeCanvas();
      initializePixels();
    };

    // Initialize
    resizeCanvas();
    initializePixels();
    animate();

    // Event listeners
    if (enableInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (enableInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [pixelCount, colors, enableInteraction]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    />
  );
};

export default PixelAnimation;
