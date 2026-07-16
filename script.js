// --- NAV SCROLL ---
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>50);
});

// --- REVEAL ON SCROLL ---
const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('active');observer.unobserve(e.target)}});
},{threshold:.15});
reveals.forEach(r=>observer.observe(r));

// --- HERO CANVAS - PARTICLE FIELD ---
const canvas=document.getElementById('heroCanvas'),ctx=canvas.getContext('2d');
let W,H;
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
resize();
addEventListener('resize',resize);

const particles=[];
class Particle{
  constructor(){this.reset()}
  reset(){
    this.x=Math.random()*W;
    this.y=Math.random()*H;
    this.vx=(Math.random()-.5)*.3;
    this.vy=(Math.random()-.5)*.3;
    this.size=Math.random()*2+.5;
    this.alpha=Math.random()*.4+.1;
    this.color=Math.random()>.7?'255,106,0':'255,200,150';
  }
  update(){
    this.x+=this.vx;this.y+=this.vy;
    if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();
  }
  draw(){
    ctx.globalAlpha=this.alpha;
    ctx.fillStyle=`rgb(${this.color})`;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}
for(let i=0;i<120;i++)particles.push(new Particle());

function drawConnections(){
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x;
      const dy=particles[i].y-particles[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        ctx.globalAlpha=(1-dist/120)*.08;
        ctx.strokeStyle='#ff6a00';
        ctx.lineWidth=.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function heroFrame(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{p.update();p.draw()});
  drawConnections();
  ctx.globalAlpha=1;
  requestAnimationFrame(heroFrame);
}
heroFrame();
