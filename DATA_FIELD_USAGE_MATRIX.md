# Data Field Usage Matrix - Which Components Use Which Fields

## Field Usage Across All Components

### Display in Package Cards (All State Pages, Browse, Category)
```
┌─────────────────────────────────────────┐
│  PACKAGE CARD DISPLAY                   │
├─────────────────────────────────────────┤
│  [Image from imageFolder]               │
│  Title: {title}                         │
│  ⭐ {rating}                            │
│  📍 {destination}                       │
│  ₹{price}                               │
│  {days}D/{nights}N                      │
│  Category: {category}                   │
└─────────────────────────────────────────┘

Fields Used: 7
├─ imageFolder (asset mapping)
├─ title
├─ rating
├─ destination
├─ price
├─ days
├─ nights
└─ category
```

### Display in Package Details Page
```
┌──────────────────────────────────────────┐
│  PACKAGE DETAILS                         │
├──────────────────────────────────────────┤
│  [Multiple images from imageFolder]      │
│  Title: {title}                          │
│  Destination: {destination}              │
│  Category: {category}                    │
│  ⭐ {rating}/5.0                         │
│  ₹{price} for {days}D/{nights}N          │
│  Description: {description}              │
│                                          │
│  🎯 HIGHLIGHTS:                          │
│  • {highlights[0]}                       │
│  • {highlights[1]}                       │
│  • {highlights[2]}                       │
│  • {highlights[3]}                       │
│                                          │
│  📍 PLACES COVERED:                      │
│  • {places[0]}                           │
│  • {places[1]}                           │
│  • {places[2]}                           │
│                                          │
│  ✓ INCLUDED:                             │
│  • {included[0]}                         │
│  • {included[1]}                         │
│  • {included[2]}                         │
│                                          │
│  [Booking Form - Uses id, price, days]  │
└──────────────────────────────────────────┘

Fields Used: 13 (ALL fields)
├─ id (routing)
├─ title
├─ destination
├─ category
├─ rating
├─ price
├─ days
├─ nights
├─ description
├─ imageFolder
├─ places (array)
├─ included (array)
└─ highlights (array)
```

### Display in Admin Management Panel
```
┌──────────────────────────────────────────┐
│  ADMIN PACKAGE FORM                      │
├──────────────────────────────────────────┤
│  Input: Title: ____________ {title}      │
│  Input: Destination: ______ {destination}│
│  Select: State: __________ {state}       │
│  Input: Category: _________ {category}   │
│  Input: Price: ₹__________ {price}       │
│  Input: Days: ____________ {days}        │
│  Input: Nights: __________ {nights}      │
│  TextArea: Description __ {description}  │
│  Input: Images (up to 3) _ {images[]}    │
│  Select: Status: _________ {status}      │
│                                          │
│  [Package List Table with id/title/...]  │
└──────────────────────────────────────────┘

Fields Used: 9
├─ id (identification)
├─ title
├─ destination
├─ state
├─ category
├─ price
├─ days
├─ nights
├─ description
└─ status
```

### Display in Filter/Search UIs
```
┌──────────────────────────────────────────┐
│  FILTER DROPDOWNS                        │
├──────────────────────────────────────────┤
│  CATEGORY: All / Family / Couple / ...   │
│  (Reads from: category field on PKGs)    │
│                                          │
│  BUDGET: <8000 / 8000-12000 / >12000    │
│  (Reads from: price field on PKGs)       │
│                                          │
│  DURATION: 1-2D / 3-4D / 5+D            │
│  (Reads from: days field on PKGs)        │
│                                          │
│  SEARCH: [search box]                    │
│  (Searches: title, destination, category)│
│                                          │
│  RATING: ★★★★☆ and up                   │
│  (Reads from: rating field on PKGs)      │
└──────────────────────────────────────────┘

Fields Used: 5
├─ category
├─ price (computed)
├─ days (computed)
├─ title (search)
└─ rating
```

### Display in Admin Dashboard
```
┌──────────────────────────────────────────┐
│  DASHBOARD METRICS                       │
├──────────────────────────────────────────┤
│  Total Packages: {count of all packages} │
│  Recent Bookings: {booking.package.title}│
│  Total Revenue: {sum of booking.amount}  │
└──────────────────────────────────────────┘

Fields Used: 2
├─ (count operation only)
└─ (references package via relation)
```

---

## Complete Field Matrix by Component Type

