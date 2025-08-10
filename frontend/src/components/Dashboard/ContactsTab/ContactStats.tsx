import { Card, CardContent } from "@/components/ui/card";
import { Contact, CountryStat } from "./types";

interface Props {
  recentContacts: Contact[];
  statsByCompany: CountryStat[];
}

export default function ContactStats({ recentContacts, statsByCompany }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium mb-2">Recent Contacts</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {recentContacts.map((c) => (
              <li key={c._id}>
                {c.name} - {new Date(c.created_at || "").toLocaleDateString()}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium mb-2">Contacts by Country</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {statsByCompany.map((s, i) => (
              <li key={`${s._id}-${i}`}>{s._id}: {s.count}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
