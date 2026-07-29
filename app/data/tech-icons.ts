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