| Field | Cards | Details | Admin | Filters | Dashboard | Booking |
|-------|-------|---------|-------|---------|-----------|---------|
| id | - | ✓ (route) | ✓ | - | - | ✓ |
| title | ✓ | ✓ | ✓ | ✓ (search) | ✓ (relation) | - |
| destination | ✓ | ✓ | ✓ | ✓ (search) | - | - |
| category | ✓ | ✓ | ✓ | ✓ (filter) | - | - |
| price | ✓ | ✓ | ✓ | ✓ (compute) | - | ✓ |
| days | ✓ | ✓ | ✓ | ✓ (compute) | - | ✓ |
| nights | ✓ | ✓ | ✓ | - | - | ✓ |
| rating | ✓ | ✓ | - | ✓ (filter) | - | - |
| description | - | ✓ | ✓ | - | - | - |
| places | - | ✓ | - | - | - | - |
| included | - | ✓ | - | - | - | - |
| highlights | - | ✓ | - | - | - | - |
| imageFolder | ✓ | ✓ | - | - | - | - |
| state | - | - | ✓ | - | - | - |
| status | - | - | ✓ | - | - | - |

**Legend:** ✓ = Used, - = Not Used

---

## Summary by Field (What Breaks If Missing)

### CRITICAL FIELDS (App breaks if missing):
1. **id** - Routing breaks, cannot identify packages
2. **title** - Cards/details are empty, search broken
3. **price** - Sorting/filtering broken, displays show "NaN"
4. **category** - Category filter broken, searches fail

### IMPORTANT FIELDS (Features break if missing):
5. **imageFolder** - No images display, cards look broken
6. **rating** - Sorting/filtering broken, star display empty
7. **days/nights** - Duration display broken, trip length unknown
8. **destination** - Location info missing

### CONTENT FIELDS (Detail page broken if missing):
9. **description** - Detail page shows incomplete info
10. **places** - No location list on detail page
11. **included** - No services listed on detail page
12. **highlights** - No highlights shown on detail page

### ADMINISTRATIVE FIELDS (Admin panel issues):
13. **state** - Grouping/filtering broken in admin
14. **status** - Cannot manage package visibility

---

## Data Requirements by Usage Pattern

### Read-Only Usage (Display Only):
✓ All 15 fields can be read-only in Supabase  
✓ No special permissions needed for display

### Write Operations (Admin Panel):
- Must support CREATE with: title, destination, state, category, price, days, nights, description, status
- Must support UPDATE with: all writeable fields
- Must support DELETE by id

### Search Operations:
- Must support full-text search or ILIKE on: title, destination, category
- Must support filtering on: category, price range, days range, rating range

### Sorting Operations:
- Must support sort by: rating, price, days, created_at

---

## Image Asset References

### imageFolder Values in Use:
```
Locations with Images:
├─ ooty
├─ kodaikanal
├─ madurai
├─ kanyakumari
├─ rameswaram
├─ puducherry
├─ valparai
├─ yercaud
├─ coimbatore
├─ chettinad
├─ allapey (sic - spelling in data)
├─ munnar
├─ wayanad
├─ kochi
├─ backwater
├─ tirumala
├─ araku
├─ rkbeach
├─ boraka
├─ coorg
├─ hampi
├─ mysore
├─ jogfalls
└─ gokarna
```

**Total:** 24 unique destination folders with images

### Image Asset Path Pattern:
```
src/pages/state/tamilnadu/{imageFolder}/*.{png,jpg,jpeg}
```

Each destination typically has 3-6 images that are loaded dynamically via Vite's import.meta.glob()

---

## Performance Considerations

### Data Size:
- Total packages: 92
- Avg fields per package: 15
- Avg array fields size: 3-5 items per array
- **Estimated payload per package:** ~500 bytes of JSON

### Query Optimization:
- Filter on: category, price, days (indexed columns recommended)
- Search on: title (indexed column recommended)
- Sort by: rating, price, created_at (indexed columns recommended)

### Caching Strategy:
- Current: In-memory via state hooks
- Fallback: Dummy data in JS (immediate load)
- Recommended: Browser cache + Supabase queries

---

## Missing Fields That Should Be Added to Supabase

Current schema only has 9 fields. These 6 are missing but essential:

| Field | Type | Why Needed | Current Source |
|-------|------|-----------|-----------------|
| rating | numeric | Display, sorting, filtering | Dummy data only |
| imageFolder | string | Asset mapping for UI | Dummy data only |
| places | JSON array | Detail page display | Dummy data only |
| included | JSON array | Detail page display | Dummy data only |
| highlights | JSON array | Detail page display | Dummy data only |
| id (UUID) | uuid | Primary key (if not using serial) | Dummy data string ID |

---

## Next Steps for Complete Migration

1. **Update Supabase Schema** with missing fields
2. **Update seedPackagesToSupabase()** in packageService.js to include all 15 fields
3. **Update normalizePackage()** to map all fields from Supabase
4. **Update UI Components** to use service calls instead of direct imports
5. **Verify** all filtering/sorting works with seeded data
6. **Add** imageFolder to Supabase for dynamic asset mapping
7. **Convert** array fields to JSON for Supabase storage
8. **Test** all features with full Supabase data
