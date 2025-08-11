import React, { useEffect, useState, KeyboardEvent } from "react";
import API from "@/services/api";
import { Project } from "./types";
import { iconOptions } from "./iconMap";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface Props {
  initialData: Project | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const badgeOptions = ["none", "Popular", "Featured", "New", "Enterprise"] as const;

const durationOptions = [
  "1 Month",
  "2 Month",
  "3 Month",
  "4 Month",
  "5 Month",
  "6 Month",
  "7 Month",
  "8 Month",
  "9 Month",
  "10 Month",
  "11 Month",
  "1 Year",
  "1 and Half Year",
  "2 Years",
] as const;

const teamSizeOptions = [
  "1 specialists",
  "2 specialists",
  "3 specialists",
  "4 specialists",
  "5 specialists",
  "6 specialists",
  "7 specialists",
  "8 specialists",
  "9 specialists",
  "10 specialists",
  "11 specialists",
  "12 specialists",
  "13 specialists",
  "14 specialists",
  "15 specialists",
  "16 specialists",
  "17 specialists",
  "18 specialists",
  "19 specialists",
  "20 specialists",
] as const;

const ProjectForm: React.FC<Props> = ({ initialData, onClose, onSuccess }) => {
  const [form, setForm] = useState<Project>({
    icon: "Brain",
    company_name: "",
    title: "",
    description: "",
    duration: "1 Month",
    team_size: "1 specialists",
    key_results: [],
    technologies_used: [],
    badge: "",
    color: "primary",
    process: "Completed",
    date: [],
    isActive: true,
  });

  const [krInput, setKrInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [customBadge, setCustomBadge] = useState("");

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setKrInput("");
      setTechInput("");
      setDateInput(initialData.date?.[0] || "");

      const b = (initialData.badge || "").trim();
      if (b && !(badgeOptions as readonly string[]).includes(b as any)) {
        setCustomBadge(b);
      } else {
        setCustomBadge("");
      }
    }
  }, [initialData]);

  const addToken = (value: string, key: "key_results" | "technologies_used") => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setForm((f) => {
      const arr = f[key] || [];
      if (arr.includes(trimmed)) return f;
      return { ...f, [key]: [...arr, trimmed] };
    });
  };

  const removeToken = (value: string, key: "key_results" | "technologies_used") => {
    setForm((f) => ({
      ...f,
      [key]: (f[key] || []).filter((v) => v !== value),
    }));
  };

  const handleKRKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addToken(krInput, "key_results");
      setKrInput("");
    }
  };

  const handleTechKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addToken(techInput, "technologies_used");
      setTechInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload: Project = {
        ...form,
        date: dateInput ? [dateInput] : [],
      };

      if (isEdit && form._id) {
        await API.put(`/projects/${form._id}`, payload);
        toast.success("Project updated");
      } else {
        await API.post("/projects/create", payload);
        toast.success("Project created");

        setForm({
          icon: "Brain",
          company_name: "",
          title: "",
          description: "",
          duration: "1 Month",
          team_size: "1 specialists",
          key_results: [],
          technologies_used: [],
          badge: "",
          color: "primary",
          process: "Completed",
          date: [],
          isActive: true,
        });
        setKrInput("");
        setTechInput("");
        setDateInput("");
        setCustomBadge("");
      }

      onSuccess?.();
      onClose();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-h-[85vh] overflow-y-auto p-1">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Icon */}
          <div>
            <label className="text-sm font-medium">Icon</label>
            <Select
              value={form.icon}
              onValueChange={(val) =>
                setForm((f) => ({ ...f, icon: val as Project["icon"] }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((icon) => (
                  <SelectItem key={icon} value={icon}>
                    {icon}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Company Name */}
          <div>
            <label className="text-sm font-medium">Company Name</label>
            <Input
              value={form.company_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, company_name: e.target.value }))
              }
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              required
            />
          </div>

          {/* Duration & Team Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Duration</label>
              <Select
                value={form.duration}
                onValueChange={(val) =>
                  setForm((f) => ({
                    ...f,
                    duration: val as Project["duration"],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Team Size</label>
              <Select
                value={form.team_size}
                onValueChange={(val) =>
                  setForm((f) => ({
                    ...f,
                    team_size: val as Project["team_size"],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Team Size" />
                </SelectTrigger>
                <SelectContent>
                  {teamSizeOptions.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Key Results */}
          <div>
            <label className="text-sm font-medium mb-1 block">Key Results</label>
            <div className="flex flex-wrap gap-2 mb-2 max-h-48 overflow-y-auto border rounded p-2">
              {(form.key_results || []).map((kr) => (
                <div
                  key={kr}
                  className="bg-muted rounded-full px-3 py-1 flex items-center gap-2"
                >
                  <span>{kr}</span>
                  <button
                    type="button"
                    onClick={() => removeToken(kr, "key_results")}
                    className="text-xs font-bold leading-none hover:text-red-600"
                    aria-label={`Remove key result ${kr}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <Input
              placeholder="Type a key result and press Enter or comma"
              value={krInput}
              onChange={(e) => setKrInput(e.target.value)}
              onKeyDown={handleKRKeyDown}
            />
          </div>

          {/* Technologies Used */}
          <div>
            <label className="text-sm font-medium mb-1 block">Technologies Used</label>
            <div className="flex flex-wrap gap-2 mb-2 max-h-48 overflow-y-auto border rounded p-2">
              {(form.technologies_used || []).map((tech) => (
                <div
                  key={tech}
                  className="bg-muted rounded-full px-3 py-1 flex items-center gap-2"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeToken(tech, "technologies_used")}
                    className="text-xs font-bold leading-none hover:text-red-600"
                    aria-label={`Remove technology ${tech}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <Input
              placeholder="Type a technology and press Enter or comma"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleTechKeyDown}
            />
          </div>

          {/* Project Date */}
          <div>
            <label className="text-sm font-medium">Project Date</label>
            <Input
              placeholder="e.g., 2024 or 2024-05"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </div>

          {/* Badge  */}
          <div>
            <label className="text-sm font-medium mb-1 block">Badge</label>

            <div className="flex items-center gap-4">
              <div className="flex-1 min-w-[150px]">
                <Select
                  value={
                    form.badge === ""
                      ? "none"
                      : (badgeOptions as readonly string[]).includes(form.badge as any)
                      ? (form.badge as string)
                      : "custom"
                  }
                  onValueChange={(val) => {
                    if (val === "custom") {
                      setForm((f) => ({ ...f, badge: customBadge }));
                    } else if (val === "none") {
                      setForm((f) => ({ ...f, badge: "" }));
                    } else {
                      setForm((f) => ({ ...f, badge: val as Project["badge"] }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Badge" />
                  </SelectTrigger>
                  <SelectContent>
                    {(badgeOptions as readonly string[]).map((badge) => (
                      <SelectItem key={badge} value={badge}>
                        {badge === "none" ? "None" : badge}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {form.badge === customBadge && (
                <Input
                  className="flex-1 min-w-[150px]"
                  placeholder="Type your custom badge"
                  value={customBadge}
                  onChange={(e) => {
                    const v = e.target.value;
                    setCustomBadge(v);
                    setForm((f) => ({ ...f, badge: v }));
                  }}
                />
              )}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="text-sm font-medium">Color</label>
            <Select
              value={form.color}
              onValueChange={(val) =>
                setForm((f) => ({ ...f, color: val as Project["color"] }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Color" />
              </SelectTrigger>
              <SelectContent>
                {["primary", "secondary", "accent"].map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Process */}
          <div>
            <label className="text-sm font-medium">Process</label>
            <Select
              value={form.process}
              onValueChange={(val) =>
                setForm((f) => ({ ...f, process: val as Project["process"] }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Process" />
              </SelectTrigger>
              <SelectContent>
                {["Completed", "Ongoing"].map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Is Active?</span>
            <Switch
              checked={!!form.isActive}
              onCheckedChange={(val) => setForm((f) => ({ ...f, isActive: val }))}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{isEdit ? "Update" : "Create"} Project</Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
