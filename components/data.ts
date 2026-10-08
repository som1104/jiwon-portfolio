/**
 * Portfolio content. Mirrors the values authored in the Claude Design file
 * (Portfolio.dc.html), with real links wired in and the "curiosity" typo
 * fixed.
 *
 * Site architecture (see app/page.tsx / app/projects/[slug]/page.tsx):
 *   Main page   — a fast, full-page-scroll showcase (Hero → About/Introduction →
 *                  one slide per Selected Work project → Stack → Contact).
 *                  `projects` drives the showcase slides.
 *   Detail page — a normal vertical-scroll case study per project, built
 *                  from `projectDetails[slug]`.
 */

export const navItems = [
  { label: "Work", href: "#project-01" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
];

export const hero = {
  eyebrow: "Frontend Developer · Seoul",
  // first screen — two-line title (serif / spaced sans), both lowercase
  title: "portfolio-",
  subtitle: "visual code",
  // expanded screen — statement (lowercase, two lines) + one Korean line
  statement: ["from visual instinct", "to digital experience."],
  // one string per line
  description: [
    "서양화와 콘텐츠 제작에서 쌓은 시각적 감각을 바탕으로",
    "사용자의 경험을 설계하고 구현합니다.",
  ],
  cta: "View projects",
  ctaHref: "#project-01",
  // shown under the small hero card until it has grown to full size
  scrollHint: "Scroll to expand",
};

/**
 * About — the bridge right after the hero (eyebrow "01 — Introduction"):
 * the stacked visual-perspective statement paired with the fuller
 * background/career story, in one combined section like the original
 * design (not split across two separate sections).
 */
export const about = {
  // one string per line — the heading is sized to fill the height of the
  // column beside it, so the line breaks are fixed here, not by width
  heading: ["I bring a visual", "perspective", "to the interfaces", "people use."],
  quote: ["콘텐츠를 만드는 사람에서 사용자가", "직접 경험하는 화면을 만드는 사람으로"],
  body: "서양화를 전공하고 약 4년간 웹툰 연출과 후보정 업무를 담당하며 색감과 화면 구성에 대한 감각을 쌓았습니다. 이를 바탕으로 사용자가 이해하기 쉬운 화면과 흐름을 설계하고, 프론트엔드로 구현하고 있습니다.",
  meta: [
    { k: "Background", v: "서양화 전공" },
    { k: "Experience", v: "웹툰 연출 / 후보정 4년" },
    { k: "Now", v: "Frontend Development" },
  ],
};

export const techStack = [
  { title: "Frontend", items: ["JavaScript", "TypeScript", "React", "Next.js"] },
  { title: "UI", items: ["HTML", "CSS", "Tailwind CSS", "Responsive UI"] },
  { title: "Data / Backend", items: ["Supabase", "REST API"] },
  { title: "Tools", items: ["Git", "GitHub", "Vercel", "Figma"] },
];

export type ProjectMedia =
  | {
      type: "video" | "image";
      src: string;
      /** first frame shown before the video starts (video only) */
      poster?: string;
      /**
       * CSS aspect-ratio for the media well, e.g. "1986 / 1080" — match the
       * source's native ratio so object-fit: cover never crops it. Defaults
       * to "16 / 9" when omitted (video) or the image frame's own default.
       */
      aspect?: string;
      /** main-page showcase only: scale the video inside its well (anchored at the top) to crop empty margins */
      zoom?: number;
    }
  | {
      type: "slideshow";
      /** image paths, shown in order, looping */
      images: string[];
      /** one caption per image, same order (optional) */
      captions?: string[];
      /** ms per frame */
      interval?: number;
      /** phone-screenshot aspect ratio well instead of the default landscape one */
      orientation?: "portrait" | "landscape";
      /**
       * A second, fully independent slideshow shown next to the first
       * (e.g. TRIPTUNE's desktop screens beside its mobile ones) — its
       * own well, own timer, own caption/counter bar. Not merged into one
       * frame with the primary set.
       */
      secondaryImages?: string[];
    };

/**
 * TRIPTUNE real product screens, auto-advancing — see components/ds/Slideshow.tsx.
 * Mobile screenshots on purpose: the product was designed mobile-first, so
 * the portfolio shows it the way it was meant to be used.
 */
export const triptuneSlideshow = {
  images: Array.from(
    { length: 24 },
    (_, i) => `/images/triptune-mobile/triptune-m-${String(i + 1).padStart(2, "0")}.jpg`,
  ),
  captions: [
    "새 여행 만들기",
    "친구 초대하기",
    "초대 링크로 참여",
    "참여자가 모이는 중",
    "날짜 고르기 전 (전체 미정)",
    "가능한 날짜 칠하기",
    "불가능한 날짜까지 표시",
    "날짜 요약과 초기화",
    "여행 취향 입력",
    "꼭 반영할 점",
    "누가 어디까지 진행했나",
    "전원 응답 완료",
    "그룹 합의 한 줄 요약",
    "날짜 후보",
    "취향 충돌과 개별 요청",
    "객실 여러 개 예약안",
    "숙소 후보 목록",
    "숙소 투표 중",
    "누가 투표를 마쳤나",
    "투표 결과",
    "여행이 확정됐어요",
    "내 여행 확정된 카드",
    "조율 다시 열기",
    "참여자가 보는 재개 안내",
  ],
};

/**
 * TRIPTUNE desktop/web screens — a small, separate highlight reel (not the
 * full 24-shot set used elsewhere) shown as its own standalone slideshow
 * next to the mobile one, not merged into it.
 */
export const triptuneDesktopImages = [1, 6, 12, 18, 24].map(
  (n) => `/images/triptune/triptune-${String(n).padStart(2, "0")}.png`,
);

/** web screens for every step, index-aligned with triptuneSlideshow.images (same step numbers) */
export const triptuneDesktopAll = Array.from(
  { length: 24 },
  (_, i) => `/images/triptune/triptune-${String(i + 1).padStart(2, "0")}.png`,
);

export type ProjectLink = { label: string; href: string; external?: boolean };

/** One slide in the main-page Selected Work showcase. */
export type Project = {
  index: string;
  /** anchor of the project's full-screen slide (#project-01 …) */
  id: string;
  /** route slug — /projects/<slug> */
  slug: string;
  title: string;
  subtitle: string;
  /** one or two short lines — the showcase is a quick scan, not a case study */
  description: string[];
  summaryWidth?: string;
  /** main-page Problem / Solution / Focus rows; falls back to the detail page's "At a Glance" when omitted */
  facts?: { label: string; value: string }[];
  stack: string;
  /** team-project credit chips (e.g. STRING TIME NEWS) */
  roleTags?: string[];
  media?: ProjectMedia;
  thumb?: string;
  /** outbound links only (Live Site / GitHub) — "View project" is separate */
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    index: "01",
    id: "project-01",
    slug: "tonemate",
    title: "TONEMATE",
    subtitle: "Reference-based Image Tone Matching Tool",
    description: [
      "레퍼런스 이미지의 색감과 명암을 기준으로",
      "여러 이미지를 일괄 보정하고 개별 미세 조정할 수 있는 이미지 편집 도구.",
    ],
    facts: [
      { label: "Problem", value: "반복되는 색감·명암 보정" },
      { label: "Solution", value: "Reference → Batch → Fine Tune → Export" },
      { label: "Focus", value: "Preview와 Export 결과 일치" },
    ],
    stack: "Next.js · TypeScript · Canvas · WebGL",
    media: { type: "video", src: "/video/tonemate.mp4", poster: "/images/tonemate-Cover.png" },
    thumb: "/images/tonemate-Cover.png",
    links: [
      { label: "Live Site", href: "https://tone-match-tool.onrender.com", external: true },
      { label: "GitHub", href: "https://github.com/som1104/tone-match-tool", external: true },
    ],
  },
  {
    index: "02",
    id: "project-02",
    slug: "triptune",
    title: "TRIPTUNE",
    subtitle: "Group Travel Decision Planner",
    description: [
      "여러 사용자의 일정과 취향을 모아 그룹 합의와 투표를 통해",
      "하나의 여행 계획을 만드는 모바일 퍼스트 협업 여행 플래너.",
    ],
    /** main-page summary column width, for copy that should hold two lines */
    summaryWidth: "33em",
    stack: "Next.js · TypeScript · Supabase · Realtime",
    media: {
      type: "slideshow",
      images: triptuneSlideshow.images,
      captions: triptuneSlideshow.captions,
      orientation: "portrait",
      secondaryImages: triptuneDesktopAll,
    },
    thumb: triptuneSlideshow.images[0],
    links: [
      { label: "Live Site", href: "https://triptune.vercel.app/", external: true },
      { label: "GitHub", href: "https://github.com/som1104/triptune", external: true },
    ],
  },
  {
    index: "03",
    id: "project-03",
    slug: "string-time-news",
    title: "STRING TIME NEWS",
    subtitle: "AI-curated News Dashboard",
    description: [
      "여러 언론사의 뉴스를 이슈 단위로 묶어",
      "핵심 내용을 빠르게 탐색할 수 있는 뉴스 대시보드.",
    ],
    summaryWidth: "33em",
    stack: "Team Project · React · REST API · FastAPI (연동)",
    media: {
      type: "video",
      src: "/video/string-time-news.mp4",
      poster: "/images/string-time-news-cover.jpg",
      aspect: "1986 / 1080",
    },
    links: [
      { label: "Live Site", href: "https://string-time-news.vercel.app/", external: true },
      { label: "GitHub", href: "https://github.com/som1104/string-time-news", external: true },
    ],
  },
];

