# South Trails AI - SIH Transformation Architecture

Goal: transform South Trails from a package booking platform into an AI-powered tourism ecosystem while preserving all existing routes, APIs, package pages, booking pages, profile pages, admin pages, and Spring Boot architecture.

## Preservation Contract

- Keep the customer flow intact: Home -> Packages -> State Package Pages -> Package Details -> Booking Form -> Signup/Login -> Booking Saved -> Profile.
- Keep the admin flow intact: Admin Login -> Dashboard -> Bookings -> Packages -> Customers -> Users -> Analytics.
- Add new SIH features as enhancements beside existing screens.
- Reuse current package, booking, review, wishlist, profile, analytics, image upload, and admin components wherever possible.

## Existing Architecture Assessment

Frontend:
- React + Vite.
- Lazy route registration in `src/App.jsx`.
- Core pages: home, explore, state pages, package browsing, package details, booking, payment, signup, login, profile.
- Advanced pages already present: `/trip-builder`, `/map`, `/mood-quiz`, `/flow`, `/oracle`.
- Admin workspace already present: dashboard, bookings, packages, customers, users, analytics, kanban.

Backend:
- Spring Boot 3.5, Java 21.
- REST controllers for packages, bookings, customers, auth, reviews, wishlist, uploads, analytics, contact, health.
- JPA entities for `TravelPackage`, `Booking`, `Customer`, `Review`, `WishlistItem`, `ContactRequest`, admin accounts, persisted SIH marketplace records, saved itinerary plans, eco scores, and notifications.
- H2 remains available for quick local development. MySQL is now supported through the `mysql` profile with Flyway migrations.

## Current Strengths

- Verified package-to-booking-to-profile flow.
- Admin package and booking management already exists.
- Reviews, wishlist, analytics, and image upload are available.
- Package data has state, category, price, duration, places, inclusions, highlights, ratings, and images.
- Existing advanced pages provide natural entry points for SIH innovation.

## Current Weaknesses

- Customer ownership checks need to be tightened further for booking, itinerary, wishlist, and notification records.
- Marketplace modules now persist seed data, but full admin CRUD and approval workflows are still the next production step.
- Package filtering is currently controller-side in memory.
- Upload validation, MIME checks, rate limiting, audit logs, and refresh-token rotation remain production backlog items.
- AI responses are deterministic and demo-safe; external LLM/RAG integration is intentionally deferred behind the existing `/api/ai/*` contract.

## Implemented SIH Foundation

Added backend AI endpoints:
- `POST /api/ai/itinerary`
- `POST /api/ai/oracle/chat`
- `GET /api/ai/recommendations`
- `GET /api/ai/sentiment/reviews`
- `GET /api/ai/notifications/{customerId}`

Added backend ecosystem MVP endpoints:
- `GET /api/ecosystem/guides`
- `GET /api/ecosystem/homestays`
- `GET /api/ecosystem/events`
- `GET /api/ecosystem/handicrafts`
- `GET /api/ecosystem/eco-scores`
- `GET /api/ecosystem/ar-vr`
- `GET /api/ecosystem/startup-features`

Added frontend integration:
- `src/services/aiTourismService.js`
- `src/services/ecosystemService.js`
- Upgraded `/oracle` to call the catalog-aware Oracle endpoint.
- Upgraded `/trip-builder` to generate an AI itinerary with package matches.
- Added protected `/admin/reviews`.
- Added `/admin/packages/new` as an additive route into the existing package management page.
- Added `/recommendations`.
- Added `/notifications`.
- Added `/guides`.
- Added `/homestays`.
- Added `/events`.
- Added `/marketplace`.
- Added `/eco-tourism`.
- Added `/ar-vr`.
- Added `/startup-features`.

These features currently use deterministic catalog intelligence so they work without an external AI key. A later AI provider can be placed behind the same backend endpoints.

## Completed Production Hardening

