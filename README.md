# NCCU-HRI Portfolio

**Live site: https://lee0501.github.io/HRI-Robot-Projects/**

A static portfolio website documenting three Human-Robot Interaction (HRI) and Human-AI Interaction (HAI) design projects produced for the course *Designing Human-Robot Interaction and Human-AI Interaction* at National Chengchi University (NCCU).

---

## Team

| Name | Chinese | Role |
|---|---|---|
| Lee Yun-Ping | 李云平 | Design & Development |
| Chang Ching-Min | 張晴閔 | Design & Development |
| Wang Yu-Tung | 王語彤 | Design & Development |

Master's Program of Digital Content and Technologies — NCCU

---

## Projects

### 01 — Pinky Babe · Robot Design & HRI
An interactive robotic creature reimagined from a traffic cone into a friendly, bird-like companion. Explores character-driven robot design, physical prototyping, and the emotional relationship between users and social robots.

### 02 — POPI · AI Cinema Chatbot
An AI-powered customer service chatbot for Vieshow Cinemas built on OpenAI's Custom GPTs framework. POPI takes the form of a popcorn mascot and guides users through movie schedules, ticketing, and theater services — balancing system accuracy with a distinct character persona.

### 03 — Tomato Guardian · Personal Safety Device & HRI
A wearable personal safety companion disguised as a tomato charm. Integrates infrared threat detection, a high-decibel alarm, hidden 360° video recording, and real-time GPS sharing — transitioning between a friendly expression in normal mode and an alert expression when danger is detected.

### Playground · Experiments & Prototypes
Supporting explorations including clay character model studies (Love Boxer, Three-Legged Cat, Cheese Egg) and a physical scale model reconstruction of BellaBot using pearl board.

---

## File Structure

```
├── index.html          # Home — hero, about, project index
├── dp1.html            # Pinky Babe
├── dp2.html            # POPI
├── dp3.html            # Tomato Guardian
├── playground.html     # Playground
├── styles.css          # All styles
├── script.js           # All interactive logic
└── img/                # Project images and videos
    ├── about/
    ├── DP1/
    ├── DP2/
    ├── DP3/
    └── playground/
```

---

## Features

- **Responsive navigation** — collapses to a hamburger menu on mobile
- **Universal image lightbox** — click any `.img-zoomable` image to view fullscreen
- **Bella Bot carousel lightbox** — prev / next navigation (keyboard ← → and Escape supported) across all 9 photos in the scale model gallery
- **POPI chatbot simulator** — preset option buttons with scripted replies; free-text input redirects to the live GPTs chatbot
- **Hotspot interaction** — hover-linked anatomy diagram and feature cards on the Pinky Babe page

---

## Running Locally

No build step required. Open `index.html` directly in a browser:

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve locally (avoids any file:// restrictions)
npx serve .
# or
python3 -m http.server 8080
```

---

## License

This project is for academic and portfolio purposes. All design work and written content belong to the authors. Please do not reproduce without permission.
