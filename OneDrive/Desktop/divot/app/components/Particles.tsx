"use client";

import { useEffect, useRef, useState } from "react";

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Skip particles on mobile for performance
    if (isMobile) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      canvasWidth: number;
      canvasHeight: number;
      color: string;
      type: 'sedan' | 'suv' | 'sports' | 'truck';
      speed: number;
      trail: Array<{x: number, y: number}>;
      rotation: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 6 + 4;
        this.speed = Math.random() * 1.5 + 0.5;
        this.trail = [];
        this.rotation = 0;

        // Car colors (realistic automotive colors)
        const colors = [
          '#1f2937', // dark gray
          '#374151', // charcoal
          '#4b5563', // silver
          '#dc2626', // red sports car
          '#2563eb', // blue
          '#059669', // green
          '#d97706', // orange
          '#7c3aed', // purple
          '#ffffff', // white
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        // Car types
        const types: ('sedan' | 'suv' | 'sports' | 'truck')[] = ['sedan', 'suv', 'sports', 'truck'];
        this.type = types[Math.floor(Math.random() * types.length)];

        // Horizontal movement like driving
        this.vx = (Math.random() > 0.5 ? 1 : -1) * this.speed;
        this.vy = (Math.random() - 0.5) * 0.1;
      }

      update() {
        // Store trail for motion blur
        this.trail.push({x: this.x, y: this.y});
        if (this.trail.length > 5) this.trail.shift();

        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.vx * 0.02;

        // Wrap around edges
        if (this.x > this.canvasWidth + 50) {
          this.x = -50;
          this.trail = [];
        } else if (this.x < -50) {
          this.x = this.canvasWidth + 50;
          this.trail = [];
        }

        if (this.y < 0 || this.y > this.canvasHeight) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;

        // Draw motion blur trail
        this.trail.forEach((point, index) => {
          const alpha = index / this.trail.length * 0.3;
          ctx.fillStyle = this.color;
          ctx.globalAlpha = alpha;
          this.drawCarShape(point.x, point.y, this.size * 0.8, this.type);
        });
        ctx.globalAlpha = 1;

        // Draw main car
        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.vx < 0) {
          ctx.scale(-1, 1); // Flip if moving left
        }
        this.drawDetailedCar(0, 0, this.size, this.type);
        ctx.restore();
      }

      drawDetailedCar(x: number, y: number, size: number, type: string) {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;

        if (type === 'sedan') {
          // Sedan body
          this.drawSedan(x, y, size);
        } else if (type === 'suv') {
          // SUV body
          this.drawSUV(x, y, size);
        } else if (type === 'sports') {
          // Sports car body
          this.drawSportsCar(x, y, size);
        } else if (type === 'truck') {
          // Truck body
          this.drawTruck(x, y, size);
        }

        ctx.shadowBlur = 0;
      }

      drawSedan(x: number, y: number, size: number) {
        // Main body
        ctx.beginPath();
        ctx.moveTo(x - size * 2, y + size * 0.5);
        ctx.lineTo(x - size * 1.5, y + size * 0.5);
        ctx.lineTo(x - size * 1.2, y);
        ctx.lineTo(x - size * 0.3, y);
        ctx.lineTo(x, y + size * 0.3);
        ctx.lineTo(x + size * 1.5, y + size * 0.3);
        ctx.lineTo(x + size * 2, y + size * 0.5);
        ctx.lineTo(x + size * 2, y - size * 0.3);
        ctx.lineTo(x - size * 2, y - size * 0.3);
        ctx.closePath();
        ctx.fill();

        // Windows
        ctx.fillStyle = '#1e3a5f';
        ctx.beginPath();
        ctx.moveTo(x - size * 1.1, y + size * 0.1);
        ctx.lineTo(x - size * 0.4, y + size * 0.1);
        ctx.lineTo(x - size * 0.2, y - size * 0.2);
        ctx.lineTo(x - size * 1.3, y - size * 0.2);
        ctx.closePath();
        ctx.fill();

        // Headlights
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.ellipse(x + size * 1.8, y + size * 0.1, size * 0.2, size * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Taillights
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.ellipse(x - size * 1.8, y + size * 0.1, size * 0.15, size * 0.1, 0, 0, Math.PI * 2);
        ctx.fill();

        // Wheels
        ctx.fillStyle = '#1f2937';
        ctx.beginPath();
        ctx.arc(x - size * 1.2, y + size * 0.4, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + size * 1.2, y + size * 0.4, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      drawSUV(x: number, y: number, size: number) {
        // Taller body
        ctx.beginPath();
        ctx.moveTo(x - size * 2, y + size * 0.7);
        ctx.lineTo(x - size * 1.5, y + size * 0.7);
        ctx.lineTo(x - size * 1.3, y - size * 0.3);
        ctx.lineTo(x - size * 0.3, y - size * 0.5);
        ctx.lineTo(x + size * 0.5, y - size * 0.5);
        ctx.lineTo(x + size * 1.5, y + size * 0.7);
        ctx.lineTo(x + size * 2, y + size * 0.7);
        ctx.lineTo(x + size * 2, y - size * 0.3);
        ctx.lineTo(x - size * 2, y - size * 0.3);
        ctx.closePath();
        ctx.fill();

        // Windows
        ctx.fillStyle = '#1e3a5f';
        ctx.fillRect(x - size * 1.1, y - size * 0.2, size * 0.7, size * 0.4);

        // Headlights
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.rect(x + size * 1.5, y + size * 0.2, size * 0.3, size * 0.15);
        ctx.fill();

        // Taillights
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.rect(x - size * 1.8, y + size * 0.2, size * 0.2, size * 0.15);
        ctx.fill();

        // Wheels (larger)
        ctx.fillStyle = '#1f2937';
        ctx.beginPath();
        ctx.arc(x - size * 1.2, y + size * 0.6, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + size * 1.2, y + size * 0.6, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      drawSportsCar(x: number, y: number, size: number) {
        // Sleek, low body
        ctx.beginPath();
        ctx.moveTo(x - size * 2, y + size * 0.4);
        ctx.quadraticCurveTo(x - size, y + size * 0.4, x - size * 0.5, y);
        ctx.quadraticCurveTo(x + size * 0.5, y - size * 0.3, x + size * 1.8, y + size * 0.2);
        ctx.lineTo(x + size * 2, y + size * 0.4);
        ctx.lineTo(x + size * 2, y - size * 0.2);
        ctx.lineTo(x - size * 2, y - size * 0.2);
        ctx.closePath();
        ctx.fill();

        // Windows (sleek)
        ctx.fillStyle = '#1e3a5f';
        ctx.beginPath();
        ctx.moveTo(x - size * 0.8, y + size * 0.1);
        ctx.quadraticCurveTo(x - size * 0.3, y - size * 0.1, x + size * 0.3, y - size * 0.1);
        ctx.lineTo(x + size * 0.5, y + size * 0.2);
        ctx.lineTo(x - size * 0.8, y + size * 0.2);
        ctx.closePath();
        ctx.fill();

        // Headlights (aggressive)
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.moveTo(x + size * 1.6, y);
        ctx.lineTo(x + size * 2, y + size * 0.1);
        ctx.lineTo(x + size * 2, y - size * 0.1);
        ctx.closePath();
        ctx.fill();

        // Taillights (strip)
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x - size * 2, y - size * 0.05, size * 0.3, size * 0.1);

        // Wheels (low profile)
        ctx.fillStyle = '#1f2937';
        ctx.beginPath();
        ctx.arc(x - size * 1, y + size * 0.35, size * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + size * 1.3, y + size * 0.35, size * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }

      drawTruck(x: number, y: number, size: number) {
        // Cab
        ctx.fillStyle = this.color;
        ctx.fillRect(x - size * 0.5, y - size * 0.3, size, size * 0.6);
        
        // Bed
        ctx.fillRect(x + size * 0.5, y - size * 0.2, size * 1.5, size * 0.5);

        // Window
        ctx.fillStyle = '#1e3a5f';
        ctx.fillRect(x - size * 0.3, y - size * 0.2, size * 0.6, size * 0.3);

        // Headlight
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(x + size * 0.5, y + size * 0.1, size * 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Taillights
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x + size * 1.9, y, size * 0.1, size * 0.2);

        // Wheels (big)
        ctx.fillStyle = '#1f2937';
        ctx.beginPath();
        ctx.arc(x - size * 0.2, y + size * 0.3, size * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + size * 1.2, y + size * 0.3, size * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + size * 1.7, y + size * 0.3, size * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }

      drawCarShape(x: number, y: number, size: number, type: string) {
        ctx.fillStyle = this.color;
        if (type === 'sedan') {
          ctx.fillRect(x - size, y - size * 0.3, size * 2, size * 0.6);
        } else if (type === 'suv') {
          ctx.fillRect(x - size, y - size * 0.4, size * 2, size * 0.8);
        } else if (type === 'sports') {
          ctx.fillRect(x - size, y - size * 0.25, size * 2, size * 0.5);
        } else {
          ctx.fillRect(x - size, y - size * 0.3, size * 2, size * 0.6);
        }
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw road lane markings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 3;
      ctx.setLineDash([40, 40]);
      for (let y = 0; y < canvas.height; y += 120) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Mouse interaction - subtle headlight effect
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150 && particle.type === 'headlight') {
          // Make headlights brighter near mouse
          particle.size = Math.min(8, particle.size + 0.1);
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      ) : (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-0"
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </>
  );
};

export default ParticlesBackground;
