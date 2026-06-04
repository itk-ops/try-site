const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Particle {
  constructor(x, y, color, vx, vy, life) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.life = life;
    this.alpha = 1;
    this.color = color;
  }
  update() {
    this.vy += 0.03;      // 重力
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 1;
    this.alpha = this.life / 80;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

let particles = [];
let rockets = [];

class Rocket {
  constructor() {
    this.x = Math.random() * w * 0.8 + w * 0.1;

    // ★ 爆発位置を下げる（画面の70%の高さからスタート）
    this.y = h * 0.7;

    this.vx = (Math.random() - 0.5) * 1;

    // ★ 上昇を弱くして爆発までの時間を短くする
    this.vy = - (Math.random() * 2 + 3);

    this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
    this.exploded = false;
  }

  update() {
    this.vy += 0.03; // 重力
    this.x += this.vx;
    this.y += this.vy;

    // ★ 頂点に達したら爆発
    if (this.vy >= 0 && !this.exploded) {
      this.explode();
      this.exploded = true;
    }
  }
  explode() {
    const count = 120 + Math.random() * 80;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * 3 + 1.5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      particles.push(
        new Particle(this.x, this.y, this.color, vx, vy, 80 + Math.random() * 20)
      );
    }
  }
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function loop() {
  requestAnimationFrame(loop);
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // 残像
  ctx.fillRect(0, 0, w, h);

  // ロケット追加
  if (Math.random() < 0.04) {
    rockets.push(new Rocket());
  }

  rockets = rockets.filter(r => !r.exploded);
  rockets.forEach(r => {
    r.update();
    r.draw(ctx);
  });

  particles = particles.filter(p => p.life > 0 && p.alpha > 0);
  particles.forEach(p => {
    p.update();
    p.draw(ctx);
  });
}

loop();


