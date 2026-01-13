import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
}

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateCanvasSize();

        const particles: Particle[] = [];
        const particleCount = 100;
        const mousePos = { x: -1000, y: -1000 };
        const repelRadius = 150; // Raio de repulsão
        const repelForce = 0.6; // Força de repulsão
        const returnSpeed = 0.05; // Velocidade de retorno à posição base

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const color = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(155, 135, 245, 0.6)';

            particles.push({
                x,
                y,
                baseX: x,
                baseY: y,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 1.5 + 2,
                opacity: Math.random() * 0.3 + 0.5,
                color,
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mousePos.x = -1000;
            mousePos.y = -1000;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', updateCanvasSize);

        const animate = () => {
            // Clear canvas with slight trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, i) => {
                // Calculate distance from mouse
                const dx = mousePos.x - particle.x;
                const dy = mousePos.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // REPEL from mouse (antigravity effect)
                if (distance < repelRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (repelRadius - distance) / repelRadius * repelForce;

                    // Push away from mouse
                    particle.vx -= Math.cos(angle) * force;
                    particle.vy -= Math.sin(angle) * force;
                }

                // Return to base position (elastic effect)
                const dxBase = particle.baseX - particle.x;
                const dyBase = particle.baseY - particle.y;
                particle.vx += dxBase * returnSpeed;
                particle.vy += dyBase * returnSpeed;

                // Apply damping
                particle.vx *= 0.95;
                particle.vy *= 0.95;

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Keep particles in bounds (soft boundaries)
                if (particle.x < 0) particle.x = 0;
                if (particle.x > canvas.width) particle.x = canvas.width;
                if (particle.y < 0) particle.y = 0;
                if (particle.y > canvas.height) particle.y = canvas.height;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                // Draw connections to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 80) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        const opacity = (1 - dist / 80) * 0.15;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none hidden md:block"
            style={{ opacity: 0.4, zIndex: 0 }}
        />
    );
}
