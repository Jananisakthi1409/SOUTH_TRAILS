# Quick Reference - Data Audit Summary

## 1. DUMMY DATA FILES (5 Total)

| File | Packages | Default Export | Named Exports |
|------|----------|-----------------|----------------|
| tamilNaduPackageData.js | 26 | `tamilNaduPackages` | `tamilNaduCategories`, `tamilNaduBudgetFilters`, `tamilNaduDurationFilters` |
| keraPackageData.js | 17 | `keraPackages` | `filterOptions` |
| karnatakaPackageData.js | 16 | `karnatakaPackages` | `filterOptions` |
| andhraPradeshPackageData.js | 18 | `andhraPradeshPackages` | `filterOptions` |
| packages.js | 15 | `packages` | `categories`, `budgetFilters`, `durationFilters` |
| **TOTAL** | **92** | — | — |

---

## 2. PACKAGE OBJECT FIELDS (Complete List)

```
CORE FIELDS (Always Present):
├─ id (string)                    // Unique identifier
├─ title (string)                 // Package name
├─ destination (string)           // Location
├─ category (string)              // Family/Couple/Friends/Solo/Temple/Culture
├─ days (number)                  // Duration in days
├─ nights (number)                // Duration in nights
├─ price (number)                 // Cost in rupees
├─ rating (number)                // 4.5-5.0 scale
├─ description (string)           // Long description
├─ imageFolder (string)           // Asset folder reference
├─ places (array of strings)      // Locations included
├─ included (array of strings)    // Services/amenities
└─ highlights (array of strings)  // Key features

ADDED BY SERVICE:
└─ state (string)                 // "Tamil Nadu", "Kerala", etc.

OPTIONAL/SEEDING:
└─ status (string)                // "active"
```

---

## 3. COMPONENTS USING PACKAGE DATA

### Direct Data File Imports (12 components):
```
TamilNaduPackages.jsx ..................... imports tamilNaduPackages + filters
KeraPackages.jsx .......................... imports keraPackages + filterOptions
KarnatakaPackages.jsx ..................... imports karnatakaPackages + filterOptions
AndhraPradeshPackages.jsx ................. imports andhraPradeshPackages + filterOptions

TamilNaduPackageDetails.jsx ............... imports tamilNaduPackages
KeraPackageDetails.jsx .................... imports keraPackages
KarnatakaPackageDetails.jsx ............... imports karnatakaPackages
AndhraPradeshPackageDetails.jsx ........... imports andhraPradeshPackages

PackageCategory.jsx ....................... imports packages.js
PackagesBrowse.jsx ........................ imports packages.js + calls getPackages()
AdminPackages.jsx ......................... calls getPackages(), createPackage(), updatePackage(), deletePackage()
AdminDashboard.jsx ........................ calls getPackages()
```

---

## 4. FILTERING OPERATIONS

| Filter Type | Method | Possible Values |
|------------|--------|-----------------|
| **Category** | Direct comparison | Family, Couple, Friends, Solo, Temple, Culture |
| **Budget** | Price range | <₹8000, ₹8000-12000, >₹12000 |
| **Duration** | Days comparison | 1-2 days, 3-4 days, 5+ days |
| **Search** | Text match (case-insensitive) | title, destination, category |
| **Rating** | Numeric threshold | >= minRating value |
| **Sorting** | By field | By rating (default), by price (available) |

---

## 5. FIELDS ACTUALLY USED BY UI

### What's Rendered to Users:
- ✅ title (package name in cards)
- ✅ destination (location display)
- ✅ category (filter display)
- ✅ price (cost display)
- ✅ rating (star display)
- ✅ days (trip length)
- ✅ nights (trip length)
- ✅ description (detail page)
- ✅ places (detail page list)
- ✅ included (detail page list)
- ✅ highlights (detail page list)
- ✅ imageFolder (maps to image assets)

### What's NOT Rendered but Important:
- ⚠️ id (used for routing/identification)
- ⚠️ state (used for filtering/grouping)

### What's Admin-Only:
- status (for package visibility)

---

## 6. SERVICE FILE (packageService.js)

### Key Functions:
```javascript
getPackages({ state, category, search })     // Get filtered packages
getPackageById(id)                            // Get single package
createPackage(packageData)                    // Create new
updatePackage(id, payload)                    // Update existing
deletePackage(id)                             // Delete package
seedPackagesToSupabase()                      // ONE-TIME seed function
```

