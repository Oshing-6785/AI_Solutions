import API from "@/services/api";

export function mediaUrl(p?: string) {
  if (!p) return "";

  let norm = p.replace(/\\/g, "/");

  if (/^https?:\/\//i.test(norm)) return norm;

  norm = norm.replace(/^public\//i, "");

  const idx = norm.indexOf("/uploads/");
  if (idx > -1) norm = norm.slice(idx);

  if (!norm.startsWith("/")) norm = `/${norm}`;

  const base =
    (API.defaults.baseURL && API.defaults.baseURL.replace(/\/+$/, "")) ||
    window.location.origin;

  return `${base}${norm}`;
}
