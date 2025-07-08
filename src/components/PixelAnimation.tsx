
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
  vx: number;
  vy: number;
  trail: Array<{x: number, y: number, opacity: number}>;
}

interface PixelAnimationProps {
  className?: string;
  pixelCount?: number;
  colors?: string[];
  enableInteraction?: boolean;
}

const PixelAnimation: React.FC<PixelAnimationProps> = ({
  className = '',
  pixelCount = 120,
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'],
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
          size: type === 'plane' ? 6 : Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.8 + 0.3,
          speed: Math.random() * 2 + 0.5,
          angle: Math.random() * Math.PI * 2,
          life: Math.random() * 1000 + 500,
          maxLife: Math.random() * 1000 + 500,
          type,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          trail: []
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.save();
      
      // Draw trail for moving particles
      if (particle.trail.length > 0) {
        for (let i = 0; i < particle.trail.length; i++) {
          const trailPoint = particle.trail[i];
          ctx.globalAlpha = trailPoint.opacity;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(trailPoint.x, trailPoint.y, particle.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Main particle
      ctx.globalAlpha = particle.opacity * (particle.life / particle.maxLife);
      
      if (particle.type === 'plane') {
        // Draw animated plane
        ctx.fillStyle = particle.color;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.angle);
        ctx.fillRect(-particle.size, -1, particle.size * 2, 2);
        ctx.fillRect(-2, -particle.size/2, 4, particle.size);
        // Add wing details
        ctx.fillRect(-particle.size * 0.7, -particle.size/4, particle.size * 1.4, 1);
      } else if (particle.type === 'sparkle') {
        // Draw animated sparkle
        ctx.fillStyle = particle.color;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.angle);
        // Draw 8-pointed star
        for (let i = 0; i < 8; i++) {
          ctx.fillRect(-particle.size/2, -1, particle.size, 2);
          ctx.rotate(Math.PI / 4);
        }
      } else {
        // Draw pulsating dot with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, particle.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    };

    const updateParticle = (particle: Particle) => {
      // Update trail
      particle.trail.push({
        x: particle.x,
        y: particle.y,
        opacity: particle.opacity * 0.5
      });
      
      if (particle.trail.length > 5) {
        particle.trail.shift();
      }
      
      // Update trail opacity
      particle.trail.forEach((point, index) => {
        point.opacity *= 0.9;
      });
      
      // Dynamic movement
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Gentle drift towards target
      const dx = particle.targetX - particle.x;
      const dy = particle.targetY - particle.y;
      particle.x += dx * 0.005;
      particle.y += dy * 0.005;
      
      // Add some randomness
      particle.vx += (Math.random() - 0.5) * 0.1;
      particle.vy += (Math.random() - 0.5) * 0.1;
      
      // Damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Rotation for planes and sparkles
      if (particle.type !== 'dot') {
        particle.angle += 0.02;
      }
      
      // Pulsing effect for dots
      if (particle.type === 'dot') {
        particle.size = 2 + Math.sin(Date.now() * 0.005 + particle.x * 0.01) * 1;
      }
      
      // Life cycle
      particle.life -= 1;
      if (particle.life <= 0) {
        particle.x = Math.random() * canvas.offsetWidth;
        particle.y = Math.random() * canvas.offsetHeight;
        particle.targetX = Math.random() * canvas.offsetWidth;
        particle.targetY = Math.random() * canvas.offsetHeight;
        particle.life = particle.maxLife;
        particle.color = colors[Math.floor(Math.random() * colors.length)];
        particle.vx = (Math.random() - 0.5) * 2;
        particle.vy = (Math.random() - 0.5) * 2;
        particle.trail = [];
      }
      
      // Mouse interaction
      if (enableInteraction) {
        const mouseDx = mouseRef.current.x - particle.x;
        const mouseDy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150 * 2;
          particle.vx -= (mouseDx / distance) * force * 0.1;
          particle.vy -= (mouseDy / distance) * force * 0.1;
          particle.opacity = Math.min(1, particle.opacity + 0.2);
        }
      }
      
      // Boundary wrapping
      if (particle.x < -50) particle.x = canvas.offsetWidth + 50;
      if (particle.x > canvas.offsetWidth + 50) particle.x = -50;
      if (particle.y < -50) particle.y = canvas.offsetHeight + 50;
      if (particle.y > canvas.offsetHeight + 50) particle.y = -50;
      
      // Occasional target change
      if (Math.random() < 0.001) {
        particle.targetX = Math.random() * canvas.offsetWidth;
        particle.targetY = Math.random() * canvas.offsetHeight;
      }
    };

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
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
