export const lessons = [
  {
    id: "html-basics",
    track: "HTML5 & Bootstrap",
    title: "Building your first Bootstrap Card",
    theory: "Bootstrap utilizes a grid system and utility classes. In this lesson, wrap your content in a `.container` and use `.btn-primary` for the button to see rapid styling in action.",
    defaultCode: `<div class="container text-center mt-5">
  <h1 class="text-white">Hello, World!</h1>
  <p class="text-gray-300">Start editing to see magic happen.</p>
  <button class="btn btn-primary">Click Me</button>
</div>`,
    language: "html"
  },
  {
    id: "py-flask-intro",
    track: "Python Flask",
    title: "Your First Flask Route",
    theory: "Flask relies on routing to serve web pages. Use the `@app.route('/')` decorator to define what happens when a user visits the root of your application.",
    defaultCode: `from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef hello():\n    return 'Hello, Data Science!'\n\n# Run the app\nprint("Server running on port 5000")`,
    language: "python"
  }
];
