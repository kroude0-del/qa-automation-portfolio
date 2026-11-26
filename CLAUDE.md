# QA 자동화 프로젝트 규칙

## 목적
기획서 → TC → TS(Playwright) → 실행 → 리포트. 학습·포트폴리오용.

## 대상과 폴더
- URL: https://demo.playwright.dev/todomvc/ (baseURL은 playwright.config.ts)
- 기획서: docs/requirements/ (원본 수정 금지)
- TC: specs/<기능>.md / TS: tests/<기능>/<TC-ID>.spec.ts / 리포트: reports/<YYYY-MM-DD>-<기능>.md

## ID 체계
- 요구사항 REQ-<기능>-<2자리>, TC TC-<기능>-<3자리> (예: REQ-ADD-01, TC-ADD-001)
- 모든 TC에 근거 REQ를 적는다. 근거 없는 TC는 만들지 않는다.
- TS 제목은 "[TC-ID] 제목", tag에 REQ ID.

## TC
- specs/TEMPLATE.md 형식. 정상/예외/경계값 구분.
- 기획서가 모호하면 지어내지 말고 "확인 필요"에 적는다.

## TS
- locator: getByRole > getByLabel > getByPlaceholder > getByText > getByTestId > CSS
- waitForTimeout 금지, web-first assertion 사용. 기대결과마다 assertion 1개 이상.

## healer
- locator와 대기 방식만 수정. expect와 기대값은 바꾸지 않는다.
- 기대결과와 실제가 다르면 "제품 결함 의심"으로 리포트.

## 리포트
- 커버리지 표: REQ → TC → 결과(Pass/Fail/Skip)
- 실패 분류: 제품 결함 의심 / 스크립트 결함 / 기획 모호 + 에러 메시지, trace 경로

## Git
- main에 직접 push하지 않는다. 작업은 브랜치 → PR.
