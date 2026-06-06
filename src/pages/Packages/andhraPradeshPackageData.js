// src/pages/Packages/andhraPradeshPackageData.js

const andhraPradeshPackages = [
  {
    id: "andhra-tirupati-family",
    title: "Tirupati Temple Family Pilgrimage",
    destination: "Tirupati",
    category: "Family",
    days: 3,
    nights: 2,
    rating: 4.9,
    price: 7999,
    imageFolder: "tirumala",
    places: ["Tirupati Temple", "Chandragiri Fort", "Sri Kalahasti Temple", "Local Markets"],
    description: "Experience the sacred pilgrimage to India's most visited temple with family.",
    included: ["Temple Darshan", "Hotel Stay", "Guide Service", "Meals", "Local Transport"],
    highlights: [
      "Temple darshan experience",
      "Spiritual atmosphere",
      "Guided temple tour",
      "Fort exploration"
    ]
  },
  {
    id: "andhra-tirupati-spiritual",
    title: "Tirupati Spiritual Retreat",
    destination: "Tirupati",
    category: "Solo",
    days: 2,
    nights: 1,
    rating: 4.8,
    price: 5499,
    imageFolder: "tirumala",
    places: ["Temple Prayers", "Meditation Spots", "Sacred Grounds", "Spiritual Centers"],
    description: "Deep spiritual journey to India's holiest temple.",
    included: ["Budget Hotel", "Temple Darshan", "Breakfast", "Transport"],
    highlights: [
      "Spiritual awakening",
      "Temple prayers",
      "Peaceful surroundings",
      "Cultural experience"
    ]
  },
  {
    id: "andhra-araku-adventure",
    title: "Araku Valley Adventure Trek",
    destination: "Araku",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 8999,
    imageFolder: "araku",
    places: ["Araku Valley", "Tribal Villages", "Waterfall Trails", "Coffee Plantations"],
    description: "Thrilling trek through tribal land with scenic valleys and waterfalls.",
    included: ["Adventure Resort", "Guided Treks", "Meals", "Transport", "Guide Service"],
    highlights: [
      "Valley trekking",
      "Tribal experiences",
      "Waterfall views",
      "Nature immersion"
    ]
  },
  {
    id: "andhra-araku-wellness",
    title: "Araku Valley Wellness Escape",
    destination: "Araku",
    category: "Couple",
    days: 3,
    nights: 2,
    rating: 4.7,
    price: 10999,
    imageFolder: "araku",
    places: ["Mountain Retreat", "Spa Resorts", "Nature Trails", "Wellness Centers"],
    description: "Rejuvenating wellness retreat in the scenic Araku Valley.",
    included: ["Wellness Resort", "Spa Treatments", "Yoga Classes", "Gourmet Meals"],
    highlights: [
      "Spa treatments",
      "Yoga sessions",
      "Healthy cuisine",
      "Nature therapy"
    ]
  },
  {
    id: "andhra-rkbeach-family",
    title: "RK Beach Family Vacation",
    destination: "RKBeach",
    category: "Family",
    days: 2,
    nights: 1,
    rating: 4.7,
    price: 6499,
    imageFolder: "rkbeach",
    places: ["RK Beach", "Beach Park", "Local Restaurants", "Water Sports"],
    description: "Relaxing family vacation on the pristine RK Beach.",
    included: ["Beachfront Hotel", "Beach Activities", "Meals", "Transport"],
    highlights: [
      "Beach relaxation",
      "Water sports",
      "Family activities",
      "Seaside dining"
    ]
  },
  {
    id: "andhra-rkbeach-romantic",
    title: "RK Beach Romantic Getaway",
    destination: "RKBeach",
    category: "Couple",
    days: 2,
    nights: 1,
    rating: 4.8,
    price: 8999,
    imageFolder: "rkbeach",
    places: ["Sunset Point", "Beachfront Restaurants", "Marine Park", "Beach Walks"],
    description: "Romantic escape with sunset views and beachside dining.",
    included: ["Luxury Beach Resort", "Romantic Dinners", "Sunset Cruise", "Breakfast"],
    highlights: [
      "Sunset views",
      "Romantic dinners",
      "Beach walks",
      "Intimate ambiance"
    ]
  },
  {
    id: "andhra-boraka-nature",
    title: "Boraka Natural Wonders",
    destination: "Boraka",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.9,
    price: 9499,
    imageFolder: "boraka",
    places: ["Boraka Hills", "Forest Trails", "Waterfalls", "Nature Camps"],
    description: "Explore the hidden natural wonders of Boraka with guided tours.",
    included: ["Nature Resort", "Guided Treks", "All Meals", "Transport", "Activities"],
    highlights: [
      "Hill exploration",
      "Forest walks",
      "Waterfall hikes",
      "Nature camping"
    ]
  },
  {
    id: "andhra-boraka-explorer",
    title: "Boraka Explorer Package",
    destination: "Boraka",
    category: "Solo",
    days: 2,
    nights: 1,
    rating: 4.6,
    price: 5999,
    imageFolder: "boraka",
    places: ["Natural Sites", "Scenic Viewpoints", "Local Guides", "Photography Spots"],
    description: "Solo exploration of Boraka's natural landscapes.",
    included: ["Budget Hotel", "Guide Service", "Meals", "Transport"],
    highlights: [
      "Solo adventure",
      "Scenic views",
      "Photography",
      "Self-discovery"
    ]
  },
  {
    id: "andhra-coastal-luxury",
    title: "Andhra Coastal Luxury Tour",
    destination: "RKBeach",
    category: "Couple",
    days: 4,
    nights: 3,
    rating: 4.9,
    price: 14999,
    imageFolder: "rkbeach",
    places: ["Luxury Beach Resorts", "Fine Dining", "Marine Tours", "Spa Retreats"],
    description: "Premium coastal experience with luxury accommodations and fine dining.",
    included: ["5-Star Resort", "Gourmet Meals", "Spa Package", "Marine Tours"],
    highlights: [
      "Luxury accommodation",
      "Fine dining",
      "Spa experience",
      "Premium service"
    ]
  },
  {
    id: "andhra-temple-tour",
    title: "Andhra Sacred Temple Tour",
    destination: "Tirupati",
    category: "Family",
    days: 4,
    nights: 3,
    rating: 4.8,
    price: 10499,
    imageFolder: "tirumala",
    places: ["Tirupati Temple", "Kalahasti Temple", "Chandragiri Fort", "Ancient Sites"],
    description: "Comprehensive tour of Andhra's most sacred temples and historical sites.",
    included: ["Hotel Accommodation", "Temple Tours", "Guide Service", "All Meals", "Transport"],
    highlights: [
      "Sacred temple visits",
      "Historical exploration",
      "Guided tours",
      "Cultural immersion"
    ]
  },
  {
    id: "andhra-tribal-cultural",
    title: "Tribal Cultural Experience",
    destination: "Araku",
    category: "Solo",
    days: 2,
    nights: 1,
    rating: 4.7,
    price: 6999,
    imageFolder: "araku",
    places: ["Tribal Villages", "Local Markets", "Cultural Shows", "Community Centers"],
    description: "Immersive experience with tribal communities and their traditions.",
    included: ["Homestay", "Tribal Guides", "Cultural Programs", "Local Meals"],
    highlights: [
      "Tribal interactions",
      "Cultural shows",
      "Local experiences",
      "Community visits"
    ]
  },
  {
    id: "andhra-beach-adventure",
    title: "Andhra Beach Adventure",
    destination: "RKBeach",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 9999,
    imageFolder: "rkbeach",
    places: ["Beach Sports", "Water Rides", "Island Tours", "Beach Camps"],
    description: "Adventurous beach activities and water sports in Andhra.",
    included: ["Beach Resort", "Water Sports", "Adventure Activities", "All Meals"],
    highlights: [
      "Water sports",
      "Beach games",
      "Island exploration",
      "Adventure activities"
    ]
  },
  {
    id: "andhra-coffee-spice-trail",
    title: "Andhra Coffee & Spice Trail",
    destination: "Araku",
    category: "Couple",
    days: 3,
    nights: 2,
    rating: 4.7,
    price: 11499,
    imageFolder: "araku",
    places: ["Coffee Estates", "Spice Markets", "Processing Units", "Tasting Labs"],
    description: "Explore Andhra's coffee and spice plantations with tasting sessions.",
    included: ["Boutique Hotel", "Estate Tours", "Tasting Sessions", "Gourmet Meals"],
    highlights: [
      "Coffee tour",
      "Spice market visit",
      "Tasting sessions",
      "Culinary experience"
    ]
  },
  {
    id: "andhra-nature-photography",
    title: "Nature Photography Trail",
    destination: "Boraka",
    category: "Solo",
    days: 3,
    nights: 2,
    rating: 4.6,
    price: 7999,
    imageFolder: "boraka",
    places: ["Photography Spots", "Wildlife Areas", "Scenic Points", "Nature Reserves"],
    description: "Photography-focused tour capturing Andhra's natural beauty.",
    included: ["Hotel Stay", "Photography Guide", "Transport", "Meals"],
    highlights: [
      "Photography spots",
      "Wildlife photography",
      "Scenic compositions",
      "Expert guidance"
    ]
  },
  {
    id: "andhra-pilgrimage-package",
    title: "Complete Andhra Pilgrimage",
    destination: "Tirupati",
    category: "Family",
    days: 5,
    nights: 4,
    rating: 4.9,
    price: 12999,
    imageFolder: "tirumala",
    places: ["Tirupati Temple", "Kalahasti", "Fort Tours", "Historical Temples"],
    description: "Complete pilgrimage journey covering Andhra's holiest temples.",
    included: ["Hotel Accommodation", "Temple Tours", "Professional Guides", "All Meals"],
    highlights: [
      "Multiple temple visits",
      "Pilgrimage experience",
      "Spiritual journey",
      "Expert guidance"
    ]
  },
  {
    id: "andhra-heritage-explorer",
    title: "Andhra Heritage Explorer",
    destination: "Tirupati",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.7,
    price: 8499,
    imageFolder: "tirumala",
    places: ["Historic Sites", "Ancient Monuments", "Museum Tours", "Heritage Streets"],
    description: "Explore Andhra's rich heritage and historical monuments.",
    included: ["Heritage Hotel", "Museum Tours", "Guide Service", "All Meals"],
    highlights: [
      "Historical sites",
      "Monument exploration",
      "Museum visits",
      "Heritage walks"
    ]
  }
];

export const filterOptions = {
  categories: ["All", "Family", "Friends", "Solo", "Couple"],
  budgets: [
    { label: "Under ₹8000", min: 0, max: 8000 },
    { label: "₹8000–₹12000", min: 8000, max: 12000 },
    { label: "Above ₹12000", min: 12000, max: 100000 }
  ],
  durations: [
    { label: "1–2 Days", min: 1, max: 2 },
    { label: "3–4 Days", min: 3, max: 4 },
    { label: "5+ Days", min: 5, max: 10 }
  ]
};

export default andhraPradeshPackages;
