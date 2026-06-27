// Extra chapters/lessons merged into existing tracks by track id

export const extraChapters = {

  html5: [
    {
      id: "html-css-basics",
      title: "CSS Styling",
      lessons: [
        {
          id: "css-box-model",
          title: "CSS Box Model",
          language: "html",
          theory: {
            intro: "Every HTML element is a box. The CSS box model describes the four layers around content: padding (inner space), border, margin (outer space), and the content itself. Understanding this one concept unlocks 80% of layout debugging.",
            sections: [
              {
                heading: "The Four Layers",
                content: "From inside out: content → padding → border → margin. Padding adds space inside the element (background shows through). Margin adds space outside (transparent).",
                code: `.card {\n  /* Content size */\n  width: 300px;\n  height: 200px;\n\n  /* Inner spacing — background fills this */\n  padding: 20px;\n\n  /* Border around padding */\n  border: 2px solid #3b82f6;\n\n  /* Outer spacing — always transparent */\n  margin: 16px;\n\n  /* Without this, width = content+padding+border = 344px! */\n  box-sizing: border-box;\n}`,
                breakdown: [
                  { line: "padding: 20px", explanation: "Adds 20px of space inside the element on all 4 sides. The background color fills padding." },
                  { line: "border: 2px solid", explanation: "Drawn between padding and margin. Adds to total size unless box-sizing: border-box." },
                  { line: "margin: 16px", explanation: "Pushes other elements away. Transparent — you see the parent background through it." },
                  { line: "box-sizing: border-box", explanation: "Makes width/height include padding+border. Without it, a 300px element with padding becomes 340px wide." },
                ]
              },
              {
                heading: "Shorthand Values",
                content: "Most spacing properties accept 1–4 values as shorthand. The order is always: top, right, bottom, left (clockwise from 12 o'clock).",
                code: `/* All sides equal */\npadding: 16px;\n\n/* Top/bottom | Left/right */\npadding: 12px 24px;\n\n/* Top | Left/right | Bottom */\npadding: 8px 16px 12px;\n\n/* Top | Right | Bottom | Left */\npadding: 4px 8px 12px 16px;\n\n/* Individual sides */\nmargin-top: 0;\nmargin-bottom: 1rem;\npadding-left: 2rem;`,
                breakdown: [
                  { line: "padding: 12px 24px", explanation: "12px top & bottom, 24px left & right." },
                  { line: "padding: 4px 8px 12px 16px", explanation: "Clockwise: top=4, right=8, bottom=12, left=16." },
                  { line: "margin-bottom: 1rem", explanation: "Only sets the bottom margin. Other margins stay unchanged." },
                ]
              },
              {
                heading: "Display & Width Behaviour",
                content: "Block elements (div, p, h1) take full width by default. Inline elements (span, a) only take as much width as their content.",
                code: `/* Block: full row width */\ndiv { display: block; }\n\n/* Inline: content width only, ignores width/height */\nspan { display: inline; }\n\n/* Best of both — respects width/height, stays inline */\nbutton { display: inline-block; }\n\n/* Flex container */\n.row { display: flex; gap: 16px; }`,
                breakdown: [
                  { line: "display: block", explanation: "Takes up the full row. Next element goes below. Can set width/height." },
                  { line: "display: inline", explanation: "Flows with text. width/height ignored. Think <span>, <a>, <strong>." },
                  { line: "display: inline-block", explanation: "Flows inline BUT respects width/height — used for buttons, badges." },
                  { line: "display: flex", explanation: "Turns children into flex items. Enables justify-content and align-items." },
                ]
              }
            ],
            tip: "Always set * { box-sizing: border-box; } at the top of every CSS file. It prevents the most common sizing bugs."
          },
          defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Box Model</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body { font-family: system-ui; padding: 2rem; background: #f1f5f9; }\n\n    .demo-box {\n      width: 300px;\n      height: 120px;\n      background: #dbeafe;\n      padding: 24px;\n      border: 3px solid #3b82f6;\n      margin: 20px auto;\n    }\n\n    .card {\n      background: white;\n      border-radius: 10px;\n      padding: 1.5rem;\n      margin-bottom: 1rem;\n      box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n      max-width: 400px;\n    }\n\n    .card h2 { margin-bottom: 0.5rem; color: #1e3a5f; }\n    .card p  { color: #4b5563; line-height: 1.6; }\n\n    .tag {\n      display: inline-block;\n      padding: 4px 12px;\n      background: #ede9fe;\n      color: #7c3aed;\n      border-radius: 20px;\n      font-size: 0.8rem;\n      margin-top: 0.75rem;\n      margin-right: 4px;\n    }\n  </style>\n</head>\n<body>\n  <h1 style="margin-bottom:1rem">CSS Box Model Demo</h1>\n\n  <div class="demo-box">\n    I am 300px wide with 24px padding and a 3px border.\n    box-sizing: border-box keeps me at 300px total.\n  </div>\n\n  <div class="card">\n    <h2>Flask Web Development</h2>\n    <p>Build full-stack Python apps with SQLite and dynamic templates.</p>\n    <span class="tag">Python</span>\n    <span class="tag">Flask</span>\n    <span class="tag">SQLite</span>\n  </div>\n</body>\n</html>`
        },
        {
          id: "css-colors-typography",
          title: "Colors & Typography",
          language: "html",
          theory: {
            intro: "Typography and color are the two biggest levers for making a page look professional. A well-chosen font and consistent color system transforms student-looking HTML into polished UI.",
            sections: [
              {
                heading: "Color Values",
                content: "CSS accepts colors in multiple formats. Use hex or rgba for most work. HSL is great for generating color variations programmatically.",
                code: `/* Named color (limited, avoid in production) */\ncolor: red;\n\n/* Hex — most common */\ncolor: #3b82f6;        /* 6-digit */\ncolor: #fff;           /* 3-digit shorthand = #ffffff */\n\n/* RGB */\ncolor: rgb(59, 130, 246);\n\n/* RGBA — with transparency (0=invisible, 1=opaque) */\nbackground: rgba(59, 130, 246, 0.1);  /* 10% blue */\n\n/* HSL — Hue(0-360°) Saturation(%) Lightness(%) */\ncolor: hsl(217, 91%, 60%);\n\n/* CSS custom properties (variables) */\n:root {\n  --primary: #3b82f6;\n  --text: #1f2937;\n}\nh1 { color: var(--primary); }`,
                breakdown: [
                  { line: "#3b82f6", explanation: "Hex: R=3b(59), G=82(130), B=f6(246). The most widely used format." },
                  { line: "rgba(59, 130, 246, 0.1)", explanation: "0.1 alpha = 10% opaque. Great for backgrounds, hover states." },
                  { line: "hsl(217, 91%, 60%)", explanation: "Hue=blue-ish, Saturation=very saturated, Lightness=medium. Easy to darken: change 60% to 40%." },
                  { line: "var(--primary)", explanation: "Custom property — define once in :root, use everywhere. Changes cascade automatically." },
                ]
              },
              {
                heading: "Typography Properties",
                content: "Five properties control almost all text styling. Learn these and you can match any design.",
                code: `body {\n  font-family: 'Inter', system-ui, sans-serif;\n  font-size: 16px;       /* base size */\n  line-height: 1.6;      /* 1.5–1.8 for body text */\n  color: #1f2937;\n}\n\nh1 {\n  font-size: 2.5rem;     /* relative to base: 40px */\n  font-weight: 700;      /* bold */\n  letter-spacing: -0.02em; /* tighter for headings */\n}\n\n.caption {\n  font-size: 0.875rem;   /* 14px */\n  color: #6b7280;        /* muted gray */\n  font-style: italic;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}`,
                breakdown: [
                  { line: "font-family: 'Inter', system-ui", explanation: "Font stack: tries Inter first, falls back to system font. Always end with a generic (sans-serif)." },
                  { line: "line-height: 1.6", explanation: "Unitless — multiplied by font-size. 1.6 × 16px = 25.6px line spacing. Keep body text 1.5–1.7." },
                  { line: "font-size: 2.5rem", explanation: "rem = relative to root font-size. 2.5rem = 40px if root is 16px. Better than px for accessibility." },
                  { line: "letter-spacing: -0.02em", explanation: "Tighter letter spacing for large headings looks more professional. Use em so it scales with font-size." },
                ]
              },
              {
                heading: "Google Fonts",
                content: "Load any Google Font in the <head> and it becomes available as a font-family name.",
                code: `<!-- In <head> -->\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Fira+Code&display=swap" rel="stylesheet">\n\n<style>\n  body   { font-family: 'Inter', sans-serif; }\n  code   { font-family: 'Fira Code', monospace; }\n</style>`,
                breakdown: [
                  { line: "wght@400;600;700", explanation: "Loads only the 400 (regular), 600 (semibold), 700 (bold) weights. Don't load weights you don't use." },
                  { line: "display=swap", explanation: "Shows fallback font while Google Font loads, then swaps. Prevents invisible text." },
                ]
              }
            ],
            tip: "Set a CSS variable --font-sans on :root and use it everywhere. Changing the entire site's font becomes a one-line edit."
          },
          defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Typography</title>\n  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">\n  <style>\n    :root {\n      --primary:  #4f46e5;\n      --text:     #1f2937;\n      --muted:    #6b7280;\n      --bg:       #f9fafb;\n      --surface:  #ffffff;\n    }\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body { font-family: 'Inter', system-ui, sans-serif; background: var(--bg); color: var(--text); padding: 2rem; line-height: 1.6; }\n\n    .container { max-width: 600px; margin: 0 auto; }\n\n    h1 { font-size: 2.25rem; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.5rem; color: var(--primary); }\n    h2 { font-size: 1.25rem; font-weight: 600; margin: 2rem 0 0.5rem; }\n    p  { color: var(--muted); margin-bottom: 1rem; }\n\n    .badge {\n      display: inline-block; padding: 3px 10px;\n      background: rgba(79,70,229,0.1); color: var(--primary);\n      border-radius: 20px; font-size: 0.75rem; font-weight: 600;\n      text-transform: uppercase; letter-spacing: 0.05em;\n    }\n\n    .card {\n      background: var(--surface); border-radius: 12px;\n      padding: 1.5rem; margin-top: 1.5rem;\n      box-shadow: 0 1px 4px rgba(0,0,0,0.08);\n      border: 1px solid rgba(0,0,0,0.06);\n    }\n\n    blockquote {\n      border-left: 3px solid var(--primary);\n      padding-left: 1rem; margin: 1.5rem 0;\n      color: var(--muted); font-style: italic;\n    }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <span class="badge">Typography Demo</span>\n    <h1>Good typography is invisible</h1>\n    <p>When type is set well, readers don't notice it — they just absorb the content. When it's set badly, it gets in the way.</p>\n\n    <div class="card">\n      <h2>Font Scale</h2>\n      <p style="font-size:2rem; font-weight:700; color:#1f2937">h1 — 2rem bold</p>\n      <p style="font-size:1.25rem; font-weight:600; color:#374151">h2 — 1.25rem semibold</p>\n      <p style="font-size:1rem; color:#4b5563">Body — 1rem regular, color #4b5563</p>\n      <p style="font-size:0.875rem; color:#9ca3af">Caption — 0.875rem muted</p>\n    </div>\n\n    <blockquote>\n      "Typography is the craft of endowing human language with a durable visual form." — Robert Bringhurst\n    </blockquote>\n  </div>\n</body>\n</html>`
        }
      ]
    },
    {
      id: "html-media-accessibility",
      title: "Media & Accessibility",
      lessons: [
        {
          id: "html5-media",
          title: "HTML5 Media Elements",
          language: "html",
          theory: {
            intro: "HTML5 introduced native <video> and <audio> tags — no Flash plugin required. You can embed media directly, with full browser controls, captions, and fallback content.",
            sections: [
              {
                heading: "The <video> Element",
                content: "Provide multiple source formats for cross-browser compatibility. The browser picks the first format it supports.",
                code: `<video controls width="640" height="360" poster="thumbnail.jpg">\n  <source src="intro.mp4"  type="video/mp4">\n  <source src="intro.webm" type="video/webm">\n  <track kind="subtitles" src="captions.vtt" srclang="en" label="English">\n  <!-- Fallback for old browsers -->\n  <p>Your browser doesn't support video. <a href="intro.mp4">Download it</a>.</p>\n</video>`,
                breakdown: [
                  { line: "controls", explanation: "Shows built-in play/pause/volume UI. Without it, the video has no controls." },
                  { line: "poster='thumbnail.jpg'", explanation: "Image shown before the video plays — like a video thumbnail." },
                  { line: "<source>", explanation: "Multiple formats: browser uses the first one it can play. MP4 is most widely supported." },
                  { line: "<track kind='subtitles'>", explanation: "Adds caption/subtitle file (.vtt format). Essential for accessibility." },
                ]
              },
              {
                heading: "The <audio> Element",
                content: "Same pattern as video but without width/height. The controls attribute gives you a minimal audio player.",
                code: `<audio controls>\n  <source src="podcast.mp3"  type="audio/mpeg">\n  <source src="podcast.ogg"  type="audio/ogg">\n  Your browser doesn't support audio.\n</audio>\n\n<!-- Autoplay (muted required for autoplay to work) -->\n<video autoplay muted loop playsinline src="bg.mp4"></video>`,
                breakdown: [
                  { line: "autoplay muted loop", explanation: "Background videos: autoplay needs muted to work. loop repeats. playsinline prevents fullscreen on iOS." },
                ]
              },
              {
                heading: "The <figure> & <figcaption>",
                content: "Wrap images or media in <figure> and add a <figcaption> for a semantic caption — better than a <p> below an image.",
                code: `<figure>\n  <img src="chart.png" alt="Line chart showing growth from 2020 to 2024">\n  <figcaption>Fig 1. Annual user growth, 2020–2024</figcaption>\n</figure>`,
                breakdown: [
                  { line: "<figure>", explanation: "Self-contained content that's referenced from the main text — image, chart, code block, diagram." },
                  { line: "<figcaption>", explanation: "Description of the figure. Linked semantically to the figure — screen readers associate them." },
                ]
              }
            ],
            tip: "Always add subtitles/captions to video content. Use WebVTT (.vtt) format — it's the standard supported by all browsers."
          },
          defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Media Elements</title>\n  <style>\n    body { font-family: system-ui; padding: 2rem; max-width: 700px; margin: 0 auto; background: #0f172a; color: #e2e8f0; }\n    h1 { margin-bottom: 1.5rem; color: #7c3aed; }\n    figure { margin: 2rem 0; }\n    figcaption { font-size: 0.875rem; color: #94a3b8; margin-top: 0.5rem; text-align: center; }\n    audio { width: 100%; margin: 1rem 0; }\n    .media-card { background: #1e293b; border-radius: 12px; padding: 1.5rem; margin: 1rem 0; }\n    .tag { display:inline-block; background:#7c3aed22; color:#a78bfa; padding:2px 10px; border-radius:20px; font-size:0.8rem; margin-bottom:1rem; }\n  </style>\n</head>\n<body>\n  <h1>HTML5 Media Elements</h1>\n\n  <!-- Audio player -->\n  <div class="media-card">\n    <div class="tag">Audio</div>\n    <p style="margin-bottom:1rem; color:#94a3b8">A native HTML5 audio player — no JavaScript needed:</p>\n    <audio controls>\n      <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" type="audio/mpeg">\n      Your browser does not support the audio element.\n    </audio>\n  </div>\n\n  <!-- Figure + image -->\n  <div class="media-card">\n    <div class="tag">Figure</div>\n    <figure>\n      <img src="https://picsum.photos/600/300?random=5" alt="Abstract landscape" style="width:100%; border-radius:8px;">\n      <figcaption>Fig 1. A random scenic photo — semantic figure with caption</figcaption>\n    </figure>\n  </div>\n\n  <!-- Iframe embed -->\n  <div class="media-card">\n    <div class="tag">iframe</div>\n    <p style="color:#94a3b8; margin-bottom:1rem">YouTube, Google Maps, and other services embed via iframe:</p>\n    <iframe width="100%" height="200" src="https://www.openstreetmap.org/export/embed.html?bbox=80.2,13.0,80.3,13.1&layer=mapnik" style="border:0; border-radius:8px;" loading="lazy"></iframe>\n    <figcaption style="color:#64748b; font-size:0.8rem; margin-top:4px">Chennai, Tamil Nadu — OpenStreetMap</figcaption>\n  </div>\n</body>\n</html>`
        }
      ]
    }
  ],

  bootstrap: [
    {
      id: "bs-advanced",
      title: "Advanced Components",
      lessons: [
        {
          id: "bs-forms",
          title: "Bootstrap Forms",
          language: "html",
          theory: {
            intro: "Bootstrap completely reskins form elements — inputs, selects, checkboxes, and range sliders all get consistent, polished styling out of the box. Bootstrap forms also have built-in validation states.",
            sections: [
              {
                heading: "Form Controls",
                content: "Bootstrap form classes: form-label for labels, form-control for text/email/select/textarea, form-check for checkboxes and radios.",
                code: `<form>\n  <!-- Text input -->\n  <div class="mb-3">\n    <label for="name" class="form-label">Full Name</label>\n    <input type="text" id="name" class="form-control" placeholder="Enter name">\n  </div>\n\n  <!-- Select -->\n  <div class="mb-3">\n    <label for="course" class="form-label">Course</label>\n    <select id="course" class="form-select">\n      <option value="">Choose...</option>\n      <option>BSc Data Science</option>\n      <option>Diploma</option>\n    </select>\n  </div>\n\n  <!-- Checkbox -->\n  <div class="form-check mb-3">\n    <input type="checkbox" id="agree" class="form-check-input">\n    <label for="agree" class="form-check-label">I agree to the terms</label>\n  </div>\n\n  <!-- Range slider -->\n  <div class="mb-3">\n    <label class="form-label">Experience level: <span id="val">5</span></label>\n    <input type="range" class="form-range" min="1" max="10"\n           oninput="document.getElementById('val').textContent = this.value">\n  </div>\n</form>`,
                breakdown: [
                  { line: ".form-label", explanation: "Consistent label styling with bottom margin." },
                  { line: ".form-control", explanation: "Applies to input, textarea. Gives border, padding, focus ring, sizing." },
                  { line: ".form-select", explanation: "Same as form-control but for <select>. Adds the custom dropdown arrow." },
                  { line: ".form-check / .form-check-input", explanation: "Custom-styled checkboxes and radio buttons." },
                  { line: ".form-range", explanation: "Styled range slider with custom thumb and track." },
                ]
              },
              {
                heading: "Validation States",
                content: "Bootstrap shows green (valid) or red (invalid) states with matching text. Add was-validated to the form to trigger display.",
                code: `<form class="was-validated">\n  <div class="mb-3">\n    <label class="form-label">Email</label>\n    <input type="email" class="form-control" required value="bad-email">\n    <div class="invalid-feedback">Please enter a valid email.</div>\n    <div class="valid-feedback">Looks good!</div>\n  </div>\n</form>`,
                breakdown: [
                  { line: "was-validated", explanation: "On the form element — triggers Bootstrap to show validation icons and colored borders." },
                  { line: ".invalid-feedback", explanation: "Red text shown when the input fails HTML5 validation (required, type, pattern)." },
                  { line: ".valid-feedback", explanation: "Green text shown when the input passes validation." },
                ]
              }
            ],
            tip: "Bootstrap form validation uses native HTML5 constraint validation. Add required, type='email', minlength etc. — Bootstrap just styles the result."
          },
          defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n</head>\n<body class="bg-light p-4">\n  <div class="row justify-content-center">\n    <div class="col-lg-6">\n      <div class="card shadow-sm">\n        <div class="card-header bg-primary text-white fw-semibold">Student Registration</div>\n        <div class="card-body">\n          <form class="was-validated" novalidate>\n            <div class="mb-3">\n              <label for="name" class="form-label">Full Name</label>\n              <input type="text" id="name" class="form-control" placeholder="Priya Sharma" required minlength="2">\n              <div class="invalid-feedback">Name must be at least 2 characters.</div>\n            </div>\n\n            <div class="mb-3">\n              <label for="email" class="form-label">Email</label>\n              <input type="email" id="email" class="form-control" placeholder="priya@iitm.ac.in" required>\n              <div class="invalid-feedback">Please enter a valid email.</div>\n              <div class="valid-feedback">Looks good!</div>\n            </div>\n\n            <div class="mb-3">\n              <label for="course" class="form-label">Course</label>\n              <select id="course" class="form-select" required>\n                <option value="">Select a course...</option>\n                <option>BSc Data Science</option>\n                <option>Diploma in Programming</option>\n                <option>Certificate in Data Science</option>\n              </select>\n              <div class="invalid-feedback">Please select a course.</div>\n            </div>\n\n            <div class="mb-3">\n              <label class="form-label">Python experience: <strong id="expVal">5</strong> / 10</label>\n              <input type="range" class="form-range" min="1" max="10" value="5"\n                     oninput="document.getElementById('expVal').textContent = this.value">\n            </div>\n\n            <div class="mb-3">\n              <label class="form-label">Interests</label>\n              <div class="form-check">\n                <input class="form-check-input" type="checkbox" id="ml"><label class="form-check-label" for="ml">Machine Learning</label>\n              </div>\n              <div class="form-check">\n                <input class="form-check-input" type="checkbox" id="web"><label class="form-check-label" for="web">Web Development</label>\n              </div>\n              <div class="form-check">\n                <input class="form-check-input" type="checkbox" id="db"><label class="form-check-label" for="db">Databases</label>\n              </div>\n            </div>\n\n            <div class="form-check mb-3">\n              <input type="checkbox" class="form-check-input" id="terms" required>\n              <label class="form-check-label" for="terms">I agree to the <a href="#">terms</a></label>\n              <div class="invalid-feedback">You must agree before submitting.</div>\n            </div>\n\n            <button type="submit" class="btn btn-primary w-100">Register</button>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>\n</body>\n</html>`
        },
        {
          id: "bs-modals-alerts",
          title: "Modals, Alerts & Toasts",
          language: "html",
          theory: {
            intro: "Bootstrap's interactive components — modals, alerts, and toasts — handle the most common UI patterns: confirmation dialogs, status messages, and brief notifications. All powered by data attributes, no custom JS needed.",
            sections: [
              {
                heading: "Alerts",
                content: "Alerts are inline messages for status feedback. They're dismissible with a close button.",
                code: `<div class="alert alert-success alert-dismissible fade show" role="alert">\n  <strong>Success!</strong> Your registration was saved.\n  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>\n</div>\n\n<div class="alert alert-danger" role="alert">\n  ❌ Invalid email address.\n</div>\n\n<div class="alert alert-warning" role="alert">\n  ⚠️ This assignment is due in 2 days.\n</div>`,
                breakdown: [
                  { line: "alert-success / alert-danger", explanation: "Color variant. Options: success(green), danger(red), warning(yellow), info(blue), secondary, light, dark." },
                  { line: "alert-dismissible", explanation: "Adds right padding for the close button to sit inside." },
                  { line: "fade show", explanation: "CSS animation — fade out when dismissed." },
                  { line: "data-bs-dismiss='alert'", explanation: "JavaScript hook — clicking this button hides the alert. No custom JS needed." },
                ]
              },
              {
                heading: "Modals",
                content: "A modal is a dialog overlay. The trigger button uses data-bs-toggle and data-bs-target. The modal itself sits anywhere in the body.",
                code: `<!-- Trigger button -->\n<button class="btn btn-primary"\n  data-bs-toggle="modal"\n  data-bs-target="#confirmModal">\n  Delete Account\n</button>\n\n<!-- Modal (anywhere in body) -->\n<div class="modal fade" id="confirmModal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h5 class="modal-title">Confirm Delete</h5>\n        <button class="btn-close" data-bs-dismiss="modal"></button>\n      </div>\n      <div class="modal-body">\n        Are you sure? This cannot be undone.\n      </div>\n      <div class="modal-footer">\n        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>\n        <button class="btn btn-danger">Yes, Delete</button>\n      </div>\n    </div>\n  </div>\n</div>`,
                breakdown: [
                  { line: "data-bs-toggle='modal'", explanation: "Tells Bootstrap: clicking this triggers a modal." },
                  { line: "data-bs-target='#confirmModal'", explanation: "Points to the modal element by id." },
                  { line: "modal fade", explanation: "fade adds the slide-in animation. Remove it for instant show." },
                  { line: "modal-dialog / modal-content", explanation: "Structural wrapper classes for sizing and styling." },
                ]
              }
            ],
            tip: "Modals trap keyboard focus inside while open — great for accessibility. Bootstrap handles this automatically."
          },
          defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n</head>\n<body class="p-4">\n  <h2 class="mb-4">Bootstrap Interactive Components</h2>\n\n  <!-- Alerts -->\n  <h5 class="text-muted mb-2">Alerts</h5>\n  <div class="alert alert-success alert-dismissible fade show">\n    ✅ <strong>Saved!</strong> Your progress has been recorded.\n    <button class="btn-close" data-bs-dismiss="alert"></button>\n  </div>\n  <div class="alert alert-warning alert-dismissible fade show">\n    ⚠️ Assignment due in <strong>2 days</strong>. Don't forget!\n    <button class="btn-close" data-bs-dismiss="alert"></button>\n  </div>\n  <div class="alert alert-danger">\n    ❌ Login failed — incorrect password.\n  </div>\n\n  <hr class="my-4">\n\n  <!-- Modal triggers -->\n  <h5 class="text-muted mb-3">Modals</h5>\n  <div class="d-flex gap-2">\n    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#infoModal">ℹ️ Info Modal</button>\n    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmModal">🗑️ Confirm Delete</button>\n    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#formModal">📝 Form Modal</button>\n  </div>\n\n  <!-- Info Modal -->\n  <div class="modal fade" id="infoModal">\n    <div class="modal-dialog"><div class="modal-content">\n      <div class="modal-header"><h5 class="modal-title">About This Course</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>\n      <div class="modal-body"><p>This is a full-stack web development course covering HTML, CSS, Python Flask, and SQLite.</p><p>Duration: 20 weeks | Level: Beginner to Intermediate</p></div>\n      <div class="modal-footer"><button class="btn btn-primary" data-bs-dismiss="modal">Got it!</button></div>\n    </div></div>\n  </div>\n\n  <!-- Confirm Modal -->\n  <div class="modal fade" id="confirmModal">\n    <div class="modal-dialog modal-sm"><div class="modal-content">\n      <div class="modal-header bg-danger text-white"><h5 class="modal-title">⚠️ Confirm</h5><button class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>\n      <div class="modal-body">Are you sure you want to delete your account? This cannot be undone.</div>\n      <div class="modal-footer"><button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button><button class="btn btn-danger btn-sm" data-bs-dismiss="modal">Delete</button></div>\n    </div></div>\n  </div>\n\n  <!-- Form Modal -->\n  <div class="modal fade" id="formModal">\n    <div class="modal-dialog"><div class="modal-content">\n      <div class="modal-header"><h5 class="modal-title">Quick Note</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>\n      <div class="modal-body">\n        <div class="mb-3"><label class="form-label">Note Title</label><input type="text" class="form-control" placeholder="My note..."></div>\n        <div class="mb-3"><label class="form-label">Content</label><textarea class="form-control" rows="3"></textarea></div>\n      </div>\n      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button><button class="btn btn-success" data-bs-dismiss="modal">Save Note</button></div>\n    </div></div>\n  </div>\n\n  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>\n</body>\n</html>`
        }
      ]
    }
  ],

  chartjs: [
    {
      id: "charts-advanced",
      title: "Advanced Charts",
      lessons: [
        {
          id: "chartjs-radar",
          title: "Radar & Mixed Charts",
          language: "html",
          theory: {
            intro: "Radar charts compare multiple metrics on a single chart — perfect for skill assessments. Mixed charts combine bar and line in one — great for showing actuals vs targets.",
            sections: [
              {
                heading: "Radar Chart",
                content: "Each axis of a radar chart is one metric. The shape of the polygon shows strengths and weaknesses at a glance.",
                code: `new Chart(ctx, {\n  type: 'radar',\n  data: {\n    labels: ['Python', 'SQL', 'Maths', 'English', 'Statistics'],\n    datasets: [{\n      label: 'Priya',\n      data: [90, 75, 88, 70, 82],\n      borderColor: '#3b82f6',\n      backgroundColor: 'rgba(59,130,246,0.2)',\n    }, {\n      label: 'Class Average',\n      data: [72, 65, 78, 68, 71],\n      borderColor: '#10b981',\n      backgroundColor: 'rgba(16,185,129,0.1)',\n    }]\n  },\n  options: {\n    scales: { r: { beginAtZero: true, max: 100 } }\n  }\n});`,
                breakdown: [
                  { line: "type: 'radar'", explanation: "Spider/web chart. Labels go around the perimeter, values extend from center." },
                  { line: "scales: { r: { ... } }", explanation: "r = radial axis (the scale from center out). beginAtZero starts from 0 in the middle." },
                  { line: "backgroundColor: rgba(..., 0.2)", explanation: "Semi-transparent fill inside the polygon shape." },
                ]
              },
              {
                heading: "Mixed Chart (Bar + Line)",
                content: "Set type on the chart to 'bar', then override type: 'line' on individual datasets.",
                code: `new Chart(ctx, {\n  type: 'bar',  // default type\n  data: {\n    labels: ['Q1', 'Q2', 'Q3', 'Q4'],\n    datasets: [\n      {\n        type: 'bar',  // explicitly bar\n        label: 'Revenue',\n        data: [120, 150, 180, 200],\n        backgroundColor: '#3b82f6',\n      },\n      {\n        type: 'line',  // override to line\n        label: 'Target',\n        data: [130, 145, 170, 210],\n        borderColor: '#ef4444',\n        borderDash: [5, 5],\n        tension: 0.4,\n        fill: false,\n      }\n    ]\n  }\n});`,
                breakdown: [
                  { line: "type: 'line' on dataset", explanation: "Overrides the chart-level type for this dataset only. Mix any types this way." },
                  { line: "fill: false", explanation: "Don't fill area under the line — looks cleaner in mixed charts." },
                ]
              }
            ],
            tip: "Radar charts work best with 5–8 axes. Too few looks like a triangle; too many gets hard to read."
          },
          defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n</head>\n<body class="bg-light p-4">\n  <div class="container">\n    <h2 class="mb-4">📊 Advanced Chart Types</h2>\n    <div class="row g-4">\n      <div class="col-lg-6">\n        <div class="card">\n          <div class="card-header fw-semibold">Skill Radar — Student vs Class</div>\n          <div class="card-body"><canvas id="radar"></canvas></div>\n        </div>\n      </div>\n      <div class="col-lg-6">\n        <div class="card">\n          <div class="card-header fw-semibold">Revenue vs Target (Mixed)</div>\n          <div class="card-body"><canvas id="mixed" height="200"></canvas></div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n  <script>\n    // Radar Chart\n    new Chart(document.getElementById('radar'), {\n      type: 'radar',\n      data: {\n        labels: ['Python', 'SQL', 'Maths', 'English', 'Statistics', 'ML'],\n        datasets: [\n          { label: 'Priya', data: [90, 75, 88, 70, 82, 65], borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.15)' },\n          { label: 'Class Avg', data: [72, 65, 78, 68, 71, 55], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)' }\n        ]\n      },\n      options: { scales: { r: { beginAtZero: true, max: 100 } } }\n    });\n\n    // Mixed Bar + Line\n    new Chart(document.getElementById('mixed'), {\n      type: 'bar',\n      data: {\n        labels: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],\n        datasets: [\n          { type: 'bar',  label: 'Avg Score', data: [68, 74, 79, 83], backgroundColor: '#3b82f6' },\n          { type: 'line', label: 'Target',    data: [70, 75, 80, 85], borderColor: '#ef4444', borderDash: [5,5], tension: 0.3, fill: false, pointRadius: 4 }\n        ]\n      },\n      options: { scales: { y: { beginAtZero: false, min: 60, max: 100 } } }\n    });\n  </script>\n</body>\n</html>`
        }
      ]
    }
  ],

  flask: [
    {
      id: "flask-api-db",
      title: "APIs & Database",
      lessons: [
        {
          id: "flask-json-api",
          title: "JSON API Endpoints",
          language: "python",
          theory: {
            intro: "Modern web apps don't return HTML from every route — they return JSON. Frontend code (JavaScript, React) fetches this JSON and renders it. Flask's jsonify() makes building JSON APIs trivial.",
            sections: [
              {
                heading: "jsonify() and Response Codes",
                content: "Return jsonify(data) from any route to send JSON. The second return value is the HTTP status code.",
                code: `from flask import Flask, jsonify, request\napp = Flask(__name__)\n\nstudents = [\n  {'id': 1, 'name': 'Priya', 'score': 92},\n  {'id': 2, 'name': 'Rahul', 'score': 78},\n]\n\n# GET /api/students → return all\n@app.route('/api/students')\ndef get_students():\n    return jsonify({'students': students, 'total': len(students)})\n\n# GET /api/students/1 → return one\n@app.route('/api/students/<int:sid>')\ndef get_student(sid):\n    student = next((s for s in students if s['id'] == sid), None)\n    if student is None:\n        return jsonify({'error': 'Student not found'}), 404\n    return jsonify(student), 200\n\n# POST /api/students → create new\n@app.route('/api/students', methods=['POST'])\ndef create_student():\n    data = request.get_json()  # Parse JSON body\n    if not data or 'name' not in data:\n        return jsonify({'error': 'Name required'}), 400\n    new = {'id': len(students)+1, **data}\n    students.append(new)\n    return jsonify(new), 201  # 201 = Created`,
                breakdown: [
                  { line: "jsonify({'students': ...})", explanation: "Converts dict/list to JSON string and sets Content-Type: application/json header." },
                  { line: "return jsonify(...), 404", explanation: "Second return value = HTTP status code. 200=OK, 201=Created, 400=Bad Request, 404=Not Found." },
                  { line: "request.get_json()", explanation: "Parses the request body as JSON. The client must set Content-Type: application/json." },
                  { line: "next((s for s in ...), None)", explanation: "Generator expression to find first matching item. Returns None if not found." },
                ]
              },
              {
                heading: "HTTP Methods — REST Convention",
                content: "REST APIs use HTTP methods to signal intent. Same URL, different method = different action.",
                code: `# RESTful routes for a 'students' resource:\n# GET    /api/students       → list all\n# POST   /api/students       → create new\n# GET    /api/students/<id>  → get one\n# PUT    /api/students/<id>  → replace one\n# PATCH  /api/students/<id>  → update fields\n# DELETE /api/students/<id>  → delete one\n\n@app.route('/api/students/<int:sid>', methods=['DELETE'])\ndef delete_student(sid):\n    global students\n    before = len(students)\n    students = [s for s in students if s['id'] != sid]\n    if len(students) == before:\n        return jsonify({'error': 'Not found'}), 404\n    return jsonify({'message': f'Student {sid} deleted'}), 200`,
                breakdown: [
                  { line: "GET / POST / PUT / DELETE", explanation: "HTTP verbs describe what to do. GET=read, POST=create, PUT=replace, DELETE=remove." },
                  { line: "[s for s in students if ...]", explanation: "List comprehension to filter out the deleted student — returns new list without it." },
                ]
              }
            ],
            tip: "Use Postman or Thunder Client (VS Code extension) to test your API endpoints — much easier than writing test scripts."
          },
          defaultCode: `from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n# In-memory data store (real apps use a database)\nstudents = [\n    {'id': 1, 'name': 'Priya Sharma',  'course': 'BSc DS',  'score': 92.5},\n    {'id': 2, 'name': 'Rahul Verma',   'course': 'Diploma', 'score': 78.0},\n    {'id': 3, 'name': 'Ananya Roy',    'course': 'BSc DS',  'score': 88.5},\n    {'id': 4, 'name': 'Dev Patel',     'course': 'Diploma', 'score': 65.0},\n]\n\n# Simulate API responses\ndef simulate_api():\n    print("=== Simulating Flask JSON API ===")\n    print()\n\n    # GET /api/students\n    response = {'students': students, 'total': len(students)}\n    print("GET /api/students → 200 OK")\n    print(f"  total: {response['total']} students")\n    for s in students:\n        print(f"  {s}")\n    print()\n\n    # GET /api/students/1\n    sid = 1\n    found = next((s for s in students if s['id'] == sid), None)\n    print(f"GET /api/students/{sid} → 200 OK")\n    print(f"  {found}")\n    print()\n\n    # GET /api/students/99 (not found)\n    sid = 99\n    found = next((s for s in students if s['id'] == sid), None)\n    if not found:\n        print(f"GET /api/students/{sid} → 404 Not Found")\n        print(f"  {{'error': 'Student not found'}}")\n    print()\n\n    # Simulate POST /api/students\n    new_student = {'id': 5, 'name': 'Meera Nair', 'course': 'BSc DS', 'score': 95.0}\n    students.append(new_student)\n    print("POST /api/students → 201 Created")\n    print(f"  {new_student}")\n    print(f"  New total: {len(students)} students")\n\nsimulate_api()`
        },
        {
          id: "flask-sqlite-full",
          title: "Flask + SQLite Together",
          language: "python",
          theory: {
            intro: "The real power comes when Flask and SQLite work together. Flask handles HTTP routes and request/response. SQLite stores persistent data. Together they form a complete backend.",
            sections: [
              {
                heading: "The Complete Pattern",
                content: "Flask + SQLite follows three steps per route: open DB connection, execute SQL with parameters, return response.",
                code: `import sqlite3\nfrom flask import Flask, jsonify, request\n\napp = Flask(__name__)\nDB = 'students.db'\n\ndef get_db():\n    db = sqlite3.connect(DB)\n    db.row_factory = sqlite3.Row  # rows as dicts\n    return db\n\ndef init_db():\n    db = get_db()\n    db.execute('''\n        CREATE TABLE IF NOT EXISTS students (\n            id     INTEGER PRIMARY KEY AUTOINCREMENT,\n            name   TEXT NOT NULL,\n            course TEXT NOT NULL,\n            score  REAL DEFAULT 0\n        )\n    ''')\n    db.commit()\n    db.close()\n\n@app.route('/students')\ndef list_students():\n    db = get_db()\n    rows = db.execute('SELECT * FROM students ORDER BY score DESC').fetchall()\n    db.close()\n    return jsonify([dict(r) for r in rows])\n\n@app.route('/students', methods=['POST'])\ndef add_student():\n    data = request.get_json()\n    db = get_db()\n    cur = db.execute(\n        'INSERT INTO students (name, course, score) VALUES (?, ?, ?)',\n        (data['name'], data['course'], data.get('score', 0))\n    )\n    db.commit()\n    new_id = cur.lastrowid\n    db.close()\n    return jsonify({'id': new_id, **data}), 201`,
                breakdown: [
                  { line: "db.row_factory = sqlite3.Row", explanation: "Lets you access row['name'] instead of row[0]. Converts rows to dict-like objects." },
                  { line: "CREATE TABLE IF NOT EXISTS", explanation: "Safe to call on every startup — only creates if it doesn't exist." },
                  { line: "db.commit()", explanation: "Saves the transaction. Without commit(), INSERT/UPDATE/DELETE are rolled back." },
                  { line: "[dict(r) for r in rows]", explanation: "Converts sqlite3.Row objects to plain dicts so jsonify() can serialize them." },
                  { line: "cur.lastrowid", explanation: "The auto-generated id of the row just inserted." },
                ]
              }
            ],
            tip: "In production, use Flask's g object and teardown_appcontext to manage DB connections — one connection per request, auto-closed after."
          },
          defaultCode: `import sqlite3\n\n# Simulate Flask + SQLite integration in pure Python\nDB_PATH = ':memory:'  # In-memory DB for simulation\n\ndef get_db():\n    db = sqlite3.connect(DB_PATH)\n    db.row_factory = sqlite3.Row\n    return db\n\n# === Setup ===\ndb = get_db()\ndb.execute('''\n    CREATE TABLE IF NOT EXISTS students (\n        id     INTEGER PRIMARY KEY AUTOINCREMENT,\n        name   TEXT NOT NULL,\n        course TEXT NOT NULL,\n        score  REAL DEFAULT 0\n    )\n''')\ndb.commit()\n\n# === Simulate POST /students (Insert) ===\ndef add_student(name, course, score):\n    cur = db.execute(\n        'INSERT INTO students (name, course, score) VALUES (?, ?, ?)',\n        (name, course, score)\n    )\n    db.commit()\n    return cur.lastrowid\n\n# Add students\nfor name, course, score in [\n    ('Priya Sharma',  'BSc DS',  92.5),\n    ('Rahul Verma',   'Diploma', 78.0),\n    ('Ananya Roy',    'BSc DS',  88.5),\n    ('Dev Patel',     'Diploma', 65.0),\n    ('Meera Nair',    'BSc DS',  95.0),\n]:\n    new_id = add_student(name, course, score)\n    print(f"POST /students → 201 Created | id={new_id} {name}")\n\n# === Simulate GET /students ===\nprint("\\nGET /students → 200 OK")\nrows = db.execute('SELECT * FROM students ORDER BY score DESC').fetchall()\nprint(f"{'ID':<4} {'Name':<16} {'Course':<10} {'Score'}")\nprint('-' * 42)\nfor r in rows:\n    print(f"{r['id']:<4} {r['name']:<16} {r['course']:<10} {r['score']}")\n\n# === Simulate GET /students/1 ===\nprint("\\nGET /students/1 → 200 OK")\nrow = db.execute('SELECT * FROM students WHERE id = ?', (1,)).fetchone()\nprint(dict(row))\n\n# === Simulate PATCH /students/4 ===\ndb.execute('UPDATE students SET score = ? WHERE id = ?', (82.0, 4))\ndb.commit()\nprint("\\nPATCH /students/4 score=82.0 → 200 OK")\nrow = db.execute('SELECT * FROM students WHERE id = 4').fetchone()\nprint(dict(row))\n\ndb.close()`
        }
      ]
    }
  ],

  sqlite: [
    {
      id: "sql-advanced",
      title: "Advanced SQL",
      lessons: [
        {
          id: "sql-joins",
          title: "JOINs",
          language: "sql",
          theory: {
            intro: "Real databases have multiple tables linked by IDs. JOINs let you query across tables in one statement. The most common is INNER JOIN — returns only rows where the join condition matches in both tables.",
            sections: [
              {
                heading: "Why Multiple Tables?",
                content: "Storing everything in one table leads to repeated data. Instead, split into tables and link with foreign keys.",
                code: `-- One table approach (bad — repeats course info)\n-- students: id | name | course_name | instructor | course_credits\n\n-- Better: two tables with a foreign key\nCREATE TABLE courses (\n    id         INTEGER PRIMARY KEY,\n    name       TEXT,\n    instructor TEXT,\n    credits    INTEGER\n);\n\nCREATE TABLE students (\n    id        INTEGER PRIMARY KEY AUTOINCREMENT,\n    name      TEXT,\n    course_id INTEGER REFERENCES courses(id),  -- foreign key\n    score     REAL\n);`,
                breakdown: [
                  { line: "course_id INTEGER REFERENCES courses(id)", explanation: "Foreign key — this column stores the id of a row in the courses table." },
                  { line: "REFERENCES courses(id)", explanation: "Tells SQLite: this value must exist in courses.id. Enforces referential integrity." },
                ]
              },
              {
                heading: "INNER JOIN",
                content: "Returns rows where the join condition matches in BOTH tables. Unmatched rows from either table are excluded.",
                code: `-- Get student name + their course name + instructor\nSELECT \n    s.name       AS student,\n    c.name       AS course,\n    c.instructor,\n    s.score\nFROM students s\nINNER JOIN courses c ON s.course_id = c.id\nORDER BY s.score DESC;`,
                breakdown: [
                  { line: "FROM students s", explanation: "Alias the table as 's' to avoid typing the full name repeatedly." },
                  { line: "INNER JOIN courses c", explanation: "Joins the courses table (aliased 'c'). Only returns rows with a match." },
                  { line: "ON s.course_id = c.id", explanation: "The join condition — link rows where the student's course_id equals the course's id." },
                  { line: "s.name AS student", explanation: "Disambiguate columns — both tables might have 'name'. Prefix with table alias." },
                ]
              },
              {
                heading: "LEFT JOIN",
                content: "Returns ALL rows from the left table, plus matching rows from the right. Unmatched right-table columns are NULL.",
                code: `-- Show ALL students, even if their course_id doesn't match\nSELECT s.name, c.name AS course\nFROM students s\nLEFT JOIN courses c ON s.course_id = c.id;\n-- Students with no matching course still appear, with NULL for course`,
                breakdown: [
                  { line: "LEFT JOIN", explanation: "All rows from left table (students) appear. If no match in right table (courses), NULLs fill those columns." },
                ]
              }
            ],
            tip: "When confused about JOINs, draw two overlapping circles (Venn diagram). INNER JOIN = intersection. LEFT JOIN = left circle + intersection."
          },
          defaultCode: `-- Create two linked tables\nCREATE TABLE IF NOT EXISTS courses (\n    id         INTEGER PRIMARY KEY,\n    name       TEXT NOT NULL,\n    instructor TEXT NOT NULL,\n    credits    INTEGER DEFAULT 4\n);\n\nCREATE TABLE IF NOT EXISTS students (\n    id        INTEGER PRIMARY KEY AUTOINCREMENT,\n    name      TEXT NOT NULL,\n    course_id INTEGER REFERENCES courses(id),\n    score     REAL DEFAULT 0\n);\n\n-- Insert courses\nINSERT OR IGNORE INTO courses VALUES\n  (1, 'BSc Data Science', 'Prof. Madhavan', 4),\n  (2, 'Diploma in Programming', 'Prof. Balaji', 3),\n  (3, 'Certificate DS', 'Prof. Anand', 2);\n\n-- Insert students with foreign keys\nINSERT OR IGNORE INTO students (id, name, course_id, score) VALUES\n  (1, 'Priya Sharma',  1, 92.5),\n  (2, 'Rahul Verma',   2, 78.0),\n  (3, 'Ananya Roy',    1, 88.5),\n  (4, 'Dev Patel',     2, 65.0),\n  (5, 'Meera Nair',    1, 95.0),\n  (6, 'Arjun Singh',   2, 71.5),\n  (7, 'Kavya Das',     3, 80.0);\n\n-- INNER JOIN: students with their course and instructor\nSELECT \n    s.name      AS student,\n    c.name      AS course,\n    c.instructor,\n    s.score\nFROM students s\nINNER JOIN courses c ON s.course_id = c.id\nORDER BY s.score DESC;\n\n-- Try: Course stats using JOIN + GROUP BY\n-- SELECT c.name, COUNT(s.id) as students, ROUND(AVG(s.score),1) as avg\n-- FROM courses c\n-- LEFT JOIN students s ON c.id = s.course_id\n-- GROUP BY c.id;`
        },
        {
          id: "sql-having-subqueries",
          title: "HAVING & Subqueries",
          language: "sql",
          theory: {
            intro: "WHERE filters individual rows before grouping. HAVING filters groups after aggregation. Subqueries let you nest a SELECT inside another query — powerful for complex filtering.",
            sections: [
              {
                heading: "HAVING vs WHERE",
                content: "WHERE operates on raw rows. HAVING operates on aggregated groups. You can't use COUNT() or AVG() in a WHERE clause — use HAVING instead.",
                code: `-- WRONG: can't use aggregate in WHERE\n-- SELECT course, AVG(score) FROM students WHERE AVG(score) > 80 GROUP BY course;\n\n-- CORRECT: use HAVING for aggregate conditions\nSELECT \n    course,\n    COUNT(*) AS students,\n    ROUND(AVG(score), 1) AS avg_score\nFROM students\nGROUP BY course\nHAVING AVG(score) > 75  -- only courses with avg > 75\nORDER BY avg_score DESC;`,
                breakdown: [
                  { line: "HAVING AVG(score) > 75", explanation: "Filters groups (not rows). Applied after GROUP BY. Think of it as WHERE for aggregated results." },
                  { line: "WHERE vs HAVING order", explanation: "SQL order: WHERE (filter rows) → GROUP BY (group) → HAVING (filter groups) → SELECT." },
                ]
              },
              {
                heading: "Subqueries",
                content: "A subquery is a SELECT inside parentheses used as a value or set. Very useful for 'find rows where X is above/below average'.",
                code: `-- Find students scoring above class average\nSELECT name, score\nFROM students\nWHERE score > (SELECT AVG(score) FROM students);\n\n-- Find students in courses with > 2 enrolled students\nSELECT name, course_id\nFROM students\nWHERE course_id IN (\n    SELECT course_id\n    FROM students\n    GROUP BY course_id\n    HAVING COUNT(*) > 2\n);`,
                breakdown: [
                  { line: "(SELECT AVG(score) FROM students)", explanation: "Inner query runs first, returns a single value (the average). Outer query uses it in WHERE." },
                  { line: "WHERE course_id IN (...)", explanation: "IN checks if the value exists in the subquery's result set." },
                ]
              }
            ],
            tip: "When a subquery runs once and returns one value, it's a scalar subquery. When it returns many rows for IN, it's a correlated subquery."
          },
          defaultCode: `CREATE TABLE IF NOT EXISTS students (\n    id INTEGER PRIMARY KEY, name TEXT, course TEXT, score REAL\n);\nINSERT OR IGNORE INTO students VALUES\n  (1,'Priya Sharma','BSc DS',92.5),\n  (2,'Rahul Verma','Diploma',78.0),\n  (3,'Ananya Roy','BSc DS',88.5),\n  (4,'Dev Patel','Diploma',65.0),\n  (5,'Meera Nair','BSc DS',95.0),\n  (6,'Arjun Singh','Diploma',71.5),\n  (7,'Kavya Das','BSc DS',83.0),\n  (8,'Rajan Mehta','Diploma',59.0);\n\n-- HAVING: courses where average score > 75\nSELECT course, COUNT(*) AS students, ROUND(AVG(score),1) AS avg_score\nFROM students\nGROUP BY course\nHAVING AVG(score) > 75;\n\n-- Subquery: students above overall average\n-- SELECT name, score, ROUND((SELECT AVG(score) FROM students),1) AS class_avg\n-- FROM students\n-- WHERE score > (SELECT AVG(score) FROM students)\n-- ORDER BY score DESC;`
        }
      ]
    }
  ],

  projects: [
    {
      id: "projects-advanced",
      title: "Capstone Builds",
      lessons: [
        {
          id: "project-quiz-app",
          title: "Project 3: Interactive Quiz App",
          language: "html",
          theory: {
            intro: "Build a fully interactive multiple-choice quiz app using HTML, Bootstrap, and JavaScript. No frameworks — just vanilla JS DOM manipulation. This consolidates HTML forms, Bootstrap components, and event-driven programming.",
            sections: [
              {
                heading: "Architecture",
                content: "The quiz data lives in a JavaScript array. The UI renders one question at a time. A score counter tracks correct answers. A results screen shows at the end.",
                code: `const questions = [\n  {\n    question: "What does HTML stand for?",\n    options: [\n      "HyperText Markup Language",\n      "HighText Machine Language",\n      "HyperText Markdown Language",\n      "None of the above"\n    ],\n    correct: 0  // index of correct option\n  },\n  // ... more questions\n];\n\nlet currentQ = 0;\nlet score = 0;\n\nfunction showQuestion() {\n  const q = questions[currentQ];\n  // Update DOM with q.question and q.options\n}\n\nfunction submitAnswer(selectedIndex) {\n  if (selectedIndex === questions[currentQ].correct) {\n    score++;\n  }\n  currentQ++;\n  if (currentQ < questions.length) showQuestion();\n  else showResults();\n}`,
                breakdown: [
                  { line: "correct: 0", explanation: "Index into the options array. 0 = first option is correct." },
                  { line: "currentQ", explanation: "Tracks which question we're on. Increments after each answer." },
                  { line: "score++", explanation: "Increments score only if selected index matches the correct index." },
                  { line: "showResults()", explanation: "Called when currentQ >= questions.length — all questions answered." },
                ]
              },
              {
                heading: "DOM Manipulation Key Points",
                content: "Two patterns you'll use repeatedly: update element text with textContent, and generate multiple elements with a loop.",
                code: `// Update question text\ndocument.getElementById('question').textContent = q.question;\n\n// Generate option buttons dynamically\nconst container = document.getElementById('options');\ncontainer.innerHTML = '';  // clear previous\nq.options.forEach((opt, idx) => {\n  const btn = document.createElement('button');\n  btn.className = 'btn btn-outline-primary w-100 mb-2 text-start';\n  btn.textContent = opt;\n  btn.onclick = () => submitAnswer(idx);\n  container.appendChild(btn);\n});`,
                breakdown: [
                  { line: "container.innerHTML = ''", explanation: "Clears old buttons before drawing new ones. Essential between questions." },
                  { line: "document.createElement('button')", explanation: "Creates a new DOM element. Must appendChild to make it appear." },
                  { line: "btn.onclick = () => submitAnswer(idx)", explanation: "Arrow function captures idx from forEach closure. Each button knows its own index." },
                ]
              }
            ],
            tip: "Store questions in a separate array at the top. This separates data from logic — swap questions without touching the quiz engine."
          },
          defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Quiz App</title>\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n  <style>\n    body { background: linear-gradient(135deg, #1e1b4b, #312e81); min-height: 100vh; display: flex; align-items: center; }\n    .quiz-card { max-width: 600px; width: 100%; margin: 0 auto; }\n    .option-btn { text-align: left; }\n    .option-btn.correct { background: #d1fae5 !important; border-color: #10b981 !important; color: #065f46; }\n    .option-btn.wrong   { background: #fee2e2 !important; border-color: #ef4444 !important; color: #7f1d1d; }\n  </style>\n</head>\n<body class="p-4">\n  <div class="quiz-card">\n    <div class="card shadow-lg border-0">\n      <div class="card-header bg-indigo-600 bg-primary text-white">\n        <div class="d-flex justify-content-between align-items-center">\n          <h5 class="mb-0">🧠 Web Dev Quiz</h5>\n          <span id="progress" class="badge bg-light text-dark">1 / 5</span>\n        </div>\n        <div class="progress mt-2" style="height:6px">\n          <div id="progressBar" class="progress-bar" style="width:20%"></div>\n        </div>\n      </div>\n\n      <!-- Question screen -->\n      <div id="quizScreen" class="card-body p-4">\n        <p class="text-muted small mb-1" id="qLabel">Question 1 of 5</p>\n        <h5 id="questionText" class="mb-4"></h5>\n        <div id="optionsContainer"></div>\n        <div id="feedback" class="mt-3"></div>\n        <button id="nextBtn" class="btn btn-primary mt-3 d-none" onclick="nextQuestion()">Next Question →</button>\n      </div>\n\n      <!-- Result screen -->\n      <div id="resultScreen" class="card-body p-4 text-center d-none">\n        <div class="display-1 mb-3" id="resultEmoji"></div>\n        <h3 id="resultTitle"></h3>\n        <p class="text-muted" id="resultScore"></p>\n        <button class="btn btn-primary mt-3" onclick="restartQuiz()">Try Again 🔄</button>\n      </div>\n    </div>\n  </div>\n\n  <script>\n    const questions = [\n      { q: "What does CSS stand for?", opts: ["Cascading Style Sheets","Computer Style Sheets","Creative Style System","Colorful Style Sheets"], ans: 0 },\n      { q: "Which tag is used for the largest heading?", opts: ["<h6>","<head>","<h1>","<heading>"], ans: 2 },\n      { q: "Which Bootstrap class makes an element full width?", opts: [".w-100",".full",".container-full",".w-all"], ans: 0 },\n      { q: "In Flask, which decorator maps a URL to a function?", opts: ["@route()","@app.url()","@app.route()","@flask.route()"], ans: 2 },\n      { q: "In SQL, which clause filters grouped results?", opts: ["WHERE","FILTER","HAVING","GROUP FILTER"], ans: 2 },\n    ];\n\n    let current = 0, score = 0, answered = false;\n\n    function showQuestion() {\n      answered = false;\n      const q = questions[current];\n      document.getElementById('qLabel').textContent = 'Question ' + (current+1) + ' of ' + questions.length;\n      document.getElementById('questionText').textContent = q.q;\n      document.getElementById('progress').textContent = (current+1) + ' / ' + questions.length;\n      document.getElementById('progressBar').style.width = (((current+1)/questions.length)*100) + '%';\n      document.getElementById('feedback').innerHTML = '';\n      document.getElementById('nextBtn').classList.add('d-none');\n\n      const container = document.getElementById('optionsContainer');\n      container.innerHTML = '';\n      q.opts.forEach((opt, i) => {\n        const btn = document.createElement('button');\n        btn.className = 'btn btn-outline-secondary option-btn w-100 mb-2';\n        btn.textContent = ['A','B','C','D'][i] + '. ' + opt;\n        btn.onclick = () => selectAnswer(i, btn);\n        container.appendChild(btn);\n      });\n    }\n\n    function selectAnswer(idx, btn) {\n      if (answered) return;\n      answered = true;\n      const q = questions[current];\n      const correct = idx === q.ans;\n      if (correct) { score++; btn.classList.add('correct'); }\n      else {\n        btn.classList.add('wrong');\n        document.querySelectorAll('.option-btn')[q.ans].classList.add('correct');\n      }\n      document.getElementById('feedback').innerHTML = correct\n        ? '<div class="alert alert-success py-2 mb-0">Correct!</div>'\n        : '<div class="alert alert-danger py-2 mb-0">Wrong! Correct: <strong>' + q.opts[q.ans] + '</strong></div>';\n      document.getElementById('nextBtn').classList.remove('d-none');\n    }\n\n    function nextQuestion() {\n      current++;\n      if (current < questions.length) showQuestion();\n      else showResults();\n    }\n\n    function showResults() {\n      document.getElementById('quizScreen').classList.add('d-none');\n      document.getElementById('resultScreen').classList.remove('d-none');\n      const pct = Math.round((score/questions.length)*100);\n      document.getElementById('resultEmoji').textContent = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚';\n      document.getElementById('resultTitle').textContent = pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good job!' : 'Keep practising!';\n      document.getElementById('resultScore').textContent = 'You scored ' + score + ' out of ' + questions.length + ' (' + pct + '%)';\n    }\n\n    function restartQuiz() {\n      current = 0; score = 0;\n      document.getElementById('quizScreen').classList.remove('d-none');\n      document.getElementById('resultScreen').classList.add('d-none');\n      showQuestion();\n    }\n\n    showQuestion();\n  </script>\n</body>\n</html>`
        }
      ]
    }
  ]
};
