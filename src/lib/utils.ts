import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes do Tailwind CSS de forma segura
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extrai o ID do vídeo do YouTube a partir de uma URL
 * Suporta múltiplos formatos:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeVideoId(url: string | undefined): string | undefined {
  if (!url) return undefined;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return undefined;
}

type YouTubeEmbedOptions = {
  autoplay?: boolean;
  mute?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  rel?: boolean;
  modestBranding?: boolean;
  ivLoadPolicy?: 1 | 3;
  fs?: boolean;
  disableKeyboard?: boolean;
  enableJsApi?: boolean;
  origin?: string;
  embedHost?: string;
};

const YOUTUBE_DEFAULTS = {
  autoplay: true,
  mute: true,
  loop: true,
  controls: false,
  playsInline: true,
  rel: false,
  modestBranding: true,
  ivLoadPolicy: 3 as 3,
  fs: false,
  disableKeyboard: true,
  enableJsApi: true,
};

const getBoolParam = (value: boolean | undefined, fallback: boolean) =>
  (value ?? fallback) ? "1" : "0";

export function buildYouTubeEmbedUrl(
  url: string,
  options: YouTubeEmbedOptions = {}
): string {
  const id = extractYouTubeVideoId(url);
  if (!id) return url;

  const params = new URLSearchParams({
    autoplay: getBoolParam(options.autoplay, YOUTUBE_DEFAULTS.autoplay),
    mute: getBoolParam(options.mute, YOUTUBE_DEFAULTS.mute),
    loop: getBoolParam(options.loop, YOUTUBE_DEFAULTS.loop),
    controls: getBoolParam(options.controls, YOUTUBE_DEFAULTS.controls),
    playsinline: getBoolParam(options.playsInline, YOUTUBE_DEFAULTS.playsInline),
    rel: getBoolParam(options.rel, YOUTUBE_DEFAULTS.rel),
    modestbranding: getBoolParam(options.modestBranding, YOUTUBE_DEFAULTS.modestBranding),
    iv_load_policy: String(options.ivLoadPolicy ?? YOUTUBE_DEFAULTS.ivLoadPolicy),
    fs: getBoolParam(options.fs, YOUTUBE_DEFAULTS.fs),
    disablekb: getBoolParam(options.disableKeyboard, YOUTUBE_DEFAULTS.disableKeyboard),
    enablejsapi: getBoolParam(options.enableJsApi, YOUTUBE_DEFAULTS.enableJsApi),
  });

  if (params.get("loop") === "1") {
    params.set("playlist", id);
  }

  if (options.origin) {
    params.set("origin", options.origin);
  }

  const host = options.embedHost ?? "https://www.youtube.com/embed";
  return `${host}/${id}?${params.toString()}`;
}

const autoplayBoundRoots = new WeakSet<ParentNode>();
let globalAutoplayBound = false;

const getYouTubeMessageOrigin = (src: string) => {
  try {
    const url = new URL(src);
    return `${url.protocol}//${url.host}`;
  } catch {
    return "https://www.youtube.com";
  }
};

const postYouTubeCommand = (iframe: HTMLIFrameElement, func: "playVideo" | "mute") => {
  if (!iframe.contentWindow) return;
  const origin = getYouTubeMessageOrigin(iframe.src);
  iframe.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func,
      args: [],
    }),
    origin
  );
};

const ensureOriginParam = (iframe: HTMLIFrameElement, origin: string) => {
  if (!iframe.src) return;
  try {
    const url = new URL(iframe.src);
    if (url.searchParams.get("origin") !== origin) {
      url.searchParams.set("origin", origin);
      iframe.src = url.toString();
    }
  } catch {
    // Ignore invalid URLs.
  }
};

export function initYouTubeAutoplay(root?: ParentNode) {
  if (typeof window === "undefined") return;
  const resolvedRoot = root ?? document;
  if (autoplayBoundRoots.has(resolvedRoot)) return;
  autoplayBoundRoots.add(resolvedRoot);

  const selectIframes = () =>
    Array.from(
      resolvedRoot.querySelectorAll<HTMLIFrameElement>(
        'iframe[data-youtube-autoplay="1"]'
      )
    );

  const attemptPlay = (iframe: HTMLIFrameElement) => {
    if (!iframe.src) return;
    ensureOriginParam(iframe, window.location.origin);
    postYouTubeCommand(iframe, "mute");
    postYouTubeCommand(iframe, "playVideo");
  };

  const attemptAll = () => {
    const iframes = selectIframes();
    iframes.forEach((iframe) => attemptPlay(iframe));
  };

  const forceReloadOnce = () => {
    const iframes = selectIframes();
    iframes.forEach((iframe) => {
      if (iframe.dataset.ytReloaded === "1") return;
      iframe.dataset.ytReloaded = "1";
      iframe.src = iframe.src;
    });
  };

  const onUserGesture = () => {
    forceReloadOnce();
    window.setTimeout(attemptAll, 200);
  };

  attemptAll();
  window.setTimeout(attemptAll, 700);

  if (!globalAutoplayBound) {
    globalAutoplayBound = true;
    window.addEventListener("pointerdown", onUserGesture, {
      once: true,
      passive: true,
    });
    window.addEventListener("touchstart", onUserGesture, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", onUserGesture, { once: true });
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        attemptAll();
      }
    });
  }
}

/**
 * Gera URL completa do site
 */
export function getSiteUrl(): string {
  return import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321';
}

/**
 * Formata data para ISO 8601
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

