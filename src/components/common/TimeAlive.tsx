'use client';

import { useEffect, useState } from 'react';

const YEAR_IN_MS = 1000 * 60 * 60 * 24 * 365.25;

export default function TimeAlive({
  startTimestamp,
}: {
  startTimestamp: number;
}) {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    let frameId: number;

    const tick = () => {
      const now = Date.now();
      const realAge = (now - startTimestamp) / YEAR_IN_MS;
      setAge(realAge);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [startTimestamp]);

  if (age === null) return null;

  return (
    <span className="text-base whitespace-pre-wrap text-neutral-500 tabular-nums md:text-lg">
      been here for {age.toFixed(9)} years
    </span>
  );
}
