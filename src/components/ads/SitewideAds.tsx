type DisplayAdProps = {
  width: number;
  height: number;
  keyId: string;
};

const AD_SCRIPT = "https://www.highrevenueformat.com/{key}/invoke.js";

function adDocument({ width, height, keyId }: DisplayAdProps): string {
  const invokeUrl = AD_SCRIPT.replace("{key}", keyId);
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;width:${width}px;height:${height}px;overflow:hidden;background:transparent}</style></head><body><script>window.atOptions={key:"${keyId}",format:"iframe",height:${height},width:${width},params:{}};</script><script src="${invokeUrl}"></script></body></html>`;
}

function DisplayAd({ width, height, keyId }: DisplayAdProps) {
  return (
    <iframe
      title="Advertisement"
      width={width}
      height={height}
      loading="eager"
      referrerPolicy="strict-origin-when-cross-origin"
      sandbox="allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
      srcDoc={adDocument({ width, height, keyId })}
      className="block max-w-full border-0"
    />
  );
}

export function LeaderboardAd() {
  return (
    <aside aria-label="Advertisement" className="border-b border-border bg-surface px-3 py-3 sm:px-6">
      <div className="mx-auto flex min-h-[74px] max-w-7xl flex-col items-center justify-center gap-1">
        <span className="text-[10px] font-medium text-muted">Advertisement</span>
        <div className="flex w-full justify-center min-[480px]:hidden">
          <DisplayAd width={320} height={50} keyId="3aeeea01aeed92a50bca3c7113c1ce42" />
        </div>
        <div className="hidden w-full justify-center min-[480px]:flex min-[768px]:hidden">
          <DisplayAd width={468} height={60} keyId="a50dd556f6f6c56aa0ef3838b8ef4756" />
        </div>
        <div className="hidden w-full justify-center min-[768px]:flex">
          <DisplayAd width={728} height={90} keyId="2f1c9d25e05f1384a285f2d71b879850" />
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