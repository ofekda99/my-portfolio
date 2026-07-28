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
