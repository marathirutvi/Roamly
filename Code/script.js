// Sample trip estimates in Indian rupees. These are illustrative, not live prices.
const destinations = [
  { id: "jaipur", name: "Jaipur", country: "India", type: "culture", region: "Rajasthan, India", price: 28000, image: "photo-1599661046827-dacff0c0f09a", alt: "Hawa Mahal facade in Jaipur" },
  { id: "bali", name: "Bali", country: "Indonesia", type: "beach", region: "Indonesia", price: 68000, image: "photo-1537996194471-e657df975ab4", alt: "Balinese temple and tropical greenery" },
  { id: "manali", name: "Manali", country: "India", type: "mountain", region: "Himachal Pradesh, India", price: 24000, image: "photo-1626621341517-bbf3d9990a23", alt: "Snowy Himalayan peaks above a mountain valley" },
  { id: "kyoto", name: "Kyoto", country: "Japan", type: "culture", region: "Japan", price: 112000, image: "photo-1493976040374-85c8e12f0c0e", alt: "Traditional Kyoto street beneath a pagoda" },
  { id: "goa", name: "Goa", country: "India", type: "beach", region: "India", price: 32000, image: "photo-1512343879784-a960bf40e7f2", alt: "Palms and tropical coastline in Goa" },
  { id: "lisbon", name: "Lisbon", country: "Portugal", type: "city", region: "Portugal", price: 98000, image: "photo-1555881400-74d7acaacd8b", alt: "Lisbon rooftops and the Tagus river" },
  { id: "banaras", name: "Varanasi", country: "India", type: "culture", region: "Uttar Pradesh, India", price: 18000, image: "photo-1561361513-2d000a50f0dc", alt: "The ghats along the Ganges at Varanasi" },
  { id: "ladakh", name: "Ladakh", country: "India", type: "mountain", region: "Ladakh, India", price: 42000, image: "photo-1544735716-392fe2489ffa", alt: "High desert mountains in Ladakh" },
  { id: "amalfi", name: "Amalfi Coast", country: "Italy", type: "beach", region: "Southern Italy", price: 145000, image: "photo-1533587851505-d119e13fa0d7", alt: "Colourful homes on the Amalfi Coast" }
];

const storageKeys = { favourites: "roamly-favourites", itinerary: "roamly-itinerary" };
let favouriteIds = readSavedList(storageKeys.favourites);
let itinerary = readItinerary();
let activeType = "all";
let savedOnly = false;

function readSavedList(key) {
  try {
    const savedValue = JSON.parse(localStorage.getItem(key));
    return Array.isArray(savedValue) ? savedValue : [];
  } catch (error) {
    return [];
  }
}

function readItinerary() {
  try {
    const savedTrip = JSON.parse(localStorage.getItem(storageKeys.itinerary));
    if (savedTrip && Array.isArray(savedTrip.days)) return {
      destinationId: savedTrip.destinationId || "",
      date: savedTrip.date || "",
      travellers: Number(savedTrip.travellers) || 1,
      tripLength: Number(savedTrip.tripLength) || 5,
      days: savedTrip.days.map((day) => ({ activities: Array.isArray(day.activities) ? day.activities : [] }))
    };
  } catch (error) {
    // Start with a blank trip if the saved data is unavailable.
  }
  return { destinationId: "", date: "", travellers: 1, tripLength: 5, days: [] };
}

function saveValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Roamly could not save changes in this browser.", error);
  }
}

