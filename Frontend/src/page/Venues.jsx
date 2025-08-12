import React, { useState, useMemo } from "react";
import venuesData from "../data/venues";
import "../index.css";
import Header from "../components/Header";

const PAGE_SIZE = 9;

const Venues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sportFilter, setSportFilter] = useState("All");
  const [venueTypeFilter, setVenueTypeFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");

  // Unique sports for filter dropdown
  const sports = useMemo(() => {
    const allSports = venuesData.map((v) => v.sport);
    return ["All", ...Array.from(new Set(allSports))];
  }, []);

  // Filtered venues based on filters and search
  const filteredVenues = useMemo(() => {
    return venuesData.filter((venue) => {
      const matchesSearch =
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.sport.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSport =
        sportFilter === "All" || venue.sport === sportFilter;
      const matchesVenueType =
        venueTypeFilter === "All" || venue.type === venueTypeFilter;
      const matchesRating = venue.rating >= ratingFilter;
      const matchesPrice =
        venue.price >= priceRange[0] && venue.price <= priceRange[1];
      return (
        matchesSearch &&
        matchesSport &&
        matchesVenueType &&
        matchesRating &&
        matchesPrice
      );
    });
  }, [searchTerm, sportFilter, venueTypeFilter, ratingFilter, priceRange]);

  // Sorted venues based on sort option
  const sortedVenues = useMemo(() => {
    let sorted = [...filteredVenues];
    switch (sortOption) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredVenues, sortOption]);

  // Pagination
  const totalPages = Math.ceil(sortedVenues.length / PAGE_SIZE);
  const paginatedVenues = sortedVenues.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Handlers
  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([0, value]);
    setCurrentPage(1);
  };

  const handleRatingChange = (e) => {
    setRatingFilter(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSportFilter("All");
    setVenueTypeFilter("All");
    setRatingFilter(0);
    setPriceRange([0, 10000]);
    setSortOption("default");
    setCurrentPage(1);
  };

  return (
      <>
        <Header />
        <div className="w-full text-center py-4 text-lg font-semibold border-b border-gray-300">
          Sports Venues in Ahmedabad: Discover and Book Nearby Venues
        </div>
      <div className="venues-page flex flex-col md:flex-row md:gap-6 p-6 w-full pb-20">
        {/* Filters */}
        <aside className="filters w-full md:w-1/4 p-4 border rounded-md mb-4 md:mb-0 bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <input
            type="text"
            placeholder="Search for venue"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <div className="mb-4">
            <label className="block font-semibold mb-1">Sport Type</label>
            <select
              value={sportFilter}
              onChange={(e) => {
                setSportFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              {sports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Venue Type</label>
            <select
              value={venueTypeFilter}
              onChange={(e) => {
                setVenueTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="All">All</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Max Price (₹)</label>
            <input
              type="range"
              min="0"
              max="10000"
              step="50"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full"
            />
            <div>Up to ₹{priceRange[1]}</div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Minimum Rating</label>
            <select
              value={ratingFilter}
              onChange={handleRatingChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value={0}>All Ratings</option>
              <option value={4}>4 stars & up</option>
              <option value={3}>3 stars & up</option>
              <option value={2}>2 stars & up</option>
              <option value={1}>1 star & up</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Sort By</label>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
          <button
            onClick={clearFilters}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Clear Filters
          </button>
        </aside>

        {/* Venue Cards */}
        <section className="venue-cards w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedVenues.map((venue) => (
            <div
              key={venue.id}
              className="border rounded-md p-4 flex flex-col shadow hover:shadow-lg transition bg-white"
            >
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold text-lg mb-1">{venue.name}</h3>
              <div className="flex items-center text-yellow-500 mb-1">
                <span>⭐ {venue.rating}</span>
                <span className="ml-2 text-gray-600">({venue.reviews})</span>
              </div>
              <div className="text-gray-700 mb-1">{venue.location}</div>
              <div className="text-green-700 font-semibold mb-3">
                ₹ {venue.price} per hour
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {venue.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="bg-green-300 hover:bg-green-400 text-green-900 px-4 py-2 rounded self-start transition cursor-pointer">
                View Details
              </button>
            </div>
          ))}
        </section>

        {/* Pagination */}
        <div className="pagination fixed bottom-0 left-0 w-full bg-white z-50 flex justify-center items-center mt-4 py-2 border-t border-gray-300">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-l disabled:opacity-50 hover:bg-purple-600 hover:text-white transition"
          >
            {'<'}
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 border-t border-b ${
                currentPage === idx + 1
                  ? "bg-purple-600 text-white"
                  : "hover:bg-purple-100"
              } transition cursor-pointer`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-r disabled:opacity-50 hover:bg-purple-600 hover:text-white transition cursor-pointer"
          >
            {'>'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Venues;
