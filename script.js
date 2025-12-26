// Confetti Animation
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = [];
const confettiCount = 150;
const colors = ['#ff6b6b', '#f5c8c8', '#ffd93d', '#ffe4e1', '#ff9faa', '#d4a574', '#ffb6c1', '#ffc0cb'];

class ConfettiPiece {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.w = Math.random() * 10 + 5;
        this.h = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * 0.1;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * 2;
        this.angle += 0.1;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvas.height) {
            this.y = -this.h;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
    }
}

// Initialize confetti
for (let i = 0; i < confettiCount; i++) {
    confetti.push(new ConfettiPiece());
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(piece => {
        piece.update();
        piece.draw();
    });
    requestAnimationFrame(animateConfetti);
}

animateConfetti();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Background Music Player
const backgroundMusic = document.getElementById('background-music');
let isPlaying = true;

// Try to play background music when page loads
window.addEventListener('load', () => {
    // Modern browsers may require user interaction for autoplay with sound
    // Try to play, but catch error if autoplay is blocked
    const playPromise = backgroundMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Autoplay blocked. Music will play after user interaction.');
        });
    }
});

// Allow playing music after any user interaction
document.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(err => {
            console.log('Error playing audio:', err);
        });
    }
}, { once: true });

// Play/Pause button
document.getElementById('play-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        document.getElementById('play-btn').textContent = '⏸️';
        isPlaying = true;
    } else {
        backgroundMusic.pause();
        document.getElementById('play-btn').textContent = '▶️';
        isPlaying = false;
    }
});

// Stop button (pause and reset to start)
document.getElementById('stop-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    document.getElementById('play-btn').textContent = '▶️';
    isPlaying = false;
});

// Update button text based on playing state
backgroundMusic.addEventListener('play', () => {
    document.getElementById('play-btn').textContent = '⏸️';
    isPlaying = true;
});

backgroundMusic.addEventListener('pause', () => {
    if (backgroundMusic.currentTime > 0 && !backgroundMusic.ended) {
        document.getElementById('play-btn').textContent = '▶️';
        isPlaying = false;
    }
});

// Greeting Card Flip Animation
const greetingCard = document.getElementById('greeting-card');
let isCardFlipped = false;

greetingCard.addEventListener('click', () => {
    if (!isCardFlipped) {
        greetingCard.classList.add('flipped');
        isCardFlipped = true;
        // Trigger confetti burst when card opens
        createBurst(canvas.width / 2, canvas.height / 2);
    }
});

// Close card function (called from button in card)
function closeCard() {
    greetingCard.classList.remove('flipped');
    isCardFlipped = false;
}

// Burst effect function
function createBurst(x, y) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '12px';
        particle.style.height = '12px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 8;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        function animate() {
            posX += vx;
            posY += vy;
            opacity -= 0.015;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }
}

// Add sparkle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.96) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.fontSize = '1.5em';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Add page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add click effects to gift boxes
document.querySelectorAll('.gift-box').forEach((gift, index) => {
    gift.addEventListener('click', (e) => {
        e.stopPropagation();
        gift.style.transform = 'scale(1.2) rotate(15deg)';
        setTimeout(() => {
            gift.style.transform = '';
        }, 500);
        
        const rect = gift.getBoundingClientRect();
        createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
});

// Add click effects to cake
document.querySelector('.birthday-cake').addEventListener('click', (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
});