### Data Processing:
```javascript
normalizePackage(pkg)                         // Ensures numeric price/days/nights
// Converts string prices to numbers, handles missing fields
```

### Fallback Mechanism:
When Supabase unavailable, uses dummy data with state field added:
```javascript
const fallbackPackages = {
  "Tamil Nadu": [...with state added],
  "Kerala": [...with state added],
  "Karnataka": [...with state added],
  "Andhra Pradesh": [...with state added]
}
```

---

## 7. CRITICAL FIELDS FOR SUPABASE

### Currently Seeded (9 fields):
✅ title  
✅ destination  
✅ state  
✅ category  
✅ days  
✅ nights  
✅ price  
✅ description  
✅ status  

### NOT Currently Seeded (6 fields - PROBLEM!):
❌ id  
❌ rating  
❌ imageFolder  
❌ places (array)  
❌ included (array)  
❌ highlights (array)  

### Need to Add for Full Functionality:
⚠️ rating (numeric, display)  
⚠️ imageFolder (string, asset mapping)  
⚠️ places (JSON array)  
⚠️ included (JSON array)  
⚠️ highlights (JSON array)  

---

## 8. CATEGORY & FILTER VALUES

### All Categories:
```javascript
["All", "Family", "Friends", "Solo", "Couple", "Temple", "Culture"]
```

### Budget Filters:
```javascript
// String format (packages.js):
["All", "Under 8000", "8000-12000", "Above 12000"]

// Object format (state files):
[
  { label: "Under ₹8000", min: 0, max: 8000 },
  { label: "₹8000–₹12000", min: 8000, max: 12000 },
  { label: "Above ₹12000", min: 12000, max: 100000 }
]
```

### Duration Filters:
```javascript
// String format (packages.js):
["All", "1-2 Days", "3-4 Days", "5+ Days"]

// Object format (state files):
[
  { label: "1–2 Days", min: 1, max: 2 },
  { label: "3–4 Days", min: 3, max: 4 },
  { label: "5+ Days", min: 5, max: 10 }
]
```

---

## 9. IMPORT DEPENDENCY CHAIN

```
User Views Pages
    ↓
UI Components (TamilNaduPackages.jsx, etc.)
    ↓
    ├─→ Direct Data File Imports (tamilNaduPackageData.js)
    │
    └─→ packageService.js
        ├─→ Falls back to dummy data
        ├─→ OR fetches from Supabase
        └─→ normalizePackage() on results
```

---

## 10. DATA MIGRATION CHECKLIST

- [ ] Add rating to Supabase packages table
- [ ] Add imageFolder to Supabase packages table
- [ ] Add places to Supabase packages table (JSON)
- [ ] Add included to Supabase packages table (JSON)
- [ ] Add highlights to Supabase packages table (JSON)
- [ ] Update seedPackagesToSupabase() to include all 15 fields
- [ ] Update normalizePackage() to handle new fields
- [ ] Update packageService.js mapping to include new fields
- [ ] Replace direct dummy data imports with service calls
- [ ] Store filter metadata in Supabase or keep in code
- [ ] Test all filtering/sorting with seeded data
- [ ] Remove fallback dummy data after full migration

---

## 11. FILE LOCATIONS

### Dummy Data: `/src/pages/Packages/`
- tamilNaduPackageData.js
- keraPackageData.js
- karnatakaPackageData.js
- andhraPradeshPackageData.js
- packages.js

### Services: `/src/services/`
- packageService.js

### UI Components: `/src/pages/Packages/`
- TamilNaduPackages.jsx
- KeraPackages.jsx
- KarnatakaPackages.jsx
- AndhraPradeshPackages.jsx
- TamilNaduPackageDetails.jsx
- KeraPackageDetails.jsx
- KarnatakaPackageDetails.jsx
- AndhraPradeshPackageDetails.jsx
- PackageCategory.jsx
- PackagesBrowse.jsx

### Admin Components: `/src/pages/Booking/`
- AdminPackages.jsx
- AdminDashboard.jsx

---

**Total Package Count:** 92 packages across 5 dummy data files  
**Total Unique Fields:** 15 fields per package (3 admin/optional)  
**Total Components Using Data:** 12+ components  
**Service Functions:** 6 functions (5 CRUD + 1 seeding)  
**Filter Combinations:** 4 categories × 3 budgets × 3 durations = 36 combinations
