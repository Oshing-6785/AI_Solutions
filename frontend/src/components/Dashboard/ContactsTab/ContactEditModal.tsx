import { Button } from "@/components/ui/button";
import { Contact } from "./types";

interface Props {
  contact: Contact;
  onChange: (updated: Contact) => void;
  onClose: () => void;
  onSave: () => void;
}

export default function ContactEditModal({ contact, onChange, onClose, onSave }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-[90%] md:w-[500px]">
        <h2 className="text-xl font-bold mb-4">Edit Contact</h2>
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm">Name</span>
            <input
              className="border w-full px-2 py-1 rounded"
              value={contact.name}
              onChange={(e) => onChange({ ...contact, name: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-sm">Email</span>
            <input
              className="border w-full px-2 py-1 rounded"
              value={contact.email}
              onChange={(e) => onChange({ ...contact, email: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-sm">Phone</span>
            <input
              className="border w-full px-2 py-1 rounded"
              value={contact.phone}
              onChange={(e) => onChange({ ...contact, phone: e.target.value })}
            />
          </label>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
