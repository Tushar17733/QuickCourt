import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

const venuesData = [
  {
    id: 1,
    name: "SBR Badminton Arena",
    sport: "Badminton",
    type: "Indoor",
    price: 250,
    rating: 4.5,
    reviews: 6,
    location: "Vaishnodevi Cir",
    tags: ["Badminton", "Indoor", "Top Rated"],
    image: "https://via.placeholder.com/300x200?text=Badminton",
  },
  {
    id: 2,
    name: "Arena Cricket Ground",
    sport: "Cricket",
    type: "Outdoor",
    price: 500,
    rating: 4.0,
    reviews: 12,
    location: "Thaltej",
    tags: ["Cricket", "Outdoor", "Budget"],
    image: "https://via.placeholder.com/300x200?text=Cricket",
  },
  {
    id: 3,
    name: "Elite Football Turf",
    sport: "Football",
    type: "Outdoor",
    price: 700,
    rating: 5.0,
    reviews: 30,
    location: "SG Highway",
    tags: ["Football", "Outdoor", "Top Rated"],
    image: "https://via.placeholder.com/300x200?text=Football",
  },
  {
    id: 4,
    name: "City Swimming Pool",
    sport: "Swimming",
    type: "Indoor",
    price: 300,
    rating: 3.5,
    reviews: 8,
    location: "Maninagar",
    tags: ["Swimming", "Indoor"],
    image: "https://via.placeholder.com/300x200?text=Swimming",
  },
  {
    id: 5,
    name: "Pro Table Tennis Hall",
    sport: "Table Tennis",
    type: "Indoor",
    price: 200,
    rating: 4.2,
    reviews: 10,
    location: "Satellite",
    tags: ["Table Tennis", "Indoor", "Budget"],
    image: "https://via.placeholder.com/300x200?text=Table+Tennis",
  },
  {
    id: 6,
    name: "Tennis Club Court",
    sport: "Tennis",
    type: "Outdoor",
    price: 400,
    rating: 4.8,
    reviews: 15,
    location: "Navrangpura",
    tags: ["Tennis", "Outdoor", "Top Rated"],
    image: "https://via.placeholder.com/300x200?text=Tennis",
  },
];

const SPORTS = ["All Sport", "Badminton", "Cricket", "Football", "Swimming", "Table Tennis", "Tennis"];
const ITEMS_PER_PAGE = 9;

