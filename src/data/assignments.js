export const assignments = {

  /* ── HTML5 ── */

  "html-doc-structure": {
    title: "Build Your First Page",
    task: "Create a complete HTML document for a personal 'About Me' page. Include a proper boilerplate, a meaningful title in the tab, and at least two paragraphs of content inside the body.",
    requirements: [
      "Valid <!DOCTYPE html> declaration",
      "html tag with lang attribute set",
      "A <title> tag with your name",
      "At least one <h1> heading",
      "At least two <p> paragraphs",
      "Custom <style> block that sets a background color and font",
    ],
    expectedOutput: "A styled page visible in the preview with your name as the heading and two paragraphs below it. The browser tab label should show your name.",
    hints: [
      "Start with the boilerplate from the lesson, then add your content inside <body>.",
      "Add a <style> tag inside <head> with: body { background: #f0f4f8; font-family: system-ui; padding: 2rem; }",
      "Your <title> tag text becomes the browser tab label — set it to your name.",
    ],
    starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title><!-- Your name here --></title>\n  <style>\n    /* Add your styles here */\n  </style>\n</head>\n<body>\n  <!-- Add your content here -->\n\n</body>\n</html>`,
  },

  "html-text": {
    title: "Format a Study Notes Page",
    task: "Create a study notes page for any subject you're currently learning. Use headings to structure topics, paragraphs for explanations, and inline elements to highlight key terms.",
    requirements: [
      "One <h1> for the subject name",
      "At least two <h2> for sub-topics",
      "Use <strong> to highlight at least 3 key terms",
      "Use <em> for at least one important phrase",
      "Use <code> for at least one formula or code snippet",
      "Use <mark> to highlight one 'key takeaway'",
    ],
    expectedOutput: "A readable notes page with clear visual hierarchy — the h1 stands out, h2s divide sections, and key terms are bold.",
    hints: [
      "<strong> wraps around words you'd highlight with a marker. <em> is for emphasis or titles.",
      "For a formula like E=mc², wrap it in <code>E=mc²</code> to get monospace styling.",
      "<mark> creates a yellow highlight background — great for 'key takeaway' sentences.",
    ],
    starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Study Notes</title>\n  <style>\n    body { font-family: system-ui; padding: 2rem; max-width: 700px; line-height: 1.7; }\n    code { background: #f1f5f9; padding: 2px 6px; border-radius: 3px; font-size: 0.9em; }\n    mark { padding: 0 3px; border-radius: 2px; }\n  </style>\n</head>\n<body>\n  <h1><!-- Subject Name --></h1>\n\n  <h2>Topic 1</h2>\n  <p><!-- Your notes --></p>\n\n  <h2>Topic 2</h2>\n  <p><!-- Your notes --></p>\n\n</body>\n</html>`,
  },

  "html-links-images": {
    title: "Create a Photo Gallery with Links",
    task: "Build a simple photo gallery page with 3 images from picsum.photos, each wrapped in a link that opens the full image in a new tab. Add a heading and a navigation link back to the top.",
    requirements: [
      "A <h1> at the top with id='top'",
      "3 <img> tags with picsum.photos URLs, meaningful alt text, and width/height set",
      "Each image wrapped in an <a> tag that opens in a new tab",
      "A 'Back to top' anchor link at the bottom",
      "Some basic CSS spacing between images",
    ],
    expectedOutput: "Three images displayed on the page, each clickable. Clicking opens the image URL in a new tab. A 'Back to top' link at the bottom jumps back up.",
    hints: [
      "Wrap each image: <a href='https://picsum.photos/800/600?random=1' target='_blank'><img src='https://picsum.photos/300/200?random=1' ...></a>",
      "For the back-to-top link: <a href='#top'>Back to top</a> — it matches id='top' on your h1.",
      "Use margin-bottom: 1rem on img to space them out.",
    ],
    starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Photo Gallery</title>\n  <style>\n    body { font-family: system-ui; padding: 2rem; }\n    img { display: block; border-radius: 8px; margin-bottom: 1.5rem; }\n  </style>\n</head>\n<body>\n  <h1 id="top">My Photo Gallery</h1>\n\n  <!-- Image 1 -->\n\n  <!-- Image 2 -->\n\n  <!-- Image 3 -->\n\n  <a href="#top">↑ Back to top</a>\n</body>\n</html>`,
  },

  "html-forms": {
    title: "Build a Course Registration Form",
    task: "Create a registration form for an online course platform. Collect the student's name, email, preferred course (dropdown), experience level (radio buttons), and a short bio.",
    requirements: [
      "Text input for full name with label",
      "Email input for email address with label",
      "A <select> dropdown with at least 3 course options",
      "Radio buttons for experience: Beginner, Intermediate, Advanced",
      "A <textarea> for bio (min 3 rows)",
      "Submit button with text 'Register Now'",
      "All inputs have matching <label for='...'> tags",
    ],
    expectedOutput: "A complete form with all fields visible. Each label is clickable and focuses its input. Clicking Register Now triggers browser validation on empty required fields.",
    hints: [
      "Radio buttons need the same name='experience' attribute to be mutually exclusive.",
      "For the dropdown: <select name='course'><option value='ds'>Data Science</option>...</select>",
      "Link labels to inputs with: <label for='name'>Name</label> <input id='name' ...>",
    ],
    starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Course Registration</title>\n  <style>\n    body { font-family: system-ui; padding: 2rem; max-width: 480px; }\n    label { display: block; font-weight: 600; margin-top: 1.2rem; margin-bottom: 4px; }\n    input[type=text], input[type=email], select, textarea {\n      width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;\n    }\n    .radio-group { display: flex; gap: 1.5rem; margin-top: 6px; }\n    .radio-group label { font-weight: normal; margin: 0; display: flex; align-items: center; gap: 4px; }\n    button { margin-top: 1.5rem; width: 100%; padding: 10px; background: #4f46e5; color: white; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Course Registration</h1>\n  <form>\n    <!-- Add your form fields here -->\n\n    <button type="submit">Register Now</button>\n  </form>\n</body>\n</html>`,
  },

  "html-tables": {
    title: "Build a Class Timetable",
    task: "Create a weekly class timetable showing 5 days and 4 time slots. Use <thead>, <tbody>, and proper <th> elements. Apply alternating row colors with CSS.",
    requirements: [
      "A <table> with <thead> and <tbody>",
      "First row uses <th> for Time and day names (Mon–Fri)",
      "At least 4 rows of class data in <tbody>",
      "Use colspan for a lunch break row spanning all 5 days",
      "Alternating row background using CSS :nth-child",
      "border-collapse: collapse on the table",
    ],
    expectedOutput: "A clean timetable grid. The header row is distinct. A 'Lunch Break' row spans all 5 day columns. Every other row has a light background.",
    hints: [
      "For the lunch row: <td colspan='5'>Lunch Break</td> — you only need one <td> after the time <td>.",
      "Alternating rows: tbody tr:nth-child(even) { background: #f9fafb; }",
      "Make the header stand out: thead th { background: #1e40af; color: white; }",
    ],
    starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Timetable</title>\n  <style>\n    body { font-family: system-ui; padding: 2rem; }\n    table { border-collapse: collapse; width: 100%; }\n    th, td { border: 1px solid #e5e7eb; padding: 10px 14px; text-align: center; }\n    thead th { background: #1e40af; color: white; }\n    tbody tr:nth-child(even) { background: #f9fafb; }\n    .lunch { background: #fef9c3 !important; font-style: italic; color: #78350f; }\n  </style>\n</head>\n<body>\n  <h1>Weekly Timetable</h1>\n  <table>\n    <thead>\n      <tr>\n        <th>Time</th>\n        <th>Monday</th>\n        <th>Tuesday</th>\n        <th>Wednesday</th>\n        <th>Thursday</th>\n        <th>Friday</th>\n      </tr>\n    </thead>\n    <tbody>\n      <!-- Add rows here -->\n\n    </tbody>\n  </table>\n</body>\n</html>`,
  },

  "html-semantic-elements": {
    title: "Semantic Blog Layout",
    task: "Build a blog page layout using only semantic HTML elements — no meaningless divs for structure. Include a header with nav, a main with an article and aside, and a footer.",
    requirements: [
      "Use <header> containing a <nav> with 3 links",
      "Use <main> wrapping an <article> and an <aside>",
      "<article> has <h1>, at least 2 <p> tags, and a <time> element",
      "<aside> has a 'Related Posts' section with a <ul>",
      "Use <footer> with copyright text",
      "No <div> used for structural layout — only semantic tags",
    ],
    expectedOutput: "A page where the article and sidebar sit side by side (use CSS flexbox). The structure is readable with zero JS — just semantic HTML and CSS.",
    hints: [
      "Use display: flex on <main> to put <article> and <aside> side by side.",
      "<time datetime='2024-01-15'>January 15, 2024</time> — the datetime attr is for machines, the inner text is for humans.",
      "Avoid div#header — use <header> directly. Same for nav, main, footer.",
    ],
    starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Blog</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body { font-family: system-ui; color: #1f2937; }\n    header { background: #0f172a; color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }\n    nav a { color: #93c5fd; margin-left: 1.5rem; text-decoration: none; }\n    main { display: flex; gap: 2rem; padding: 2rem; max-width: 960px; margin: 0 auto; }\n    article { flex: 1; }\n    aside { width: 240px; background: #f8fafc; padding: 1rem; border-radius: 8px; }\n    footer { background: #0f172a; color: #64748b; text-align: center; padding: 1rem; }\n    h1, h2 { margin-bottom: 0.75rem; }\n    p { line-height: 1.7; color: #4b5563; margin-bottom: 1rem; }\n  </style>\n</head>\n<body>\n  <!-- Replace these comments with real semantic elements -->\n\n</body>\n</html>`,
  },

  /* ── Bootstrap ── */

  "bs-container-grid": {
    title: "Responsive Feature Grid",
    task: "Build a 'Features' section for a SaaS landing page using Bootstrap's grid. Show 6 feature cards — 1 per row on mobile, 2 per row on tablet, 3 per row on desktop.",
    requirements: [
      "Use .container to center content",
      "One .row with 6 .col children",
      "Correct breakpoint classes for 1→2→3 column layout",
      "Each card has an emoji icon, a title, and a short description",
      "Use .g-3 or .g-4 for gutters between cards",
      "Cards have a light background and rounded corners",
    ],
    expectedOutput: "6 feature cards that reflow: stacked on narrow screens, 2-col on tablet, 3-col on desktop.",
    hints: [
      "For 1→2→3: class='col-12 col-md-6 col-lg-4' on each column.",
      "Add class='g-3' to the .row element for card spacing.",
      "Simple card style: <div style='background:#f8fafc; border-radius:8px; padding:1.5rem;'>",
    ],
    starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n</head>\n<body class="bg-light py-5">\n  <div class="container">\n    <h2 class="text-center fw-bold mb-2">Why Choose Us</h2>\n    <p class="text-center text-muted mb-5">Everything you need to build great products</p>\n    <div class="row g-4">\n      <!-- 6 feature cards here -->\n      <!-- Each needs: col-12 col-md-6 col-lg-4 -->\n\n    </div>\n  </div>\n</body>\n</html>`,
  },

  "bs-cards-buttons": {
    title: "Product Listing Page",
    task: "Build a 3-column product listing using Bootstrap cards. Each card should have a product image, name, price (badge), description, and two buttons: 'Add to Cart' (primary) and 'Wishlist' (outline).",
    requirements: [
      "3 cards in a responsive row (col-md-4)",
      "Each card has card-img-top, card-body, card-footer",
      "Price shown as a .badge inside card-body",
      "Two buttons per card: btn-primary and btn-outline-secondary",
      "Cards have equal height using h-100",
      "Use .g-3 for gaps",
    ],
    expectedOutput: "Three product cards of equal height with images on top. Price badge visible. Two buttons aligned at the bottom of each card.",
    hints: [
      "Equal height: add class='h-100' to the .card div, and use d-flex flex-column on .card-body.",
      "Put buttons in .card-footer so they align at the bottom of all cards.",
      "Price badge: <span class='badge bg-success fs-6'>₹999</span>",
    ],
    starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n</head>\n<body class="bg-light p-4">\n  <h2 class="mb-4 fw-bold">Featured Products</h2>\n  <div class="row g-3">\n\n    <!-- Product 1 -->\n    <div class="col-md-4">\n      <div class="card h-100">\n        <!-- Add image, body with price badge, footer with buttons -->\n      </div>\n    </div>\n\n    <!-- Product 2 -->\n    <div class="col-md-4">\n      <div class="card h-100">\n      </div>\n    </div>\n\n    <!-- Product 3 -->\n    <div class="col-md-4">\n      <div class="card h-100">\n      </div>\n    </div>\n\n  </div>\n</body>\n</html>`,
  },

  "bs-navbar": {
    title: "Landing Page Hero",
    task: "Build a complete landing page top section: a dark sticky navbar (collapsible on mobile) and a hero section below it with a gradient background, headline, subtext, two CTA buttons, and a stat row.",
    requirements: [
      "Sticky navbar using navbar-dark bg-dark fixed-top",
      "Navbar collapses on mobile with hamburger button",
      "Hero section with gradient background (CSS linear-gradient)",
      "Hero has a large heading, subheading, and two buttons",
      "Stat row below the CTA: 3 stats (e.g., '10k+ Students', '50+ Courses', '95% Pass Rate')",
      "Body has padding-top to avoid content hiding behind fixed navbar",
    ],
    expectedOutput: "A dark navbar fixed to the top. Below it, a full-width colored hero. Stat row with 3 numbers. On narrow screens, the nav collapses to a hamburger.",
    hints: [
      "Fixed navbar hides content: add style='padding-top: 70px' to body to compensate.",
      "Gradient hero: style='background: linear-gradient(135deg, #1e3a5f, #7c3aed); min-height: 80vh;'",
      "Stat row with Bootstrap: <div class='row text-center mt-5'> with 3 col-4 items.",
    ],
    starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n  <style>\n    body { padding-top: 70px; }\n    #hero { /* Add your gradient here */ min-height: 80vh; display: flex; align-items: center; color: white; }\n  </style>\n</head>\n<body>\n  <!-- Navbar here -->\n\n  <!-- Hero section here -->\n  <section id="hero">\n    <div class="container">\n      <!-- Headline, subtext, buttons, stats -->\n    </div>\n  </section>\n\n  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>\n</body>\n</html>`,
  },

  /* ── Chart.js ── */

  "chartjs-bar": {
    title: "Subject Performance Chart",
    task: "Create a bar chart showing your own (or fictional) exam scores across 6 subjects. Add a second dataset showing the class average. Use custom colors and a chart title.",
    requirements: [
      "Bar chart with 6 subjects on x-axis",
      "Two datasets: 'My Score' and 'Class Average'",
      "Different colors for each dataset",
      "Chart title enabled and shown",
      "Y-axis begins at zero and max is 100",
      "Legend at the top",
    ],
    expectedOutput: "A grouped bar chart with two bars per subject — one for your score, one for class average. Title visible above. Legend shows which color is which.",
    hints: [
      "Two datasets: datasets: [{ label: 'My Score', data: [...] }, { label: 'Class Avg', data: [...] }]",
      "Set y-axis max: scales: { y: { beginAtZero: true, max: 100 } }",
      "For grouped bars, Chart.js handles it automatically when you have multiple datasets.",
    ],
    starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Scores</title>\n  <style> body { padding: 2rem; background: #f8fafc; } .chart-box { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 8px rgba(0,0,0,0.1); } </style>\n</head>\n<body>\n  <div class="chart-box">\n    <canvas id="myChart" height="80"></canvas>\n  </div>\n  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n  <script>\n    new Chart(document.getElementById('myChart'), {\n      type: 'bar',\n      data: {\n        labels: ['Maths', 'Physics', 'Chemistry', 'English', 'CS', 'Stats'],\n        datasets: [\n          {\n            label: 'My Score',\n            data: [/* add your scores */],\n            backgroundColor: '#3b82f6',\n          },\n          {\n            label: 'Class Average',\n            data: [/* add class averages */],\n            backgroundColor: '#10b981',\n          }\n        ]\n      },\n      options: {\n        // Add title, legend, and scale config\n      }\n    });\n  </script>\n</body>\n</html>`,
  },

  "chartjs-line": {
    title: "Study Hours Tracker",
    task: "Build a line chart that tracks study hours for 3 different subjects across 8 weeks. Add a dashed horizontal 'Goal' line at 10 hours. Make the lines smooth curves with area fill.",
    requirements: [
      "Line chart with 8 weeks on x-axis",
      "3 subject datasets with smooth curves (tension: 0.4)",
      "Each dataset has a different color and area fill",
      "A 4th 'Goal' dataset as a dashed line at y=10, no dots",
      "Y-axis labeled 'Hours / week'",
      "Legend showing all 4 datasets",
    ],
    expectedOutput: "Smooth, filled area chart with 3 subject lines weaving across 8 weeks. A dashed red goal line at 10 hours. Axis is labeled.",
    hints: [
      "Dashed goal: borderDash: [6, 4], pointRadius: 0, data: [10,10,10,10,10,10,10,10]",
      "Y-axis label: scales: { y: { title: { display: true, text: 'Hours / week' } } }",
      "Fill area: fill: true, backgroundColor: 'rgba(59,130,246,0.1)'",
    ],
    starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Study Tracker</title>\n  <style> body { padding: 2rem; background: #f8fafc; } .box { background: white; border-radius: 12px; padding: 1.5rem; } </style>\n</head>\n<body>\n  <div class="box">\n    <canvas id="chart" height="70"></canvas>\n  </div>\n  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n  <script>\n    new Chart(document.getElementById('chart'), {\n      type: 'line',\n      data: {\n        labels: ['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7','Wk8'],\n        datasets: [\n          // Subject 1\n          // Subject 2\n          // Subject 3\n          // Goal line (dashed)\n        ]\n      },\n      options: {}\n    });\n  </script>\n</body>\n</html>`,
  },

  /* ── Flask ── */

  "flask-first-route": {
    title: "Flask Route Explorer",
    task: "Simulate a Flask app with 4 routes: a homepage, a /greet/<name> route, a /square/<int:n> route that returns n², and a /bmi/<float:weight>/<float:height> route that calculates BMI.",
    requirements: [
      "Define all 4 route functions with correct decorators",
      "/ returns a welcome message listing the available routes",
      "/greet/<name> returns a personalized greeting",
      "/square/<int:n> returns the square of n",
      "/bmi/<float:w>/<float:h> calculates BMI = w / h²",
      "Print simulated output for each route at the bottom",
    ],
    expectedOutput: "Terminal shows 4 route results: homepage listing, greeting with a name, square of a number, and BMI calculation with a category label.",
    hints: [
      "BMI formula: bmi = weight / (height ** 2). Category: <18.5 Underweight, 18.5-25 Normal, >25 Overweight.",
      "For float route: @app.route('/bmi/<float:w>/<float:h>')",
      "Simulate by calling the functions directly at the bottom: print(greet('Priya'))",
    ],
    starterCode: `from flask import Flask\n\napp = Flask(__name__)\n\n# Route 1: Homepage\n@app.route('/')\ndef home():\n    pass  # Return a string listing the 4 routes\n\n# Route 2: Greeting\n@app.route('/greet/<name>')\ndef greet(name):\n    pass\n\n# Route 3: Square a number\n@app.route('/square/<int:n>')\ndef square(n):\n    pass\n\n# Route 4: BMI calculator\n@app.route('/bmi/<float:w>/<float:h>')\ndef bmi(w, h):\n    pass\n\n# Simulate the routes\nprint("=== Route Simulation ===")\nprint("GET /          =>", home())\nprint("GET /greet/Priya =>", greet("Priya"))\nprint("GET /square/7   =>", square(7))\nprint("GET /bmi/70/1.75 =>", bmi(70, 1.75))`,
  },

  "flask-templates": {
    title: "Grade Report Generator",
    task: "Write a Python function that simulates render_template() — it takes a student name and a dict of subject scores and returns a formatted report card string using if/elif/for logic.",
    requirements: [
      "Function accepts name (str) and scores (dict)",
      "Loop over all subjects and scores",
      "Assign grade: A+ ≥90, A ≥80, B+ ≥70, B ≥60, else F",
      "Calculate and display average score",
      "Add a pass/fail status (pass if avg ≥ 50)",
      "Test with 3 different students",
    ],
    expectedOutput: "Three formatted report cards in the terminal, each showing subject-by-subject grades, average, and overall pass/fail status.",
    hints: [
      "Grade logic: if score >= 90: grade = 'A+' elif score >= 80: grade = 'A' — continue the chain.",
      "Average: avg = sum(scores.values()) / len(scores)",
      "You can use f-strings to format: f'  {subject:12s}: {score:3d}  [{grade}]'",
    ],
    starterCode: `def generate_report(name, scores):\n    """Simulate a Jinja2 template rendering a report card"""\n    print(f"\\n{'='*45}")\n    print(f"  REPORT CARD: {name}")\n    print(f"{'='*45}")\n\n    # Loop over scores and assign grades\n    for subject, score in scores.items():\n        grade = None  # Assign grade based on score\n        # TODO: if/elif/else grade logic\n        print(f"  {subject:12s}: {score:3d}  [{grade}]")\n\n    # Calculate average\n    avg = None  # TODO\n    status = None  # TODO: Pass or Fail\n    print(f"  {'Average':12s}: {avg:.1f}  [{status}]")\n\n# Test data\nstudents = [\n    ("Priya",  {"Math": 95, "Python": 88, "Stats": 72, "English": 91}),\n    ("Rahul",  {"Math": 55, "Python": 62, "Stats": 48, "English": 71}),\n    ("Ananya", {"Math": 82, "Python": 79, "Stats": 85, "English": 68}),\n]\n\nfor name, scores in students:\n    generate_report(name, scores)`,
  },

  "flask-forms": {
    title: "Login Validator",
    task: "Simulate a Flask login endpoint. Write a function that takes username and password, validates them against a hardcoded users dict, and returns the correct response — 200 OK with user info, or 401 Unauthorized with an error message.",
    requirements: [
      "A users dict with at least 3 username/password pairs",
      "validate_login(username, password) function",
      "Returns {'status': 200, 'user': {...}} on success",
      "Returns {'status': 401, 'error': 'Invalid credentials'} on failure",
      "Test with: correct credentials, wrong password, unknown user",
      "Print results clearly showing status code and message",
    ],
    expectedOutput: "Three test results: first shows 200 with user info, second and third show 401 with the error message.",
    hints: [
      "Store users as: users = {'priya': {'password': 'abc123', 'role': 'student'}}",
      "Check: if username in users and users[username]['password'] == password:",
      "In real Flask: return jsonify({'user': ...}), 200 — the number is the HTTP status code.",
    ],
    starterCode: `# Simulating Flask's POST /login endpoint\n\n# User database (in real Flask, this would be SQLite)\nusers = {\n    # Add at least 3 users here\n    # 'username': {'password': '...', 'role': '...', 'name': '...'}\n}\n\ndef validate_login(username, password):\n    """Mimics Flask route: POST /login with request.form"""\n    # TODO: check username exists and password matches\n    pass\n\n# Test cases\ntest_cases = [\n    ("priya", "correct_password"),   # Should succeed\n    ("priya", "wrong_password"),      # Should fail\n    ("nobody", "anypassword"),        # Should fail\n]\n\nprint("=== Login Endpoint Tests ===")\nfor username, password in test_cases:\n    result = validate_login(username, password)\n    status = result.get('status')\n    if status == 200:\n        print(f"  POST /login [{username}] => 200 OK | Welcome, {result['user']['name']}")\n    else:\n        print(f"  POST /login [{username}] => 401 | {result['error']}")`,
  },

  /* ── SQLite ── */

  "sql-create-insert": {
    title: "Design a Library Database",
    task: "Create a 'books' table for a library system and insert at least 6 books. Then query to view them all sorted by year.",
    requirements: [
      "CREATE TABLE books with: id (PK), title, author, genre, year (INTEGER), available (INTEGER 0/1)",
      "INSERT at least 6 real or fictional books",
      "At least 2 different genres",
      "Mix of available (1) and borrowed (0) books",
      "SELECT all books ordered by year DESC",
      "Use IF NOT EXISTS in CREATE",
    ],
    expectedOutput: "A table showing 6+ books sorted newest first, with title, author, genre, year, and available columns.",
    hints: [
      "available is a boolean stored as 0 or 1 in SQLite: available INTEGER DEFAULT 1",
      "After INSERT: SELECT * FROM books ORDER BY year DESC;",
      "AUTOINCREMENT on INTEGER PRIMARY KEY means you don't need to supply id in INSERT.",
    ],
    starterCode: `-- Create the books table\nCREATE TABLE IF NOT EXISTS books (\n    id        INTEGER PRIMARY KEY AUTOINCREMENT,\n    title     TEXT NOT NULL,\n    author    TEXT NOT NULL,\n    genre     TEXT,\n    year      INTEGER,\n    available INTEGER DEFAULT 1  -- 1=available, 0=borrowed\n);\n\n-- Insert at least 6 books\nINSERT INTO books (title, author, genre, year, available) VALUES\n  -- Add your books here\n  ;\n\n-- View all books sorted by year (newest first)\nSELECT * FROM books ORDER BY year DESC;`,
  },

  "sql-select": {
    title: "Query the Student Database",
    task: "Given a pre-filled students table, write 4 separate SELECT queries: all BSc DS students, top 3 scorers, course-wise stats, and students whose name contains 'a'.",
    requirements: [
      "Query 1: SELECT all BSc DS students sorted by score DESC",
      "Query 2: Top 3 scorers across all courses",
      "Query 3: Per-course stats: course, count, avg score, max score",
      "Query 4: Students whose name contains the letter 'a' (case-insensitive)",
      "Use aliases (AS) for computed columns",
      "Run all 4 queries separated by comments",
    ],
    expectedOutput: "Four result tables: BSc DS students, top 3, course stats with averages, and students with 'a' in their name.",
    hints: [
      "LIKE with wildcard: WHERE name LIKE '%a%' (% matches any characters).",
      "Course stats: SELECT course, COUNT(*), ROUND(AVG(score),1) AS avg FROM students GROUP BY course",
      "Top 3: ORDER BY score DESC LIMIT 3",
    ],
    starterCode: `-- Setup data (run this first)\nCREATE TABLE IF NOT EXISTS students (\n    id INTEGER PRIMARY KEY, name TEXT, course TEXT, score REAL\n);\nINSERT OR IGNORE INTO students VALUES\n  (1,'Priya Sharma','BSc DS',92.5),\n  (2,'Rahul Verma','Diploma',78.0),\n  (3,'Ananya Roy','BSc DS',88.5),\n  (4,'Dev Patel','Diploma',65.0),\n  (5,'Meera Nair','BSc DS',95.0),\n  (6,'Arjun Singh','Diploma',71.5),\n  (7,'Kavya Das','BSc DS',83.0),\n  (8,'Rajan Mehta','Diploma',59.5);\n\n-- Query 1: BSc DS students by score\n\n\n-- Query 2: Top 3 scorers\n\n\n-- Query 3: Course stats\n\n\n-- Query 4: Names containing 'a'\n`,
  },

  "sql-update-delete": {
    title: "Database Maintenance",
    task: "Practice safe UPDATE and DELETE operations. Update scores for 2 students, promote a Diploma student to BSc DS, delete students below a score threshold, and verify each change with a SELECT.",
    requirements: [
      "UPDATE score for student id=2 to 85.0, verify with SELECT",
      "UPDATE course for id=4 to 'BSc DS', verify",
      "DELETE all students with score < 60",
      "Final SELECT showing all remaining students",
      "All queries have WHERE clauses — no bare UPDATE/DELETE",
    ],
    expectedOutput: "Four result sets: after first update, after second update, after delete, final table. Showing only the affected rows changing.",
    hints: [
      "To verify an update: SELECT name, score FROM students WHERE id = 2; — run this after UPDATE.",
      "Safe delete: DELETE FROM students WHERE score < 60; — always confirm the WHERE first with a SELECT.",
      "Check count before/after delete: SELECT COUNT(*) FROM students;",
    ],
    starterCode: `-- Setup\nCREATE TABLE IF NOT EXISTS students (\n    id INTEGER PRIMARY KEY, name TEXT, course TEXT, score REAL\n);\nINSERT OR IGNORE INTO students VALUES\n  (1,'Priya Sharma','BSc DS',92.5),\n  (2,'Rahul Verma','Diploma',78.0),\n  (3,'Ananya Roy','BSc DS',88.5),\n  (4,'Dev Patel','Diploma',65.0),\n  (5,'Meera Nair','BSc DS',95.0),\n  (6,'Arjun Singh','Diploma',55.0);\n\n-- Step 1: Update Rahul's score to 85.0\n\n\n-- Step 2: Promote Dev to BSc DS\n\n\n-- Step 3: Delete students with score < 60\n\n\n-- Step 4: Final view\nSELECT * FROM students ORDER BY score DESC;`,
  },

  /* ── Projects ── */

  "project-portfolio": {
    title: "Personalise Your Portfolio",
    task: "Customise the portfolio template with your real (or fictional) information. Change the name, bio, skills with real percentages, and replace the 3 project cards with your own projects. Add one new section of your choice.",
    requirements: [
      "Change all placeholder names/text to your own info",
      "Update skill progress bars with your actual skill levels",
      "Replace project cards with real or detailed fictional projects",
      "Add a new section (e.g., Education, Certifications, Blog)",
      "Smooth scroll working on all nav links",
      "Mobile-responsive (test by making the preview narrow)",
    ],
    expectedOutput: "A personalised portfolio that looks complete and professional, with your name, real-looking projects, and at least 5 navigable sections.",
    hints: [
      "Add an Education section with a Bootstrap table showing your degree, institution, and year.",
      "For the new section, copy the structure of an existing section and change the content.",
      "Test mobile by making the preview panel narrow — the navbar should collapse.",
    ],
    starterCode: null,
  },

  "project-dashboard": {
    title: "Extend the Dashboard",
    task: "Add interactivity to the dashboard: make the table rows filterable by typing in the search box, and add a click handler on chart bars that shows an alert with the subject name and score.",
    requirements: [
      "Search input filters table rows in real-time as you type",
      "Filtering is case-insensitive",
      "Clicking a bar in the bar chart shows an alert with the subject and score",
      "Table shows 'No results found' when filter matches nothing",
    ],
    expectedOutput: "Typing in the search box hides non-matching rows. Clicking a bar shows an alert like: 'Maths: Class Avg = 72, Top = 98'.",
    hints: [
      "Filter: document.querySelector('input').addEventListener('input', e => { const q = e.target.value.toLowerCase(); document.querySelectorAll('tbody tr').forEach(r => r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none'); });",
      "Chart click: options.onClick = (event, elements) => { if (elements.length > 0) { const i = elements[0].index; alert(labels[i] + ': ' + data[i]); } }",
      "No results row: add a hidden <tr id='no-results'> and show it when all rows are hidden.",
    ],
    starterCode: null,
  },
};