/* =========================================================
   Project detail pages — app/projects/[slug]/page.tsx
   ========================================================= */

export type DetailTextSection = { kind: "text"; title: string; body: string };
export type DetailBulletsSection = { kind: "bullets"; title: string; items: string[] };
export type DetailGridSection = {
  kind: "grid";
  title: string;
  items: { title: string; body: string }[];
};
export type DetailStackSection = {
  kind: "stack";
  title: string;
  items: { title: string; body: string }[];
};
export type DetailFlowSection = {
  kind: "flow";
  title: string;
  steps: string[];
  caption?: string;
};
export type DetailStatsSection = {
  kind: "stats";
  title: string;
  items: { value: string; label: string }[];
  caption?: string;
};

/** 2-3 fast-scan key points (label · heading · one line), shown before the long-form text */
export type DetailInsightSection = {
  kind: "insight";
  title: string;
  items: { label: string; heading: string; body: string }[];
};
/** grouped "what I built" list — each group is a small labelled column */
export type DetailContributionSection = {
  kind: "contribution";
  title: string;
  groups: { label: string; items: string[] }[];
};

export type DetailImage = { src: string; alt: string; w: number; h: number };
/** screenshot + explanation rows; `side` = image beside text (tall UI), `stack` = wide image above a 3-column text strip */
export type DetailShowcaseSection = {
  kind: "showcase";
  title: string;
  intro?: string;
  rows: {
    label: string;
    title: string;
    lead?: string;
    layout: "side" | "stack";
    images: DetailImage[];
    /** optional auto-advancing frames shown instead of `images` (caption under each) */
    slides?: { src: string; alt: string; caption: string; w: number; h: number }[];
    slideInterval?: number;
    tight?: boolean;
    /** What I built / Why it matters / Technical point */
    blocks?: { k: string; v: string }[];
    /** "My Contribution" bullets shown next to the screen (team project) */
    contribution?: string[];
  }[];
};
/** representative phone screens — each with the UX problem it solves */
export type DetailScreensSection = {
  kind: "screens";
  title: string;
  steps: string[];
  note?: string;
  items: { stage: string; title: string; note: string; src: string; w: number; h: number }[];
};
/** Problem → Fix pairs beside screenshots */
export type DetailFixesSection = {
  kind: "fixes";
  title: string;
  note?: string;
  images: DetailImage[];
  items: { problem: string; fix: string }[];
};
/** 2–4 short outcome sentences closing each case study */
export type DetailResultSection = { kind: "result"; title: string; items: string[] };

