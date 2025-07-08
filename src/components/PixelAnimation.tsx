
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
  targetX: number;
  targetY: number;
  life: number;
  maxLife: number;
}

interface PixelAnimationProps {
  className?: string;
  pixelCount?: number;
  colors?: string[];
  enableInteraction?: boolean;
}

const PixelAnimation: React.FC<PixelAnimationProps> = ({
  className = '',
  pixelCount = 100,
  colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'],
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
        const life = Math.random() * 300 + 100;
        pixelsRef.current.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          size: Math.random() * 6 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 1 + 0.2,
          direction: Math.random() * Math.PI * 2,
          pulse: 0,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          targetX: Math.random() * canvas.offsetWidth,
          targetY: Math.random() * canvas.offsetHeight,
          life: life,
          maxLife: life
        });
      }
    };

    const drawPixel = (pixel: Pixel) => {
      ctx.save();
      
      // Calculate pulsing and life-based effects
      const pulseScale = 1 + Math.sin(pixel.pulse) * 0.5;
      const lifeRatio = pixel.life / pixel.maxLife;
      const currentSize = pixel.size * pulseScale * lifeRatio;
      const currentOpacity = pixel.opacity * lifeRatio;
      
      // Create multiple layers for glow effect
      const gradient = ctx.createRadialGradient(
        pixel.x, pixel.y, 0,
        pixel.x, pixel.y, currentSize * 3
      );
      
      const alpha = Math.floor(currentOpacity * 255).toString(16).padStart(2, '0');
      gradient.addColorStop(0, pixel.color + alpha);
      gradient.addColorStop(0.3, pixel.color + Math.floor(currentOpacity * 128).toString(16).padStart(2, '0'));
      gradient.addColorStop(1, pixel.color + '00');
      
      // Draw outer glow
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pixel.x, pixel.y, currentSize * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw main pixel with enhanced glow
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = pixel.color + alpha;
      ctx.shadowColor = pixel.color;
      ctx.shadowBlur = currentSize * 2;
      ctx.beginPath();
      ctx.arc(pixel.x, pixel.y, currentSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw core
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;
      ctx.fillStyle = pixel.color + 'ff';
      ctx.beginPath();
      ctx.arc(pixel.x, pixel.y, currentSize * 0.4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const updatePixel = (pixel: Pixel) => {
      // Update life
      pixel.life -= 0.5;
      
      // Respawn pixel when life ends
      if (pixel.life <= 0) {
        pixel.x = Math.random() * canvas.offsetWidth;
        pixel.y = Math.random() * canvas.offsetHeight;
        pixel.life = pixel.maxLife;
        pixel.targetX = Math.random() * canvas.offsetWidth;
        pixel.targetY = Math.random() * canvas.offsetHeight;
        pixel.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      // Move towards target with some randomness
      const dx = pixel.targetX - pixel.x;
      const dy = pixel.targetY - pixel.y;
      pixel.x += dx * 0.005 + Math.cos(pixel.direction) * pixel.speed;
      pixel.y += dy * 0.005 + Math.sin(pixel.direction) * pixel.speed;
      
      // Update pulse
      pixel.pulse += pixel.pulseSpeed;
      
      // Mouse interaction with stronger effect
      if (enableInteraction) {
        const mouseDx = mouseRef.current.x - pixel.x;
        const mouseDy = mouseRef.current.y - pixel.y;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        
        if (mouseDistance < 150) {
          const force = (150 - mouseDistance) / 150;
          pixel.x -= (mouseDx / mouseDistance) * force * 3;
          pixel.y -= (mouseDy / mouseDistance) * force * 3;
          pixel.opacity = Math.min(1, pixel.opacity + force * 0.8);
          pixel.size = Math.min(12, pixel.size + force * 2);
        } else {
          pixel.opacity = Math.max(0.2, pixel.opacity - 0.005);
          pixel.size = Math.max(2, pixel.size - 0.01);
        }
      }
      
      // Boundary wrapping
      if (pixel.x < -20) pixel.x = canvas.offsetWidth + 20;
      if (pixel.x > canvas.offsetWidth + 20) pixel.x = -20;
      if (pixel.y < -20) pixel.y = canvas.offsetHeight + 20;
      if (pixel.y > canvas.offsetHeight + 20) pixel.y = -20;
      
      // Occasionally change direction and target
      if (Math.random() < 0.005) {
        pixel.direction += (Math.random() - 0.5) * 1;
        pixel.targetX = Math.random() * canvas.offsetWidth;
        pixel.targetY = Math.random() * canvas.offsetHeight;
      }
    };

    const animate = () => {
      // Clear with slight trails for smoother effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
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
      className={`absolute inset-0 ${className}`}
      style={{
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: enableInteraction ? 'auto' : 'none'
      }}
    />
  );
};

export default PixelAnimation;
