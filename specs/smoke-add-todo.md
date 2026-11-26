# TodoMVC 할 일 추가 (Add Todo) 스모크 테스트 플랜

## Application Overview

대상: https://demo.playwright.dev/todomvc/ (React TodoMVC 데모). 범위: 할 일 추가 기능에 한정한 스모크 수준 테스트. 모든 시나리오는 새 브라우저 컨텍스트(빈 localStorage, 빈 목록)에서 시작하며 서로 독립적이다. Seed: tests/seed.spec.ts. 실제 앱 확인 결과: 공백만 입력 후 Enter 시 항목은 생성되지 않으나 입력창에 공백이 그대로 남는다. 입력창은 추가 후에도 포커스를 유지하며, 데이터는 localStorage 키 react-todos 에 저장된다.

## Test Scenarios

### 1. 할 일 추가 스모크

**Seed:** `tests/seed.spec.ts`

#### 1.1. Add a single todo with Enter

**File:** `tests/add-todo/add-single-todo.spec.ts`

**Steps:**
  1. 시작 상태: 새 브라우저 컨텍스트, 빈 목록. seed(tests/seed.spec.ts)대로 /todomvc/ 로 이동한다.
    - expect: 'What needs to be done?' 입력창이 보이고 할 일 목록은 비어 있다.
  2. 입력창에 'buy milk' 를 입력하고 Enter를 누른다.
    - expect: 목록에 'buy milk' 항목이 1개 표시된다.
    - expect: 입력창이 비워진다.
    - expect: 카운터에 '1 item left' (단수형)가 표시된다.
    - expect: 새 항목은 미완료 상태이다.

#### 1.2. Add multiple todos keeps insertion order and updates plural counter

**File:** `tests/add-todo/add-multiple-todos.spec.ts`

**Steps:**
  1. 시작 상태: 빈 목록. 'buy milk' 를 입력하고 Enter를 누른다.
    - expect: '1 item left' 가 표시된다.
  2. 'walk dog' 입력 후 Enter, 이어서 'read' 입력 후 Enter를 누른다.
    - expect: 목록 순서가 위에서부터 'buy milk', 'walk dog', 'read' 이다.
    - expect: 카운터가 '3 items left' (복수형)로 표시된다.
    - expect: 각 추가 후 입력창은 비워진다.

#### 1.3. Empty and whitespace-only input does not create a todo

**File:** `tests/add-todo/add-empty-input.spec.ts`

**Steps:**
  1. 시작 상태: 빈 목록. 입력창을 비워 둔 채 Enter를 누른다.
    - expect: 할 일이 추가되지 않는다.
    - expect: footer와 'Mark all as complete' 토글이 나타나지 않는다.
  2. 입력창에 공백 3개를 입력하고 Enter를 누른다.
    - expect: 할 일이 추가되지 않고 목록은 비어 있다.
    - expect: footer가 나타나지 않는다.
    - expect: 참고: 실제 앱은 공백 입력값을 입력창에 그대로 남겨둔다. 관찰된 동작이며 단언 대상은 항목 미생성이다.

#### 1.4. Leading and trailing whitespace is trimmed

**File:** `tests/add-todo/add-trim-whitespace.spec.ts`

**Steps:**
  1. 시작 상태: 빈 목록. 입력창에 '  buy milk  ' (앞뒤 공백 2칸)을 입력하고 Enter를 누른다.
    - expect: 항목이 1개 생성된다.
    - expect: 항목 텍스트가 앞뒤 공백 없이 정확히 'buy milk' 이다.
    - expect: 카운터는 '1 item left' 이다.

#### 1.5. Footer, filters and toggle-all appear only after first todo

**File:** `tests/add-todo/add-footer-visibility.spec.ts`

**Steps:**
  1. 시작 상태: 빈 목록. 페이지 상태를 확인한다.
    - expect: 'Mark all as complete' 토글, 카운터, 필터 링크가 표시되지 않는다(DOM에도 없음).
  2. 'buy milk' 를 추가한다.
    - expect: 'Mark all as complete' 토글이 표시된다.
    - expect: 카운터 '1 item left' 가 표시된다.
    - expect: 필터 링크 'All', 'Active', 'Completed' 가 표시된다.
    - expect: 'Clear completed' 버튼은 완료 항목이 없으므로 표시되지 않는다.

#### 1.6. Added todos persist after page reload

**File:** `tests/add-todo/add-persist-reload.spec.ts`

**Steps:**
  1. 시작 상태: 빈 목록. 'buy milk', 'walk dog', 'read' 를 순서대로 추가한다.
    - expect: 3개 항목과 '3 items left' 가 표시된다.
  2. 페이지를 새로고침(reload)한다.
    - expect: 동일한 3개 항목이 동일한 순서로 표시된다.
    - expect: 카운터는 '3 items left' 이다.
    - expect: footer와 'Mark all as complete' 토글이 계속 표시된다.
    - expect: 입력창은 비어 있다.