export type DetailSection =
  | DetailShowcaseSection
  | DetailScreensSection
  | DetailFixesSection
  | DetailResultSection
  | DetailInsightSection
  | DetailContributionSection
  | DetailTextSection
  | DetailBulletsSection
  | DetailGridSection
  | DetailStackSection
  | DetailFlowSection
  | DetailStatsSection;

export type ProjectDetail = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  role: string[];
  team?: boolean;
  /** 작업 기간 · 참여 형태 (사용자가 직접 알려준 사실만). 팀 인원·개인 담당 범위는 미확인 → 받으면 추가 */
  period?: string;
  tech: string[];
  links: ProjectLink[];
  media?: ProjectMedia;
  sections: DetailSection[];
};

/** TRIPTUNE — representative screens only (see `triptuneKeyScreens`), picked from the full 24-shot set */
const tt = (n: number) => `/images/triptune-mobile/triptune-m-${String(n).padStart(2, "0")}.jpg`;
const td = (n: number) => `/images/triptune/triptune-${String(n).padStart(2, "0")}.png`;
const TT_W = 750;
const TT_H = 1526;

const triptuneKeyScreens = [
  {
    n: 1,
    stage: "Create",
    title: "새 여행 만들기",
    problem: "주최자가 여행 이름·목적지·기간만 정하면 바로 시작되도록 첫 입력을 가볍게 유지했습니다.",
  },
  {
    n: 3,
    stage: "Invite",
    title: "초대 링크로 참여",
    problem: "회원가입 없이 초대 링크와 닉네임만으로 참여해, 처음 들어온 사람이 이탈하지 않도록 했습니다.",
  },
  {
    n: 6,
    stage: "Respond · Date",
    title: "가능한 날짜 칠하기",
    problem: "'가능 / 미정 / 불가'를 달력에 바로 칠해, 각자에게 날짜를 반복해서 묻던 과정을 대신합니다.",
  },
  {
    n: 9,
    stage: "Respond · Taste",
    title: "여행 취향 입력",
    problem: "말로만 오가던 취향을 항목별 선택으로 받고, '꼭 필요'까지 구분해 충돌 지점이 드러나게 했습니다.",
  },
  {
    n: 13,
    stage: "Consensus",
    title: "그룹 합의 요약",
    problem: "여러 사람의 응답을 한 줄 요약과 날짜 후보로 모아, 채팅방을 오가며 합의하던 과정을 줄였습니다.",
  },
  {
    n: 18,
    stage: "Consensus · Vote",
    title: "숙소 투표",
    problem: "숙소 후보와 투표 현황(몇 명이 마쳤는지)을 한 화면에 모아 링크·결과가 흩어지는 문제를 막았습니다.",
  },
  {
    n: 21,
    stage: "Confirm",
    title: "여행 확정",
    problem: "합의가 끝나면 날짜·인원·취향·숙소가 확정 카드 한 장으로 정리되어 최종 상태가 분명히 보입니다.",
  },
  {
    n: 23,
    stage: "Confirm · Reopen",
    title: "조율 다시 열기",
    problem: "확정 이후에도 데이터를 지우지 않고 필요한 단계만 다시 열 수 있게, 안내 시트로 영향 범위를 먼저 보여줍니다.",
  },
];

