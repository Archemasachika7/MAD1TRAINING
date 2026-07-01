// Extra chapters for the PDSA track: Visualizations, Coding Problems, Theory Quiz

export const pdsaExtraChapters = [

  /* ── Chapter 1: Visualizations ── */
  {
    id: "pdsa-viz",
    title: "Visualizations",
    lessons: [

      {
        id: "pdsa-viz-stack",
        title: "Stack Visualizer",
        language: "html",
        theory: {
          intro: "Before writing code, build intuition visually. Push and pop values, watch the TOP label move, and notice that removal always happens from the top — never the middle or bottom.",
          sections: [
            {
              heading: "How LIFO Looks",
              content: "Each Push adds a box on top of the pile. Each Pop removes only the top box. You can never reach a lower box without removing everything above it.",
              code: `# Mental model — stack of plates:\n#\n#   [Carol]  ← TOP  (last in, first out)\n#   [Bob]\n#   [Alice]  ← BOTTOM (first in, last out)\n#\n# push("Dave") → Dave becomes new TOP\n# pop()        → Dave removed, Carol is TOP again`,
              breakdown: []
            },
            {
              heading: "Try It",
              content: "Run the playground. Type any value and click Push 5 times. Then Pop 5 times and note the output order — it will be the exact reverse of your push order.",
              code: null,
              breakdown: []
            }
          ],
          tip: "Push: 10, 20, 30. Then pop all three. You'll see 30 → 20 → 10 — the reverse. That's why stacks reverse sequences."
        },
        defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Stack Visualizer</title>\n  <style>\n    *{box-sizing:border-box;margin:0;padding:0}\n    body{font-family:system-ui;background:#0f172a;color:#e2e8f0;padding:1.5rem}\n    h2{color:#5eead4;margin-bottom:.25rem}\n    .sub{color:#94a3b8;font-size:.85rem;margin-bottom:1.2rem}\n    .controls{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.5rem;align-items:center}\n    input{background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:7px 12px;border-radius:6px;width:110px}\n    button{padding:7px 16px;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:.85rem}\n    .bp{background:#14b8a6;color:#0f172a}.bpo{background:#f43f5e;color:#fff}.bc{background:#475569;color:#fff}\n    .row{display:flex;gap:2rem;flex-wrap:wrap}\n    .stack-wrap{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:1rem;width:220px;min-height:280px;display:flex;flex-direction:column-reverse;align-items:center;gap:4px}\n    .item{width:180px;padding:11px;border-radius:8px;background:#0d9488;color:#fff;font-weight:700;text-align:center;position:relative;animation:si .25s ease}\n    .item.top{background:#14b8a6;outline:2px solid #5eead4}\n    .tb{position:absolute;right:-48px;top:50%;transform:translateY(-50%);font-size:.62rem;color:#5eead4;font-weight:700}\n    @keyframes si{from{transform:translateX(-12px);opacity:0}to{transform:none;opacity:1}}\n    .empty{color:#475569;font-style:italic;margin:auto}\n    .stats{display:flex;gap:.75rem;margin-bottom:.75rem;flex-wrap:wrap}\n    .stat{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:.6rem 1rem}\n    .lbl{font-size:.65rem;color:#94a3b8;text-transform:uppercase}\n    .val{font-size:1.1rem;font-weight:700;color:#5eead4}\n    .log{background:#0a0e14;padding:.75rem;border-radius:8px;font-family:monospace;font-size:.78rem;color:#7dd3fc;max-height:160px;overflow-y:auto;min-width:220px}\n    .axlbl{font-size:.7rem;color:#94a3b8;margin:.3rem 0}\n  </style>\n</head>\n<body>\n  <h2>Stack Visualizer</h2>\n  <p class="sub">LIFO — Last In, First Out</p>\n  <div class="controls">\n    <input id="val" placeholder="value..." onkeydown="if(event.key==='Enter')doPush()">\n    <button class="bp" onclick="doPush()">&#9650; Push</button>\n    <button class="bpo" onclick="doPop()">&#9660; Pop</button>\n    <button class="bc" onclick="doClear()">Clear</button>\n  </div>\n  <div class="row">\n    <div>\n      <div class="axlbl">&#9650; top of stack</div>\n      <div class="stack-wrap" id="viz"><div class="empty">empty stack</div></div>\n      <div class="axlbl">&#9660; bottom</div>\n    </div>\n    <div>\n      <div class="stats">\n        <div class="stat"><div class="lbl">Size</div><div class="val" id="sz">0</div></div>\n        <div class="stat"><div class="lbl">Top</div><div class="val" id="tp">-</div></div>\n        <div class="stat"><div class="lbl">Ops</div><div class="val" id="ops">0</div></div>\n      </div>\n      <div class="log" id="log">-- operation log --</div>\n    </div>\n  </div>\n  <script>\n    var stack=[], ops=0;\n    function render(){\n      var v=document.getElementById("viz");\n      document.getElementById("sz").textContent=stack.length;\n      document.getElementById("tp").textContent=stack.length?stack[stack.length-1]:"-";\n      if(!stack.length){v.innerHTML="<div class=\\"empty\\">empty stack</div>";return;}\n      v.innerHTML="";\n      stack.forEach(function(x,i){\n        var d=document.createElement("div"); d.className="item"+(i===stack.length-1?" top":"");\n        d.textContent=x;\n        if(i===stack.length-1){var b=document.createElement("span");b.className="tb";b.textContent="TOP";d.appendChild(b);}\n        v.appendChild(d);\n      });\n    }\n    function addLog(msg){ops++;document.getElementById("ops").textContent=ops;var el=document.getElementById("log"),d=document.createElement("div");d.textContent="> "+msg;el.appendChild(d);el.scrollTop=el.scrollHeight;}\n    function doPush(){var val=document.getElementById("val").value.trim();if(!val)return;stack.push(val);addLog("push("+val+")  size="+stack.length);document.getElementById("val").value="";render();}\n    function doPop(){if(!stack.length){addLog("pop() ERROR: empty!");return;}var v=stack.pop();addLog("pop() => "+v+"  size="+stack.length);render();}\n    function doClear(){stack=[];addLog("clear()");render();}\n    [10,25,37].forEach(function(v){stack.push(v);});render();addLog("preloaded: 10, 25, 37");\n  </script>\n</body></html>`
      },

      {
        id: "pdsa-viz-queue",
        title: "Queue Visualizer",
        language: "html",
        theory: {
          intro: "A Queue is like a cinema line — the first person in is the first to get a ticket. Enqueue adds to the rear; Dequeue removes from the front. Watch the FRONT and REAR labels shift with each operation.",
          sections: [
            {
              heading: "How FIFO Looks",
              content: "Items enter from the right (rear) and leave from the left (front). The oldest item is always at the front. New items never jump the queue.",
              code: `# Queue state after enqueue(A), enqueue(B), enqueue(C):\n#\n# FRONT → [A] → [B] → [C] ← REAR\n#\n# dequeue() → removes A, B becomes new FRONT\n# FRONT → [B] → [C] ← REAR`,
              breakdown: []
            },
            {
              heading: "Try It",
              content: "Enqueue 5 people (Alice, Bob, Carol, Dave, Eve). Then dequeue them one by one — they leave in the exact order they arrived. Contrast this with the Stack visualizer.",
              code: null,
              breakdown: []
            }
          ],
          tip: "Enqueue 4 items. Then mix enqueues and dequeues. Notice the FRONT pointer advances while the REAR pointer may also advance — they are independent."
        },
        defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Queue Visualizer</title>\n  <style>\n    *{box-sizing:border-box;margin:0;padding:0}\n    body{font-family:system-ui;background:#0f172a;color:#e2e8f0;padding:1.5rem}\n    h2{color:#818cf8;margin-bottom:.25rem}\n    .sub{color:#94a3b8;font-size:.85rem;margin-bottom:1.2rem}\n    .controls{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.2rem;align-items:center}\n    input{background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:7px 12px;border-radius:6px;width:110px}\n    button{padding:7px 16px;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:.85rem}\n    .be{background:#6366f1;color:#fff}.bd{background:#f59e0b;color:#0f172a}.bc{background:#475569;color:#fff}\n    .track-wrap{overflow-x:auto;padding:.5rem 0;margin-bottom:1rem}\n    .track{display:flex;align-items:center;gap:0;min-height:72px}\n    .item{background:#4f46e5;color:#fff;padding:14px 18px;font-weight:700;font-size:.95rem;border-right:2px solid #0f172a;animation:fi .25s ease;position:relative;min-width:70px;text-align:center}\n    .item.fr{background:#22c55e}.item.re{background:#f59e0b;color:#0f172a}.item.single{background:#14b8a6}\n    .qlbl{display:block;font-size:.6rem;font-weight:700;margin-top:3px;opacity:.85}\n    @keyframes fi{from{transform:scale(.75);opacity:0}to{transform:none;opacity:1}}\n    .arr{color:#6366f1;font-size:1.4rem;padding:0 3px}\n    .stats{display:flex;gap:.75rem;margin-bottom:.75rem;flex-wrap:wrap}\n    .stat{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:.6rem 1rem}\n    .lbl{font-size:.65rem;color:#94a3b8;text-transform:uppercase}\n    .val{font-size:1.1rem;font-weight:700;color:#818cf8}\n    .log{background:#0a0e14;padding:.75rem;border-radius:8px;font-family:monospace;font-size:.78rem;color:#7dd3fc;max-height:140px;overflow-y:auto}\n    .empty{color:#475569;font-style:italic;padding:.5rem 1rem}\n    .lgd{display:flex;gap:1rem;font-size:.75rem;margin-bottom:.6rem;flex-wrap:wrap}\n    .dot{width:10px;height:10px;border-radius:2px;display:inline-block;margin-right:4px}\n  </style>\n</head>\n<body>\n  <h2>Queue Visualizer</h2>\n  <p class="sub">FIFO — First In, First Out</p>\n  <div class="controls">\n    <input id="val" placeholder="value..." onkeydown="if(event.key==='Enter')doEnq()">\n    <button class="be" onclick="doEnq()">+ Enqueue (rear)</button>\n    <button class="bd" onclick="doDeq()">- Dequeue (front)</button>\n    <button class="bc" onclick="doClear()">Clear</button>\n  </div>\n  <div class="lgd">\n    <span><span class="dot" style="background:#22c55e"></span>Front</span>\n    <span><span class="dot" style="background:#f59e0b"></span>Rear</span>\n    <span><span class="dot" style="background:#4f46e5"></span>Middle</span>\n  </div>\n  <div class="track-wrap"><div class="track" id="viz"><div class="empty">Queue is empty</div></div></div>\n  <div class="stats">\n    <div class="stat"><div class="lbl">Size</div><div class="val" id="sz">0</div></div>\n    <div class="stat"><div class="lbl">Front</div><div class="val" id="fr">-</div></div>\n    <div class="stat"><div class="lbl">Rear</div><div class="val" id="re">-</div></div>\n    <div class="stat"><div class="lbl">Total dequeued</div><div class="val" id="dq">0</div></div>\n  </div>\n  <div class="log" id="log">-- operation log --</div>\n  <script>\n    var queue=[],dqCount=0;\n    function render(){\n      var v=document.getElementById("viz");\n      document.getElementById("sz").textContent=queue.length;\n      document.getElementById("fr").textContent=queue.length?queue[0]:"-";\n      document.getElementById("re").textContent=queue.length?queue[queue.length-1]:"-";\n      if(!queue.length){v.innerHTML="<div class=\\"empty\\">Queue is empty</div>";return;}\n      v.innerHTML="";\n      queue.forEach(function(x,i){\n        var cls=queue.length===1?"single":(i===0?"fr":(i===queue.length-1?"re":""));\n        var lbl=queue.length===1?"FRONT & REAR":(i===0?"FRONT":(i===queue.length-1?"REAR":""));\n        var d=document.createElement("div"); d.className="item "+cls;\n        d.innerHTML=x+"<span class=\\"qlbl\\">"+lbl+"</span>";\n        v.appendChild(d);\n        if(i<queue.length-1){var a=document.createElement("span");a.className="arr";a.textContent="→";v.appendChild(a);}\n      });\n    }\n    function addLog(msg){var el=document.getElementById("log"),d=document.createElement("div");d.textContent="> "+msg;el.appendChild(d);el.scrollTop=el.scrollHeight;}\n    function doEnq(){var val=document.getElementById("val").value.trim();if(!val)return;queue.push(val);addLog("enqueue("+val+")  size="+queue.length+"  rear="+val);document.getElementById("val").value="";render();}\n    function doDeq(){if(!queue.length){addLog("dequeue() ERROR: empty!");return;}var v=queue.shift();dqCount++;document.getElementById("dq").textContent=dqCount;addLog("dequeue() => "+v+"  size="+queue.length);render();}\n    function doClear(){queue=[];addLog("clear()");render();}\n    ["Alice","Bob","Carol"].forEach(function(v){queue.push(v);});render();addLog("preloaded: Alice, Bob, Carol");\n  </script>\n</body></html>`
      },

      {
        id: "pdsa-viz-ll",
        title: "Linked List Visualizer",
        language: "html",
        theory: {
          intro: "A Linked List is a chain of nodes where each box points to the next. There is no index — to reach node 4 you must walk nodes 1, 2, 3 first. Watch how the arrows (pointers) change during insertion and deletion.",
          sections: [
            {
              heading: "Node Anatomy",
              content: "Each node has two fields: DATA (the value) and NEXT (a pointer to the next node). The last node's NEXT is None — the end sentinel.",
              code: `# Node structure:\n#\n#  ┌──────┬──────┐     ┌──────┬──────┐     ┌──────┬──────┐\n#  │  10  │  ──▶ │────▶│  20  │  ──▶ │────▶│  30  │ None │\n#  └──────┴──────┘     └──────┴──────┘     └──────┴──────┘\n#     data   next          data   next          data   next\n#\n# head = node(10)\n# To reach 30: head.next.next`,
              breakdown: []
            },
            {
              heading: "Try It",
              content: "Use Append and Prepend to build a list. Then Delete a middle node. Notice how the arrows relink — the previous node's pointer jumps over the deleted node directly to the node after it.",
              code: null,
              breakdown: []
            }
          ],
          tip: "Delete the middle node of a 3-node list. The left node's arrow jumps directly to the right node — the middle node is bypassed and garbage-collected. That's O(1) deletion once you have the pointer."
        },
        defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Linked List Visualizer</title>\n  <style>\n    *{box-sizing:border-box;margin:0;padding:0}\n    body{font-family:system-ui;background:#0f172a;color:#e2e8f0;padding:1.5rem}\n    h2{color:#f472b6;margin-bottom:.25rem}\n    .sub{color:#94a3b8;font-size:.85rem;margin-bottom:1.2rem}\n    .controls{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.2rem;align-items:center}\n    input{background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:7px 12px;border-radius:6px;width:110px}\n    button{padding:7px 16px;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:.85rem}\n    .ba{background:#ec4899;color:#fff}.bp{background:#8b5cf6;color:#fff}.bd{background:#f43f5e;color:#fff}.bc{background:#475569;color:#fff}\n    .ll-wrap{overflow-x:auto;padding:1rem 0;margin-bottom:1rem}\n    .ll-track{display:flex;align-items:center;gap:0;min-height:90px;flex-wrap:nowrap}\n    .node{display:flex;border:2px solid #334155;border-radius:10px;overflow:hidden;animation:ni .3s ease;flex-shrink:0}\n    .node.head-node .data{background:#ec4899}\n    .node.tail-node .nxt{background:#1e293b;color:#475569}\n    .data{background:#be185d;color:#fff;padding:14px 16px;font-weight:700;font-size:1rem;min-width:52px;text-align:center}\n    .nxt{background:#312e81;color:#a5b4fc;padding:14px 10px;font-size:.75rem;font-weight:700;min-width:44px;text-align:center}\n    .ndlbl{font-size:.6rem;color:#94a3b8;text-align:center;margin-top:3px}\n    .arrow{color:#8b5cf6;font-size:1.5rem;padding:0 6px;flex-shrink:0}\n    .null-node{color:#475569;font-style:italic;padding:0 .5rem;font-size:.85rem;flex-shrink:0}\n    @keyframes ni{from{transform:scale(.75);opacity:0}to{transform:none;opacity:1}}\n    .stats{display:flex;gap:.75rem;margin-bottom:.75rem;flex-wrap:wrap}\n    .stat{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:.6rem 1rem}\n    .lbl{font-size:.65rem;color:#94a3b8;text-transform:uppercase}\n    .val{font-size:1.1rem;font-weight:700;color:#f472b6}\n    .log{background:#0a0e14;padding:.75rem;border-radius:8px;font-family:monospace;font-size:.78rem;color:#7dd3fc;max-height:140px;overflow-y:auto}\n    .empty-msg{color:#475569;font-style:italic}\n    .node-wrap{display:flex;flex-direction:column;align-items:center;flex-shrink:0}\n  </style>\n</head>\n<body>\n  <h2>Linked List Visualizer</h2>\n  <p class="sub">Singly Linked List — each node points to the next</p>\n  <div class="controls">\n    <input id="val" placeholder="value..." onkeydown="if(event.key==='Enter')doAppend()">\n    <button class="ba" onclick="doAppend()">Append (tail)</button>\n    <button class="bp" onclick="doPrepend()">Prepend (head)</button>\n    <button class="bd" onclick="doDelete()">Delete value</button>\n    <button class="bc" onclick="doClear()">Clear</button>\n  </div>\n  <div class="ll-wrap"><div class="ll-track" id="viz"><span class="empty-msg">List is empty — append a node!</span></div></div>\n  <div class="stats">\n    <div class="stat"><div class="lbl">Length</div><div class="val" id="sz">0</div></div>\n    <div class="stat"><div class="lbl">Head</div><div class="val" id="hd">-</div></div>\n    <div class="stat"><div class="lbl">Tail</div><div class="val" id="tl">-</div></div>\n  </div>\n  <div class="log" id="log">-- operation log --</div>\n  <script>\n    var list=[];\n    function render(){\n      var v=document.getElementById("viz");\n      document.getElementById("sz").textContent=list.length;\n      document.getElementById("hd").textContent=list.length?list[0]:"-";\n      document.getElementById("tl").textContent=list.length?list[list.length-1]:"-";\n      if(!list.length){v.innerHTML="<span class=\\"empty-msg\\">List is empty</span>";return;}\n      v.innerHTML="";\n      list.forEach(function(x,i){\n        var wrap=document.createElement("div"); wrap.style.display="flex"; wrap.style.flexDirection="column"; wrap.style.alignItems="center"; wrap.style.flexShrink="0";\n        var node=document.createElement("div"); node.className="node"+(i===0?" head-node":"")+(i===list.length-1?" tail-node":"");\n        var data=document.createElement("div"); data.className="data"; data.textContent=x;\n        var nxt=document.createElement("div"); nxt.className="nxt"; nxt.textContent=i===list.length-1?"None":"next";\n        node.appendChild(data); node.appendChild(nxt);\n        var lbl=document.createElement("div"); lbl.className="ndlbl"; lbl.textContent=(i===0?"[head]":"")+(i===list.length-1?"[tail]":"");\n        wrap.appendChild(node); wrap.appendChild(lbl); v.appendChild(wrap);\n        if(i<list.length-1){var a=document.createElement("span");a.className="arrow";a.textContent="→";v.appendChild(a);}\n        else{var n=document.createElement("span");n.className="null-node";n.textContent="→ None";v.appendChild(n);}\n      });\n    }\n    function addLog(msg){var el=document.getElementById("log"),d=document.createElement("div");d.textContent="> "+msg;el.appendChild(d);el.scrollTop=el.scrollHeight;}\n    function getVal(){return document.getElementById("val").value.trim();}\n    function doAppend(){var val=getVal();if(!val)return;list.push(val);addLog("append("+val+")  len="+list.length);document.getElementById("val").value="";render();}\n    function doPrepend(){var val=getVal();if(!val)return;list.unshift(val);addLog("prepend("+val+")  len="+list.length);document.getElementById("val").value="";render();}\n    function doDelete(){\n      var val=getVal();if(!val)return;\n      var idx=list.indexOf(val);\n      if(idx===-1){addLog("delete("+val+") => NOT FOUND");return;}\n      list.splice(idx,1);addLog("delete("+val+")  len="+list.length);document.getElementById("val").value="";render();\n    }\n    function doClear(){list=[];addLog("clear()");render();}\n    [10,20,30,40].forEach(function(v){list.push(v);});render();addLog("preloaded: 10 -> 20 -> 30 -> 40");\n  </script>\n</body></html>`
      }
    ]
  },

  /* ── Chapter 2: Coding Problems (graduated difficulty) ── */
  {
    id: "pdsa-coding",
    title: "Coding Problems",
    lessons: [

      /* ── Level 1: Easy ── */
      {
        id: "pdsa-prob-reverse",
        title: "Lv.1 — Reverse a String",
        language: "python",
        theory: {
          intro: "The classic first application of a stack: reverse a sequence. Push every character onto a stack, then pop them all. Because of LIFO, they come out in reverse order. This O(n) algorithm uses O(n) extra space.",
          sections: [
            {
              heading: "Algorithm",
              content: "Three steps: (1) Push each character. (2) Pop all characters into a result string. (3) Return result.",
              code: `# Example trace for "hello":\n#\n# Push phase:\n#   push('h') → stack: [h]\n#   push('e') → stack: [h,e]\n#   push('l') → stack: [h,e,l]\n#   push('l') → stack: [h,e,l,l]\n#   push('o') → stack: [h,e,l,l,o]  ← top\n#\n# Pop phase:\n#   pop() → 'o'  result: "o"\n#   pop() → 'l'  result: "ol"\n#   pop() → 'l'  result: "oll"\n#   pop() → 'e'  result: "olle"\n#   pop() → 'h'  result: "olleh"\n#\n# Return "olleh"`,
              breakdown: [
                { line: "push each char", explanation: "O(n) pushes — each character gets stored in the stack." },
                { line: "pop into result", explanation: "O(n) pops — LIFO means last char pushed (last char of string) is first out." },
              ]
            },
            {
              heading: "Why Not Just s[::-1]?",
              content: "Python's slice s[::-1] is cleaner in production, but using a stack teaches the mechanical process. Many harder problems (like undo systems, expression parsers) are built on this same push-then-pop pattern.",
              code: `# Built-in (idiomatic Python):\nreversed_s = s[::-1]\n\n# Stack-based (teaches the pattern):\ndef reverse_with_stack(s):\n    stack = []\n    for ch in s:\n        stack.append(ch)\n    result = ""\n    while stack:\n        result += stack.pop()\n    return result`,
              breakdown: []
            }
          ],
          tip: "This problem has the same structure as undo history, browser back-button, and recursive call reversal — all use a stack to 'replay in reverse'."
        },
        defaultCode: `class Stack:\n    def __init__(self): self._d = []\n    def push(self, x): self._d.append(x)\n    def pop(self): return self._d.pop()\n    def is_empty(self): return not self._d\n\n\ndef reverse_string(s):\n    """\n    Level 1 — Easy\n    Reverse a string using a Stack.\n    Time: O(n)  Space: O(n)\n    """\n    stack = Stack()\n    # Step 1: push every character\n    for ch in s:\n        stack.push(ch)\n\n    # Step 2: pop into result\n    result = ""\n    while not stack.is_empty():\n        result += stack.pop()\n\n    return result\n\n\n# ── Test Cases ──\ntest_cases = [\n    ("hello",   "olleh"),\n    ("PDSA",    "ASDP"),\n    ("12345",   "54321"),\n    ("racecar", "racecar"),   # palindrome — same!\n    ("",        ""),\n    ("a",       "a"),\n]\n\nprint("reverse_string tests:")\nfor inp, expected in test_cases:\n    got = reverse_string(inp)\n    status = "PASS" if got == expected else "FAIL"\n    print(f"  {status}  reverse_string({inp!r:12}) = {got!r:14}  expected {expected!r}")`
      },

      {
        id: "pdsa-prob-minstack",
        title: "Lv.2 — Min Stack",
        language: "python",
        theory: {
          intro: "Design a stack that supports push, pop, top, and get_min() — all in O(1) time. The naive approach (scan the stack for the min) is O(n). The trick: maintain a parallel 'min stack' that tracks the current minimum at every level.",
          sections: [
            {
              heading: "The Parallel Min Stack Idea",
              content: "Every time you push to the main stack, also push to the min_stack: either the new value (if it's smaller) or the previous minimum. When you pop from main, pop from min_stack too. The top of min_stack is always the current minimum.",
              code: `# Example: push 5, 3, 7, 2, 6\n#\n# main_stack:  [5, 3, 7, 2, 6]  ← top\n# min_stack:   [5, 3, 3, 2, 2]  ← top\n#\n# get_min() → min_stack.top() = 2  (O(1) ✓)\n#\n# After pop() (removes 6):\n# main_stack:  [5, 3, 7, 2]\n# min_stack:   [5, 3, 3, 2]  ← min still 2  ✓\n#\n# After pop() (removes 2):\n# main_stack:  [5, 3, 7]\n# min_stack:   [5, 3, 3]  ← min is now 3  ✓`,
              breakdown: [
                { line: "min_stack.push(min(val, min_stack.top()))", explanation: "Always record the running minimum at this depth. Ensures get_min is O(1) even after pops." },
                { line: "pop both stacks together", explanation: "Both stacks stay in sync — when main pops, the corresponding min level is also removed." },
              ]
            }
          ],
          tip: "This is a real interview question at top companies. Once you see the 'parallel tracking stack' trick, you'll recognise it in many harder problems."
        },
        defaultCode: `class MinStack:\n    """\n    Level 2 — Easy-Medium\n    Stack with O(1) get_min().\n    Uses a parallel min_stack to track running minimum.\n    """\n    def __init__(self):\n        self._stack = []\n        self._min   = []   # parallel min tracker\n\n    def push(self, val):\n        self._stack.append(val)\n        # Track min: either new val is smaller, or keep existing min\n        if not self._min:\n            self._min.append(val)\n        else:\n            self._min.append(min(val, self._min[-1]))\n\n    def pop(self):\n        if not self._stack:\n            raise IndexError("pop from empty MinStack")\n        self._min.pop()         # keep in sync\n        return self._stack.pop()\n\n    def top(self):\n        return self._stack[-1] if self._stack else None\n\n    def get_min(self):\n        return self._min[-1] if self._min else None\n\n    def __repr__(self):\n        return "MinStack(main=" + str(self._stack) + " | mins=" + str(self._min) + ")"\n\n\n# ── Tests ──\nms = MinStack()\nfor v in [5, 3, 7, 2, 6]:\n    ms.push(v)\n    print("push(" + str(v) + ")  →  min=" + str(ms.get_min()))\n\nprint("\\nState:", ms)\nprint("Top:", ms.top())\nprint("Min:", ms.get_min())   # should be 2\n\nprint("\\nPopping:")\nfor _ in range(3):\n    print("  pop() =", ms.pop(), " → min now:", ms.get_min())\n\n# Edge: single element\nms2 = MinStack()\nms2.push(42)\nprint("\\nSingle element min:", ms2.get_min())   # 42\nms2.pop()\nprint("After pop, min:", ms2.get_min())          # None`
      },

      /* ── Level 3: Medium ── */
      {
        id: "pdsa-prob-postfix",
        title: "Lv.3 — Postfix Expression Evaluator",
        language: "python",
        theory: {
          intro: "Postfix notation (also called Reverse Polish Notation) places operators AFTER operands: '3 4 +' means 3+4. No parentheses needed — the order is unambiguous. Calculators and compilers evaluate expressions this way using a stack.",
          sections: [
            {
              heading: "Algorithm",
              content: "Scan tokens left to right. If a number: push it. If an operator: pop two operands, apply the operator, push the result. At the end, the stack contains exactly one number — the answer.",
              code: `# Evaluate "3 4 + 2 *"  (means (3+4)*2)\n#\n# Token "3"  → push(3)      stack: [3]\n# Token "4"  → push(4)      stack: [3, 4]\n# Token "+"  → b=pop()=4, a=pop()=3\n#              push(a+b=7)  stack: [7]\n# Token "2"  → push(2)      stack: [7, 2]\n# Token "*"  → b=pop()=2, a=pop()=7\n#              push(a*b=14) stack: [14]\n#\n# Result = stack.pop() = 14  ✓`,
              breakdown: [
                { line: "b = pop(), a = pop()", explanation: "Pop RIGHT operand first (b), then LEFT operand (a). Order matters for - and /." },
                { line: "push(a op b)", explanation: "Result goes back on the stack — it becomes an operand for the next operator." },
              ]
            },
            {
              heading: "Why Postfix?",
              content: "Infix '(3+4)*2' needs parentheses to override precedence. Postfix '3 4 + 2 *' is unambiguous without them. Compilers convert infix to postfix internally before evaluation.",
              code: `# Infix → Postfix examples:\n# (3 + 4) * 2   →  3 4 + 2 *\n# 5 + 6 * 2     →  5 6 2 * +\n# (1 + 2) * (3 + 4)  →  1 2 + 3 4 + *`,
              breakdown: []
            }
          ],
          tip: "The key bug to avoid: always pop the SECOND operand first (right), then the FIRST (left). For '8 2 /' — b=2, a=8, result=a/b=4. If you swap, you get 0.25."
        },
        defaultCode: `def eval_postfix(expression):\n    """\n    Level 3 — Medium\n    Evaluate a postfix (RPN) expression.\n    Tokens are space-separated. Supports + - * / // **\n    Time: O(n)  Space: O(n)\n    """\n    stack = []\n    ops = {'+', '-', '*', '/', '//', '**'}\n\n    for token in expression.split():\n        if token not in ops:\n            stack.append(float(token))   # push operand\n        else:\n            b = stack.pop()   # right operand\n            a = stack.pop()   # left operand\n            if   token == '+':  stack.append(a + b)\n            elif token == '-':  stack.append(a - b)\n            elif token == '*':  stack.append(a * b)\n            elif token == '/':  stack.append(a / b)\n            elif token == '//': stack.append(a // b)\n            elif token == '**': stack.append(a ** b)\n\n    return stack[0]\n\n\n# ── Test Cases ──\nprint("Postfix Evaluator:")\ncases = [\n    ("3 4 +",           7,     "3+4"),\n    ("3 4 + 2 *",       14,    "(3+4)*2"),\n    ("5 1 2 + 4 * + 3 -", 14,  "5+((1+2)*4)-3"),\n    ("8 2 /",           4.0,   "8/2"),\n    ("2 3 **",          8.0,   "2^3"),\n    ("10 2 8 * + 3 -",  23,    "10+(2*8)-3"),\n]\nfor expr, expected, infix in cases:\n    result = eval_postfix(expr)\n    ok = abs(result - expected) < 1e-9\n    print(f"  {'OK' if ok else 'FAIL'}  [{infix}]  {expr!r}  =>  {result}")`
      },

      {
        id: "pdsa-prob-queue-stacks",
        title: "Lv.4 — Queue from Two Stacks",
        language: "python",
        theory: {
          intro: "Implement a Queue using only two Stacks. This is a classic interview problem that tests whether you understand the structural difference between LIFO and FIFO. You cannot use any built-in queue — only push and pop.",
          sections: [
            {
              heading: "The Two-Stack Trick",
              content: "Use an inbox stack and an outbox stack. Enqueue always pushes to inbox. Dequeue pops from outbox — but if outbox is empty, pour ALL of inbox into outbox first (reversing the order). This achieves amortised O(1) per operation.",
              code: `# inbox:  [1, 2, 3]  (3 on top)\n# outbox: []\n#\n# dequeue() called — outbox empty, so pour:\n#   pop(3) from inbox → push(3) to outbox\n#   pop(2) from inbox → push(2) to outbox\n#   pop(1) from inbox → push(1) to outbox\n# inbox: []  outbox: [3, 2, 1]  (1 on top)\n#\n# Now pop outbox → 1  ✓ (first item enqueued!)\n#\n# enqueue(4) → inbox: [4]  outbox: [3, 2]\n# dequeue()  → pop outbox → 2  ✓ (second item)`,
              breakdown: [
                { line: "pour inbox → outbox", explanation: "Reversing reverses the LIFO order, turning it into FIFO. We only pour when outbox is empty." },
                { line: "amortised O(1)", explanation: "Each element is pushed to inbox once and popped to outbox once. Total: 2 ops per element = O(1) amortised." },
              ]
            }
          ],
          tip: "This same trick generalises: you can build a min-queue (queue with O(1) minimum) by combining the two-stack technique with the MinStack from the previous problem."
        },
        defaultCode: `class Stack:\n    def __init__(self): self._d = []\n    def push(self, x): self._d.append(x)\n    def pop(self): return self._d.pop()\n    def is_empty(self): return not self._d\n    def peek(self): return self._d[-1]\n\n\nclass QueueFromStacks:\n    """\n    Level 4 — Medium\n    Queue (FIFO) using two Stacks (LIFO only).\n    Amortised O(1) enqueue and dequeue.\n    """\n    def __init__(self):\n        self.inbox  = Stack()   # new items go here\n        self.outbox = Stack()   # old items served from here\n\n    def enqueue(self, item):\n        self.inbox.push(item)\n\n    def _pour(self):\n        """Pour inbox into outbox (only when outbox is empty)."""\n        if self.outbox.is_empty():\n            while not self.inbox.is_empty():\n                self.outbox.push(self.inbox.pop())\n\n    def dequeue(self):\n        self._pour()\n        if self.outbox.is_empty():\n            raise IndexError("dequeue from empty queue")\n        return self.outbox.pop()\n\n    def front(self):\n        self._pour()\n        return self.outbox.peek() if not self.outbox.is_empty() else None\n\n    def is_empty(self):\n        return self.inbox.is_empty() and self.outbox.is_empty()\n\n\n# ── Tests ──\nq = QueueFromStacks()\nfor x in [1, 2, 3]:\n    q.enqueue(x)\n    print("enqueue(" + str(x) + ")")\n\nprint("front:", q.front())           # 1\nprint("dequeue:", q.dequeue())       # 1\nprint("dequeue:", q.dequeue())       # 2\nq.enqueue(4)\nq.enqueue(5)\nprint("after enqueue 4,5  front:", q.front())  # 3\nwhile not q.is_empty():\n    print("dequeue:", q.dequeue())   # 3, 4, 5  (FIFO order)`
      },

      /* ── Level 5: Medium (Linked List) ── */
      {
        id: "pdsa-prob-ll-middle",
        title: "Lv.5 — Middle of Linked List",
        language: "python",
        theory: {
          intro: "Find the middle node of a linked list in a single pass without knowing the length. The classic approach is the fast/slow pointer technique (also called Floyd's runner) — slow moves 1 step, fast moves 2 steps. When fast reaches the end, slow is at the middle.",
          sections: [
            {
              heading: "Fast/Slow Pointer Trace",
              content: "Both pointers start at head. Each step: slow = slow.next (1 hop), fast = fast.next.next (2 hops). When fast.next is None or fast is None, slow points to the middle.",
              code: `# List: 1 → 2 → 3 → 4 → 5 → None\n#\n# Start: slow=1  fast=1\n# Step1: slow=2  fast=3\n# Step2: slow=3  fast=5\n# Step3: fast.next=None → STOP\n#\n# Middle = slow = node(3)  ✓\n#\n# Even-length: 1 → 2 → 3 → 4 → None\n# Start: slow=1  fast=1\n# Step1: slow=2  fast=3\n# Step2: fast.next.next=None → STOP\n# Middle = slow = node(2)  (first of two middles)`,
              breakdown: [
                { line: "slow = slow.next", explanation: "Slow pointer advances 1 node per step." },
                { line: "fast = fast.next.next", explanation: "Fast pointer advances 2 nodes per step. When fast hits the end, slow is exactly at the midpoint." },
              ]
            }
          ],
          tip: "This same fast/slow pattern detects cycles (Floyd's cycle detection), finds the cycle start, and determines if a linked list is a palindrome — learning one instance teaches the pattern for all."
        },
        defaultCode: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\ndef build_list(*values):\n    if not values: return None\n    head = Node(values[0])\n    curr = head\n    for v in values[1:]:\n        curr.next = Node(v)\n        curr = curr.next\n    return head\n\ndef to_list(head):\n    result, curr = [], head\n    while curr:\n        result.append(curr.data)\n        curr = curr.next\n    return result\n\n\ndef find_middle(head):\n    """\n    Level 5 — Medium\n    Return the middle node using fast/slow pointers.\n    Single pass, O(n) time, O(1) space.\n    For even-length lists, returns the SECOND middle.\n    """\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow   # slow is at the middle\n\n\n# ── Tests ──\ntest_cases = [\n    ([1,2,3,4,5],   3),   # odd length  → middle is 3\n    ([1,2,3,4],     3),   # even length → second middle (3)\n    ([1,2,3],       2),\n    ([1,2],         2),\n    ([42],          42),  # single node → itself\n]\n\nprint("find_middle tests:")\nfor values, expected_mid in test_cases:\n    head = build_list(*values)\n    mid  = find_middle(head)\n    ok   = mid.data == expected_mid\n    print(f"  {'OK' if ok else 'FAIL'}  {values}  →  middle={mid.data}  (expected {expected_mid})")`
      },

      /* ── Level 6: Medium-Hard ── */
      {
        id: "pdsa-prob-ll-remove-nth",
        title: "Lv.6 — Remove Nth from End",
        language: "python",
        theory: {
          intro: "Remove the Nth node from the END of a linked list in one pass. You don't know the length. The two-pointer technique: advance a 'leader' pointer N steps ahead, then move both pointers together. When leader reaches the end, follower is right before the target.",
          sections: [
            {
              heading: "Two-Pointer Strategy",
              content: "Attach a dummy node before head (simplifies edge cases). Move leader N+1 steps from dummy. Then advance both leader and follower until leader is None. Follower is now at the node BEFORE the one to delete.",
              code: `# Remove 2nd from end:  1 → 2 → 3 → 4 → 5\n# N = 2\n#\n# dummy → 1 → 2 → 3 → 4 → 5 → None\n# leader starts at dummy, advance N+1=3 steps:\n#   step1: leader=1\n#   step2: leader=2\n#   step3: leader=3\n#\n# follower starts at dummy.\n# Move both until leader=None:\n#   follower=1, leader=4\n#   follower=2, leader=5\n#   follower=3, leader=None → STOP\n#\n# follower(3).next = follower(3).next.next = 5\n# Result: 1 → 2 → 3 → 5  ✓  (removed 4 = 2nd from end)`,
              breakdown: [
                { line: "dummy node before head", explanation: "Handles edge case where head itself is deleted (N == length). Avoids special-casing." },
                { line: "advance leader N+1 steps", explanation: "The +1 ensures follower lands on the node BEFORE the target, so we can relink." },
              ]
            }
          ],
          tip: "The dummy-node trick eliminates most edge cases in linked list problems. Always add one when deletion of head is possible."
        },
        defaultCode: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\ndef build_list(*values):\n    if not values: return None\n    head = Node(values[0])\n    curr = head\n    for v in values[1:]:\n        curr.next = Node(v)\n        curr = curr.next\n    return head\n\ndef to_list(head):\n    result, curr = [], head\n    while curr: result.append(curr.data); curr = curr.next\n    return result\n\n\ndef remove_nth_from_end(head, n):\n    """\n    Level 6 — Medium-Hard\n    Remove the Nth node from the end in ONE pass.\n    Uses a dummy node + two-pointer technique.\n    Time: O(L)  Space: O(1)\n    """\n    dummy = Node(0)\n    dummy.next = head\n\n    leader   = dummy\n    follower = dummy\n\n    # Advance leader N+1 steps from dummy\n    for _ in range(n + 1):\n        leader = leader.next\n\n    # Move both until leader is None\n    while leader:\n        leader   = leader.next\n        follower = follower.next\n\n    # follower is just before the node to delete\n    follower.next = follower.next.next\n\n    return dummy.next\n\n\n# ── Tests ──\nprint("remove_nth_from_end tests:")\ncases = [\n    ([1,2,3,4,5], 2, [1,2,3,5]),   # remove 4 (2nd from end)\n    ([1,2,3,4,5], 1, [1,2,3,4]),   # remove last\n    ([1,2,3,4,5], 5, [2,3,4,5]),   # remove head\n    ([1,2],       1, [1]),\n    ([1,2],       2, [2]),\n    ([1],         1, []),\n]\nfor values, n, expected in cases:\n    head   = build_list(*values)\n    result = remove_nth_from_end(head, n)\n    got    = to_list(result)\n    ok     = got == expected\n    print(f"  {'OK' if ok else 'FAIL'}  {values}  n={n}  →  {got}")`
      },

      /* ── Level 7: Hard ── */
      {
        id: "pdsa-prob-ll-merge",
        title: "Lv.7 — Merge Two Sorted Lists",
        language: "python",
        theory: {
          intro: "Given two sorted linked lists, merge them into one sorted list without creating new nodes — just relink the existing nodes. This is the merge step of Merge Sort and a very common interview problem. Two approaches: iterative (O(1) space) or recursive (O(n) stack space).",
          sections: [
            {
              heading: "Iterative Approach",
              content: "Use a dummy node to avoid head-selection logic. Compare the fronts of both lists; attach the smaller one to the merged list. Advance that list's pointer. When one list is exhausted, attach the rest of the other.",
              code: `# List A: 1 → 3 → 5 → None\n# List B: 2 → 4 → 6 → None\n#\n# dummy → ?\n# Compare 1 vs 2  → attach A(1), A=3\n# Compare 3 vs 2  → attach B(2), B=4\n# Compare 3 vs 4  → attach A(3), A=5\n# Compare 5 vs 4  → attach B(4), B=6\n# Compare 5 vs 6  → attach A(5), A=None\n# A exhausted    → attach remaining B: 6\n#\n# Result: 1 → 2 → 3 → 4 → 5 → 6`,
              breakdown: [
                { line: "curr.next = smaller_node", explanation: "We are NOT creating new nodes — just re-pointing the .next pointers of existing nodes." },
                { line: "curr.next = a or b", explanation: "When one list runs out, the other is already sorted — just attach the whole tail." },
              ]
            },
            {
              heading: "Recursive Approach",
              content: "Elegant but uses O(n) call stack. Pick the smaller head recursively.",
              code: `def merge_sorted_recursive(a, b):\n    if not a: return b\n    if not b: return a\n    if a.data <= b.data:\n        a.next = merge_sorted_recursive(a.next, b)\n        return a\n    else:\n        b.next = merge_sorted_recursive(a, b.next)\n        return b`,
              breakdown: [
                { line: "if not a: return b", explanation: "Base case: one list empty — return the other entire list." },
                { line: "a.next = merge_sorted_recursive(a.next, b)", explanation: "Recurse: pick a, link it to the merged result of a.next and b." },
              ]
            }
          ],
          tip: "Prefer the iterative version in interviews — it's O(1) space. The recursive version is cleaner to read but risks stack overflow on very long lists."
        },
        defaultCode: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\ndef build_list(*values):\n    if not values: return None\n    head = Node(values[0])\n    curr = head\n    for v in values[1:]:\n        curr.next = Node(v)\n        curr = curr.next\n    return head\n\ndef to_list(head):\n    r, c = [], head\n    while c: r.append(c.data); c = c.next\n    return r\n\n\ndef merge_sorted(a, b):\n    """\n    Level 7 — Hard\n    Merge two sorted linked lists into one sorted list.\n    Re-links existing nodes — no new Node() created.\n    Time: O(m+n)  Space: O(1)\n    """\n    dummy = Node(0)   # anchor\n    curr  = dummy\n\n    while a and b:\n        if a.data <= b.data:\n            curr.next = a\n            a = a.next\n        else:\n            curr.next = b\n            b = b.next\n        curr = curr.next\n\n    curr.next = a if a else b   # attach remaining\n    return dummy.next\n\n\n# ── Tests ──\nprint("merge_sorted tests:")\ncases = [\n    ([1,3,5],    [2,4,6],   [1,2,3,4,5,6]),\n    ([1,2,4],    [1,3,4],   [1,1,2,3,4,4]),\n    ([],         [1,2,3],   [1,2,3]),\n    ([1,2,3],    [],        [1,2,3]),\n    ([5],        [1,2,3,4], [1,2,3,4,5]),\n    ([1,1,1],    [1,1],     [1,1,1,1,1]),\n]\nfor av, bv, expected in cases:\n    a = build_list(*av)\n    b = build_list(*bv)\n    result = merge_sorted(a, b)\n    got = to_list(result)\n    ok  = got == expected\n    print(f"  {'OK' if ok else 'FAIL'}  {av} + {bv}  =>  {got}")`
      }
    ]
  },

  /* ── Chapter 3: Theory Review (7 MCQs) ── */
  {
    id: "pdsa-theory",
    title: "Theory Review",
    lessons: [
      {
        id: "pdsa-theory-mcq",
        title: "DS Theory Quiz (7 Qs)",
        language: "html",
        theory: {
          intro: "Test your understanding of Stacks, Queues, and Linked Lists across 7 theory questions. Each question has one correct answer. After submitting, you'll see an explanation. Aim for 6/7 or higher.",
          sections: [
            {
              heading: "Topics Covered",
              content: "This quiz covers: core principles (LIFO/FIFO), time complexities, Python-specific implementation choices, pointer mechanics in linked lists, algorithm design (fast/slow pointers, Floyd's cycle detection), and real-world use cases.",
              code: null,
              breakdown: []
            },
            {
              heading: "Key Facts to Remember",
              content: "Review these before attempting the quiz.",
              code: `# Stack  — LIFO, O(1) push/pop with Python list\n# Queue  — FIFO, O(1) enqueue/dequeue with collections.deque\n#          (list.pop(0) is O(n) — NEVER use it as a queue!)\n# LL     — O(n) search, O(1) insert/delete at known position\n#          (arrays: O(1) access by index, O(n) insert/delete)\n#\n# Function call stack → Stack\n# BFS graph traversal → Queue\n# Undo/Redo           → Two Stacks\n# Cycle detection     → Fast/Slow pointer (Floyd's)\n# Middle of LL        → Fast/Slow pointer`,
              breakdown: [
                { line: "collections.deque", explanation: "Double-ended queue. O(1) at both ends. Python's list is O(n) for pop(0)." },
                { line: "Fast/Slow pointer", explanation: "Both start at head. Slow += 1, Fast += 2 each step. Meeting means cycle; stopping means middle." },
                { line: "Dummy node trick", explanation: "Prepend a sentinel node to avoid special-casing head deletion in linked list problems." },
              ]
            }
          ],
          tip: "For each wrong answer, read the explanation carefully — the 'why' is more important than the 'what' for exam questions."
        },
        defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>DS Theory Quiz</title>\n  <style>\n    *{box-sizing:border-box;margin:0;padding:0}\n    body{font-family:system-ui;background:#0f172a;color:#e2e8f0;padding:1.5rem;line-height:1.6}\n    h2{color:#5eead4;margin-bottom:.25rem}\n    .sub{color:#94a3b8;font-size:.85rem;margin-bottom:1.5rem}\n    .progress-bar{height:6px;background:#1e293b;border-radius:3px;margin-bottom:1.5rem}\n    .progress-fill{height:100%;background:linear-gradient(90deg,#14b8a6,#6366f1);border-radius:3px;transition:width .4s}\n    .q-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem}\n    .q-num{font-size:.75rem;color:#94a3b8;font-weight:700;text-transform:uppercase}\n    .q-score{font-size:.75rem;color:#5eead4;font-weight:700}\n    .question{font-size:1rem;font-weight:600;color:#f1f5f9;margin-bottom:1rem;padding:.75rem 1rem;background:#1e293b;border-radius:8px;border-left:3px solid #14b8a6}\n    .options{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem}\n    .opt{padding:.75rem 1rem;border-radius:8px;border:1.5px solid #334155;background:#1e293b;color:#e2e8f0;cursor:pointer;text-align:left;font-size:.9rem;transition:border-color .15s,background .15s}\n    .opt:hover:not(:disabled){border-color:#6366f1;background:#1e293b}\n    .opt.correct{background:#064e3b;border-color:#10b981;color:#6ee7b7}\n    .opt.wrong{background:#450a0a;border-color:#ef4444;color:#fca5a5}\n    .opt.reveal{background:#1e3a5f;border-color:#3b82f6;color:#93c5fd}\n    .explain{padding:.75rem 1rem;border-radius:8px;border:1px solid #334155;background:#0f172a;font-size:.85rem;color:#94a3b8;margin-bottom:1rem;display:none}\n    .explain.show{display:block}\n    .nav{display:flex;justify-content:flex-end;gap:.5rem}\n    button.nav-btn{padding:8px 20px;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:.85rem;background:#6366f1;color:#fff}\n    button.nav-btn:disabled{background:#334155;color:#94a3b8;cursor:default}\n    .results{text-align:center;padding:2rem}\n    .big-score{font-size:3rem;font-weight:800;color:#5eead4}\n    .result-msg{font-size:1.1rem;margin:.5rem 0 1.5rem}\n    .retry-btn{padding:10px 28px;border:none;border-radius:8px;background:#14b8a6;color:#0f172a;font-weight:700;cursor:pointer;font-size:.95rem}\n  </style>\n</head>\n<body>\n  <h2>DS Theory Quiz</h2>\n  <p class="sub">7 questions on Stack, Queue, and Linked List</p>\n  <div class="progress-bar"><div class="progress-fill" id="pgfill" style="width:0%"></div></div>\n  <div id="quizArea"></div>\n  <script>\n    var questions = [\n      {\n        q: "Which principle governs a Stack?",\n        opts: ["FIFO — First In, First Out","LIFO — Last In, First Out","FILO — First In, Last Out","Random access order"],\n        ans: 1,\n        explain: "LIFO: the most recently pushed item is the first to be removed. FIFO describes a Queue. FILO and LIFO are the same thing — LIFO is the standard term."\n      },\n      {\n        q: "Why should you use collections.deque instead of a list to implement a Queue in Python?",\n        opts: ["deque uses less memory","list.pop(0) is O(n) — it shifts every element left","deque supports indexing, list does not","list cannot hold strings"],\n        ans: 1,\n        explain: "list.pop(0) removes the first element and shifts all remaining elements left — O(n). deque.popleft() is O(1) because it uses a doubly-linked internal structure."\n      },\n      {\n        q: "In a singly linked list with 5 nodes, what is the time complexity of accessing the 4th node?",\n        opts: ["O(1)","O(log n)","O(n)","O(n^2)"],\n        ans: 2,\n        explain: "Linked lists have no index. To reach node 4, you must traverse head → 2 → 3 → 4. In the worst case (last node) it is O(n). Arrays give O(1) index access."\n      },\n      {\n        q: "Floyd's cycle detection algorithm uses two pointers: slow (moves 1 step) and fast (moves 2 steps). What happens when they meet?",\n        opts: ["The list has no cycle","slow is at the middle of the list","There is a cycle in the list","fast has reached the end"],\n        ans: 2,\n        explain: "If fast ever equals slow (and it's not the start), they've lapped each other inside a cycle. If fast reaches None, there is no cycle. Meeting implies cycle."\n      },\n      {\n        q: "Which data structure is used internally by Breadth-First Search (BFS)?",\n        opts: ["Stack","Queue","Priority Queue","Linked List"],\n        ans: 1,\n        explain: "BFS explores level by level. A Queue (FIFO) ensures nearer nodes are processed before farther ones. DFS uses a Stack (or the call stack via recursion)."\n      },\n      {\n        q: "You implement a Queue using two stacks (inbox and outbox). What is the amortised time complexity of dequeue()?",\n        opts: ["O(n) always","O(1) amortised","O(log n)","O(n^2)"],\n        ans: 1,\n        explain: "Each element is pushed to inbox once and popped to outbox once — exactly 2 operations total per element. Amortised over many dequeues, that is O(1) per operation."\n      },\n      {\n        q: "A linked list has nodes: 1 → 2 → 3 → 4 → 5. Using fast/slow pointers where slow moves 1 step and fast moves 2 steps, what does slow point to when fast cannot advance further?",\n        opts: ["Node 1","Node 2","Node 3","Node 4"],\n        ans: 2,\n        explain: "Trace: start slow=1 fast=1. Step1: slow=2 fast=3. Step2: slow=3 fast=5. Step3: fast.next=None, stop. Slow=3 — the middle node. For even-length lists it lands on the second middle."\n      }\n    ];\n    var current=0, score=0, answered=false;\n    function render(){\n      if(current>=questions.length){showResult();return;}\n      answered=false;\n      var q=questions[current];\n      document.getElementById("pgfill").style.width=(current/questions.length*100)+"%";\n      var html="<div class=\\"q-header\\"><span class=\\"q-num\\">Question "+(current+1)+" of "+questions.length+"</span><span class=\\"q-score\\">Score: "+score+"</span></div>";\n      html+="<div class=\\"question\\">"+q.q+"</div><div class=\\"options\\" id=\\"opts\\">";\n      q.opts.forEach(function(o,i){ html+="<button class=\\"opt\\" onclick=\\"pick("+i+")\\" id=\\"opt"+i+"\\">"+["A","B","C","D"][i]+". "+o+"</button>"; });\n      html+="</div><div class=\\"explain\\" id=\\"exp\\">"+q.explain+"</div><div class=\\"nav\\"><button class=\\"nav-btn\\" id=\\"nextBtn\\" onclick=\\"next()\\" disabled>Next &rarr;</button></div>";\n      document.getElementById("quizArea").innerHTML=html;\n    }\n    function pick(idx){\n      if(answered)return; answered=true;\n      var q=questions[current];\n      var correct=idx===q.ans;\n      if(correct)score++;\n      q.opts.forEach(function(_,i){\n        var btn=document.getElementById("opt"+i);\n        btn.disabled=true;\n        if(i===q.ans)btn.className="opt correct";\n        else if(i===idx&&!correct)btn.className="opt wrong";\n        else if(i!==idx&&i!==q.ans)btn.className="opt reveal";\n      });\n      document.getElementById("exp").classList.add("show");\n      document.getElementById("nextBtn").disabled=false;\n    }\n    function next(){current++;render();}\n    function showResult(){\n      document.getElementById("pgfill").style.width="100%";\n      var pct=Math.round(score/questions.length*100);\n      var emoji=pct>=86?"🏆":pct>=57?"👍":"📚";\n      var msg=pct>=86?"Outstanding! You have mastered the fundamentals.":pct>=57?"Good work! Review the explanations you missed.":"Keep going — re-read the theory sections and retry.";\n      document.getElementById("quizArea").innerHTML="<div class=\\"results\\"><div style=\\"font-size:3rem\\">"+emoji+"</div><div class=\\"big-score\\">"+score+"/"+questions.length+"</div><div class=\\"result-msg\\">"+msg+"</div><button class=\\"retry-btn\\" onclick=\\"retry()\\">Try Again</button></div>";\n    }\n    function retry(){current=0;score=0;render();}\n    render();\n  </script>\n</body></html>`
      }
    ]
  }
];
