import {
  RoadmapPhase,
  StudyTask,
  CodingProblem,
  Project,
  Resource,
  Note,
  Goal,
  Internship,
  Hackathon,
  Achievement,
  UserProfile,
  DailyActivityLog
} from '../types';

export const initialPhases: RoadmapPhase[] = [
  {
    id: 'phase-0',
    phaseNumber: 0,
    title: 'Foundations & CS Fundamentals',
    subtitle: 'Command line, Git, Internet Architecture & Computing Basics',
    description: 'Master the non-negotiable tools and networking principles every developer uses daily before touching a framework.',
    category: 'Foundations',
    iconName: 'Terminal',
    estimatedWeeks: 3,
    modules: [
      {
        id: 'mod-0-1',
        title: 'Terminal, Shell & Linux Basics',
        description: 'Command line navigation, file permissions, shell scripting, and environment variables.',
        topics: [
          {
            id: 'top-0-1-1',
            title: 'Bash / Zsh Navigation & File System',
            category: 'General',
            status: 'completed',
            estimatedHours: 4,
            importance: 'Essential',
            summary: 'Navigating directories (cd, ls -la), piping (|, grep), I/O redirection (>, >>), and permissions (chmod, chown).',
            keyConcepts: ['Absolute vs Relative paths', 'Standard In / Out / Error streams', 'Piping and chaining commands', 'File permissions (rwx)'],
            practicalExercise: 'Write a bash script that creates a project directory structure and initializes a README and .gitignore.',
            codeSnippet: {
              language: 'bash',
              code: '# Create project directory and navigate\nmkdir -p dev-project/{src,tests,docs}\ncd dev-project\necho "# Dev Project" > README.md\nchmod +x run.sh',
              explanation: 'mkdir with -p creates parent directories recursively.'
            },
            documentationUrl: 'https://www.gnu.org/software/bash/manual/'
          },
          {
            id: 'top-0-1-2',
            title: 'Git Version Control & GitHub Workflow',
            category: 'General',
            status: 'completed',
            estimatedHours: 6,
            importance: 'Essential',
            summary: 'Distributed version control: commits, branching strategies (Git Flow/Trunk-based), rebasing vs merging, resolving conflicts, and Pull Requests.',
            keyConcepts: ['Staging area vs Working tree', 'Merge conflicts & 3-way merges', 'Git rebase -i (squashing commits)', 'SSH keys and GPG signing'],
            practicalExercise: 'Create a GitHub repo, create a feature branch, submit a PR with clean commit messages, rebase onto main, and merge.',
            codeSnippet: {
              language: 'bash',
              code: 'git checkout -b feature/auth-jwt\ngit add .\ngit commit -m "feat(auth): implement JWT token verification"\ngit fetch origin main\ngit rebase origin/main\ngit push origin feature/auth-jwt',
              explanation: 'Clean rebase workflow keeps linear Git history.'
            },
            documentationUrl: 'https://git-scm.com/doc'
          }
        ]
      },
      {
        id: 'mod-0-2',
        title: 'Networking & How the Web Works',
        description: 'HTTP protocol, DNS lookup, TCP/IP handshakes, TLS/SSL encryption, and browser engines.',
        topics: [
          {
            id: 'top-0-2-1',
            title: 'HTTP/HTTPS, Status Codes & Request Lifecycle',
            category: 'General',
            status: 'completed',
            estimatedHours: 5,
            importance: 'Essential',
            summary: 'Understanding HTTP methods (GET, POST, PUT, PATCH, DELETE, OPTIONS), headers, status codes (2xx, 3xx, 4xx, 5xx), and TLS 1.3 handshake.',
            keyConcepts: ['Idempotency of HTTP verbs', 'Statelessness & Cookies/Sessions', 'TLS/SSL certificate exchange', 'Content negotiation & MIME types'],
            practicalExercise: 'Use cURL to inspect raw HTTP headers, cookies, and TLS certificate chains from a real domain.',
            codeSnippet: {
              language: 'bash',
              code: 'curl -I -v https://api.github.com\n# Inspect HTTP/2 status, headers (Content-Type, Cache-Control), and TLS negotiation',
              explanation: 'cURL -v outputs full TLS handshake and header exchange.'
            },
            documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP'
          },
          {
            id: 'top-0-2-2',
            title: 'DNS, IP Routing & Browser Rendering Engine',
            category: 'General',
            status: 'in_progress',
            estimatedHours: 5,
            importance: 'High',
            summary: 'What happens when you type google.com in the URL bar: DNS recursive lookup, TCP 3-way handshake, DOM tree construction, CSSOM, Render tree, Reflow, and Repaint.',
            keyConcepts: ['A, CNAME, MX DNS records', 'Critical Rendering Path', 'DOM and CSSOM parsing', 'Reflow (Layout) vs Repaint cost'],
            practicalExercise: 'Open Chrome DevTools Performance panel, record page load, and identify FCP, LCP, and Layout shifts.',
            documentationUrl: 'https://web.dev/critical-rendering-path/'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-1',
    phaseNumber: 1,
    title: 'Core Web Technologies',
    subtitle: 'Semantic HTML5, Modern CSS Layouts & Vanilla JavaScript Deep Dive',
    description: 'Write robust, accessible markup and understand modern CSS architecture and the JavaScript V8 engine mechanics.',
    category: 'Frontend',
    iconName: 'Code',
    estimatedWeeks: 4,
    modules: [
      {
        id: 'mod-1-1',
        title: 'Semantic HTML5 & Modern CSS',
        description: 'Accessibility (a11y), responsive design, Flexbox, Grid, and CSS variables.',
        topics: [
          {
            id: 'top-1-1-1',
            title: 'Semantic HTML & Web Accessibility (WCAG AA)',
            category: 'Frontend',
            status: 'completed',
            estimatedHours: 4,
            importance: 'Essential',
            summary: 'Using semantic elements (main, nav, article, section, aside), ARIA attributes, keyboard navigation, and screen reader compatibility.',
            keyConcepts: ['Landmark roles', 'Focus trap & keyboard tabindex', 'Form labelling & accessibility attributes', 'Color contrast ratios'],
            practicalExercise: 'Audit a landing page using Chrome Lighthouse and achieve a 100/100 Accessibility score.',
            codeSnippet: {
              language: 'html',
              code: '<header>\n  <nav aria-label="Main Navigation">\n    <a href="#content" class="skip-link">Skip to main content</a>\n  </nav>\n</header>\n<main id="content">\n  <article aria-labelledby="post-title">\n    <h1 id="post-title">Accessibility Best Practices</h1>\n  </article>\n</main>',
              explanation: 'Semantic elements provide inherent keyboard navigation tree for screen readers.'
            }
          },
          {
            id: 'top-1-1-2',
            title: 'Modern CSS Layouts: Flexbox & CSS Grid',
            category: 'Frontend',
            status: 'completed',
            estimatedHours: 6,
            importance: 'Essential',
            summary: 'Building complex 2D responsive interfaces without frameworks using flex-direction, align-items, grid-template-columns, minmax, and clamp().',
            keyConcepts: ['Flexbox 1D axis control', 'Grid 2D explicit/implicit tracks', 'Fluid typography with clamp()', 'Subgrid & auto-fit / auto-fill'],
            practicalExercise: 'Build a responsive Holy Grail layout with sticky header, sidebar, fluid content, and responsive cards with 0 media queries using clamp and minmax.',
            codeSnippet: {
              language: 'css',
              code: '.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));\n  gap: 1.5rem;\n}\n.fluid-title {\n  font-size: clamp(1.5rem, 2.5vw + 1rem, 3rem);\n}',
              explanation: 'auto-fit with minmax and clamp provides zero-breakpoint responsive grids.'
            }
          }
        ]
      },
      {
        id: 'mod-1-2',
        title: 'JavaScript ES6+ Deep Dive & Asynchronous Engine',
        description: 'Closures, Prototypes, Event Loop, Microtasks, Promises, and Fetch API.',
        topics: [
          {
            id: 'top-1-2-1',
            title: 'Event Loop, Microtasks & Asynchronous JavaScript',
            category: 'Frontend',
            status: 'completed',
            estimatedHours: 8,
            importance: 'Essential',
            summary: 'Understanding Call Stack, Web APIs, Task Queue (Macrotasks), and Microtask Queue (Promises, queueMicrotask).',
            keyConcepts: ['Call Stack single-threading', 'Microtask priority over macrotask', 'Promise.all vs Promise.allSettled', 'async/await syntax sugar'],
            practicalExercise: 'Write a custom Promise polyfill or build an async rate-limited request queue in vanilla JS.',
            codeSnippet: {
              language: 'javascript',
              code: 'async function fetchWithRetry(url, retries = 3, delay = 1000) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      const res = await fetch(url);\n      if (!res.ok) throw new Error(`HTTP ${res.status}`);\n      return await res.json();\n    } catch (err) {\n      if (i === retries - 1) throw err;\n      await new Promise(r => setTimeout(r, delay * 2 ** i)); // Exponential backoff\n    }\n  }\n}',
              explanation: 'Exponential backoff pattern with async/await and Promise delay.'
            }
          },
          {
            id: 'top-1-2-2',
            title: 'Scope, Closures, Prototypes & Memory Management',
            category: 'Frontend',
            status: 'in_progress',
            estimatedHours: 6,
            importance: 'High',
            summary: 'Lexical scoping, closure memory retention, prototypal inheritance chain, Garbage Collection (Mark-and-Sweep), and memory leaks.',
            keyConcepts: ['Closure encapsulation', 'Prototypal chain (__proto__ vs prototype)', 'WeakMap and WeakSet garbage collection', 'Event listener memory cleanup'],
            practicalExercise: 'Build a debounced and throttled search input function using closures.',
            codeSnippet: {
              language: 'javascript',
              code: 'function debounce(fn, delay) {\n  let timerId = null;\n  return function(...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}',
              explanation: 'Closure preserves timerId across invocations without polluting global scope.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    phaseNumber: 2,
    title: 'Frontend Engineering & Modern React',
    subtitle: 'TypeScript, React 19, Hooks, State Architecture & Next.js',
    description: 'Build enterprise-grade single page applications with type safety, clean component design, and server-side rendering.',
    category: 'Frontend',
    iconName: 'Layers',
    estimatedWeeks: 6,
    modules: [
      {
        id: 'mod-2-1',
        title: 'TypeScript for Full-Stack Developers',
        description: 'Generics, union types, utility types, and strict type checking.',
        topics: [
          {
            id: 'top-2-1-1',
            title: 'Generics, Conditional Types & Utility Types',
            category: 'Frontend',
            status: 'completed',
            estimatedHours: 6,
            importance: 'Essential',
            summary: 'Writing reusable, strictly typed APIs using Generics (T, K), Pick, Omit, Partial, Record, and Template Literal Types.',
            keyConcepts: ['Generic constraints (extends)', 'Mapped and Conditional types', 'Discriminated unions', 'Type guards (is / in)'],
            practicalExercise: 'Write a type-safe API client wrapper where return types dynamically infer from the endpoint schema.',
            codeSnippet: {
              language: 'typescript',
              code: 'type ApiResponse<T> = \n  | { status: "success"; data: T }\n  | { status: "error"; error: string };\n\nfunction isSuccess<T>(res: ApiResponse<T>): res is { status: "success"; data: T } {\n  return res.status === "success";\n}',
              explanation: 'Discriminated union pattern with custom TypeScript type guard.'
            }
          }
        ]
      },
      {
        id: 'mod-2-2',
        title: 'Modern React Architecture (React 18 & 19)',
        description: 'Component lifecycle, custom hooks, reconciliation, concurrent features, and state patterns.',
        topics: [
          {
            id: 'top-2-2-1',
            title: 'React Fiber, Reconciliation & Virtual DOM',
            category: 'Frontend',
            status: 'in_progress',
            estimatedHours: 6,
            importance: 'High',
            summary: 'How React reconciles elements, Fiber tree architecture, keys importance, and how to avoid redundant re-renders (useMemo, useCallback, memo).',
            keyConcepts: ['Fiber node structure', 'Diffing algorithm (O(n))', 'Batching updates in React 18/19', 'Optimizing render performance'],
            practicalExercise: 'Profile a sluggish 1000-item list with React DevTools Profiler and eliminate wasted renders.',
            documentationUrl: 'https://react.dev/learn/render-and-commit'
          },
          {
            id: 'top-2-2-2',
            title: 'Custom Hooks & State Management Architectures',
            category: 'Frontend',
            status: 'in_progress',
            estimatedHours: 8,
            importance: 'Essential',
            summary: 'Extracting reusable logic into Custom Hooks, Context API state splitting, and modern lightweight stores (Zustand, TanStack Query for server state).',
            keyConcepts: ['Server state vs Client state', 'Stale-while-revalidate caching', 'Optimistic UI updates', 'Custom hook composition'],
            practicalExercise: 'Build a useDebounce and useLocalStorage hook, and manage async server state with TanStack Query.',
            codeSnippet: {
              language: 'typescript',
              code: 'import { useState, useEffect } from "react";\n\nexport function useLocalStorage<T>(key: string, initialValue: T) {\n  const [storedValue, setStoredValue] = useState<T>(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch { return initialValue; }\n  });\n\n  const setValue = (value: T | ((val: T) => T)) => {\n    const valueToStore = value instanceof Function ? value(storedValue) : value;\n    setStoredValue(valueToStore);\n    window.localStorage.setItem(key, JSON.stringify(valueToStore));\n  };\n\n  return [storedValue, setValue] as const;\n}',
              explanation: 'Custom hook syncing React state with browser localStorage safely.'
            }
          }
        ]
      },
      {
        id: 'mod-2-3',
        title: 'Full-Stack Frameworks: Next.js App Router',
        description: 'Server Components (RSC), Client Components, Server Actions, Dynamic routing, and SSR/SSG/ISR.',
        topics: [
          {
            id: 'top-2-3-1',
            title: 'Next.js 15+ App Router, RSC & Server Actions',
            category: 'Frontend',
            status: 'not_started',
            estimatedHours: 10,
            importance: 'Essential',
            summary: 'React Server Components mental model, streaming with Suspense, nested layouts, Route Handlers, and Server Actions for mutation.',
            keyConcepts: ['Server vs Client Component boundary', 'Streaming SSR with React Suspense', 'Caching layers in Next.js', 'Zero-client bundle data fetching'],
            practicalExercise: 'Build a full-stack blog with Next.js App Router, Server Actions for comments, and dynamic OpenGraph image generation.',
            documentationUrl: 'https://nextjs.org/docs/app'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    phaseNumber: 3,
    title: 'Backend & API Engineering',
    subtitle: 'Node.js, Express, RESTful Design, Authentication & Security',
    description: 'Design production-grade backend servers, secure authentication workflows, robust error handling, and real-time sockets.',
    category: 'Backend',
    iconName: 'Server',
    estimatedWeeks: 5,
    modules: [
      {
        id: 'mod-3-1',
        title: 'Node.js Internals & Express Architecture',
        description: 'V8 engine, Libuv event loop, streams, middleware pipelines, and MVC architecture.',
        topics: [
          {
            id: 'top-3-1-1',
            title: 'Libuv, Node.js Event Loop & Streams',
            category: 'Backend',
            status: 'in_progress',
            estimatedHours: 6,
            importance: 'High',
            summary: 'How Node.js handles millions of concurrent I/O connections: timers, pending callbacks, poll phase, check (setImmediate), and close callbacks. Working with readable/writable streams.',
            keyConcepts: ['Libuv thread pool', 'Non-blocking asynchronous I/O', 'Backpressure in streams', 'Child processes and clustering'],
            practicalExercise: 'Implement a stream pipeline that reads a 1GB CSV file and processes it row-by-row with minimal memory usage.',
            codeSnippet: {
              language: 'javascript',
              code: 'import { createReadStream, createWriteStream } from "fs";\nimport { pipeline } from "stream/promises";\nimport { createGzip } from "zlib";\n\nawait pipeline(\n  createReadStream("bigfile.txt"),\n  createGzip(),\n  createWriteStream("bigfile.txt.gz")\n);\nconsole.log("Stream compression completed without RAM spike");',
              explanation: 'Streams handle arbitrary file sizes within a constant ~20MB RAM footprint.'
            }
          },
          {
            id: 'top-3-1-2',
            title: 'Production Express.js Architecture & Clean Layers',
            category: 'Backend',
            status: 'completed',
            estimatedHours: 6,
            importance: 'Essential',
            summary: 'Structuring scalable APIs: Routes -> Controllers -> Services -> Repositories. Centralized error handling middleware and Zod request validation.',
            keyConcepts: ['Separation of concerns', 'Middleware chain next()', 'Zod request schema validation', 'Centralized error handler & status mapping'],
            practicalExercise: 'Build an Express boilerplate with typed request validation and unified error responses.',
            codeSnippet: {
              language: 'typescript',
              code: 'import express, { Request, Response, NextFunction } from "express";\n\nexport const errorHandler = (\n  err: Error,\n  req: Request,\n  res: Response,\n  next: NextFunction\n) => {\n  const statusCode = (err as any).statusCode || 500;\n  res.status(statusCode).json({\n    success: false,\n    error: err.message || "Internal Server Error",\n  });\n};',
              explanation: 'Central error handling middleware prevents server crashes and leak of internal stack traces.'
            }
          }
        ]
      },
      {
        id: 'mod-3-2',
        title: 'Authentication, Authorization & API Security',
        description: 'JWT, Refresh token rotation, OAuth 2.0, RBAC, CORS, CSRF, and rate limiting.',
        topics: [
          {
            id: 'top-3-2-1',
            title: 'JWT, Refresh Tokens & Cookie Security',
            category: 'Backend',
            status: 'in_progress',
            estimatedHours: 8,
            importance: 'Essential',
            summary: 'Implementing secure JWT authentication with short-lived access tokens, refresh token rotation stored in HttpOnly SameSite secure cookies.',
            keyConcepts: ['Access Token vs Refresh Token', 'HttpOnly, Secure, SameSite cookies', 'Token revocation & Redis blacklist', 'Argon2 / Bcrypt password hashing'],
            practicalExercise: 'Build an auth service with sign up, bcrypt hashing (12 rounds), login, token refresh rotation, and logout.',
            documentationUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html'
          },
          {
            id: 'top-3-2-2',
            title: 'API Security: CORS, Helmet, Rate Limiting & OWASP Top 10',
            category: 'Backend',
            status: 'not_started',
            estimatedHours: 6,
            importance: 'Essential',
            summary: 'Hardening APIs against SQL injection, XSS, CSRF, DDoS, and parameter tampering using helmet, express-rate-limit, and proper CORS headers.',
            keyConcepts: ['Cross-Origin Resource Sharing (Preflight OPTIONS)', 'Content Security Policy (CSP)', 'Sliding window rate limiting', 'Input sanitization'],
            practicalExercise: 'Configure Helmet and Redis-backed rate limiting to defend an endpoint from brute force attacks.'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    phaseNumber: 4,
    title: 'Databases & Storage',
    subtitle: 'PostgreSQL, Relational Modeling, ORMs, MongoDB & Redis Caching',
    description: 'Model scalable data architectures, write high-performance SQL queries, and implement Redis caching layers.',
    category: 'Database',
    iconName: 'Database',
    estimatedWeeks: 5,
    modules: [
      {
        id: 'mod-4-1',
        title: 'Relational Databases & PostgreSQL',
        description: 'ACID properties, normalization, complex joins, B-Tree indexes, and migrations.',
        topics: [
          {
            id: 'top-4-1-1',
            title: 'Schema Design, Normalization (1NF–3NF) & Constraints',
            category: 'Database',
            status: 'in_progress',
            estimatedHours: 6,
            importance: 'Essential',
            summary: 'Designing relational schemas with foreign keys, cascading deletes, unique constraints, and normal forms to avoid redundant data and anomalies.',
            keyConcepts: ['Primary & Foreign Keys', 'One-to-One, One-to-Many, Many-to-Many join tables', 'ACID Transactions (Atomicity, Consistency, Isolation, Durability)', 'Normalization vs Denormalization for read speed'],
            practicalExercise: 'Design an E-Commerce relational schema: Users, Orders, OrderItems, Products, and Inventory with transaction guarantees.',
            codeSnippet: {
              language: 'sql',
              code: 'BEGIN TRANSACTION;\nINSERT INTO orders (user_id, total_amount) VALUES (14, 89.99) RETURNING id;\n-- Deduct stock with concurrency check\nUPDATE products SET stock = stock - 1 WHERE id = 42 AND stock > 0;\nCOMMIT;',
              explanation: 'Atomic transaction prevents overselling inventory in concurrent checkouts.'
            }
          },
          {
            id: 'top-4-1-2',
            title: 'PostgreSQL Indexing, EXPLAIN ANALYZE & Query Optimization',
            category: 'Database',
            status: 'not_started',
            estimatedHours: 6,
            importance: 'High',
            summary: 'Deep dive into B-Tree, GIN, and Hash indexes. Using EXPLAIN ANALYZE to detect sequential scans and optimize slow queries.',
            keyConcepts: ['B-Tree index mechanics', 'Composite indexes & leftmost prefix rule', 'Index Scan vs Bitmap Scan vs Seq Scan', 'Connection pooling (PgBouncer)'],
            practicalExercise: 'Generate 500,000 mock records, run a slow query, inspect EXPLAIN ANALYZE, add an optimal index, and achieve a 100x speedup.',
            documentationUrl: 'https://use-the-index-luke.com/'
          }
        ]
      },
      {
        id: 'mod-4-2',
        title: 'Modern ORMs & Redis In-Memory Caching',
        description: 'Prisma, Drizzle ORM, and Redis for caching and rate limiting.',
        topics: [
          {
            id: 'top-4-2-1',
            title: 'Prisma / Drizzle ORM & Schema Migrations',
            category: 'Database',
            status: 'completed',
            estimatedHours: 6,
            importance: 'Essential',
            summary: 'Type-safe database interaction, automated migration scripts, relations, and preventing N+1 query pitfalls with eager loading.',
            keyConcepts: ['Type-safe query generation', 'Database migrations in CI/CD', 'The N+1 query problem', 'Connection pooling in serverless'],
            practicalExercise: 'Define models with relations in Drizzle/Prisma and run production migration.',
            codeSnippet: {
              language: 'typescript',
              code: '// Drizzle ORM schema definition\nimport { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";\n\nexport const users = pgTable("users", {\n  id: serial("id").primaryKey(),\n  name: text("name").notNull(),\n  email: text("email").notNull().unique(),\n  createdAt: timestamp("created_at").defaultNow(),\n});',
              explanation: 'Type-safe SQL schemas with Drizzle compile directly to standard SQL.'
            }
          },
          {
            id: 'top-4-2-2',
            title: 'Redis: Caching Strategies, TTL & Pub/Sub',
            category: 'Database',
            status: 'not_started',
            estimatedHours: 6,
            importance: 'High',
            summary: 'Key-value in-memory caching patterns: Cache-Aside, Write-Through, Write-Behind. Setting TTLs, cache invalidation, and Redis pub/sub.',
            keyConcepts: ['Cache-Aside pattern', 'Cache Stampede & Cache Invalidation', 'Redis Data Structures (Strings, Hashes, Sorted Sets)', 'Leaderboards with ZSET'],
            practicalExercise: 'Implement a cache-aside layer in Express so repeated heavy database queries respond in < 5ms.',
            codeSnippet: {
              language: 'typescript',
              code: 'async function getProduct(id: string) {\n  const cached = await redis.get(`product:${id}`);\n  if (cached) return JSON.parse(cached);\n  \n  const product = await db.query.products.findFirst({ where: eq(products.id, id) });\n  if (product) await redis.setex(`product:${id}`, 3600, JSON.stringify(product));\n  return product;\n}',
              explanation: 'Cache-Aside pattern with 1 hour Time-To-Live (TTL).'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'phase-5',
    phaseNumber: 5,
    title: 'DevOps, Cloud & CI/CD',
    subtitle: 'Docker, Containerization, GitHub Actions, AWS/GCP & Nginx',
    description: 'Package, automate, deploy, and maintain modern full-stack web applications in production environments.',
    category: 'DevOps',
    iconName: 'Cloud',
    estimatedWeeks: 4,
    modules: [
      {
        id: 'mod-5-1',
        title: 'Docker & Containerization',
        description: 'Dockerfiles, multi-stage builds, Docker Compose, and networking.',
        topics: [
          {
            id: 'top-5-1-1',
            title: 'Multi-Stage Dockerfiles & Minimal Container Images',
            category: 'DevOps',
            status: 'in_progress',
            estimatedHours: 6,
            importance: 'Essential',
            summary: 'Containerizing Node.js and React apps using multi-stage builds to produce tiny, secure production images (Alpine/Distroless).',
            keyConcepts: ['Layer caching optimization', 'Multi-stage builds (builder -> runner)', 'Non-root user security', '.dockerignore best practices'],
            practicalExercise: 'Containerize a Full-Stack app, reducing the image size from 1.2GB down to 85MB using Alpine multi-stage build.',
            codeSnippet: {
              language: 'dockerfile',
              code: '# Stage 1: Build\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Stage 2: Production Runner\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/package*.json ./\nRUN npm ci --only=production\nUSER node\nCMD ["node", "dist/server.js"]',
              explanation: 'Multi-stage build drops devDependencies and source code from final image.'
            }
          },
          {
            id: 'top-5-1-2',
            title: 'Docker Compose for Multi-Service Local Stacks',
            category: 'DevOps',
            status: 'completed',
            estimatedHours: 4,
            importance: 'Essential',
            summary: 'Orchestrating backend API, PostgreSQL database, and Redis cache containers locally with volume persistence and internal networking.',
            keyConcepts: ['Named volumes for DB persistence', 'Internal bridge networks', 'Healthchecks and depends_on: condition: service_healthy', 'Environment variables (.env) injection'],
            practicalExercise: 'Spin up a 3-container stack (App + Postgres + Redis) with a single docker compose up command.',
            documentationUrl: 'https://docs.docker.com/compose/'
          }
        ]
      },
      {
        id: 'mod-5-2',
        title: 'CI/CD Pipelines & Cloud Deployment',
        description: 'GitHub Actions, automated testing, linting, and automated cloud deployments.',
        topics: [
          {
            id: 'top-5-2-1',
            title: 'GitHub Actions CI/CD Pipeline Automation',
            category: 'DevOps',
            status: 'not_started',
            estimatedHours: 5,
            importance: 'Essential',
            summary: 'Creating automated workflows on git push: running linter, typecheck, unit tests, building Docker image, and deploying to cloud host.',
            keyConcepts: ['Workflows, jobs, and steps matrix', 'GitHub Secrets for credentials', 'Artifacts and caching node_modules', 'Branch protection rules'],
            practicalExercise: 'Create a .github/workflows/ci.yml that blocks merging PRs if TypeScript compilation or tests fail.'
          },
          {
            id: 'top-5-2-2',
            title: 'Nginx Reverse Proxy, SSL / HTTPS & Load Balancing',
            category: 'DevOps',
            status: 'not_started',
            estimatedHours: 5,
            importance: 'High',
            summary: 'Configuring Nginx as a reverse proxy in front of Node.js apps: rate limiting, Gzip/Brotli compression, SSL termination via Let\'s Encrypt Certbot.',
            keyConcepts: ['Reverse proxy vs Forward proxy', 'SSL Termination', 'Upstream load balancing (Round Robin / Least Connected)', 'Gzip static asset caching'],
            practicalExercise: 'Write an nginx.conf that proxies traffic to a Node server with custom headers and 10MB upload limits.'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-6',
    phaseNumber: 6,
    title: 'System Design & DSA Mastery',
    subtitle: 'Data Structures, Core Algorithms, Scalability & System Architecture',
    description: 'Excel at coding technical rounds and architect scalable distributed systems capable of handling millions of users.',
    category: 'System Design',
    iconName: 'Cpu',
    estimatedWeeks: 6,
    modules: [
      {
        id: 'mod-6-1',
        title: 'Core Data Structures & Algorithmic Patterns',
        description: 'Two pointers, sliding window, binary search, trees, graphs, and dynamic programming.',
        topics: [
          {
            id: 'top-6-1-1',
            title: 'Arrays, Two Pointers & Sliding Window Patterns',
            category: 'DSA',
            status: 'completed',
            estimatedHours: 12,
            importance: 'Essential',
            summary: 'Mastering O(n) array traversal techniques: Left/Right pointers, Fast/Slow pointers (cycle detection), and dynamic window size matching.',
            keyConcepts: ['In-place space optimization', 'Sliding window hash frequency map', 'Trapping Rain Water logic', 'Subarray sum with prefix sum'],
            practicalExercise: 'Solve LeetCode #15 (3Sum), #42 (Trapping Rain Water), and #76 (Minimum Window Substring).',
            codeSnippet: {
              language: 'typescript',
              code: '// Two Pointers: 3Sum solution pattern\nfunction threeSum(nums: number[]): number[][] {\n  nums.sort((a, b) => a - b);\n  const res: number[][] = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      const sum = nums[i] + nums[l] + nums[r];\n      if (sum === 0) {\n        res.push([nums[i], nums[l], nums[r]]);\n        while (l < r && nums[l] === nums[l + 1]) l++;\n        while (l < r && nums[r] === nums[r - 1]) r--;\n        l++; r--;\n      } else if (sum < 0) l++;\n      else r--;\n    }\n  }\n  return res;\n}',
              explanation: 'Sorting + Two Pointers reduces 3Sum from O(n^3) to O(n^2) with O(1) extra memory.'
            }
          },
          {
            id: 'top-6-1-2',
            title: 'Trees & Graphs: BFS, DFS & Dijkstra',
            category: 'DSA',
            status: 'in_progress',
            estimatedHours: 14,
            importance: 'Essential',
            summary: 'Binary search tree invariants, level-order traversal, topological sort, detecting cycles in directed graphs, and shortest path algorithms.',
            keyConcepts: ['Queue for BFS (Shortest path in unweighted graph)', 'Stack/Recursion for DFS', 'Adjacency list representation', 'Trie prefix trees for search autocomplete'],
            practicalExercise: 'Implement Number of Islands (BFS/DFS) and Course Schedule (Topological Sort / Kahns Algorithm).',
            documentationUrl: 'https://neetcode.io/roadmap'
          }
        ]
      },
      {
        id: 'mod-6-2',
        title: 'System Design & High-Scalability Architectures',
        description: 'CAP theorem, load balancers, caching layers, message queues, and DB sharding.',
        topics: [
          {
            id: 'top-6-2-1',
            title: 'High-Level System Design: URL Shortener & Rate Limiter',
            category: 'System Design',
            status: 'in_progress',
            estimatedHours: 8,
            importance: 'Essential',
            summary: 'Estimating QPS, storage requirements, Base62 encoding, distributed unique ID generation (Snowflake ID), and horizontal scaling.',
            keyConcepts: ['CAP Theorem (Consistency vs Availability)', 'Base62 encoding vs MD5 hashing', 'Token Bucket vs Leaking Bucket rate limiter', 'Read-heavy vs Write-heavy architecture'],
            practicalExercise: 'Design TinyURL: step through functional requirements, back-of-the-envelope estimation, database schema, and caching tier.'
          },
          {
            id: 'top-6-2-2',
            title: 'Message Queues, Async Workers & Microservices vs Monolith',
            category: 'System Design',
            status: 'not_started',
            estimatedHours: 8,
            importance: 'High',
            summary: 'Decoupling services with RabbitMQ / Kafka / BullMQ. Event-driven architecture, idempotency, dead-letter queues, and eventual consistency.',
            keyConcepts: ['Pub/Sub vs Point-to-point queues', 'At-least-once vs Exactly-once delivery', 'Modular monolith vs Microservices tradeoffs', 'Database per service pattern & 2-phase commit'],
            practicalExercise: 'Implement an asynchronous email/notification dispatch queue with BullMQ and Redis in Node.js.'
          }
        ]
      }
    ]
  },
  {
    id: 'phase-7',
    phaseNumber: 7,
    title: 'Real-World Portfolio & Career Launch',
    subtitle: 'Production Capstone Apps, Open Source, Resumes & Tech Interviews',
    description: 'Transform your technical expertise into high-impact portfolio demonstrations, crack interviews, and land software engineering roles.',
    category: 'General',
    iconName: 'Briefcase',
    estimatedWeeks: 4,
    modules: [
      {
        id: 'mod-7-1',
        title: 'Production Capstone Projects & Open Source',
        description: 'End-to-end full-stack SaaS apps with real payments, auth, and automated deployment.',
        topics: [
          {
            id: 'top-7-1-1',
            title: 'Architecting a Production Full-Stack SaaS Capstone',
            category: 'General',
            status: 'in_progress',
            estimatedHours: 20,
            importance: 'Essential',
            summary: 'Building a polished, non-trivial application featuring: user authentication, relational database with migrations, payment webhook processing (Stripe), background workers, and CI/CD deployment.',
            keyConcepts: ['Feature completeness over quantity', 'Zero mock data in portfolio projects', 'Writing thorough README with architectural diagram', 'Lighthouse 95+ performance & SEO'],
            practicalExercise: 'Ship your capstone project to a live domain with custom SSL, analytics, and demo account credentials in the README.'
          },
          {
            id: 'top-7-1-2',
            title: 'Contributing to Open Source on GitHub',
            category: 'General',
            status: 'not_started',
            estimatedHours: 8,
            importance: 'Recommended',
            summary: 'Finding beginner-friendly "good first issue" repositories, setting up local development, writing tests, and opening pristine Pull Requests with maintainer etiquette.',
            keyConcepts: ['Fork and upstream remote tracking', 'Following project CONTRIBUTING.md', 'Writing passing unit tests with code coverage', 'Respectful PR review iterations'],
            practicalExercise: 'Submit a merged bug fix or documentation PR to a recognized open-source library or developer tool.'
          }
        ]
      },
      {
        id: 'mod-7-2',
        title: 'SWE Technical Resume & Coding Interview Strategy',
        description: 'ATS resume formatting, behavioral STAR method, mock technical interviews, and salary negotiation.',
        topics: [
          {
            id: 'top-7-2-1',
            title: 'Engineering Resume Optimization (Google X-Y-Z Formula)',
            category: 'General',
            status: 'completed',
            estimatedHours: 4,
            importance: 'Essential',
            summary: 'Crafting bullet points: "Accomplished [X] as measured by [Y], by doing [Z]". ATS parsing guidelines, single-page layout, and technical skills taxonomy.',
            keyConcepts: ['Google X-Y-Z formula', 'ATS friendly single-column format', 'Quantifying latency, users, and performance gains', 'Github & portfolio links placement'],
            practicalExercise: 'Revise your resume bullet points so every single project includes quantifiable metrics.'
          },
          {
            id: 'top-7-2-2',
            title: 'Live Technical Coding & Behavioral STAR Technique',
            category: 'General',
            status: 'in_progress',
            estimatedHours: 10,
            importance: 'Essential',
            summary: 'Communicating clearly during coding interviews: Clarifying questions -> Test cases -> Brute force -> Optimal approach -> Coding -> Dry run -> Complexity analysis.',
            keyConcepts: ['Think aloud communication', 'Handling hints and edge cases', 'STAR framework for behavioral questions', 'Reverse-interviewing the company'],
            practicalExercise: 'Conduct 3 timed 45-minute peer mock interviews covering 1 DSA problem and 2 STAR questions.'
          }
        ]
      }
    ]
  }
];

export const initialTasks: StudyTask[] = [
  {
    id: 'task-1',
    title: 'Solve LeetCode #15: 3Sum with Two Pointers',
    category: 'DSA',
    priority: 'high',
    dueDate: '2026-09-29',
    completed: true,
    completedAt: '2026-09-28'
  },
  {
    id: 'task-2',
    title: 'Implement Refresh Token Rotation with HttpOnly Cookies in Express',
    category: 'Practice',
    priority: 'high',
    dueDate: '2026-09-29',
    completed: false,
    phaseRef: 'phase-3'
  },
  {
    id: 'task-3',
    title: 'Read System Design chapter on Database Sharding & Read Replicas',
    category: 'Theory',
    priority: 'medium',
    dueDate: '2026-09-30',
    completed: false,
    phaseRef: 'phase-6'
  },
  {
    id: 'task-4',
    title: 'Dockerize Next.js + PostgreSQL stack with Docker Compose',
    category: 'Project',
    priority: 'high',
    dueDate: '2026-10-01',
    completed: false,
    phaseRef: 'phase-5'
  },
  {
    id: 'task-5',
    title: 'Review Course Schedule (Topological Sort BFS with Kahn\'s Algo)',
    category: 'DSA',
    priority: 'medium',
    dueDate: '2026-10-02',
    completed: false
  },
  {
    id: 'task-6',
    title: 'Update SWE Resume with Google X-Y-Z metrics for Capstone app',
    category: 'Interview',
    priority: 'low',
    dueDate: '2026-10-03',
    completed: true,
    completedAt: '2026-09-27'
  }
];

export const initialProblems: CodingProblem[] = [
  {
    id: 'prob-1',
    title: 'Two Sum',
    platform: 'LeetCode',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solutionNotes: 'Store complement (target - num) in HashMap with index. Single pass look-up.',
    problemUrl: 'https://leetcode.com/problems/two-sum/',
    dateSolved: '2026-09-22',
    codeSnippet: 'function twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp)!, i];\n    map.set(nums[i], i);\n  }\n  return [];\n}'
  },
  {
    id: 'prob-2',
    title: '3Sum',
    platform: 'LeetCode',
    difficulty: 'Medium',
    topic: 'Two Pointers',
    status: 'Solved',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    solutionNotes: 'Sort array first. Loop through with i, then use two pointers (left & right). Skip consecutive duplicates.',
    problemUrl: 'https://leetcode.com/problems/3sum/',
    dateSolved: '2026-09-28'
  },
  {
    id: 'prob-3',
    title: 'Number of Islands',
    platform: 'LeetCode',
    difficulty: 'Medium',
    topic: 'Graphs (BFS/DFS)',
    status: 'Solved',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    solutionNotes: 'Iterate 2D grid. When landing on "1", increment count and run DFS/BFS to sink connected island to "0".',
    problemUrl: 'https://leetcode.com/problems/number-of-islands/',
    dateSolved: '2026-09-25'
  },
  {
    id: 'prob-4',
    title: 'LRU Cache',
    platform: 'LeetCode',
    difficulty: 'Medium',
    topic: 'Linked List & Hash Map',
    status: 'Review Needed',
    timeComplexity: 'O(1) Get, O(1) Put',
    spaceComplexity: 'O(Capacity)',
    solutionNotes: 'Doubly Linked List + HashMap. Dummy Head and Dummy Tail nodes prevent null-check edge cases.',
    problemUrl: 'https://leetcode.com/problems/lru-cache/',
    dateSolved: '2026-09-20'
  },
  {
    id: 'prob-5',
    title: 'Trapping Rain Water',
    platform: 'LeetCode',
    difficulty: 'Hard',
    topic: 'Two Pointers',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    solutionNotes: 'Track maxLeft and maxRight pointers. Shift smaller boundary inward because water height is limited by the bottleneck.',
    problemUrl: 'https://leetcode.com/problems/trapping-rain-water/',
    dateSolved: '2026-09-27'
  },
  {
    id: 'prob-6',
    title: 'Course Schedule',
    platform: 'LeetCode',
    difficulty: 'Medium',
    topic: 'Graphs (Topological Sort)',
    status: 'Attempted',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    solutionNotes: 'Detect cycle in directed graph using in-degree array and queue (Kahn\'s algorithm). If processed nodes != numCourses, cycle exists.',
    problemUrl: 'https://leetcode.com/problems/course-schedule/',
    dateSolved: '2026-09-28'
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'DevPulse – Real-Time Team Performance & PR Analytics',
    tagline: 'Full-stack platform tracking GitHub pull request velocity, code reviews, and developer sprint throughput.',
    description: 'A production-grade dashboard integrating GitHub Webhooks, PostgreSQL with Prisma, Redis queue workers for calculating review turnaround times, and Tailwind UI.',
    category: 'Full-Stack',
    techStack: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Tailwind CSS'],
    githubUrl: 'https://github.com/developer/devpulse-analytics',
    liveUrl: 'https://devpulse.example.dev',
    status: 'Completed',
    progress: 100,
    features: [
      { id: 'f1', name: 'GitHub OAuth & App Webhook Ingestion', completed: true },
      { id: 'f2', name: 'PostgreSQL Relational DB with Automated Migrations', completed: true },
      { id: 'f3', name: 'Redis / BullMQ asynchronous job pipeline for metrics', completed: true },
      { id: 'f4', name: 'Interactive SVG analytics charts with zero lag', completed: true },
      { id: 'f5', name: 'Docker containerization and multi-stage build', completed: true }
    ],
    keyLearnings: 'Learned how to handle high-frequency GitHub webhook spikes with Redis rate-limiting and transaction rollbacks in PostgreSQL.',
    createdAt: '2026-08-15'
  },
  {
    id: 'proj-2',
    title: 'HyperStore – High-Concurrency E-Commerce Engine',
    tagline: 'Distributed inventory checkout system with Redis atomic locks and Stripe integration.',
    description: 'Engineered to handle flash sales with zero inventory overselling. Features distributed locking via Redlock, JWT auth with refresh tokens, and automated invoice PDF generation.',
    category: 'Full-Stack',
    techStack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Redis', 'Stripe API', 'Vitest'],
    githubUrl: 'https://github.com/developer/hyperstore-engine',
    liveUrl: 'https://hyperstore.example.dev',
    status: 'In Progress',
    progress: 75,
    features: [
      { id: 'f21', name: 'ACID transaction handling for product inventory', completed: true },
      { id: 'f22', name: 'Redis distributed lock to prevent race conditions', completed: true },
      { id: 'f23', name: 'Stripe webhook signature validation & payment flow', completed: true },
      { id: 'f24', name: 'Comprehensive unit tests with 85%+ test coverage', completed: false },
      { id: 'f25', name: 'Nginx reverse proxy with SSL & rate-limiting', completed: false }
    ],
    keyLearnings: 'Mastered database isolation levels (Read Committed vs Serializable) and how Redis locks prevent double-spend anomalies in e-commerce checkouts.',
    createdAt: '2026-09-01'
  },
  {
    id: 'proj-3',
    title: 'GitCast – CLI for Automated Branch Visualizations',
    tagline: 'Terminal CLI tool written in TypeScript to parse Git reflog and render interactive ASCII tree graphs.',
    description: 'Helps developers visualize complex merges, rebases, and detached HEAD states in their terminal with zero external dependencies.',
    category: 'Backend/API',
    techStack: ['Node.js', 'TypeScript', 'Commander.js', 'Chalk'],
    githubUrl: 'https://github.com/developer/gitcast-cli',
    status: 'Completed',
    progress: 100,
    features: [
      { id: 'f31', name: 'Raw Git reflog parsing algorithm', completed: true },
      { id: 'f32', name: 'Interactive terminal menu and branch switching', completed: true },
      { id: 'f33', name: 'Published to npm registry with semantic versioning', completed: true }
    ],
    keyLearnings: 'Deepened understanding of Git internals (blobs, trees, commit hashes, and reflog pointers).',
    createdAt: '2026-07-20'
  }
];

export const initialResources: Resource[] = [
  {
    id: 'res-1',
    title: 'MDN Web Docs – The Web Standard Reference',
    url: 'https://developer.mozilla.org',
    category: 'Documentation',
    rating: 5,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Web APIs'],
    description: 'The ultimate source of truth for browser specifications, JavaScript prototypes, CSS properties, and accessibility guidelines.',
    bookmarked: true
  },
  {
    id: 'res-2',
    title: 'Full Stack Open (University of Helsinki)',
    url: 'https://fullstackopen.com/en/',
    category: 'Course',
    rating: 5,
    tags: ['React', 'Node.js', 'GraphQL', 'TypeScript', 'CI/CD'],
    description: 'Renowned university curriculum covering modern single-page applications, Node.js backends, testing, and containerization.',
    bookmarked: true
  },
  {
    id: 'res-3',
    title: 'NeetCode 150 & System Design Roadmap',
    url: 'https://neetcode.io',
    category: 'Tool',
    rating: 5,
    tags: ['DSA', 'LeetCode', 'Algorithms', 'System Design'],
    description: 'Curated 150 essential DSA problems grouped by algorithmic pattern with video walkthroughs and Python/TypeScript implementations.',
    bookmarked: true
  },
  {
    id: 'res-4',
    title: 'Designing Data-Intensive Applications (Martin Kleppmann)',
    url: 'https://dataintensive.net',
    category: 'Book',
    rating: 5,
    tags: ['System Design', 'Databases', 'Distributed Systems', 'PostgreSQL'],
    description: 'The definitive handbook on reliability, scalability, replication, partitioning, transactions, and distributed data systems.',
    bookmarked: true
  },
  {
    id: 'res-5',
    title: 'roadmap.sh – Community Full-Stack Roadmaps',
    url: 'https://roadmap.sh/full-stack',
    category: 'Documentation',
    rating: 5,
    tags: ['Roadmap', 'Full-Stack', 'DevOps'],
    description: 'Visual step-by-step roadmaps and career paths for Frontend, Backend, DevOps, and Full-Stack developers.',
    bookmarked: false
  },
  {
    id: 'res-6',
    title: 'Hussein Nasser – Backend Engineering Show',
    url: 'https://youtube.com',
    category: 'YouTube',
    rating: 5,
    tags: ['PostgreSQL', 'HTTP/3', 'Nginx', 'Proxies', 'Architecture'],
    description: 'Masterclass video deep dives explaining database connection pooling, TLS handshake mechanics, and backend protocol engineering.',
    bookmarked: true
  }
];

export const initialNotes: Note[] = [
  {
    id: 'note-1',
    title: 'Database Transactions & ACID Guarantees in PostgreSQL',
    topic: 'PostgreSQL',
    category: 'Database',
    tags: ['SQL', 'PostgreSQL', 'Transactions', 'ACID'],
    content: `### ACID Properties Summary

- **Atomicity**: All statements in the transaction either execute together or none do (Rollback on failure).
- **Consistency**: The database maintains all constraints (Foreign keys, checks, unique indices) before and after transaction.
- **Isolation**: Concurrent transactions cannot observe each other's intermediate uncommitted states.
- **Durability**: Once committed, WAL (Write-Ahead Log) ensures changes survive system crashes or power cuts.

### Isolation Levels in Postgres:
1. **Read Committed** (Default): Never sees dirty reads. Sees new commits made after its own statement starts.
2. **Repeatable Read**: Snapshot isolation. Sees consistent state as of transaction start.
3. **Serializable**: Strict serial order simulation. Prevents write skew.`,
    codeSnippet: `BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;

UPDATE accounts SET balance = balance - 250 WHERE id = 101;
UPDATE accounts SET balance = balance + 250 WHERE id = 202;

COMMIT;`,
    updatedAt: '2026-09-27'
  },
  {
    id: 'note-2',
    title: 'Why Refresh Token Rotation is Essential for Single Page Apps',
    topic: 'Auth & Security',
    category: 'Backend',
    tags: ['JWT', 'Security', 'OAuth', 'Cookies'],
    content: `### The Vulnerability of LocalStorage Tokens
Storing JWTs in \`localStorage\` leaves the token vulnerable to Cross-Site Scripting (XSS). Any injected script can read \`localStorage.getItem('token')\` and exfiltrate credentials.

### Secure Architecture:
1. Store short-lived **Access Token** (15 min lifespan) in memory (React state / closure).
2. Store **Refresh Token** (7 day lifespan) in an **HttpOnly, Secure, SameSite=Strict** cookie.
3. When Access Token expires (HTTP 401), the frontend silently hits \`/api/auth/refresh\`.
4. The server validates the cookie, invalidates the old refresh token family in Redis, generates a **new** token pair, and returns it. If an old refresh token is reused, revoke the entire user session immediately (Token Reuse Detection).`,
    updatedAt: '2026-09-28'
  },
  {
    id: 'note-3',
    title: 'Two Pointers vs Sliding Window: Cheat Sheet',
    topic: 'DSA Patterns',
    category: 'DSA',
    tags: ['Algorithms', 'LeetCode', 'Optimization'],
    content: `### Two Pointers Pattern:
- **When to use**: Sorted arrays, pair sums, palindrome verification, in-place element removals.
- **Complexity**: Almost always turns an O(n^2) nested loop into O(n).

### Sliding Window Pattern:
- **When to use**: Contiguous subarrays or substrings where you need to maximize/minimize length or find conditions matching a target sum or character frequency.
- **Rule**: Expand the right pointer \`r++\` to satisfy condition, then contract the left pointer \`l++\` while maintaining invariant.`,
    codeSnippet: `// Sliding Window Maximum / Contiguous Sum
let left = 0, currentSum = 0, minLength = Infinity;
for (let right = 0; right < nums.length; right++) {
  currentSum += nums[right];
  while (currentSum >= target) {
    minLength = Math.min(minLength, right - left + 1);
    currentSum -= nums[left++];
  }
}`,
    updatedAt: '2026-09-24'
  }
];

export const initialGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Land a Summer 2027 Full-Stack SWE Internship',
    category: 'Career',
    targetDate: '2027-01-15',
    progress: 65,
    completed: false,
    milestones: [
      { id: 'm1', text: 'Tailor resume with Google X-Y-Z formula', done: true },
      { id: 'm2', text: 'Solve 150 LeetCode problems (Medium heavy)', done: true },
      { id: 'm3', text: 'Ship 2 production full-stack capstone projects', done: true },
      { id: 'm4', text: 'Submit 50 targeted applications with employee referrals', done: false },
      { id: 'm5', text: 'Pass 3 technical coding & system design rounds', done: false }
    ]
  },
  {
    id: 'goal-2',
    title: 'Solve 150 Curated DSA Problems on NeetCode/LeetCode',
    category: 'DSA',
    targetDate: '2026-11-30',
    progress: 72,
    completed: false,
    milestones: [
      { id: 'm21', text: 'Master Arrays, Two Pointers & Sliding Window (25 problems)', done: true },
      { id: 'm22', text: 'Master Trees, BST & Tries (25 problems)', done: true },
      { id: 'm23', text: 'Master Graphs: BFS, DFS, Dijkstra, Topo Sort (25 problems)', done: false },
      { id: 'm24', text: 'Master 1D & 2D Dynamic Programming (25 problems)', done: false }
    ]
  },
  {
    id: 'goal-3',
    title: 'Deploy Full-Stack Production App with CI/CD & Docker',
    category: 'Skills',
    targetDate: '2026-10-15',
    progress: 85,
    completed: false,
    milestones: [
      { id: 'm31', text: 'Configure PostgreSQL with schema migrations', done: true },
      { id: 'm32', text: 'Create multi-stage Dockerfile (< 100MB image)', done: true },
      { id: 'm33', text: 'Set up GitHub Actions automated testing pipeline', done: true },
      { id: 'm34', text: 'Deploy to Cloud Run / VPS with custom domain and SSL', done: false }
    ]
  }
];

export const initialInternships: Internship[] = [
  {
    id: 'int-1',
    company: 'Stripe',
    role: 'Software Engineer Intern, Developer Infrastructure',
    location: 'San Francisco, CA / Hybrid',
    type: 'Summer Intern',
    status: 'Interview',
    dateApplied: '2026-09-10',
    salaryOrStipend: '$62/hr + housing stipend',
    jobUrl: 'https://stripe.com/jobs',
    referral: 'Alumni connection (Senior SWE)',
    notes: 'Passed Online Assessment with 100% on algorithmic questions. Technical phone screen scheduled for next Tuesday focusing on distributed systems.'
  },
  {
    id: 'int-2',
    company: 'Datadog',
    role: 'Full-Stack Software Engineer Intern',
    location: 'New York, NY',
    type: 'Summer Intern',
    status: 'OA',
    dateApplied: '2026-09-18',
    salaryOrStipend: '$55/hr',
    jobUrl: 'https://datadoghq.com/careers',
    notes: 'Received HackerRank 75-minute assessment. Focus: Graph algorithms and TypeScript API parsing.'
  },
  {
    id: 'int-3',
    company: 'Cloudflare',
    role: 'Systems & Web Engineering Intern',
    location: 'Remote',
    type: 'Summer Intern',
    status: 'Applied',
    dateApplied: '2026-09-22',
    salaryOrStipend: '$52/hr',
    notes: 'Submitted application with link to DevPulse project and GitCast CLI tool.'
  },
  {
    id: 'int-4',
    company: 'Vercel',
    role: 'Frontend Infrastructure Intern',
    location: 'Remote',
    type: 'Summer Intern',
    status: 'Wishlist',
    dateApplied: '2026-09-28',
    notes: 'Preparing custom Next.js showcase project before submitting application.'
  }
];

export const initialHackathons: Hackathon[] = [
  {
    id: 'hack-1',
    name: 'HackMIT 2026',
    platform: 'MLH',
    date: '2026-09-19',
    teamSize: 4,
    projectTitle: 'VoiceQuery – Natural Language DB Visualizer',
    submissionUrl: 'https://devpost.com/software/voicequery',
    status: 'Winner',
    prizeOrAward: 'Best Developer Tool ($3,000 track prize)',
    learnings: 'Built an end-to-end prototype in 36 hours. Handled streaming WebSocket responses from our Node backend to dynamic SVG canvas.'
  },
  {
    id: 'hack-2',
    name: 'ETHGlobal Hackathon',
    platform: 'Devpost',
    date: '2026-10-24',
    teamSize: 3,
    projectTitle: 'SmartEscrow Micro-Services',
    status: 'Registered',
    learnings: 'Targeting zero-knowledge proofs and high-throughput transaction indexing.'
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Step',
    description: 'Began the voyage: marked your first roadmap topic as completed.',
    category: 'Full-Stack',
    icon: 'Sparkles',
    xp: 100,
    unlocked: true,
    unlockedAt: '2026-09-01'
  },
  {
    id: 'ach-2',
    title: 'Git Master',
    description: 'Mastered distributed version control, rebasing, and GitHub workflows in Phase 0.',
    category: 'Full-Stack',
    icon: 'GitBranch',
    xp: 200,
    unlocked: true,
    unlockedAt: '2026-09-05'
  },
  {
    id: 'ach-3',
    title: 'First Project Completed',
    description: 'Built, tested, and marked your first software project as completed.',
    category: 'Projects',
    icon: 'FolderCheck',
    xp: 400,
    unlocked: true,
    unlockedAt: '2026-09-12'
  },
  {
    id: 'ach-4',
    title: 'Production Deployer',
    description: 'Shipped a containerized full-stack application with live cloud deployment.',
    category: 'Projects',
    icon: 'Rocket',
    xp: 500,
    unlocked: true,
    unlockedAt: '2026-09-15'
  },
  {
    id: 'ach-5',
    title: 'Code Warrior',
    description: 'Solved 5+ coding challenges on LeetCode / DSA platforms.',
    category: 'DSA',
    icon: 'Terminal',
    xp: 250,
    unlocked: true,
    unlockedAt: '2026-09-18'
  },
  {
    id: 'ach-6',
    title: 'Algorithm Centurion',
    description: 'Solved 25+ DSA problems across Arrays, Trees, Graphs, and DP.',
    category: 'DSA',
    icon: 'Cpu',
    xp: 750,
    unlocked: false
  },
  {
    id: 'ach-7',
    title: '14-Day Consistency Warrior',
    description: 'Maintained a 14-day continuous daily coding and learning streak.',
    category: 'Streak',
    icon: 'Flame',
    xp: 450,
    unlocked: true,
    unlockedAt: '2026-09-28'
  },
  {
    id: 'ach-8',
    title: 'Roadmap Phase Alpha Achieved',
    description: 'Finished 100% of all modules and topics within Phase 0 Foundations.',
    category: 'Full-Stack',
    icon: 'CheckCircle2',
    xp: 600,
    unlocked: false
  },
  {
    id: 'ach-9',
    title: '50 Hours Logged',
    description: 'Logged 50+ hours of focused deep-work study and coding.',
    category: 'Streak',
    icon: 'Clock',
    xp: 500,
    unlocked: true,
    unlockedAt: '2026-09-25'
  },
  {
    id: 'ach-10',
    title: '100 Hours Logged',
    description: 'Joined the Century Club by accumulating 100+ logged engineering study hours.',
    category: 'Streak',
    icon: 'Hourglass',
    xp: 1000,
    unlocked: false
  },
  {
    id: 'ach-11',
    title: 'Knowledge Vault',
    description: 'Saved and curated 8+ developer resources and technical study notes.',
    category: 'Full-Stack',
    icon: 'BookOpen',
    xp: 300,
    unlocked: true,
    unlockedAt: '2026-09-22'
  },
  {
    id: 'ach-12',
    title: 'Interview Ready',
    description: 'Actively tracked 4+ internship applications with resumes and technical notes.',
    category: 'Career',
    icon: 'Briefcase',
    xp: 400,
    unlocked: true,
    unlockedAt: '2026-09-24'
  },
  {
    id: 'ach-13',
    title: 'Hackathon Hero',
    description: 'Built under pressure and submitted or won an award at a hackathon.',
    category: 'Career',
    icon: 'Trophy',
    xp: 800,
    unlocked: true,
    unlockedAt: '2026-09-19'
  }
];


export const initialUserProfile: UserProfile = {
  name: 'Alex Rivera',
  university: 'State University of Technology',
  major: 'B.S. Computer Science & Engineering',
  graduationYear: '2027',
  targetRole: 'Full-Stack Software Engineer',
  githubUsername: 'alexrivera-dev',
  linkedinUsername: 'alexrivera-swe',
  dailyHourGoal: 3.5,
  weeklyProblemGoal: 10
};

// Activity logs for 91 days (13 full weeks) to render the GitHub-style contribution calendar
export const generateInitialActivityLogs = (): DailyActivityLog[] => {
  const logs: DailyActivityLog[] = [];
  const today = new Date('2026-09-28');
  
  for (let i = 90; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    // Current streak is last 14 days uninterrupted:
    const isInCurrentStreak = i <= 14;
    
    let hours = 0;
    let problems = 0;
    let topics = 0;

    if (isInCurrentStreak) {
      hours = isWeekend ? Number((2.0 + (i % 3) * 1.2).toFixed(1)) : Number((3.0 + ((i * 5) % 4) * 0.7).toFixed(1));
      problems = (i % 3 === 0) ? 3 : (i % 2 === 0 ? 2 : 1);
      topics = (i % 4 === 0) ? 1 : 0;
    } else {
      // Historical pattern: active most days (~80% of days), with varied intensity
      const pseudoRand = (i * 17 + d.getDay() * 7) % 100;
      if (pseudoRand > 22) { // 78% active
        hours = isWeekend ? Number((1.5 + (i % 4) * 1.0).toFixed(1)) : Number((2.5 + (i % 5) * 0.8).toFixed(1));
        problems = (i % 3 === 0) ? 2 : (i % 2 === 0 ? 1 : 0);
        topics = (i % 5 === 0) ? 1 : 0;
      } else {
        hours = 0;
        problems = 0;
        topics = 0;
      }
    }
    
    logs.push({
      date: dateStr,
      hours,
      problemsCount: problems,
      topicsCompleted: topics
    });
  }
  return logs;
};

