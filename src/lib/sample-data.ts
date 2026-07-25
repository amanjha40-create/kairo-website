export type Status = "Pending" | "In Review" | "Verified" | "Rejected";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: Status;
  type: "Identity" | "Employment" | "Education" | "Criminal" | "Full package";
  updated: string;
  initials: string;
}

export const candidates: Candidate[] = [
  { id: "c_8x21", name: "Alex Mitchell", email: "alex.mitchell@harmonic.ai", company: "Harmonic AI", role: "Senior Software Engineer", status: "In Review", type: "Full package", updated: "2 hours ago", initials: "AM" },
  { id: "c_8x22", name: "Priya Raman", email: "priya@cyntra.io", company: "Cyntra Techlabs", role: "Product Manager", status: "Verified", type: "Employment", updated: "1 day ago", initials: "PR" },
  { id: "c_8x23", name: "Marcus Chen", email: "m.chen@morningstar.com", company: "Morningstar", role: "Data Analyst", status: "Verified", type: "Education", updated: "3 days ago", initials: "MC" },
  { id: "c_8x24", name: "Sofia Alvarez", email: "sofia@bakertilly.com", company: "Bakertilly DHC", role: "Consultant", status: "Pending", type: "Identity", updated: "5 hours ago", initials: "SA" },
  { id: "c_8x25", name: "James Okafor", email: "j.okafor@stripe.com", company: "Stripe", role: "Engineering Manager", status: "Rejected", type: "Criminal", updated: "Yesterday", initials: "JO" },
  { id: "c_8x26", name: "Emma Thompson", email: "emma.t@linear.app", company: "Linear", role: "Designer", status: "Verified", type: "Full package", updated: "4 days ago", initials: "ET" },
  { id: "c_8x27", name: "Rahul Sharma", email: "rahul@ramp.com", company: "Ramp", role: "Account Executive", status: "In Review", type: "Employment", updated: "6 hours ago", initials: "RS" },
  { id: "c_8x28", name: "Yuki Tanaka", email: "yuki@notion.so", company: "Notion", role: "Software Engineer", status: "Pending", type: "Identity", updated: "12 hours ago", initials: "YT" },
];

export const statusStyles: Record<Status, string> = {
  Pending: "bg-warning/15 text-warning-foreground border-warning/30",
  "In Review": "bg-info/15 text-info-foreground border-info/30",
  Verified: "bg-success/15 text-success border-success/30",
  Rejected: "bg-destructive/10 text-destructive border-destructive/30",
};
