import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import API from "../services/api";
import Header from "../components/Dashboard/Header/Header";
import OverviewCards from "../components/Dashboard/OverviewCards/OverviewCards";
import ContactsTab from "../components/Dashboard/ContactsTab/ContactsTab";
import FeedbackTab from "../components/Dashboard/FeedbackTab/FeedbackTab";
import ContentTab from "../components/Dashboard/ContentTab/ContentTab";
import TabsNavigation from "../components/Dashboard/TabsNavigation/TabsNavigation";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Contact states
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [searchField, setSearchField] = useState("email");
  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchError] = useState("");
  const [recentContacts, setRecentContacts] = useState([]);
  const [statsByCompany, setStatsByCompany] = useState([]);

  // Feedback states
  const [feedbacks, setFeedbacks] = useState([]);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [feedbackSearchField, setFeedbackSearchField] = useState("name");
  const [feedbackSearchValue, setFeedbackSearchValue] = useState("");
  const [feedbackSearchError, setFeedbackSearchError] = useState("");

  const handleLogout = async () => {
    try {
      const response = await API.get("/admin/logout", {}, { withCredentials: true });
      if (response.status === 201) {
        window.location.href = "/admin/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await API.get("/contact", { withCredentials: true });
        setContacts(response.data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoadingContacts(false);
      }
    };

    const fetchExtraData = async () => {
      try {
        const [recentRes, statsRes] = await Promise.all([
          API.get("/contact/recent", { withCredentials: true }),
          API.get("/contact/stats", { withCredentials: true }),
        ]);
        setRecentContacts(
          Array.isArray(recentRes.data.contacts)
            ? recentRes.data.contacts
            : [recentRes.data.contact]
        );
        setStatsByCompany(statsRes.data.stats);
      } catch (error) {
        console.error("Error fetching stats/recent:", error);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const [all, recent] = await Promise.all([
          API.get("/feedback", { withCredentials: true }),
          API.get("/feedback/recent", { withCredentials: true }),
        ]);
        setFeedbacks(all.data.feedbacks ?? []);
        setRecentFeedbacks(recent.data.feedbacks ?? []);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoadingFeedbacks(false);
      }
    };

    fetchContacts();
    fetchExtraData();
    fetchFeedbacks();
  }, []);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    try {
      let url = "";

      switch (searchField) {
        case "_id":
          url = `/contact/${searchValue}`;
          break;
        case "email":
          url = `/contact/email/${searchValue}`;
          break;
        case "phone":
          url = `/contact/phone/${searchValue}`;
          break;
        case "name":
          url = `/contact/name/${searchValue}`;
          break;
        case "company":
          url = `/contact/company/${searchValue}`;
          break;
        case "country":
          url = `/contact/country/${searchValue}`;
          break;
        case "job":
          url = `/contact/job/${searchValue}`;
          break;
        default:
          setSearchError("Invalid search field selected.");
          return;
      }

      const response = await API.get(url, { withCredentials: true });
      const data = response.data;

      if (Array.isArray(data.contacts)) {
        if (data.contacts.length === 0) {
          setSearchError("No matching contacts found.");
        } else {
          setSearchError("");
        }
        setContacts(data.contacts);
      } else if (data.contact) {
        setSearchError("");
        setContacts([data.contact]);
      } else {
        setSearchError("No matching contacts found.");
        setContacts([]);
      }
    } catch (error) {
      console.error("Error during search:", error);
      setSearchError("Error: Invalid input or server error.");
      setContacts([]);
    }
  };

  const handleReset = async () => {
    setSearchField("email");
    setSearchValue("");
    setSearchError("");
    setLoadingContacts(true);

    try {
      const response = await API.get("/contact", { withCredentials: true });
      setContacts(response.data.contacts);
    } catch (error) {
      console.error("Error resetting contacts:", error);
      setSearchError("Failed to reset contacts.");
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleFeedbackSearch = async () => {
    if (!feedbackSearchValue.trim()) return;

    try {
      let url = "";

      switch (feedbackSearchField) {
        case "_id":
          url = `/feedback/${feedbackSearchValue}`;
          break;
        case "name":
          url = `/feedback/name/${feedbackSearchValue}`;
          break;
        case "company":
          url = `/feedback/company/${feedbackSearchValue}`;
          break;
        default:
          setFeedbackSearchError("Invalid search field selected.");
          return;
      }

      const response = await API.get(url, { withCredentials: true });
      const data = response.data;

      if (Array.isArray(data.feedbacks)) {
        if (data.feedbacks.length === 0) {
          setFeedbackSearchError("No matching feedbacks found.");
        } else {
          setFeedbackSearchError("");
        }
        setFeedbacks(data.feedbacks);
      } else if (data.feedback) {
        setFeedbackSearchError("");
        setFeedbacks([data.feedback]);
      } else {
        setFeedbackSearchError("No matching feedbacks found.");
        setFeedbacks([]);
      }
    } catch (error) {
      console.error("Error during feedback search:", error);
      setFeedbackSearchError("Error: Invalid input or server error.");
      setFeedbacks([]);
    }
  };

  const handleFeedbackReset = async () => {
    setFeedbackSearchField("name");
    setFeedbackSearchValue("");
    setFeedbackSearchError("");
    setLoadingFeedbacks(true);

    try {
      const response = await API.get("/feedback", { withCredentials: true });
      setFeedbacks(response.data.feedbacks ?? []);
    } catch (error) {
      console.error("Error resetting feedbacks:", error);
      setFeedbackSearchError("Failed to reset feedbacks.");
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/feedback/${id}`, { withCredentials: true });
      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
      setRecentFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={handleLogout} />
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsNavigation />
          </TabsList>

          <TabsContent value="overview">
            {/* <OverviewCards contacts={contacts} /> */}
            <OverviewCards contacts={contacts} feedbacks={feedbacks} />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsTab
              contacts={contacts}
              searchField={searchField}
              setSearchField={setSearchField}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              handleSearch={handleSearch}
              recentContacts={recentContacts}
              statsByCompany={statsByCompany}
              loadingContacts={loadingContacts}
              searchError={searchError}
              handleReset={handleReset}
            />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackTab
              feedbacks={feedbacks}
              recentFeedbacks={recentFeedbacks}
              loadingFeedbacks={loadingFeedbacks}
              handleDelete={handleDeleteFeedback}
              searchField={feedbackSearchField}
              setSearchField={setFeedbackSearchField}
              searchValue={feedbackSearchValue}
              setSearchValue={setFeedbackSearchValue}
              handleSearch={handleFeedbackSearch}
              handleReset={handleFeedbackReset}
              searchError={feedbackSearchError}
            />
          </TabsContent>

          <TabsContent value="content">
            <ContentTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
