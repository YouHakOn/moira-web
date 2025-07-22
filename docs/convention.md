# Front

# 📘 Git 브랜치 및 커밋 컨벤션

## ✅ 브랜치 전략

우리 프로젝트에서는 브랜치를 다음과 같은 규칙으로 생성합니다.

### 🔹 기능/일반 이슈 작업

- 브랜치명 형식:  
  `feature/<이슈명>`

- 예시:  
  `feature/login-system`

### 🔹 수정 (fix)

- 브랜치명 형식:  
  `fix/<이슈명>`

- 예시:  
  `fix/security-issue`

---

## ✅ 커밋 메시지 컨벤션

커밋 메시지는 다음과 같은 형식을 따릅니다:


### 커밋 태그 종류

- `feat`: 새로운 **기능 추가**  
- `fix`: **버그 수정**  
- `chore`: 빌드 업무, 패키지 매니저 설정 등 **기타 변경**
- `docs`: **문서** 코드 추가 및 수정
- `test`: **테스트** 코드 추가 및 수정  
- `refactor`: **리팩토링** (기능 변경 없이 구조 개선)
- `style`: **스타일** 코드 추가 및 수정

### 커밋 메시지 예시(only *English*)
- feat: add login feature
- fix: fix critical bug
- chore: update package dependencies  
- docs: update README with commit convention  
- test: add unit test for user registration  
- refactor: remove duplicate code

---

## ✅ Pull Request 규칙

- PR 제목 형식:  
  `[브랜치명] <작업 요약>`

- PR 생성 시 체크리스트:
  - 리뷰어 지정 필수
  - (존재하면) 관련 이슈 번호 연결 (예: `Closes #101`)

- PR 병합 방식:  
  `merge` 방식 사용