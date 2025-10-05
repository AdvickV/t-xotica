// scripts.js — small UI helpers: nav toggle, countdown, toggle details, reveal on scroll
document.addEventListener('DOMContentLoaded', function () {
  // nav toggle
  document.querySelectorAll('.nav-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const navList = document.querySelector('.nav-list');
      navList.classList.toggle('show');
    });
  });

  // set copyright years
  const y = new Date().getFullYear();
  document.getElementById('year') && (document.getElementById('year').textContent = y);
  document.getElementById('year2') && (document.getElementById('year2').textContent = y);
  document.getElementById('year3') && (document.getElementById('year3').textContent = y);

  // simple countdown placeholder (update target date as needed)
  const target = new Date();
  target.setMonth(target.getMonth() + 1); // placeholder: 1 month from now
  const cd = document.getElementById('countdown');
  if (cd) {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000*60*60*24));
      const hrs = String(Math.floor((diff/(1000*60*60))%24)).padStart(2,'0');
      const mins = String(Math.floor((diff/(1000*60))%60)).padStart(2,'0');
      const secs = String(Math.floor((diff/1000)%60)).padStart(2,'0');
      cd.textContent = `${days}d ${hrs}:${mins}:${secs}`;
      if (diff<=0) clearInterval(i);
    };
    tick();
    const i = setInterval(tick,1000);
  }

  // toggle event details
  document.querySelectorAll('.toggle-details').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const card = btn.closest('.event-card');
      const details = card.querySelector('.event-details');
      details.classList.toggle('open');
      btn.textContent = details.classList.contains('open') ? 'Less' : 'More';
    });
  });

  // reveal on scroll (Intersection Observer)
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.feature-card, .event-card, .glass-card, .feature-large').forEach(n=>{
    n.style.opacity = 0;
    n.style.transform = 'translateY(18px)';
    obs.observe(n);
  });
});