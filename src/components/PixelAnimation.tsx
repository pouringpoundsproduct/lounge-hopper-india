import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  angle: number;
  life: number;
  maxLife: number;
  type: 'dot' | 'plane' | 'sparkle';
}

interface PixelAnimationProps {
  className?: string;
  pixelCount?: number;
  colors?: string[];
  enableInteraction?: boolean;
}

const PixelAnimation: React.FC<PixelAnimationProps> = ({
  className = '',
  pixelCount = 80,
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
  enableInteraction = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
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
      canvas.style.width = canvas.offsetWidth + 'px';
      canvas.style.height = canvas.offsetHeight + 'px';
    };

    const initializeParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < pixelCount; i++) {
        const types: ('dot' | 'plane' | 'sparkle')[] = ['dot', 'plane', 'sparkle'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        particlesRef.current.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          targetX: Math.random() * canvas.offsetWidth,
          targetY: Math.random() * canvas.offsetHeight,
          size: type === 'plane' ? 4 : Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 0.5 + 0.1,
          angle: Math.random() * Math.PI * 2,
          life: Math.random() * 500 + 200,
          maxLife: Math.random() * 500 + 200,
          type
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.save();
      
      const alpha = (particle.opacity * (particle.life / particle.maxLife) * 255).toString(16).padStart(2, '0');
      
      if (particle.type === 'plane') {
        // Draw simple plane shape
        ctx.fillStyle = particle.color + alpha;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.angle);
        ctx.fillRect(-particle.size, -1, particle.size * 2, 2);
        ctx.fillRect(-1, -particle.size/2, 2, particle.size);
      } else if (particle.type === 'sparkle') {
        // Draw sparkle/star shape
        ctx.fillStyle = particle.color + alpha;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.angle);
        for (let i = 0; i < 4; i++) {
          ctx.fillRect(-particle.size/2, -0.5, particle.size, 1);
          ctx.rotate(Math.PI / 4);
        }
      } else {
        // Draw simple dot
        ctx.fillStyle = particle.color + alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    };

    const updateParticle = (particle: Particle) => {
      // Gentle movement towards target
      const dx = particle.targetX - particle.x;
      const dy = particle.targetY - particle.y;
      particle.x += dx * 0.01 + Math.cos(particle.angle) * particle.speed;
      particle.y += dy * 0.01 + Math.sin(particle.angle) * particle.speed;
      
      // Slow rotation for planes and sparkles
      if (particle.type !== 'dot') {
        particle.angle += 0.01;
      }
      
      // Life cycle
      particle.life -= 0.5;
      if (particle.life <= 0) {
        particle.x = Math.random() * canvas.offsetWidth;
        particle.y = Math.random() * canvas.offsetHeight;
        particle.targetX = Math.random() * canvas.offsetWidth;
        particle.targetY = Math.random() * canvas.offsetHeight;
        particle.life = particle.maxLife;
        particle.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      // Mouse interaction (very subtle)
      if (enableInteraction) {
        const mouseDx = mouseRef.current.x - particle.x;
        const mouseDy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100 * 0.5;
          particle.x -= (mouseDx / distance) * force;
          particle.y -= (mouseDy / distance) * force;
        }
      }
      
      // Keep particles within bounds
      if (particle.x < 0) particle.x = canvas.offsetWidth;
      if (particle.x > canvas.offsetWidth) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.offsetHeight;
      if (particle.y > canvas.offsetHeight) particle.y = 0;
      
      // Occasionally change target
      if (Math.random() < 0.002) {
        particle.targetX = Math.random() * canvas.offsetWidth;
        particle.targetY = Math.random() * canvas.offsetHeight;
      }
    };

    const animate = () => {
      // Clear canvas with slight fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      particlesRef.current.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle);
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
      initializeParticles();
    };

    resizeCanvas();
    initializeParticles();
    animate();

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
