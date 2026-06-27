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

  /* ── CSS Styling ── */

  "css-box-model": {
    title: "Card Layout with Box Model",
    task: "Build a 3-card product grid using only the CSS box model — no frameworks. Each card should have an image placeholder, title, description, price, and a buy button. Spacing must use padding/margin correctly.",
    requirements: [
      "3 cards displayed side-by-side using display: flex",
      "Each card has padding inside (not margin) for inner spacing",
      "Cards are separated by margin or flex gap",
      "box-sizing: border-box applied globally",
      "Each card has a border and border-radius",
      "Button uses display: inline-block with padding (not width hacks)",
    ],
    expectedOutput: "Three product cards side by side, each with consistent padding, a visible border, and a clickable-looking button. Cards should look evenly spaced.",
    hints: [
      "Start with * { box-sizing: border-box; margin: 0; padding: 0; } then add .container { display: flex; gap: 1rem; }",
      "For the image placeholder: div with background: #e2e8f0; height: 160px; border-radius: 8px 8px 0 0;",
      "Button: display: inline-block; padding: 8px 20px; background: #3b82f6; color: white; border-radius: 6px; cursor: pointer;",
    ],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Product Cards</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui; background: #f1f5f9; padding: 2rem; }

    .grid {
      display: flex;
      gap: 1.5rem;
    }

    .card {
      /* Add border, border-radius, background, padding here */
      flex: 1;
    }

    .card-img {
      /* Image placeholder */
      height: 160px;
      background: #e2e8f0;
    }

    .card-body {
      /* Inner spacing */
    }

    .card h3 { /* Title */ }
    .card p   { /* Description */ }
    .card .price { /* Price */ }
    .btn { /* Button */ }
  </style>
</head>
<body>
  <div class="grid">
    <div class="card">
      <div class="card-img"></div>
      <div class="card-body">
        <h3>Product One</h3>
        <p>A short description of this product.</p>
        <p class="price">$29.99</p>
        <a href="#" class="btn">Buy Now</a>
      </div>
    </div>
    <!-- Copy card 2 and 3 here -->
  </div>
</body>
</html>`,
  },

  "css-colors-typography": {
    title: "Design a Landing Hero Section",
    task: "Create a landing page hero section with a headline, sub-headline, two buttons (primary and secondary), and a CSS custom-property color system. Demonstrate at least 3 different color formats in your CSS.",
    requirements: [
      "Define at least 4 CSS custom properties (--primary, --text, --muted, --bg) on :root",
      "Use var() for all colors — no hard-coded hex inside selectors",
      "Use 3 different color formats (hex, rgba, hsl) at least once each",
      "Primary button with solid background; secondary button with border only",
      "Heading uses a Google Font loaded via <link>",
      "line-height set on body text for readability",
    ],
    expectedOutput: "A polished hero section with a large heading in a Google Font, muted subtitle, and two clearly distinct buttons. All colors driven by CSS variables.",
    hints: [
      "Google Font link: <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap\" rel=\"stylesheet\">",
      "Secondary button: background: transparent; border: 2px solid var(--primary); color: var(--primary);",
      "Demonstrate rgba: background: rgba(79, 70, 229, 0.1); for a soft tinted background behind a section.",
    ],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Landing Page</title>
  <!-- Add Google Fonts link here -->
  <style>
    :root {
      --primary: /* your primary color */;
      --text:    /* dark text */;
      --muted:   /* lighter text */;
      --bg:      /* page background */;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: /* your font */, system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
    }

    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
    }

    h1 { /* Large heading */ }
    .subtitle { /* Muted subtitle */ }
    .btn-primary { /* Solid button */ }
    .btn-secondary { /* Outline button */ }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Your Headline Here</h1>
    <p class="subtitle">A short supporting sentence that sells the idea.</p>
    <div style="display:flex; gap:1rem; margin-top:2rem">
      <a href="#" class="btn-primary">Get Started</a>
      <a href="#" class="btn-secondary">Learn More</a>
    </div>
  </section>
</body>
</html>`,
  },

  /* ── Media & Accessibility ── */

  "html5-media": {
    title: "Accessible Media Page",
    task: "Build a media showcase page with an HTML5 video player, an audio player, and a responsive image using <picture>. Add captions to the video and ensure all elements have proper accessibility attributes.",
    requirements: [
      "A <video> element with controls, a poster attribute, and a <track> for captions",
      "An <audio> element with controls and a loop attribute",
      "A <picture> element with at least 2 <source> media queries and an <img> fallback",
      "All <img> tags have descriptive alt text",
      "Use <figure> and <figcaption> to wrap each media element",
      "A skip-to-content link as the first element in <body>",
    ],
    expectedOutput: "A page showing a video player with poster image, an audio player, and an image that changes based on viewport width. Each wrapped in a figure with a caption.",
    hints: [
      "Video poster: <video controls poster=\"https://picsum.photos/800/450\"> — this shows a thumbnail before play.",
      "Track element: <track kind=\"captions\" src=\"captions.vtt\" srclang=\"en\" label=\"English\"> — the .vtt file can be a placeholder URL.",
      "Picture tag: <picture><source media=\"(max-width: 600px)\" srcset=\"small.jpg\"><img src=\"large.jpg\" alt=\"...\"></picture>",
      "Skip link: <a href=\"#main\" class=\"skip-link\">Skip to content</a> styled with position:absolute; top:-40px and shown on :focus.",
    ],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Media Showcase</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui; background: #0f172a; color: #e2e8f0; padding: 2rem; }

    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: #3b82f6;
      color: white;
      padding: 8px 16px;
    }
    .skip-link:focus { top: 0; }

    main { max-width: 800px; margin: 0 auto; }
    figure { margin-bottom: 2rem; }
    figcaption { font-size: 0.85rem; color: #94a3b8; margin-top: 0.5rem; }
    video, audio { width: 100%; border-radius: 8px; }
  </style>
</head>
<body>
  <a href="#main" class="skip-link">Skip to content</a>
  <main id="main">
    <h1 style="margin-bottom:1.5rem">Media Showcase</h1>

    <!-- Video with poster and captions -->
    <figure>
      <!-- Add <video> here -->
      <figcaption>Demo video with captions track</figcaption>
    </figure>

    <!-- Audio player -->
    <figure>
      <!-- Add <audio> here -->
      <figcaption>Background audio loop</figcaption>
    </figure>

    <!-- Responsive image -->
    <figure>
      <!-- Add <picture> here -->
      <figcaption>Responsive image — changes source at 600px</figcaption>
    </figure>
  </main>
</body>
</html>`,
  },

  /* ── Bootstrap Advanced ── */

  "bs-forms": {
    title: "Build a Registration Form",
    task: "Create a full user registration form using Bootstrap 5 form components. The form should collect: name, email, password, course selection, and agreement to terms.",
    requirements: [
      "All inputs use Bootstrap's form-control class",
      "Labels are linked to inputs with for/id pairing",
      "Password field has a show/hide toggle using JavaScript",
      "Course selection uses a <select> with form-select class",
      "Terms checkbox is required with invalid-feedback message",
      "Submit button is full-width using w-100",
      "Form is centered in a column (col-md-6 offset-md-3)",
    ],
    expectedOutput: "A clean registration form centered on the page. Clicking 'Show password' toggles password visibility. Submitting without checking terms shows a red error message.",
    hints: [
      "Show/hide: document.getElementById('togglePwd').addEventListener('click', () => { const p = document.getElementById('pwd'); p.type = p.type === 'password' ? 'text' : 'password'; })",
      "Bootstrap validation: add needs-validation to <form> and novalidate, then on submit: form.classList.add('was-validated')",
      "For the select: <select class=\"form-select\" required><option value=\"\">Choose a course...</option>...</select>",
    ],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light py-5">
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <h4 class="card-title mb-4">Create Account</h4>
            <form id="regForm" class="needs-validation" novalidate>

              <!-- Full Name -->
              <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="name" required>
                <div class="invalid-feedback">Please enter your name.</div>
              </div>

              <!-- Add Email, Password (with toggle), Course Select, Terms checkbox -->

              <button type="submit" class="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    document.getElementById('regForm').addEventListener('submit', function(e) {
      e.preventDefault();
      this.classList.add('was-validated');
    });
    // Add password toggle here
  </script>
</body>
</html>`,
  },

  "bs-modals-alerts": {
    title: "Interactive Alert & Confirmation System",
    task: "Build a page that uses Bootstrap modals and alerts to create a delete-confirmation flow. Clicking 'Delete' on any item should open a confirmation modal; confirming should remove the item and show a success alert.",
    requirements: [
      "At least 3 list items each with a Delete button",
      "Delete buttons trigger a Bootstrap modal (not a browser confirm())",
      "Modal has a title, body text naming the item to delete, and Cancel/Confirm buttons",
      "Confirming the modal removes the item from the DOM",
      "A dismissible Bootstrap alert (alert-success) appears after deletion",
      "Alert auto-dismisses after 3 seconds",
    ],
    expectedOutput: "Clicking Delete opens a modal asking 'Are you sure you want to delete [Item Name]?'. Confirming removes that item and shows a green 'Deleted successfully' banner that fades after 3s.",
    hints: [
      "Store the target item in a variable on modal show: modal.addEventListener('show.bs.modal', e => { target = e.relatedTarget.closest('li'); modal.querySelector('.item-name').textContent = target.dataset.name; })",
      "Remove item on confirm: target.remove(); bootstrap.Modal.getInstance(modal).hide();",
      "Auto-dismiss alert: setTimeout(() => { alert.classList.remove('show'); }, 3000)",
    ],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Delete Confirmation</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light py-5">
  <div class="container" style="max-width:500px">
    <h4 class="mb-3">My Items</h4>

    <!-- Success alert (hidden initially) -->
    <div id="successAlert" class="alert alert-success alert-dismissible fade" role="alert">
      ✓ Item deleted successfully.
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>

    <!-- Item list -->
    <ul class="list-group mb-4" id="itemList">
      <li class="list-group-item d-flex justify-content-between align-items-center" data-name="Project Alpha">
        Project Alpha
        <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#confirmModal">Delete</button>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center" data-name="Report Q3">
        Report Q3
        <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#confirmModal">Delete</button>
      </li>
      <!-- Add a 3rd item -->
    </ul>

    <!-- Confirmation Modal -->
    <div class="modal fade" id="confirmModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete <strong class="item-name"></strong>?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" id="confirmBtn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    // Add modal logic and delete handler here
  </script>
</body>
</html>`,
  },

  /* ── Chart.js Advanced ── */

  "chartjs-radar": {
    title: "Skills Radar + Trend Line",
    task: "Build a two-chart dashboard: a radar chart showing skill proficiency across 6 topics, and a line chart showing your weekly study hours over 8 weeks. Both charts must be interactive with tooltips.",
    requirements: [
      "Radar chart with 6 skill categories and filled area (fill: true)",
      "Radar labels are readable — adjust pointLabelFontSize or padding",
      "Line chart has 8 data points for weekly hours",
      "Line chart uses a tension value for smooth curves",
      "Both charts have a descriptive title via plugins.title",
      "Page layout uses CSS Grid or flexbox to show charts side by side",
    ],
    expectedOutput: "Two charts displayed side by side. The radar shows a filled polygon across 6 skill axes. The line chart shows a smooth curve of weekly study hours with tooltip on hover.",
    hints: [
      "Radar config: type: 'radar', data: { labels: [...6 skills], datasets: [{ data: [...6 numbers], fill: true, backgroundColor: 'rgba(99,102,241,0.2)' }] }",
      "For side-by-side: .charts { display: flex; gap: 1rem; } canvas { flex: 1; max-width: 50%; }",
      "Line tension: datasets[0].tension = 0.4 gives smooth curves. tension: 0 is straight lines.",
    ],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Skills Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body { font-family: system-ui; background: #0f172a; color: #e2e8f0; padding: 2rem; }
    h1 { margin-bottom: 1.5rem; font-size: 1.5rem; }
    .charts { display: flex; gap: 2rem; }
    .chart-card {
      flex: 1;
      background: #1e293b;
      border-radius: 12px;
      padding: 1.5rem;
    }
    canvas { max-height: 300px; }
  </style>
</head>
<body>
  <h1>My Learning Dashboard</h1>
  <div class="charts">
    <div class="chart-card">
      <canvas id="radarChart"></canvas>
    </div>
    <div class="chart-card">
      <canvas id="lineChart"></canvas>
    </div>
  </div>
  <script>
    // Radar chart — 6 skills
    new Chart(document.getElementById('radarChart'), {
      type: 'radar',
      data: {
        labels: ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL', 'Flask'],
        datasets: [{
          label: 'Skill Level',
          data: [/* fill in 6 values 0-100 */],
          fill: true,
          backgroundColor: 'rgba(99,102,241,0.2)',
          borderColor: '#6366f1',
        }]
      },
      options: { /* add title plugin */ }
    });

    // Line chart — 8 weeks
    new Chart(document.getElementById('lineChart'), {
      type: 'line',
      data: {
        labels: ['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7','Wk8'],
        datasets: [{
          label: 'Hours Studied',
          data: [/* fill in 8 values */],
          tension: 0.4,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,0.1)',
          fill: true,
        }]
      },
      options: { /* add title plugin */ }
    });
  </script>
</body>
</html>`,
  },

  /* ── Flask Advanced ── */

  "flask-json-api": {
    title: "Build a REST API for a Todo List",
    task: "Extend the JSON API concept to build a complete in-memory Todo list REST API with GET all, GET one, POST, and DELETE endpoints. Test it using the fetch-based client provided.",
    requirements: [
      "GET /api/todos returns all todos as JSON array",
      "GET /api/todos/<id> returns a single todo or 404 JSON error",
      "POST /api/todos accepts JSON body { title } and adds to the list",
      "DELETE /api/todos/<id> removes a todo and returns 204",
      "All responses use jsonify and appropriate HTTP status codes",
      "CORS enabled via after_request header or flask-cors",
    ],
    expectedOutput: "Visiting /api/todos returns a JSON array. POST to /api/todos adds a new item. DELETE /api/todos/1 removes item 1. Fetching a non-existent id returns {error: 'Not found'} with 404.",
    hints: [
      "Use a module-level list: todos = [{'id':1,'title':'Learn Flask','done':False}] and a counter for IDs.",
      "GET one: todo = next((t for t in todos if t['id'] == id), None); if not todo: return jsonify({'error':'Not found'}), 404",
      "POST: data = request.get_json(); todos.append({'id': next_id, 'title': data['title'], 'done': False}); return jsonify(new_todo), 201",
      "DELETE: todos[:] = [t for t in todos if t['id'] != id]; return '', 204",
    ],
    starterCode: `from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory store
todos = [
    {'id': 1, 'title': 'Learn Flask', 'done': False},
    {'id': 2, 'title': 'Build an API', 'done': False},
]
next_id = 3

@app.after_request
def add_cors(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,DELETE,OPTIONS'
    return response

@app.route('/api/todos', methods=['GET', 'OPTIONS'])
def get_todos():
    # Return all todos
    pass

@app.route('/api/todos/<int:id>', methods=['GET', 'OPTIONS'])
def get_todo(id):
    # Return one todo or 404
    pass

@app.route('/api/todos', methods=['POST', 'OPTIONS'])
def create_todo():
    # Add new todo from JSON body
    pass

@app.route('/api/todos/<int:id>', methods=['DELETE', 'OPTIONS'])
def delete_todo(id):
    # Remove todo, return 204
    pass

if __name__ == '__main__':
    app.run(debug=True)`,
  },

  "flask-sqlite-full": {
    title: "Full CRUD App with SQLite",
    task: "Build a complete Flask Notes app backed by SQLite. Users can create notes (title + body), view a list of all notes, and delete individual notes. Use a persistent SQLite database.",
    requirements: [
      "SQLite database created/connected via sqlite3 module",
      "GET / renders a list of all notes from the database",
      "POST /notes inserts a new note and redirects to /",
      "POST /notes/<id>/delete removes the note and redirects to /",
      "HTML template uses Jinja2 for-loop to render notes",
      "Empty state message shown when no notes exist",
    ],
    expectedOutput: "A notes list page. Filling the form and submitting adds a note (visible on reload). Clicking Delete removes it from the database permanently.",
    hints: [
      "Init DB: conn = sqlite3.connect('notes.db'); conn.execute('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title TEXT, body TEXT)'); conn.commit()",
      "GET notes: conn.row_factory = sqlite3.Row; rows = conn.execute('SELECT * FROM notes ORDER BY id DESC').fetchall()",
      "In the Jinja template: {% for note in notes %}<div>{{ note['title'] }}</div>{% else %}<p>No notes yet.</p>{% endfor %}",
    ],
    starterCode: `from flask import Flask, render_template_string, request, redirect
import sqlite3

app = Flask(__name__)
DB = 'notes.db'

def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS notes
                        (id INTEGER PRIMARY KEY AUTOINCREMENT,
                         title TEXT NOT NULL,
                         body  TEXT)''')

TEMPLATE = """
<!DOCTYPE html>
<html>
<head><title>Notes</title>
<style>
  body { font-family: system-ui; padding: 2rem; background: #f8fafc; }
  .card { background: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid #e2e8f0; }
  form input, form textarea { width: 100%; margin-bottom: 0.5rem; padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px; }
  button { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; }
  .btn-add { background: #3b82f6; color: white; }
  .btn-del { background: #ef4444; color: white; }
</style>
</head>
<body>
  <h1>Notes</h1>
  <form action="/notes" method="POST" style="max-width:400px; margin-bottom:2rem">
    <input name="title" placeholder="Title" required>
    <textarea name="body" placeholder="Body..." rows="3"></textarea>
    <button type="submit" class="btn-add">Add Note</button>
  </form>

  {% for note in notes %}
  <div class="card">
    <h3>{{ note['title'] }}</h3>
    <p>{{ note['body'] }}</p>
    <form action="/notes/{{ note['id'] }}/delete" method="POST" style="margin-top:0.5rem">
      <button type="submit" class="btn-del">Delete</button>
    </form>
  </div>
  {% else %}
  <p style="color:#94a3b8">No notes yet. Add one above!</p>
  {% endfor %}
</body>
</html>
"""

@app.route('/')
def index():
    # Fetch and render notes
    pass

@app.route('/notes', methods=['POST'])
def create_note():
    # Insert note and redirect
    pass

@app.route('/notes/<int:id>/delete', methods=['POST'])
def delete_note(id):
    # Delete note and redirect
    pass

if __name__ == '__main__':
    init_db()
    app.run(debug=True)`,
  },

  /* ── SQL Advanced ── */

  "sql-joins": {
    title: "Multi-Table JOIN Queries",
    task: "Write SQL queries that join the students, enrollments, and courses tables to answer business questions: which students are in which courses, who hasn't enrolled yet, and what is each course's enrollment count.",
    requirements: [
      "INNER JOIN query: list student name + course name for all enrollments",
      "LEFT JOIN query: show all students, with NULL for those not enrolled in anything",
      "COUNT + GROUP BY: show each course and how many students are enrolled",
      "ORDER BY enrollment count descending",
      "Use table aliases (e.g., s for students, e for enrollments)",
      "All queries produce results in the output panel",
    ],
    expectedOutput: "Three query result tables: (1) student-course pairs, (2) all students with course or NULL, (3) course name with enrollment count sorted highest first.",
    hints: [
      "INNER JOIN: SELECT s.name, c.title FROM students s JOIN enrollments e ON s.id = e.student_id JOIN courses c ON e.course_id = c.id",
      "LEFT JOIN: SELECT s.name, c.title FROM students s LEFT JOIN enrollments e ON s.id = e.student_id LEFT JOIN courses c ON e.course_id = c.id",
      "COUNT: SELECT c.title, COUNT(e.student_id) AS enrolled FROM courses c LEFT JOIN enrollments e ON c.id = e.course_id GROUP BY c.id ORDER BY enrolled DESC",
    ],
    starterCode: `-- Setup: run this first to create the tables
CREATE TABLE students (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  gpa  REAL
);

CREATE TABLE courses (
  id    INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  dept  TEXT
);

CREATE TABLE enrollments (
  student_id INTEGER REFERENCES students(id),
  course_id  INTEGER REFERENCES courses(id),
  grade      TEXT
);

INSERT INTO students VALUES (1,'Alice',3.9),(2,'Bob',3.2),(3,'Carol',3.7),(4,'Dave',2.8);
INSERT INTO courses  VALUES (1,'Web Dev','CS'),(2,'Databases','CS'),(3,'Design','Arts');
INSERT INTO enrollments VALUES (1,1,'A'),(1,2,'B+'),(2,1,'B'),(3,2,'A-'),(3,3,'A');
-- Note: Dave has no enrollments

-- 1. INNER JOIN: students and their courses
SELECT /* your query */;

-- 2. LEFT JOIN: all students (including unenrolled)
SELECT /* your query */;

-- 3. Enrollment count per course, sorted
SELECT /* your query */;`,
  },

  "sql-having-subqueries": {
    title: "HAVING, Subqueries & Aggregates",
    task: "Write advanced SQL queries using HAVING to filter groups, subqueries in WHERE to answer nested questions, and aggregate functions beyond COUNT (AVG, MAX, MIN, SUM).",
    requirements: [
      "HAVING clause: find courses with more than 1 enrolled student",
      "AVG aggregate: find the average GPA of students in each department",
      "Subquery in WHERE: find students whose GPA is above the overall average",
      "Subquery with IN: find names of students enrolled in 'Databases'",
      "MAX/MIN: find the highest and lowest GPA overall",
      "All queries run without error",
    ],
    expectedOutput: "Five query results demonstrating HAVING, AVG group aggregate, above-average GPA filter, subquery with IN, and MAX/MIN.",
    hints: [
      "HAVING: SELECT course_id, COUNT(*) as n FROM enrollments GROUP BY course_id HAVING n > 1",
      "Above average: SELECT name, gpa FROM students WHERE gpa > (SELECT AVG(gpa) FROM students)",
      "IN subquery: SELECT name FROM students WHERE id IN (SELECT student_id FROM enrollments e JOIN courses c ON e.course_id = c.id WHERE c.title = 'Databases')",
    ],
    starterCode: `-- Reuse the schema from the previous lesson
CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, gpa REAL, dept TEXT);
CREATE TABLE courses  (id INTEGER PRIMARY KEY, title TEXT, dept TEXT);
CREATE TABLE enrollments (student_id INTEGER, course_id INTEGER, grade TEXT);

INSERT INTO students VALUES
  (1,'Alice',3.9,'CS'),(2,'Bob',3.2,'CS'),
  (3,'Carol',3.7,'Arts'),(4,'Dave',2.8,'CS'),
  (5,'Eve',3.5,'Arts');

INSERT INTO courses VALUES
  (1,'Web Dev','CS'),(2,'Databases','CS'),(3,'Design','Arts');

INSERT INTO enrollments VALUES
  (1,1,'A'),(1,2,'B+'),(2,1,'B'),(3,2,'A-'),
  (3,3,'A'),(4,1,'C+'),(5,3,'A');

-- 1. Courses with more than 1 student (HAVING)
SELECT /* your query */;

-- 2. Average GPA per department
SELECT /* your query */;

-- 3. Students with above-average GPA (subquery)
SELECT /* your query */;

-- 4. Names of students in 'Databases' (IN + subquery)
SELECT /* your query */;

-- 5. Highest and lowest GPA
SELECT /* your query */;`,
  },

  /* ── Projects Advanced ── */

  "project-quiz-app": {
    title: "Extend the Quiz App",
    task: "Add two features to the quiz app: (1) a progress bar that fills as the user answers questions, and (2) a results review screen that shows each question with the user's answer highlighted (correct in green, wrong in red).",
    requirements: [
      "Progress bar updates after each answer (shows N/total questions answered)",
      "Progress bar uses a CSS transition for smooth fill animation",
      "After the final question, show a results review instead of just the score",
      "Review lists all questions with the correct answer and the user's chosen answer",
      "Correct answers shown in green, incorrect in red",
      "A 'Try Again' button resets everything back to question 1",
    ],
    expectedOutput: "A quiz with a progress bar at the top filling as you go. At the end, instead of just '3/5 correct', you see each question with answers color-coded. Try Again resets to question 1.",
    hints: [
      "Progress bar: <div style=\"height:6px; background:#e2e8f0; border-radius:3px\"><div id='progress' style=\"height:100%; width:0%; background:#3b82f6; transition:width 0.3s\"></div></div>. Update: progress.style.width = (answered/total*100)+'%'",
      "Store user answers: const userAnswers = []; push the selected index on each answer.",
      "Review screen: questions.map((q,i) => q.options.map((opt,j) => j === q.answer ? 'correct' : j === userAnswers[i] ? 'wrong' : 'neutral'))",
    ],
    starterCode: null,
  },
};
