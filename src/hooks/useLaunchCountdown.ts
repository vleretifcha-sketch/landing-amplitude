import { useEffect, useState } from "react";

export function useLaunchCountdown(endDate: Date) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, endDate.getTime() - Date.now()),
  );

  useEffect(() => {
    const tick = () =>
      setRemaining(Math.max(0, endDate.getTime() - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [endDate]);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return { days, hours, minutes, seconds, expired: remaining === 0 };
}
