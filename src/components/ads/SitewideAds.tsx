"use client";

import { useEffect, useRef, useState } from "react";

type DisplayAdProps = {
  width: number;
  height: number;
  keyId: string;
};

type AdOptions = {
  key: string;
  format: "iframe";
  height: number;
  width: number;
  params: Record<string, never>;
};

declare global {
  interface Window {
    atOptions?: AdOptions;
  }
}

const AD_SCRIPT = "https://www.highrevenueformat.com/{key}/invoke.js";
let adScriptQueue: Promise<void> = Promise.resolve();

function DisplayAd({ width, height, keyId }: DisplayAdProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let canceled = false;
    let releaseQueue: (() => void) | undefined;
    let script: HTMLScriptElement | undefined;

    const task = adScriptQueue.then(() => new Promise<void>((resolve) => {
      releaseQueue = resolve;
      if (canceled || !host.isConnected) {
        resolve();
        return;
      }

      window.atOptions = { key: keyId, format: "iframe", height, width, params: {} };
      script = document.createElement("script");
      script.async = false;
      script.src = AD_SCRIPT.replace("{key}", keyId);
      script.onload = () => resolve();
      script.onerror = () => resolve();
      host.append(script);
    }));
    adScriptQueue = task.catch(() => undefined);

    return () => {
      canceled = true;
      script?.remove();
      host.replaceChildren();
      releaseQueue?.();
    };
  }, [height, keyId, width]);

  return (
    <div
      ref={hostRef}
      aria-label={`${width} by ${height} advertisement`}
      className="ad-slot block max-w-full overflow-hidden"
      style={{ width: `min(100%, ${width}px)`, height }}
    />
  );
}

export function LeaderboardAd() {
  const [placement, setPlacement] = useState<DisplayAdProps | null>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 479px)");
    const tablet = window.matchMedia("(min-width: 480px) and (max-width: 767px)");
    const updatePlacement = () => {
      setPlacement(mobile.matches
        ? { width: 320, height: 50, keyId: "3aeeea01aeed92a50bca3c7113c1ce42" }
        : tablet.matches
          ? { width: 468, height: 60, keyId: "a50dd556f6f6c56aa0ef3838b8ef4756" }
          : { width: 728, height: 90, keyId: "2f1c9d25e05f1384a285f2d71b879850" });
    };

    updatePlacement();
    mobile.addEventListener("change", updatePlacement);
    tablet.addEventListener("change", updatePlacement);
    return () => {
      mobile.removeEventListener("change", updatePlacement);
      tablet.removeEventListener("change", updatePlacement);
    };
  }, []);

  return (
    <aside aria-label="Advertisement" className="border-b border-border bg-surface px-3 py-3 sm:px-6">
      <div className="mx-auto flex min-h-[74px] max-w-7xl flex-col items-center justify-center gap-1">
        <span className="text-[10px] font-medium text-muted">Advertisement</span>
        <div className="flex w-full justify-center">
          {placement && <DisplayAd {...placement} />}
        </div>
      </div>
    </aside>
  );
}

export function LowerPageAd() {
  return (
    <aside aria-label="Advertisement" className="border-y border-border bg-surface px-3 py-5 sm:px-6">
      <div className="mx-auto flex min-h-[274px] max-w-7xl flex-col items-center justify-center gap-2">
        <span className="text-[10px] font-medium text-muted">Advertisement</span>
        <DisplayAd width={300} height={250} keyId="c6f79cab2a3f855d2b544508205824d1" />
      </div>
    </aside>
  );
}