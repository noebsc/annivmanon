// Configuration globale de l'expérience royale
const ROYAL_CONFIG = {
    // Configuration du thème
    theme: {
        colors: {
            primary: '#FFD700',
            secondary: '#FFA500', 
            background: '#0a0a0a',
            text: '#FFFEF7'
        }
    },
    
    // Configuration du chargement
    loading: {
        duration: 4000, // 4 secondes
        showStartButton: true
    },
    
    // Configuration des animations
    animations: {
        confetti: {
            duration: 2000,
            particleCount: 100,
            colors: ['#FFD700', '#FFA500', '#C0C0C0', '#FFF8DC']
        },
        
        // Séquence de textes avec leurs animations
        textSequence: [
            { text: "LE PALAIS", duration: 1200, effect: "zoomIn", pauseAfter: 300 },
            { text: "ROYAL", duration: 900, effect: "zoomOut", pauseAfter: 200 },
            { text: "DE", duration: 800, effect: "zoomIn", pauseAfter: 200 },
            { text: "SOINGS", duration: 1100, effect: "pulse", pauseAfter: 300 },
            { text: "EN", duration: 700, effect: "sparkle", pauseAfter: 200 },
            { text: "SOLOGNE", duration: 1300, effect: "zoomOut", pauseAfter: 400 },
            { text: "VOUS", duration: 800, effect: "explosive", pauseAfter: 300 },
            { text: "SOUHAITE", duration: 900, effect: "cascade", pauseAfter: 500 },
            { text: "UN JOYEUX ANNIVERSAIRE", duration: 2500, effect: "finale", pauseAfter: 1000 }
        ],
        
        // Configuration de l'image royale
        royalImage: {
            duration: 2000,
            effect: "slideUpRotate",
            delayAfterText: 500
        },
        
        // Message final
        finalMessage: {
            duration: 2000,
            delayAfterImage: 1000
        }
    },
    
    // Configuration audio
    audio: {
        enabled: true,
        volume: 0.3,
        fadeInDuration: 2000,
        autoplay: false // Sera activé après interaction utilisateur
    },
    
    // Configuration des assets
    assets: {
        royalImage: "manon-reine.png", // Sera remplacé par placeholder si pas disponible
        backgroundMusic: "musique_royale.mp3"
    },
    
    // Options de customisation rapide
    customization: {
        skipAnimations: false, // Pour debug/test rapide
        debugMode: false, // Affiche les logs de debug
        clickToAccelerate: true // Permet de cliquer pour accélérer
    }
};

// Variables globales
let currentAnimationStep = 0;
let isAnimationRunning = false;
let audioContext = null;
let royalMusic = null;

// Éléments DOM
const elements = {};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    startLoadingSequence();
    setupEventListeners();
    
    if (ROYAL_CONFIG.customization.debugMode) {
        console.log('🏰 Palais Royal - Mode debug activé', ROYAL_CONFIG);
    }
});

