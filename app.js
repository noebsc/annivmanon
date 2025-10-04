// Configuration globale de l'expérience royale - VERSION CORRIGÉE
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
        
        // SÉQUENCE COMPLÈTE CORRIGÉE
        textSequence: [
            { text: "LE", duration: 800, effect: "pulse", pauseAfter: 200 },
            { text: "PALAIS", duration: 1000, effect: "zoomOut", pauseAfter: 250 },
            { text: "ROYAL", duration: 900, effect: "pulse", pauseAfter: 200 },
            { text: "DE", duration: 700, effect: "sparkle", pauseAfter: 150 },
            { text: "SOINGS", duration: 1100, effect: "explosive", pauseAfter: 300 },
            { text: "EN", duration: 600, effect: "cascade", pauseAfter: 150 },
            { text: "SOLOGNE", duration: 1200, effect: "pulse", pauseAfter: 400 },
            { text: "VOUS", duration: 800, effect: "zoomOut", pauseAfter: 300 },
            { text: "SOUHAITE", duration: 1000, effect: "pulse", pauseAfter: 350 },
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
    
    // Configuration audio (PAS DE CONTRÔLES VISIBLES)
    audio: {
        enabled: true,
        volume: 0.3,
        fadeInDuration: 2000,
        autoplay: true, // Se lance automatiquement après le clic
        showControls: false // SUPPRESSION DES CONTRÔLES
    },
    
    // Configuration des assets
    assets: {
        royalImage: "manon-reine.png", // Image de la reine
        backgroundMusic: "musique_royale.mp3"
    },
    
    // Options de customisation rapide
    customization: {
        skipAnimations: false, // Pour debug/test rapide
        debugMode: true, // Affiche les logs de debug
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
    console.log('🏰 Initialisation du Palais Royal...');
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
    elements.royalMusic = document.getElementById('royal-music');
    
    console.log('🔧 Éléments DOM initialisés:', elements);
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    if (elements.startBtn) {
        elements.startBtn.addEventListener('click', startRoyalExperience);
        console.log('🎯 Event listener ajouté au bouton de démarrage');
    } else {
        console.error('❌ Bouton de démarrage non trouvé!');
    }
    
    // Gestion des clics pour accélérer les animations
    if (ROYAL_CONFIG.customization.clickToAccelerate) {
        document.addEventListener('click', accelerateAnimation);
    }
    
    // Gestion de la visibilité de la page
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Séquence de chargement CORRIGÉE
function startLoadingSequence() {
    console.log('⏳ Démarrage de la séquence de chargement...');
    
    const loadingProgress = document.querySelector('.loading-progress');
    const duration = ROYAL_CONFIG.loading.duration;
    
    // Animation de la barre de progression
    setTimeout(() => {
        if (loadingProgress) {
            loadingProgress.style.animation = `loadingProgress ${duration}ms ease-out forwards`;
        }
    }, 100);
    
    // Affichage du bouton de démarrage après le chargement
    setTimeout(() => {
        console.log('✅ Chargement terminé, affichage du bouton...');
        
        if (elements.loadingScreen) {
            elements.loadingScreen.style.opacity = '0';
            elements.loadingScreen.style.transition = 'opacity 1s ease-out';
        }
        
        setTimeout(() => {
            if (elements.loadingScreen) {
                elements.loadingScreen.classList.add('hidden');
            }
            if (elements.startOverlay) {
                elements.startOverlay.classList.add('show');
                console.log('🎭 Menu de démarrage affiché');
            }
        }, 1000);
    }, duration);
}

// Démarrage de l'expérience royale
function startRoyalExperience() {
    console.log('🚀 Démarrage de l\'expérience royale!');
    
    if (isAnimationRunning) {
        console.log('⚠️ Animation déjà en cours...');
        return;
    }
    
    isAnimationRunning = true;
    
    // Préparation et démarrage automatique de l'audio
    prepareAndStartAudio();
    
    // Masquage de l'overlay de démarrage
    if (elements.startOverlay) {
        elements.startOverlay.style.opacity = '0';
        elements.startOverlay.style.transition = 'opacity 0.8s ease-out';
    }
    
    setTimeout(() => {
        if (elements.startOverlay) {
            elements.startOverlay.classList.add('hidden');
        }
        if (elements.mainExperience) {
            elements.mainExperience.classList.remove('hidden');
        }
        
        console.log('🎪 Transition vers l\'expérience principale');
        
        // Démarrage de la séquence d'animations
        startAnimationSequence();
    }, 800);
}

// Préparation et démarrage automatique de l'audio
function prepareAndStartAudio() {
    if (ROYAL_CONFIG.audio.enabled && elements.royalMusic) {
        elements.royalMusic.volume = 0;
        elements.royalMusic.play().then(() => {
            fadeInAudio();
            console.log('🎵 Musique royale démarrée automatiquement');
        }).catch(error => {
            console.log('🎵 Audio autoplay bloqué par le navigateur:', error);
            // Tentative de relance après un délai
            setTimeout(() => {
                elements.royalMusic.play().then(() => {
                    fadeInAudio();
                    console.log('🎵 Musique relancée avec succès');
                }).catch(() => {
                    console.log('🎵 Impossible de lancer la musique automatiquement');
                });
            }, 1000);
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
    console.log('🎆 Démarrage de la séquence d\'animations');
    
    // 1. Animation des confettis
    createConfettiExplosion();
    
    // 2. Démarrage de la séquence de textes après les confettis
    setTimeout(() => {
        startTextSequence();
    }, ROYAL_CONFIG.animations.confetti.duration);
}

// Création de l'explosion de confettis
function createConfettiExplosion() {
    console.log('🎊 Explosion de confettis!');
    
    const container = elements.confettiContainer;
    const config = ROYAL_CONFIG.animations.confetti;
    
    if (!container) {
        console.error('❌ Container de confettis non trouvé!');
        return;
    }
    
    for (let i = 0; i < config.particleCount; i++) {
        setTimeout(() => {
            createConfettiParticle(container, config.colors);
        }, Math.random() * 500);
    }
    
    // Nettoyage des confettis après l'animation
    setTimeout(() => {
        container.innerHTML = '';
        console.log('🧹 Confettis nettoyés');
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
    console.log('📝 Démarrage de la séquence de textes');
    currentAnimationStep = 0;
    animateNextText();
}

// Animation du texte suivant
function animateNextText() {
    const sequence = ROYAL_CONFIG.animations.textSequence;
    
    if (currentAnimationStep >= sequence.length) {
        console.log('📜 Séquence de textes terminée');
        // Fin de la séquence de textes, démarrage de l'image royale
        setTimeout(() => {
            showRoyalImage();
        }, ROYAL_CONFIG.animations.royalImage.delayAfterText);
        return;
    }
    
    const currentText = sequence[currentAnimationStep];
    console.log(`🎭 Animation du texte ${currentAnimationStep + 1}/${sequence.length}: "${currentText.text}"`);
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
    
    if (!textDisplay) {
        console.error('❌ Element textDisplay non trouvé!');
        return;
    }
    
    textDisplay.textContent = textConfig.text;
    textDisplay.className = 'text-display';
    
    // Application de l'animation
    setTimeout(() => {
        textDisplay.classList.add(`text-${textConfig.effect}`);
    }, 50);
    
    console.log(`🎭 Animation appliquée: ${textConfig.text} (${textConfig.effect})`);
}

// Masquage du texte actuel
function hideCurrentText(callback) {
    const textDisplay = elements.textDisplay;
    
    if (!textDisplay) {
        callback();
        return;
    }
    
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
    console.log('👑 Affichage de l\'image de la Reine Manon');
    
    const imageContainer = elements.royalImageContainer;
    const config = ROYAL_CONFIG.animations.royalImage;
    
    if (!imageContainer) {
        console.error('❌ Container image royale non trouvé!');
        showFinalMessage();
        return;
    }
    
    // Tentative d'affichage de l'image manon-reine.png
    tryToLoadRoyalImage();
    
    imageContainer.classList.remove('hidden');
    
    // Animation d'entrée avec rotation 3D
    setTimeout(() => {
        imageContainer.style.transition = `transform ${config.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        imageContainer.style.transform = 'translateX(-50%) translateY(0) rotateY(360deg) scale(1.05)';
        
        // Retour à la taille normale après l'animation
        setTimeout(() => {
            imageContainer.style.transform = 'translateX(-50%) translateY(0) rotateY(0deg) scale(1)';
        }, config.duration);
    }, 100);
    
    // Masquage du texte et affichage du message final
    setTimeout(() => {
        if (elements.textContainer) {
            elements.textContainer.style.opacity = '0';
            elements.textContainer.style.transition = 'opacity 1s ease-out';
        }
        
        setTimeout(() => {
            showFinalMessage();
        }, ROYAL_CONFIG.animations.finalMessage.delayAfterImage);
    }, config.duration);
}

// Tentative de chargement de l'image manon-reine.png
function tryToLoadRoyalImage() {
    if (ROYAL_CONFIG.assets.royalImage) {
        const img = new Image();
        img.onload = () => {
            // Remplacement par l'image réelle
            const placeholder = document.querySelector('.royal-image-placeholder');
            if (placeholder) {
                placeholder.innerHTML = `
                    <img src="${ROYAL_CONFIG.assets.royalImage}" 
                         alt="Reine Manon" 
                         style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px; 
                                box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
                                animation: queenImageGlow 3s ease-in-out infinite alternate;" />
                `;
            }
            
            console.log('👑 Image de la Reine Manon chargée avec succès');
        };
        
        img.onerror = () => {
            console.log('⚠️ Image manon-reine.png non trouvée, utilisation du placeholder royal');
            // Le placeholder reste en place avec les emojis
        };
        
        img.src = ROYAL_CONFIG.assets.royalImage;
    }
}

// Affichage du message final CORRIGÉ
function showFinalMessage() {
    console.log('📜 Affichage du message final');
    
    // Mise à jour du texte final
    const messageTitle = document.querySelector('.message-title');
    const messageSubtitle = document.querySelector('.message-subtitle');
    
    if (messageTitle) {
        messageTitle.textContent = "Il est temps d'ouvrir la lettre royale !";
    }
    
    if (messageSubtitle) {
        messageSubtitle.textContent = "(L'enveloppe avec le QR code qui vous a menée ici) 👑📜";
    }
    
    if (elements.finalMessage) {
        elements.finalMessage.classList.remove('hidden');
    }
    
    setTimeout(() => {
        isAnimationRunning = false;
        console.log('👑 Expérience royale terminée! Vive la Reine Manon!');
    }, ROYAL_CONFIG.animations.finalMessage.duration);
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
        console.log('⚡ Animation accélérée');
    }
}

// Gestion de la visibilité de la page
function handleVisibilityChange() {
    if (document.hidden && elements.royalMusic && !elements.royalMusic.paused) {
        // Optionnel: mettre en pause quand la page n'est pas visible
        // elements.royalMusic.pause();
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
    
    // Redémarrer l'expérience
    restart: function() {
        location.reload();
    },
    
    // Passer directement à une étape (pour debug)
    skipToStep: function(step) {
        console.log('🏃‍♂️ Saut vers l\'étape:', step);
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

// CSS dynamique pour l'animation de l'image de la reine
const queenImageStyle = document.createElement('style');
queenImageStyle.textContent = `
    @keyframes queenImageGlow {
        0% { 
            filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.6)) brightness(1);
            transform: scale(1);
        }
        100% { 
            filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.9)) brightness(1.1);
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(queenImageStyle);

// Messages de bienvenue dans la console
console.log(`
🏰 ===== PALAIS ROYAL DE SOINGS-EN-SOLOGNE =====

✅ CORRECTIONS APPLIQUÉES:
- Menu parfaitement centré au milieu de l'écran
- Séquence complète: LE → PALAIS → ROYAL → DE → SOINGS → EN → SOLOGNE → VOUS → SOUHAITE → UN JOYEUX ANNIVERSAIRE
- Suppression de tous les contrôles audio
- Message final corrigé: "Il est temps d'ouvrir la lettre royale !"
- Support de l'image manon-reine.png avec animation
- Correction de l'affichage de SOLOGNE

Configuration disponible via: window.RoyalConfig
Customisation via: window.RoyalCustomization

👑 Vive la Reine Manon! 👑
`);

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('🚨 Erreur dans l\'expérience royale:', e.error);
});

// Préchargement des ressources si disponibles
function preloadAssets() {
    const assets = ROYAL_CONFIG.assets;
    
    // Préchargement de l'image royale
    if (assets.royalImage) {
        const img = new Image();
        img.onload = () => {
            console.log('🖼️ Image royale préchargée avec succès');
        };
        img.onerror = () => {
            console.log('⚠️ Image royale non trouvée, placeholder utilisé');
        };
        img.src = assets.royalImage;
    }
    
    // Préchargement de l'audio
    if (assets.backgroundMusic && elements.royalMusic) {
        elements.royalMusic.addEventListener('canplaythrough', () => {
            console.log('🎵 Musique royale préchargée');
        });
        
        elements.royalMusic.addEventListener('error', () => {
            console.log('⚠️ Musique royale non trouvée');
        });
    }
}

// Initialisation du préchargement
document.addEventListener('DOMContentLoaded', preloadAssets);
