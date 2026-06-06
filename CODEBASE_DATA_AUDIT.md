# South India Explorer AI - Complete Codebase Data Audit

**Date:** 2025-06-06  
**Purpose:** Comprehensive inventory of all dummy data, structures, components, and data flow for Supabase migration

---

## 1. ALL DUMMY DATA FILES INVENTORY

### Location: `src/pages/Packages/`

#### 1.1 **tamilNaduPackageData.js**
- **Export Type:** Named + Default
- **Data Array:** `tamilNaduPackages` (26 packages)
- **Additional Exports:**
  - `tamilNaduCategories` - Array of category filters
  - `tamilNaduBudgetFilters` - Array of budget range filters
  - `tamilNaduDurationFilters` - Array of duration range filters

#### 1.2 **keraPackageData.js**
- **Export Type:** Named + Default
- **Data Array:** `keraPackages` (17 packages)
- **Additional Exports:**
  - `filterOptions` - Object with `categories`, `budgets` (with min/max), `durations` (with min/max)

#### 1.3 **karnatakaPackageData.js**
- **Export Type:** Named + Default
- **Data Array:** `karnatakaPackages` (16 packages)
- **Additional Exports:**
  - `filterOptions` - Object with `categories`, `budgets` (with min/max), `durations` (with min/max)

#### 1.4 **andhraPradeshPackageData.js**
- **Export Type:** Named + Default
- **Data Array:** `andhraPradeshPackages` (18 packages)
- **Additional Exports:**
  - `filterOptions` - Object with `categories`, `budgets` (with min/max), `durations` (with min/max)

#### 1.5 **packages.js**
- **Export Type:** Named + Default
- **Data Array:** `packages` (15 mixed state packages for browsing)
- **Additional Exports:**
  - `categories` - Array: ["All", "Family", "Friends", "Solo", "Couple", "Temple"]
  - `budgetFilters` - Array: ["All", "Under 8000", "8000-12000", "Above 12000"]
  - `durationFilters` - Array: ["All", "1-2 Days", "3-4 Days", "5+ Days"]

---

## 2. PACKAGE DATA STRUCTURE - COMPLETE FIELD MAPPING

### Standard Package Object Fields (All Found in Dummy Data)

```javascript
{
  // Identifiers
  id: string,                  // "tamil-ooty-family" or numeric "1"
  
  // Core Information
  title: string,              // "Ooty Family Escape"
  destination: string,        // "Ooty"
  category: string,           // "Family", "Couple", "Friends", "Solo", "Temple", "Culture"
  state: string,              // "Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh" (added by service)
  
  // Duration & Pricing
  days: number,               // 2, 3, 4, 5
  nights: number,             // 1, 2, 3, 4
  price: number,              // 5499, 8999, 12999, etc.
  
  // Ratings & Reviews
  rating: number,             // 4.5, 4.6, 4.7, 4.8, 4.9, 5.0
  
  // Media & Images
  imageFolder: string,        // "ooty", "kodaikanal", "kochi", etc.
  
  // Content
  description: string,        // Detailed package description
  places: string[],           // Array of location names
  included: string[],         // Array of services/amenities included
  highlights: string[],       // Array of key highlights/features
  
  // Metadata (optional)
  status: string              // "active" (used in seeding)
}
```

### Field Count Summary
- **Total Fields:** 15-16 per package
- **Always Present:** id, title, destination, category, days, nights, price, rating, imageFolder, description, places, included, highlights
- **Conditional:** state (added by service), status (for seeding)

---

## 3. CATEGORY & FILTER EXPORTS BREAKDOWN

### Category Values (All States)
```javascript
// All data files export these categories in various formats
Categories: [
  "All",
  "Family",
  "Friends", 
  "Solo",
  "Couple",
  "Temple",
  "Culture" // Tamil Nadu only
]
```

### Budget Filters
```javascript
// packages.js format (strings):
["All", "Under 8000", "8000-12000", "Above 12000"]

// State-specific format (objects with min/max):
[
  { label: "Under ₹8000", min: 0, max: 8000 },
  { label: "₹8000–₹12000", min: 8000, max: 12000 },
  { label: "Above ₹12000", min: 12000, max: 100000 }
]
```

