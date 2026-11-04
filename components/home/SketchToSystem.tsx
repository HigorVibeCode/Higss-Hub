'use client';

import { useEffect, useRef, useState } from 'react';
import type { Step } from '@/lib/home-copy';
import { SketchDrawing } from '@/components/home/SketchDrawing';

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Scroll progress 0→1 split into the three stages: sketch, structure, system. */
function stages(p: number) {
  return { s1: clamp(p / 0.34), s2: clamp((p - 0.33) / 0.3), s3: clamp((p - 0.63) / 0.32) };
}

function StatLine({ step, progress }: { step: Step; progress: number }) {
  const value = Math.round(step.stat * easeOut(clamp(progress * 1.6)));
  return (
    <div className="mt-5 border-t border-border pt-4 sm:mt-8 sm:pt-6">
      <p className="font-display text-5xl font-extrabold tracking-tight text-accent tabular-nums sm:text-7xl">
        {value}
        <span className="text-3xl sm:text-5xl">{step.statSuffix}</span>
      </p>
      <p className="mt-2 max-w-sm text-xs leading-relaxed text-text/85 sm:mt-3 sm:text-sm">{step.statText}</p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">{step.source}</p>
    </div>
  );
}

function StepText({ step, progress }: { step: Step; progress: number }) {
  return (
    <>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{step.eyebrow}</p>
      <h2 className="mt-2 text-balance font-display text-2xl font-extrabold leading-tight tracking-tight sm:mt-3 sm:text-4xl lg:text-5xl">
        {step.title}
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:mt-4 sm:text-lg">{step.text}</p>
      <StatLine step={step} progress={progress} />
    </>
  );
}

/**
 * The "from sketch to system" story: a sticky stage whose drawing advances with the scroll.
 * With reduced motion it falls back to three static panels, one per stage.
 */
export function SketchToSystem({ steps, kpis }: { steps: Step[]; kpis: [string, string, string] }) {
  const section = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = section.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setProgress(clamp(-rect.top / (rect.height - window.innerHeight)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  if (reduced) {
    const finals = [stages(0.33), stages(0.63), stages(1)];
    return (
      <section className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-24 sm:px-6">
        {steps.map((step, i) => (
          <div key={step.eyebrow} className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <StepText step={step} progress={1} />
            </div>
            <SketchDrawing {...finals[i]} labels={kpis} />
          </div>
        ))}
      </section>
    );
  }

  const { s1, s2, s3 } = stages(progress);
  const active = progress < 0.33 ? 0 : progress < 0.63 ? 1 : 2;
  const local = [s1, s2, s3][active];

  return (
    <section ref={section} className="relative h-[360vh]">
      <div className="sticky top-0 flex h-dvh flex-col overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl flex-1 grid-rows-[auto_1fr] items-center gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-1 lg:gap-12">
          {/* Drawing first on mobile so the transformation is what the eye lands on */}
          <div className="order-1 mx-auto w-full max-w-[min(36rem,42dvh*1.42)] lg:order-2 lg:max-w-none">
            <SketchDrawing s1={s1} s2={s2} s3={s3} labels={kpis} />
          </div>
          <div className="relative order-2 min-h-[18rem] self-stretch lg:order-1 lg:min-h-[30rem] lg:self-center">
            {steps.map((step, i) => (
              <div
                key={step.eyebrow}
                aria-hidden={i !== active}
                className="absolute inset-0 flex flex-col justify-start transition-all duration-500 ease-out lg:justify-center"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: `translateY(${i === active ? 0 : i < active ? -24 : 24}px)`,
                  pointerEvents: i === active ? 'auto' : 'none',
                }}
              >
                <StepText step={step} progress={i === active ? local : i < active ? 1 : 0} />
              </div>
            ))}
          </div>
        </div>
        {/* Stage indicator */}
        <div className="mx-auto mb-4 flex w-full max-w-6xl gap-2 px-4 sm:mb-6 sm:px-6">
          {[s1, s2, s3].map((s, i) => (
            <span key={i} className="h-0.5 flex-1 overflow-hidden rounded-full bg-border">
              <span className="block h-full origin-left bg-accent" style={{ transform: `scaleX(${s})` }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