// Initialisation des éléments DOM
function initializeElements() {
    elements.loadingScreen = document.getElementById('loading-screen');
    elements.startOverlay = document.getElementById('start-overlay');
    elements.mainExperience = document.getElementById('main-experience');
    elements.startBtn = document.getElementById('start-btn');
    elements.confettiContainer = document.getElementById('confetti-container');
    elements.textContainer = document.getElementById('text-container');
    elements.textDisplay = document.getElementById('text-display');
    elements.royalImageContainer = document.getElementById('royal-image-container');
    elements.finalMessage = document.getElementById('final-message');
    elements.audioToggle = document.getElementById('audio-toggle');
    elements.royalMusic = document.getElementById('royal-music');
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    elements.startBtn.addEventListener('click', startRoyalExperience);
    elements.audioToggle.addEventListener('click', toggleAudio);
    
    // Gestion des clics pour accélérer les animations
    if (ROYAL_CONFIG.customization.clickToAccelerate) {
        document.addEventListener('click', accelerateAnimation);
    }
    
    // Gestion de la visibilité de la page
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Séquence de chargement
function startLoadingSequence() {
    const loadingProgress = document.querySelector('.loading-progress');
    const duration = ROYAL_CONFIG.loading.duration;
    
    // Animation de la barre de progression
    setTimeout(() => {
        loadingProgress.style.animation = `loadingProgress ${duration}ms ease-out forwards`;
    }, 100);
    
    // Affichage du bouton de démarrage après le chargement
    setTimeout(() => {
        elements.loadingScreen.style.opacity = '0';
        elements.loadingScreen.style.transition = 'opacity 1s ease-out';
        
        setTimeout(() => {
            elements.loadingScreen.classList.add('hidden');
            elements.startOverlay.classList.remove('hidden');
            elements.startOverlay.style.opacity = '0';
            elements.startOverlay.style.animation = 'fadeInUp 1s ease-out forwards';
        }, 1000);
    }, duration);
}

// Démarrage de l'expérience royale
function startRoyalExperience() {
    if (isAnimationRunning) return;
    
    isAnimationRunning = true;
    
    // Préparation de l'audio
    prepareAudio();
    
    // Masquage de l'overlay de démarrage
    elements.startOverlay.style.opacity = '0';
    elements.startOverlay.style.transition = 'opacity 0.8s ease-out';
    
    setTimeout(() => {
        elements.startOverlay.classList.add('hidden');
        elements.mainExperience.classList.remove('hidden');
        
        // Démarrage de la séquence d'animations
        startAnimationSequence();
    }, 800);
}

// Préparation de l'audio
function prepareAudio() {
    if (ROYAL_CONFIG.audio.enabled && elements.royalMusic) {
        elements.royalMusic.volume = 0;
        elements.royalMusic.play().then(() => {
            fadeInAudio();
        }).catch(error => {
            console.log('🎵 Audio autoplay bloqué:', error);
            // L'audio sera activé manuellement par l'utilisateur
        });
    }
}

// Fade-in de l'audio
function fadeInAudio() {
    if (!elements.royalMusic) return;
    
    const targetVolume = ROYAL_CONFIG.audio.volume;
    const duration = ROYAL_CONFIG.audio.fadeInDuration;
    const steps = 50;
    const volumeIncrement = targetVolume / steps;
    const timeIncrement = duration / steps;
    
    let currentVolume = 0;
    const fadeInterval = setInterval(() => {
        currentVolume += volumeIncrement;
        if (currentVolume >= targetVolume) {
            currentVolume = targetVolume;
            clearInterval(fadeInterval);
        }
        elements.royalMusic.volume = currentVolume;
    }, timeIncrement);
}

// Démarrage de la séquence d'animations
function startAnimationSequence() {
    // 1. Animation des confettis
    createConfettiExplosion();
    
    // 2. Démarrage de la séquence de textes après les confettis
    setTimeout(() => {
        startTextSequence();
    }, ROYAL_CONFIG.animations.confetti.duration);
}

// Création de l'explosion de confettis
function createConfettiExplosion() {
    const container = elements.confettiContainer;
    const config = ROYAL_CONFIG.animations.confetti;
    
    for (let i = 0; i < config.particleCount; i++) {
        setTimeout(() => {
            createConfettiParticle(container, config.colors);
        }, Math.random() * 500);
    }
    
    // Nettoyage des confettis après l'animation
    setTimeout(() => {
        container.innerHTML = '';
    }, config.duration + 1000);
}

// Création d'une particule de confetti
function createConfettiParticle(container, colors) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Propriétés aléatoires
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * window.innerWidth;
    const rotation = Math.random() * 360;
    const scale = 0.5 + Math.random() * 0.5;
    const animationDuration = 2 + Math.random() * 2;
    
    confetti.style.background = color;
    confetti.style.left = startX + 'px';
    confetti.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    confetti.style.animationDuration = animationDuration + 's';
    confetti.style.boxShadow = `0 0 6px ${color}80`;
    
    container.appendChild(confetti);
    
    // Suppression automatique après l'animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, animationDuration * 1000);
}

// Démarrage de la séquence de textes
function startTextSequence() {
    currentAnimationStep = 0;
    animateNextText();
}

// Animation du texte suivant
function animateNextText() {
    const sequence = ROYAL_CONFIG.animations.textSequence;
    
    if (currentAnimationStep >= sequence.length) {
        // Fin de la séquence de textes, démarrage de l'image royale
        setTimeout(() => {
            showRoyalImage();
        }, ROYAL_CONFIG.animations.royalImage.delayAfterText);
        return;
    }
    
    const currentText = sequence[currentAnimationStep];
    displayAnimatedText(currentText);
    
    // Programmation du texte suivant
    setTimeout(() => {
        hideCurrentText(() => {
            currentAnimationStep++;
            setTimeout(() => {
                animateNextText();
            }, currentText.pauseAfter || 0);
        });
    }, currentText.duration);
}