export const projectDetails: Record<string, ProjectDetail> = {
  tonemate: {
    slug: "tonemate",
    period: "1개월 · 개인 프로젝트",
    index: "01",
    title: "TONEMATE",
    subtitle: "Reference-based Image Tone Matching Tool",
    description:
      "레퍼런스 이미지의 색감과 명암을 기준으로 여러 이미지를 일괄 보정하고, 필요한 이미지는 개별로 미세 조정할 수 있는 브라우저 기반 이미지 편집 도구.",
    role: ["Planning", "UX/UI", "Frontend Development"],
    tech: ["Next.js", "TypeScript", "Canvas", "WebGL / GLSL Shader"],
    links: [
      { label: "Live Site", href: "https://tone-match-tool.onrender.com", external: true },
      { label: "GitHub", href: "https://github.com/som1104/tone-match-tool", external: true },
    ],
    media: { type: "video", src: "/video/tonemate.mp4", poster: "/images/tonemate-Cover.png" },
    sections: [
      {
        kind: "insight",
        title: "At a Glance",
        items: [
          {
            label: "Problem",
            heading: "반복되는 색감·명암 보정",
            body: "웹툰 후보정 과정에서 이미지마다 반복되는 색감/명암 보정 작업",
          },
          {
            label: "Solution",
            heading: "Reference → Batch → Fine Tune → Export",
            body: "레퍼런스 이미지 → 일괄 톤 매칭 → 이미지별 미세 조정 → 내보내기",
          },
          {
            label: "Focus",
            heading: "Preview와 Export 결과 일치",
            body: "Canvas / WebGL 기반 이미지 처리와 Preview / Export 결과 일치",
          },
        ],
      },
      {
        kind: "text",
        title: "Background / Problem",
        body: "웹툰 후보정 작업에서는 여러 장의 이미지를 하나의 기준 이미지에 맞춰 색감과 명암을 반복해서 보정해야 하는 경우가 많았습니다. 이 반복 작업을 줄이기 위해, 레퍼런스 이미지를 기준으로 전체 이미지를 먼저 일괄 보정한 뒤 필요한 이미지만 개별로 미세 조정할 수 있는 도구를 만들었습니다. 모든 처리는 브라우저 안에서 Canvas와 WebGL로 이루어지며, 이미지를 서버에 업로드하지 않습니다.",
      },
      {
        kind: "flow",
        title: "Core Flow",
        steps: ["Reference", "Batch Matching", "Fine Tune", "Export"],
        caption: "레퍼런스 업로드 → 전체 일괄 보정 → 이미지별 미세 조정 → ZIP 일괄 다운로드",
      },
      {
        kind: "showcase",
        title: "Workflow in Action",
        rows: [
          {
            label: "01 — 레퍼런스 · 일괄 매칭",
            title: "레퍼런스를 정하고, 한 번에 보정",
            layout: "side",
            images: [
              {
                src: "/images/detail/tonemate-batch.jpg",
                alt: "TONEMATE 작업 화면 — 레퍼런스 이미지 기준으로 타깃 이미지에 톤 매칭이 적용된 모습",
                w: 1400,
                h: 804,
              },
            ],
            blocks: [
              { k: "What I built", v: "레퍼런스 이미지를 지정하면 업로드한 이미지 전체에 같은 색감·명암을 일괄 적용하는 화면." },
              { k: "Why it matters", v: "이미지를 한 장씩 보정하던 반복 작업을 기준 한 번으로 줄입니다." },
              { k: "Technical point", v: "LAB 색공간 기준 Reinhard · 히스토그램 · MKL 매칭 중 알고리즘을 선택할 수 있습니다." },
            ],
          },
          {
            label: "02 — 여러 대상 이미지",
            title: "여러 이미지를 하나의 톤으로",
            layout: "side",
            images: [
              {
                src: "/images/detail/tonemate-multi.jpg",
                alt: "TONEMATE — 레퍼런스(인물)와 여러 타깃 이미지가 선택된 작업 화면",
                w: 1400,
                h: 800,
              },
            ],
            slideInterval: 1100,
            slides: [
              { src: "/images/detail/tonemate-multi.jpg", alt: "타깃 1 — 호수 풍경에 레퍼런스 톤이 적용된 결과", caption: "타깃 1 · 호수 풍경", w: 1400, h: 800 },
              { src: "/images/detail/tonemate-multi-2.jpg", alt: "타깃 2 — 인물 사진에 레퍼런스 톤이 적용된 결과", caption: "타깃 2 · 인물 사진", w: 1400, h: 800 },
              { src: "/images/detail/tonemate-multi-3.jpg", alt: "타깃 3 — 꽃 사진에 레퍼런스 톤이 적용된 결과", caption: "타깃 3 · 꽃 사진", w: 1400, h: 800 },
            ],
            blocks: [
              { k: "What I built", v: "오른쪽 목록에서 타깃 이미지를 바꿔 가며, 같은 레퍼런스 기준의 결과를 바로 확인하는 흐름." },
              { k: "Why it matters", v: "웹툰처럼 컷이 많은 작업에서도 이미지 사이의 톤을 맞춰 줍니다." },
              { k: "Technical point", v: "모든 처리가 브라우저 안에서 이뤄져 서버 업로드가 필요 없습니다." },
            ],
          },
          {
            label: "03 — 보정 전후 비교",
            title: "보정 전후를 같은 자리에서 비교",
            layout: "side",
            images: [
              {
                src: "/images/detail/tonemate-compare.jpg",
                alt: "TONEMATE — 화면 중앙의 비교 바로 보정 전/후를 비교하는 화면",
                w: 1400,
                h: 800,
              },
            ],
            blocks: [
              { k: "What I built", v: "화면 가운데의 비교 바를 좌우로 끌어 원본과 보정 결과를 나란히 비교하고, 원본을 크게 볼 수 있는 보기." },
              { k: "Why it matters", v: "결과가 의도한 톤인지 바로 판단하고, 손볼 이미지만 골라냅니다." },
              { k: "Technical point", v: "원본·보정 결과의 R/G/B 히스토그램과 색상 팔레트를 함께 비교합니다." },
            ],
          },
          {
            label: "04 — 미세 조정",
            title: "일괄 적용 뒤, 필요한 이미지만 미세 조정",
            layout: "side",
            images: [
              {
                src: "/images/detail/tonemate-tune-3.jpg",
                alt: "TONEMATE — 톤 조정 탭에서 선택한 이미지의 색상 전사 강도를 100%로 올린 화면",
                w: 1220,
                h: 870,
              },
            ],
            slideInterval: 1800,
            slides: [
              { src: "/images/detail/tonemate-tune.jpg", alt: "색상 전사 강도 13%", caption: "색상 전사 강도 13%", w: 1220, h: 870 },
              { src: "/images/detail/tonemate-tune-2.jpg", alt: "색상 전사 강도 21%", caption: "색상 전사 강도 21% · '기본값으로' 표시", w: 1220, h: 870 },
              { src: "/images/detail/tonemate-tune-3.jpg", alt: "색상 전사 강도 100%", caption: "색상 전사 강도 100% · 이 이미지만 개별 조정됨", w: 1220, h: 870 },
            ],
            blocks: [
              { k: "What I built", v: "선택한 이미지 하나에만 색상 전사 강도·명암 휘도 강도를 따로 적용하는 패널. '이 이미지만 개별 조정됨'이 표시되고, '기본값으로'로 되돌리거나 '이 값을 전체에 적용'으로 확장할 수 있습니다." },
              { k: "Why it matters", v: "일괄 결과가 어울리지 않는 이미지만 따로 다듬을 수 있습니다." },
              { k: "Technical point", v: "슬라이더 조작이 WebGL 셰이더 렌더링에 바로 반영되어, 재계산 없이 실시간으로 반응합니다." },
            ],
          },
          {
            label: "05 — 마무리 효과",
            title: "톤 매칭 뒤, 마무리 효과를 한 번에",
            layout: "side",
            images: [
              {
                src: "/images/detail/tonemate-finish.jpg",
                alt: "TONEMATE — 마무리 효과 탭에서 색수차·글로우·대비·틴트·질감 슬라이더로 후처리를 적용하는 화면",
                w: 1400,
                h: 800,
              },
            ],
            blocks: [
              { k: "What I built", v: "톤 매칭이 끝난 뒤 색수차·소프트 글로우·대비 부스트·컬러 틴트·질감 강도를 슬라이더로 얹는 '마무리 효과' 탭. 설정은 모든 이미지에 공통으로 적용됩니다." },
              { k: "Why it matters", v: "이미지마다 톤을 맞춘 뒤, 마지막 분위기를 한 번에 통일할 수 있습니다." },
              { k: "Technical point", v: "효과는 WebGL 셰이더로 실시간 렌더링되고, 조합은 프리셋으로 저장할 수 있습니다." },
            ],
          },
        ],
      },
      {
        kind: "grid",
        title: "Key Features",
        items: [
          {
            title: "3가지 매칭 알고리즘",
            body: "LAB 색공간 기준 Reinhard 평균/표준편차, 히스토그램, MKL(공분산 기반) 매칭 중 선택",
          },
          {
            title: "이미지별 개별 조정",
            body: "일괄 적용 후 이미지별로 색상·명암 강도를 따로 조절",
          },
          {
            title: "영역별 보정",
            body: "클릭 지점 기준 색상 유사도로 영역을 선택(마술봉 방식)해 배경과 다른 강도로 보정",
          },
          {
            title: "마무리 효과 + 프리셋",
            body: "색수차·글로우·대비·틴트·질감 등 후처리를 WebGL 셰이더로 실시간 적용하고 조합을 프리셋으로 저장",
          },
          {
            title: "되돌리기 & 세션 이어하기",
            body: "작업을 자동 기록해 되돌리고, 브라우저를 닫아도 이어하기 배너로 복귀",
          },
          {
            title: "히스토그램 & 스포이드",
            body: "원본·보정 결과의 R/G/B 분포 비교, 클릭으로 색상 코드 복사",
          },
        ],
      },
      {
        kind: "bullets",
        title: "Frontend / Technical Point",
        items: [
          "Canvas 기반 이미지 처리, WebGL shader 기반 실시간 렌더링으로, 슬라이더를 조작할 때 uniform만 갱신해 재계산 없이 반응",
          "미리보기와 ZIP export에 동일한 WebGL 셰이더 파이프라인을 적용해 결과물이 어긋나지 않도록 함",
          "브라우저 내부에서 전부 처리하여 서버 이미지 업로드가 필요 없고 배포 구조도 단순함",
          "업로드 이미지·설정을 IndexedDB/localStorage에 자동 저장해 새로고침 후에도 작업 이어가기 지원",
          "EXIF 방향 보정을 포함한 이미지 로딩 유틸로 세로로 긴 웹툰형 이미지도 깨지지 않게 처리",
        ],
      },
      {
        kind: "stack",
        title: "Problem Solving",
        items: [
          {
            title: "영역 선택 정확도",
            body: "색상 유사도 기반 플러드필 방식이라 배경과 색이 비슷한 영역은 한 번에 분리되지 않을 수 있어, 허용 범위·가장자리 페더링 조절과 다중 클릭으로 보완",
          },
          {
            title: "미리보기·다운로드 일치",
            body: "미리보기와 다운로드 결과가 달라지지 않도록 동일한 WebGL 셰이더로 원본 해상도 결과물을 렌더링",
          },
          {
            title: "브라우저 처리 성능의 한계",
            body: "모든 처리가 브라우저에서 이뤄지는 구조라 매우 큰 이미지나 다량 처리 시 속도가 기기 사양에 따라 달라질 수 있습니다. 대용량 처리 최적화는 이후 개선 과제로 남겨 두었습니다.",
          },
        ],
      },
      {
        kind: "result",
        title: "Result",
        items: [
          "레퍼런스 이미지 기준으로 톤을 맞추는 보정 흐름을 브라우저 안에서 구현했습니다.",
          "이미지를 한 장씩 보정하던 반복 작업을 일괄 처리로 단순화했습니다.",
          "비교 · 미세 조정 · 다운로드까지 하나의 흐름으로 연결했습니다.",
        ],
      },
    ],
  },
  triptune: {
    slug: "triptune",
    period: "3주 · 개인 프로젝트",
    index: "02",
    title: "TRIPTUNE",
    subtitle: "Group Travel Decision Planner",
    description:
      "여러 사람의 날짜·취향·숙소 의견을 하나의 여행 계획으로 조율하는 모바일 퍼스트 반응형 협업 서비스.",
    role: ["Planning", "UX/UI", "Frontend Development"],
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Supabase",
      "Realtime",
      "Zod",
    ],
    links: [
      { label: "Live Site", href: "https://triptune.vercel.app/", external: true },
      { label: "GitHub", href: "https://github.com/som1104/triptune", external: true },
    ],
    media: {
      type: "slideshow",
      images: triptuneKeyScreens.map((s) => tt(s.n)),
      captions: triptuneKeyScreens.map((s) => s.title),
      orientation: "portrait",
      secondaryImages: triptuneKeyScreens.map((s) => td(s.n)),
    },
    sections: [
      {
        kind: "insight",
        title: "At a Glance",
        items: [
          {
            label: "Problem",
            heading: "흩어지는 날짜 · 취향 · 숙소 의견",
            body: "각자 가능한 날짜를 반복해서 묻고, 취향은 말로만 공유되고, 숙소 링크와 투표 결과가 여러 채팅방에 흩어졌습니다.",
          },
          {
            label: "Solution",
            heading: "응답 → 그룹 합의 → 투표 → 확정",
            body: "이 과정을 하나의 단계형 흐름으로 정리하고, 모바일 화면을 기준으로 설계한 뒤 데스크톱까지 확장했습니다.",
          },
          {
            label: "Focus",
            heading: "그룹 합의 UX",
            body: "여러 참여자의 응답을 하나의 합의 상태로 보여주는 UI와 상태 관리, Realtime 동기화, 모바일 우선 인터랙션.",
          },
        ],
      },
      {
        kind: "screens",
        title: "Group Consensus Flow",
        steps: ["Create", "Invite", "Respond", "Consensus", "Confirm"],
        note: "대표 화면 8개와 각 화면이 해결한 UX 문제.",
        items: triptuneKeyScreens.map((s) => ({
          stage: s.stage,
          title: s.title,
          note: s.problem,
          src: tt(s.n),
          w: TT_W,
          h: TT_H,
        })),
      },
      {
        kind: "grid",
        title: "UX Decisions",
        items: [
          {
            title: "가입 없이 시작",
            body: "초대 링크와 닉네임만으로 바로 참여 가능하며, 처음 보는 사람도 한 번에 들어올 수 있도록 진입 장벽을 없앴습니다.",
          },
          {
            title: "역할 기반 흐름",
            body: "주최자는 합의 확정 · 투표 시작 · 재개를, 참여자는 응답 · 후보 등록 · 투표를 맡도록 화면과 행동을 분리했습니다.",
          },
          {
            title: "초기화 없이 재개",
            body: "확정은 '끝'이 아니라 하나의 상태로 두고, 숙소 투표만 또는 날짜·취향부터 필요한 단계만 다시 엽니다.",
          },
          {
            title: "단계 간 맥락 유지",
            body: "날짜를 다시 조율하는 동안에도 숙소 단계는 잠그되 기존 후보는 지우지 않아, 사용자의 입력이 사라지지 않습니다.",
          },
        ],
      },
      {
        kind: "bullets",
        title: "Frontend Implementation",
        items: [
          "날짜·취향 합의 계산, 숙소 예약안·투표 집계를 UI 컴포넌트에서 분리해 순수 함수로 구성 (UI → 여행 도메인 로직 → Supabase)",
          "Supabase Anonymous Auth + RLS / RPC 권한 관리로, 버튼을 숨기는 것에 그치지 않고 서버에서도 행동 권한을 검증",
          "Supabase Realtime 구독 상태를 감지해 재연결하고, 재연결 후 놓친 데이터를 다시 맞추는 보정 로직 추가",
          "저장 성공 후 전체 refresh가 아닌 client navigation, 요청 단위 메모이제이션, 독립 요청 병렬 처리로 화면 전환 체감 지연 개선",
          "숙소 링크의 OG 메타데이터를 읽어오는 API에 내부 주소 접근을 막는 SSRF 방어 로직 적용",
          "여행이 존재하지 않는 상태와 일시적 서버 오류를 구분해, 서버 오류일 때는 다시 시도할 수 있는 화면 제공",
        ],
      },
      {
        kind: "stack",
        title: "Problem Solving",
        items: [
          {
            title: "초대 링크 접근 권한",
            body: "익명 로그인은 '여행 참여' 시점에 생성되는데, 초대 정보를 가져오는 RPC가 인증된 사용자에게만 허용돼 있어 최초 방문자에게 초대 링크가 열리지 않던 문제는 초대 토큰으로 필요한 정보만 반환하도록 RPC 권한을 조정해 해결",
          },
          {
            title: "실시간 연결 복구",
            body: "구독 상태를 확인하지 않아 채널 오류·timeout 시 화면이 그대로 멈춰 있던 문제를, 구독 상태 감지 후 백오프 재연결 + 누락 데이터 재조회로 보완",
          },
          {
            title: "재조율 흐름",
            body: "최종 확정을 '끝 상태'로만 처리하면 실제 여행 계획 변경에 대응할 수 없어, 기존 데이터를 보존하면서 필요한 단계만 되돌릴 수 있도록 설계하고 서버 함수에서 권한·현재 상태를 함께 검증",
          },
        ],
      },
      {
        kind: "stats",
        title: "Testing",
        items: [
          { value: "105", label: "단위 테스트" },
          { value: "15", label: "E2E 시나리오" },
        ],
        caption:
          "생성 → 초대 → 응답 → 합의 → 투표 → 확정 → 재조율까지 매번 손으로 반복하기엔 비용이 커서, 반복 검증을 쉽게 하는 테스트 기능을 만들었습니다. Vitest로 합의 계산·숙소 투표 로직을, Playwright로 주최자+참여자 2인을 독립 브라우저 세션으로 띄워 전체 흐름을 검증하고, GitHub Actions에서 타입 검사·린트·단위 테스트·빌드를 자동 실행합니다.",
      },
      {
        kind: "result",
        title: "Result",
        items: [
          "로그인 없이 초대 링크만으로 참여할 수 있게 했습니다.",
          "날짜 · 취향 · 숙소 선택을 하나의 합의 흐름으로 연결했습니다.",
          "확정 이후에도 주최자가 여행을 다시 열 수 있는 구조를 구현했습니다.",
          "반복적인 테스트 과정을 줄이기 위한 테스트 기능을 구현했습니다.",
        ],
      },
    ],
  },
  "string-time-news": {
    slug: "string-time-news",
    period: "1개월 · 팀 프로젝트",
    index: "03",
    title: "STRING TIME NEWS",
    subtitle: "AI-curated News Dashboard",
    description: "여러 언론사의 기사를 이슈 단위로 묶고 요약해 주요 뉴스를 빠르게 파악할 수 있는 뉴스 대시보드.",
    role: ["Frontend Development", "UX/UI", "API Integration"],
    team: true,
    tech: ["React", "Vite", "React Router", "Tailwind CSS", "REST API", "FastAPI (연동)"],
    media: {
      type: "video",
      src: "/video/string-time-news.mp4",
      poster: "/images/string-time-news-cover.jpg",
      aspect: "1986 / 1080",
    },
    links: [
      { label: "Live Site", href: "https://string-time-news.vercel.app/", external: true },
      { label: "GitHub", href: "https://github.com/som1104/string-time-news", external: true },
    ],
    sections: [
      {
        kind: "insight",
        title: "At a Glance",
        items: [
          {
            label: "Problem",
            heading: "여러 언론사에 흩어진 뉴스",
            body: "언론사별로 흩어진 기사를 하나씩 확인해야 주요 이슈를 파악할 수 있었습니다.",
          },
          {
            label: "Solution",
            heading: "이슈 단위 묶음 + AI 요약",
            body: "기사를 이슈 단위로 묶고 요약해 데일리 TOP 10 · 트렌드 · 핫이슈로 빠르게 훑어볼 수 있게 했습니다.",
          },
          {
            label: "My Role",
            heading: "Frontend · UX/UI · API 연동",
            body: "팀 프로젝트에서 로그인·홈·상세 화면과 공용 컴포넌트를 구현하고, FastAPI 백엔드와 연동했습니다.",
          },
        ],
      },
      {
        kind: "showcase",
        title: "Key Screens",
        intro: "제가 구현한 화면 옆에 맡은 역할을 함께 표시했습니다.",
        rows: [
          {
            label: "01 — 홈",
            title: "핵심 뉴스 TOP 10",
            lead: "매일 생성되는 핵심 뉴스 10개를 카드 캐러셀로 빠르게 훑어볼 수 있는 첫 화면.",
            layout: "side",
            tight: true,
            images: [
              {
                src: "/images/detail/stn-home.jpg",
                alt: "STRING TIME NEWS 홈 — 어제의 핵심 뉴스 TOP 10 카드 캐러셀",
                w: 1842,
                h: 1185,
              },
            ],
            contribution: [
              "홈 화면 UI: TOP 10 카드 캐러셀 구현",
              "NewsCard 등 공용 컴포넌트 구성",
              "데일리 요약 API 응답을 화면용 데이터로 정규화",
            ],
          },
          {
            label: "02 — 로그인",
            title: "닉네임만으로 시작",
            lead: "비밀번호 없이 닉네임만 입력하면 시작되고, 로그인 없이 먼저 둘러보는 것도 가능합니다.",
            layout: "side",
            tight: true,
            images: [
              {
                src: "/images/detail/stn-login.jpg",
                alt: "STRING TIME NEWS 로그인 — 닉네임 입력 후 서비스 시작하기",
                w: 1842,
                h: 1185,
              },
            ],
            contribution: [
              "로그인 화면 UI 구현",
              "로그인 상태 처리와 비로그인 둘러보기 흐름",
              "로컬 / 서버 즐겨찾기 상태 분리",
            ],
          },
          {
            label: "03 — 상세 · 트렌드와 이슈",
            title: "검색 · 트렌드 · 핫이슈",
            lead: "검색, 트렌드 키워드, 실시간 핫이슈, 카테고리별 뉴스, 날짜 필터를 한 화면에 제공합니다.",
            layout: "side",
            tight: true,
            images: [
              {
                src: "/images/detail/stn-trend.jpg",
                alt: "STRING TIME NEWS 상세 — 실시간 트렌드와 핫이슈 TOP 5",
                w: 1150,
                h: 740,
              },
            ],
            contribution: [
              "상세 화면 UI: 트렌드 키워드 · 핫이슈 영역 구성",
              "카테고리 / 날짜 필터 UI",
              "뉴스 · 검색 REST API 연동",
            ],
          },
          {
            label: "04 — 카테고리 목록",
            title: "카테고리별 뉴스 목록",
            lead: "카테고리 탭으로 뉴스를 좁혀 보는 목록. 카드에서 기사 열기와 즐겨찾기를 각각 누를 수 있습니다.",
            layout: "side",
            tight: true,
            images: [
              {
                src: "/images/detail/stn-category.jpg",
                alt: "STRING TIME NEWS — 카테고리 트렌드 뉴스 목록",
                w: 1150,
                h: 740,
              },
            ],
            contribution: [
              "News list UI 구현",
              "normalizeCategories · CategoryBadges로 카테고리 응답 정규화",
              "카드 클릭과 즐겨찾기 별표의 이벤트 분리",
            ],
          },
          {
            label: "05 — 검색",
            title: "키워드 검색 결과",
            lead: "키워드로 관련 기사를 찾아 요약과 함께 목록으로 보여줍니다.",
            layout: "side",
            tight: true,
            images: [
              {
                src: "/images/detail/stn-search.jpg",
                alt: "STRING TIME NEWS — 키워드 검색 결과 목록",
                w: 1150,
                h: 740,
              },
            ],
            contribution: [
              "검색 결과 화면 UI",
              "검색 REST API 연동과 응답 매핑",
            ],
          },
        ],
      },
      {
        kind: "fixes",
        title: "Mobile Responsive",
        note: "좁은 화면에서 생겼던 문제와 개선 방향입니다.",
        images: [
          {
            src: "/images/detail/stn-mobile-home.jpg",
            alt: "STRING TIME NEWS 모바일 — 홈 카드 캐러셀",
            w: 423,
            h: 920,
          },
          {
            src: "/images/detail/stn-mobile-trend.jpg",
            alt: "STRING TIME NEWS 모바일 — 트렌드와 핫이슈",
            w: 423,
            h: 920,
          },
          {
            src: "/images/detail/stn-mobile-list.jpg",
            alt: "STRING TIME NEWS 모바일 — 카테고리별 뉴스 목록",
            w: 423,
            h: 920,
          },
        ],
        items: [
          {
            problem: "글자가 세로로 배치됨",
            fix: "좁은 화면 기준으로 헤더·필터 영역을 다시 구성해 텍스트가 가로로 읽히도록 정리했습니다.",
          },
          {
            problem: "기사 영역이 지나치게 길어짐",
            fix: "카드와 이미지 비율을 정리해 모바일에서도 한 화면씩 훑어볼 수 있는 길이로 맞췄습니다.",
          },
          {
            problem: "모바일에서 레이아웃이 깨짐",
            fix: "헤더 · 카드 · 필터 · 이미지 비율이 깨지지 않도록 모바일 레이아웃을 재구성했습니다.",
          },
        ],
      },
      {
        kind: "contribution",
        title: "My Contribution",
        groups: [
          {
            label: "Frontend UI",
            items: [
              "로그인 / 홈 / 상세 주요 화면 UI 구현",
              "Header · NewsCard · CategoryBadges 등 공용 컴포넌트 구성",
            ],
          },
          {
            label: "API Integration",
            items: [
              "뉴스·데일리 요약·검색·즐겨찾기 FastAPI REST API 연동",
              "서로 다른 요약·카테고리 응답을 화면용 데이터로 정규화",
            ],
          },
          {
            label: "State / Auth",
            items: ["로그인 상태 처리", "로컬/서버 즐겨찾기 상태 분리 및 동기화"],
          },
          {
            label: "Responsive",
            items: ["헤더·카드·필터·이미지 비율이 깨지지 않도록 모바일 레이아웃 재구성"],
          },
        ],
      },
      {
        kind: "stack",
        title: "Frontend Problem Solving",
        items: [
          {
            title: "바뀌는 API 응답 형태",
            body: "데일리 요약의 summary 필드가 문자열 → 육하원칙 객체 → { summary, keyword } 객체로 계속 바뀌어, 세 형태를 모두 인식하는 방어적 파싱 로직으로 대응",
          },
          {
            title: "카테고리 정규화",
            body: "백엔드가 카테고리를 \"경제|IT/과학\" 문자열 또는 배열로 반환해도 같은 UI를 그릴 수 있도록 normalizeCategories 유틸과 CategoryBadges에서 정규화",
          },
          {
            title: "즐겨찾기 상태 관리",
            body: "비로그인 사용자는 localStorage, 로그인 사용자는 서버 데이터를 쓰도록 분리하고, DB ID 없는 임시 카드는 서버 동기화 대상에서 제외",
          },
          {
            title: "이벤트 충돌 방지",
            body: "뉴스 카드 전체 클릭과 즐겨찾기 별표 클릭이 동시에 실행되지 않도록 이벤트 버블링을 제어하고, 키보드 포커스·aria-label로 접근성 보완",
          },
          {
            title: "배포 CORS·라우팅",
            body: "Vercel(프론트)·Render(FastAPI) 간 운영·Preview 도메인을 CORS 허용 대상으로 구성하고, React Router 경로를 새로고침해도 404가 나지 않도록 vercel.json에 rewrite 설정",
          },
        ],
      },
      {
        kind: "result",
        title: "Result",
        items: [
          "형태가 다른 뉴스 데이터를 안정적인 UI 구조로 보여주도록 구현했습니다.",
          "모바일 환경에서도 읽기 쉬운 기사 레이아웃을 만들었습니다.",
          "API 응답 형태가 바뀌어도 화면이 깨지지 않도록 데이터 처리를 보강했습니다.",
          "팀 프로젝트에서 담당한 UI와 프론트엔드 기능을 구현했습니다.",
        ],
      },
    ],
  },
};

