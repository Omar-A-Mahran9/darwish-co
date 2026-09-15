import type { ServiceAccent } from "@shared/services";
import {
  BarChart3,
  BookOpen,
  CheckCircle,
  Cpu,
  Database,
  FileText,
  Globe2,
  Handshake,
  HelpCircle,
  MessageSquare,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Accent classes per service. Written out in full because Tailwind only keeps
 * class names it can see as complete strings in the source.
 */
export const ACCENT: Record<ServiceAccent, { text: string; border: string; soft: string }> = {
  primary: { text: "text-primary", border: "border-primary/30", soft: "bg-primary/10" },
  teal: { text: "text-chart-2", border: "border-chart-2/30", soft: "bg-chart-2/10" },
  amber: { text: "text-chart-3", border: "border-chart-3/30", soft: "bg-chart-3/10" },
  blue: { text: "text-blue-600", border: "border-blue-200/60", soft: "bg-blue-600/10" },
  emerald: { text: "text-emerald-600", border: "border-emerald-200/60", soft: "bg-emerald-600/10" },
};

const ICONS: Record<string, LucideIcon> = {
  BarChart3,
  BookOpen,
  CheckCircle,
  Cpu,
  Database,
  FileText,
  Globe2,
  Handshake,
  MessageSquare,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
};

/** Renders the icon named in the service data, falling back to a neutral mark. */
export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? HelpCircle;
  return <Icon className={className} aria-hidden="true" />;
}
