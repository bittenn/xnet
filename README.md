### 실행방법

- 요구 사항: Node.js 18.18+ (권장 20+), pnpm 9+
- 설치: `pnpm install`
- 개발 서버: `pnpm dev` 후 `http://localhost:3000` 접속
- 프로덕션 빌드: `pnpm build`
- 프로덕션 실행: `pnpm start`
- 린트: `pnpm lint`
- 비고: 추가 환경 변수 필요 없음. 이미지 원격 로드는 `picsum.photos` 도메인만 허용됨(`next.config.ts`).

### 사용 기술 스택 및 선택 이유

- Next.js 15(App Router): 서버/클라이언트 컴포넌트 혼합, 라우팅 단순화, 모달 인터셉트 라우트 지원으로 UX 최적화.
- React 19: 최신 Concurrent 특성 호환 및 생태계 최신 유지.
- TypeScript: 타입 안전성과 리팩터링 내구성 확보.
- TanStack Query v5: 캐싱/프리패칭/무한스크롤 등 데이터 비동기 상태 관리 표준화.
- Tailwind CSS v4: 유틸리티 퍼스트 스타일링으로 빠른 UI 구현과 일관성.
- Swiper: 멀티 이미지 뷰어/슬라이더 구현.
- react-dropzone: 드래그 앤 드롭 이미지 업로드 UX.
- ESLint + Prettier: 코드 일관성과 품질 관리.

### 디렉토리 구조(요약)

- app/
  - layout.tsx: 전역 레이아웃 및 Query Provider 설정.
  - page.tsx: 피드 홈. 서버에서 Query 프리패칭 후 수화.
  - create/page.tsx: 게시글 작성 페이지.
  - @modal/(.)create/page.tsx: 인터셉트 라우트 기반 작성 모달.
  - loading.tsx: 홈 스켈레톤 UI.
- components/
  - feed/: 피드 카드, 코멘트, 필터, 스켈레톤 등 UI.
  - create-post/: 게시글 작성 폼 및 관련 UI.
  - common/: 모달, 이미지 뷰어, 텍스트 하이라이트 등 공통 컴포넌트.
  - ui/: Button, Avatar, Dialog, Skeleton 등 Low-level UI 래퍼.
- hooks/
  - use-infinite-posts.ts: 무한 스크롤용 React Query 훅.
  - use-create-post.ts: 게시글 생성 뮤테이션 훅.
- lib/
  - api/: Mock API(getPosts, createPost, toggleLike 등).
  - mock/: 샘플 데이터(포스트/카테고리/사용자).
  - utils.ts: 유틸리티(cn 등), reltime.ts: 상대 시간 포맷터.
- providers/
  - query-provider.tsx: React Query Client Provider.
- types/
  - 도메인 타입 정의(Post/User/Category, API 요청/응답 등).

## 구현한 기능 목록

게시물 리스트(/)

- 무한 스크롤로 게시물 목록 표시
- 게시물 카드에 포함될 정보
  - 작성자 정보(프로필 이미지, 닉네임)
  - 게시물 내용(텍스트, 이미지, 카테고리)
  - 작성시간(상대적 시간: “방금전”, “1시간 전”)
  - 상호작용 관련 내용(좋아요 수, 리트윗수, 댓글 수)
  - 상호작용 버튼(좋아요, 리트윗)

3. 게시물 작성(/create)

- 게시물 작성 모달 또는 별도 페이지
- 텍스트 입력(최대 280자)
- 실시간 글자 수 카운터
- 이미지 첨부 기능 (미리보기 포함, 최대 4장)
- 카테고리 선택(1개만)
- 작성 완료 후 피드에 새 게시물 반영

## 추가 개선 아이디어(선택사항)

UX 개선

- 스켈레톤 로딩 적용
- 풀 투 리프레시 (모바일)
- 이미지 확대보기 모달
- 댓글 표시와 입력 UI
- 텍스트 하이라이팅(해시태그, URL)

기능 개선

- 카테고리 필터링 기능 추가
- 등록시간별 정렬 기능 추가
- 이미지 lazy loading
