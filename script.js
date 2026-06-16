document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Hamburger Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // --- 2. Scroll Animation (Fade-In) ---
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // --- 3. Playground Category Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const playgroundCards = document.querySelectorAll('.playground-card');

    if (filterButtons.length > 0 && playgroundCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active class on buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Filter cards
                playgroundCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'inline-block';
                        // Trigger fade animation again
                        card.classList.remove('is-visible');
                        setTimeout(() => {
                            card.classList.add('is-visible');
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- 4. POPI Chatbot Simulator (DP2) ---
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotOptions = document.getElementById('chatbot-options');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    if (chatbotMessages) {
        // Pre-programmed bot replies
        const replies = {
            showtimes: "Today at Vieshow Cinemas, we have *Dune: Part Two* (IMAX 3D) playing at 18:30 and 21:15, and *Everything Everywhere All at Once* playing at 19:00! Which one would you like to see? 🎬",
            tickets: "Booking tickets is simple! Tap on your preferred showtime, choose your seats, and scan your barcode at the door. Vieshow members also receive 10% off combo meals! 🎟️",
            food: "We have a special 'POPI Popcorn Combo' today! 🍿 A large popcorn, two medium drinks, and a warm hot dog for only $299 (normally $420). Would you like me to reserve one?",
            personality: "I'm POPI, a movie companion sprite inspired by cinema popcorn! 🍿 I love butter, film trivia, and helping movie lovers navigate their theater experience. Nice to meet you!"
        };

        // Helper function to append message bubbles
        function appendMessage(sender, text) {
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${sender}`;
            bubble.innerText = text;
            chatbotMessages.appendChild(bubble);
            
            // Auto scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        // Helper function to simulate bot response with a small delay
        function simulateBotReply(intent) {
            // Create a typing indicator placeholder
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'chat-bubble bot typing';
            typingIndicator.innerText = "...";
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            setTimeout(() => {
                // Remove typing indicator
                typingIndicator.remove();
                
                const responseText = replies[intent] || "That sounds fascinating! I am still learning about that specific topic, but I can help you with showtimes, tickets, or concessions! 🍿";
                appendMessage('bot', responseText);
            }, 800);
        }

        // Trigger bot responses from option buttons click
        chatbotOptions.addEventListener('click', (e) => {
            if (e.target.classList.contains('chat-option-btn')) {
                const intent = e.target.getAttribute('data-intent');
                const userText = e.target.innerText;
                
                // Add user bubble
                appendMessage('user', userText);
                
                // Trigger bot reply
                simulateBotReply(intent);
            }
        });

        // Trigger bot responses from custom input text submission
        function handleCustomInput() {
            const query = chatbotInput.value.trim().toLowerCase();
            if (!query) return;

            // Add user bubble
            appendMessage('user', chatbotInput.value.trim());
            chatbotInput.value = '';

            // Analyze query keywords to determine intent
            let intent = 'default';
            if (query.includes('movie') || query.includes('showtime') || query.includes('play') || query.includes('time') || query.includes('schedule')) {
                intent = 'showtimes';
            } else if (query.includes('ticket') || query.includes('book') || query.includes('buy') || query.includes('seat')) {
                intent = 'tickets';
            } else if (query.includes('popcorn') || query.includes('food') || query.includes('eat') || query.includes('drink') || query.includes('combo') || query.includes('concession')) {
                intent = 'food';
            } else if (query.includes('who') || query.includes('name') || query.includes('you') || query.includes('personality')) {
                intent = 'personality';
            }

            simulateBotReply(intent);
        }

        chatbotSend.addEventListener('click', handleCustomInput);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleCustomInput();
            }
        });
    }

    // --- 5. Lightbox for Project Card Images ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

    if (lightbox && lightboxTriggers.length > 0) {
        function openLightbox(src) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            setTimeout(() => { lightboxImg.src = ''; }, 300);
        }

        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(trigger.getAttribute('data-src'));
            });
        });

        lightboxClose.addEventListener('click', closeLightbox);

        // Click the dark backdrop to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // --- 7. Playground Lightbox (click image → fullscreen) ---
    const pgLightbox = document.getElementById('pg-lightbox');
    const pgLightboxImg = document.getElementById('pg-lightbox-img');
    const pgLightboxClose = document.querySelector('.pg-lightbox-close');
    const pgTriggers = document.querySelectorAll('.pg-lightbox-trigger');

    if (pgLightbox && pgTriggers.length > 0) {
        function openPgLightbox(src) {
            pgLightboxImg.src = src;
            pgLightbox.classList.add('active');
            pgLightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closePgLightbox() {
            pgLightbox.classList.remove('active');
            pgLightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            setTimeout(() => { pgLightboxImg.src = ''; }, 300);
        }

        pgTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const src = trigger.querySelector('img').src;
                openPgLightbox(src);
            });
        });

        pgLightboxClose.addEventListener('click', closePgLightbox);

        pgLightbox.addEventListener('click', (e) => {
            if (e.target === pgLightbox || e.target === pgLightboxImg) closePgLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!pgLightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closePgLightbox();
        });
    }

    // --- 8. Universal Image Lightbox ---
    const imgLightbox = document.createElement('div');
    imgLightbox.className = 'img-lightbox-overlay';
    imgLightbox.setAttribute('role', 'dialog');
    imgLightbox.setAttribute('aria-modal', 'true');
    imgLightbox.setAttribute('aria-hidden', 'true');
    imgLightbox.innerHTML = '<button class="img-lightbox-close" aria-label="Close">&times;</button><img src="" alt="">';
    document.body.appendChild(imgLightbox);

    const imgLbImg = imgLightbox.querySelector('img');
    const imgLbClose = imgLightbox.querySelector('.img-lightbox-close');

    function openImgLb(src, alt) {
        imgLbImg.src = src;
        imgLbImg.alt = alt || '';
        imgLightbox.classList.add('active');
        imgLightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeImgLb() {
        imgLightbox.classList.remove('active');
        imgLightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        setTimeout(() => { imgLbImg.src = ''; }, 300);
    }

    document.querySelectorAll('.img-zoomable').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openImgLb(img.src, img.alt));
    });

    imgLbClose.addEventListener('click', closeImgLb);
    imgLightbox.addEventListener('click', e => {
        if (e.target === imgLightbox) closeImgLb();
    });
    document.addEventListener('keydown', e => {
        if (!imgLightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeImgLb();
    });

    // --- 6. Interactive Hotspot - Detail Cards Coordination ---
    const hotspots = document.querySelectorAll('.hotspot-dot');
    const anatomyCards = document.querySelectorAll('.anatomy-card');

    if (hotspots.length > 0 && anatomyCards.length > 0) {
        hotspots.forEach(hotspot => {
            const targetId = hotspot.getAttribute('data-target');
            const targetCard = document.getElementById(targetId);
            
            hotspot.addEventListener('mouseenter', () => {
                if (targetCard) targetCard.classList.add('highlighted');
                hotspot.classList.add('highlighted');
            });
            hotspot.addEventListener('mouseleave', () => {
                if (targetCard) targetCard.classList.remove('highlighted');
                hotspot.classList.remove('highlighted');
            });
        });

        anatomyCards.forEach(card => {
            const cardId = card.getAttribute('id');
            const relatedHotspots = document.querySelectorAll(`.hotspot-dot[data-target="${cardId}"]`);
            
            card.addEventListener('mouseenter', () => {
                card.classList.add('highlighted');
                relatedHotspots.forEach(h => h.classList.add('highlighted'));
            });
            card.addEventListener('mouseleave', () => {
                card.classList.remove('highlighted');
                relatedHotspots.forEach(h => h.classList.remove('highlighted'));
            });
        });
    }
});