### Duration Filters
```javascript
// packages.js format (strings):
["All", "1-2 Days", "3-4 Days", "5+ Days"]

// State-specific format (objects with min/max):
[
  { label: "1–2 Days", min: 1, max: 2 },
  { label: "3–4 Days", min: 3, max: 4 },
  { label: "5+ Days", min: 5, max: 10 }
]
```

---

## 4. ALL SERVICE FILES & DATA USAGE

### **src/services/packageService.js**
**Primary Service for Package Management**

**Imports All Dummy Data:**
```javascript
import tamilNaduPackages from "../pages/Packages/tamilNaduPackageData";
import keraPackages from "../pages/Packages/keraPackageData";
import karnatakaPackages from "../pages/Packages/karnatakaPackageData";
import andhraPradeshPackages from "../pages/Packages/andhraPradeshPackageData";
import packagesData from "../pages/Packages/packages";
```

**Fallback Data Structure:**
- Creates `fallbackPackages` object that maps state names to arrays with state field added
- Used when Supabase is not available

**Core Functions:**
1. `getPackages({ state, category, search })` - Get filtered packages
2. `getPackageById(id)` - Get single package by ID
3. `createPackage(packageData)` - Create new package
4. `updatePackage(id, payload)` - Update existing package
5. `deletePackage(id)` - Delete package
6. **`seedPackagesToSupabase()`** - One-time seed function (critical)

**Data Normalization:**
- `normalizePackage()` - Converts package objects, ensuring numeric types for price, days, nights

**Seeding Payload Mapping** (Important for Supabase schema):
```javascript
// Maps dummy data to these fields only:
{
  title: string,
  destination: string,
  state: string,
  category: string,
  days: number,
  nights: number,
  price: number,
  description: string,
  status: string  // hardcoded "active"
}
```

---

## 5. ALL COMPONENTS & PAGES CONSUMING PACKAGE DATA

### Direct Data File Imports (Components):

#### State-Specific Package Pages:
| File | Imports | Uses |
|------|---------|------|
| `TamilNaduPackages.jsx` | tamilNaduPackages, tamilNaduCategories, tamilNaduBudgetFilters, tamilNaduDurationFilters | Direct filtering, rendering |
| `KeraPackages.jsx` | keraPackages, filterOptions | Direct filtering, rendering |
| `KarnatakaPackages.jsx` | karnatakaPackages, filterOptions | Direct filtering, rendering |
| `AndhraPradeshPackages.jsx` | andhraPradeshPackages, filterOptions | Direct filtering, rendering |

#### Detail Pages:
| File | Imports | Purpose |
|------|---------|---------|
| `TamilNaduPackageDetails.jsx` | tamilNaduPackages | Display package details |
| `KeraPackageDetails.jsx` | keraPackages | Display package details |
| `KarnatakaPackageDetails.jsx` | karnatakaPackages | Display package details |
| `AndhraPradeshPackageDetails.jsx` | andhraPradeshPackages | Display package details |

#### Other Pages Using Services:
| File | Service Call | Purpose |
|------|--------------|---------|
| `PackagesBrowse.jsx` | getPackages() | Browse all packages, apply filters |
| `PackageCategory.jsx` | Direct import from packages.js | Show category-filtered view |
| `AdminPackages.jsx` | getPackages(), createPackage(), updatePackage(), deletePackage() | Admin CRUD operations |
| `AdminDashboard.jsx` | getPackages() | Display total packages count |

---

## 6. DATA FILTERING, SORTING & PROCESSING

### Filtering Operations (All Pages):

#### **Category Filtering**
- **Where:** All state package pages + PackagesBrowse
- **Method:** `pkg.category === selectedCategory`
- **Values:** Family, Friends, Solo, Couple, Temple, Culture

#### **Budget/Price Filtering**
```javascript
// packages.js (string-based)
if (selectedBudget === "Under 8000") budgetMatch = pkg.price < 8000;
else if (selectedBudget === "8000-12000") budgetMatch = pkg.price >= 8000 && pkg.price <= 12000;
else if (selectedBudget === "Above 12000") budgetMatch = pkg.price > 12000;

// State pages (min/max format)
const isInRange = pkg.price >= min && pkg.price <= max;
```

