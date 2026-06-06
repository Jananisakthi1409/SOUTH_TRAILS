// src/pages/Packages/karnatakaPackageData.js

const karnatakaPackages = [
  {
    id: "karnataka-coorg-family",
    title: "Coorg Coffee Plantation Family Tour",
    destination: "Coorg",
    category: "Family",
    days: 3,
    nights: 2,
    rating: 4.9,
    price: 8999,
    imageFolder: "coorg",
    places: ["Coffee Plantations", "Abbey Falls", "Madikeri Fort", "Local Villages"],
    description: "Experience the lush coffee plantations and misty hills of Coorg with your family.",
    included: ["Resort Stay", "Plantation Tour", "Local Transport", "Meals", "Coffee Tasting"],
    highlights: [
      "Coffee estate exploration",
      "Scenic waterfall views",
      "Mountain trail walks",
      "Authentic plantation stay"
    ]
  },
  {
    id: "karnataka-coorg-romantic",
    title: "Coorg Romantic Getaway",
    destination: "Coorg",
    category: "Couple",
    days: 4,
    nights: 3,
    rating: 5.0,
    price: 13999,
    imageFolder: "coorg",
    places: ["Private Plantations", "Sunset Points", "Nature Walks", "Spa Retreats"],
    description: "Perfect romantic escape in the misty hills of Coorg with couple packages.",
    included: ["Luxury Resort", "Couples Spa", "Private Tours", "Candlelit Dinners", "Breakfast Daily"],
    highlights: [
      "Private plantation tours",
      "Couples massage package",
      "Romantic sunset views",
      "Gourmet dining"
    ]
  },
  {
    id: "karnataka-hampi-adventure",
    title: "Hampi Historical Explorer",
    destination: "Hampi",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 7999,
    imageFolder: "hampi",
    places: ["Ancient Temples", "Ruins", "Hampi Bazaar", "River Walks"],
    description: "Explore the UNESCO World Heritage site of Hampi with ancient temples and ruins.",
    included: ["Hotel Stay", "Guided Tours", "Local Transport", "Meals", "Entry Fees"],
    highlights: [
      "Ancient temple exploration",
      "Historic ruins",
      "River adventures",
      "Photography paradise"
    ]
  },
  {
    id: "karnataka-hampi-culture",
    title: "Hampi Cultural Heritage",
    destination: "Hampi",
    category: "Solo",
    days: 2,
    nights: 1,
    rating: 4.7,
    price: 5999,
    imageFolder: "hampi",
    places: ["Temple Complexes", "Ancient Bazaars", "Cliff Views", "Historical Sites"],
    description: "Deep dive into Hampi's rich cultural and historical heritage.",
    included: ["Budget Hotel", "Guided Tour", "Meals", "Entry Passes"],
    highlights: [
      "Ancient architecture",
      "Historical knowledge",
      "Peaceful exploration",
      "Sunset viewpoints"
    ]
  },
  {
    id: "karnataka-mysore-family",
    title: "Mysore Palace & Gardens Tour",
    destination: "Mysore",
    category: "Family",
    days: 2,
    nights: 1,
    rating: 4.8,
    price: 6499,
    imageFolder: "mysore",
    places: ["Mysore Palace", "Botanical Gardens", "Zoo", "Markets"],
    description: "Experience the royal grandeur of Mysore Palace and beautiful gardens.",
    included: ["Hotel Stay", "Palace Tour", "Garden Visit", "Breakfast", "Local Transport"],
    highlights: [
      "Magnificent palace",
      "Beautiful gardens",
      "Royal heritage",
      "Family activities"
    ]
  },
  {
    id: "karnataka-mysore-weekend",
    title: "Mysore Weekend Getaway",
    destination: "Mysore",
    category: "Couple",
    days: 2,
    nights: 1,
    rating: 4.7,
    price: 7999,
    imageFolder: "mysore",
    places: ["Palace at Night", "Chamundi Hills", "Parks", "Heritage Sites"],
    description: "Romantic weekend in the city of palaces with illuminated monuments.",
    included: ["Couple Hotel", "Palace Evening Tour", "Chamundi Trek", "Dinners"],
    highlights: [
      "Palace illumination",
      "Hill trek",
      "Romantic ambiance",
      "Cultural experience"
    ]
  },
  {
    id: "karnataka-jog-falls",
    title: "Jog Falls Adventure",
    destination: "Jogfalls",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.9,
    price: 9499,
    imageFolder: "jogfalls",
    places: ["Jog Falls", "Trekking Trails", "Viewpoints", "Local Villages"],
    description: "Experience the majestic Jog Falls and adventure activities in the region.",
    included: ["Resort Stay", "Guided Treks", "Waterfall Tours", "Meals", "Transport"],
    highlights: [
      "Majestic waterfall",
      "Trek adventures",
      "Scenic viewpoints",
      "Nature immersion"
    ]
  },
  {
    id: "karnataka-jog-solo",
    title: "Jog Falls Solo Retreat",
    destination: "Jogfalls",
    category: "Solo",
    days: 2,
    nights: 1,
    rating: 4.6,
    price: 5499,
    imageFolder: "jogfalls",
    places: ["Falls Viewpoint", "Nature Walks", "Meditation Spots", "Local Cafes"],
    description: "Peaceful solo journey to India's second highest waterfall.",
    included: ["Budget Stay", "Guide Service", "Breakfast", "Transport"],
    highlights: [
      "Waterfall views",
      "Peaceful nature",
      "Photography spots",
      "Tranquility"
    ]
  },
  {
    id: "karnataka-gokarna-beach",
    title: "Gokarna Beach Escape",
    destination: "Gokarna",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 8999,
    imageFolder: "gokarna",
    places: ["Gokarna Beach", "Temple", "Cliffs", "Beach Shacks"],
    description: "Relax on pristine beaches with temples and scenic cliffs.",
    included: ["Beach Resort", "Beach Activities", "Boat Tours", "Meals", "Transport"],
    highlights: [
      "Golden beaches",
      "Temple visits",
      "Cliff views",
      "Beachside relaxation"
    ]
  },
  {
    id: "karnataka-gokarna-yoga",
    title: "Gokarna Yoga & Wellness",
    destination: "Gokarna",
    category: "Solo",
    days: 4,
    nights: 3,
    rating: 4.7,
    price: 9999,
    imageFolder: "gokarna",
    places: ["Yoga Centers", "Beaches", "Meditation Spots", "Wellness Retreats"],
    description: "Rejuvenate with yoga, meditation and wellness activities by the beach.",
    included: ["Wellness Resort", "Yoga Classes", "Meals", "Beach Access", "Meditation"],
    highlights: [
      "Daily yoga sessions",
      "Meditation practice",
      "Beach environment",
      "Health rejuvenation"
    ]
  },
  {
    id: "karnataka-coorg-adventure",
    title: "Coorg Adventure Challenge",
    destination: "Coorg",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 9999,
    imageFolder: "coorg",
    places: ["Mountain Trails", "Bamboo Forests", "Adventure Camps", "Waterfall Rappelling"],
    description: "Thrilling adventure activities in the hills of Coorg.",
    included: ["Adventure Camp", "All Activities", "Equipment", "Meals", "Guides"],
    highlights: [
      "Mountain trekking",
      "Bamboo forest walks",
      "Waterfall rappelling",
      "Team bonding"
    ]
  },
  {
    id: "karnataka-mullayanagiri",
    title: "Mullayanagiri Trek & Stay",
    destination: "Coorg",
    category: "Friends",
    days: 2,
    nights: 1,
    rating: 4.7,
    price: 6999,
    imageFolder: "coorg",
    places: ["Mullayanagiri Peak", "Forest Trails", "Viewpoints", "Coffee Villages"],
    description: "Trek to Karnataka's highest peak with stunning views.",
    included: ["Budget Hotel", "Guided Trek", "Breakfast", "Transport"],
    highlights: [
      "Highest peak trek",
      "Mountain views",
      "Forest trails",
      "Peak sunrise"
    ]
  },
  {
    id: "karnataka-hampi-luxury",
    title: "Hampi Luxury Heritage Tour",
    destination: "Hampi",
    category: "Couple",
    days: 3,
    nights: 2,
    rating: 4.9,
    price: 12999,
    imageFolder: "hampi",
    places: ["Temple Tour", "Private Guide", "Riverside Cruise", "Heritage Stays"],
    description: "Premium experience exploring Hampi's architectural wonders.",
    included: ["Luxury Heritage Hotel", "Private Guide", "Cruise", "Gourmet Meals"],
    highlights: [
      "Exclusive tours",
      "Luxury accommodations",
      "River experiences",
      "Premium service"
    ]
  },
  {
    id: "karnataka-bangalore-gateway",
    title: "Bangalore Gateway Package",
    destination: "Mysore",
    category: "Family",
    days: 2,
    nights: 1,
    rating: 4.6,
    price: 5999,
    imageFolder: "mysore",
    places: ["Mysore City", "Silk Market", "Heritage Sites", "Parks"],
    description: "Quick getaway from Bangalore to explore Mysore's royal heritage.",
    included: ["Hotel", "City Tour", "Breakfast", "Transport"],
    highlights: [
      "Quick weekend escape",
      "Royal palaces",
      "Shopping",
      "Heritage sites"
    ]
  },
  {
    id: "karnataka-coffee-connoisseur",
    title: "Coffee Connoisseur's Journey",
    destination: "Coorg",
    category: "Couple",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 11999,
    imageFolder: "coorg",
    places: ["Premium Estates", "Coffee Museum", "Tasting Lab", "Processing Units"],
    description: "Explore Karnataka's coffee culture with tasting and tours.",
    included: ["Boutique Hotel", "Estate Tours", "Tasting Sessions", "Gourmet Meals"],
    highlights: [
      "Coffee estate tours",
      "Professional tasting",
      "Coffee museum",
      "Culinary experience"
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

export default karnatakaPackages;