function formatRupees(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

function renderDestinations() {
  const grid = document.querySelector("#destination-grid");
  const budgetLimit = document.querySelector("#budget-filter").value;
  const searchText = document.querySelector("#destination-search").value.trim().toLowerCase();
  let visibleDestinations = destinations.filter((destination) => {
    const matchesType = activeType === "all" || destination.type === activeType;
    const matchesBudget = budgetLimit === "any" || destination.price <= Number(budgetLimit);
    const matchesSearch = `${destination.name} ${destination.country} ${destination.region} ${destination.type}`.toLowerCase().includes(searchText);
    const matchesSaved = !savedOnly || favouriteIds.includes(destination.id);
    return matchesType && matchesBudget && matchesSearch && matchesSaved;
  });

  const sortMode = document.querySelector("#sort-destinations").value;
  if (sortMode === "low") visibleDestinations.sort((first, second) => first.price - second.price);
  if (sortMode === "high") visibleDestinations.sort((first, second) => second.price - first.price);
  if (sortMode === "name") visibleDestinations.sort((first, second) => first.name.localeCompare(second.name));
  document.querySelector("#results-label").textContent = `${visibleDestinations.length} ${visibleDestinations.length === 1 ? "place" : "places"} to explore`;

  if (visibleDestinations.length === 0) {
    grid.innerHTML = '<p class="empty-state">No places match that combination just yet. Try another filter.</p>';
    return;
  }

  grid.innerHTML = visibleDestinations.map((destination) => {
    const isSaved = favouriteIds.includes(destination.id);
    return `<article class="destination-card">
      <div class="destination-image">
        <img src="https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=800&q=80" alt="${destination.alt}" loading="lazy">
        <span class="destination-tag">${destination.type}</span>
        <button class="favourite-button ${isSaved ? "saved" : ""}" data-favourite="${destination.id}" aria-label="${isSaved ? "Remove" : "Save"} ${destination.name} ${isSaved ? "from" : "to"} favourites" aria-pressed="${isSaved}">${isSaved ? "♥" : "♡"}</button>
      </div>
      <div class="destination-info"><div><h3>${destination.name}</h3><p>${destination.region}</p></div><div class="destination-price">${formatRupees(destination.price)}<small>per person · 5 days</small></div></div>
    </article>`;
  }).join("");

  grid.querySelectorAll("[data-favourite]").forEach((button) => button.addEventListener("click", () => toggleFavourite(button.dataset.favourite)));
}

function toggleFavourite(destinationId) {
  if (favouriteIds.includes(destinationId)) favouriteIds = favouriteIds.filter((id) => id !== destinationId);
  else favouriteIds.push(destinationId);
  saveValue(storageKeys.favourites, favouriteIds);
  document.querySelector("#favourite-count").textContent = favouriteIds.length;
  document.querySelector("#saved-filter-count").textContent = favouriteIds.length;
  renderDestinations();
}

function populateDestinationPicker() {
  const picker = document.querySelector("#trip-destination");
  destinations.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination.id;
    option.textContent = `${destination.name}, ${destination.country}`;
    picker.append(option);
  });
  picker.value = itinerary.destinationId;
  document.querySelector("#trip-date").value = itinerary.date;
  document.querySelector("#traveller-count").value = String(itinerary.travellers);
  document.querySelector("#trip-length").value = String(itinerary.tripLength);
  picker.addEventListener("change", () => {
    itinerary.destinationId = picker.value;
    saveValue(storageKeys.itinerary, itinerary);
    renderTripOverview();
    updateBudget();
  });
  document.querySelector("#trip-date").addEventListener("change", (event) => {
    itinerary.date = event.target.value;
    saveValue(storageKeys.itinerary, itinerary);
    renderTripOverview();
  });
  document.querySelector("#traveller-count").addEventListener("change", (event) => {
    itinerary.travellers = Number(event.target.value) || 1;
    saveValue(storageKeys.itinerary, itinerary);
    renderTripOverview();
    updateBudget();
  });
  document.querySelector("#trip-length").addEventListener("change", (event) => {
    itinerary.tripLength = Number(event.target.value) || 5;
    saveValue(storageKeys.itinerary, itinerary);
    renderTripOverview();
    updateBudget();
  });
}

