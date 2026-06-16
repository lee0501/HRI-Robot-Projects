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
    const POPI_URL = 'https://chatgpt.com/g/g-69edf86a70808191934c062f46678f54-popi';

    if (chatbotMessages) {
        const replies = {
            showtimes: "Great question! 🎬 I can look up showtimes at VieShow Cinemas and MUVIE CINEMAS for you.\n\nTry asking me things like:\n• \"What's showing at Xinyi VieShow tonight?\"\n• \"Show me IMAX screenings this evening\"\n• \"Any movies starting after 8pm?\"\n\nJust tell me your preferred location and time — I'll find the right show for you!",
            tickets: "Happy to help with ticketing! 🎟\n\nAt VieShow Cinemas and MUVIE CINEMAS, you can book through:\n• The official VieShow website or mobile app\n• MUVIE CINEMAS' own booking platform\n• Directly at the cinema counter on the day\n\nVieShow membership holders enjoy priority access and exclusive discounts. Student, senior, and promotional pricing are also available at select screenings.\n\nTell me your preferred cinema and showtime — I'll guide you step by step!",
            food: "Snack time! 🍿 VieShow Cinemas and MUVIE CINEMAS offer a full range of food and beverages, including:\n\n• Classic & premium flavored popcorn\n• Combo meals with drinks\n• In-theater dining at select locations\n• Seasonal and limited-time promotions\n\nLet me know what you're in the mood for — I'll point you to the best options!",
            personality: "Hi there! Welcome to VieShow Cinemas 🎬\n\nI'm POPI, your official assistant for VieShow Cinemas and MUVIE CINEMAS. I specialize in helping you with everything related to your movie experience.\n\nI can help you with:\n• 🎥 Movies currently showing at VieShow or MUVIE\n• 🕒 Showtimes and available screenings\n• 📍 Cinema locations and facilities\n• 🎟 Ticket prices, discounts, and booking\n• 🍿 Food, combos, and in-theater services\n\nTell me what you'd like to do — I'll guide you step by step! 🎬"
        };

        function appendMessage(sender, text) {
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${sender}`;
            bubble.textContent = text;
            chatbotMessages.appendChild(bubble);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function simulateBotReply(intent) {
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'chat-bubble bot typing';
            typingIndicator.textContent = '...';
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            setTimeout(() => {
                typingIndicator.remove();
                const responseText = replies[intent] || "Thanks for your question! I only assist with VieShow Cinemas and MUVIE CINEMAS topics — movies, showtimes, tickets, food, and locations.\n\nType your question and click Send to bring it directly to POPI for a full, accurate answer! 🎬";
                appendMessage('bot', responseText);
            }, 800);
        }

        chatbotOptions.addEventListener('click', (e) => {
            if (e.target.classList.contains('chat-option-btn')) {
                appendMessage('user', e.target.innerText);
                simulateBotReply(e.target.getAttribute('data-intent'));
            }
        });

        function appendBotWithButton() {
            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble bot';

            const msg = document.createTextNode('Love the curiosity! 🍿 I cover the VieShow essentials right here on this page — but your question deserves the full POPI treatment!\n\nPOPI is live, knowledgeable, and can\'t wait to hear from you. Go chat with POPI! 🎬✨');
            const btn = document.createElement('a');
            btn.href = POPI_URL;
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';
            btn.className = 'chat-popi-btn';
            btn.textContent = 'Hi POPI! →';

            bubble.appendChild(msg);
            bubble.appendChild(document.createElement('br'));
            bubble.appendChild(document.createElement('br'));
            bubble.appendChild(btn);
            chatbotMessages.appendChild(bubble);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        chatbotSend.addEventListener('click', () => {
            const text = chatbotInput.value.trim();
            if (!text) return;
            appendMessage('user', text);
            chatbotInput.value = '';

            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'chat-bubble bot typing';
            typingIndicator.textContent = '...';
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            setTimeout(() => {
                typingIndicator.remove();
                appendBotWithButton();
            }, 800);
        });

        // Enter key does NOT submit — only the Send button does
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
