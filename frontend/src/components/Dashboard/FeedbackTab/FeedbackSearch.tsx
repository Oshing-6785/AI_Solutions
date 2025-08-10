import { Button } from "@/components/ui/button";

interface Props {
  searchField: string;
  setSearchField: (val: string) => void;
  searchValue: string;
  setSearchValue: (val: string) => void;
  handleSearch: () => void;
  handleReset: () => void;
  searchError?: string;
}

export default function FeedbackSearch({
  searchField,
  setSearchField,
  searchValue,
  setSearchValue,
  handleSearch,
  handleReset,
  searchError,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="_id">ID</option>
            <option value="name">Name</option>
            <option value="company">Company</option>
          </select>
          <input
            type="text"
            placeholder={`Enter ${searchField}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border px-3 py-1 rounded w-64"
          />
          <Button size="sm" onClick={handleSearch}>
            Search
          </Button>
        </div>
        {searchError && <p className="text-red-500 text-sm ml-1">{searchError}</p>}
      </div>
      <Button type="button" size="sm" variant="ghost" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
}