function renderTripOverview() {
  const destination = destinations.find((place) => place.id === itinerary.destinationId);
  const dateLabel = itinerary.date ? new Date(`${itinerary.date}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Date not set";
  const destinationLabel = destination ? destination.name : "Choose a destination";
  document.querySelector("#trip-overview-text").textContent = `${destinationLabel} · ${itinerary.tripLength} days · ${itinerary.travellers} ${itinerary.travellers === 1 ? "traveller" : "travellers"} · ${dateLabel}`;
}

function renderItinerary() {
  const list = document.querySelector("#itinerary-list");
  const dayPicker = document.querySelector("#activity-day");
  document.querySelector("#day-count").textContent = `${itinerary.days.length} ${itinerary.days.length === 1 ? "day" : "days"} planned`;

  if (itinerary.days.length === 0) {
    list.innerHTML = '<p class="empty-itinerary">Your first day is a blank page. Add one when you’re ready.</p>';
    dayPicker.innerHTML = '<option value="">Day</option>';
    return;
  }

  list.innerHTML = itinerary.days.map((day, dayIndex) => `<div class="day-card">
    <div class="day-card-head"><strong>Day ${dayIndex + 1}</strong><button type="button" data-remove-day="${dayIndex}" aria-label="Remove day ${dayIndex + 1}">×</button></div>
    ${day.activities.length ? day.activities.map((activity, activityIndex) => `<div class="activity-row"><span>${escapeHtml(activity)}</span><button type="button" data-remove-activity="${dayIndex}" data-activity-index="${activityIndex}" aria-label="Remove ${escapeHtml(activity)}">×</button></div>`).join("") : '<span class="empty-itinerary">Nothing on the calendar yet.</span>'}
  </div>`).join("");
  dayPicker.innerHTML = itinerary.days.map((day, index) => `<option value="${index}">Day ${index + 1}</option>`).join("");

  list.querySelectorAll("[data-remove-day]").forEach((button) => button.addEventListener("click", () => {
    itinerary.days.splice(Number(button.dataset.removeDay), 1);
    saveValue(storageKeys.itinerary, itinerary);
    renderItinerary();
    renderTripOverview();
  }));
  list.querySelectorAll("[data-remove-activity]").forEach((button) => button.addEventListener("click", () => {
    itinerary.days[Number(button.dataset.removeActivity)].activities.splice(Number(button.dataset.activityIndex), 1);
    saveValue(storageKeys.itinerary, itinerary);
    renderItinerary();
  }));
}

function escapeHtml(value) {
  const safeText = document.createElement("span");
  safeText.textContent = value;
  return safeText.innerHTML;
}

function addDay() {
  if (itinerary.days.length >= 30) {
    alert("A trip can have up to 30 days. Remove a day to make room for another.");
    return;
  }
  itinerary.days.push({ activities: [] });
  saveValue(storageKeys.itinerary, itinerary);
  renderItinerary();
  document.querySelector("#activity-day").value = String(itinerary.days.length - 1);
  renderTripOverview();
}

function updateBudget() {
  const destination = destinations.find((place) => place.id === itinerary.destinationId);
  const estimateLabel = document.querySelector("#estimate-destination");
  const totalLabel = document.querySelector("#budget-total");
  const perPersonLabel = document.querySelector("#per-person-total");
  const estimateParts = [
    ["#estimate-transport", 0.35],
    ["#estimate-stay", 0.30],
    ["#estimate-food", 0.20],
    ["#estimate-activities", 0.15]
  ];

  if (!destination) {
    estimateLabel.textContent = "Choose a destination in your trip plan";
    totalLabel.textContent = "—";
    perPersonLabel.textContent = "Choose a destination";
    estimateParts.forEach(([selector]) => { document.querySelector(selector).textContent = "—"; });
    return;
  }

  // Destination samples cover five days for one person. Adjust for the selected trip.
  const perPerson = Math.round(destination.price * itinerary.tripLength / 500) * 100;
  const groupTotal = perPerson * itinerary.travellers;
  estimateLabel.textContent = `${destination.name} · ${itinerary.tripLength} days · ${itinerary.travellers} ${itinerary.travellers === 1 ? "traveller" : "travellers"}`;
  totalLabel.textContent = formatRupees(groupTotal);
  perPersonLabel.textContent = `${formatRupees(perPerson)} per person`;
  estimateParts.forEach(([selector, share]) => {
    document.querySelector(selector).textContent = formatRupees(Math.round(groupTotal * share / 100) * 100);
  });
}

document.querySelectorAll(".filter-chip").forEach((button) => button.addEventListener("click", () => {
  activeType = button.dataset.type;
  document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("active", chip === button));
  renderDestinations();
}));
document.querySelector("#budget-filter").addEventListener("change", renderDestinations);
document.querySelector("#destination-search").addEventListener("input", renderDestinations);
document.querySelector("#sort-destinations").addEventListener("change", renderDestinations);
document.querySelector("#saved-filter").addEventListener("click", (event) => {
  savedOnly = !savedOnly;
  event.currentTarget.classList.toggle("active", savedOnly);
  event.currentTarget.setAttribute("aria-pressed", String(savedOnly));
  event.currentTarget.firstChild.textContent = savedOnly ? "♥ Saved " : "♡ Saved ";
  renderDestinations();
});
document.querySelector("#add-day").addEventListener("click", addDay);
document.querySelectorAll("[data-idea]").forEach((button) => button.addEventListener("click", () => {
  if (!itinerary.days.length) addDay();
  const dayIndex = Number(document.querySelector("#activity-day").value || 0);
  itinerary.days[dayIndex].activities.push(button.dataset.idea);
  saveValue(storageKeys.itinerary, itinerary);
  renderItinerary();
  document.querySelector("#activity-day").value = String(dayIndex);
  renderTripOverview();
}));
document.querySelector("#copy-trip").addEventListener("click", async (event) => {
  const destination = destinations.find((place) => place.id === itinerary.destinationId);
  const activities = itinerary.days.map((day, index) => `Day ${index + 1}: ${day.activities.join(", ") || "No activities yet"}`).join("\n");
  const summary = `Roamly trip plan: ${destination ? destination.name : "Destination not chosen"}\nStart date: ${itinerary.date || "Not set"}\nTrip length: ${itinerary.tripLength} days\nTravellers: ${itinerary.travellers}\n${activities || "Add days and activities to complete your plan."}`;
  try {
    await navigator.clipboard.writeText(summary);
    event.currentTarget.textContent = "Copied!";
    setTimeout(() => { event.currentTarget.textContent = "Copy plan"; }, 1800);
  } catch (error) {
    alert(summary);
  }
});
document.querySelector("#activity-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const activityInput = document.querySelector("#activity-input");
  const dayIndex = Number(document.querySelector("#activity-day").value);
  const activity = activityInput.value.trim();
  if (!activity) {
    activityInput.setCustomValidity("Enter an activity before adding it.");
    activityInput.reportValidity();
    return;
  }
  activityInput.setCustomValidity("");
  if (!itinerary.days.length || !Number.isInteger(dayIndex) || !itinerary.days[dayIndex]) {
    alert("Add a day to your itinerary before adding an activity.");
    return;
  }
  itinerary.days[dayIndex].activities.push(activity);
  saveValue(storageKeys.itinerary, itinerary);
  activityInput.value = "";
  renderItinerary();
  document.querySelector("#activity-day").value = String(dayIndex);
  activityInput.focus();
});
document.querySelector("#activity-input").addEventListener("input", (event) => event.currentTarget.setCustomValidity(""));
document.querySelector("#menu-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const nav = document.querySelector("#main-nav");
  const isOpen = nav.classList.toggle("open");
  button.setAttribute("aria-expanded", String(isOpen));
  button.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
document.querySelectorAll("#main-nav a").forEach((link) => link.addEventListener("click", () => {
  document.querySelector("#main-nav").classList.remove("open");
  document.querySelector("#menu-toggle").setAttribute("aria-expanded", "false");
}));

document.querySelector("#favourite-count").textContent = favouriteIds.length;
document.querySelector("#saved-filter-count").textContent = favouriteIds.length;
populateDestinationPicker();
renderItinerary();
renderTripOverview();
renderDestinations();
updateBudget();
