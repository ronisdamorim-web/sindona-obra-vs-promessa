import { useEffect, useRef, useState } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    triggerOnce?: boolean;
}

export function GlitchText({ text, className = '', triggerOnce = false }: GlitchTextProps) {
    const elementRef = useRef<HTMLSpanElement>(null);
    const intervalRef = useRef<number | null>(null);
    const hasAnimatedRef = useRef(false);

    const lockSize = (el: HTMLElement) => {
        const { width, height } = el.getBoundingClientRect();
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.display = 'inline-block';
        el.style.whiteSpace = 'nowrap';
    };

    const glitch = () => {
        const el = elementRef.current;
        if (!el) return;

        lockSize(el);

        const words = text.split(' ');
        const stop = Math.max(...words.map((w) => w.length));

        if (intervalRef.current) clearInterval(intervalRef.current);

        let min = 5;
        let iterations = 0;

        const interval = window.setInterval(() => {
            el.innerText = words
                .map((word) => {
                    return word
                        .split('')
                        .map((letter, index) => {
                            if (iterations > index + min || index > iterations) {
                                return letter;
                            } else {
                                return String(Math.floor(Math.random() * 10));
                            }
                        })
                        .join('');
                })
                .join(' ');

            iterations++;

            if (iterations >= stop + min) {
                clearInterval(interval);
                el.innerText = text;
            }
        }, 75);

        intervalRef.current = interval;
    };

    useEffect(() => {
        if (triggerOnce && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            const timer = setTimeout(glitch, 600);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <span
            ref={elementRef}
            className={className}
            data-glitch={text}
            onMouseEnter={!triggerOnce ? glitch : undefined}
            style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                cursor: triggerOnce ? 'default' : 'pointer',
            }}
        >
            {text}
        </span>
    );
}
