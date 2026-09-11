/**
 * Portfolio content. Mirrors the values authored in the Claude Design file
 * (Portfolio.dc.html), with real links wired in and the "curiosity" typo
 * fixed.
 */

export const navItems = ["Work", "About", "Stack", "Notes"];

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
  // shown under the small hero card until it has grown to full size
  scrollHint: "Scroll to expand",
};

export const about = {
  // one string per line — the About heading is sized to fill the height of
  // the column beside it, so the line breaks are fixed here, not by width
  heading: ["I bring a visual", "perspective", "to the interfaces", "people use."],
  quote: ["콘텐츠를 만드는 사람에서 사용자가", "직접 경험하는 화면을 만드는 사람으로"],
  body: "서양화를 전공하고 약 4년간 웹툰 제작 환경에서 연출과 후보정 업무를 담당했습니다. 콘텐츠의 색감과 분위기, 화면의 구성과 완성도를 고민해 온 경험을 바탕으로 현재 프론트엔드 개발을 공부하고 있습니다. 시각적인 결과물을 만드는 것을 넘어 사용자가 직접 경험하는 인터페이스를 설계하고 구현하는 것을 목표로 합니다.",
  meta: [
    { k: "Background", v: "서양화 전공" },
    { k: "Experience", v: "웹툰 연출 / 후보정 4년" },
    { k: "Now", v: "Frontend Development" },
  ],
};

export type ProjectMedia = {
  type: "video" | "image";
  src: string;
  /** first frame shown before the video starts (video only) */
  poster?: string;
};

export type ProjectLink = { label: string; href: string; external?: boolean };

export type Project = {
  index: string;
  /** anchor of the project's full-screen section (#project-01 …) */
  id: string;
  title: string;
  /** one-line descriptor under the title in the project section */
  subtitle?: string;
  /** card copy — one short sentence */
  role: string;
  /** 2–3 sentences for the project section; keep it short */
  summary?: string;
  stack: string;
  /** hero visual of the project section — a demo video or a still */
  media?: ProjectMedia;
  /** card thumbnail (optional; falls back to the empty frame) */
  thumb?: string;
  links?: ProjectLink[];
  status: "live" | "soon";
};

export const projects: Project[] = [
  {
    index: "01",
    id: "project-01",
    title: "TONEMATE",
    subtitle: "Reference-based Image Tone Matching Tool",
    role: "여러 장의 이미지 톤을 한 번에 맞추는 웹 도구",
    summary:
      "하나의 레퍼런스 이미지를 기준으로 여러 이미지의 톤을 일괄 보정하고 세부 조정할 수 있는 웹 도구.",
    stack: "React · JavaScript · Canvas",
    // TODO(지원): 데모 영상을 public/videos/tonemate-demo.mp4 에 넣고 아래 주석을 풀 것.
    //             poster 는 첫 프레임 캡처(jpg) — 없으면 생략해도 됨.
    // media: { type: "video", src: "/videos/tonemate-demo.mp4", poster: "/images/tonemate-poster.jpg" },
    links: [
      { label: "Live site", href: "https://tone-match-tool.onrender.com", external: true },
      // TODO(지원): 케이스 스터디 링크가 준비되면 주석 해제
      // { label: "View case study", href: "#" },
    ],
    status: "live",
  },
  {
    index: "02",
    id: "project-02",
    title: "Project 02",
    role: "준비 중",
    stack: "TBD",
    status: "soon",
  },
  {
    index: "03",
    id: "project-03",
    title: "Project 03",
    role: "준비 중",
    stack: "TBD",
    status: "soon",
  },
];

export const stats = [
  { value: "04", suffix: "+", label: "Years webtoon" },
  { value: "01", label: "Web service" },
  { value: "02", label: "Creative background" },
  { value: "∞", label: "Curiosity" },
];

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

export const notes = [
  { date: "Note 01", title: "How I turned a repetitive workflow into a web tool" },
  { date: "Note 02", title: "Handling images in the browser" },
  { date: "Note 03", title: "From visual editing to UI development" },
];

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
        { label: "Projects", href: "#work" },
      ],
    },
  ],
};
