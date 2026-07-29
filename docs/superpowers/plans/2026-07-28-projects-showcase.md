# Projects Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Context

This is the second content feature for `ofekda99/my-portfolio`, following the same 12-Step AIDD Feature Lifecycle established by the Social Links feature (PR #2, merged). Steps 1-4 (Scope, Gather Context, Create Plan, Iterate) were completed in conversation: the user provided three real projects with GitHub URLs, and for each one either a README or the actual source code was read to derive an accurate description and tech stack, rather than guessing.

**Feature:** A "Projects" section on the homepage, below the existing Social Links, showing a grid of project cards (name, description, tech stack tags, and GitHub/live-demo links where available).

**Component design (deliberately different from `SocialLinks`):** unlike `SocialLinks` (one component, inlines per-item JSX because a single icon link is trivial), `Projects` is split into two components:

- **`ProjectCard`** — renders exactly one project (title, description, tag list, conditional link row). Takes a single `project` prop.
- **`Projects`** — a thin wrapper: renders the "Projects" section heading + grid, calling `ProjectCard` once per item.

This split was a deliberate decision after comparing it against a single-component "loop internally" design: a project card has four distinct visual regions (title, description, tags, conditional links) — enough real complexity that separating "how to render one card" from "how to lay out the grid" gives direct, unambiguous tests (`render(<ProjectCard project={x} />)` and assert on that one card) instead of indirect ones (rendering a fixture array and reasoning about combined output). `SocialLinks` wasn't refactored to match — a single icon link is simple enough that the same complexity threshold isn't met there, and it's already shipped/tested in production, so there's no benefit to the churn.

**Goal:** Ship reusable `ProjectCard` + `Projects` components and an `app/data/projects.ts` data file, via its own PR.

**Architecture:** `app/components/ProjectCard.tsx` (single item, owns the `Project` type) → consumed by `app/components/Projects.tsx` (wrapper/layout) → consumed by `app/page.tsx`. Real project data lives in `app/data/projects.ts`, matching the `SocialLinks` / `app/data/social-links.ts` split. Tested with Jest + React Testing Library.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Jest + React Testing Library, pnpm. No new dependencies needed.

## Global Constraints

- Package manager: pnpm only
- All changed code must pass `pnpm check` (eslint + `prettier --check` + `tsc --noEmit` + jest) before every commit
- External links (GitHub, live demo) must use `target="_blank"` and `rel="noopener noreferrer"`
- Follow the existing Tailwind dark-mode (`dark:` variants) conventions
- `ProjectCard` and `Projects` must both be reusable presentational components (take props, no hardcoded data) — same pattern as `SocialLinks`
- A project may have **no** `githubUrl` and **no** `liveUrl` (ApprovalFlow's repo is private and unfinished) — `ProjectCard` must render cleanly with neither link shown, not a broken/empty link row
- Branch off up-to-date `main` (already contains the Social Links feature + all CI/tooling from prior PRs) — no infra prerequisite task needed this time
- Real project data to use:

  1. **ApprovalFlow**
     - Description: "AI-assisted microservices SaaS that automates invoice/expense approvals — a deterministic rule engine plus a Groq LLM agent (llama-3.3-70b) decide to auto-approve, escalate, or reject each invoice against a configurable policy; escalated cases go to a human review queue. An API Gateway (YARP) routes and rate-limits all traffic to the backing services, and the entire stack — gateway, services, and Dapr sidecars — runs as a single Docker Compose deployment. The invoice lifecycle itself runs as a durable Dapr Workflow saga with automatic payment compensation on failure."
     - Tech stack: `[".NET 10", "Dapr Workflow", "PostgreSQL", "Redis", "React", "TypeScript", "Vite", "YARP", "Docker Compose", "Groq API"]`
     - No `githubUrl` (repo is private, project unfinished — user will supply the link once ready, at which point it's a one-line data edit, no component changes), no `liveUrl`

  2. **Smart Delivery Management System**
     - Description: "Full-stack logistics platform with a React frontend and .NET 8 backend, built with Clean Architecture — a Repository Pattern (via EF Core) decouples business logic from data access, a Service Layer encapsulates the route optimization algorithm and AI processing, and Dependency Injection manages object lifetimes throughout. Features a smart greedy-algorithm route optimizer, an AI dispatch assistant using RAG (Gemini API) grounded in live SQL delivery data, a live courier map (Leaflet.js), and role-based access for admins/couriers."
     - Tech stack: `["React", "Vite", ".NET 8", "ASP.NET Core", "SQL Server", "EF Core", "Gemini API", "Leaflet.js"]`
     - `githubUrl`: `https://github.com/ofekda99/Smart-Delivery-Management-System`
     - `liveUrl`: `https://smart-delivey-system.netlify.app/`

  3. **Project Cost Manager**
     - Description: "A personal expense-tracking REST API built as 4 independently deployable Node.js/Express microservices (Users, Costs, Logs, About) sharing a MongoDB database. Supports adding costs, computing per-user totals, and generating monthly spending reports grouped by category — with a caching pattern that stores computed reports for past months while always computing current/future months fresh. Built as a 3-person team project."
     - Tech stack: `["Node.js", "Express", "MongoDB", "Mongoose", "Jest", "Supertest"]`
     - `githubUrl`: `https://github.com/ofekda99/server-side-project-cost-manager`
     - No `liveUrl` yet (4 separate backend service URLs exist but weren't provided — can be added later as a fast-follow)

---

## Task 1: Create the feature branch off updated main

**Files:** None (git operations only)

- [x] **Step 1: Sync main and branch**

```bash
cd "C:\Users\97250\Documents\לימודים\AIDD future course\my-portfolio"
git checkout main
git pull origin main
git checkout -b add-projects-showcase
```

Expected: new branch `add-projects-showcase`, created off up-to-date `main`. **Done — branch created.**

---

## Task 2: Build and test `ProjectCard` (single project)

**Files:**

- Create: `app/components/ProjectCard.tsx`
- Test: `app/components/ProjectCard.test.tsx`

**Interfaces:**

- Produces: default export `ProjectCard` (React component, takes `{ project: Project }`) and named export `type Project` from `app/components/ProjectCard.tsx`. Task 3 imports `type Project` as `import type { Project } from "../components/ProjectCard";` from `app/data/projects.ts`. Task 4 imports `ProjectCard` default export into `Projects.tsx`.

- [ ] **Step 1: Write the failing test**

Create `app/components/ProjectCard.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import ProjectCard, { type Project } from "./ProjectCard";

const PROJECT_WITH_LINKS: Project = {
  name: "Full Project",
  description: "Has both links",
  techStack: ["React", "Node.js"],
  githubUrl: "https://github.com/example/full",
  liveUrl: "https://full.example.com",
};

const PROJECT_WITHOUT_LINKS: Project = {
  name: "No Links Project",
  description: "Has no links",
  techStack: ["C#"],
};

describe("ProjectCard", () => {
  it("renders the project name and description", () => {
    render(<ProjectCard project={PROJECT_WITH_LINKS} />);
    expect(
      screen.getByRole("heading", { name: "Full Project" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Has both links")).toBeInTheDocument();
  });

  it("renders each tech stack tag", () => {
    render(<ProjectCard project={PROJECT_WITH_LINKS} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("renders a GitHub link with security attributes when githubUrl is present", () => {
    render(<ProjectCard project={PROJECT_WITH_LINKS} />);
    const link = screen.getByRole("link", { name: "View Code" });
    expect(link).toHaveAttribute("href", "https://github.com/example/full");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a Live Demo link with security attributes when liveUrl is present", () => {
    render(<ProjectCard project={PROJECT_WITH_LINKS} />);
    const link = screen.getByRole("link", { name: "Live Demo" });
    expect(link).toHaveAttribute("href", "https://full.example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders no links when neither githubUrl nor liveUrl is present", () => {
    render(<ProjectCard project={PROJECT_WITHOUT_LINKS} />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test ProjectCard`
Expected: FAIL — `Cannot find module './ProjectCard'` (component doesn't exist yet).

- [ ] **Step 3: Write the component**

Create `app/components/ProjectCard.tsx`:

```tsx
export type Project = {
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const { name, description, techStack, githubUrl, liveUrl } = project;
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 text-left dark:border-zinc-800 dark:bg-black">
      <h3 className="text-xl font-semibold text-black dark:text-zinc-50">
        {name}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      <ul className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            {tech}
          </li>
        ))}
      </ul>
      {(githubUrl || liveUrl) && (
        <div className="flex gap-4 text-sm font-medium">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-950 hover:underline dark:text-zinc-50"
            >
              View Code
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-950 hover:underline dark:text-zinc-50"
            >
              Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test ProjectCard`
Expected: PASS — all 5 tests green.

- [ ] **Step 5: Run full check**

Run: `pnpm check`
Expected: lint, format:check, typecheck, and full test suite all pass.

- [ ] **Step 6: Commit**

```bash
git add app/components/ProjectCard.tsx app/components/ProjectCard.test.tsx
git commit -m "Add ProjectCard component"
```

---

## Task 3: Build and test `Projects` (grid wrapper)

**Files:**

- Create: `app/components/Projects.tsx`
- Test: `app/components/Projects.test.tsx`

**Interfaces:**

- Consumes: `ProjectCard` default export from `./ProjectCard` (Task 2).
- Produces: default export `Projects` (React component, takes `{ projects: Project[] }`) from `app/components/Projects.tsx`. Task 5 imports it as `import Projects from "./components/Projects";` from `app/page.tsx`.

- [ ] **Step 1: Write the failing test**

Create `app/components/Projects.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import Projects from "./Projects";
import type { Project } from "./ProjectCard";

const FIXTURE_PROJECTS: Project[] = [
  { name: "Project A", description: "First", techStack: ["React"] },
  { name: "Project B", description: "Second", techStack: ["Vue"] },
];

describe("Projects", () => {
  it("renders a section heading", () => {
    render(<Projects projects={FIXTURE_PROJECTS} />);
    expect(
      screen.getByRole("heading", { name: "Projects", level: 2 }),
    ).toBeInTheDocument();
  });

  it("renders a card for every project in the list", () => {
    render(<Projects projects={FIXTURE_PROJECTS} />);
    expect(
      screen.getByRole("heading", { name: "Project A" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Project B" }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test Projects`
Expected: FAIL — `Cannot find module './Projects'` (component doesn't exist yet).

- [ ] **Step 3: Write the component**

Create `app/components/Projects.tsx`:

```tsx
import ProjectCard, { type Project } from "./ProjectCard";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="flex w-full flex-col items-center gap-8">
      <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Projects
      </h2>
      <div className="grid w-full gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
```

Note: `key={project.name}` assumes project names are unique across the array — same tradeoff as `SocialLinks` using `href` as key. Holds for the three real projects.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test Projects`
Expected: PASS — both tests green.

- [ ] **Step 5: Run full check**

Run: `pnpm check`
Expected: lint, format:check, typecheck, and full test suite (all tests across `ProjectCard.test.tsx` + `Projects.test.tsx` + existing files) pass.

- [ ] **Step 6: Commit**

```bash
git add app/components/Projects.tsx app/components/Projects.test.tsx
git commit -m "Add Projects grid wrapper"
```

---

## Task 4: Create the real projects data file

**Files:**

- Create: `app/data/projects.ts`

**Interfaces:**

- Consumes: `Project` type from `../components/ProjectCard` (Task 2).
- Produces: `PROJECTS: Project[]` constant, imported by Task 5 as `import { PROJECTS } from "./data/projects";` from `app/page.tsx`.

- [ ] **Step 1: Write the data file**

Create `app/data/projects.ts`:

```ts
import type { Project } from "../components/ProjectCard";

export const PROJECTS: Project[] = [
  {
    name: "ApprovalFlow",
    description:
      "AI-assisted microservices SaaS that automates invoice/expense approvals — a deterministic rule engine plus a Groq LLM agent (llama-3.3-70b) decide to auto-approve, escalate, or reject each invoice against a configurable policy; escalated cases go to a human review queue. An API Gateway (YARP) routes and rate-limits all traffic to the backing services, and the entire stack — gateway, services, and Dapr sidecars — runs as a single Docker Compose deployment. The invoice lifecycle itself runs as a durable Dapr Workflow saga with automatic payment compensation on failure.",
    techStack: [
      ".NET 10",
      "Dapr Workflow",
      "PostgreSQL",
      "Redis",
      "React",
      "TypeScript",
      "Vite",
      "YARP",
      "Docker Compose",
      "Groq API",
    ],
  },
  {
    name: "Smart Delivery Management System",
    description:
      "Full-stack logistics platform with a React frontend and .NET 8 backend, built with Clean Architecture — a Repository Pattern (via EF Core) decouples business logic from data access, a Service Layer encapsulates the route optimization algorithm and AI processing, and Dependency Injection manages object lifetimes throughout. Features a smart greedy-algorithm route optimizer, an AI dispatch assistant using RAG (Gemini API) grounded in live SQL delivery data, a live courier map (Leaflet.js), and role-based access for admins/couriers.",
    techStack: [
      "React",
      "Vite",
      ".NET 8",
      "ASP.NET Core",
      "SQL Server",
      "EF Core",
      "Gemini API",
      "Leaflet.js",
    ],
    githubUrl: "https://github.com/ofekda99/Smart-Delivery-Management-System",
    liveUrl: "https://smart-delivey-system.netlify.app/",
  },
  {
    name: "Project Cost Manager",
    description:
      "A personal expense-tracking REST API built as 4 independently deployable Node.js/Express microservices (Users, Costs, Logs, About) sharing a MongoDB database. Supports adding costs, computing per-user totals, and generating monthly spending reports grouped by category — with a caching pattern that stores computed reports for past months while always computing current/future months fresh. Built as a 3-person team project.",
    techStack: [
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Jest",
      "Supertest",
    ],
    githubUrl: "https://github.com/ofekda99/server-side-project-cost-manager",
  },
];
```

- [ ] **Step 2: Run full check**

Run: `pnpm check`
Expected: lint, format:check, typecheck, and full test suite all pass (this file has no dedicated test — it's plain data validated indirectly via Task 5's page integration test).

- [ ] **Step 3: Commit**

```bash
git add app/data/projects.ts
git commit -m "Add real projects data"
```

---

## Task 5: Integrate `Projects` into the homepage

**Files:**

- Modify: `app/page.tsx` (add the Projects section below SocialLinks)
- Modify: `app/page.test.tsx` (add assertions for the projects section)

**Interfaces:**

- Consumes: `Projects` default export from `./components/Projects` (Task 3), `PROJECTS` from `./data/projects` (Task 4).

- [ ] **Step 1: Update the page test first (will fail against current page.tsx)**

In `app/page.test.tsx`, add a new test after the existing "renders the social links..." test:

```tsx
it("renders the projects showcase", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { name: "ApprovalFlow" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: "Smart Delivery Management System",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Project Cost Manager" }),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test page.test`
Expected: FAIL — current `page.tsx` has no Projects section, so these headings don't exist.

- [ ] **Step 3: Update page.tsx**

Replace the full contents of `app/page.tsx`:

```tsx
import SocialLinks from "./components/SocialLinks";
import Projects from "./components/Projects";
import { SOCIAL_LINKS } from "./data/social-links";
import { PROJECTS } from "./data/projects";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-4xl flex-1 flex-col items-center gap-16 bg-white px-8 py-16 text-center sm:px-16 sm:py-24 dark:bg-black">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Ofek Dahari
          </h1>
          <SocialLinks links={SOCIAL_LINKS} />
        </div>
        <Projects projects={PROJECTS} />
      </main>
    </div>
  );
}
```

Note: this changes the outer layout from vertically-centered (`justify-center`) to top-aligned, and widens `max-w-3xl` → `max-w-4xl` with reduced padding — necessary because the page now has two stacked sections (intro + a projects grid) instead of one short centered block.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test page.test`
Expected: PASS — all 3 tests in `page.test.tsx` green (heading, social links, projects).

- [ ] **Step 5: Run full check**

Run: `pnpm check`
Expected: lint, format:check, typecheck, and full test suite (all tests across all files) pass.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "Add Projects showcase to homepage"
```

---

## Task 6: Manual review, push, and open PR (AIDD steps 8, 11, 12)

**Files:** None (verification + git/GitHub operations)

- [ ] **Step 1: Manual review (AIDD Step 8)**

Start the dev server and visually confirm in the browser:

```bash
pnpm dev
```

Check at `http://localhost:3000`:

- Projects section appears below the name/social links, with a "Projects" heading
- All 3 project cards render: name, description, tech stack tags
- Smart Delivery Management System card shows both "View Code" and "Live Demo" links, both opening in a new tab
- Project Cost Manager card shows only "View Code" (no live demo)
- ApprovalFlow card shows **no** links at all (private/unfinished) — confirm this doesn't look like a broken/empty state, just a card with no link row
- Dark mode still looks correct (card borders, tag backgrounds, text contrast)
- Grid layout reflows sensibly on a narrow (mobile-width) viewport

- [ ] **Step 2: Push the branch**

```bash
git push -u origin add-projects-showcase
```

- [ ] **Step 3: Open the PR**

```bash
gh pr create --title "Add projects showcase to homepage" --body "Adds a Projects section below the social links, showing ApprovalFlow, Smart Delivery Management System, and Project Cost Manager as cards (name, description, tech stack, GitHub/live-demo links where available). ProjectCard renders a single project; Projects is a thin grid wrapper over it — split into two components (unlike SocialLinks) because a project card has enough internal complexity (title, description, tags, conditional links) to warrant direct single-item testing. Real data lives in app/data/projects.ts. Covers AIDD steps 5-8 locally; CodeRabbit review (step 11) and human review (step 12) happen on the PR."
```

Expected: PR opens against `main`. Checks should appear matching prior PRs: `CI / Lint, format, types, tests`, one Vercel deployment check, and a CodeRabbit review (the docstring-coverage warning is expected and intentionally ignored, same as before).

---

## Task 7: Visual polish — tagline and icon buttons

**Why:** Manual review (Task 6, Step 1) found the page functionally correct but visually flat ("very basic"). Five polish options were proposed; the user chose to start with two: a role tagline under the name, and turning the plain-text "View Code"/"Live Demo" links into icon-labeled buttons. The remaining three (status badge on ApprovalFlow, card hover state, trimming ApprovalFlow's longer description) are deferred, not part of this task.

**Files:**

- Modify: `app/page.tsx` (add a tagline under the name heading)
- Modify: `app/components/ProjectCard.tsx` (restyle the link row as icon buttons, using `react-icons/fa6` — already a project dependency, no new package needed)

**No new tests needed:** this is presentation-only — the accessible name of each link stays "View Code" / "Live Demo" (icons get `aria-hidden="true"` so they don't affect accessible name computation), so existing tests in `ProjectCard.test.tsx` and `page.test.tsx` must still pass unchanged. That's the regression check for this task.

- [ ] **Step 1: Add tagline under the name**

In `app/page.tsx`, add a `<p>` tagline directly after the `<h1>`:

```tsx
<h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
  Ofek Dahari
</h1>
<p className="text-base text-zinc-600 dark:text-zinc-400">
  Full-Stack Developer
</p>
```

- [ ] **Step 2: Restyle ProjectCard's link row as icon buttons**

In `app/components/ProjectCard.tsx`, add icon imports and replace the plain-text link row with icon+label buttons:

```tsx
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
```

Replace the existing link row:

```tsx
{
  (githubUrl || liveUrl) && (
    <div className="flex gap-3 text-sm font-medium">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
        >
          <FaGithub aria-hidden="true" size={14} />
          View Code
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
        >
          <FaArrowUpRightFromSquare aria-hidden="true" size={12} />
          Live Demo
        </a>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Run existing tests to confirm no regression**

Run: `pnpm test ProjectCard page.test`
Expected: PASS — all existing tests still green (accessible names unchanged).

- [ ] **Step 4: Run full check**

Run: `pnpm check`
Expected: lint, format:check, typecheck, and full test suite all pass.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/components/ProjectCard.tsx
git commit -m "Add tagline and icon buttons for project links"
```

- [ ] **Step 6: Push the update**

```bash
git push
```

Expected: if the PR from Task 6 is already open, this pushes an additional commit to it; CI/CodeRabbit/Vercel re-run automatically.

---

## Task 8: Scroll-reveal animation on project cards

**Why:** The user asked for an animation — specifically the common portfolio pattern where content fades in and slides up as you scroll down to it, rather than everything being visible immediately on load. Confirmed via clarifying questions: fade-in + slide-up per card, implemented with `framer-motion` (industry-standard React animation library, purpose-built for scroll-triggered reveals via `whileInView`).

**Files:**

- Modify: `app/components/ProjectCard.tsx` (becomes a Client Component; root `<div>` becomes `<motion.div>` with animation props)
- Modify: `package.json` / `pnpm-lock.yaml` (already updated — `framer-motion` installed)

**No new tests needed:** this is presentational-only. `framer-motion` still renders the actual DOM content immediately (it animates opacity/transform, not mounting), so existing `ProjectCard.test.tsx` and `page.test.tsx` assertions (which query by role/text, not by CSS visibility) must still pass unchanged — that's the regression check.

- [ ] **Step 1: Install framer-motion**

```bash
cd "C:\Users\97250\Documents\לימודים\AIDD future course\my-portfolio"
pnpm add framer-motion
```

Expected: `framer-motion` added to `dependencies`. **Done — already installed.**

- [ ] **Step 2: Convert ProjectCard to a Client Component using motion.div**

In `app/components/ProjectCard.tsx`, add `"use client"` as the first line of the file (required — `framer-motion`'s `whileInView` relies on browser APIs, so the component can no longer be a Server Component), and change the root `<div>` to `<motion.div>`:

```tsx
"use client";

import { motion } from "framer-motion";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

// ...Project type unchanged...

export default function ProjectCard({ project }: { project: Project }) {
  const { name, description, techStack, githubUrl, liveUrl } = project;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 text-left dark:border-zinc-800 dark:bg-black"
    >
      {/* ...existing content unchanged... */}
    </motion.div>
  );
}
```

`viewport={{ once: true }}` means each card animates in once and stays visible on scroll-back-up (not a distracting repeat-on-every-scroll effect). `margin: "-50px"` triggers the animation slightly before the card is fully in view, so it feels responsive rather than laggy.

- [ ] **Step 3: Run existing tests to confirm no regression**

Run: `pnpm test ProjectCard page.test`
Expected: PASS — all existing tests still green. If `whileInView` errors in the Jest/jsdom environment due to `IntersectionObserver` not existing there, add a minimal mock to `jest.setup.ts`:

```ts
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof IntersectionObserver;
```

- [ ] **Step 4: Run full check**

Run: `pnpm check`
Expected: lint, format:check, typecheck, and full test suite all pass.

- [ ] **Step 5: Manual verification**

In the browser, scroll down to the Projects section and confirm each card fades in and slides up as it enters the viewport, without a jarring flash or layout shift. Confirm scrolling back up doesn't re-trigger the animation.

- [ ] **Step 6: Commit and push**

```bash
git add app/components/ProjectCard.tsx package.json pnpm-lock.yaml
git commit -m "Add scroll-reveal animation to project cards"
git push
```

---

## Task 9: Extract a reusable `ScrollReveal` wrapper and switch to a zigzag layout

**Why:** After previewing two animation options (grid stagger vs. alternating zigzag), the user chose the zigzag — cards slide in alternating left/right as you scroll to each one, which only reads correctly one card at a time (full width), not in a 2-column grid. The user also wants this scroll-reveal behavior available to every future section (Skills, About, etc.), not hardcoded into `ProjectCard` — so the animation logic is extracted into a standalone, reusable `ScrollReveal` component that any future content can wrap itself in. Confirmed with the user this belongs on the current branch (`add-projects-showcase`), not a separate one, since nothing has been pushed/opened as a PR yet and this is polish on the same not-yet-shipped feature.

**Files:**

- Create: `app/components/ScrollReveal.tsx`
- Test: `app/components/ScrollReveal.test.tsx`
- Modify: `app/components/ProjectCard.tsx` (drop its own `motion.div` logic from Task 8, wrap content in `ScrollReveal` instead, accept an `index` prop to alternate direction)
- Modify: `app/components/Projects.tsx` (grid → single-column stack; pass each card its `index`)

**Interfaces:**

- Produces: default export `ScrollReveal` from `app/components/ScrollReveal.tsx` — takes `{ children: ReactNode; direction?: "up" | "left" | "right"; delay?: number; className?: string }`, defaults `direction="up"`, `delay=0`.
- Consumes (in `ProjectCard`): `ScrollReveal` default export.

- [ ] **Step 1: Write the failing test for ScrollReveal**

Create `app/components/ScrollReveal.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import ScrollReveal from "./ScrollReveal";

describe("ScrollReveal", () => {
  it("renders its children", () => {
    render(
      <ScrollReveal>
        <p>Hello world</p>
      </ScrollReveal>,
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test ScrollReveal`
Expected: FAIL — `Cannot find module './ScrollReveal'` (component doesn't exist yet).

- [ ] **Step 3: Write ScrollReveal**

Create `app/components/ScrollReveal.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right";

const VARIANTS: Record<Direction, { hidden: object; visible: object }> = {
  up: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={VARIANTS[direction]}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test ScrollReveal`
Expected: PASS.

- [ ] **Step 5: Update ProjectCard to use ScrollReveal, accept an index prop**

In `app/components/ProjectCard.tsx`: remove the `"use client"` directive and the `motion` import (the client boundary now lives inside `ScrollReveal`, so `ProjectCard` goes back to being a plain Server Component composing a Client Component — standard Next.js App Router pattern). Add an `index` prop, and wrap the card content in `ScrollReveal` instead of a plain `<div>`:

```tsx
import ScrollReveal from "./ScrollReveal";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

export type Project = {
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const { name, description, techStack, githubUrl, liveUrl } = project;
  return (
    <ScrollReveal
      direction={index % 2 === 0 ? "left" : "right"}
      delay={index * 0.1}
      className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 text-left dark:border-zinc-800 dark:bg-black"
    >
      {/* ...existing h3/p/ul/link-row content unchanged... */}
    </ScrollReveal>
  );
}
```

- [ ] **Step 6: Update Projects to a single-column layout and pass index**

In `app/components/Projects.tsx`, change the grid to a single-column stack and pass each card its index:

```tsx
import ProjectCard, { type Project } from "./ProjectCard";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="flex w-full flex-col items-center gap-8">
      <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Projects
      </h2>
      <div className="flex w-full flex-col gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Run full regression check**

Run: `pnpm test ProjectCard Projects page.test ScrollReveal`
Expected: PASS — all existing tests (content/links/accessible names unchanged) plus the new `ScrollReveal` test.

- [ ] **Step 8: Run full check**

Run: `pnpm check`
Expected: lint, format:check, typecheck, and full test suite all pass.

- [ ] **Step 9: Manual verification**

In the browser: confirm cards now stack full-width, single column; scrolling down reveals `ApprovalFlow` sliding in from the left, `Smart Delivery Management System` from the right, `Project Cost Manager` from the left again (zigzag); dark mode still looks correct.

- [ ] **Step 10: Commit and push**

```bash
git add app/components/ScrollReveal.tsx app/components/ScrollReveal.test.tsx app/components/ProjectCard.tsx app/components/Projects.tsx
git commit -m "Extract reusable ScrollReveal wrapper, switch projects to zigzag layout"
git push
```

---

## Task 10: Add an indigo accent color to links, buttons, and tags

**Why:** The site was pure grayscale (black/white/zinc) — the default, uncustomized `create-next-app` palette. The user chose indigo/blue as the accent, applied narrowly to interactive/informational elements (links, buttons, tech tags) rather than headings or body text, to add personality without looking busy. This intentionally touches `SocialLinks.tsx`, which was built and merged in a prior PR (#2) — including it here is deliberate: an accent color on the Projects section's buttons but not the social icons directly above it on the same page would look visually inconsistent, and it's a one-line class change per component, not a functional change.

**Files:**

- Modify: `app/components/ProjectCard.tsx` (tech tag pills, View Code/Live Demo buttons)
- Modify: `app/components/SocialLinks.tsx` (icon hover color)

**No new tests needed:** presentational only (Tailwind class changes), accessible names/attributes unchanged — existing tests are the regression check.

- [ ] **Step 1: Accent the tech tag pills in ProjectCard**

Change the tag `<li>` className from:

```
"rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
```

to:

```
"rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
```

- [ ] **Step 2: Accent the View Code / Live Demo buttons in ProjectCard**

Change both link `<a>` classNames from:

```
"flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
```

to:

```
"flex items-center gap-1.5 rounded-full border border-indigo-200 px-3 py-1.5 text-indigo-700 transition-colors hover:border-indigo-400 hover:bg-indigo-50 dark:border-indigo-900 dark:text-indigo-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950"
```

- [ ] **Step 3: Accent the social icon hover color in SocialLinks**

Change the icon link className from:

```
"text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
```

to:

```
"text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
```

- [ ] **Step 4: Run regression check**

Run: `pnpm test SocialLinks ProjectCard page.test`
Expected: PASS — all existing tests unchanged (styling only).

- [ ] **Step 5: Run full check**

Run: `pnpm check`
Expected: lint, format:check, typecheck, and full test suite all pass.

- [ ] **Step 6: Manual verification**

In the browser: confirm tech tags now show an indigo tint, the View Code/Live Demo buttons have indigo borders/text with an indigo hover state, and the social icons turn indigo on hover — in both light and dark mode. Confirm the rest of the page (headings, body text, card borders, backgrounds) stays neutral black/white/zinc as intended.

- [ ] **Step 7: Commit**

```bash
git add app/components/ProjectCard.tsx app/components/SocialLinks.tsx
git commit -m "Add indigo accent color to links, buttons, and tags"
```

---

## Task 11: Add a subtle indigo glow behind the hero

**Why:** The user found the page background flat/plain ("very basic"). Previewed three options (indigo glow, dot-grid pattern, dark-mode-default); recommended and chosen: a soft blurred indigo glow behind the hero, since it reinforces the accent color decision from Task 10 rather than introducing an unrelated visual idea, is low-risk/cheap to build, and doesn't require testing dark mode as a forced default (dot-grid and dark-default were both rejected for these reasons).

**Files:**

- Modify: `app/page.tsx` (remove `main`'s own opaque `bg-white dark:bg-black` — it was visually indistinguishable from the outer `bg-zinc-50 dark:bg-black` anyway, which is _why_ the page looked flat; add one unified page background instead, with a blurred glow element behind the hero)

**No new tests needed:** layout/styling only, no content or accessible-name changes — existing `page.test.tsx` assertions are the regression check.

- [ ] **Step 1: Add the glow and unify the page background**

Replace the full contents of `app/page.tsx`:

```tsx
import SocialLinks from "./components/SocialLinks";
import Projects from "./components/Projects";
import { SOCIAL_LINKS } from "./data/social-links";
import { PROJECTS } from "./data/projects";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center overflow-hidden bg-zinc-50 font-sans dark:bg-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-120px] left-1/2 h-[320px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/10"
      />
      <main className="relative flex w-full max-w-4xl flex-1 flex-col items-center gap-16 px-8 py-16 text-center sm:px-16 sm:py-24">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Ofek Dahari
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Full-Stack Developer
          </p>
          <SocialLinks links={SOCIAL_LINKS} />
        </div>
        <Projects projects={PROJECTS} />
      </main>
    </div>
  );
}
```

Notes:

- `overflow-hidden` on the outer wrapper clips the glow (positioned with a negative `top` so it bleeds above the visible hero) so it doesn't cause horizontal/vertical scroll overflow.
- The glow uses `bg-indigo-500/20` (20% opacity in light mode) and a dimmer `dark:bg-indigo-500/10` (10%) since a bright blob reads too strongly against a black background.
- `aria-hidden="true"` and `pointer-events-none` — purely decorative, must not be reachable by screen readers or intercept clicks.

- [ ] **Step 2: Run regression check**

Run: `pnpm test page.test`
Expected: PASS — same 3 tests, unaffected by the layout/background change.

- [ ] **Step 3: Run full check**

Run: `pnpm check`
Expected: lint, format:check, typecheck, and full test suite all pass.

- [ ] **Step 4: Manual verification**

In the browser: confirm a soft indigo glow is visible behind the name/tagline area, fading out toward the Projects section; confirm it looks correct (dimmer, still visible but not overpowering) in dark mode; confirm no horizontal scrollbar appears from the glow's positioning.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "Add indigo glow behind hero, unify page background"
```

---

## Task 12: Add brand icons and per-tech color tints to the tech tags

**Why:** The user found the plain-gray and solid-indigo tag designs unimpressive, then reacted well to a widget preview showing icon + soft-color-tinted pills, once told that colors should match each tech's own brand identity rather than one uniform hue. Confirmed via `node -e` against the installed `react-icons` package which Simple Icons actually exist for our real tech stack, to avoid a broken import: `SiDotnet`, `SiDapr`, `SiPostgresql`, `SiRedis`, `SiReact`, `SiTypescript`, `SiVite`, `SiDocker`, `SiGooglegemini`, `SiLeaflet`, `SiNodedotjs`, `SiExpress`, `SiMongodb`, `SiMongoose`, `SiJest` all exist; `SiGroq`, `SiAspnetcore`, `SiMicrosoftsqlserver`, `SiSupertest` do not (plus YARP and EF Core have no icon anywhere) — those techs fall back to the original plain gray pill, no icon.

**Files:**

- Create: `app/data/tech-icons.ts` (tech name → `{ icon, color }` lookup table)
- Modify: `app/components/ProjectCard.tsx` (tag rendering: icon + color-tinted pill when mapped, original plain pill when not)

**No new tests needed:** existing `ProjectCard.test.tsx` fixtures use `"React"` and `"Node.js"` (both mapped) and `"C#"` (unmapped, deliberately exercises the fallback path already) — text content assertions (`getByText`) are unaffected by whether an icon renders alongside the text, so this is the regression check.

- [ ] **Step 1: Create the tech icon lookup table**

Create `app/data/tech-icons.ts`:

```ts
import type { IconType } from "react-icons";
import {
  SiDotnet,
  SiDapr,
  SiPostgresql,
  SiRedis,
  SiReact,
  SiTypescript,
  SiVite,
  SiDocker,
  SiGooglegemini,
  SiLeaflet,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiJest,
} from "react-icons/si";
import { FaDatabase, FaBolt, FaNetworkWired, FaVial } from "react-icons/fa6";

export type TechIcon = {
  icon: IconType;
  color: string;
};

export const TECH_ICONS: Record<string, TechIcon> = {
  ".NET 10": { icon: SiDotnet, color: "#512BD4" },
  ".NET 8": { icon: SiDotnet, color: "#512BD4" },
  "ASP.NET Core": { icon: SiDotnet, color: "#512BD4" },
  "Dapr Workflow": { icon: SiDapr, color: "#0F9BCC" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Redis: { icon: SiRedis, color: "#DC382D" },
  React: { icon: SiReact, color: "#0891B2" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Vite: { icon: SiVite, color: "#646CFF" },
  "Docker Compose": { icon: SiDocker, color: "#2496ED" },
  "Gemini API": { icon: SiGooglegemini, color: "#4285F4" },
  "Leaflet.js": { icon: SiLeaflet, color: "#199900" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  Express: { icon: SiExpress, color: "#D97706" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  Mongoose: { icon: SiMongoose, color: "#880000" },
  Jest: { icon: SiJest, color: "#C21325" },
  "SQL Server": { icon: FaDatabase, color: "#CC2927" },
  "EF Core": { icon: FaDatabase, color: "#00758F" },
  "Groq API": { icon: FaBolt, color: "#F55036" },
  YARP: { icon: FaNetworkWired, color: "#475569" },
  Supertest: { icon: FaVial, color: "#0D9488" },
};
```

Revised after visual feedback (widget preview alone wasn't enough — user reviewed the live site):

- **Previously-iconless techs given a closest-match fallback icon** instead of staying plain text, verified to exist via `node -e` against the installed package first: `SQL Server` and `EF Core` → generic database icon (`FaDatabase`, different colors to stay visually distinct from each other); `Groq API` → `FaBolt` (matches Groq's actual lightning-bolt brand mark); `YARP` → `FaNetworkWired` (routing/proxy concept); `Supertest` → `FaVial` (testing concept); `ASP.NET Core` → reuses the `.NET` icon/color (it _is_ a .NET technology, this is standard practice in badge systems).
- **React's color** changed from the official `#61DAFB` (very light cyan) to `#0891B2` (a darker, more saturated cyan) — the official color is legible on React's own dark-themed docs but was hard to read as a light tint on a white card background.
- **Express's color** changed from a neutral gray placeholder to `#D97706` (amber) — chosen deliberately distinct from `Node.js` (`#339933`) and `MongoDB` (`#47A248`), both already green and appearing in the same card (Project Cost Manager), to avoid three similar-looking green-ish tags side by side.

- [ ] **Step 2: Update ProjectCard to render icon + tinted pills**

In `app/components/ProjectCard.tsx`, add the import and replace the tag list rendering:

```tsx
import { TECH_ICONS } from "../data/tech-icons";
```

```tsx
<ul className="flex flex-wrap gap-2">
  {techStack.map((tech) => {
    const techIcon = TECH_ICONS[tech];
    const Icon = techIcon?.icon;
    return (
      <li
        key={tech}
        className={
          techIcon
            ? "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            : "rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        }
        style={
          techIcon
            ? { backgroundColor: `${techIcon.color}1a`, color: techIcon.color }
            : undefined
        }
      >
        {Icon && <Icon aria-hidden="true" size={14} />}
        {tech}
      </li>
    );
  })}
</ul>
```

`${techIcon.color}1a` appends an 8-digit hex alpha suffix (`1a` ≈ 10% opacity) to get a soft tinted background from each tech's full-strength brand color, without needing a second hardcoded light-variant hex per tech.

- [ ] **Step 3: Run regression check**

Run: `pnpm test ProjectCard`
Expected: PASS — all 5 existing tests still green (text content assertions unaffected by icons).

- [ ] **Step 4: Run full check**

Run: `pnpm check`
Expected: lint, format:check, typecheck, and full test suite all pass.

- [ ] **Step 5: Manual verification**

In the browser: confirm each mapped tech tag shows its brand icon + a soft color-tinted pill matching that tech's identity (purple .NET, blue PostgreSQL, red Redis, cyan React, blue TypeScript, blue Docker, etc.); confirm unmapped techs (YARP, EF Core, ASP.NET Core, SQL Server, Groq API, Supertest) still show as plain gray pills, no broken icon/blank space; confirm dark mode still reads correctly, especially the `Express` gray override.

- [ ] **Step 6: Commit**

```bash
git add app/data/tech-icons.ts app/components/ProjectCard.tsx
git commit -m "Add brand icons and per-tech color tints to tech tags"
```

---

## Verification Summary

End-to-end, this plan is verified by:

1. `pnpm test ProjectCard` — 5 unit tests on the single-item component (name/description, tech tags, GitHub link, live demo link, no-links case)
2. `pnpm test Projects` — 2 tests on the grid wrapper (section heading, one card per project)
3. `pnpm test page.test` — 3 tests on the integrated homepage (heading, social links, projects)
4. `pnpm check` — full lint + format + typecheck + test gate, run after every task
5. Manual browser check of the running dev server — visual + interaction confirmation across all 3 real project cards, including the no-links (ApprovalFlow) edge case and dark mode
6. CodeRabbit's automated PR review + human PR review once opened

## Next Steps After This Plan

This is feature 2 of the 2-3 the lecturer asked for. Once this PR is merged, the remaining candidate feature (if a third is wanted) is an About/Contact section — lower priority than Projects since it's less central to demonstrating actual work.
