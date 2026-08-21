import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import SpinnerMini from "../ui/SpinnerMini";

import { cabins as fixtureCabins } from "./data-cabins";

// ---------------------------------------------------------------------------
// Random data generators
// ---------------------------------------------------------------------------

const FIRST_NAMES = [
  "Erik", "Astrid", "Lars", "Ingrid", "Sven", "Freja", "Olav", "Maja",
  "Nils", "Elsa", "Anders", "Linnea", "Johan", "Saga", "Mikael", "Tuva",
  "Emma", "Noah", "Sofia", "Lucas", "Amir", "Leila", "Marco", "Chiara",
  "James", "Emily", "Pierre", "Camille", "Kenji", "Yuki",
  "Youssef", "Fatima", "Omar", "Salma", "Tariq", "Amina", "Karim", "Nour",
  "Kwame", "Zainab", "Chidi", "Ngozi", "Sipho", "Amara", "Tesfaye", "Wanjiru",
];

const LAST_NAMES = [
  "Andersson", "Johansson", "Karlsson", "Nilsson", "Eriksson", "Larsson",
  "Olsen", "Hansen", "Berg", "Lindqvist", "Virtanen", "Korhonen",
  "Smith", "Müller", "Rossi", "Dubois", "García", "Tanaka", "Hassan", "Novak",
  "Ibrahim", "El-Sayed", "Benali", "Al-Farsi", "Haddad", "Mansour",
  "Okafor", "Mensah", "Diallo", "Abebe", "Mwangi", "Nkosi",
];

const NATIONALITIES = [
  { nationality: "Sweden", code: "se" },
  { nationality: "Norway", code: "no" },
  { nationality: "Denmark", code: "dk" },
  { nationality: "Finland", code: "fi" },
  { nationality: "Germany", code: "de" },
  { nationality: "Great Britain", code: "gb" },
  { nationality: "France", code: "fr" },
  { nationality: "Italy", code: "it" },
  { nationality: "Spain", code: "es" },
  { nationality: "United States of America", code: "us" },
  { nationality: "Japan", code: "jp" },
  { nationality: "Netherlands", code: "nl" },
  { nationality: "Egypt", code: "eg" },
  { nationality: "Morocco", code: "ma" },
  { nationality: "Tunisia", code: "tn" },
  { nationality: "Saudi Arabia", code: "sa" },
  { nationality: "United Arab Emirates", code: "ae" },
  { nationality: "Jordan", code: "jo" },
  { nationality: "Nigeria", code: "ng" },
  { nationality: "Ghana", code: "gh" },
  { nationality: "Kenya", code: "ke" },
  { nationality: "Ethiopia", code: "et" },
  { nationality: "Senegal", code: "sn" },
  { nationality: "South Africa", code: "za" },
];

const OBSERVATIONS = [
  "",
  "",
  "",
  "We will be arriving late, around 10pm.",
  "Anniversary trip — a bottle of wine would be lovely!",
  "I have a gluten allergy, please note for breakfast.",
  "Travelling with a small (quiet) dog.",
  "Would love a cabin with the best sauna view.",
  "First time in Scandinavia, any tips welcome!",
  "Please prepare an extra bed for our child.",
];

const BREAKFAST_PRICE = 15;

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[randInt(0, arr.length - 1)];

// ISO string without the trailing "Z", same format the app already stores
function toDbDate(date, withTime = false) {
  const d = new Date(date);
  if (!withTime) d.setUTCHours(0, 0, 0, 0);
  return d.toISOString().slice(0, -1);
}

function daysFromToday(numDays) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + numDays);
  return date;
}

function generateGuests(count = 30) {
  const guests = [];
  const usedNames = new Set();

  while (guests.length < count) {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    const fullName = `${first} ${last}`;
    if (usedNames.has(fullName)) continue;
    usedNames.add(fullName);

    const nat = pick(NATIONALITIES);
    guests.push({
      fullName,
      email: `${first}.${last}${randInt(1, 99)}@example.com`.toLowerCase(),
      nationality: nat.nationality,
      countryFlag: `https://flagcdn.com/${nat.code}.svg`,
      nationalID: String(randInt(1000000000, 9999999999)),
    });
  }
  return guests;
}

