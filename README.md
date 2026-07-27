# Larkspire Studios — Cinematic 3D Website

A premium, cinematic, fully three-dimensional website built for **Larkspire Studios**, a boutique web design and development agency founded by **Parmar Tirthraj** and **Dhruval Khasiya**.

The website features an optimized HTML5 Canvas background rendering a 240-frame 3D scroll-based animation, overlaying an interactive 3D WebGL "LS" monogram (using React Three Fiber, Drei, and GSAP), smooth scrolling, and custom 3D-perspective UI layouts.

---

## 🛠️ Tech Stack
*   **Framework**: Next.js 14+ (App Router, TypeScript)
*   **Styling**: Tailwind CSS (Tailwind v4 theme tokens)
*   **3D Engine**: React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
*   **Animation**: GSAP + ScrollTrigger (camera control & timeline sync) + Framer Motion (buttery UI transitions)
*   **Smooth Scroll**: Lenis Scroll integration

---

## 🚀 Getting Started

### 1. Install Dependencies
Run the install command to ensure all libraries are locked:
```bash
npm install
```

*Note: If you run into network proxy SSL errors during package fetch, you can temporarily disable strict SSL verification with:*
```bash
npm config set strict-ssl false
```

### 2. Run Local Development Server
Boot up the local hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to preview the site.

### 3. Build Production Target
Compile the static and server-rendered production bundle:
```bash
npm run build
```

---

## 🎨 Design System & Customization

All design tokens are configured inside [src/app/globals.css](file:///d:/Downloads/frames_30fps_jpg_high_quality/LARKSPIRE/src/app/globals.css) and exposed dynamically to Tailwind:
-   **Background**: Near-black (`#0A0A0A` / `#121214`)
-   **Primary Gold**: Brushed gold gradient (`#D4AF37` to `#F4E5B2` to `#B8860B`)
-   **Text Color**: Off-white (`#F5F1E8`) & Muted Warm Grey (`#9A968C`)
-   **Border Corner Radius**: Architectural sharp `4px`

---

## ✏️ Swapping Assets & Content

### 1. Swapping 3D Scroll Frames
The 240 JPEGs are stored in [public/frames/](file:///d:/Downloads/frames_30fps_jpg_high_quality/LARKSPIRE/public/frames).
If you export a new 3D animation sequence:
1.  Export it as a sequence of JPGs at **30fps** (compressed at around 80% quality to optimize page weight).
2.  Use the name template: `frame_00000.jpg` to `frame_00239.jpg` (240 files).
3.  Place them inside `/public/frames/` and reload the page.

### 2. Customizing Monogram Geometry
The 3D logo monogram is modeled procedurally using SVG/Path drawing curves inside [src/components/LogoMonogram3D.tsx](file:///d:/Downloads/frames_30fps_jpg_high_quality/LARKSPIRE/src/components/LogoMonogram3D.tsx).
-   If you have a custom `.glb` model, you can load it in using Drei's `useGLTF` hook, replacing the `<extrudeGeometry>` tags in `LogoMonogram3D.tsx`.

### 3. Editing Founders & Copy Details
-   **Headshot/Card Details**: Modify card titles and strings inside [src/components/AboutSection.tsx](file:///d:/Downloads/frames_30fps_jpg_high_quality/LARKSPIRE/src/components/AboutSection.tsx).
-   **Pricing Slabs**: Adjust pricing values or checklist items in [src/components/PricingSection.tsx](file:///d:/Downloads/frames_30fps_jpg_high_quality/LARKSPIRE/src/components/PricingSection.tsx).
-   **Case Studies**: Swap project descriptions, tags, and years in [src/components/PortfolioSection.tsx](file:///d:/Downloads/frames_30fps_jpg_high_quality/LARKSPIRE/src/components/PortfolioSection.tsx).
-   **Contact Numbers/Emails**: Edit strings in [src/components/ContactSection.tsx](file:///d:/Downloads/frames_30fps_jpg_high_quality/LARKSPIRE/src/components/ContactSection.tsx) and the floating WhatsApp link in [src/components/WhatsAppButton.tsx](file:///d:/Downloads/frames_30fps_jpg_high_quality/LARKSPIRE/src/components/WhatsAppButton.tsx).
