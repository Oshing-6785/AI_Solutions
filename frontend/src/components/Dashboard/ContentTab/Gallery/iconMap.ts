import {
  Presentation,
  Handshake,
  PartyPopper,
  MapPin,
  Award,
  Megaphone,
  Milestone,
  Building2,
} from "lucide-react";

export const categoryIconMap: Record<
  | "Conference"
  | "Client_Visit"
  | "Internal_Event"
  | "Demo"
  | "Recognition"
  | "Partnership"
  | "Keynote"
  | "Milestone"
  | "Office_Launch",
  React.ElementType
> = {
  Conference: Presentation,
  Client_Visit: Handshake,
  Internal_Event: PartyPopper,
  Demo: MapPin,
  Recognition: Award,
  Partnership: Handshake,
  Keynote: Megaphone,
  Milestone: Milestone,
  Office_Launch: Building2,
};