export default function Venues() {
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("All Sport");
  const [typeFilter, setTypeFilter] = useState("All"); // "All", "Indoor", "Outdoor"
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(5500);
  const [ratingFilter, setRatingFilter] = useState(0); // 0 means no star filter
  const [page, setPage] = useState(1);

  const PRICE_BOUNDS = useMemo(() => {
    const prices = venuesData.map((v) => v.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, []);

  useEffect(() => {
    setPriceMin(PRICE_BOUNDS.min);
    setPriceMax(PRICE_BOUNDS.max);
  }, [PRICE_BOUNDS.min, PRICE_BOUNDS.max]);

  const filteredVenues = useMemo(() => {
    const q = search.trim().toLowerCase();
    return venuesData.filter((v) => {
      const matchesSearch =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.sport.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q);

      const matchesSport = sportFilter === "All Sport" || v.sport === sportFilter;

      const matchesType = typeFilter === "All" || v.type === typeFilter;

      const matchesPrice = v.price >= priceMin && v.price <= priceMax;

      const matchesRating = ratingFilter === 0 || v.rating >= ratingFilter;

      return matchesSearch && matchesSport && matchesType && matchesPrice && matchesRating;
    });
  }, [search, sportFilter, typeFilter, priceMin, priceMax, ratingFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredVenues.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentVenues = filteredVenues.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSearch("");
    setSportFilter("All Sport");
    setTypeFilter("All");
    setPriceMin(PRICE_BOUNDS.min);
    setPriceMax(PRICE_BOUNDS.max);
    setRatingFilter(0);
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-300">
        <div className="font-bold text-lg">QUICKCOURT</div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 border border-gray-400 rounded px-3 py-1 text-sm hover:bg-gray-100 transition">
            Book
          </button>
          <button className="flex items-center gap-2 border border-gray-400 rounded px-3 py-1 text-sm hover:bg-gray-100 transition">
            Login / Sign Up
          </button>
        </div>
      </header>

      {/* Title */}
      <div className="text-center py-3 font-mono italic border-b border-gray-300">
        Sports Venues in <em>Ahmedabad</em>: Discover and Book Nearby Venues
      </div>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 p-4 border-r border-gray-300 flex flex-col gap-4">
          {/* Search */}
          <div>
            <label className="text-xs font-semibold block mb-1">Search by venue name</label>
            <input
              type="text"
              placeholder="Search for venue"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded px-2 py-1 border bg-gray-100 text-black text-sm"
            />
          </div>

          {/* Sport Filter */}
          <div>
            <label className="text-xs font-semibold block mb-1">Filter by sport type</label>
            <select
              className="w-full rounded px-2 py-1 border bg-gray-100 text-black text-sm"
              value={sportFilter}
              onChange={(e) => {
                setSportFilter(e.target.value);
                setPage(1);
              }}
            >
              {SPORTS.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label className="text-xs font-semibold block mb-1">Price range (per hour)</label>
            <div className="flex items-center gap-2 text-xs">
              <input
                type="number"
                min={PRICE_BOUNDS.min}
                max={priceMax}
                value={priceMin}
                onChange={(e) => {
                  setPriceMin(Number(e.target.value));
                  setPage(1);
                }}
                className="w-20 rounded px-2 py-1 border bg-gray-100 text-black"
              />
              <span>-</span>
              <input
                type="number"
                min={priceMin}
                max={PRICE_BOUNDS.max}
                value={priceMax}
                onChange={(e) => {
                  setPriceMax(Number(e.target.value));
                  setPage(1);
                }}
                className="w-20 rounded px-2 py-1 border bg-gray-100 text-black"
              />
            </div>
          </div>

          {/* Venue Type */}
          <div>
            <div className="font-semibold text-xs mb-1">Choose Venue Type</div>
            <div className="flex flex-col gap-1 text-xs">
              {["Indoor", "Outdoor"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="venueType"
                    checked={typeFilter === type}
                    onChange={() => {
                      setTypeFilter(type);
                      setPage(1);
                    }}
                  />
                  {type}
                </label>
              ))}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="venueType"
                  checked={typeFilter === "All"}
                  onChange={() => {
                    setTypeFilter("All");
                    setPage(1);
                  }}
                />
                All
              </label>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <div className="font-semibold text-xs mb-1">Rating</div>
            <div className="flex flex-col gap-1 text-xs">
              {[4, 3, 2, 1].map((star) => (
                <label key={star} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={ratingFilter === star}
                    onChange={() => {
                      setRatingFilter(ratingFilter === star ? 0 : star);
                      setPage(1);
                    }}
                  />
                  {star} stars & up
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </aside>

        {/* Venues Grid */}
        <main className="flex-grow p-4 grid grid-cols-3 gap-4 overflow-auto">
          {currentVenues.length === 0 ? (
            <div className="col-span-full p-8 bg-gray-50 text-center rounded-md border">
              No venues match your filters.
            </div>
          ) : (
            currentVenues.map((venue) => (
              <article
                key={venue.id}
                className="border border-gray-300 rounded p-2 flex flex-col gap-2 shadow-sm hover:shadow-lg bg-gray-100"
              >
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full rounded aspect-[4/3] object-cover"
                />
                <div className="flex justify-between text-xs font-semibold">
                  <div>{venue.name}</div>
                  <div className="flex items-center gap-1">
                    <span>{venue.rating}</span>⭐
                    <span>({venue.reviews})</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 flex items-center gap-1">
                  📍 {venue.location}
                </div>
                <div className="text-xs font-semibold">₹ {venue.price} / 1 hr</div>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {venue.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-gray-300 text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="bg-green-600 text-xs text-white py-1 rounded mt-auto hover:bg-green-700 transition">
                  View Details
                </button>
              </article>
            ))
          )}
        </main>
      </div>

      {/* Pagination */}
      <nav className="flex justify-center items-center gap-2 p-4 border-t border-gray-300 bg-gray-100">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 rounded border border-gray-500 disabled:opacity-50"
        >
          {'<'}
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              page === i + 1
                ? "bg-purple-600 text-white"
                : "border-gray-500 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-1 rounded border border-gray-500 disabled:opacity-50"
        >
          {'>'}
        </button>
      </nav>
    </div>
  );
}
