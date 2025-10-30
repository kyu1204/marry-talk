# 메리톡 (MarryTalk)

AI 기반 한국 웨딩 플래닝 서비스입니다. 예비 신랑신부의 완벽한 결혼 준비를 돕습니다.

## 주요 기능

- 💬 **AI 채팅**: 결혼 준비 관련 질문에 실시간으로 답변
- ✅ **할 일 관리**: 결혼 준비 체크리스트와 일정 관리
- 💰 **예산 계획**: 결혼 비용 예산 수립 및 관리
- 🏢 **업체 추천**: 예식장, 스튜디오, 드레스샵 등 AI 기반 업체 추천

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **TypeScript**: Strict mode
- **Styling**: Tailwind CSS 4.1.9 + shadcn/ui
- **AI**: Vercel AI SDK + OpenAI GPT-5-mini

## 시작하기

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 프로젝트 구조

```
app/
  ├── api/          # API routes
  │   ├── chat/     # AI 채팅 엔드포인트
  │   └── vendors/  # 업체 추천 엔드포인트
  ├── dashboard/    # 대시보드 페이지들
  └── ...
components/
  ├── ui/           # shadcn/ui 컴포넌트
  └── ...           # 커스텀 컴포넌트
```

## License

Private
