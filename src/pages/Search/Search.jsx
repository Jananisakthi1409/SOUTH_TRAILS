import { useState } from "react";
import { useLocation } from "react-router-dom";
import { EmptyState } from "../../components/ui/EmptyState";

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would update URL and fetch results
  };

  const tabs = [
    { id: "all", label: "All Results" },
    { id: "destinations", label: "Destinations" },
    { id: "packages", label: "Packages" },
    { id: "experiences", label: "Experiences" },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search South Trails..."
              className="w-full rounded-2xl border border-white/20 bg-[#022c22] py-6 pl-8 pr-16 text-xl text-white placeholder-white/30 focus:border-[#0b6b43] focus:outline-none focus:ring-1 focus:ring-[#0b6b43] shadow-luxury"
              autoFocus
            />
            <button 
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0b6b43] text-black transition hover:bg-white"
            >
              🔍
            </button>
          </div>
        </form>

        <div className="mb-8 flex gap-2 border-b border-white/10 pb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-12">
          <EmptyState
            icon="🔍"
            title="No results found"
            description={query ? `We couldn't find anything matching "${query}". Try adjusting your search terms.` : "Enter a destination, package name, or experience to start searching."}
            actionText="Explore Destinations"
            actionLink="/explore"
          />
        </div>
      </div>
    </main>
  );
};

export default Search;
