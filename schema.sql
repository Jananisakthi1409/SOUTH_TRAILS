create extension if not exists "pgcrypto";

create table admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  name text not null,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table packages (
  id uuid primary key default gen_random_uuid(),
  state text not null,
  title text not null,
  description text not null,
  destination text,
  category text not null,
  price numeric not null,
  days int not null,
  nights int not null,
  image1 text,
  image2 text,
  image3 text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  package_id uuid not null references packages(id) on delete restrict,
  travel_date date not null,
  travelers int not null,
  special_request text,
  status text not null default 'pending',
  total_amount numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_packages_state on packages(state);
create index idx_packages_category on packages(category);
create index idx_bookings_customer_id on bookings(customer_id);
create index idx_bookings_package_id on bookings(package_id);
create index idx_customers_email on customers(email);
create index idx_bookings_travel_date on bookings(travel_date);

alter table packages enable row level security;
alter table customers enable row level security;
alter table bookings enable row level security;
alter table admins enable row level security;

create policy "public read packages" on packages
  for select
  using (true);

create policy "admin package insert" on packages
  for insert
  with check (auth.role() = 'authenticated');

create policy "admin package update" on packages
  for update
  using (auth.role() = 'authenticated');

create policy "admin package delete" on packages
  for delete
  using (auth.role() = 'authenticated');

create policy "authenticated insert customers" on customers
  for insert
  with check (auth.role() = 'authenticated');

create policy "admin select customers" on customers
  for select
  using (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'admin@southtrails.com');

create policy "authenticated insert bookings" on bookings
  for insert
  with check (auth.role() = 'authenticated');

create policy "admin select bookings" on bookings
  for select
  using (auth.role() = 'authenticated' and auth.jwt() ->> 'email' = 'admin@southtrails.com');

create policy "customer select own bookings" on bookings
  for select
  using (auth.role() = 'authenticated' and customer_id = auth.uid());
