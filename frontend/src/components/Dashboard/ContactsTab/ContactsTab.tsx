import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import API from "@/services/api";

import {
  Contact,
  ContactCard,
  ContactStats,
  ContactSearch,
  ContactEditModal,
  CountryStat,
} from ".";

interface ContactsTabProps {
  contacts?: Contact[];
  searchField: string;
  setSearchField: (val: string) => void;
  searchValue: string;
  setSearchValue: (val: string) => void;
  handleSearch: () => void;
  handleReset: () => void;
  recentContacts?: Contact[];
  statsByCompany?: CountryStat[];
  loadingContacts: boolean;
  searchError?: string;
}

export default function ContactsTab({
  contacts = [],
  searchField,
  setSearchField,
  searchValue,
  setSearchValue,
  handleSearch,
  recentContacts = [],
  statsByCompany = [],
  loadingContacts,
  searchError,
  handleReset,
}: ContactsTabProps) {
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingContact) return;

    try {
      const original = contacts.find((c) => c._id === editingContact._id);
      if (!original) return;

      const changedFields: string[] = [];
      if (editingContact.name !== original.name) changedFields.push("Name");
      if (editingContact.email !== original.email) changedFields.push("Email");
      if (editingContact.phone !== original.phone) changedFields.push("Phone");

      await API.put(`/contact/${editingContact._id}`, editingContact, {
        withCredentials: true,
      });

      setIsEditModalOpen(false);
      handleReset();

      toast.success(
        changedFields.length > 0
          ? "Contact updated"
          : "No changes made",
        {
          description:
            changedFields.length > 0
              ? `Updated field(s): ${changedFields.join(", ")}`
              : "All fields were already up to date.",
        }
      );
    } catch (error: any) {
      console.error("Error updating contact:", error);
      toast.error("Failed to update contact", {
        description: error?.response?.data?.message || "An unknown error occurred.",
      });
    }
  };

  const handleDelete = async (contactId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/contact/${contactId}`, {
        withCredentials: true,
      });

      toast.success("Contact deleted successfully.");
      handleReset();
    } catch (error: any) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact", {
        description: error?.response?.data?.message || "An unknown error occurred.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Inquiries</h2>
        <Badge variant="secondary">{contacts.length} total</Badge>
      </div>

      {/* Search Section */}
      <ContactSearch
        searchField={searchField}
        setSearchField={setSearchField}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        handleReset={handleReset}
        searchError={searchError}
      />

      {/* Stats Section */}
      <ContactStats
        recentContacts={recentContacts}
        statsByCompany={statsByCompany}
      />

      {/* Contact List */}
      <div className="space-y-4">
        {loadingContacts ? (
          <p>Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <p className="text-muted-foreground">No contact inquiries available.</p>
        ) : (
          contacts.map((contact) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingContact && (
        <ContactEditModal
          contact={editingContact}
          onChange={setEditingContact}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
