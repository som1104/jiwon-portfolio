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
  body: "서양화를 전공하고 약 4년간 웹툰 제작 환경에서 연출과 후보정 업무를 담당했습니다. 콘텐츠의 색감과 분위기, 화면의 구성과 완성도를 고민해 온 경험을 바탕으로 현재 프론트엔드 개발을 공부하고 있습니다. 시각적인 결과물을 만드는 것을 넘어 사용자가 직접 경험하는 인터페이스를 설계하고 구현하는 것을 목표로 합니다.",
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
      "여러 사용자의 일정과 여행 취향을 수집하고 그룹 합의와 투표를 통해",
      "하나의 여행 계획을 만드는 모바일 퍼스트 협업 여행 플래너.",
    ],
    stack: "Next.js · TypeScript · Supabase · Realtime · Responsive Web App",
    media: {
      type: "slideshow",
      images: triptuneSlideshow.images,
      captions: triptuneSlideshow.captions,
      orientation: "portrait",
      secondaryImages: triptuneDesktopImages,
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
      "핵심 내용을 빠르게 탐색할 수 있도록 만든 뉴스 대시보드.",
    ],
    roleTags: ["Team Project", "Frontend Development", "UI/UX", "API Integration"],
    stack: "React · REST API · FastAPI · Responsive UI",
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