Security:
- Added Spring Security with stateless JWT authentication.
- Added BCrypt hashing for new customer passwords and seeded admin passwords.
- Added legacy customer password migration on successful login so older plaintext local data can be upgraded safely.
- Moved admin credentials into the database through `AdminAccount`.
- Seeded the default admin from environment-backed config: `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- Protected admin APIs on the backend, including analytics, package mutations, customer lists, uploads, and booking mutations.
- Added frontend API token forwarding through `src/services/backendApi.js` so existing admin/customer pages continue using the same workflow after login.

Persistence:
- Added MySQL runtime support with `application-mysql.properties`.
- Added Flyway baseline migration at `backend/src/main/resources/db/migration/V1__baseline_schema.sql`.
- Kept H2 for quick local/testing usage by disabling Flyway in default/test profiles.
- Added persisted SIH tables/entities for guides, homestays, events, handicrafts, eco scores, itinerary plans, notifications, and admin accounts.
- Updated seed data so the ecosystem pages can read real persisted records first and fall back to generated package-based data only when needed.

Analytics and Discovery:
- Extended `/api/analytics` with monthly booking trends, revenue by state, sentiment summary, and AI insight cards.
- Upgraded `/admin/analytics` to show trend, revenue, sentiment, top package, and AI insight sections.
- Added a "South Trails AI Ecosystem" discovery section on the home page linking to Oracle, Trip Builder, Guides, Homestays, Events, Marketplace, Eco Tourism, AR/VR, Recommendations, Notifications, and startup-scale features.
- Persisted generated trip plans when a logged-in customer uses Trip Builder.

## Completed MVP Coverage

The SIH feature set is now represented in the running app as additive MVP modules:

- AI Personalized Itinerary Planner: `/trip-builder` with `/api/ai/itinerary`.
- AI Travel Oracle: `/oracle` with `/api/ai/oracle/chat`.
- Smart Recommendation Engine: `/recommendations` with `/api/ai/recommendations`.
- Local Guide Marketplace: `/guides` with `/api/ecosystem/guides`.
- Homestay Marketplace: `/homestays` with `/api/ecosystem/homestays`.
- Handicraft & Cultural Marketplace: `/marketplace` with `/api/ecosystem/handicrafts`.
- Local Events Discovery: `/events` with `/api/ecosystem/events`.
- Interactive Tourism Maps: existing `/map` route remains active.
- AR/VR Destination Preview: `/ar-vr` with `/api/ecosystem/ar-vr`.
- Eco-Tourism Module: `/eco-tourism` with `/api/ecosystem/eco-scores`.
- AI Sentiment Analysis: `/admin/reviews` with `/api/ai/sentiment/reviews`.
- Advanced Tourism Analytics Dashboard: existing `/admin/analytics` route remains active.
- Dynamic Trip Builder: `/trip-builder` now generates day-wise AI plans.
- Notification System: `/notifications` with `/api/ai/notifications/{customerId}`.
- Startup-Scale Features: `/startup-features` with `/api/ecosystem/startup-features`.

MVP means these modules are functional and discoverable, but deeper production workflows such as guide approval, homestay payments, inventory management, loyalty ledger transactions, true 360 media storage, and persisted recommendation events remain Phase 2/3 work.

## New Database Design

Phase 1 tables:
- `user_preferences`: customer interests, budget range, preferred states, travel style, language.
- `itinerary_plans`: saved AI/custom itineraries.
- `itinerary_days`: day-wise activities linked to an itinerary.
- `recommendation_events`: package views, wishlist saves, bookings, dismissals.
- `oracle_sessions`: chat session metadata.
- `oracle_messages`: user and assistant messages with cited package ids.
- `review_sentiments`: sentiment, complaint risk, keywords, model version.
- `notifications`: booking, guide, event, recommendation, loyalty alerts.

Phase 2 tables:
- `guides`, `guide_availability`, `guide_booking_requests`, `guide_reviews`.
- `homestays`, `hosts`, `homestay_availability`, `homestay_bookings`.
- `events`, `event_locations`, `event_alerts`.
- `tourism_locations`: map pins for packages, attractions, hotels, guides, events.
- `eco_metrics`: sustainability and community impact scores per package/destination.

Phase 3 tables:
- `artisans`, `products`, `cultural_experiences`, `marketplace_orders`.
- `destination_media`, `vr_tours`.
- `loyalty_ledger`, `referrals`, `community_posts`, `social_shares`.
- `analytics_snapshots`, `forecast_metrics`.

## Backend Modules

Recommended package boundaries:
- `ai`: itinerary generation, Oracle chat, prompt audit, sentiment analysis.
- `recommendation`: ranking, personalization, interaction events.
- `itinerary`: saved trip plans and custom trip builder.
- `marketplace`: guides, homestays, artisans, cultural experiences.
- `events`: festivals, local events, seasonal attractions.
- `maps`: geocoded tourism layers.
- `sustainability`: eco score and community impact scoring.
- `notifications`: user/admin alerts.
- `analytics`: trend aggregation and demand prediction.
- `security`: JWT, roles, BCrypt, audit.

## Frontend Modules

Enhance existing pages:
- `/oracle`: conversational assistant with multilingual option and package links.
- `/trip-builder`: AI itinerary planner and dynamic custom package builder.
- `/packages`: recommendation strip, eco badges, event/guide/homestay upsells.
- `/package/:packageId`: guide booking, homestays, nearby events, AR/VR preview, reviews sentiment summary.
- `/profile`: saved itineraries, wishlist, notifications, loyalty, referrals.
- `/map`: layered map for destinations, packages, guides, stays, events.
- `/admin/analytics`: trends, forecasts, sentiment, revenue, destination demand.

Add new pages:
- `/recommendations`
- `/guides`
- `/guides/:guideId`
- `/homestays`
- `/homestays/:homestayId`
- `/events`
- `/marketplace`
- `/eco-tourism`
- `/notifications`

## New Admin Features

- AI itinerary monitor.
- Oracle conversation audit and feedback.
- Recommendation strategy tuning.
- Review sentiment and complaint queue.
- Guide verification and guide booking requests.
- Homestay host verification and availability.
- Artisan/product moderation.
- Local events management.
- Eco score management.
- Notification campaigns.
- Loyalty and referral management.
- Predictive demand analytics.

## AI Integration Plan

Step 1: deterministic catalog intelligence.
- Use package title, state, category, destination, price, duration, rating, places, and highlights.
- Already implemented through `/api/ai/*`.

Step 2: AI provider gateway.
- Add `AiGatewayService`.
- Keep API keys only on the backend.
- Return structured JSON to the frontend.
- Store prompt, response, cited package ids, language, confidence, and model version.

Step 3: RAG.
- Index packages, destinations, events, guides, homestays, eco metrics, and reviews.
- Retrieve relevant records before generating.
- Require citations to internal package/destination ids.

Step 4: multilingual.
- Use user language preference.
- Support English, Tamil, Malayalam, Kannada, Telugu, and Hindi.
- Keep package names and booking terms consistent.

## Analytics Plan

Track events:
- Package views.
- Search queries.
- Filter changes.
- Wishlist saves/removals.
- Itinerary generation.
- Oracle prompts.
- Booking creation/status changes.
- Review submission and sentiment.
- Guide/homestay/event interest.

Dashboards:
- Revenue trend.
- Booking funnel.
- Destination popularity.
- State/category demand.
- Seasonal demand forecast.
- Complaint heatmap.
- Eco-tourism impact.
- Community revenue generated through guides, hosts, and artisans.

## Security Enhancements

Completed:
- Added Spring Security.
- Replaced plaintext password creation with BCrypt hashing.
- Replaced pseudo auth tokens with signed JWT access tokens.
- Moved admin credentials to database and environment config.
- Added role-based access control for admin APIs.

Remaining hardening:
- Add refresh-token rotation and token revocation.
- Enforce customer ownership on bookings, reviews, wishlist, itineraries, and notifications.
- Add upload validation, MIME checks, size limits, and safe filenames.
- Add rate limiting for auth and AI endpoints.
- Add audit logs for admin actions.

## Scalability Improvements

Completed:
- Added a MySQL production profile.
- Added Flyway baseline migrations.

Remaining scalability work:
- Add pagination to package, booking, customer, review, and analytics APIs.
- Push package filtering into repository queries.
- Add indexes for package state/category/price/rating, booking customer/status/travel date, review package/customer, and analytics event time.
- Add Redis for catalog, recommendation, and analytics caching.
- Add object storage/CDN for uploads and VR media.
- Use async jobs for sentiment, notifications, and forecast aggregation.

## Deployment Architecture

Recommended production deployment:
- Vite static frontend behind CDN or Nginx.
- Spring Boot API behind reverse proxy.
- MySQL database.
- Redis cache.
- Object storage for package images and AR/VR media.
- Backend-only AI provider integration.
- Scheduled worker jobs for analytics and sentiment.
- Observability through structured logs, metrics, traces, and uptime checks.

## Phase-Wise Roadmap

Phase 1: Production Foundation and AI Entry
- Preserve all routes. Completed.
- Add missing admin routes. Completed.
- Add AI itinerary, Oracle, recommendations, sentiment, notifications. Completed.
- Add JWT/BCrypt/security hardening. Completed for access tokens and role protection; refresh tokens, ownership rules, rate limiting, and audit logs remain.
- Move from H2 local config to MySQL production profile. Completed.
- Effort: Medium to High.

Phase 2: Personalization and Analytics
- Persist itineraries. Completed for Trip Builder requests with a logged-in customer.
- Persist preferences and recommendation events.
- Build profile notification center.
- Build advanced admin analytics and sentiment dashboard. Completed as an MVP; predictive forecasting remains.
- Effort: High.

Phase 3: Community Tourism Ecosystem
- Guides marketplace. Persisted MVP completed; admin CRUD and guide request workflow remain.
- Homestay marketplace. Persisted MVP completed; host onboarding and availability remain.
- Events discovery. Persisted MVP completed; event management remains.
- Eco-tourism scoring. Persisted MVP completed; scoring governance remains.
- Map layers.
- Effort: High.

Phase 4: Startup-Scale Growth
- Handicraft and cultural marketplace.
- AR/VR previews.
- Loyalty points.
- Referral system.
- Travel communities.
- Social sharing.
- Effort: High.

## Implementation Priority Matrix

P1:
- Secure auth. Completed.
- MySQL migrations. Completed.
- AI itinerary planner. Completed.
- Oracle chat. Completed.
- Recommendations. Completed.
- Admin review sentiment. Completed.
- Advanced analytics. Completed MVP.

P2:
- Notifications. Completed MVP.
- Events. Completed MVP.
- Eco scores. Completed MVP.
- Guide marketplace. Completed persisted MVP.
- Homestays. Completed persisted MVP.
- Interactive map layers.

P3:
- Handicraft marketplace.
- AR/VR previews.
- Loyalty/referrals.
- Communities/social sharing.

## Reuse Map

Reuse immediately:
- `TravelPackage` for itinerary, Oracle, recommendations, maps, eco badges.
- `Booking` for demand, notifications, recommendation history.
- `Review` for sentiment and quality analytics.
- `WishlistItem` for recommendations.
- Existing admin cards, tables, and route guards for new admin panels.
- Existing package detail and booking pages for conversion.

Do not replace:
- Package browsing flow.
- State package pages.
- Package detail pages.
- Booking form.
- Signup/login.
- Booking success.
- Profile.
- Admin dashboard/bookings/packages/customers/users/analytics.
- Current Spring Boot REST architecture.