// Affichage d'un texte avec animation
function displayAnimatedText(textConfig) {
    const textDisplay = elements.textDisplay;
    
    textDisplay.textContent = textConfig.text;
    textDisplay.className = 'text-display';
    
    // Application de l'animation
    setTimeout(() => {
        textDisplay.classList.add(`text-${textConfig.effect}`);
    }, 50);
    
    if (ROYAL_CONFIG.customization.debugMode) {
        console.log(`🎭 Animation: ${textConfig.text} (${textConfig.effect})`);
    }
}

// Masquage du texte actuel
function hideCurrentText(callback) {
    const textDisplay = elements.textDisplay;
    
    textDisplay.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    textDisplay.style.opacity = '0';
    textDisplay.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        textDisplay.className = 'text-display';
        textDisplay.style.opacity = '';
        textDisplay.style.transform = '';
        textDisplay.style.transition = '';
        callback();
    }, 500);
}

// Affichage de l'image royale
function showRoyalImage() {
    const imageContainer = elements.royalImageContainer;
    const config = ROYAL_CONFIG.animations.royalImage;
    
    imageContainer.classList.remove('hidden');
    
    // Animation d'entrée
    setTimeout(() => {
        imageContainer.style.transition = `transform ${config.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        imageContainer.style.transform = 'translateX(-50%) translateY(0) rotateY(0deg)';
    }, 100);
    
    // Masquage du texte et affichage du message final
    setTimeout(() => {
        elements.textContainer.style.opacity = '0';
        elements.textContainer.style.transition = 'opacity 1s ease-out';
        
        setTimeout(() => {
            showFinalMessage();
        }, ROYAL_CONFIG.animations.finalMessage.delayAfterImage);
    }, config.duration);
}

// Affichage du message final
function showFinalMessage() {
    elements.finalMessage.classList.remove('hidden');
    
    setTimeout(() => {
        isAnimationRunning = false;
    }, ROYAL_CONFIG.animations.finalMessage.duration);
    
    if (ROYAL_CONFIG.customization.debugMode) {
        console.log('👑 Expérience royale terminée!');
    }
}

// Gestion de l'audio
function toggleAudio() {
    if (!elements.royalMusic) return;
    
    const audioIcon = document.getElementById('audio-icon');
    
    if (elements.royalMusic.paused) {
        elements.royalMusic.play().then(() => {
            fadeInAudio();
            audioIcon.textContent = '🎵';
        }).catch(error => {
            console.log('Erreur lecture audio:', error);
        });
    } else {
        elements.royalMusic.pause();
        audioIcon.textContent = '🔇';
    }
}

// Accélération des animations par clic
function accelerateAnimation(event) {
    if (!isAnimationRunning || !ROYAL_CONFIG.customization.clickToAccelerate) return;
    
    // Éviter d'accélérer sur les boutons
    if (event.target.tagName === 'BUTTON') return;
    
    // Logique d'accélération (réduit les durées)
    const sequence = ROYAL_CONFIG.animations.textSequence;
    if (currentAnimationStep < sequence.length) {
        sequence[currentAnimationStep].duration = Math.max(sequence[currentAnimationStep].duration * 0.3, 200);
        sequence[currentAnimationStep].pauseAfter = Math.max(sequence[currentAnimationStep].pauseAfter * 0.3, 50);
    }
}

// Gestion de la visibilité de la page
function handleVisibilityChange() {
    if (document.hidden && elements.royalMusic && !elements.royalMusic.paused) {
        elements.royalMusic.pause();
    }
}

// Fonctions utilitaires pour la customisation
const RoyalCustomization = {
    // Modifier les couleurs du thème
    setThemeColors: function(colors) {
        Object.assign(ROYAL_CONFIG.theme.colors, colors);
        this.applyThemeColors();
    },
    
    // Appliquer les couleurs du thème
    applyThemeColors: function() {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', ROYAL_CONFIG.theme.colors.primary);
        root.style.setProperty('--color-text', ROYAL_CONFIG.theme.colors.text);
    },
    
    // Modifier un texte de la séquence
    updateSequenceText: function(index, newText) {
        if (index >= 0 && index < ROYAL_CONFIG.animations.textSequence.length) {
            ROYAL_CONFIG.animations.textSequence[index].text = newText;
        }
    },
    
    // Ajouter un nouveau texte à la séquence
    addSequenceText: function(text, duration = 1000, effect = 'zoomIn', pauseAfter = 300) {
        ROYAL_CONFIG.animations.textSequence.push({
            text, duration, effect, pauseAfter
        });
    },
    
    // Modifier les durées d'animation globalement
    adjustAnimationSpeed: function(multiplier) {
        ROYAL_CONFIG.animations.textSequence.forEach(item => {
            item.duration = Math.max(item.duration * multiplier, 200);
            item.pauseAfter = Math.max(item.pauseAfter * multiplier, 50);
        });
        
        ROYAL_CONFIG.animations.confetti.duration *= multiplier;
        ROYAL_CONFIG.animations.royalImage.duration *= multiplier;
        ROYAL_CONFIG.animations.finalMessage.duration *= multiplier;
    },
    
    // Activer/désactiver le mode debug
    toggleDebugMode: function() {
        ROYAL_CONFIG.customization.debugMode = !ROYAL_CONFIG.customization.debugMode;
        console.log('🏰 Mode debug:', ROYAL_CONFIG.customization.debugMode ? 'ACTIVÉ' : 'DÉSACTIVÉ');
    },
    
    // Redémarrer l'expérience
    restart: function() {
        location.reload();
    },
    
    // Passer directement à une étape
    skipToStep: function(step) {
        if (step === 'confetti') {
            startAnimationSequence();
        } else if (step === 'text') {
            startTextSequence();
        } else if (step === 'image') {
            showRoyalImage();
        } else if (step === 'final') {
            showFinalMessage();
        }
    }
};

// Export global pour accès facile dans la console
window.RoyalConfig = ROYAL_CONFIG;
window.RoyalCustomization = RoyalCustomization;

// Messages de bienvenue dans la console
if (ROYAL_CONFIG.customization.debugMode) {
    console.log(`
    🏰 ===== PALAIS ROYAL DE SOINGS-EN-SOLOGNE =====
    
    Configuration disponible via: window.RoyalConfig
    Customisation via: window.RoyalCustomization
    
    Exemples de customisation:
    - RoyalCustomization.setThemeColors({primary: '#FF6B6B'})
    - RoyalCustomization.updateSequenceText(0, 'MON PALAIS')
    - RoyalCustomization.adjustAnimationSpeed(0.5)
    - RoyalCustomization.toggleDebugMode()
    - RoyalCustomization.skipToStep('confetti')
    
    👑 Vive la Reine Manon! 👑
    `);
}

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('🚨 Erreur dans l\'expérience royale:', e.error);
});

// Gestion responsive avancée
function handleResize() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    // Ajustements dynamiques pour mobile
    if (vw < 768) {
        ROYAL_CONFIG.animations.textSequence.forEach(item => {
            item.duration = Math.max(item.duration * 0.8, 500);
        });
    }
}

window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', function() {
    setTimeout(handleResize, 100);
});

// Performance monitoring
const performanceMonitor = {
    startTime: performance.now(),
    
    logMilestone: function(name) {
        if (ROYAL_CONFIG.customization.debugMode) {
            const elapsed = Math.round(performance.now() - this.startTime);
            console.log(`⏱️ ${name}: ${elapsed}ms`);
        }
    }
};

// Préchargement des ressources si disponibles
function preloadAssets() {
    const assets = ROYAL_CONFIG.assets;
    
    // Préchargement de l'image royale
    if (assets.royalImage) {
        const img = new Image();
        img.onload = () => {
            if (ROYAL_CONFIG.customization.debugMode) {
                console.log('🖼️ Image royale préchargée');
            }
        };
        img.onerror = () => {
            console.log('⚠️ Image royale non trouvée, utilisation du placeholder');
        };
        img.src = assets.royalImage;
    }
    
    // Préchargement de l'audio
    if (assets.backgroundMusic && elements.royalMusic) {
        elements.royalMusic.addEventListener('canplaythrough', () => {
            if (ROYAL_CONFIG.customization.debugMode) {
                console.log('🎵 Musique royale préchargée');
            }
        });
        
        elements.royalMusic.addEventListener('error', () => {
            console.log('⚠️ Musique royale non trouvée');
        });
    }
}

// Initialisation du préchargement
document.addEventListener('DOMContentLoaded', preloadAssets);