export type DetailSection =
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
  tech: string[];
  links: ProjectLink[];
  media?: ProjectMedia;
  sections: DetailSection[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  tonemate: {
    slug: "tonemate",
    index: "01",
    title: "TONEMATE",
    subtitle: "Reference-based Image Tone Matching Tool",
    description:
      "레퍼런스 이미지의 색감과 명암을 기준으로 여러 이미지를 일괄 보정하고, 필요한 이미지는 개별로 미세 조정할 수 있는 브라우저 기반 이미지 편집 도구.",
    role: ["Planning", "UX", "Frontend Development"],
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
            body: "Reference Image → Batch Tone Matching → Fine Tune → Export",
          },
          {
            label: "Technical Challenge",
            heading: "Preview와 Export의 일치",
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
        kind: "grid",
        title: "Key Features",
        items: [
          {
            title: "3가지 매칭 알고리즘(3 Matching Algorithms)",
            body: "LAB 색공간 기준 Reinhard 평균/표준편차, 히스토그램, MKL(공분산 기반) 매칭 중 선택",
          },
          {
            title: "이미지별 개별 조정(Individual Fine Tuning)",
            body: "일괄 적용 후 이미지별로 색상·명암 강도를 따로 조절",
          },
          {
            title: "영역별 보정(Region Adjustment)",
            body: "클릭 지점 기준 색상 유사도로 영역을 선택(마술봉 방식)해 배경과 다른 강도로 보정",
          },
          {
            title: "마무리 효과 + 프리셋(Finishing Effects + Presets)",
            body: "색수차·글로우·대비·틴트·질감 등 후처리를 WebGL 셰이더로 실시간 적용하고 조합을 프리셋으로 저장",
          },
          {
            title: "되돌리기 & 세션 이어하기(Undo/Redo & Session Resume)",
            body: "작업을 자동 기록해 되돌리고, 브라우저를 닫아도 이어하기 배너로 복귀",
          },
          {
            title: "히스토그램 & 스포이드(Histogram & Eyedropper)",
            body: "원본·보정 결과의 R/G/B 분포 비교, 클릭으로 색상 코드 복사",
          },
        ],
      },
      {
        kind: "bullets",
        title: "Frontend / Technical Point",
        items: [
          "Canvas 기반 이미지 처리, WebGL shader 기반 실시간 렌더링 — 슬라이더 조작 시 uniform만 갱신해 재계산 없이 반응",
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
            title: "영역 선택 정확도(Region Selection Accuracy)",
            body: "색상 유사도 기반 플러드필 방식이라 배경과 색이 비슷한 영역은 한 번에 분리되지 않을 수 있어, 허용 범위·가장자리 페더링 조절과 다중 클릭으로 보완",
          },
          {
            title: "미리보기·다운로드 일치(Preview / Export Parity)",
            body: "미리보기와 다운로드 결과가 달라지지 않도록 동일한 WebGL 셰이더로 원본 해상도 결과물을 렌더링",
          },
          {
            title: "브라우저 처리 성능(Browser-side Performance)",
            body: "모든 처리가 브라우저에서 이뤄지는 구조의 트레이드오프를 인지하고, 매우 큰 이미지·다량 처리 시 성능이 기기 사양에 좌우될 수 있음을 감안해 설계",
          },
        ],
      },
    ],
  },
  triptune: {
    slug: "triptune",
    index: "02",
    title: "TRIPTUNE",
    subtitle: "Group Travel Decision Planner",
    description:
      "여러 사람의 날짜·취향·숙소 의견을 하나의 여행 계획으로 조율하는 모바일 퍼스트 반응형 협업 서비스.",
    role: ["Planning", "UX", "Frontend Development"],
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Supabase",
      "Realtime",
      "Zod",
      "Responsive Web App",
    ],
    links: [
      { label: "Live Site", href: "https://triptune.vercel.app/", external: true },
      { label: "GitHub", href: "https://github.com/som1104/triptune", external: true },
    ],
    media: {
      type: "slideshow",
      images: triptuneSlideshow.images,
      captions: triptuneSlideshow.captions,
      orientation: "portrait",
      secondaryImages: triptuneDesktopImages,
    },
    sections: [
      {
        kind: "insight",
        title: "Technical Focus",
        items: [
          {
            label: "01",
            heading: "GROUP CONSENSUS",
            body: "여러 참여자의 날짜 / 취향 / 투표 데이터를 기반으로 그룹의 합의 상태를 구성하는 UI와 상태 관리",
          },
          {
            label: "02",
            heading: "REALTIME DATA",
            body: "Supabase를 활용한 투표 / 상태 변화 / 그룹 데이터 동기화",
          },
          {
            label: "03",
            heading: "MOBILE FIRST UX",
            body: "여행 계획 과정에서 모바일 사용 비중이 높다는 점을 고려한 모바일 우선 responsive interaction",
          },
        ],
      },
      {
        kind: "text",
        title: "Problem",
        body: "단체 여행을 준비할 때는 각자 가능한 날짜를 반복해서 확인하고, 여행 취향을 말로만 공유하고, 숙소 링크와 투표 결과가 여러 채팅방에 흩어지는 문제가 있었습니다. TRIPTUNE은 이 과정을 응답 → 그룹 합의 → 숙소 후보 → 투표 → 최종 확정의 단계형 흐름으로 정리했고, 모바일에서 먼저 쓰일 서비스라고 보고 모바일 화면을 기준으로 설계한 뒤 데스크톱까지 반응형으로 확장했습니다.",
      },
      {
        kind: "flow",
        title: "User Flow",
        steps: ["Create", "Respond", "Consensus", "Vote", "Confirm"],
        caption: "여행 생성 → 날짜·취향 응답 → 그룹 합의 → 숙소 투표 → 최종 확정",
      },
      {
        kind: "grid",
        title: "Key UX Decisions",
        items: [
          {
            title: "가입 없이 시작(No Sign-up)",
            body: "Supabase Anonymous Auth로 초대 링크와 닉네임만 입력하면 바로 참여",
          },
          {
            title: "역할 기반 흐름(Role-based Flow)",
            body: "주최자(합의 확정·투표 시작·재개)와 참여자(응답·후보 등록·투표)의 행동 권한을 UI뿐 아니라 서버 RPC·RLS에서도 분리",
          },
          {
            title: "초기화 없이 재개(Reopen Without Reset)",
            body: "최종 확정 이후에도 데이터를 삭제하지 않고 숙소 투표만 다시 열거나 날짜·취향부터 다시 조율하는 등 필요한 단계만 재개",
          },
          {
            title: "단계 간 맥락 유지(Context Preserved Across Steps)",
            body: "예: 날짜를 다시 조율하는 동안 숙소 단계는 잠기지만 기존 숙소 후보 자체는 삭제하지 않고 유지",
          },
        ],
      },
      {
        kind: "bullets",
        title: "Frontend Implementation",
        items: [
          "날짜·취향 합의 계산, 숙소 예약안·투표 집계 같은 로직을 UI 컴포넌트에서 분리해 순수 함수로 구성 (UI → trip domain logic → Supabase)",
          "Supabase Realtime 구독 상태를 감지해 재연결하고, 재연결 후 놓친 데이터를 다시 맞추는 보정 로직 추가",
          "RLS / RPC 기반 권한 관리 — 버튼을 숨기는 것에 그치지 않고 서버에서도 행동 권한을 검증",
          "저장 성공 후 전체 refresh가 아닌 client navigation, 요청 단위 메모이제이션, 독립 요청 병렬 처리로 화면 전환 체감 지연 개선",
          "숙소 링크의 OG 메타데이터를 읽어오는 API에 내부 주소 접근을 막는 SSRF 방어 로직 적용",
          "여행이 존재하지 않는 상태와 일시적 서버 오류를 구분해, 서버 오류일 때는 다시 시도할 수 있는 화면을 제공",
        ],
      },
      {
        kind: "stack",
        title: "Problem Solving",
        items: [
          {
            title: "초대 링크 접근 권한(Invitation Access)",
            body: "익명 로그인은 '여행 참여' 시점에 생성되는데, 초대 정보를 가져오는 RPC가 인증된 사용자에게만 허용돼 있어 최초 방문자에게 초대 링크가 열리지 않던 문제 — 초대 토큰으로 필요한 정보만 반환하도록 RPC 권한을 조정해 해결",
          },
          {
            title: "실시간 연결 복구(Realtime Recovery)",
            body: "구독 상태를 확인하지 않아 채널 오류·timeout 시 화면이 그대로 멈춰 있던 문제를, 구독 상태 감지 후 백오프 재연결 + 누락 데이터 재조회로 보완",
          },
          {
            title: "재조율 흐름(Reopen Flow)",
            body: "최종 확정을 '끝 상태'로만 처리하면 실제 여행 계획 변경에 대응할 수 없어, 기존 데이터를 보존하면서 필요한 단계만 되돌릴 수 있도록 설계하고 서버 함수에서 권한·현재 상태를 함께 검증",
          },
        ],
      },
      {
        kind: "stats",
        title: "Testing",
        items: [
          { value: "105", label: "Unit Tests" },
          { value: "15", label: "E2E Scenarios" },
        ],
        caption: "Vitest로 합의 계산·숙소 투표 로직을, Playwright로 주최자+참여자 2인을 독립 브라우저 세션으로 띄워 생성→초대→응답→합의→투표→확정→재조율까지 검증. GitHub Actions에서 타입 검사·린트·단위 테스트·빌드를 자동 실행.",
      },
    ],
  },
  "string-time-news": {
    slug: "string-time-news",
    index: "03",
    title: "STRING TIME NEWS",
    subtitle: "AI-curated News Dashboard",
    description: "여러 언론사의 기사를 이슈 단위로 묶고 요약해 주요 뉴스를 빠르게 파악할 수 있는 뉴스 대시보드.",
    role: ["Frontend Development", "UI/UX", "API Integration"],
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
        kind: "text",
        title: "Overview",
        body: "여러 언론사의 기사를 이슈 단위로 묶고 AI로 요약해, 사용자가 주요 뉴스를 빠르게 파악할 수 있도록 만든 팀 프로젝트입니다. 데일리 핵심 뉴스 TOP 10, 실시간 트렌드·핫이슈 탐색, 키워드 검색과 카테고리·날짜 필터, 비로그인/로그인 사용자를 구분한 즐겨찾기를 제공합니다. React로 로그인·홈·상세 화면과 공용 컴포넌트를 구현하고 FastAPI 백엔드와 연동했으며, 협업 과정에서 계속 바뀌는 API 응답과 사용자 상태를 안정적으로 처리하는 데 중점을 두었습니다.",
      },
      {
        kind: "grid",
        title: "Key Screens",
        items: [
          { title: "로그인(Login)", body: "비밀번호 없이 닉네임만으로 시작, 비로그인으로 먼저 둘러보는 것도 가능" },
          { title: "홈(Home)", body: "매일 생성되는 핵심 뉴스 10개를 카드 캐러셀로 빠르게 훑어볼 수 있도록 구성" },
          { title: "상세(Detail)", body: "검색, 트렌드 키워드, 실시간 핫이슈, 카테고리별 뉴스, 날짜 필터를 한 화면에 제공" },
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
            items: [
              "로그인 상태 처리",
              "로컬/서버 즐겨찾기 상태 분리 및 동기화",
            ],
          },
          {
            label: "Responsive",
            items: [
              "헤더·카드·필터·이미지 비율이 깨지지 않도록 모바일 레이아웃 재구성",
            ],
          },
          {
            label: "Problem Solving",
            items: [
              "CORS — Vercel·Render 운영/Preview 도메인 허용",
              "API 응답 구조 차이 — 방어적 파싱·정규화",
              "배포 환경 이슈 — 환경변수 분리, SPA 라우팅 rewrite",
            ],
          },
        ],
      },
      {
        kind: "stack",
        title: "Key Frontend Problems",
        items: [
          {
            title: "바뀌는 API 응답 형태(Changing API Shape)",
            body: "데일리 요약의 summary 필드가 문자열 → 육하원칙 객체 → { summary, keyword } 객체로 계속 바뀌어, 세 형태를 모두 인식하는 방어적 파싱 로직으로 대응",
          },
          {
            title: "즐겨찾기 상태 관리(Bookmark State)",
            body: "비로그인 사용자는 localStorage, 로그인 사용자는 서버 데이터를 쓰도록 분리하고, DB ID 없는 임시 카드는 서버 동기화 대상에서 제외",
          },
          {
            title: "카테고리 정규화(Category Normalization)",
            body: "백엔드가 카테고리를 \"경제|IT/과학\" 문자열 또는 배열로 반환해도 같은 UI를 그릴 수 있도록 normalizeCategories 유틸과 CategoryBadges에서 정규화",
          },
          {
            title: "이벤트 충돌 방지(Event Conflict)",
            body: "뉴스 카드 전체 클릭과 즐겨찾기 별표 클릭이 동시에 실행되지 않도록 이벤트 버블링을 제어하고, 키보드 포커스·aria-label로 접근성 보완",
          },
          {
            title: "배포 CORS·라우팅(Deployment CORS / Routing)",
            body: "Vercel(프론트)·Render(FastAPI) 간 운영·Preview 도메인을 CORS 허용 대상으로 구성하고, React Router 경로를 새로고침해도 404가 나지 않도록 vercel.json에 rewrite 설정",
          },
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
        { label: "Resume", href: "#" },
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