// Walks each cabin's calendar from ~90 days in the past to ~60 days in the
// future, creating non-overlapping stays with random gaps. Past dates feed
// the sales/duration charts, today feeds check-in/out activity, future dates
// show up as upcoming bookings.
function generateBookings(cabinRows, guestIds) {
  const bookings = [];

  for (const cabin of cabinRows) {
    let cursor = -randInt(85, 95);

    while (cursor < 60) {
      const numNights = randInt(1, 10);
      const startDate = daysFromToday(cursor);
      const endDate = daysFromToday(cursor + numNights);

      const numGuests = randInt(1, Math.max(1, cabin.maxCapacity));
      const hasBreakfast = Math.random() < 0.5;
      const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
      const extrasPrice = hasBreakfast
        ? numNights * BREAKFAST_PRICE * numGuests
        : 0;

      let status;
      if (isPast(endDate) && !isToday(endDate)) status = "checked-out";
      if (isFuture(startDate) || isToday(startDate)) status = "unconfirmed";
      if (
        (isFuture(endDate) || isToday(endDate)) &&
        isPast(startDate) &&
        !isToday(startDate)
      )
        status = "checked-in";

      // Booked 1–30 days before the stay, but never in the future
      // (created_at drives the dashboard's sales chart)
      const createdOffset = Math.min(cursor - randInt(1, 30), -1);
      const createdAt = daysFromToday(createdOffset);
      createdAt.setUTCHours(randInt(6, 21), randInt(0, 59), randInt(0, 59));

      bookings.push({
        created_at: toDbDate(createdAt, true),
        startDate: toDbDate(startDate),
        endDate: toDbDate(endDate),
        cabinId: cabin.id,
        guestId: pick(guestIds),
        numNights,
        numGuests,
        cabinPrice,
        extrasPrice,
        totalPrice: cabinPrice + extrasPrice,
        hasBreakfast,
        isPaid: status === "unconfirmed" ? Math.random() < 0.35 : true,
        observations: pick(OBSERVATIONS),
        status,
      });

      // Random gap before the cabin's next booking
      cursor += numNights + randInt(1, 6);
    }
  }
  return bookings;
}

// ---------------------------------------------------------------------------
// Seeding
// ---------------------------------------------------------------------------

async function seedDatabase() {
  // Bookings reference guests + cabins, so they go first
  let res = await supabase.from("bookings").delete().gt("id", 0);
  if (res.error) throw new Error(`Deleting bookings: ${res.error.message}`);

  res = await supabase.from("guests").delete().gt("id", 0);
  if (res.error) throw new Error(`Deleting guests: ${res.error.message}`);

  // Keep existing cabins (their images already live in storage); only insert
  // the fixture cabins if the table is empty
  let { data: cabinRows, error: cabinsError } = await supabase
    .from("cabins")
    .select("id, maxCapacity, regularPrice, discount")
    .order("id");
  if (cabinsError) throw new Error(`Reading cabins: ${cabinsError.message}`);

  if (!cabinRows || cabinRows.length === 0) {
    res = await supabase.from("cabins").insert(fixtureCabins);
    if (res.error) throw new Error(`Creating cabins: ${res.error.message}`);

    ({ data: cabinRows, error: cabinsError } = await supabase
      .from("cabins")
      .select("id, maxCapacity, regularPrice, discount")
      .order("id"));
    if (cabinsError) throw new Error(`Reading cabins: ${cabinsError.message}`);
  }

  res = await supabase.from("guests").insert(generateGuests());
  if (res.error) throw new Error(`Creating guests: ${res.error.message}`);

  const { data: guestRows, error: guestsError } = await supabase
    .from("guests")
    .select("id");
  if (guestsError) throw new Error(`Reading guests: ${guestsError.message}`);

  const bookings = generateBookings(
    cabinRows,
    guestRows.map((g) => g.id)
  );
  res = await supabase.from("bookings").insert(bookings);
  if (res.error) throw new Error(`Creating bookings: ${res.error.message}`);

  return bookings.length;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function SeedData() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  async function handleSeed() {
    const ok = window.confirm(
      "This replaces ALL guests and bookings with fresh random demo data. Continue?"
    );
    if (!ok) return;

    setIsLoading(true);
    try {
      const count = await seedDatabase();
      queryClient.invalidateQueries();
      toast.success(`Database seeded with ${count} random bookings`);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
        textAlign: "center",
      }}
    >
      <Button
        variation="secondary"
        size="small"
        onClick={handleSeed}
        disabled={isLoading}
      >
        {isLoading ? <SpinnerMini /> : "Seed data"}
      </Button>
    </div>
  );
}

export default SeedData;