#### **Duration Filtering**
```javascript
if (selectedDuration === "1–2 Days") durationMatch = pkg.days <= 2;
else if (selectedDuration === "3–4 Days") durationMatch = pkg.days >= 3 && pkg.days <= 4;
else if (selectedDuration === "5+ Days") durationMatch = pkg.days >= 5;
```

#### **Search Filtering** (packageService.js)
```javascript
const query = search.toLowerCase();
packages = packages.filter(pkg =>
  pkg.title.toLowerCase().includes(query) ||
  pkg.destination.toLowerCase().includes(query) ||
  pkg.category.toLowerCase().includes(query)
);
```

#### **Rating Filtering** (PackagesBrowse.jsx)
```javascript
const ratingMatch = pkg.rating >= minRating;
```

### Sorting Operations:
- **PackagesBrowse.jsx:** Can sort by "rating" (property mentioned)
- **packageService.js:** Orders by `created_at` when fetching from Supabase

### Search Capabilities:
- **packageService.js:** Uses ilike (case-insensitive) query on title in Supabase
- **PackagesBrowse.jsx:** Client-side search on title, destination, category

---

## 7. COMPLETE FIELD USAGE BY UI COMPONENTS

### Display/Rendering Fields Used:

| Component | Fields Used |
|-----------|------------|
| Package Cards | id, title, destination, category, price, rating, imageFolder, days, nights |
| Package Details | id, title, destination, category, days, nights, price, rating, description, places, included, highlights, imageFolder |
| Admin Forms | title, destination, state, price, days, nights, category, description, status |
| Admin Dashboard | title (from package relation) |
| Filter Dropdowns | category, (computed from rating, price, days) |
| Search Results | title, destination, category |

### Core Fields That MUST Be Preserved:
```javascript
// Essential for UI to function
- id (identifier for routing)
- title (display in cards/details)
- destination (location name)
- category (filtering, display)
- price (display, sorting, filtering)
- days (display, filtering)
- nights (display)
- rating (display, filtering, sorting)
- description (detail page)
- places (detail page list)
- included (detail page list)
- highlights (detail page list)
- imageFolder (maps to image assets)

// Administrative
- state (grouping, filtering)
- status (admin panel, package visibility)
```

---

## 8. DATA FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│              DUMMY DATA FILES (src/pages/Packages/)          │
│  - tamilNaduPackageData.js (26 packages)                    │
│  - keraPackageData.js (17 packages)                         │
│  - karnatakaPackageData.js (16 packages)                    │
│  - andhraPradeshPackageData.js (18 packages)                │
│  - packages.js (15 generic packages)                        │
└────┬──────────────────────────────────────────┬─────────────┘
     │                                          │
     ├──► DIRECT IMPORTS ─────────────┐         │
     │    (State Pages)               │         │
     │                                │         │
     │    TamilNaduPackages.jsx       │         │
     │    KeraPackages.jsx            │         │
     │    KarnatakaPackages.jsx       │         │
     │    AndhraPradeshPackages.jsx   │         │
     │    Detail Pages (4x)           │         │
     │    PackageCategory.jsx         ├──► UI RENDERING
     │                                │    & FILTERING
     │                                │
     └──────────────────────────────────┘         │
                                                   │
     ┌──────────────────────────────────┐         │
     │  packageService.js               │◄────────┘
     │  - Imports all dummy data        │
     │  - Provides fallback when        │
     │    Supabase unavailable          │
     └────┬──────────────────────┬──────┘
          │                      │
    CRUD  │                      │  SEED
  Functions│                      │ Function
          │                      │
          ▼                      ▼
    PackagesBrowse    seedPackagesToSupabase()
    AdminPackages     │
    AdminDashboard    │ Maps to Supabase Schema
                      │ (title, destination, state,
                      │  category, days, nights,
                      │  price, description, status)
                      ▼
              SUPABASE DATABASE
              (packages table)
