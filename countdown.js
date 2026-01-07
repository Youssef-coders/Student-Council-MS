// Shared countdown functionality for all pages
const events = [
  {
    id: 1,
    title: "🏆 Annual Sports Day",
    description: "Join us for our biggest sports event of the year with competitions, games, and prizes!",
    date: "2026-10-15T09:00:00",
    location: "School Grounds"
  },
  {
    id: 2,
    title: "🎨 Art Exhibition",
    description: "Showcase your creative talents in our annual student art exhibition.",
    date: "2026-10-20T14:00:00",
    location: "Main Hall"
  }
];

function updateHeaderCountdown() {
  const headerCountdown = document.getElementById('header-countdown');
  const pillText = document.getElementById('pill-text');
  
  if (!headerCountdown || !pillText) return;

  if (events.length === 0) {
    headerCountdown.style.display = 'none';
    return;
  }

  const now = new Date().getTime();
  const upcomingEvents = events.filter(event => new Date(event.date).getTime() > now);
  
  if (upcomingEvents.length === 0) {
    headerCountdown.style.display = 'none';
    return;
  }

  upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  const nextEvent = upcomingEvents[0];
  const eventDate = new Date(nextEvent.date);

  headerCountdown.style.display = 'flex';

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      headerCountdown.style.display = 'none';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    let timeText = '';
    if (days > 0) {
      timeText = `${days} days`;
    } else if (hours > 0) {
      timeText = `${hours} hours`;
    } else {
      timeText = `${minutes} minutes`;
    }
    pillText.textContent = `${nextEvent.title} - ${timeText}`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', updateHeaderCountdown);
