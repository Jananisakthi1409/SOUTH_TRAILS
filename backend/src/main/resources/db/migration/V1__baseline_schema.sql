create table if not exists admin_account (
  id varchar(64) primary key,
  email varchar(255) not null unique,
  password_hash varchar(255) not null,
  name varchar(255) not null,
  role varchar(32) not null default 'ADMIN',
  active bit not null default 1,
  created_at datetime(6)
);

create table if not exists customer (
  id varchar(64) primary key,
  name varchar(255) not null,
  email varchar(255) not null unique,
  phone varchar(32),
  password varchar(255),
  created_at datetime(6)
);

create table if not exists travel_package (
  id varchar(128) primary key,
  title varchar(255) not null,
  destination varchar(255),
  state varchar(100),
  category varchar(100) not null,
  days int,
  nights int,
  price decimal(12,2),
  description text,
  rating double,
  image_folder varchar(255),
  image1 varchar(1024),
  image2 varchar(1024),
  image3 varchar(1024),
  status varchar(32),
  created_at datetime(6)
);

create table if not exists travel_package_places (
  travel_package_id varchar(128) not null,
  places varchar(512),
  constraint fk_package_places foreign key (travel_package_id) references travel_package(id) on delete cascade
);

create table if not exists travel_package_included (
  travel_package_id varchar(128) not null,
  included varchar(512),
  constraint fk_package_included foreign key (travel_package_id) references travel_package(id) on delete cascade
);

create table if not exists travel_package_highlights (
  travel_package_id varchar(128) not null,
  highlights varchar(512),
  constraint fk_package_highlights foreign key (travel_package_id) references travel_package(id) on delete cascade
);

create table if not exists booking (
  id varchar(128) primary key,
  customer_id varchar(64) not null,
  package_id varchar(128) not null,
  package_snapshot text,
  travel_date date,
  travelers int,
  status varchar(40),
  total_amount decimal(12,2),
  special_request text,
  created_at datetime(6)
);

create table if not exists review (
  id varchar(128) primary key,
  customer_id varchar(64) not null,
  package_id varchar(128) not null,
  rating int,
  text text,
  created_at datetime(6)
);

create table if not exists wishlist_item (
  id varchar(128) primary key,
  customer_id varchar(64) not null,
  package_id varchar(128) not null,
  created_at datetime(6),
  unique key uq_wishlist_customer_package (customer_id, package_id)
);

create table if not exists contact_request (
  id varchar(128) primary key,
  name varchar(255),
  email varchar(255),
  phone varchar(32),
  subject varchar(255),
  message text,
  status varchar(40),
  created_at datetime(6)
);

create table if not exists guide_profile (
  id varchar(128) primary key,
  name varchar(255) not null,
  state varchar(100),
  base_location varchar(255),
  speciality varchar(255),
  languages varchar(512),
  rating double,
  verified bit not null default 0,
  price_per_day int,
  package_id varchar(128),
  created_at datetime(6)
);

create table if not exists homestay_listing (
  id varchar(128) primary key,
  name varchar(255) not null,
  state varchar(100),
  location varchar(255),
  host varchar(255),
  capacity int,
  price_per_night int,
  community_score int,
  amenities varchar(512),
  package_id varchar(128),
  created_at datetime(6)
);

create table if not exists local_event (
  id varchar(128) primary key,
  title varchar(255) not null,
  state varchar(100),
  location varchar(255),
  season varchar(100),
  category varchar(100),
  impact text,
  package_id varchar(128),
  created_at datetime(6)
);

create table if not exists handicraft_product (
  id varchar(128) primary key,
  product varchar(255) not null,
  artisan varchar(255),
  state varchar(100),
  origin varchar(255),
  price int,
  experience text,
  package_id varchar(128),
  created_at datetime(6)
);

create table if not exists eco_score (
  id varchar(128) primary key,
  package_id varchar(128) not null unique,
  sustainability_score int,
  community_impact_score int,
  green_indicators varchar(512),
  created_at datetime(6)
);

create table if not exists itinerary_plan (
  id varchar(128) primary key,
  customer_id varchar(64),
  title varchar(255),
  state varchar(100),
  travel_style varchar(100),
  budget decimal(12,2),
  duration int,
  travelers int,
  interests varchar(512),
  plan_json text,
  created_at datetime(6)
);

create table if not exists notification_item (
  id varchar(128) primary key,
  customer_id varchar(64),
  type varchar(80),
  title varchar(255),
  message text,
  read_flag bit not null default 0,
  created_at datetime(6)
);

create index idx_package_state on travel_package(state);
create index idx_package_category on travel_package(category);
create index idx_booking_customer on booking(customer_id);
create index idx_booking_package on booking(package_id);
create index idx_review_package on review(package_id);
create index idx_notification_customer on notification_item(customer_id);