```

---

## 9. SUPABASE SCHEMA MAPPING

### Current Seeding Strategy (from seedPackagesToSupabase())
**Fields Sent to Supabase:**
- title (string)
- destination (string)
- state (string) - Added by service
- category (string)
- days (number)
- nights (number)
- price (number)
- description (string)
- status (string) - Default: "active"

### Fields NOT Currently Seeded to Supabase:
- ❌ id (from dummy data)
- ❌ rating (UI only)
- ❌ imageFolder (UI mapping only)
- ❌ places (array)
- ❌ included (array)
- ❌ highlights (array)

### Recommendation:
**These fields should be added to Supabase schema and seeding for complete functionality:**
- rating (numeric)
- places (JSON array or text)
- included (JSON array or text)
- highlights (JSON array or text)
- imageFolder (string reference)

---

## 10. KEY DEPENDENCIES & RELATIONSHIPS

### Import Dependency Chain:
```
UI Pages (*.jsx)
    │
    ├─► Direct Data File Imports
    │   └─► packageService.js (fallback)
    │
    └─► packageService.js
        ├─► All 4 state data files
        ├─► packages.js
        └─► supabase client
```

### Component Hierarchy:
```
State Package Pages (TamilNaduPackages, etc.)
    ├─► Package Card Components
    │   └─► Uses: title, price, rating, imageFolder
    ├─► Filter Sections
    │   └─► Uses: categories, budgetFilters, durationFilters
    └─► Detail Redirects

Detail Pages (TamilNaduPackageDetails, etc.)
    ├─► Hero Gallery
    │   └─► Uses: imageFolder (maps to assets)
    ├─► Package Info Section
    │   └─► Uses: title, destination, price, rating, category
    ├─► Description Section
    │   └─► Uses: description, highlights, included
    └─► Booking Form
        └─► Uses: id, price, days, nights
```

---

## 11. TOTAL INVENTORY SUMMARY

### Package Statistics:
- **Total Packages:** 92 dummy packages across all files
  - Tamil Nadu: 26
  - Kerala: 17
  - Karnataka: 16
  - Andhra Pradesh: 18
  - Generic/Browse: 15

### Component Statistics:
- **Direct Data Import Components:** 12 (4 state pages + 4 detail pages + 2 category/browse)
- **Service-Dependent Components:** 3 (AdminPackages, AdminDashboard, PackagesBrowse)
- **Non-Package Components:** Several (FeaturedEscapes uses hardcoded data, not dummy packages)

### Export Statistics:
- **Total Exports:** 20+ named exports + 5 default exports
- **Filter Objects:** 4 filterOptions objects + 2 individual filter exports
- **Categories:** 7 unique category types

### Field Statistics:
- **Core Fields in Every Package:** 12-13 fields
- **Optional Fields:** 2-3 fields (status, state)
- **Array Fields:** 4 (places, included, highlights, plus computed filters)

---

## 12. CRITICAL NOTES FOR MIGRATION

### What Works Currently:
✅ All pages fetch data directly from dummy files or via fallback in packageService  
✅ Filtering works on client-side for all categories, budgets, durations  
✅ Search works via packageService with Supabase queries  
✅ Seeding function exists but only sends 9 fields to DB  

### What Will Break If Not Handled:
❌ imageFolder mapping (UI asset references) - not in Supabase schema  
❌ rating field - not seeded, only in dummy data  
❌ places, included, highlights arrays - not seeded, only in dummy data  
❌ Filter metadata (filterOptions) - stored in code, not in DB  

### What Needs Adjustment:
⚠️ Fallback mechanism in packageService still points to old data  
⚠️ Direct imports in state pages need to be removed after full migration  
⚠️ Seeding function needs to include all fields, not just 9  
⚠️ normalizePackage function needs to handle missing fields gracefully  

---

## 13. QUICK REFERENCE - FILES TO REVIEW

### Dummy Data Files (5):
1. [tamilNaduPackageData.js](src/pages/Packages/tamilNaduPackageData.js)
2. [keraPackageData.js](src/pages/Packages/keraPackageData.js)
3. [karnatakaPackageData.js](src/pages/Packages/karnatakaPackageData.js)
4. [andhraPradeshPackageData.js](src/pages/Packages/andhraPradeshPackageData.js)
5. [packages.js](src/pages/Packages/packages.js)

### Service Files (1):
1. [packageService.js](src/services/packageService.js)

### Component Files (12):
- State Pages: TamilNaduPackages, KeraPackages, KarnatakaPackages, AndhraPradeshPackages
- Detail Pages: TamilNaduPackageDetails, KeraPackageDetails, KarnatakaPackageDetails, AndhraPradeshPackageDetails
- Browse/Admin: PackagesBrowse, PackageCategory, AdminPackages, AdminDashboard

---

**Audit Completed:** Ready for Supabase migration planning and implementation.
