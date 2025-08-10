import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, Mail, Phone, Building, Globe, Key, Pencil, Trash2
} from "lucide-react";
import { Contact } from "./types";

interface Props {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactCard({ contact, onEdit, onDelete }: Props) {
  return (
    <Card>
      <CardContent className="p-6 soace-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-semibold">{contact.name}</span>
              <Badge variant="outline">{contact.job_title}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Key className="w-3 h-3" />
              <strong>ID:</strong>&nbsp;{contact._id}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              {contact.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              {contact.phone}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                {contact.company_name}
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {contact.country}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium mb-2">Job Requirements:</h4>
              <div className="space-y-2">
                {contact.messages?.length ? (
                  contact.messages.map((msg, index) => (
                    <div key={msg._id || `${contact._id}-msg-${index}`} className="text-sm text-muted-foreground bg-muted p-3 rounded">
                      {index + 1}. {msg.message}
                      <div className="text-xs mt-1">
                        Submitted at: {new Date(msg.submitted_at).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : contact.message ? (
                  <div className="text-sm text-muted-foreground bg-muted p-3 rounded">
                    {contact.message}
                    <div className="text-xs mt-1">
                      Submitted at: {new Date(contact.created_at || "").toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <p className="italic text-sm text-muted-foreground">No message available.</p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Received: {new Date(contact.created_at || "").toLocaleString()}
              </span>
              <div className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(contact)}>
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => onDelete(contact._id)}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
