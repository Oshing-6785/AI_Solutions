import React, { useEffect, useState, KeyboardEvent } from "react";
import API from "@/services/api";
import { Solution } from "./types";
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
  initialData: Solution | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const badgeOptions = ["none", "Popular", "Featured", "New", "Enterprise"];

const SolutionForm: React.FC<Props> = ({ initialData, onClose, onSuccess }) => {
  const [form, setForm] = useState<Solution>({
    icon: "Brain",
    title: "",
    description: "",
    features: [],
    badge: "",
    color: "primary",
    isActive: true,
  });

  const [featureInput, setFeatureInput] = useState("");
  const [customBadge, setCustomBadge] = useState("");

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setFeatureInput("");
    }
  }, [initialData]);

  const addFeature = (feature: string) => {
    const trimmed = feature.trim();
    if (trimmed && !form.features.includes(trimmed)) {
      setForm((f) => ({
        ...f,
        features: [...f.features, trimmed],
      }));
    }
  };

  const removeFeature = (feature: string) => {
    setForm((f) => ({
      ...f,
      features: f.features.filter((ftr) => ftr !== feature),
    }));
  };

  const handleFeatureKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addFeature(featureInput);
      setFeatureInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await API.put(`/solutions/${form._id}`, form);
        toast.success("Solution updated");
      } else {
        await API.post("/solutions/create", form);
        toast.success("Solution created");

        setForm({
          icon: "Brain",
          title: "",
          description: "",
          features: [],
          badge: "",
          color: "primary",
          isActive: true,
        });
        setFeatureInput("");
      }
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Icon */}
      <div>
        <label className="text-sm font-medium">Icon</label>
        <Select
          value={form.icon}
          onValueChange={(val) =>
            setForm((f) => ({ ...f, icon: val as Solution["icon"] }))
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

      {/* Title */}
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input
          name="title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          name="description"
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          required
        />
      </div>

      {/* Features  */}
      <div>
        <label className="text-sm font-medium mb-1 block">Features</label>
        <div className="flex flex-wrap gap-2 mb-2 max-h-48 overflow-y-auto border rounded p-2">
          {form.features.map((feature) => (
            <div
              key={feature}
              className="bg-muted rounded-full px-3 py-1 flex items-center gap-2"
            >
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => removeFeature(feature)}
                className="text-xs font-bold leading-none hover:text-red-600"
                aria-label={`Remove feature ${feature}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <Input
          placeholder="Type feature and press Enter or comma"
          value={featureInput}
          onChange={(e) => setFeatureInput(e.target.value)}
          onKeyDown={handleFeatureKeyDown}
        />
      </div>

      {/* Badge */}
      <div>
        <label className="text-sm font-medium mb-1 block">Badge</label>

        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-[150px]">
            <Select
              value={
                form.badge === ""
                  ? "none"
                  : badgeOptions.includes(form.badge)
                  ? form.badge
                  : "custom"
              }
              onValueChange={(val) => {
                if (val === "custom") {
                  setForm((f) => ({ ...f, badge: customBadge }));
                } else if (val === "none") {
                  setForm((f) => ({ ...f, badge: "" }));
                } else {
                  setForm((f) => ({ ...f, badge: val as Solution["badge"] }));
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Badge" />
              </SelectTrigger>
              <SelectContent>
                {badgeOptions.map((badge) => (
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
                setCustomBadge(e.target.value);
                setForm((f) => ({ ...f, badge: e.target.value }));
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
            setForm((f) => ({ ...f, color: val as Solution["color"] }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Color" />
          </SelectTrigger>
          <SelectContent>
            {["primary", "secondary", "accent"].map((color) => (
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Is Active?</span>
        <Switch
          checked={form.isActive}
          onCheckedChange={(val) => setForm((f) => ({ ...f, isActive: val }))}
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <Button type="submit">{isEdit ? "Update" : "Create"} Solution</Button>
      </div>
    </form>
  );
};

export default SolutionForm;
