import React from "react";
import { Search as SearchIcon, QrCode } from "lucide-react";

interface SearchProps<T> {
    onSearch?: (query: string) => void;
    data: T[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setSearchResults: (results: T[]) => void;
    searchFields: (keyof T)[];
    placeholder?: string;
}

const Search = <T extends Record<string, any>>({
    onSearch,
    data,
    searchQuery,
    setSearchQuery,
    setSearchResults,
    searchFields,
    placeholder = "Search...",
}: SearchProps<T>) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (!query.trim()) {
            setSearchResults([]);
            onSearch?.("");
            return;
        }

        const queryLower = query.toLowerCase();
        const filteredResults = data.filter((item) =>
            searchFields.some((field) => {
                const value = item[field];
                return (
                    value && String(value).toLowerCase().includes(queryLower)
                );
            })
        );

        setSearchResults(filteredResults);
        onSearch?.(query);
    };

    return (
        <div className="relative w-full">
            <div className="flex items-center bg-white rounded-lg border border-gray-200 p-2 max-w-2xl mx-auto">
                <SearchIcon className="w-5 h-5 text-gray-400 mx-2" />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={handleSearch}
                    className="flex-1 border-none focus:ring-0 focus:outline-none"
                    aria-label={placeholder}
                />
                <button
                    className="p-2 text-gray-400 hover:text-gray-600"
                    aria-label="Scan QR Code"
                >
                    <QrCode className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Search;
