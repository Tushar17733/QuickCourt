import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Avatar, AvatarImage } from './ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';

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
  {
    id: 7,
    name: "Downtown Basketball Court",
    sport: "Basketball",
    type: "Outdoor",
    price: 350,
    rating: 4.3,
    reviews: 9,
    location: "Downtown",
    tags: ["Basketball", "Outdoor", "Popular"],
    image: "/src/assets/basketball.jpg",
  },
  {
    id: 8,
    name: "City Yoga Studio",
    sport: "Yoga",
    type: "Indoor",
    price: 150,
    rating: 4.7,
    reviews: 14,
    location: "Central Park",
    tags: ["Yoga", "Indoor", "Relaxing"],
    image: "/src/assets/yoga.jpg",
  },
  {
    id: 9,
    name: "Mountain Climbing Gym",
    sport: "Climbing",
    type: "Indoor",
    price: 400,
    rating: 4.6,
    reviews: 11,
    location: "Hilltop",
    tags: ["Climbing", "Indoor", "Challenging"],
    image: "/src/assets/climbing.jpg",
  },
  {
    id: 10,
    name: "City Tennis Academy",
    sport: "Tennis",
    type: "Outdoor",
    price: 450,
    rating: 4.9,
    reviews: 20,
    location: "West End",
    tags: ["Tennis", "Outdoor", "Professional"],
    image: "https://via.placeholder.com/300x200?text=Tennis+Academy",
  },
  {
    id: 11,
    name: "Downtown Swimming Pool",
    sport: "Swimming",
    type: "Indoor",
    price: 320,
    rating: 4.1,
    reviews: 7,
    location: "Downtown",
    tags: ["Swimming", "Indoor", "Family Friendly"],
    image: "https://via.placeholder.com/300x200?text=Swimming+Pool",
  },
  {
    id: 12,
    name: "City Football Field",
    sport: "Football",
    type: "Outdoor",
    price: 600,
    rating: 4.4,
    reviews: 18,
    location: "East Side",
    tags: ["Football", "Outdoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Football+Field",
  },
  {
    id: 13,
    name: "Elite Badminton Court",
    sport: "Badminton",
    type: "Indoor",
    price: 280,
    rating: 4.7,
    reviews: 13,
    location: "North End",
    tags: ["Badminton", "Indoor", "Top Rated"],
    image: "https://via.placeholder.com/300x200?text=Badminton+Court",
  },
  {
    id: 14,
    name: "City Cricket Ground",
    sport: "Cricket",
    type: "Outdoor",
    price: 520,
    rating: 4.2,
    reviews: 15,
    location: "South Park",
    tags: ["Cricket", "Outdoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Cricket+Ground",
  },
  {
    id: 15,
    name: "Downtown Table Tennis Hall",
    sport: "Table Tennis",
    type: "Indoor",
    price: 210,
    rating: 4.3,
    reviews: 9,
    location: "Downtown",
    tags: ["Table Tennis", "Indoor", "Popular"],
    image: "/src/assets/tabletennis.jpg",
  },
  {
    id: 16,
    name: "City Tennis Court",
    sport: "Tennis",
    type: "Outdoor",
    price: 430,
    rating: 4.6,
    reviews: 12,
    location: "Central Park",
    tags: ["Tennis", "Outdoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Tennis+Court",
  },
  {
    id: 17,
    name: "Elite Swimming Pool",
    sport: "Swimming",
    type: "Indoor",
    price: 310,
    rating: 4.5,
    reviews: 14,
    location: "North End",
    tags: ["Swimming", "Indoor", "Top Rated"],
    image: "https://via.placeholder.com/300x200?text=Swimming+Pool",
  },
  {
    id: 18,
    name: "Downtown Football Field",
    sport: "Football",
    type: "Outdoor",
    price: 620,
    rating: 4.7,
    reviews: 20,
    location: "Downtown",
    tags: ["Football", "Outdoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Football+Field",
  },
  {
    id: 19,
    name: "City Basketball Court",
    sport: "Basketball",
    type: "Outdoor",
    price: 360,
    rating: 4.4,
    reviews: 11,
    location: "Central Park",
    tags: ["Basketball", "Outdoor", "Popular"],
    image: "/src/assets/basketball.jpg",
  },
  {
    id: 20,
    name: "Elite Yoga Studio",
    sport: "Yoga",
    type: "Indoor",
    price: 160,
    rating: 4.8,
    reviews: 15,
    location: "North End",
    tags: ["Yoga", "Indoor", "Relaxing"],
    image: "https://via.placeholder.com/300x200?text=Yoga+Studio",
  },
  {
    id: 21,
    name: "Downtown Climbing Gym",
    sport: "Climbing",
    type: "Indoor",
    price: 420,
    rating: 4.6,
    reviews: 13,
    location: "Downtown",
    tags: ["Climbing", "Indoor", "Challenging"],
    image: "https://via.placeholder.com/300x200?text=Climbing+Gym",
  },
  {
    id: 22,
    name: "City Basketball Arena",
    sport: "Basketball",
    type: "Indoor",
    price: 370,
    rating: 4.5,
    reviews: 14,
    location: "East Side",
    tags: ["Basketball", "Indoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Basketball+Arena",
  },
  {
    id: 23,
    name: "Elite Cricket Ground",
    sport: "Cricket",
    type: "Outdoor",
    price: 530,
    rating: 4.3,
    reviews: 16,
    location: "North End",
    tags: ["Cricket", "Outdoor", "Top Rated"],
    image: "https://via.placeholder.com/300x200?text=Cricket+Ground",
  },
  {
    id: 24,
    name: "Downtown Tennis Club",
    sport: "Tennis",
    type: "Outdoor",
    price: 440,
    rating: 4.7,
    reviews: 18,
    location: "Downtown",
    tags: ["Tennis", "Outdoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Tennis+Club",
  },
  {
    id: 25,
    name: "City Table Tennis Hall",
    sport: "Table Tennis",
    type: "Indoor",
    price: 220,
    rating: 4.4,
    reviews: 12,
    location: "Central Park",
    tags: ["Table Tennis", "Indoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Table+Tennis+Hall",
  },
  {
    id: 26,
    name: "Elite Football Stadium",
    sport: "Football",
    type: "Outdoor",
    price: 710,
    rating: 4.9,
    reviews: 25,
    location: "North End",
    tags: ["Football", "Outdoor", "Top Rated"],
    image: "https://via.placeholder.com/300x200?text=Football+Stadium",
  },
  {
    id: 27,
    name: "Downtown Yoga Center",
    sport: "Yoga",
    type: "Indoor",
    price: 170,
    rating: 4.7,
    reviews: 16,
    location: "Downtown",
    tags: ["Yoga", "Indoor", "Relaxing"],
    image: "https://via.placeholder.com/300x200?text=Yoga+Center",
  },
  {
    id: 28,
    name: "City Climbing Wall",
    sport: "Climbing",
    type: "Indoor",
    price: 430,
    rating: 4.5,
    reviews: 14,
    location: "Central Park",
    tags: ["Climbing", "Indoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Climbing+Wall",
  },
  {
    id: 29,
    name: "Elite Basketball Court",
    sport: "Basketball",
    type: "Indoor",
    price: 380,
    rating: 4.6,
    reviews: 15,
    location: "North End",
    tags: ["Basketball", "Indoor", "Top Rated"],
    image: "https://via.placeholder.com/300x200?text=Basketball+Court",
  },
  {
    id: 30,
    name: "Downtown Football Stadium",
    sport: "Football",
    type: "Outdoor",
    price: 720,
    rating: 4.8,
    reviews: 22,
    location: "Downtown",
    tags: ["Football", "Outdoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Football+Stadium",
  },
  {
    id: 31,
    name: "City Yoga Hall",
    sport: "Yoga",
    type: "Indoor",
    price: 180,
    rating: 4.9,
    reviews: 18,
    location: "East Side",
    tags: ["Yoga", "Indoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Yoga+Hall",
  },
  {
    id: 32,
    name: "Elite Climbing Gym",
    sport: "Climbing",
    type: "Indoor",
    price: 440,
    rating: 4.7,
    reviews: 17,
    location: "North End",
    tags: ["Climbing", "Indoor", "Top Rated"],
    image: "https://via.placeholder.com/300x200?text=Climbing+Gym",
  },
  {
    id: 33,
    name: "Downtown Table Tennis Club",
    sport: "Table Tennis",
    type: "Indoor",
    price: 230,
    rating: 4.5,
    reviews: 14,
    location: "Downtown",
    tags: ["Table Tennis", "Indoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Table+Tennis+Club",
  },
  {
    id: 34,
    name: "City Football Stadium",
    sport: "Football",
    type: "Outdoor",
    price: 730,
    rating: 4.6,
    reviews: 20,
    location: "Central Park",
    tags: ["Football", "Outdoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Football+Stadium",
  },
  {
    id: 35,
    name: "Elite Tennis Court",
    sport: "Tennis",
    type: "Outdoor",
    price: 450,
    rating: 4.8,
    reviews: 19,
    location: "North End",
    tags: ["Tennis", "Outdoor", "Top Rated"],
    image: "https://via.placeholder.com/300x200?text=Tennis+Court",
  },
  {
    id: 36,
    name: "Downtown Badminton Hall",
    sport: "Badminton",
    type: "Indoor",
    price: 290,
    rating: 4.7,
    reviews: 16,
    location: "Downtown",
    tags: ["Badminton", "Indoor", "Popular"],
    image: "https://via.placeholder.com/300x200?text=Badminton+Hall",
  },
];

const SPORTS = ["All Sport", "Badminton", "Cricket", "Football", "Swimming", "Table Tennis", "Tennis"];
const ITEMS_PER_PAGE = 12;

export default function Venues() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
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

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between py-4 border-b border-gray-200 px-4 md:px-8">
        <h1 className="text-xl md:text-2xl font-bold">QUICKCOURT</h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-600 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200">
            <Calendar size={18} className="mr-2" />
            <span>Book</span>
          </button>

          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-8 h-8">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 max-h-[80vh] overflow-y-auto">
                <div className="flex flex-col items-center space-y-4 p-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="" />
                  </Avatar>
                  <div className="text-center">
                    <h4 className="font-semibold text-lg">{user?.fullName}</h4>
                    <p className="text-sm text-gray-600">{user?.email || 'No email provided'}</p>
                  </div>
                  <Link to="/profile" className="w-full">
                    <Button className="w-full mb-2">
                      View Profile
                    </Button>
                  </Link>
                  <Button onClick={logoutHandler} className="w-full">
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : null}

          {!user ? (
            <>
              <Button 
                onClick={() => navigate('/login')}
                className="text-gray-600 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                variant="outline"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="text-white bg-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Sign Up
              </Button>
            </>
          ) : null}
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
        {page > 2 && (
          <>
            <button
              onClick={() => setPage(1)}
              className="px-3 py-1 rounded border border-gray-500 hover:bg-gray-300"
            >
              1
            </button>
            {page > 3 && <span className="px-2">...</span>}
          </>
        )}
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded border border-gray-500 hover:bg-gray-300"
          >
            {page - 1}
          </button>
        )}
        <button className="px-3 py-1 rounded border bg-purple-600 text-white">
          {page}
        </button>
        {page < totalPages && (
          <button
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded border border-gray-500 hover:bg-gray-300"
          >
            {page + 1}
          </button>
        )}
        {page < totalPages - 1 && (
          <>
            {page < totalPages - 2 && <span className="px-2">...</span>}
            <button
              onClick={() => setPage(totalPages)}
              className="px-3 py-1 rounded border border-gray-500 hover:bg-gray-300"
            >
              {totalPages}
            </button>
          </>
        )}
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
