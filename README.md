# 지원 포트폴리오

자기소개 + 프로젝트 목록형 개인 포트폴리오 사이트입니다.

## 시작하기

```bash
npm install
npm run dev
```

`http://localhost:3000` 접속.

## 구성

- `app/page.tsx` — 히어로 / 자기소개 / 프로젝트 목록 / 푸터 순서로 조립
- `components/Hero.tsx` — 프리즘 배경 이미지 + 타이틀
- `components/About.tsx` — 자기소개 (문구는 추후 다듬을 예정)
- `components/Projects.tsx` — 프로젝트 카드 목록 (톤메이트 + 빈 자리 placeholder)
- `components/Footer.tsx` — 연락처

## 배포

`next.config.mjs`에 `output: "export"`가 설정되어 있어 `npm run build` 시 `out/` 폴더로 정적 빌드됩니다. 톤메이트와 동일하게 Render Static Site 등에 그대로 올릴 수 있습니다.
