import { useEffect, useRef } from 'react';

export default function SolderCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia('(pointer: fine)').matches) return;

    const moveCursor = (event) => {
      const target = event.target;
      const isTextField = target instanceof Element
        && target.closest('input, textarea, [contenteditable="true"]');

      cursor.classList.toggle('is-hidden', Boolean(isTextField));
      cursor.style.transform = `translate3d(${event.clientX - 29}px, ${event.clientY - 8}px, 0)`;
      cursor.classList.add('is-visible');
    };
    const hideCursor = () => cursor.classList.remove('is-visible');

    window.addEventListener('pointermove', moveCursor, { passive: true });
    window.addEventListener('pointerleave', hideCursor);
    window.addEventListener('blur', hideCursor);

    return () => {
      window.removeEventListener('pointermove', moveCursor);
      window.removeEventListener('pointerleave', hideCursor);
      window.removeEventListener('blur', hideCursor);
    };
  }, []);

  return (
    <div ref={cursorRef} className="solder-cursor" aria-hidden="true">
      <img src="/cursors/soldering-iron.svg" alt="" draggable="false" />
      <svg className="solder-cursor-smoke" viewBox="0 0 24 24" fill="none">
        <path className="smoke-wisp smoke-wisp-one" pathLength="1" d="M17 20C6 17 20 13 10 9 3 6 16 4 11 0" />
        <path className="smoke-wisp smoke-wisp-two" pathLength="1" d="M20 21C13 17 25 14 17 10 11 7 24 4 18 0" />
      </svg>
    </div>
  );
}