export const marqueeText = "Frontend Developer · Seoul · Available for Work · ";

export const footer = {
  wordmark: "PORTFOLIO",
  tagline: "Frontend Developer",
  email: "ham0409@gmail.com",
  note: "Say hello.",
  columns: [
    {
      title: "Say hello",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/som1104",
          external: true,
        },
        // Resume: 연결할 파일/URL이 없어 일단 제거 (준비되면 { label: "Resume", href } 추가)
        { label: "Projects", href: "#project-01" },
      ],
    },
  ],
};

/** kept for reference; no longer rendered on the main page (see app/page.tsx) */
export const stats = [
  { value: "04", suffix: "+", label: "Years webtoon" },
  { value: "01", label: "Web service" },
  { value: "02", label: "Creative background" },
  { value: "∞", label: "Curiosity" },
];

/** kept for reference; no longer rendered on the main page (see app/page.tsx) */
export const capabilities = [
  {
    index: "A",
    title: "Visual Design",
    body: "색감, 구성, 시각적 균형 등 전공과 콘텐츠 제작 경험을 바탕으로 화면의 시각적 완성도를 고민합니다.",
  },
  {
    index: "B",
    title: "UI / Interaction",
    body: "사용자가 정보를 쉽게 이해하고 자연스럽게 사용할 수 있는 인터페이스를 설계합니다.",
  },
  {
    index: "C",
    title: "Frontend Development",
    body: "React 와 JavaScript 를 기반으로 실제 동작하는 웹 서비스를 구현합니다.",
  },
  {
    index: "D",
    title: "Problem Solving",
    body: "반복적인 작업이나 사용 과정에서 발생하는 문제를 발견하고 기술적으로 해결하는 것을 좋아합니다.",
  },
];

/** kept for reference; no longer rendered on the main page (see app/page.tsx) */
export const notes = [
  { date: "Note 01", title: "How I turned a repetitive workflow into a web tool" },
  { date: "Note 02", title: "Handling images in the browser" },
  { date: "Note 03", title: "From visual editing to UI development" },
];
