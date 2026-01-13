import { useEffect, useRef, useState } from 'react';

interface MatrixTextProps {
    text: string;
    className?: string;
    triggerOnce?: boolean;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

export function MatrixText({ text, className = '', triggerOnce = false }: MatrixTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const hasAnimatedRef = useRef(false);

    const animate = () => {
        if (triggerOnce && hasAnimatedRef.current) return;

        setIsAnimating(true);
        const iterations = 20;
        let currentIteration = 0;

        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < currentIteration) return text[index];
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join('')
            );

            currentIteration += 0.5;

            if (currentIteration >= text.length) {
                clearInterval(interval);
                setDisplayText(text);
                setIsAnimating(false);
                if (triggerOnce) hasAnimatedRef.current = true;
            }
        }, 50);
    };

    useEffect(() => {
        if (triggerOnce) {
            const timer = setTimeout(animate, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <span
            className={className}
            onMouseEnter={!triggerOnce ? animate : undefined}
            style={{ cursor: triggerOnce ? 'default' : 'pointer' }}
        >
            {displayText}
        </span>
    );
}
