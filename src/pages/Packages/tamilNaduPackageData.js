// src/pages/Packages/tamilNaduPackageData.js

const tamilNaduPackages = [
  {
    id: "ooty-family-escape",
    title: "Ooty Family Escape",
    destination: "Ooty",
    category: "Family",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 8999,
    imageFolder: "ooty",
    places: ["Botanical Garden", "Ooty Lake", "Doddabetta Peak", "Tea Gardens"],
    description: "Experience the serene beauty of the Nilgiri Mountains with your family.",
    included: ["Hotel Stay", "Breakfast & Dinner", "Local Transport", "Entry Fees", "Tea Estate Tour"],
    highlights: [
      "Scenic mountain views",
      "Heritage tea plantations",
      "Family-friendly activities",
      "Comfortable hill station weather"
    ]
  },
  {
    id: "ooty-romantic-retreat",
    title: "Ooty Romantic Retreat",
    destination: "Ooty",
    category: "Couple",
    days: 4,
    nights: 3,
    rating: 4.9,
    price: 12999,
    imageFolder: "ooty",
    places: ["Nilgiri Mountains", "Lake Boating", "Sunset Points", "Mountain Trails"],
    description: "Perfect getaway for couples seeking tranquility and natural beauty.",
    included: ["Luxury Hotel", "Couple Spa Package", "Dinner Cruises", "Photography Session", "Breakfast Daily"],
    highlights: [
      "Couples spa treatments",
      "Romantic sunset views",
      "Premium accommodations",
      "Personalized service"
    ]
  },
  {
    id: "kodaikanal-adventure",
    title: "Kodaikanal Adventure Trail",
    destination: "Kodaikanal",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.7,
    price: 9499,
    imageFolder: "kodaikanal",
    places: ["Kodai Lake", "Coaker's Walk", "Pillar Rocks", "Pine Forests"],
    description: "Thrilling adventure with friends in the misty hills of Kodaikanal.",
    included: ["Adventure Activities", "Trekking Gear", "Guide Services", "Meals", "Bonfire Night"],
    highlights: [
      "Rock climbing",
      "Trekking expeditions",
      "Misty forest walks",
      "Bonfire camping"
    ]
  },
  {
    id: "kodaikanal-retreat",
    title: "Kodaikanal Lake Retreat",
    destination: "Kodaikanal",
    category: "Solo",
    days: 2,
    nights: 1,
    rating: 4.6,
    price: 6499,
    imageFolder: "kodaikanal",
    places: ["Kodai Lake", "Forest Walks", "Local Market", "Sunset Point"],
    description: "Solo traveler's paradise with peaceful lake surroundings.",
    included: ["Comfortable Stay", "Daily Breakfast", "Lake Activities", "Guide Assistance"],
    highlights: [
      "Peaceful solitude",
      "Nature immersion",
      "Photography spots",
      "Local cuisine"
    ]
  },
  {
    id: "madurai-heritage-tour",
    title: "Madurai Heritage Tour",
    destination: "Madurai",
    category: "Temple",
    days: 2,
    nights: 1,
    rating: 4.8,
    price: 7999,
    imageFolder: "madurai",
    places: ["Meenakshi Temple", "Nayakkar Palace", "Gandhi Museum", "Temple Streets"],
    description: "Immerse yourself in the spiritual and cultural heritage of Madurai.",
    included: ["Temple Tours", "Palace Visit", "Guided Tours", "Meals", "Cultural Show"],
    highlights: [
      "Ancient temples",
      "Cultural immersion",
      "Heritage architecture",
      "Local traditions"
    ]
  },
  {
    id: "madurai-spiritual-journey",
    title: "Madurai Spiritual Journey",
    destination: "Madurai",
    category: "Temple",
    days: 3,
    nights: 2,
    rating: 4.7,
    price: 8999,
    imageFolder: "madurai",
    places: ["Meenakshi Temple", "Aayiram Kaal Mandapam", "Tirupparankundram", "Sacred Rituals"],
    description: "Deep spiritual experience with temple rituals and meditation.",
    included: ["Spiritual Guided Tours", "Ritual Participation", "Ashram Stay", "Vegetarian Meals"],
    highlights: [
      "Temple rituals",
      "Meditation sessions",
      "Spiritual guidance",
      "Morning prayers"
    ]
  },
  {
    id: "kanyakumari-sunset",
    title: "Kanyakumari Sunset Experience",
    destination: "Kanyakumari",
    category: "Couple",
    days: 2,
    nights: 1,
    rating: 4.8,
    price: 10999,
    imageFolder: "kanyakumari",
    places: ["Vivekananda Rock", "Sunset Point", "Kanyakumari Beach", "Rock Memorial"],
    description: "Romantic sunset experience at India's southernmost point.",
    included: ["Beachfront Stay", "Sunset Tour", "Boat Ride", "Meals", "Photography"],
    highlights: [
      "Stunning sunsets",
      "Romantic ambiance",
      "Beach activities",
      "Monument visits"
    ]
  },
  {
    id: "kanyakumari-adventure",
    title: "Kanyakumari Beach Adventure",
    destination: "Kanyakumari",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.6,
    price: 8999,
    imageFolder: "kanyakumari",
    places: ["Kanyakumari Beach", "Vivekananda Rock", "Water Sports", "Coastal Walks"],
    description: "Beach adventure with water sports and coastal exploration.",
    included: ["Beach Resort", "Water Sports", "Equipment Rental", "Meals", "Local Tours"],
    highlights: [
      "Water sports",
      "Beach activities",
      "Coastal views",
      "Adventure activities"
    ]
  },
  {
    id: "rameswaram-temple-tour",
    title: "Rameswaram Temple Tour",
    destination: "Rameswaram",
    category: "Temple",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 11999,
    imageFolder: "rameswaram",
    places: ["Ramanathaswamy Temple", "Dhanushkodi", "Pamban Bridge", "Sacred Pilgrimage Sites"],
    description: "Sacred pilgrimage to one of India's holiest temple destinations.",
    included: ["Temple Accommodation", "Guided Pilgrimage", "Darshan Assistance", "Meals"],
    highlights: [
      "Sacred pilgrimage",
      "Temple rituals",
      "Holy dips",
      "Spiritual journey"
    ]
  },
  {
    id: "puducherry-cultural",
    title: "Puducherry Cultural Escape",
    destination: "Puducherry",
    category: "Solo",
    days: 3,
    nights: 2,
    rating: 4.7,
    price: 8499,
    imageFolder: "puducherry",
    places: ["Auroville", "French Quarter", "Promenade Beach", "Art Galleries"],
    description: "Explore French colonial charm and spiritual culture.",
    included: ["Beachfront Stay", "Guided Tours", "Art Classes", "Meals", "Beach Activities"],
    highlights: [
      "French architecture",
      "Spiritual centers",
      "Art & culture",
      "Peaceful beaches"
    ]
  },
  {
    id: "puducherry-romantic",
    title: "Puducherry Romantic Retreat",
    destination: "Puducherry",
    category: "Couple",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 11499,
    imageFolder: "puducherry",
    places: ["Promenade Beach", "Paradise Beach", "Auroville", "Sunset Points"],
    description: "Romantic French colonial getaway with beach vibes.",
    included: ["Beach Villa", "Couple Dinner", "Spa Session", "Boat Ride", "Tours"],
    highlights: [
      "Romantic dinners",
      "Beach strolls",
      "Spa treatments",
      "Cultural experiences"
    ]
  },
  {
    id: "valparai-tea-estates",
    title: "Valparai Tea Estate Retreat",
    destination: "Valparai",
    category: "Family",
    days: 3,
    nights: 2,
    rating: 4.8,
    price: 11999,
    imageFolder: "valparai",
    places: ["Tea Estates", "Sholayar Dam", "Monkey Falls", "Viewpoints"],
    description: "Serene tea plantation experience for the whole family.",
    included: ["Estate Stay", "Tea Plantation Tour", "Meals", "Nature Walks", "Activities"],
    highlights: [
      "Tea estate tours",
      "Scenic viewpoints",
      "Nature exploration",
      "Family activities"
    ]
  },
  {
    id: "valparai-adventure",
    title: "Valparai Nature Adventure",
    destination: "Valparai",
    category: "Friends",
    days: 3,
    nights: 2,
    rating: 4.7,
    price: 9999,
    imageFolder: "valparai",
    places: ["Monkey Falls", "Tea Plantations", "Mountain Trails", "Adventure Activities"],
    description: "Adventure in pristine tea plantations and misty valleys.",
    included: ["Adventure Lodge", "Trekking Guides", "Activities", "Meals", "Equipment"],
    highlights: [
      "Waterfall treks",
      "Mountain biking",
      "Rock climbing",
      "Nature immersion"
    ]
  },
  {
    id: "yercaud-family-getaway",
    title: "Yercaud Family Getaway",
    destination: "Yercaud",
    category: "Family",
    days: 3,
    nights: 2,
    rating: 4.7,
    price: 8999,
    imageFolder: "yercaud",
    places: ["Yercaud Lake", "Lady's Seat", "Bear's Cave", "Coffee Plantations"],
    description: "Perfect family destination with lake and forest activities.",
    included: ["Family Resort", "Breakfast & Dinner", "Lake Activities", "Guided Tours"],
    highlights: [
      "Lake boating",
      "Forest walks",
      "Photography spots",
      "Relaxation areas"
    ]
  },
  {
    id: "yercaud-romantic",
    title: "Yercaud Romantic Escape",
    destination: "Yercaud",
    category: "Couple",
    days: 2,
    nights: 1,
    rating: 4.8,
    price: 9999,
    imageFolder: "yercaud",
    places: ["Lake Sunset", "Scenic View Points", "Coffee Shop", "Nature Trails"],
    description: "Intimate getaway in misty hills with romantic surroundings.",
    included: ["Couple Cottage", "Romantic Dinner", "Lake Tour", "Spa Package"],
    highlights: [
      "Romantic ambiance",
      "Sunset views",
      "Couple activities",
      "Coffee tasting"
    ]
  },
  {
    id: "coimbatore-coffee",
    title: "Coimbatore Coffee Country",
    destination: "Coimbatore",
    category: "Family",
    days: 3,
    nights: 2,
    rating: 4.7,
    price: 10999,
    imageFolder: "coimbatore",
    places: ["Coffee Estates", "Marudhamalai", "Brookefields", "Textile Markets"],
    description: "Explore coffee plantations and hill station charm.",
    included: ["Plantation Stay", "Coffee Tour", "Meals", "Hill Activities", "Sightseeing"],
    highlights: [
      "Coffee plantation tour",
      "Hill activities",
      "Temple visits",
      "Local experiences"
    ]
  },
  {
    id: "chettinad-heritage",
    title: "Chettinad Heritage Trail",
    destination: "Chettinad",
    category: "Culture",
    days: 2,
    nights: 1,
    rating: 4.8,
    price: 9999,
    imageFolder: "chettinad",
    places: ["Heritage Mansions", "Ariyaman Beach", "Local Cuisine", "Art & Crafts"],
    description: "Immerse in unique Chettinad culture and architecture.",
    included: ["Heritage Homestay", "Guided Tours", "Culinary Classes", "Meals"],
    highlights: [
      "Heritage mansions",
      "Architecture tours",
      "Culinary experiences",
      "Art appreciation"
    ]
  },
  {
    id: "chettinad-cultural",
    title: "Chettinad Cultural Experience",
    destination: "Chettinad",
    category: "Solo",
    days: 3,
    nights: 2,
    rating: 4.6,
    price: 8499,
    imageFolder: "chettinad",
    places: ["Local Markets", "Heritage Sites", "Art Studios", "Cooking Classes"],
    description: "Deep cultural immersion with local community.",
    included: ["Local Stay", "Cultural Workshops", "Meals", "Market Tours", "Art Classes"],
    highlights: [
      "Cultural workshops",
      "Local cuisine",
      "Art classes",
      "Community interaction"
    ]
  }
];

export const tamilNaduCategories = [
  "All",
  "Family",
  "Friends",
  "Solo",
  "Couple",
  "Temple",
  "Culture"
];

export const tamilNaduBudgetFilters = [
  "All",
  "Under ₹8000",
  "₹8000–₹12000",
  "Above ₹12000"
];

export const tamilNaduDurationFilters = [
  "All",
  "1–2 Days",
  "3–4 Days",
  "5+ Days"
];

export default tamilNaduPackages;
