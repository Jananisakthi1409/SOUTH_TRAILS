// src/pages/Packages/keraPackageData.js

const keraPackages = [
  {
    id: "kera-backwater-family",
    title: "Alleppey Backwater Family Joy",
    destination: "Alleppey",
    category: "Family",
    days: 3,
    nights: 2,
    rating: 4.9,
    price: 9999,
    imageFolder: "allapey",
    places: ["Alleppey Backwaters", "Houseboat Cruise", "Local Villages", "Coconut Plantations"],
    description: "Experience the magic of Kerala's backwaters with your family on a traditional houseboat.",
    included: ["Houseboat Stay", "All Meals", "Village Tour", "Canoe Ride", "Fish Farming Visit"],
    highlights: [
      "Traditional houseboat experience",
      "Scenic waterway cruises",
      "Authentic Kerala village life",
      "Fresh seafood cuisine"
    ]
  },
  {
    id: "kera-backwater-romantic",
    title: "Romantic Alleppey Escape",
    destination: "Alleppey",
    category: "Couple",
    days: 4,
    nights: 3,
    rating: 5.0,
    price: 14999,
    imageFolder: "allapey",
    places: ["Sunset Backwaters", "Private Houseboat", "Spa Village", "Local Markets"],
    description: "Perfect romantic getaway on exclusive houseboats with sunset views and couple packages.",
    included: ["Luxury Houseboat", "Romantic Dinner", "Couples Massage", "Photography Session", "All Meals"],
    highlights: [
      "Private houseboat romance",
      "Sunset cruise with champagne",
      "Ayurvedic couple spa",
      "Gourmet dining experience"
    ]
  },
  {
    id: "kera-munnar-family",
    title: "Munnar Tea Garden Adventure",
    destination: "Munnar",
    category: "Family",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 8999,
    imageFolder: "munnar",
    places: ["Tea Plantations", "Eravikulam National Park", "Mattupetty Dam", "Echo Point"],
    description: "Explore lush tea gardens and misty mountains with your family in Kerala's premium hill station.",
    included: ["Resort Stay", "Tea Plantation Tour", "Wildlife Safari", "Breakfast & Dinner", "Local Transport"],
    highlights: [
      "Vast green tea gardens",
      "Mountain trekking",
      "Nilgiri tahr spotting",
      "Cool climate getaway"
    ]
  },
  {
    id: "kera-munnar-friends",
    title: "Munnar Friends Trek & Bond",
    destination: "Munnar",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.7,
    price: 7999,
    imageFolder: "munnar",
    places: ["Anamudi Peak", "Tea Trails", "Waterfall Hikes", "Bonfire Camps"],
    description: "Adventure with friends: trekking, bonfire nights and unforgettable moments in the hills.",
    included: ["Budget Resort", "Guided Treks", "Bonfire Setup", "Meals", "Adventure Gear"],
    highlights: [
      "Peak trekking adventures",
      "Bonfire gatherings",
      "Scenic photography points",
      "Adventure activities"
    ]
  },
  {
    id: "kera-munnar-solo",
    title: "Munnar Solo Retreat",
    destination: "Munnar",
    category: "Solo",
    days: 2,
    nights: 1,
    rating: 4.6,
    price: 5999,
    imageFolder: "munnar",
    places: ["Tea Factory", "Nature Walks", "Local Cafes", "Viewpoints"],
    description: "Peaceful solo escape among tea gardens and misty peaks.",
    included: ["Comfortable Stay", "Tea Estate Tour", "Guided Walk", "Breakfast"],
    highlights: [
      "Peaceful solitude",
      "Nature immersion",
      "Photography paradise",
      "Meditation spaces"
    ]
  },
  {
    id: "kera-wayanad-adventure",
    title: "Wayanad Wildlife Explorer",
    destination: "Wayanad",
    category: "Friends",
    days: 4,
    nights: 3,
    rating: 4.8,
    price: 11999,
    imageFolder: "wayanad",
    places: ["Wayanad Wildlife Sanctuary", "Banasura Sagar Dam", "Chembra Peak", "Bamboo Forest"],
    description: "Thrilling adventure in the heart of Western Ghats with wildlife encounters and waterfall treks.",
    included: ["Resort Stay", "Safari Jeep", "Trekking Guides", "Camping Equipment", "All Meals"],
    highlights: [
      "Wild elephant sightings",
      "Waterfall trekking",
      "Bamboo forest walks",
      "Tribal village visit"
    ]
  },
  {
    id: "kera-wayanad-family",
    title: "Wayanad Family Nature Tour",
    destination: "Wayanad",
    category: "Family",
    days: 3,
    nights: 2,
    rating: 4.7,
    price: 9499,
    imageFolder: "wayanad",
    places: ["Pookode Lake", "Edakkal Caves", "Banasura Dam", "Fruit Farms"],
    description: "Family-friendly nature tour with safe adventures and scenic beauty.",
    included: ["Family Resort", "Boat Ride", "Cave Exploration", "Farm Tour", "Meals & Snacks"],
    highlights: [
      "Ancient cave paintings",
      "Scenic lake boating",
      "Fruit plantation tour",
      "Safe family activities"
    ]
  },
  {
    id: "kera-wayanad-solo",
    title: "Wayanad Solo Explorer",
    destination: "Wayanad",
    category: "Solo",
    days: 2,
    nights: 1,
    rating: 4.5,
    price: 6499,
    imageFolder: "wayanad",
    places: ["Nature Trails", "Local Villages", "Tea Shops", "Forest Walks"],
    description: "Explore Wayanad's hidden gems at your own pace.",
    included: ["Budget Stay", "Guide Service", "Tea Estate Visit", "Breakfast"],
    highlights: [
      "Forest immersion",
      "Village interactions",
      "Photography trails",
      "Nature sounds"
    ]
  },
  {
    id: "kera-kochi-heritage",
    title: "Kochi Heritage & Culture",
    destination: "Kochi",
    category: "Family",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 8499,
    imageFolder: "kochi",
    places: ["Fort Kochi", "Chinese Fishing Nets", "Jewish Synagogue", "Spice Markets"],
    description: "Immerse in Kochi's rich colonial history, spice trade heritage and vibrant cultural scene.",
    included: ["Heritage Hotel", "Guided City Tour", "Boat Cruise", "Spice Market Visit", "Meals"],
    highlights: [
      "Historic colonial architecture",
      "Ancient Chinese fishing nets",
      "Spice trade exploration",
      "Kathakali dance show"
    ]
  },
  {
    id: "kera-kochi-culture",
    title: "Kochi Cultural Immersion",
    destination: "Kochi",
    category: "Solo",
    days: 2,
    nights: 1,
    rating: 4.7,
    price: 5999,
    imageFolder: "kochi",
    places: ["Backwater Cruises", "Art Galleries", "Temple Tours", "Cultural Centers"],
    description: "Deep dive into Kochi's art, culture and spiritual heritage.",
    included: ["Cultural Hotel", "Museum Pass", "Backwater Cruise", "Breakfast"],
    highlights: [
      "Art gallery walks",
      "Temple visits",
      "Backwater perspectives",
      "Local cuisine tasting"
    ]
  },
  {
    id: "kera-backwater-festival",
    title: "Backwater Festival Experience",
    destination: "Backwater",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.9,
    price: 10999,
    imageFolder: "backwater",
    places: ["Snake Boat Races", "Water Festival", "Local Festivities", "Night Cruise"],
    description: "Experience Kerala's vibrant water festivals with friends, featuring traditional snake boat races.",
    included: ["Festival Accommodation", "Race Viewing", "Boat Cruise", "Local Performances", "Meals"],
    highlights: [
      "Traditional snake boat races",
      "Local celebrations",
      "Night backwater cruise",
      "Festival food experience"
    ]
  },
  {
    id: "kera-spice-garden-tour",
    title: "Kerala Spice Garden Tour",
    destination: "Munnar",
    category: "Family",
    days: 2,
    nights: 1,
    rating: 4.6,
    price: 6999,
    imageFolder: "munnar",
    places: ["Spice Plantations", "Cardamom Hills", "Processing Units", "Organic Farms"],
    description: "Discover Kerala's spice trade heritage through guided plantation tours and organic farming.",
    included: ["Budget Resort", "Plantation Tour", "Tasting Session", "Breakfast"],
    highlights: [
      "Cardamom and pepper plants",
      "Spice tasting experience",
      "Organic farming methods",
      "Local spice purchasing"
    ]
  },
  {
    id: "kera-temple-circuit",
    title: "Kerala Temple Circuit",
    destination: "Various",
    category: "Solo",
    days: 4,
    nights: 3,
    rating: 4.7,
    price: 7999,
    imageFolder: "wayanad",
    places: ["Ancient Temples", "Sacred Shrines", "Pilgrimage Sites", "Spiritual Ashrams"],
    description: "Spiritual journey through Kerala's most sacred temples and spiritual centers.",
    included: ["Temple Accommodation", "Guided Tours", "Pooja Services", "Vegetarian Meals"],
    highlights: [
      "Ancient temple architecture",
      "Spiritual practices",
      "Pilgrimage experiences",
      "Meditation sessions"
    ]
  },
  {
    id: "kera-ayurvedic-wellness",
    title: "Kerala Ayurvedic Wellness",
    destination: "Kochi",
    category: "Couple",
    days: 4,
    nights: 3,
    rating: 4.9,
    price: 13999,
    imageFolder: "kochi",
    places: ["Ayurvedic Centers", "Wellness Spas", "Yoga Studios", "Healing Gardens"],
    description: "Complete wellness retreat with Ayurvedic treatments, yoga and rejuvenation therapies.",
    included: ["Wellness Resort", "Daily Ayurvedic Massage", "Yoga Classes", "Healthy Meals", "Spa Treatments"],
    highlights: [
      "Traditional Ayurvedic treatments",
      "Daily yoga sessions",
      "Meditation practices",
      "Rejuvenation therapies"
    ]
  },
  {
    id: "kera-beach-resort",
    title: "Beach Paradise Retreat",
    destination: "Allapey",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 9999,
    imageFolder: "allapey",
    places: ["Sandy Beaches", "Beach Resorts", "Water Sports", "Sunset Spots"],
    description: "Relaxing beach getaway with friends, water sports and sunset beach parties.",
    included: ["Beach Resort", "Water Sports", "Beach BBQ", "Sunset Cruise", "Meals"],
    highlights: [
      "Golden sandy beaches",
      "Water sports activities",
      "Beach volleyball",
      "Sunset beach parties"
    ]
  },
  {
    id: "kera-luxury-premium",
    title: "Kerala Premium Luxury Package",
    destination: "Various",
    category: "Couple",
    days: 5,
    nights: 4,
    rating: 5.0,
    price: 24999,
    imageFolder: "munnar",
    places: ["Luxury Resorts", "Private Spas", "Gourmet Restaurants", "Scenic Viewpoints"],
    description: "The ultimate premium Kerala experience: luxury stays, spa treatments, gourmet dining.",
    included: ["5-Star Resorts", "Private Spa", "Chef Dinners", "Yacht Cruise", "Personal Guide"],
    highlights: [
      "Ultra-luxury accommodations",
      "Private spa services",
      "Gourmet cuisine",
      "VIP experiences"
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

export default keraPackages;
