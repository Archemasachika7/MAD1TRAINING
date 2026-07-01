export const tracks = [
  {
    id: "html5",
    name: "HTML5",
    icon: "🌐",
    color: "orange",
    chapters: [
      {
        id: "html-fundamentals",
        title: "Fundamentals",
        lessons: [
          {
            id: "html-doc-structure",
            title: "Document Structure",
            language: "html",
            theory: {
              intro: "Every webpage is built on an HTML document. Think of it as a blueprint — it tells the browser what content exists, what it means, and in what order to display it.",
              sections: [
                {
                  heading: "The Boilerplate",
                  content: "Every valid HTML file starts with the same skeleton. Browsers expect these tags. Missing them may work, but it causes unpredictable rendering quirks.",
                  code: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>`,
                  breakdown: [
                    { line: "<!DOCTYPE html>", explanation: "Tells the browser: use modern HTML5 rules, not legacy quirks mode." },
                    { line: '<html lang="en">', explanation: "Root element. lang='en' helps screen readers and search engines." },
                    { line: "<head>", explanation: "Invisible metadata container — title, charset, CSS links go here." },
                    { line: '<meta charset="UTF-8">', explanation: "Allows any character (emoji, accents, Arabic) to render correctly." },
                    { line: '<meta name="viewport" ...>', explanation: "Makes the page responsive on mobile — without this, phones zoom out to desktop width." },
                    { line: "<title>", explanation: "Text shown in the browser tab." },
                    { line: "<body>", explanation: "Everything visible on the page lives here." },
                  ]
                },
                {
                  heading: "Head vs Body",
                  content: "The <head> is for instructions TO the browser. The <body> is content FOR the user. Never put visible content in <head> — it won't render.",
                  code: null,
                  breakdown: []
                }
              ],
              tip: "Use Ctrl+U in any browser to view the raw HTML of any live website. Great for learning from real examples."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My First Page</title>\n    <style>\n      body { font-family: system-ui; padding: 2rem; background: #f0f4f8; }\n      h1 { color: #2d3748; }\n      p  { color: #4a5568; }\n    </style>\n  </head>\n  <body>\n    <h1>Hello, World!</h1>\n    <p>This is my first HTML page. Edit me!</p>\n  </body>\n</html>`
          },
          {
            id: "html-text",
            title: "Text & Headings",
            language: "html",
            theory: {
              intro: "HTML has 6 heading levels and several text elements. Each carries semantic meaning — search engines and screen readers interpret them, not just style them.",
              sections: [
                {
                  heading: "Headings h1–h6",
                  content: "Use ONE h1 per page (your main topic). h2 are sections, h3 are subsections. Never skip levels for visual sizing — use CSS for that.",
                  code: `<h1>Main Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>\n<p>A paragraph of text.</p>\n<p>Another paragraph.</p>`,
                  breakdown: [
                    { line: "<h1>", explanation: "Most important heading. One per page. Used by Google to understand your page topic." },
                    { line: "<h2>", explanation: "Major sections. Like chapters in a book." },
                    { line: "<h3>", explanation: "Subsections within an h2 section." },
                    { line: "<p>", explanation: "Paragraph — the default text block. Browsers add margin between p tags automatically." },
                  ]
                },
                {
                  heading: "Inline Text Formatting",
                  content: "Inline elements live inside paragraphs and change the meaning or appearance of specific words.",
                  code: `<p>This is <strong>important</strong> and this is <em>emphasized</em>.</p>\n<p>Code looks like: <code>console.log('hi')</code></p>\n<p><mark>Highlighted text</mark> and <del>deleted text</del>.</p>`,
                  breakdown: [
                    { line: "<strong>", explanation: "Bold + semantic importance. Screen readers may stress this word." },
                    { line: "<em>", explanation: "Italic + emphasis. Different from <i> which is just italic with no meaning." },
                    { line: "<code>", explanation: "Monospace font — for inline code snippets." },
                    { line: "<mark>", explanation: "Yellow highlight. Used for search result highlights." },
                    { line: "<del>", explanation: "Strikethrough — marks removed/outdated content." },
                  ]
                }
              ],
              tip: "Use <strong> and <em> for meaning, not just bold/italic. If you just want the style, use CSS instead."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Text Elements</title>\n  <style>\n    body { font-family: system-ui; padding: 2rem; max-width: 600px; }\n    code { background: #f1f5f9; padding: 2px 6px; border-radius: 3px; }\n  </style>\n</head>\n<body>\n  <h1>My Blog Post</h1>\n  <h2>Introduction</h2>\n  <p>Learning <strong>HTML</strong> is the <em>first step</em> to web development.</p>\n  <h2>Code Example</h2>\n  <p>Try typing <code>alert('hello')</code> in the browser console.</p>\n  <p><mark>Key takeaway:</mark> HTML gives structure, CSS gives style.</p>\n</body>\n</html>`
          },
          {
            id: "html-links-images",
            title: "Links & Images",
            language: "html",
            theory: {
              intro: "Links connect the web. Images bring it to life. Both use attributes — extra information inside the opening tag — to tell the browser where to point or what to show.",
              sections: [
                {
                  heading: "Anchor Tags (Links)",
                  content: "The <a> tag creates a clickable link. The href attribute holds the destination URL.",
                  code: `<!-- External link -->\n<a href="https://google.com" target="_blank" rel="noopener">Google</a>\n\n<!-- Internal link -->\n<a href="/about.html">About Page</a>\n\n<!-- Jump to section -->\n<a href="#section2">Go to Section 2</a>\n<h2 id="section2">Section 2</h2>`,
                  breakdown: [
                    { line: 'href="https://..."', explanation: "The destination. Can be a full URL, relative path, email, or #id." },
                    { line: 'target="_blank"', explanation: "Opens in a new tab. Without this, link replaces the current page." },
                    { line: 'rel="noopener"', explanation: "Security measure — prevents the new tab from accessing your page's window object." },
                    { line: 'href="#section2"', explanation: "Jumps to the element with id='section2' on the same page." },
                  ]
                },
                {
                  heading: "Images",
                  content: "The <img> tag is self-closing. src points to the image, alt describes it for screen readers.",
                  code: `<img \n  src="https://picsum.photos/300/200" \n  alt="A random placeholder photo"\n  width="300"\n  height="200"\n>`,
                  breakdown: [
                    { line: 'src="..."', explanation: "Path or URL to the image file. Can be relative (./photo.jpg) or absolute." },
                    { line: 'alt="..."', explanation: "Critical for accessibility and SEO. Describe what's IN the image." },
                    { line: "width / height", explanation: "Prevents layout shift while the image loads. Always set these when you know them." },
                  ]
                }
              ],
              tip: "Always add alt text to images. 'photo.jpg' is bad alt text. 'Student studying at a library desk' is good alt text."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Links & Images</title>\n  <style>\n    body { font-family: system-ui; padding: 2rem; }\n    a { color: #3b82f6; }\n    img { border-radius: 8px; margin-top: 1rem; }\n  </style>\n</head>\n<body>\n  <h1>Explore the Web</h1>\n  <p>Visit <a href="https://developer.mozilla.org" target="_blank" rel="noopener">MDN Web Docs</a> for HTML reference.</p>\n\n  <h2>A Photo</h2>\n  <img src="https://picsum.photos/400/250?random=1" alt="A random scenic photo" width="400" height="250">\n\n  <p><a href="#bottom">Jump to bottom</a></p>\n  <br><br><br>\n  <h2 id="bottom">Bottom of Page</h2>\n  <a href="#">Back to top</a>\n</body>\n</html>`
          },
        ]
      },
      {
        id: "html-forms-tables",
        title: "Forms & Tables",
        lessons: [
          {
            id: "html-forms",
            title: "HTML Forms",
            language: "html",
            theory: {
              intro: "Forms are how users send data to servers — login, search, signup, checkout. Every form element has a name (sent to server) and a type (how it looks/behaves).",
              sections: [
                {
                  heading: "Form Structure",
                  content: "A form wraps all its inputs. The action tells the browser where to send data. The method is either GET (data in URL) or POST (data in request body).",
                  code: `<form action="/submit" method="POST">\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" placeholder="you@example.com" required>\n\n  <label for="password">Password:</label>\n  <input type="password" id="password" name="password" required>\n\n  <button type="submit">Login</button>\n</form>`,
                  breakdown: [
                    { line: 'action="/submit"', explanation: "Where the form data is sent when submitted. In Flask, this matches @app.route('/submit')." },
                    { line: 'method="POST"', explanation: "POST hides data in request body. GET appends it to the URL (?email=...)." },
                    { line: 'for="email"', explanation: "Links the label to the input. Clicking the label focuses the input." },
                    { line: 'id="email"', explanation: "Must match the label's 'for' value. Also used by JavaScript." },
                    { line: 'name="email"', explanation: "The KEY sent to the server. In Flask: request.form['email']." },
                    { line: 'type="email"', explanation: "Browser validates email format. Shows email keyboard on mobile." },
                    { line: "required", explanation: "Browser won't submit the form if this field is empty." },
                  ]
                },
                {
                  heading: "Input Types",
                  content: "HTML5 added many input types that give you free validation and better mobile keyboards.",
                  code: `<input type="text"     name="name">\n<input type="email"    name="email">\n<input type="password" name="pwd">\n<input type="number"   name="age" min="1" max="120">\n<input type="date"     name="birthday">\n<input type="checkbox" name="agree" value="yes">\n<textarea name="bio" rows="4"></textarea>\n<select name="city">\n  <option value="chennai">Chennai</option>\n  <option value="mumbai">Mumbai</option>\n</select>`,
                  breakdown: [
                    { line: 'type="number"', explanation: "Shows number spinner. min/max add range validation." },
                    { line: 'type="date"', explanation: "Shows a date picker. Value sent as YYYY-MM-DD." },
                    { line: 'type="checkbox"', explanation: "Only sends its value if checked. Unchecked sends nothing." },
                    { line: "<textarea>", explanation: "Multi-line text input. Has a closing tag unlike <input>." },
                    { line: "<select>", explanation: "Dropdown menu. The option's value is what gets sent, text is display." },
                  ]
                }
              ],
              tip: "Always pair <label> with <input> using for/id. It doubles the click target and is required for screen reader users."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>HTML Form</title>\n  <style>\n    body { font-family: system-ui; padding: 2rem; max-width: 400px; }\n    label { display: block; margin-top: 1rem; font-weight: 600; color: #374151; }\n    input, select, textarea { \n      width: 100%; padding: 8px 12px; margin-top: 4px;\n      border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;\n    }\n    button { \n      margin-top: 1.5rem; width: 100%; padding: 10px;\n      background: #3b82f6; color: white; border: none;\n      border-radius: 6px; font-size: 1rem; cursor: pointer;\n    }\n    button:hover { background: #2563eb; }\n  </style>\n</head>\n<body>\n  <h1>Sign Up</h1>\n  <form>\n    <label for="name">Full Name</label>\n    <input type="text" id="name" name="name" placeholder="Arjun Kumar" required>\n\n    <label for="email">Email</label>\n    <input type="email" id="email" name="email" placeholder="arjun@example.com" required>\n\n    <label for="course">Course</label>\n    <select id="course" name="course">\n      <option value="bsc">BSc Data Science</option>\n      <option value="diploma">Diploma</option>\n    </select>\n\n    <label for="bio">About You</label>\n    <textarea id="bio" name="bio" rows="3" placeholder="Tell us about yourself..."></textarea>\n\n    <button type="submit">Register</button>\n  </form>\n</body>\n</html>`
          },
          {
            id: "html-tables",
            title: "HTML Tables",
            language: "html",
            theory: {
              intro: "Tables display structured data in rows and columns. Use them for data grids, schedules, comparisons — NOT for page layout (that's CSS Grid/Flexbox's job).",
              sections: [
                {
                  heading: "Table Anatomy",
                  content: "A table has three semantic sections: thead (header row), tbody (data rows), tfoot (totals/summary).",
                  code: `<table>\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Score</th>\n      <th>Grade</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Priya</td>\n      <td>92</td>\n      <td>A</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <td>Average</td>\n      <td>85</td>\n      <td>—</td>\n    </tr>\n  </tfoot>\n</table>`,
                  breakdown: [
                    { line: "<table>", explanation: "Container for the whole table." },
                    { line: "<thead>", explanation: "Header section. Browsers may repeat this on long printed tables." },
                    { line: "<tr>", explanation: "Table Row — a horizontal row of cells." },
                    { line: "<th>", explanation: "Table Header cell — bold by default. Communicates column/row meaning." },
                    { line: "<tbody>", explanation: "Main data section." },
                    { line: "<td>", explanation: "Table Data cell — regular data." },
                    { line: "<tfoot>", explanation: "Footer section — totals, averages." },
                  ]
                }
              ],
              tip: "Add border-collapse: collapse to your table CSS — otherwise you get ugly double borders between cells."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>HTML Table</title>\n  <style>\n    body { font-family: system-ui; padding: 2rem; }\n    table { border-collapse: collapse; width: 100%; }\n    th, td { border: 1px solid #e5e7eb; padding: 10px 14px; text-align: left; }\n    th { background: #3b82f6; color: white; }\n    tr:nth-child(even) { background: #f9fafb; }\n    tfoot td { font-weight: bold; background: #eff6ff; }\n  </style>\n</head>\n<body>\n  <h1>Student Results</h1>\n  <table>\n    <thead>\n      <tr>\n        <th>Student</th>\n        <th>Subject</th>\n        <th>Score</th>\n        <th>Grade</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr><td>Priya</td><td>Mathematics</td><td>95</td><td>A+</td></tr>\n      <tr><td>Rahul</td><td>Science</td><td>82</td><td>A</td></tr>\n      <tr><td>Ananya</td><td>English</td><td>76</td><td>B+</td></tr>\n      <tr><td>Dev</td><td>History</td><td>88</td><td>A</td></tr>\n    </tbody>\n    <tfoot>\n      <tr>\n        <td colspan="2">Class Average</td>\n        <td>85.25</td>\n        <td>A</td>\n      </tr>\n    </tfoot>\n  </table>\n</body>\n</html>`
          }
        ]
      },
      {
        id: "html-semantic",
        title: "Semantic HTML",
        lessons: [
          {
            id: "html-semantic-elements",
            title: "Semantic Elements",
            language: "html",
            theory: {
              intro: "Semantic elements tell the browser WHAT a section is, not just how to style it. A <div> is meaningless. A <nav> tells everyone: this is navigation.",
              sections: [
                {
                  heading: "Page Layout Elements",
                  content: "HTML5 introduced structural elements that replace generic <div id='nav'> patterns with meaningful tags.",
                  code: `<body>\n  <header>\n    <nav>\n      <a href="/">Home</a>\n      <a href="/about">About</a>\n    </nav>\n  </header>\n\n  <main>\n    <article>\n      <h1>Blog Post Title</h1>\n      <p>Post content here...</p>\n    </article>\n    <aside>\n      <h2>Related Links</h2>\n    </aside>\n  </main>\n\n  <footer>\n    <p>&copy; 2024 My Site</p>\n  </footer>\n</body>`,
                  breakdown: [
                    { line: "<header>", explanation: "Top of page or section. Contains logo, navigation, hero content." },
                    { line: "<nav>", explanation: "Navigation links. Screen readers offer shortcuts to jump to nav." },
                    { line: "<main>", explanation: "Primary content. Only ONE per page." },
                    { line: "<article>", explanation: "Self-contained content (blog post, news article, card)." },
                    { line: "<aside>", explanation: "Tangentially related content — sidebars, ads, related links." },
                    { line: "<footer>", explanation: "Bottom of page or section. Copyright, links, contact info." },
                  ]
                }
              ],
              tip: "Replace every <div id='header'> with <header>, <div id='nav'> with <nav>. Your HTML becomes self-documenting."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Semantic Layout</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body { font-family: system-ui; color: #1f2937; }\n    header { background: #1e3a5f; color: white; padding: 1rem 2rem; display:flex; align-items:center; justify-content:space-between; }\n    nav a { color: #93c5fd; text-decoration: none; margin-right: 1.5rem; }\n    nav a:hover { color: white; }\n    main { display: flex; gap: 2rem; padding: 2rem; max-width: 960px; margin: 0 auto; }\n    article { flex: 1; }\n    aside { width: 220px; background: #f0f9ff; padding: 1rem; border-radius: 8px; }\n    h1 { margin-bottom: 0.5rem; }\n    p { color: #4b5563; line-height: 1.7; margin-bottom: 1rem; }\n    footer { background: #111827; color: #9ca3af; text-align: center; padding: 1rem; }\n  </style>\n</head>\n<body>\n  <header>\n    <h2>MyBlog</h2>\n    <nav>\n      <a href="#">Home</a>\n      <a href="#">Articles</a>\n      <a href="#">Contact</a>\n    </nav>\n  </header>\n\n  <main>\n    <article>\n      <h1>Learning HTML Semantics</h1>\n      <p>Semantic HTML makes your code readable by humans and machines alike. Search engines use these tags to understand page structure.</p>\n      <p>When you use &lt;article&gt; instead of &lt;div&gt;, you're telling Google: this is a standalone piece of content worth indexing.</p>\n    </article>\n\n    <aside>\n      <h2>Related Topics</h2>\n      <ul style="margin-top:0.5rem; padding-left:1.2rem; line-height:2;">\n        <li>CSS Flexbox</li>\n        <li>ARIA Labels</li>\n        <li>Web Accessibility</li>\n      </ul>\n    </aside>\n  </main>\n\n  <footer>\n    <p>&copy; 2024 MyBlog — Built with semantic HTML</p>\n  </footer>\n</body>\n</html>`
          }
        ]
      }
    ]
  },

  {
    id: "bootstrap",
    name: "Bootstrap CSS",
    icon: "🅱️",
    color: "purple",
    chapters: [
      {
        id: "bs-grid",
        title: "Grid System",
        lessons: [
          {
            id: "bs-container-grid",
            title: "Container & Grid Basics",
            language: "html",
            theory: {
              intro: "Bootstrap's grid is a 12-column system — every row is divided into 12 equal parts, and you decide how many columns each element takes. This is the core of Bootstrap layout.",
              sections: [
                {
                  heading: "The Container",
                  content: "Everything goes inside a container. It centers your content and adds padding. .container has a max-width that steps up at breakpoints. .container-fluid is always 100% wide.",
                  code: `<!-- Fixed width at each breakpoint -->\n<div class="container">\n  Content here is centered and padded\n</div>\n\n<!-- Always full width -->\n<div class="container-fluid">\n  Full width content\n</div>`,
                  breakdown: [
                    { line: ".container", explanation: "Max-width steps: 540→720→960→1140→1320px. Always horizontally centered." },
                    { line: ".container-fluid", explanation: "Always 100% of screen width. Good for dashboards/full-bleed layouts." },
                  ]
                },
                {
                  heading: "Rows & Columns",
                  content: "Inside a container, create rows. Inside rows, create columns. Column widths are fractions of 12.",
                  code: `<div class="container">\n  <div class="row">\n    <div class="col-6">Left Half</div>\n    <div class="col-6">Right Half</div>\n  </div>\n  <div class="row">\n    <div class="col-4">One Third</div>\n    <div class="col-4">One Third</div>\n    <div class="col-4">One Third</div>\n  </div>\n  <div class="row">\n    <!-- Responsive: full → half → third -->\n    <div class="col-12 col-md-6 col-lg-4">Card</div>\n    <div class="col-12 col-md-6 col-lg-4">Card</div>\n    <div class="col-12 col-md-6 col-lg-4">Card</div>\n  </div>\n</div>`,
                  breakdown: [
                    { line: ".row", explanation: "Creates a flex container. Columns must live inside rows." },
                    { line: ".col-6", explanation: "6 of 12 = 50%. Two col-6s fill a row perfectly." },
                    { line: ".col-4", explanation: "4 of 12 = 33.33%. Three col-4s fill a row." },
                    { line: "col-12 col-md-6 col-lg-4", explanation: "Mobile: stacked. Tablet: 2-col. Desktop: 3-col." },
                  ]
                }
              ],
              tip: "Column numbers in each row should add up to 12. More than 12 wraps to the next line automatically."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Bootstrap Grid</title>\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n  <style>\n    .col-demo { background: #dbeafe; border: 2px solid #3b82f6; padding: 1rem; text-align: center; border-radius: 6px; }\n  </style>\n</head>\n<body class="p-4">\n  <h2 class="mb-4">Bootstrap 12-Column Grid</h2>\n\n  <h5>Two halves (6+6)</h5>\n  <div class="row mb-3">\n    <div class="col-6"><div class="col-demo">col-6</div></div>\n    <div class="col-6"><div class="col-demo">col-6</div></div>\n  </div>\n\n  <h5>Three thirds (4+4+4)</h5>\n  <div class="row mb-3">\n    <div class="col-4"><div class="col-demo">col-4</div></div>\n    <div class="col-4"><div class="col-demo">col-4</div></div>\n    <div class="col-4"><div class="col-demo">col-4</div></div>\n  </div>\n\n  <h5>Responsive cards</h5>\n  <div class="row g-2">\n    <div class="col-12 col-md-6 col-lg-4"><div class="col-demo">Card 1</div></div>\n    <div class="col-12 col-md-6 col-lg-4"><div class="col-demo">Card 2</div></div>\n    <div class="col-12 col-md-6 col-lg-4"><div class="col-demo">Card 3</div></div>\n  </div>\n</body>\n</html>`
          },
        ]
      },
      {
        id: "bs-components",
        title: "Components",
        lessons: [
          {
            id: "bs-cards-buttons",
            title: "Cards & Buttons",
            language: "html",
            theory: {
              intro: "Bootstrap components are pre-built UI patterns. Cards are rectangular content containers used everywhere: product listings, blog previews, dashboards.",
              sections: [
                {
                  heading: "Buttons",
                  content: "Bootstrap buttons use context-based color classes. btn is required, btn-{context} sets the color.",
                  code: `<button class="btn btn-primary">Primary</button>\n<button class="btn btn-success">Success</button>\n<button class="btn btn-danger">Danger</button>\n<button class="btn btn-outline-primary">Outlined</button>\n<button class="btn btn-lg btn-primary">Large</button>\n<button class="btn btn-sm btn-secondary">Small</button>`,
                  breakdown: [
                    { line: ".btn", explanation: "Base class. Always required. Sets padding, border-radius, cursor." },
                    { line: ".btn-primary", explanation: "Bootstrap's blue — use for main actions." },
                    { line: ".btn-success / .btn-danger", explanation: "Green for confirm, red for destructive actions." },
                    { line: ".btn-outline-primary", explanation: "Transparent with colored border — good for secondary actions." },
                    { line: ".btn-lg / .btn-sm", explanation: "Size modifiers. Default is medium." },
                  ]
                },
                {
                  heading: "Cards",
                  content: "A card has an optional image, body with title + text, and footer.",
                  code: `<div class="card" style="width: 300px;">\n  <img src="https://picsum.photos/300/150" class="card-img-top" alt="...">\n  <div class="card-body">\n    <h5 class="card-title">Card Title</h5>\n    <p class="card-text">Description text goes here.</p>\n    <a href="#" class="btn btn-primary">Learn More</a>\n  </div>\n  <div class="card-footer text-muted">\n    Last updated 3 days ago\n  </div>\n</div>`,
                  breakdown: [
                    { line: ".card", explanation: "White background, subtle border, border-radius, box-shadow." },
                    { line: ".card-img-top", explanation: "Image at top of card. Rounded corners match the card." },
                    { line: ".card-body", explanation: "Padded container for all card content." },
                    { line: ".card-title", explanation: "Bold heading inside the card." },
                    { line: ".card-footer", explanation: "Bottom section with lighter background." },
                  ]
                }
              ],
              tip: "Use .h-100 on cards in a row so they all stretch to equal height regardless of content length."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n</head>\n<body class="bg-light p-4">\n  <h2 class="mb-4">Course Catalogue</h2>\n\n  <div class="row g-3">\n    <div class="col-md-4">\n      <div class="card h-100">\n        <img src="https://picsum.photos/400/200?random=1" class="card-img-top" alt="Web Dev">\n        <div class="card-body">\n          <h5 class="card-title">Web Development</h5>\n          <p class="card-text">Learn HTML, CSS, and JavaScript to build modern websites.</p>\n          <span class="badge bg-primary">Beginner</span>\n        </div>\n        <div class="card-footer d-flex justify-content-between align-items-center">\n          <small class="text-muted">12 weeks</small>\n          <button class="btn btn-sm btn-primary">Enroll</button>\n        </div>\n      </div>\n    </div>\n    <div class="col-md-4">\n      <div class="card h-100">\n        <img src="https://picsum.photos/400/200?random=2" class="card-img-top" alt="Data Science">\n        <div class="card-body">\n          <h5 class="card-title">Data Science</h5>\n          <p class="card-text">Master Python, pandas, and machine learning fundamentals.</p>\n          <span class="badge bg-success">Intermediate</span>\n        </div>\n        <div class="card-footer d-flex justify-content-between align-items-center">\n          <small class="text-muted">16 weeks</small>\n          <button class="btn btn-sm btn-success">Enroll</button>\n        </div>\n      </div>\n    </div>\n    <div class="col-md-4">\n      <div class="card h-100">\n        <img src="https://picsum.photos/400/200?random=3" class="card-img-top" alt="Flask">\n        <div class="card-body">\n          <h5 class="card-title">Flask & Databases</h5>\n          <p class="card-text">Build full-stack apps with Python Flask and SQLite.</p>\n          <span class="badge bg-danger">Advanced</span>\n        </div>\n        <div class="card-footer d-flex justify-content-between align-items-center">\n          <small class="text-muted">20 weeks</small>\n          <button class="btn btn-sm btn-danger">Enroll</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</body>\n</html>`
          },
          {
            id: "bs-navbar",
            title: "Navbar & Utilities",
            language: "html",
            theory: {
              intro: "Bootstrap's navbar is responsive by default — on mobile it collapses into a hamburger menu. Utility classes let you style without writing custom CSS.",
              sections: [
                {
                  heading: "Navbar",
                  content: "The navbar has three zones: brand (logo/name), toggler (hamburger button), and collapse (links that hide on mobile).",
                  code: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">\n  <div class="container">\n    <a class="navbar-brand" href="#">MyApp</a>\n    <button class="navbar-toggler" type="button"\n      data-bs-toggle="collapse"\n      data-bs-target="#navMenu">\n      <span class="navbar-toggler-icon"></span>\n    </button>\n    <div class="collapse navbar-collapse" id="navMenu">\n      <ul class="navbar-nav ms-auto">\n        <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>\n        <li class="nav-item"><a class="nav-link" href="#">About</a></li>\n      </ul>\n    </div>\n  </div>\n</nav>`,
                  breakdown: [
                    { line: "navbar-expand-lg", explanation: "Expands to full navbar on lg+ screens. Below lg: shows hamburger." },
                    { line: "navbar-dark bg-dark", explanation: "Dark background with white text." },
                    { line: "data-bs-toggle / data-bs-target", explanation: "JavaScript hooks — clicking the button toggles the collapse div." },
                    { line: "ms-auto", explanation: "margin-start: auto — pushes nav links to the right." },
                  ]
                },
                {
                  heading: "Key Utility Classes",
                  content: "Bootstrap utilities follow: {property}-{value} or {property}-{breakpoint}-{value}.",
                  code: `<!-- Spacing -->\n<div class="mt-3 mb-4 px-3">Spaced div</div>\n\n<!-- Flexbox -->\n<div class="d-flex justify-content-between align-items-center">\n  <span>Left</span><span>Right</span>\n</div>\n\n<!-- Text -->\n<p class="text-center text-muted fw-bold fs-5">Styled text</p>`,
                  breakdown: [
                    { line: "mt-3", explanation: "margin-top: 1rem. Scale: 0=0, 1=0.25rem, 2=0.5rem, 3=1rem, 4=1.5rem, 5=3rem." },
                    { line: "px-3", explanation: "padding-left + padding-right = 1rem each." },
                    { line: "d-flex", explanation: "display: flex. Then use justify-content-* and align-items-*." },
                    { line: "fw-bold", explanation: "font-weight: bold." },
                  ]
                }
              ],
              tip: "Don't forget Bootstrap JS bundle for interactive components (navbar toggle, modals, dropdowns)."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n</head>\n<body>\n  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">\n    <div class="container">\n      <a class="navbar-brand fw-bold" href="#">🎓 EduPlatform</a>\n      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">\n        <span class="navbar-toggler-icon"></span>\n      </button>\n      <div class="collapse navbar-collapse" id="nav">\n        <ul class="navbar-nav ms-auto gap-2">\n          <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>\n          <li class="nav-item"><a class="nav-link" href="#">Courses</a></li>\n          <li class="nav-item"><a class="nav-link" href="#">About</a></li>\n        </ul>\n        <a href="#" class="btn btn-light ms-3">Login</a>\n      </div>\n    </div>\n  </nav>\n\n  <div class="container mt-5">\n    <div class="row align-items-center">\n      <div class="col-lg-6">\n        <h1 class="fw-bold display-5">Learn to Build the Web</h1>\n        <p class="text-muted fs-5 mt-3">Master HTML, CSS, Python and Flask with hands-on projects.</p>\n        <div class="d-flex gap-2 mt-4">\n          <button class="btn btn-primary btn-lg">Get Started</button>\n          <button class="btn btn-outline-secondary btn-lg">View Courses</button>\n        </div>\n      </div>\n      <div class="col-lg-6 text-center mt-4 mt-lg-0">\n        <div class="bg-light rounded-4 p-5">\n          <div class="display-1">🚀</div>\n          <p class="text-muted mt-3">Build real projects</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>\n</body>\n</html>`
          }
        ]
      }
    ]
  },

  {
    id: "chartjs",
    name: "Chart.js",
    icon: "📊",
    color: "green",
    chapters: [
      {
        id: "charts-basics",
        title: "Charts & Visualization",
        lessons: [
          {
            id: "chartjs-bar",
            title: "Bar Charts",
            language: "html",
            theory: {
              intro: "Chart.js turns raw data into interactive canvas-based charts. You define a canvas element, create a Chart object, and pass data + config.",
              sections: [
                {
                  heading: "Chart Setup",
                  content: "Every Chart.js chart needs: a canvas element, the library loaded, and a new Chart() call with type, data, and options.",
                  code: `<canvas id="myChart" width="400" height="200"></canvas>\n<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n<script>\nconst ctx = document.getElementById('myChart').getContext('2d');\nnew Chart(ctx, {\n  type: 'bar',\n  data: {\n    labels: ['Jan', 'Feb', 'Mar', 'Apr'],\n    datasets: [{\n      label: 'Sales',\n      data: [65, 82, 90, 74],\n      backgroundColor: 'rgba(59, 130, 246, 0.8)',\n    }]\n  },\n  options: {\n    responsive: true,\n    plugins: {\n      title: { display: true, text: 'Monthly Sales' }\n    }\n  }\n});\n</script>`,
                  breakdown: [
                    { line: "<canvas id='myChart'>", explanation: "Chart.js draws on an HTML canvas. Give it an id to reference in JS." },
                    { line: "getContext('2d')", explanation: "Gets the 2D drawing context. Chart.js needs this to draw." },
                    { line: "type: 'bar'", explanation: "Chart type. Options: 'bar', 'line', 'pie', 'doughnut', 'radar', 'scatter'." },
                    { line: "labels", explanation: "X-axis labels. Each label corresponds to one data point." },
                    { line: "datasets", explanation: "Array of data series. Each dataset is one group of bars." },
                    { line: "data: [65, 82, 90, 74]", explanation: "The actual values. Must match number of labels." },
                    { line: "backgroundColor", explanation: "Fill color. Use rgba() for transparency." },
                  ]
                }
              ],
              tip: "Set responsive: true and Chart.js will resize with its container automatically."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Chart.js</title>\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n</head>\n<body class="bg-light p-4">\n  <div class="container">\n    <h2 class="mb-4">📊 Student Performance Dashboard</h2>\n    <div class="row g-3">\n      <div class="col-lg-8">\n        <div class="card">\n          <div class="card-header fw-semibold">Scores by Subject</div>\n          <div class="card-body">\n            <canvas id="barChart" height="120"></canvas>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-4">\n        <div class="card h-100">\n          <div class="card-header fw-semibold">Grade Distribution</div>\n          <div class="card-body d-flex align-items-center">\n            <canvas id="pieChart"></canvas>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n  <script>\n    new Chart(document.getElementById('barChart'), {\n      type: 'bar',\n      data: {\n        labels: ['Maths', 'Physics', 'Chemistry', 'English', 'CS'],\n        datasets: [{\n          label: 'Score',\n          data: [88, 75, 92, 68, 95],\n          backgroundColor: [\n            'rgba(59,130,246,0.8)',\n            'rgba(16,185,129,0.8)',\n            'rgba(245,158,11,0.8)',\n            'rgba(239,68,68,0.8)',\n            'rgba(139,92,246,0.8)',\n          ]\n        }]\n      },\n      options: {\n        responsive: true,\n        plugins: { legend: { display: false } },\n        scales: { y: { beginAtZero: true, max: 100 } }\n      }\n    });\n\n    new Chart(document.getElementById('pieChart'), {\n      type: 'doughnut',\n      data: {\n        labels: ['A+', 'A', 'B+', 'B'],\n        datasets: [{ data: [5, 12, 8, 3], backgroundColor: ['#3b82f6','#10b981','#f59e0b','#ef4444'] }]\n      }\n    });\n  </script>\n</body>\n</html>`
          },
          {
            id: "chartjs-line",
            title: "Line Charts",
            language: "html",
            theory: {
              intro: "Line charts are ideal for showing trends over time. Chart.js makes them smooth, animated, and interactive.",
              sections: [
                {
                  heading: "Line Chart Config",
                  content: "Same structure as bar chart but type: 'line'. Key properties: tension for smooth curves, fill for area charts.",
                  code: `new Chart(ctx, {\n  type: 'line',\n  data: {\n    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],\n    datasets: [\n      {\n        label: 'Visitors',\n        data: [120, 190, 150, 210, 180],\n        borderColor: '#3b82f6',\n        backgroundColor: 'rgba(59,130,246,0.1)',\n        tension: 0.4,\n        fill: true,\n      },\n      {\n        label: 'Target',\n        data: [150, 150, 150, 150, 150],\n        borderColor: '#ef4444',\n        borderDash: [5, 5],\n        pointRadius: 0,\n      }\n    ]\n  }\n});`,
                  breakdown: [
                    { line: "tension: 0.4", explanation: "Curves the lines. 0 = straight angular. 0.4 = smooth bezier curves." },
                    { line: "fill: true", explanation: "Fills area between line and x-axis with backgroundColor." },
                    { line: "borderDash: [5, 5]", explanation: "Makes a dashed line — good for showing targets/projections." },
                    { line: "pointRadius: 0", explanation: "Hides the dots on each data point." },
                  ]
                }
              ],
              tip: "Use multiple datasets in one chart to compare trends — just add more objects to the datasets array."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Line Chart</title>\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n</head>\n<body class="bg-light p-4">\n  <div class="container">\n    <h2 class="mb-4">📈 Weekly Study Hours Tracker</h2>\n    <div class="card">\n      <div class="card-body">\n        <canvas id="lineChart" height="80"></canvas>\n      </div>\n    </div>\n  </div>\n\n  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n  <script>\n    new Chart(document.getElementById('lineChart'), {\n      type: 'line',\n      data: {\n        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],\n        datasets: [\n          {\n            label: 'Maths',\n            data: [5, 8, 6, 10, 9, 12],\n            borderColor: '#3b82f6',\n            backgroundColor: 'rgba(59,130,246,0.1)',\n            tension: 0.4, fill: true,\n          },\n          {\n            label: 'Python',\n            data: [3, 5, 7, 6, 10, 9],\n            borderColor: '#10b981',\n            backgroundColor: 'rgba(16,185,129,0.1)',\n            tension: 0.4, fill: true,\n          },\n          {\n            label: 'Target',\n            data: [8, 8, 8, 8, 8, 8],\n            borderColor: '#ef4444',\n            borderDash: [5, 5],\n            pointRadius: 0,\n          }\n        ]\n      },\n      options: {\n        responsive: true,\n        plugins: { title: { display: true, text: 'Hours Studied Per Week' } },\n        scales: { y: { beginAtZero: true, title: { display: true, text: 'Hours' } } }\n      }\n    });\n  </script>\n</body>\n</html>`
          }
        ]
      }
    ]
  },

  {
    id: "flask",
    name: "Python Flask",
    icon: "🐍",
    color: "yellow",
    chapters: [
      {
        id: "flask-basics",
        title: "Flask Basics",
        lessons: [
          {
            id: "flask-first-route",
            title: "First Route",
            language: "python",
            theory: {
              intro: "Flask is a micro web framework for Python. A Flask app maps URL paths to Python functions using decorators. Whatever the function returns is sent to the browser.",
              sections: [
                {
                  heading: "The Minimal Flask App",
                  content: "Five lines to create a web server. The decorator @app.route() maps a URL to the function below it.",
                  code: `from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return '<h1>Hello, Flask!</h1>'\n\n@app.route('/about')\ndef about():\n    return '<p>This is the about page.</p>'\n\nif __name__ == '__main__':\n    app.run(debug=True)`,
                  breakdown: [
                    { line: "from flask import Flask", explanation: "Import the Flask class from the flask package." },
                    { line: "app = Flask(__name__)", explanation: "__name__ tells Flask the name of this module, so it finds templates/static files." },
                    { line: "@app.route('/')", explanation: "Decorator — binds the URL '/' to the next function." },
                    { line: "def home():", explanation: "The view function. Runs every time someone visits '/'." },
                    { line: "return '<h1>...</h1>'", explanation: "Flask sends this string as the HTTP response body." },
                    { line: "app.run(debug=True)", explanation: "Starts the dev server on port 5000. debug=True auto-reloads on file changes." },
                  ]
                },
                {
                  heading: "URL Parameters",
                  content: "Capture dynamic parts of the URL using <variable> syntax in the route.",
                  code: `@app.route('/user/<username>')\ndef profile(username):\n    return f'<h1>Profile: {username}</h1>'\n\n@app.route('/item/<int:item_id>')\ndef get_item(item_id):\n    return f'Item #{item_id}'`,
                  breakdown: [
                    { line: "<username>", explanation: "Captures any string at that position and passes it as a function argument." },
                    { line: "<int:item_id>", explanation: "Captures an integer only. Flask returns 404 if non-numeric is passed." },
                  ]
                }
              ],
              tip: "Never run Flask with debug=True in production. Debug mode can expose your code if an error occurs."
            },
            defaultCode: `from flask import Flask\n\napp = Flask(__name__)\n\n# Route 1: Homepage\n@app.route('/')\ndef home():\n    return '<h1>Hello, Flask!</h1>'\n\n# Route 2: Dynamic parameter\n@app.route('/hello/<name>')\ndef greet(name):\n    return f'<h1>Hello, {name}!</h1>'\n\n# Route 3: Integer parameter\n@app.route('/add/<int:a>/<int:b>')\ndef add(a, b):\n    return f'<h2>{a} + {b} = {a + b}</h2>'\n\n# --- Simulate the routes ---\nprint("Flask App Routes:")\nprint("=" * 40)\n\n# Simulate GET /\nprint("GET /  =>", "Hello, Flask!")\n\n# Simulate GET /hello/Priya\nname = "Priya"\nprint(f"GET /hello/{name}  =>", f"Hello, {name}!")\n\n# Simulate GET /add/10/5\na, b = 10, 5\nprint(f"GET /add/{a}/{b}  =>", f"{a} + {b} = {a + b}")\n\nprint()\nprint("To run for real:")\nprint("  pip install flask")\nprint("  python app.py")\nprint("  Open: http://localhost:5000")`
          },
          {
            id: "flask-templates",
            title: "Jinja2 Templates",
            language: "python",
            theory: {
              intro: "Returning HTML strings from Python gets messy fast. Jinja2 templates let you write HTML files with dynamic placeholders. Flask renders them with render_template().",
              sections: [
                {
                  heading: "render_template",
                  content: "Flask looks for templates in a /templates folder. Pass variables as keyword arguments.",
                  code: `from flask import Flask, render_template\napp = Flask(__name__)\n\n@app.route('/student/<name>')\ndef student(name):\n    scores = {'Math': 92, 'Python': 88, 'English': 75}\n    return render_template('student.html',\n                           student_name=name,\n                           scores=scores)`,
                  breakdown: [
                    { line: "from flask import render_template", explanation: "Import the template renderer." },
                    { line: "render_template('student.html', ...)", explanation: "Loads templates/student.html and fills in the variables." },
                    { line: "student_name=name", explanation: "Passes Python variable 'name' to the template as 'student_name'." },
                  ]
                },
                {
                  heading: "Jinja2 Syntax",
                  content: "Templates use {{ }} for variables and {% %} for logic like loops and conditionals.",
                  code: `<!-- templates/student.html -->\n<h1>{{ student_name }}'s Report</h1>\n\n{% for subject, score in scores.items() %}\n  <p>\n    {{ subject }}: <strong>{{ score }}</strong>\n    {% if score >= 90 %}\n      🏆 Excellent!\n    {% elif score >= 75 %}\n      ✅ Good\n    {% else %}\n      📚 Needs work\n    {% endif %}\n  </p>\n{% endfor %}`,
                  breakdown: [
                    { line: "{{ student_name }}", explanation: "Outputs the variable value. Jinja2 auto-escapes HTML for security." },
                    { line: "{% for x in y %}", explanation: "Loop block. Must close with {% endfor %}." },
                    { line: "scores.items()", explanation: "Jinja2 lets you call Python methods on variables." },
                    { line: "{% if score >= 90 %}", explanation: "Conditional block. Must close with {% endif %}." },
                  ]
                }
              ],
              tip: "Use template inheritance with {% extends 'base.html' %} to share navbar/footer across all pages."
            },
            defaultCode: `# Simulating Jinja2 template rendering in pure Python\n\ndef render_report(name, scores):\n    """Mimics what a Jinja2 template would output"""\n    lines = [f"=== {name}'s Report Card ==="]\n    for subject, score in scores.items():\n        if score >= 90:\n            badge = "🏆 Excellent"\n        elif score >= 75:\n            badge = "✅ Good"\n        else:\n            badge = "📚 Needs work"\n        lines.append(f"  {subject:12s}: {score:3d}  {badge}")\n    avg = sum(scores.values()) / len(scores)\n    lines.append(f"  {'Average':12s}: {avg:.1f}")\n    return "\\n".join(lines)\n\n# Student data (in Flask this comes from a database)\nstudents = [\n    ("Priya Sharma",  {"Math": 95, "Python": 88, "English": 72, "Stats": 91}),\n    ("Rahul Verma",   {"Math": 78, "Python": 92, "English": 85, "Stats": 67}),\n    ("Ananya Roy",    {"Math": 65, "Python": 71, "English": 90, "Stats": 83}),\n]\n\nfor name, scores in students:\n    print(render_report(name, scores))\n    print()`
          },
          {
            id: "flask-forms",
            title: "Handling Forms",
            language: "python",
            theory: {
              intro: "When a user submits an HTML form with method='POST', Flask receives the data in request.form. You check the method and process accordingly.",
              sections: [
                {
                  heading: "GET vs POST in Flask",
                  content: "A route handling a form needs to accept both GET (show the form) and POST (process it).",
                  code: `from flask import Flask, request, redirect, url_for\napp = Flask(__name__)\n\nstudents = []\n\n@app.route('/add', methods=['GET', 'POST'])\ndef add_student():\n    if request.method == 'POST':\n        name  = request.form['name']\n        grade = request.form['grade']\n        students.append({'name': name, 'grade': grade})\n        return redirect(url_for('list_students'))\n    return render_template('add_form.html')\n\n@app.route('/students')\ndef list_students():\n    return render_template('list.html', students=students)`,
                  breakdown: [
                    { line: "methods=['GET', 'POST']", explanation: "By default Flask only allows GET. Must explicitly allow POST." },
                    { line: "request.method == 'POST'", explanation: "Check how the request arrived. POST = form was submitted." },
                    { line: "request.form['name']", explanation: "Gets the value of input with name='name' from the submitted form." },
                    { line: "redirect(url_for(...))", explanation: "After saving, redirect to prevent duplicate submissions on refresh (PRG pattern)." },
                  ]
                }
              ],
              tip: "Always redirect after POST (Post-Redirect-Get pattern). Without it, refreshing re-submits the form."
            },
            defaultCode: `# Simulating Flask form validation\n\ndef simulate_registration(form_data):\n    """Mimics Flask route: POST /register"""\n    errors = []\n    name  = form_data.get('name', '').strip()\n    email = form_data.get('email', '').strip()\n    course = form_data.get('course', '').strip()\n\n    if not name:\n        errors.append("Name is required")\n    if not email or '@' not in email:\n        errors.append("Valid email is required")\n    if not course:\n        errors.append("Please select a course")\n    if len(name) < 2:\n        errors.append("Name must be at least 2 characters")\n\n    if errors:\n        return {"ok": False, "errors": errors}\n    return {"ok": True, "student": {"name": name, "email": email, "course": course}}\n\n# Test form submissions\nsubmissions = [\n    {"name": "Priya Sharma", "email": "priya@iitm.ac.in", "course": "BSc DS"},\n    {"name": "", "email": "not-an-email", "course": ""},\n    {"name": "Rahul", "email": "rahul@iitm.ac.in", "course": "Diploma"},\n]\n\nprint("POST /register — Form Handler Simulation")\nprint("=" * 45)\nfor i, form in enumerate(submissions, 1):\n    result = simulate_registration(form)\n    print(f"\\nSubmission #{i}: {form}")\n    if result['ok']:\n        s = result['student']\n        print(f"  ✅ 302 REDIRECT → /students")\n        print(f"     Saved: {s['name']} | {s['course']}")\n    else:\n        print(f"  ❌ 400 BAD REQUEST")\n        for err in result['errors']:\n            print(f"     - {err}")`
          }
        ]
      }
    ]
  },

  {
    id: "sqlite",
    name: "SQLite DB",
    icon: "🗄️",
    color: "blue",
    chapters: [
      {
        id: "sql-basics",
        title: "SQL Fundamentals",
        lessons: [
          {
            id: "sql-create-insert",
            title: "CREATE TABLE & INSERT",
            language: "sql",
            theory: {
              intro: "SQL (Structured Query Language) is how you talk to a database. SQLite is a file-based database — no server needed, perfect for Flask apps.",
              sections: [
                {
                  heading: "CREATE TABLE",
                  content: "Defines the schema — the structure of your data. Each column has a name and a data type.",
                  code: `CREATE TABLE students (\n    id      INTEGER PRIMARY KEY AUTOINCREMENT,\n    name    TEXT NOT NULL,\n    email   TEXT UNIQUE NOT NULL,\n    course  TEXT NOT NULL,\n    score   REAL DEFAULT 0.0,\n    joined  TEXT DEFAULT CURRENT_DATE\n);`,
                  breakdown: [
                    { line: "INTEGER PRIMARY KEY AUTOINCREMENT", explanation: "id is a unique integer that auto-increments. SQLite handles it automatically." },
                    { line: "TEXT NOT NULL", explanation: "TEXT = any string. NOT NULL = this column cannot be empty." },
                    { line: "TEXT UNIQUE NOT NULL", explanation: "UNIQUE = no two rows can have the same value." },
                    { line: "REAL DEFAULT 0.0", explanation: "REAL = decimal number. DEFAULT = value used if not specified in INSERT." },
                  ]
                },
                {
                  heading: "INSERT INTO",
                  content: "Adds rows to a table. You can insert one row or many rows at once.",
                  code: `INSERT INTO students (name, email, course, score)\nVALUES ('Priya Sharma', 'priya@iitm.ac.in', 'BSc DS', 92.5);\n\nINSERT INTO students (name, email, course, score) VALUES\n  ('Rahul Verma', 'rahul@iitm.ac.in', 'Diploma', 78.0),\n  ('Ananya Roy',  'ananya@iitm.ac.in', 'BSc DS',  88.5);`,
                  breakdown: [
                    { line: "INSERT INTO students (col1, col2)", explanation: "Specify which columns you're filling. Omitted columns use DEFAULT values." },
                    { line: "VALUES (...)", explanation: "Values must match the column order listed after the table name." },
                    { line: "Multiple rows with commas", explanation: "Inserting many rows in one statement is faster than separate INSERTs." },
                  ]
                }
              ],
              tip: "SQLite data types are flexible — TEXT can store anything. But use INTEGER/REAL for numbers you'll do math on."
            },
            defaultCode: `-- CREATE the students table\nCREATE TABLE IF NOT EXISTS students (\n    id     INTEGER PRIMARY KEY AUTOINCREMENT,\n    name   TEXT NOT NULL,\n    email  TEXT UNIQUE NOT NULL,\n    course TEXT NOT NULL,\n    score  REAL DEFAULT 0.0\n);\n\n-- INSERT student records\nINSERT INTO students (name, email, course, score) VALUES\n  ('Priya Sharma',  'priya@iitm.ac.in',   'BSc DS',  92.5),\n  ('Rahul Verma',   'rahul@iitm.ac.in',   'Diploma', 78.0),\n  ('Ananya Roy',    'ananya@iitm.ac.in',  'BSc DS',  88.5),\n  ('Dev Patel',     'dev@iitm.ac.in',     'Diploma', 65.0),\n  ('Meera Nair',    'meera@iitm.ac.in',   'BSc DS',  95.0),\n  ('Arjun Singh',   'arjun@iitm.ac.in',   'Diploma', 71.5);\n\n-- View all records\nSELECT * FROM students;`
          },
          {
            id: "sql-select",
            title: "SELECT Queries",
            language: "sql",
            theory: {
              intro: "SELECT is the most important SQL command — it retrieves data. You can filter, sort, limit, and aggregate results.",
              sections: [
                {
                  heading: "Basic SELECT",
                  content: "SELECT column(s) FROM table. Use * for all columns. Add ORDER BY to sort, LIMIT to cap results.",
                  code: `SELECT * FROM students;\n\nSELECT name, course, score \nFROM students \nORDER BY score DESC;\n\nSELECT name, score \nFROM students \nORDER BY score DESC \nLIMIT 3;`,
                  breakdown: [
                    { line: "SELECT *", explanation: "Returns every column. Avoid in production code (slow, fragile)." },
                    { line: "ORDER BY score DESC", explanation: "DESC = highest first. ASC = lowest first (default)." },
                    { line: "LIMIT 3", explanation: "Return only the first 3 rows after ordering." },
                  ]
                },
                {
                  heading: "WHERE & Aggregates",
                  content: "WHERE filters rows. Aggregate functions summarize data.",
                  code: `SELECT name, score FROM students\nWHERE score >= 80 AND course = 'BSc DS';\n\nSELECT \n  COUNT(*) AS total,\n  ROUND(AVG(score), 1) AS avg_score,\n  MAX(score) AS top_score\nFROM students;\n\nSELECT course, COUNT(*) AS count, \n       ROUND(AVG(score),1) AS avg\nFROM students\nGROUP BY course;`,
                  breakdown: [
                    { line: "WHERE score >= 80", explanation: "Filters rows. Uses =, !=, <, >, <=, >=." },
                    { line: "AND / OR", explanation: "Combine conditions. AND requires both. OR requires either." },
                    { line: "COUNT(*)", explanation: "Counts all rows. COUNT(column) skips NULLs." },
                    { line: "AVG(score)", explanation: "Average of all score values in the result." },
                    { line: "GROUP BY course", explanation: "Groups rows with same course, then aggregates within each group." },
                  ]
                }
              ],
              tip: "Always test queries on a copy of data first. A bad UPDATE/DELETE without WHERE affects ALL rows."
            },
            defaultCode: `CREATE TABLE IF NOT EXISTS students (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    name TEXT, course TEXT, score REAL\n);\nINSERT OR IGNORE INTO students (id, name, course, score) VALUES\n  (1, 'Priya Sharma', 'BSc DS',  92.5),\n  (2, 'Rahul Verma',  'Diploma', 78.0),\n  (3, 'Ananya Roy',   'BSc DS',  88.5),\n  (4, 'Dev Patel',    'Diploma', 65.0),\n  (5, 'Meera Nair',   'BSc DS',  95.0),\n  (6, 'Arjun Singh',  'Diploma', 71.5);\n\n-- All students sorted by score\nSELECT name, course, score \nFROM students \nORDER BY score DESC;\n\n-- Uncomment to try other queries:\n-- SELECT name, score FROM students WHERE score >= 80;\n-- SELECT course, COUNT(*) as total, ROUND(AVG(score),1) as avg FROM students GROUP BY course;`
          },
          {
            id: "sql-update-delete",
            title: "UPDATE, DELETE & Flask",
            language: "sql",
            theory: {
              intro: "UPDATE modifies existing rows. DELETE removes them. Both are dangerous without WHERE. In Flask, always use parameterized queries to prevent SQL injection.",
              sections: [
                {
                  heading: "UPDATE & DELETE",
                  content: "Always include WHERE unless you intentionally want to affect every row.",
                  code: `-- Update one student\nUPDATE students\nSET score = 95.0\nWHERE id = 4;\n\n-- Update multiple columns\nUPDATE students\nSET score = 88.0, course = 'BSc DS'\nWHERE id = 4;\n\n-- Delete a row\nDELETE FROM students\nWHERE id = 6;\n\n-- WARNING: Deletes ALL rows!\n-- DELETE FROM students;`,
                  breakdown: [
                    { line: "SET score = 95.0", explanation: "Sets the score column to 95.0 for matched rows." },
                    { line: "WHERE id = 4", explanation: "Limits update to row with id=4. Without WHERE: updates ALL rows." },
                    { line: "DELETE FROM students WHERE id = 6", explanation: "Removes only the row with id=6." },
                  ]
                },
                {
                  heading: "Flask + SQLite (Safe)",
                  content: "Use ? placeholders for user input — NEVER f-strings. This prevents SQL injection.",
                  code: `import sqlite3\n\ndef get_student(student_id):\n    db = sqlite3.connect('students.db')\n    db.row_factory = sqlite3.Row\n    \n    # SAFE: parameterized query\n    student = db.execute(\n        'SELECT * FROM students WHERE id = ?',\n        (student_id,)\n    ).fetchone()\n    db.close()\n    return student\n\n# NEVER do this — SQL injection vulnerability:\n# db.execute(f'SELECT * WHERE id = {student_id}')`,
                  breakdown: [
                    { line: "sqlite3.connect('students.db')", explanation: "Creates/opens a .db file in the current directory." },
                    { line: "db.row_factory = sqlite3.Row", explanation: "Lets you access results as row['name'] instead of row[0]." },
                    { line: "'SELECT ... WHERE id = ?'", explanation: "? is a safe placeholder. sqlite3 escapes the value." },
                    { line: "(student_id,)", explanation: "Tuple of values for ?. Always a tuple, even for one value." },
                  ]
                }
              ],
              tip: "Never use string concatenation or f-strings to build SQL with user input. Always use ? placeholders."
            },
            defaultCode: `CREATE TABLE IF NOT EXISTS students (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    name TEXT, course TEXT, score REAL\n);\nINSERT OR IGNORE INTO students (id, name, course, score) VALUES\n  (1, 'Priya Sharma', 'BSc DS',  92.5),\n  (2, 'Rahul Verma',  'Diploma', 78.0),\n  (3, 'Ananya Roy',   'BSc DS',  88.5),\n  (4, 'Dev Patel',    'Diploma', 65.0),\n  (5, 'Meera Nair',   'BSc DS',  95.0);\n\n-- Check before update\nSELECT 'BEFORE' as op, name, score FROM students WHERE id = 4;\n\n-- Update Dev's score\nUPDATE students SET score = 82.0 WHERE id = 4;\n\n-- Check after update\nSELECT 'AFTER' as op, name, score FROM students WHERE id = 4;\n\n-- Show full table\nSELECT * FROM students ORDER BY score DESC;\n\n-- Try: DELETE FROM students WHERE score < 75;\n-- Then: SELECT * FROM students;`
          }
        ]
      }
    ]
  },

  {
    id: "projects",
    name: "Mini Projects",
    icon: "🚀",
    color: "pink",
    chapters: [
      {
        id: "projects-list",
        title: "Build Real Apps",
        lessons: [
          {
            id: "project-portfolio",
            title: "Project 1: Portfolio Page",
            language: "html",
            theory: {
              intro: "Build a personal portfolio page using HTML5 semantic elements, Bootstrap grid, and your own CSS. This consolidates everything from the HTML and Bootstrap tracks.",
              sections: [
                {
                  heading: "Structure Overview",
                  content: "A complete single-page portfolio: sticky navbar, hero section, skills grid, project cards, and a contact form.",
                  code: `<body>\n  <nav class="navbar ...">     <!-- Sticky Bootstrap navbar  -->\n  <header id="hero">           <!-- Full-viewport hero      -->\n  <section id="skills">        <!-- Bootstrap card grid     -->\n  <section id="projects">      <!-- 3 project cards         -->\n  <section id="contact">       <!-- HTML form               -->\n  <footer>                     <!-- Footer                  -->\n</body>`,
                  breakdown: [
                    { line: "<nav> with fixed-top", explanation: "Sticky navbar with #id anchor links that scroll to sections." },
                    { line: "<header id='hero'>", explanation: "Full-viewport intro with gradient background, name, title, CTA buttons." },
                    { line: "<section id='skills'>", explanation: "Bootstrap row grid of skill cards with progress bars." },
                    { line: "<section id='projects'>", explanation: "Three project cards with tech badges and hover effects." },
                    { line: "<section id='contact'>", explanation: "Bootstrap-styled form with name, email, message fields." },
                  ]
                }
              ],
              tip: "Add smooth scrolling: html { scroll-behavior: smooth; } — then #id anchor links animate instead of jump."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Portfolio</title>\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n  <style>\n    html { scroll-behavior: smooth; }\n    #hero { background: linear-gradient(135deg, #1e3a5f, #3b82f6); min-height: 100vh; display: flex; align-items: center; color: white; }\n    .project-card { transition: transform 0.2s, box-shadow 0.2s; }\n    .project-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.15); }\n    section { padding: 80px 0; }\n    footer { background: #1e293b; color: #94a3b8; }\n  </style>\n</head>\n<body>\n  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">\n    <div class="container">\n      <a class="navbar-brand fw-bold" href="#hero">Priya Sharma</a>\n      <div class="navbar-nav ms-auto d-flex flex-row gap-3">\n        <a class="nav-link" href="#skills">Skills</a>\n        <a class="nav-link" href="#projects">Projects</a>\n        <a class="nav-link" href="#contact">Contact</a>\n      </div>\n    </div>\n  </nav>\n\n  <header id="hero">\n    <div class="container">\n      <p class="text-info fw-semibold mb-2">👋 Hello, I'm</p>\n      <h1 class="display-3 fw-bold mb-3">Priya Sharma</h1>\n      <h2 class="h4 text-light opacity-75 mb-4">BSc Data Science @ IITM</h2>\n      <p class="lead opacity-80 mb-5 col-lg-7">Building data-driven web apps with Python, Flask and a love for clean code.</p>\n      <div class="d-flex gap-3">\n        <a href="#projects" class="btn btn-light btn-lg px-4">View Projects</a>\n        <a href="#contact" class="btn btn-outline-light btn-lg px-4">Hire Me</a>\n      </div>\n    </div>\n  </header>\n\n  <section id="skills" class="bg-light">\n    <div class="container text-center">\n      <h2 class="fw-bold mb-2">Skills</h2>\n      <p class="text-muted mb-5">Technologies I work with</p>\n      <div class="row g-3 justify-content-center">\n        <div class="col-md-3 col-6"><div class="card border-0 shadow-sm p-3"><div class="fs-1 mb-2">🐍</div><h6 class="fw-bold">Python</h6><div class="progress mt-2" style="height:6px"><div class="progress-bar bg-warning" style="width:85%"></div></div></div></div>\n        <div class="col-md-3 col-6"><div class="card border-0 shadow-sm p-3"><div class="fs-1 mb-2">🌐</div><h6 class="fw-bold">HTML/CSS</h6><div class="progress mt-2" style="height:6px"><div class="progress-bar bg-primary" style="width:90%"></div></div></div></div>\n        <div class="col-md-3 col-6"><div class="card border-0 shadow-sm p-3"><div class="fs-1 mb-2">🗄️</div><h6 class="fw-bold">SQLite</h6><div class="progress mt-2" style="height:6px"><div class="progress-bar bg-success" style="width:75%"></div></div></div></div>\n        <div class="col-md-3 col-6"><div class="card border-0 shadow-sm p-3"><div class="fs-1 mb-2">📊</div><h6 class="fw-bold">Chart.js</h6><div class="progress mt-2" style="height:6px"><div class="progress-bar bg-info" style="width:70%"></div></div></div></div>\n      </div>\n    </div>\n  </section>\n\n  <section id="projects">\n    <div class="container">\n      <h2 class="fw-bold text-center mb-2">Projects</h2>\n      <p class="text-muted text-center mb-5">Things I've built</p>\n      <div class="row g-4">\n        <div class="col-md-4"><div class="card project-card h-100 border-0 shadow"><div class="card-body"><div class="fs-2 mb-3">📈</div><h5 class="fw-bold">Student Dashboard</h5><p class="text-muted">Flask + SQLite app with Chart.js visualizations.</p><div class="mt-3"><span class="badge bg-primary me-1">Flask</span><span class="badge bg-success me-1">SQLite</span><span class="badge bg-info">Chart.js</span></div></div><div class="card-footer bg-transparent border-0"><a href="#" class="btn btn-outline-primary btn-sm">View</a></div></div></div>\n        <div class="col-md-4"><div class="card project-card h-100 border-0 shadow"><div class="card-body"><div class="fs-2 mb-3">🤖</div><h5 class="fw-bold">ML Price Predictor</h5><p class="text-muted">House price prediction with linear regression and Bootstrap UI.</p><div class="mt-3"><span class="badge bg-warning text-dark me-1">Python</span><span class="badge bg-secondary">Bootstrap</span></div></div><div class="card-footer bg-transparent border-0"><a href="#" class="btn btn-outline-primary btn-sm">View</a></div></div></div>\n        <div class="col-md-4"><div class="card project-card h-100 border-0 shadow"><div class="card-body"><div class="fs-2 mb-3">📋</div><h5 class="fw-bold">Todo REST API</h5><p class="text-muted">RESTful API with Flask and SQLite. Full CRUD + JSON responses.</p><div class="mt-3"><span class="badge bg-danger me-1">REST API</span><span class="badge bg-primary">Flask</span></div></div><div class="card-footer bg-transparent border-0"><a href="#" class="btn btn-outline-primary btn-sm">View</a></div></div></div>\n      </div>\n    </div>\n  </section>\n\n  <section id="contact" class="bg-light">\n    <div class="container"><div class="row justify-content-center"><div class="col-lg-6">\n      <h2 class="fw-bold text-center mb-2">Get In Touch</h2>\n      <p class="text-muted text-center mb-4">Let's work together</p>\n      <div class="card border-0 shadow p-4">\n        <div class="mb-3"><label class="form-label fw-semibold">Name</label><input type="text" class="form-control" placeholder="Your name"></div>\n        <div class="mb-3"><label class="form-label fw-semibold">Email</label><input type="email" class="form-control" placeholder="your@email.com"></div>\n        <div class="mb-3"><label class="form-label fw-semibold">Message</label><textarea class="form-control" rows="4" placeholder="Tell me about your project..."></textarea></div>\n        <button class="btn btn-primary w-100">Send Message 🚀</button>\n      </div>\n    </div></div></div>\n  </section>\n\n  <footer class="py-4 text-center">\n    <p class="mb-0">Built with HTML5, Bootstrap & ❤️ by Priya Sharma</p>\n  </footer>\n  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>\n</body>\n</html>`
          },
          {
            id: "project-dashboard",
            title: "Project 2: Student Dashboard",
            language: "html",
            theory: {
              intro: "Build a data dashboard combining Bootstrap layout, Chart.js visualizations, and a data table — exactly what a Flask + SQLite backend would power.",
              sections: [
                {
                  heading: "Dashboard Layout",
                  content: "An admin-style dashboard: fixed sidebar, KPI stat cards, bar+doughnut charts, and a data table.",
                  code: `<div class="d-flex">\n  <nav class="sidebar bg-dark">  <!-- Fixed sidebar -->\n  <main class="flex-grow-1 p-4">\n    <div class="row g-3">         <!-- KPI cards -->\n    <div class="row g-3">\n      <div class="col-lg-8">      <!-- Bar chart -->\n      <div class="col-lg-4">      <!-- Doughnut  -->\n    <div class="card">            <!-- Data table -->\n  </main>\n</div>`,
                  breakdown: [
                    { line: "d-flex on wrapper", explanation: "Makes sidebar and main content sit side by side." },
                    { line: "flex-grow-1 on main", explanation: "Main fills remaining width after the fixed-width sidebar." },
                    { line: "row g-3 for KPIs", explanation: "4-column grid for stat cards with spacing." },
                    { line: "col-lg-8 / col-lg-4", explanation: "Charts split 2/3 and 1/3 on large screens." },
                  ]
                }
              ],
              tip: "Real dashboards fetch from JSON APIs. In Flask: return jsonify(data) from a route, then fetch() it in JS to populate charts."
            },
            defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Student Dashboard</title>\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n  <style>\n    body { background: #f1f5f9; }\n    .sidebar { width: 220px; min-height: 100vh; background: #1e293b; flex-shrink: 0; }\n    .sidebar .nav-link { color: #94a3b8; padding: 10px 20px; border-radius: 6px; margin: 2px 8px; }\n    .sidebar .nav-link:hover, .sidebar .nav-link.active { color: white; background: #334155; }\n    .sidebar .brand { color: white; font-weight: 700; padding: 20px; border-bottom: 1px solid #334155; }\n  </style>\n</head>\n<body>\n  <div class="d-flex">\n    <nav class="sidebar">\n      <div class="brand">🎓 EduAdmin</div>\n      <ul class="nav flex-column mt-3">\n        <li><a class="nav-link active" href="#">📊 Dashboard</a></li>\n        <li><a class="nav-link" href="#">👨‍🎓 Students</a></li>\n        <li><a class="nav-link" href="#">📚 Courses</a></li>\n        <li><a class="nav-link" href="#">📝 Exams</a></li>\n      </ul>\n    </nav>\n    <main class="flex-grow-1 p-4">\n      <div class="d-flex justify-content-between align-items-center mb-4">\n        <div><h4 class="fw-bold mb-0">Dashboard</h4><small class="text-muted">Term 3, 2024</small></div>\n        <button class="btn btn-primary btn-sm">+ Add Student</button>\n      </div>\n      <div class="row g-3 mb-4">\n        <div class="col-sm-6 col-xl-3"><div class="card p-3" style="border-left:4px solid #3b82f6"><div class="text-muted small">Total Students</div><div class="fs-3 fw-bold text-primary">248</div><div class="text-success small">↑ 12% this term</div></div></div>\n        <div class="col-sm-6 col-xl-3"><div class="card p-3" style="border-left:4px solid #10b981"><div class="text-muted small">Pass Rate</div><div class="fs-3 fw-bold text-success">87.5%</div><div class="text-success small">↑ 3.2% vs last</div></div></div>\n        <div class="col-sm-6 col-xl-3"><div class="card p-3" style="border-left:4px solid #f59e0b"><div class="text-muted small">Avg Score</div><div class="fs-3 fw-bold text-warning">76.4</div><div class="text-muted small">Out of 100</div></div></div>\n        <div class="col-sm-6 col-xl-3"><div class="card p-3" style="border-left:4px solid #ef4444"><div class="text-muted small">At Risk</div><div class="fs-3 fw-bold text-danger">31</div><div class="text-danger small">Score below 50</div></div></div>\n      </div>\n      <div class="row g-3 mb-4">\n        <div class="col-lg-8"><div class="card"><div class="card-header fw-semibold">Scores by Subject</div><div class="card-body"><canvas id="barChart" height="100"></canvas></div></div></div>\n        <div class="col-lg-4"><div class="card h-100"><div class="card-header fw-semibold">Grade Split</div><div class="card-body d-flex align-items-center justify-content-center"><canvas id="donut" style="max-height:200px"></canvas></div></div></div>\n      </div>\n      <div class="card"><div class="card-header fw-semibold">Recent Students</div>\n        <div class="card-body p-0"><table class="table table-hover mb-0">\n          <thead class="table-light"><tr><th>Name</th><th>Course</th><th>Score</th><th>Grade</th><th>Status</th></tr></thead>\n          <tbody>\n            <tr><td>Priya Sharma</td><td>BSc DS</td><td>92</td><td><span class="badge bg-success">A+</span></td><td><span class="badge bg-success">Active</span></td></tr>\n            <tr><td>Rahul Verma</td><td>Diploma</td><td>78</td><td><span class="badge bg-primary">B+</span></td><td><span class="badge bg-success">Active</span></td></tr>\n            <tr><td>Ananya Roy</td><td>BSc DS</td><td>88</td><td><span class="badge bg-success">A</span></td><td><span class="badge bg-success">Active</span></td></tr>\n            <tr><td>Dev Patel</td><td>Diploma</td><td>45</td><td><span class="badge bg-danger">F</span></td><td><span class="badge bg-danger">At Risk</span></td></tr>\n            <tr><td>Meera Nair</td><td>BSc DS</td><td>95</td><td><span class="badge bg-success">A+</span></td><td><span class="badge bg-success">Active</span></td></tr>\n          </tbody>\n        </table></div>\n      </div>\n    </main>\n  </div>\n  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>\n  <script>\n    new Chart(document.getElementById('barChart'), {\n      type: 'bar',\n      data: {\n        labels: ['Maths', 'Python', 'Stats', 'English', 'Physics'],\n        datasets: [\n          { label: 'Class Avg', data: [72, 85, 68, 78, 62], backgroundColor: '#3b82f6' },\n          { label: 'Top Score', data: [98, 100, 95, 92, 90], backgroundColor: '#10b981' }\n        ]\n      },\n      options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } }\n    });\n    new Chart(document.getElementById('donut'), {\n      type: 'doughnut',\n      data: { labels: ['A/A+','B/B+','C/C+','Fail'], datasets: [{ data: [42,35,15,8], backgroundColor: ['#10b981','#3b82f6','#f59e0b','#ef4444'], borderWidth: 0 }] },\n      options: { cutout: '65%', plugins: { legend: { position: 'bottom' } } }\n    });\n  </script>\n</body>\n</html>`
          }
        ]
      }
    ]
  },
  /* ──────────────────────────────────────────────────────── PDSA ── */
  {
    id: "pdsa",
    name: "PDSA",
    icon: "🧩",
    color: "teal",
    chapters: [
      {
        id: "pdsa-linear",
        title: "Linear Data Structures",
        lessons: [
          {
            id: "pdsa-stack",
            title: "Stack",
            language: "python",
            theory: {
              intro: "A Stack is a linear data structure that follows the LIFO principle — Last In, First Out. Think of a stack of plates: you can only add or remove from the top. Stacks power undo/redo, browser history, function call management, and expression evaluation.",
              sections: [
                {
                  heading: "Core Operations",
                  content: "A stack needs exactly four operations. Everything else is built on these.",
                  code: `class Stack:\n    def __init__(self):\n        self._data = []          # internal list\n\n    def push(self, item):       # add to top\n        self._data.append(item)\n\n    def pop(self):              # remove from top\n        if self.is_empty():\n            raise IndexError("pop from empty stack")\n        return self._data.pop()\n\n    def peek(self):             # look at top without removing\n        if self.is_empty():\n            raise IndexError("peek from empty stack")\n        return self._data[-1]\n\n    def is_empty(self):\n        return len(self._data) == 0\n\n    def size(self):\n        return len(self._data)`,
                  breakdown: [
                    { line: "self._data = []", explanation: "We back the stack with a Python list. The END of the list is the top of the stack." },
                    { line: "push → append()", explanation: "list.append() adds to the end (our top) in O(1) amortised time." },
                    { line: "pop → list.pop()", explanation: "list.pop() removes the last element — O(1). Raises IndexError on empty stack." },
                    { line: "peek → self._data[-1]", explanation: "Negative index −1 reads the last element without removing it." },
                    { line: "is_empty", explanation: "Always guard pop/peek with is_empty to avoid crashes on an empty stack." },
                  ]
                },
                {
                  heading: "Balanced Parentheses — Classic Stack Problem",
                  content: "Given a string of brackets, check if every opening bracket has a matching closing bracket in the right order. This is the canonical interview problem for stacks.",
                  code: `def is_balanced(s):\n    stack = Stack()\n    pairs = {')': '(', ']': '[', '}': '{'}\n\n    for ch in s:\n        if ch in '([{':\n            stack.push(ch)\n        elif ch in ')]}':\n            if stack.is_empty() or stack.pop() != pairs[ch]:\n                return False\n    return stack.is_empty()\n\nprint(is_balanced("({[]})"))   # True\nprint(is_balanced("([)]"))     # False\nprint(is_balanced("{"))        # False`,
                  breakdown: [
                    { line: "pairs = {')': '(',...}", explanation: "Maps each closing bracket to its expected opening pair." },
                    { line: "stack.push(ch)", explanation: "When we see an opener, push it — we expect a matching closer later." },
                    { line: "stack.pop() != pairs[ch]", explanation: "When we see a closer, pop the top and check it matches. If not — unbalanced." },
                    { line: "return stack.is_empty()", explanation: "After scanning all chars, the stack must be empty (all openers were closed)." },
                  ]
                },
                {
                  heading: "Time & Space Complexity",
                  content: "All stack operations are constant time when backed by a Python list.",
                  code: `# Operation  | Time  | Reason\n# -----------|-------|--------------------------------\n# push()     | O(1)  | list.append() amortised O(1)\n# pop()      | O(1)  | list.pop() from end\n# peek()     | O(1)  | index into last element\n# is_empty() | O(1)  | len() is O(1)\n# size()     | O(1)  | len() is O(1)\n#\n# Space: O(n) where n = number of elements`,
                  breakdown: []
                }
              ],
              tip: "Python's built-in list already works as a stack (append/pop). Writing a class around it adds clarity and enforces the LIFO contract — no random access."
            },
            defaultCode: `class Stack:\n    def __init__(self):\n        self._data = []\n\n    def push(self, item):\n        self._data.append(item)\n\n    def pop(self):\n        if self.is_empty():\n            raise IndexError("pop from empty stack")\n        return self._data.pop()\n\n    def peek(self):\n        if self.is_empty():\n            raise IndexError("peek from empty stack")\n        return self._data[-1]\n\n    def is_empty(self):\n        return len(self._data) == 0\n\n    def size(self):\n        return len(self._data)\n\n    def __repr__(self):\n        return f"Stack({self._data} <- top)"\n\n\n# ── Demo ──\ns = Stack()\nfor val in [10, 20, 30, 40]:\n    s.push(val)\nprint("After pushes:", s)\nprint("Peek:", s.peek())\nprint("Pop:", s.pop())\nprint("After pop:", s)\nprint("Size:", s.size())\n\n# Balanced parentheses\ndef is_balanced(expr):\n    stack = Stack()\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in expr:\n        if ch in '([{':\n            stack.push(ch)\n        elif ch in ')]}':  \n            if stack.is_empty() or stack.pop() != pairs[ch]:\n                return False\n    return stack.is_empty()\n\nprint("\\nBalanced checks:")\nfor expr in ["({[]})", "([)]", "{[}"]:\n    print(f"  {expr!r:10s} → {is_balanced(expr)}")`
          },
          {
            id: "pdsa-queue",
            title: "Queue",
            language: "python",
            theory: {
              intro: "A Queue is a linear data structure that follows the FIFO principle — First In, First Out. Like a real-world queue at a ticket counter: the person who arrives first gets served first. Queues power CPU scheduling, print spooling, BFS graph traversal, and message brokers.",
              sections: [
                {
                  heading: "Core Operations",
                  content: "A queue adds at the rear and removes from the front. Using collections.deque gives O(1) on both ends — a plain list would give O(n) dequeues.",
                  code: `from collections import deque\n\nclass Queue:\n    def __init__(self):\n        self._data = deque()     # double-ended queue\n\n    def enqueue(self, item):    # add to rear\n        self._data.append(item)\n\n    def dequeue(self):          # remove from front\n        if self.is_empty():\n            raise IndexError("dequeue from empty queue")\n        return self._data.popleft()\n\n    def front(self):            # peek at front\n        if self.is_empty():\n            raise IndexError("front of empty queue")\n        return self._data[0]\n\n    def is_empty(self):\n        return len(self._data) == 0\n\n    def size(self):\n        return len(self._data)`,
                  breakdown: [
                    { line: "from collections import deque", explanation: "deque (double-ended queue) supports O(1) append at right and popleft at left — unlike list which is O(n) for popleft." },
                    { line: "enqueue → append()", explanation: "Adds to the right (rear). O(1)." },
                    { line: "dequeue → popleft()", explanation: "Removes from the left (front). O(1) with deque, O(n) with plain list." },
                    { line: "front → self._data[0]", explanation: "Peeks at the front element without removing it." },
                  ]
                },
                {
                  heading: "BFS with a Queue",
                  content: "Breadth-First Search (BFS) explores a graph level by level. The queue guarantees we visit nearer nodes before farther ones.",
                  code: `from collections import deque\n\ndef bfs(graph, start):\n    visited = set()\n    queue = deque([start])\n    order = []\n\n    while queue:\n        node = queue.popleft()        # process front node\n        if node in visited:\n            continue\n        visited.add(node)\n        order.append(node)\n        for neighbour in graph[node]:  # add unvisited neighbours\n            if neighbour not in visited:\n                queue.append(neighbour)\n\n    return order\n\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['D', 'E'],\n    'C': ['F'],\n    'D': [], 'E': [], 'F': []\n}\nprint(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D', 'E', 'F']`,
                  breakdown: [
                    { line: "queue = deque([start])", explanation: "Initialise queue with the starting node." },
                    { line: "node = queue.popleft()", explanation: "Always process the oldest (front) node first — guarantees level-by-level order." },
                    { line: "visited.add(node)", explanation: "Mark visited to avoid infinite loops in cyclic graphs." },
                    { line: "queue.append(neighbour)", explanation: "Add unvisited neighbours to the rear for future processing." },
                  ]
                },
                {
                  heading: "Circular Queue",
                  content: "A fixed-size circular queue reuses freed slots using modular arithmetic. Used in embedded systems and ring buffers where memory is limited.",
                  code: `class CircularQueue:\n    def __init__(self, capacity):\n        self._buf  = [None] * capacity\n        self._cap  = capacity\n        self._head = 0     # front pointer\n        self._tail = 0     # rear pointer\n        self._size = 0\n\n    def enqueue(self, item):\n        if self._size == self._cap:\n            raise OverflowError("Queue full")\n        self._buf[self._tail] = item\n        self._tail = (self._tail + 1) % self._cap\n        self._size += 1\n\n    def dequeue(self):\n        if self._size == 0:\n            raise IndexError("Queue empty")\n        item = self._buf[self._head]\n        self._head = (self._head + 1) % self._cap\n        self._size -= 1\n        return item`,
                  breakdown: [
                    { line: "(self._tail + 1) % self._cap", explanation: "Modulo wraps the pointer back to 0 when it reaches the end — making the buffer circular." },
                    { line: "self._size == self._cap", explanation: "Full check. Without size tracking, head==tail is ambiguous (could mean full OR empty)." },
                  ]
                }
              ],
              tip: "Always use collections.deque for queue implementations in Python. list.pop(0) is O(n) because it shifts every element left."
            },
            defaultCode: `from collections import deque\n\nclass Queue:\n    def __init__(self):\n        self._data = deque()\n\n    def enqueue(self, item):\n        self._data.append(item)\n\n    def dequeue(self):\n        if self.is_empty():\n            raise IndexError("dequeue from empty queue")\n        return self._data.popleft()\n\n    def front(self):\n        if self.is_empty():\n            raise IndexError("front of empty queue")\n        return self._data[0]\n\n    def is_empty(self):\n        return len(self._data) == 0\n\n    def size(self):\n        return len(self._data)\n\n    def __repr__(self):\n        return "Queue(front -> " + " -> ".join(str(x) for x in self._data) + " <- rear)"\n\n\n# ── Demo ──\nq = Queue()\nfor item in ["Alice", "Bob", "Carol", "Dave"]:\n    q.enqueue(item)\nprint("Queue:", q)\nprint("Front:", q.front())\nprint("Dequeue:", q.dequeue())\nprint("After dequeue:", q)\nprint("Size:", q.size())\n\n# BFS demo\ndef bfs(graph, start):\n    visited = set()\n    queue = deque([start])\n    order = []\n    while queue:\n        node = queue.popleft()\n        if node in visited:\n            continue\n        visited.add(node)\n        order.append(node)\n        for nb in graph[node]:\n            if nb not in visited:\n                queue.append(nb)\n    return order\n\ngraph = {'A': ['B','C'], 'B': ['D','E'], 'C': ['F'], 'D': [], 'E': [], 'F': []}\nprint("\\nBFS from A:", bfs(graph, 'A'))`
          },
          {
            id: "pdsa-linked-list",
            title: "Linked List",
            language: "python",
            theory: {
              intro: "A Linked List is a chain of nodes where each node holds data and a pointer to the next node. Unlike arrays, nodes are scattered in memory — there is no indexing, but insertion and deletion at any point is O(1) if you already have the pointer. It is the foundation for stacks, queues, and many other structures.",
              sections: [
                {
                  heading: "Node and SinglyLinkedList",
                  content: "Two classes: Node (holds data + next pointer) and LinkedList (holds the head pointer and all operations).",
                  code: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None   # pointer to next node\n\nclass SinglyLinkedList:\n    def __init__(self):\n        self.head = None   # empty list\n\n    # Add to end — O(n)\n    def append(self, data):\n        new = Node(data)\n        if self.head is None:\n            self.head = new\n            return\n        curr = self.head\n        while curr.next:     # walk to last node\n            curr = curr.next\n        curr.next = new      # link last → new\n\n    # Add to front — O(1)\n    def prepend(self, data):\n        new = Node(data)\n        new.next = self.head\n        self.head = new\n\n    # Print all nodes\n    def display(self):\n        nodes = []\n        curr = self.head\n        while curr:\n            nodes.append(str(curr.data))\n            curr = curr.next\n        print(" → ".join(nodes) + " → None")`,
                  breakdown: [
                    { line: "self.next = None", explanation: "None is the sentinel that marks the end of the list." },
                    { line: "self.head = None", explanation: "An empty list has no head node." },
                    { line: "while curr.next", explanation: "Walk until we find the last node (its next is None)." },
                    { line: "curr.next = new", explanation: "Link the old last node to the new node." },
                    { line: "new.next = self.head", explanation: "prepend: new node points to old head, then becomes the new head. O(1)." },
                  ]
                },
                {
                  heading: "Search and Delete",
                  content: "Search scans linearly — O(n). Deletion requires finding the node BEFORE the target so we can relink around it.",
                  code: `def search(self, target):\n    curr = self.head\n    pos = 0\n    while curr:\n        if curr.data == target:\n            return pos         # found at position pos\n        curr = curr.next\n        pos += 1\n    return -1                  # not found\n\ndef delete(self, target):\n    if self.head is None:\n        return\n    # Target is the head\n    if self.head.data == target:\n        self.head = self.head.next\n        return\n    # Find the node BEFORE target\n    prev = self.head\n    while prev.next and prev.next.data != target:\n        prev = prev.next\n    if prev.next:              # target found\n        prev.next = prev.next.next   # skip over target`,
                  breakdown: [
                    { line: "curr = curr.next", explanation: "Advance the pointer one node at a time — this is how you traverse a linked list." },
                    { line: "self.head = self.head.next", explanation: "Delete head: make head point to the second node. Old head is garbage-collected." },
                    { line: "prev.next = prev.next.next", explanation: "Delete a middle/tail node: bypass it by linking prev directly to the node after target." },
                  ]
                },
                {
                  heading: "Reverse a Linked List",
                  content: "Reversing in-place uses three pointers: prev, curr, and next_node. This is the most common linked list interview question.",
                  code: `def reverse(self):\n    prev = None\n    curr = self.head\n    while curr:\n        next_node   = curr.next  # save next\n        curr.next   = prev       # flip pointer\n        prev        = curr       # advance prev\n        curr        = next_node  # advance curr\n    self.head = prev             # new head`,
                  breakdown: [
                    { line: "next_node = curr.next", explanation: "Save the next node before overwriting curr.next (otherwise we lose the rest of the list)." },
                    { line: "curr.next = prev", explanation: "Flip the pointer: instead of pointing forward, point backward." },
                    { line: "self.head = prev", explanation: "After the loop, prev sits on the old tail — which is now the new head." },
                  ]
                }
              ],
              tip: "Draw the pointer arrows on paper before coding. Linked list bugs almost always come from losing a reference — save next_node before you modify curr.next."
            },
            defaultCode: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass SinglyLinkedList:\n    def __init__(self):\n        self.head = None\n\n    def append(self, data):\n        new = Node(data)\n        if not self.head:\n            self.head = new; return\n        curr = self.head\n        while curr.next:\n            curr = curr.next\n        curr.next = new\n\n    def prepend(self, data):\n        new = Node(data)\n        new.next = self.head\n        self.head = new\n\n    def delete(self, target):\n        if not self.head: return\n        if self.head.data == target:\n            self.head = self.head.next; return\n        prev = self.head\n        while prev.next and prev.next.data != target:\n            prev = prev.next\n        if prev.next:\n            prev.next = prev.next.next\n\n    def reverse(self):\n        prev, curr = None, self.head\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev, curr = curr, nxt\n        self.head = prev\n\n    def to_list(self):\n        result, curr = [], self.head\n        while curr:\n            result.append(curr.data)\n            curr = curr.next\n        return result\n\n    def display(self, label=""):\n        print((label + ": " if label else "") + " → ".join(str(x) for x in self.to_list()) + " → None")\n\n\n# ── Demo ──\nll = SinglyLinkedList()\nfor v in [10, 20, 30, 40, 50]:\n    ll.append(v)\nll.display("Initial")\n\nll.prepend(5)\nll.display("After prepend 5")\n\nll.delete(30)\nll.display("After delete 30")\n\nll.reverse()\nll.display("After reverse")\n\nprint("As list:", ll.to_list())`
          }
        ]
      }
    ]
  },
];

export const getAllLessons = () =>
  tracks.flatMap(track =>
    track.chapters.flatMap(chapter =>
      chapter.lessons.map(lesson => ({ ...lesson, trackId: track.id, chapterId: chapter.id }))
    )
  );
