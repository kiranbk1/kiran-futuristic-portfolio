const boot = document.getElementById("boot-screen");
const bootStatus = document.getElementById("boot-status");
const messages = ["LOADING MODULES...", "CALIBRATING HUD...", "CONNECTING PORTFOLIO...", "SYSTEM READY"];
let mi = 0;
const interval = setInterval(() => {
  bootStatus.textContent = messages[mi++];
  if (mi >= messages.length) {
    clearInterval(interval);
    setTimeout(() => { boot.style.opacity = "0"; setTimeout(() => boot.remove(), 700); }, 450);
  }
}, 650);

const phrases = [
  "Building practical AI/ML projects.",
  "Learning. Building. Deploying.",
  "Turning ideas into working software.",
  "Exploring Machine Learning + GenAI."
];
const typed = document.getElementById("typed");
let p = 0, c = 0, deleting = false;
function typeLoop(){
  const word = phrases[p];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (deleting && c > 0) c--;
  else if (!deleting) { deleting = true; setTimeout(typeLoop, 1200); return; }
  else { deleting = false; p = (p + 1) % phrases.length; }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav nav");
menu.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
function resize(){ canvas.width=innerWidth; canvas.height=innerHeight; }
resize(); addEventListener("resize", resize);
function seed(){
  particles = Array.from({length: Math.min(100, Math.floor(innerWidth/12))}, () => ({
    x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    r: Math.random()*1.6+.3, vx:(Math.random()-.5)*.18, vy:(Math.random()-.5)*.18
  }));
}
seed();
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(const a of particles){
    a.x+=a.vx; a.y+=a.vy;
    if(a.x<0)a.x=canvas.width;if(a.x>canvas.width)a.x=0;
    if(a.y<0)a.y=canvas.height;if(a.y>canvas.height)a.y=0;
    ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);ctx.fillStyle="rgba(0,246,255,.45)";ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.animate(
    [{opacity:0, transform:"translateY(22px)"},{opacity:1, transform:"translateY(0)"}],
    {duration:650, easing:"cubic-bezier(.2,.7,.2,1)", fill:"forwards"}
  ); reveal.unobserve(e.target); }});
},{threshold:.12});
document.querySelectorAll(".panel,.skill-card,.project,.timeline-item").forEach(el => {
  el.style.opacity = "0"; reveal.observe(el);
});
