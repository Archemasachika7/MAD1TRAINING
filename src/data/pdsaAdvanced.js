// Advanced PDSA chapters: Arrays / Deque / Heap / BST theory,
// immersive visualizers, and empty-slate build-it-yourself labs.

export const pdsaAdvancedChapters = [

  /* ══════════════ Chapter A: Arrays, Deque, Heap & BST ══════════════ */
  {
    id: "pdsa-adv-topics",
    title: "Arrays, Deque, Heap & BST",
    lessons: [

      {
        id: "pdsa-arrays",
        title: "Arrays",
        language: "python",
        theory: {
          intro: "An array stores elements in one contiguous block of memory. That single fact explains everything about it: indexing is instant (O(1)) because the address of element i is just start + i × size, but inserting in the middle is slow (O(n)) because every element after the insertion point must shift.",
          sections: [
            {
              heading: "O(1) Indexing — The Superpower",
              content: "To read arr[3], the computer computes one address and jumps straight there. No walking, no searching. This is why arrays beat linked lists for read-heavy workloads.",
              code: `# Memory layout of arr = [10, 20, 30, 40, 50]\n#\n#  address:  1000   1004   1008   1012   1016\n#  value:   [ 10 ] [ 20 ] [ 30 ] [ 40 ] [ 50 ]\n#  index:      0      1      2      3      4\n#\n# arr[3] → address 1000 + 3*4 = 1012 → value 40\n# One multiplication + one jump = O(1), always.`,
              breakdown: [
                { line: "arr[i]", explanation: "O(1) — direct address computation, no traversal." },
                { line: "arr[i] = x", explanation: "O(1) — overwrite in place, nothing shifts." },
              ]
            },
            {
              heading: "Insert & Delete — The Weakness",
              content: "Inserting at index 1 of a 5-element array forces elements at index 1,2,3,4 to shift right. Deleting shifts them left. In the worst case (front of the array) that is O(n) moves.",
              code: `# insert(1, 99) into [10, 20, 30, 40, 50]:\n#\n#  before: [10][20][30][40][50]\n#  shift:  [10][  ][20][30][40][50]   ← 4 elements moved right\n#  after:  [10][99][20][30][40][50]\n#\n# Python: arr.insert(1, 99)  → O(n)\n# Python: arr.append(99)     → O(1) amortised (end needs no shift)`,
              breakdown: [
                { line: "arr.insert(0, x)", explanation: "O(n) — worst case, everything shifts." },
                { line: "arr.append(x)", explanation: "O(1) amortised — end of array, occasional resize." },
                { line: "arr.pop()", explanation: "O(1) — remove from end, no shift." },
                { line: "arr.pop(0)", explanation: "O(n) — remove from front, everything shifts left." },
              ]
            },
            {
              heading: "Dynamic Arrays (Python Lists)",
              content: "Python lists are dynamic arrays: when full, they allocate a bigger block (~1.125x) and copy everything over. That copy is O(n) but happens rarely, so append stays O(1) amortised.",
              code: `import sys\narr = []\nfor i in range(20):\n    arr.append(i)\n    # sys.getsizeof shows capacity jumps in steps,\n    # not on every append — that's the growth strategy.\n    print(len(arr), sys.getsizeof(arr))`,
              breakdown: []
            },
            {
              heading: "Two-Pointer Technique",
              content: "Many array problems are solved in O(n) with two indexes moving toward each other (reverse, palindrome, pair-sum on sorted arrays) or in the same direction (sliding window).",
              code: `def reverse_in_place(arr):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        arr[left], arr[right] = arr[right], arr[left]\n        left += 1\n        right -= 1\n    return arr\n\n# O(n) time, O(1) extra space — no second array needed.`,
              breakdown: []
            }
          ],
          tip: "Interview shortcut: if the problem says 'sorted array', think two pointers or binary search before anything else."
        },
        defaultCode: `# ── Arrays: costs you can SEE ──\n\narr = [10, 20, 30, 40, 50]\n\n# 1) O(1) indexing — direct jump\nprint("arr[3] =", arr[3])\n\n# 2) O(n) insert — count the shifts yourself\ndef insert_with_count(a, idx, val):\n    """Simulate array insert; return how many elements had to shift."""\n    shifts = len(a) - idx\n    a.append(None)              # grow by one slot\n    for i in range(len(a) - 1, idx, -1):\n        a[i] = a[i - 1]         # shift right\n    a[idx] = val\n    return shifts\n\ndata = [10, 20, 30, 40, 50]\nmoved = insert_with_count(data, 1, 99)\nprint("after insert:", data, "| elements shifted:", moved)\n\nmoved = insert_with_count(data, 0, 7)\nprint("after insert:", data, "| elements shifted:", moved)\n\n# 3) Two-pointer reverse — O(n) time, O(1) space\ndef reverse_in_place(a):\n    left, right = 0, len(a) - 1\n    while left < right:\n        a[left], a[right] = a[right], a[left]\n        left += 1\n        right -= 1\n    return a\n\nprint("reversed:", reverse_in_place([1, 2, 3, 4, 5]))\n\n# 4) Two-pointer pair-sum on a SORTED array\ndef pair_sum(a, target):\n    left, right = 0, len(a) - 1\n    while left < right:\n        s = a[left] + a[right]\n        if s == target:\n            return (a[left], a[right])\n        if s < target:\n            left += 1\n        else:\n            right -= 1\n    return None\n\nsorted_arr = [2, 4, 7, 11, 15, 20]\nprint("pair summing to 26:", pair_sum(sorted_arr, 26))\nprint("pair summing to 9: ", pair_sum(sorted_arr, 9))\nprint("pair summing to 5: ", pair_sum(sorted_arr, 5))`
      },

      {
        id: "pdsa-deque",
        title: "Deque (Double-Ended Queue)",
        language: "python",
        theory: {
          intro: "A deque ('deck') is a queue that is open at BOTH ends: you can push and pop at the front and the back, all in O(1). Python's collections.deque is the tool of choice for queues, sliding windows, and bounded histories.",
          sections: [
            {
              heading: "Four O(1) Operations",
              content: "A deque supports append (back), appendleft (front), pop (back), popleft (front) — all constant time. A plain Python list only gets O(1) at the back; the front costs O(n).",
              code: `from collections import deque\n\nd = deque([2, 3, 4])\nd.append(5)        # back:  [2, 3, 4, 5]\nd.appendleft(1)    # front: [1, 2, 3, 4, 5]\nd.pop()            # → 5   [1, 2, 3, 4]\nd.popleft()        # → 1   [2, 3, 4]`,
              breakdown: [
                { line: "d.append(x)", explanation: "O(1) — add at the back." },
                { line: "d.appendleft(x)", explanation: "O(1) — add at the front (list.insert(0,x) is O(n)!)." },
                { line: "d.pop()", explanation: "O(1) — remove from the back." },
                { line: "d.popleft()", explanation: "O(1) — remove from the front (list.pop(0) is O(n)!)." },
              ]
            },
            {
              heading: "Bounded History with maxlen",
              content: "deque(maxlen=k) automatically discards the oldest item when a new one arrives past capacity — perfect for 'last N events' logs and moving averages.",
              code: `from collections import deque\n\nrecent = deque(maxlen=3)\nfor page in ["home", "about", "docs", "pricing"]:\n    recent.append(page)\n\nprint(recent)   # deque(['about', 'docs', 'pricing'], maxlen=3)\n# "home" fell off the front automatically.`,
              breakdown: []
            },
            {
              heading: "Classic Use: Palindrome Check",
              content: "Compare front vs back repeatedly: popleft() and pop() must match every round. When 0 or 1 characters remain, it's a palindrome.",
              code: `from collections import deque\n\ndef is_palindrome(s):\n    d = deque(s)\n    while len(d) > 1:\n        if d.popleft() != d.pop():\n            return False\n    return True`,
              breakdown: []
            }
          ],
          tip: "Rule of thumb: the moment you write list.pop(0) or list.insert(0, x), stop and switch to a deque."
        },
        defaultCode: `from collections import deque\n\n# ── 1) All four ends, all O(1) ──\nd = deque([2, 3, 4])\nprint("start:      ", list(d))\nd.append(5);      print("append(5):  ", list(d))\nd.appendleft(1);  print("appendleft: ", list(d))\nprint("pop() ->", d.pop(), "     ", list(d))\nprint("popleft() ->", d.popleft(), " ", list(d))\n\n# ── 2) Bounded history (maxlen) ──\nrecent = deque(maxlen=3)\nfor page in ["home", "about", "docs", "pricing", "contact"]:\n    recent.append(page)\n    print(f"visited {page:8} -> last 3: {list(recent)}")\n\n# ── 3) Palindrome check with a deque ──\ndef is_palindrome(s):\n    d = deque(ch.lower() for ch in s if ch.isalnum())\n    while len(d) > 1:\n        if d.popleft() != d.pop():\n            return False\n    return True\n\nprint()\nfor word in ["racecar", "hello", "Madam", "A man, a plan, a canal: Panama"]:\n    print(f"is_palindrome({word!r}) = {is_palindrome(word)}")\n\n# ── 4) Sliding-window maximum (monotonic deque) ──\ndef sliding_window_max(nums, k):\n    """For every window of size k, the max — in O(n) total."""\n    dq = deque()   # stores indexes; values decrease front->back\n    out = []\n    for i, x in enumerate(nums):\n        while dq and nums[dq[-1]] <= x:\n            dq.pop()               # smaller values can never be max again\n        dq.append(i)\n        if dq[0] <= i - k:\n            dq.popleft()           # front index fell out of the window\n        if i >= k - 1:\n            out.append(nums[dq[0]])\n    return out\n\nprint()\nnums = [1, 3, -1, -3, 5, 3, 6, 7]\nprint("nums:", nums)\nprint("window max (k=3):", sliding_window_max(nums, 3))\n# expected: [3, 3, 5, 5, 6, 7]`
      },

      {
        id: "pdsa-heap",
        title: "Heap & Priority Queue",
        language: "python",
        theory: {
          intro: "A heap is a complete binary tree where every parent is smaller than its children (min-heap). The smallest element is always at the root, so 'give me the minimum' is O(1) and insert/remove are O(log n). Python's heapq module implements a min-heap on top of a plain list.",
          sections: [
            {
              heading: "The Heap Property & Array Trick",
              content: "A heap is stored as an array — no pointers needed. For a node at index i: its children live at 2i+1 and 2i+2, and its parent at (i-1)//2. 'Complete' means levels fill left to right with no gaps.",
              code: `# Min-heap [1, 3, 2, 7, 4, 9] as a tree:\n#\n#            1          index 0\n#          /   \\\n#         3     2       index 1, 2\n#        / \\   /\n#       7   4 9         index 3, 4, 5\n#\n# parent(i) = (i-1)//2\n# left(i)   = 2i+1\n# right(i)  = 2i+2\n# Property: heap[parent] <= heap[child], everywhere.`,
              breakdown: [
                { line: "heap[0]", explanation: "The minimum — always at the root. Peek is O(1)." },
                { line: "heappush", explanation: "Append at the end, then 'sift up' by swapping with parent while smaller — O(log n)." },
                { line: "heappop", explanation: "Take root, move last element to root, 'sift down' — O(log n)." },
              ]
            },
            {
              heading: "heapq in Practice",
              content: "heapq works on plain lists. heappush and heappop maintain the property. To make a max-heap, push negated values and negate again on the way out.",
              code: `import heapq\n\nh = []\nfor x in [5, 1, 8, 3]:\n    heapq.heappush(h, x)\n\nheapq.heappop(h)   # → 1 (always the smallest)\nheapq.heappop(h)   # → 3\n\n# Max-heap trick: negate\nmx = []\nfor x in [5, 1, 8, 3]:\n    heapq.heappush(mx, -x)\n-heapq.heappop(mx)  # → 8 (the largest)`,
              breakdown: []
            },
            {
              heading: "Priority Queue: (priority, item) Tuples",
              content: "Push tuples — heapq compares the first element first. Lower number = higher priority. This is how hospital triage, OS schedulers, and Dijkstra's algorithm work.",
              code: `import heapq\n\ntasks = []\nheapq.heappush(tasks, (2, "email client"))\nheapq.heappush(tasks, (1, "fix prod bug"))\nheapq.heappush(tasks, (3, "water plants"))\n\nwhile tasks:\n    prio, task = heapq.heappop(tasks)\n    print(prio, task)\n# → 1 fix prod bug, 2 email client, 3 water plants`,
              breakdown: []
            }
          ],
          tip: "See 'k largest', 'k smallest', 'k most frequent', or 'merge k sorted' in a problem? A heap of size k is almost always the intended answer."
        },
        defaultCode: `import heapq\n\n# ── 1) Min-heap basics ──\nh = []\nfor x in [5, 1, 8, 3, 9, 2]:\n    heapq.heappush(h, x)\n    print(f"push {x} -> heap array: {h}   (root={h[0]})")\n\nprint("\\npopping everything (comes out sorted!):")\nout = []\nwhile h:\n    out.append(heapq.heappop(h))\nprint(out)   # heapsort in disguise\n\n# ── 2) Max-heap via negation ──\nmx = []\nfor x in [5, 1, 8, 3]:\n    heapq.heappush(mx, -x)\nprint("\\nmax:", -heapq.heappop(mx), "| next max:", -heapq.heappop(mx))\n\n# ── 3) Priority queue: hospital triage ──\nprint("\\nHospital triage (1 = most urgent):")\ner = []\nheapq.heappush(er, (3, "sprained ankle"))\nheapq.heappush(er, (1, "cardiac arrest"))\nheapq.heappush(er, (2, "broken arm"))\nheapq.heappush(er, (1, "severe bleeding"))\nwhile er:\n    prio, patient = heapq.heappop(er)\n    print(f"  treat [P{prio}] {patient}")\n\n# ── 4) k largest with a size-k min-heap — O(n log k) ──\ndef k_largest(nums, k):\n    heap = []\n    for x in nums:\n        if len(heap) < k:\n            heapq.heappush(heap, x)\n        elif x > heap[0]:\n            heapq.heapreplace(heap, x)   # pop min, push x\n    return sorted(heap, reverse=True)\n\nnums = [7, 2, 19, 4, 42, 13, 8, 25, 1]\nprint("\\n3 largest of", nums, "->", k_largest(nums, 3))\n\n# ── 5) heapsort as a function ──\ndef heapsort(nums):\n    h = list(nums)\n    heapq.heapify(h)               # O(n) build\n    return [heapq.heappop(h) for _ in range(len(h))]\n\nprint("heapsort:", heapsort([9, 4, 7, 1, 8, 2]))`
      },

      {
        id: "pdsa-bst",
        title: "Binary Search Tree",
        language: "python",
        theory: {
          intro: "A Binary Search Tree keeps values in sorted structure: for every node, everything in the LEFT subtree is smaller and everything in the RIGHT subtree is larger. Each comparison discards half the remaining tree — search, insert, and delete are O(h), which is O(log n) when the tree is balanced.",
          sections: [
            {
              heading: "The BST Property",
              content: "left < node < right, applied recursively at every node. Searching for 40: compare with 50 → go left; compare with 30 → go right; found. Three comparisons instead of scanning everything.",
              code: `# BST built from 50, 30, 70, 20, 40, 60, 80:\n#\n#             50\n#           /    \\\n#         30      70\n#        /  \\    /  \\\n#      20   40  60   80\n#\n# search(40): 40 < 50 → left, 40 > 30 → right → FOUND (2 hops)\n# search(65): 65 > 50 → right, 65 < 70 → left, 65 > 60 → right → None`,
              breakdown: [
                { line: "v < node.value", explanation: "Go left — the right subtree can't possibly contain v." },
                { line: "v > node.value", explanation: "Go right — the left subtree is all smaller." },
                { line: "node is None", explanation: "Fell off the tree: value not present (or this is where to insert it)." },
              ]
            },
            {
              heading: "In-Order Traversal = Sorted Order",
              content: "Visit left subtree, then the node, then right subtree. Because of the BST property this always yields values in ascending order — the classic way to verify a BST is valid.",
              code: `def in_order(node, out):\n    if node:\n        in_order(node.left, out)\n        out.append(node.value)\n        in_order(node.right, out)\n\n# On the tree above → [20, 30, 40, 50, 60, 70, 80]`,
              breakdown: []
            },
            {
              heading: "Balanced vs Skewed — the O(n) Trap",
              content: "Insert 1,2,3,4,5 in order and every node goes right: the 'tree' degenerates into a linked list and search becomes O(n). Self-balancing trees (AVL, Red-Black) fix this by rotating; that's what databases use for indexes.",
              code: `# insert(1..5) in ascending order:\n#\n#   1\n#    \\\n#     2        height = n\n#      \\       search = O(n)  ← lost the log!\n#       3\n#        \\\n#         4\n#          \\\n#           5`,
              breakdown: []
            },
            {
              heading: "Min, Max, Height",
              content: "Minimum = walk left until you can't. Maximum = walk right. Height = 1 + max(height(left), height(right)) — compare it to log2(n) to judge how balanced your tree is.",
              code: `def find_min(node):\n    while node.left:\n        node = node.left\n    return node.value    # leftmost = smallest`,
              breakdown: []
            }
          ],
          tip: "The interview one-liner: 'BST gives O(log n) search IF balanced; in-order traversal yields sorted order; inserting sorted data skews it to O(n).'"
        },
        defaultCode: `class Node:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\n\nclass BST:\n    def __init__(self):\n        self.root = None\n\n    def insert(self, value):\n        self.root = self._insert(self.root, value)\n\n    def _insert(self, node, value):\n        if node is None:\n            return Node(value)\n        if value < node.value:\n            node.left = self._insert(node.left, value)\n        elif value > node.value:\n            node.right = self._insert(node.right, value)\n        return node   # duplicates ignored\n\n    def search(self, value):\n        """Return the comparison path taken, and whether found."""\n        path, node = [], self.root\n        while node:\n            path.append(node.value)\n            if value == node.value:\n                return path, True\n            node = node.left if value < node.value else node.right\n        return path, False\n\n    def in_order(self):\n        out = []\n        def walk(node):\n            if node:\n                walk(node.left)\n                out.append(node.value)\n                walk(node.right)\n        walk(self.root)\n        return out\n\n    def find_min(self):\n        node = self.root\n        while node and node.left:\n            node = node.left\n        return node.value if node else None\n\n    def find_max(self):\n        node = self.root\n        while node and node.right:\n            node = node.right\n        return node.value if node else None\n\n    def height(self):\n        def h(node):\n            if node is None:\n                return 0\n            return 1 + max(h(node.left), h(node.right))\n        return h(self.root)\n\n\n# ── Build a balanced-ish tree ──\ntree = BST()\nfor v in [50, 30, 70, 20, 40, 60, 80]:\n    tree.insert(v)\n\nprint("in-order (sorted!):", tree.in_order())\nprint("min:", tree.find_min(), "| max:", tree.find_max())\nprint("height:", tree.height(), "(7 nodes, log2(7)~2.8 -> balanced)")\n\nfor target in [40, 65, 80]:\n    path, found = tree.search(target)\n    status = "FOUND" if found else "not found"\n    print(f"search({target}): path {path} -> {status}")\n\n# ── The skew trap: insert sorted data ──\nskewed = BST()\nfor v in [1, 2, 3, 4, 5, 6, 7]:\n    skewed.insert(v)\nprint("\\nskewed tree height:", skewed.height(), "(7 nodes -> it's a linked list!)")\nprint("balanced height was:", tree.height(), "- same node count, very different cost")`
      }
    ]
  },

  /* ══════════════ Chapter B: Advanced Visualizations ══════════════ */
  {
    id: "pdsa-adv-viz",
    title: "Advanced Visualizations",
    lessons: [

      {
        id: "pdsa-viz-array",
        title: "Array Visualizer",
        language: "html",
        theory: {
          intro: "Watch the real cost of array operations. Access flashes ONE cell (O(1) — a direct jump). Insert and delete light up every cell that had to shift (O(n)). The shift counter is the whole lesson.",
          sections: [
            {
              heading: "What to Try",
              content: "1) Access index 4 — one green flash, zero shifts. 2) Insert 99 at index 0 — every cell flashes orange as it shifts right. 3) Insert at the END — zero shifts, that's why append is cheap. 4) Delete index 0 vs delete the last index and compare shift counts.",
              code: null,
              breakdown: []
            },
            {
              heading: "Reading the Stats",
              content: "'Last op cost' shows how many element moves the operation caused. Access is always 0. Insert/delete at position i in an n-element array moves about n−i elements — front is worst, back is free.",
              code: `# Cost table for array of length n:\n# access(i)        0 shifts   O(1)\n# insert at end    0 shifts   O(1) amortised\n# insert at front  n shifts   O(n)\n# delete at front  n-1 shifts O(n)\n# delete at end    0 shifts   O(1)`,
              breakdown: []
            }
          ],
          tip: "Insert at index 0 five times in a row and watch the shift count grow each time — the array gets more expensive to prepend to as it grows. A deque wouldn't."
        },
        defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Array Visualizer</title>\n  <style>\n    *{box-sizing:border-box;margin:0;padding:0}\n    body{font-family:system-ui;background:#0f172a;color:#e2e8f0;padding:1.5rem}\n    h2{color:#fbbf24;margin-bottom:.25rem}\n    .sub{color:#94a3b8;font-size:.85rem;margin-bottom:1.2rem}\n    .controls{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.2rem;align-items:center}\n    input{background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:7px 10px;border-radius:6px;width:80px}\n    button{padding:7px 14px;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:.8rem}\n    .bacc{background:#22c55e;color:#0f172a}.bins{background:#f59e0b;color:#0f172a}.bdel{background:#f43f5e;color:#fff}.bapp{background:#3b82f6;color:#fff}.bc{background:#475569;color:#fff}\n    .track{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:1rem;min-height:70px;align-items:flex-start}\n    .cellwrap{display:flex;flex-direction:column;align-items:center}\n    .cell{width:58px;height:48px;background:#1e293b;border:2px solid #334155;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1rem;transition:background .2s,border-color .2s}\n    .cell.hit{background:#14532d;border-color:#22c55e;color:#86efac}\n    .cell.shifted{background:#451a03;border-color:#f59e0b;color:#fcd34d}\n    .cell.fresh{background:#172554;border-color:#3b82f6;color:#93c5fd}\n    .idx{font-size:.65rem;color:#64748b;margin-top:4px;font-family:monospace}\n    .stats{display:flex;gap:.75rem;margin-bottom:.75rem;flex-wrap:wrap}\n    .stat{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:.6rem 1rem}\n    .lbl{font-size:.65rem;color:#94a3b8;text-transform:uppercase}\n    .val{font-size:1.05rem;font-weight:700;color:#fbbf24}\n    .log{background:#0a0e14;padding:.75rem;border-radius:8px;font-family:monospace;font-size:.78rem;color:#7dd3fc;max-height:150px;overflow-y:auto}\n    .empty{color:#475569;font-style:italic;padding:.8rem}\n  </style>\n</head>\n<body>\n  <h2>Array Visualizer</h2>\n  <p class="sub">Green flash = O(1) access &middot; Orange cells = elements that had to SHIFT</p>\n  <div class="controls">\n    <input id="ival" placeholder="value">\n    <input id="iidx" placeholder="index">\n    <button class="bacc" onclick="doAccess()">Access [i]</button>\n    <button class="bins" onclick="doInsert()">Insert @ i</button>\n    <button class="bdel" onclick="doDelete()">Delete @ i</button>\n    <button class="bapp" onclick="doAppend()">Append (end)</button>\n    <button class="bc" onclick="doReset()">Reset</button>\n  </div>\n  <div class="track" id="viz"></div>\n  <div class="stats">\n    <div class="stat"><div class="lbl">Length</div><div class="val" id="len">0</div></div>\n    <div class="stat"><div class="lbl">Last op cost</div><div class="val" id="cost">-</div></div>\n    <div class="stat"><div class="lbl">Total shifts</div><div class="val" id="tot">0</div></div>\n  </div>\n  <div class="log" id="log">-- operation log --</div>\n  <script>\n    var arr=[], totalShifts=0, marks={};\n    function render(){\n      var v=document.getElementById("viz");\n      document.getElementById("len").textContent=arr.length;\n      if(!arr.length){v.innerHTML="<div class=\\"empty\\">array is empty</div>";return;}\n      v.innerHTML="";\n      arr.forEach(function(x,i){\n        var w=document.createElement("div"); w.className="cellwrap";\n        var c=document.createElement("div"); c.className="cell"+(marks[i]?" "+marks[i]:"");\n        c.textContent=x;\n        var l=document.createElement("div"); l.className="idx"; l.textContent="["+i+"]";\n        w.appendChild(c); w.appendChild(l); v.appendChild(w);\n      });\n      marks={};\n    }\n    function addLog(m){var el=document.getElementById("log"),d=document.createElement("div");d.textContent="> "+m;el.appendChild(d);el.scrollTop=el.scrollHeight;}\n    function setCost(n){document.getElementById("cost").textContent=n+" shift"+(n===1?"":"s");totalShifts+=n;document.getElementById("tot").textContent=totalShifts;}\n    function getIdx(){var i=parseInt(document.getElementById("iidx").value);return isNaN(i)?null:i;}\n    function getVal(){return document.getElementById("ival").value.trim();}\n    function doAccess(){\n      var i=getIdx();\n      if(i===null||i<0||i>=arr.length){addLog("access: index out of range");return;}\n      marks[i]="hit"; setCost(0);\n      addLog("arr["+i+"] => "+arr[i]+"   O(1), 0 shifts"); render();\n    }\n    function doInsert(){\n      var i=getIdx(), val=getVal();\n      if(!val){addLog("insert: enter a value");return;}\n      if(i===null||i<0||i>arr.length){addLog("insert: index must be 0.."+arr.length);return;}\n      var shifts=arr.length-i;\n      arr.splice(i,0,val);\n      marks[i]="fresh";\n      for(var k=i+1;k<arr.length;k++) marks[k]="shifted";\n      setCost(shifts);\n      addLog("insert("+i+", "+val+")   "+shifts+" element(s) shifted right "+(shifts?"- O(n)":"- O(1), lucky spot!"));\n      render();\n    }\n    function doDelete(){\n      var i=getIdx();\n      if(i===null||i<0||i>=arr.length){addLog("delete: index out of range");return;}\n      var gone=arr[i], shifts=arr.length-i-1;\n      arr.splice(i,1);\n      for(var k=i;k<arr.length;k++) marks[k]="shifted";\n      setCost(shifts);\n      addLog("delete("+i+") removed "+gone+"   "+shifts+" element(s) shifted left");\n      render();\n    }\n    function doAppend(){\n      var val=getVal();\n      if(!val){addLog("append: enter a value");return;}\n      arr.push(val); marks[arr.length-1]="fresh"; setCost(0);\n      addLog("append("+val+")   0 shifts - this is why append is O(1)");\n      render();\n    }\n    function doReset(){arr=[10,20,30,40,50];totalShifts=0;document.getElementById("tot").textContent=0;document.getElementById("cost").textContent="-";addLog("reset to [10,20,30,40,50]");render();}\n    doReset();\n  </script>\n</body></html>`
      },

      {
        id: "pdsa-viz-deque",
        title: "Deque Visualizer",
        language: "html",
        theory: {
          intro: "A deque is open at both ends — and here you can prove it. Four buttons, four O(1) operations. Compare with the Array visualizer: pushing FRONT here costs nothing, while inserting at index 0 of an array shifted everything.",
          sections: [
            {
              heading: "What to Try",
              content: "1) Push Back 1,2,3 then Push Front 0 — no shifting, the item just attaches. 2) Alternate Pop Front / Pop Back and watch both ends shrink toward the middle. 3) Use it as a queue (push back + pop front only), then as a stack (push back + pop back only) — a deque can be both.",
              code: `# Same structure, three behaviours:\n# Queue:  push_back  + pop_front   (FIFO)\n# Stack:  push_back  + pop_back    (LIFO)\n# Deque:  all four   (both ends)`,
              breakdown: []
            }
          ],
          tip: "The sliding-window-maximum algorithm from the Deque lesson uses exactly these four operations — front holds the current max, back drops the losers."
        },
        defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Deque Visualizer</title>\n  <style>\n    *{box-sizing:border-box;margin:0;padding:0}\n    body{font-family:system-ui;background:#0f172a;color:#e2e8f0;padding:1.5rem}\n    h2{color:#38bdf8;margin-bottom:.25rem}\n    .sub{color:#94a3b8;font-size:.85rem;margin-bottom:1.2rem}\n    .controls{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.2rem;align-items:center}\n    input{background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:7px 12px;border-radius:6px;width:100px}\n    button{padding:7px 14px;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:.8rem}\n    .bpf{background:#22c55e;color:#0f172a}.bpb{background:#3b82f6;color:#fff}.bof{background:#f59e0b;color:#0f172a}.bob{background:#f43f5e;color:#fff}.bc{background:#475569;color:#fff}\n    .zone{display:flex;align-items:center;gap:.6rem;margin-bottom:1rem}\n    .end-lbl{font-size:.7rem;font-weight:800;letter-spacing:.05em}\n    .end-lbl.f{color:#22c55e}.end-lbl.b{color:#f43f5e}\n    .track-wrap{overflow-x:auto;flex:1}\n    .track{display:flex;align-items:center;min-height:64px}\n    .item{background:#0369a1;color:#fff;padding:13px 17px;font-weight:700;border-right:2px solid #0f172a;animation:fi .25s ease;min-width:60px;text-align:center;position:relative}\n    .item:first-child{border-radius:8px 0 0 8px;background:#15803d}\n    .item:last-child{border-radius:0 8px 8px 0;background:#be123c;border-right:none}\n    .item:only-child{border-radius:8px;background:#0e7490}\n    @keyframes fi{from{transform:scale(.7);opacity:0}to{transform:none;opacity:1}}\n    .empty{color:#475569;font-style:italic;padding:.6rem}\n    .stats{display:flex;gap:.75rem;margin-bottom:.75rem;flex-wrap:wrap}\n    .stat{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:.6rem 1rem}\n    .lbl{font-size:.65rem;color:#94a3b8;text-transform:uppercase}\n    .val{font-size:1.05rem;font-weight:700;color:#38bdf8}\n    .log{background:#0a0e14;padding:.75rem;border-radius:8px;font-family:monospace;font-size:.78rem;color:#7dd3fc;max-height:150px;overflow-y:auto}\n  </style>\n</head>\n<body>\n  <h2>Deque Visualizer</h2>\n  <p class="sub">Double-ended queue &mdash; all four operations are O(1)</p>\n  <div class="controls">\n    <input id="val" placeholder="value..." onkeydown="if(event.key==='Enter')pushBack()">\n    <button class="bpf" onclick="pushFront()">&#9668; Push Front</button>\n    <button class="bpb" onclick="pushBack()">Push Back &#9658;</button>\n    <button class="bof" onclick="popFront()">Pop Front</button>\n    <button class="bob" onclick="popBack()">Pop Back</button>\n    <button class="bc" onclick="doClear()">Clear</button>\n  </div>\n  <div class="zone">\n    <span class="end-lbl f">FRONT &#9658;</span>\n    <div class="track-wrap"><div class="track" id="viz"><span class="empty">deque is empty</span></div></div>\n    <span class="end-lbl b">&#9668; BACK</span>\n  </div>\n  <div class="stats">\n    <div class="stat"><div class="lbl">Size</div><div class="val" id="sz">0</div></div>\n    <div class="stat"><div class="lbl">Front</div><div class="val" id="fr">-</div></div>\n    <div class="stat"><div class="lbl">Back</div><div class="val" id="bk">-</div></div>\n    <div class="stat"><div class="lbl">Ops</div><div class="val" id="ops">0</div></div>\n  </div>\n  <div class="log" id="log">-- operation log --</div>\n  <script>\n    var dq=[], ops=0;\n    function render(){\n      var v=document.getElementById("viz");\n      document.getElementById("sz").textContent=dq.length;\n      document.getElementById("fr").textContent=dq.length?dq[0]:"-";\n      document.getElementById("bk").textContent=dq.length?dq[dq.length-1]:"-";\n      if(!dq.length){v.innerHTML="<span class=\\"empty\\">deque is empty</span>";return;}\n      v.innerHTML="";\n      dq.forEach(function(x){var d=document.createElement("div");d.className="item";d.textContent=x;v.appendChild(d);});\n    }\n    function addLog(m){ops++;document.getElementById("ops").textContent=ops;var el=document.getElementById("log"),d=document.createElement("div");d.textContent="> "+m;el.appendChild(d);el.scrollTop=el.scrollHeight;}\n    function getVal(){var v=document.getElementById("val").value.trim();document.getElementById("val").value="";return v;}\n    function pushFront(){var v=getVal();if(!v)return;dq.unshift(v);addLog("appendleft("+v+")   O(1)");render();}\n    function pushBack(){var v=getVal();if(!v)return;dq.push(v);addLog("append("+v+")   O(1)");render();}\n    function popFront(){if(!dq.length){addLog("popleft() ERROR: empty");return;}var v=dq.shift();addLog("popleft() => "+v+"   O(1)");render();}\n    function popBack(){if(!dq.length){addLog("pop() ERROR: empty");return;}var v=dq.pop();addLog("pop() => "+v+"   O(1)");render();}\n    function doClear(){dq=[];addLog("clear()");render();}\n    ["A","B","C"].forEach(function(x){dq.push(x);});render();addLog("preloaded: A, B, C");\n  </script>\n</body></html>`
      },

      {
        id: "pdsa-viz-heap",
        title: "Heap Visualizer",
        language: "html",
        theory: {
          intro: "Insert values and watch them BUBBLE UP the tree; extract the minimum and watch the replacement SINK DOWN. The tree view and the array view update together — proof that a heap is 'just an array wearing a tree costume'.",
          sections: [
            {
              heading: "What to Try",
              content: "1) Insert 5, 3, 8, 1 one at a time — watch 1 swap its way to the root (sift-up, logged step by step). 2) Extract Min — the root leaves, the LAST array element jumps to the top, then sinks to its rightful place (sift-down). 3) Watch the array row: children of index i really are at 2i+1 and 2i+2.",
              code: `# insert(1) into heap [3, 5, 8]:\n#\n#      3              3              1\n#     / \\   sift     / \\   sift     / \\\n#    5   8   -->    1   8   -->    3   8\n#   /              /              /\n#  1              5              5\n#\n# 1 swapped with 5, then with 3 - two O(1) swaps = O(log n)`,
              breakdown: []
            },
            {
              heading: "Why Only O(log n)?",
              content: "A value bubbling up only travels along ONE path from leaf to root — never sideways. A complete tree with n nodes is only log2(n) levels tall, so at most ~log n swaps happen. The log panel counts them for you.",
              code: null,
              breakdown: []
            }
          ],
          tip: "Insert 10 descending values (10,9,8,...) and count the swaps, then insert 10 ascending values (1,2,3,...). Descending inserts never swap; ascending ones swap all the way up every time. Order of arrival matters!"
        },
        defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Min-Heap Visualizer</title>\n  <style>\n    *{box-sizing:border-box;margin:0;padding:0}\n    body{font-family:system-ui;background:#0f172a;color:#e2e8f0;padding:1.5rem}\n    h2{color:#a78bfa;margin-bottom:.25rem}\n    .sub{color:#94a3b8;font-size:.85rem;margin-bottom:1.2rem}\n    .controls{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.2rem;align-items:center}\n    input{background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:7px 12px;border-radius:6px;width:90px}\n    button{padding:7px 16px;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:.85rem}\n    .bi{background:#8b5cf6;color:#fff}.be{background:#f59e0b;color:#0f172a}.bc{background:#475569;color:#fff}\n    .tree{display:flex;flex-direction:column;align-items:center;gap:14px;margin-bottom:1.2rem;min-height:100px}\n    .lvl{display:flex;gap:14px;justify-content:center}\n    .nd{width:52px;height:52px;border-radius:50%;background:#4c1d95;border:2px solid #7c3aed;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;position:relative;animation:pop .25s ease}\n    .nd.root{background:#166534;border-color:#22c55e}\n    .nd .ix{position:absolute;bottom:-16px;font-size:.6rem;color:#64748b;font-weight:400}\n    @keyframes pop{from{transform:scale(.6);opacity:0}to{transform:none;opacity:1}}\n    .arr-view{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:1rem}\n    .ac{display:flex;flex-direction:column;align-items:center}\n    .acell{width:44px;height:38px;background:#1e293b;border:1.5px solid #334155;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem}\n    .acell.r{border-color:#22c55e;color:#86efac}\n    .aidx{font-size:.6rem;color:#64748b;margin-top:3px;font-family:monospace}\n    .sec{font-size:.7rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:.4rem}\n    .stats{display:flex;gap:.75rem;margin-bottom:.75rem;flex-wrap:wrap}\n    .stat{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:.6rem 1rem}\n    .lbl{font-size:.65rem;color:#94a3b8;text-transform:uppercase}\n    .val{font-size:1.05rem;font-weight:700;color:#a78bfa}\n    .log{background:#0a0e14;padding:.75rem;border-radius:8px;font-family:monospace;font-size:.78rem;color:#7dd3fc;max-height:150px;overflow-y:auto}\n    .empty{color:#475569;font-style:italic}\n  </style>\n</head>\n<body>\n  <h2>Min-Heap Visualizer</h2>\n  <p class="sub">Insert bubbles UP &middot; Extract-min sinks DOWN &middot; root is always the minimum</p>\n  <div class="controls">\n    <input id="val" type="number" placeholder="number..." onkeydown="if(event.key==='Enter')doInsert()">\n    <button class="bi" onclick="doInsert()">&#8679; Insert</button>\n    <button class="be" onclick="doExtract()">&#8681; Extract Min</button>\n    <button class="bc" onclick="doReset()">Reset</button>\n  </div>\n  <div class="sec">Tree view</div>\n  <div class="tree" id="tree"><span class="empty">heap is empty</span></div>\n  <div class="sec">Array view (children of i live at 2i+1 and 2i+2)</div>\n  <div class="arr-view" id="arrv"></div>\n  <div class="stats">\n    <div class="stat"><div class="lbl">Size</div><div class="val" id="sz">0</div></div>\n    <div class="stat"><div class="lbl">Min (root)</div><div class="val" id="mn">-</div></div>\n    <div class="stat"><div class="lbl">Swaps (last op)</div><div class="val" id="sw">-</div></div>\n  </div>\n  <div class="log" id="log">-- operation log --</div>\n  <script>\n    var heap=[], lastSwaps=0;\n    function swap(i,j){var t=heap[i];heap[i]=heap[j];heap[j]=t;lastSwaps++;}\n    function siftUp(i){\n      while(i>0){\n        var p=Math.floor((i-1)/2);\n        if(heap[i]<heap[p]){addLog("  sift-up: "+heap[i]+" < parent "+heap[p]+" -> swap");swap(i,p);i=p;}\n        else break;\n      }\n    }\n    function siftDown(i){\n      var n=heap.length;\n      while(true){\n        var l=2*i+1, r=2*i+2, s=i;\n        if(l<n&&heap[l]<heap[s])s=l;\n        if(r<n&&heap[r]<heap[s])s=r;\n        if(s===i)break;\n        addLog("  sift-down: "+heap[i]+" > child "+heap[s]+" -> swap");\n        swap(i,s); i=s;\n      }\n    }\n    function render(){\n      var t=document.getElementById("tree"), a=document.getElementById("arrv");\n      document.getElementById("sz").textContent=heap.length;\n      document.getElementById("mn").textContent=heap.length?heap[0]:"-";\n      document.getElementById("sw").textContent=lastSwaps;\n      if(!heap.length){t.innerHTML="<span class=\\"empty\\">heap is empty</span>";a.innerHTML="";return;}\n      t.innerHTML="";\n      var lvl=0;\n      while((1<<lvl)-1 < heap.length){\n        var row=document.createElement("div"); row.className="lvl";\n        var start=(1<<lvl)-1, end=Math.min((1<<(lvl+1))-2, heap.length-1);\n        for(var i=start;i<=end;i++){\n          var nd=document.createElement("div"); nd.className="nd"+(i===0?" root":"");\n          nd.textContent=heap[i];\n          var ix=document.createElement("span"); ix.className="ix"; ix.textContent="["+i+"]";\n          nd.appendChild(ix); row.appendChild(nd);\n        }\n        t.appendChild(row); lvl++;\n      }\n      a.innerHTML="";\n      heap.forEach(function(x,i){\n        var w=document.createElement("div"); w.className="ac";\n        var c=document.createElement("div"); c.className="acell"+(i===0?" r":""); c.textContent=x;\n        var l=document.createElement("div"); l.className="aidx"; l.textContent="["+i+"]";\n        w.appendChild(c); w.appendChild(l); a.appendChild(w);\n      });\n    }\n    function addLog(m){var el=document.getElementById("log"),d=document.createElement("div");d.textContent="> "+m;el.appendChild(d);el.scrollTop=el.scrollHeight;}\n    function doInsert(){\n      var v=parseInt(document.getElementById("val").value);\n      if(isNaN(v)){addLog("insert: enter a number");return;}\n      lastSwaps=0;\n      heap.push(v);\n      addLog("insert("+v+") at index "+(heap.length-1));\n      siftUp(heap.length-1);\n      addLog("  done - "+lastSwaps+" swap(s), heap height "+Math.floor(Math.log2(heap.length)+1e-9));\n      document.getElementById("val").value=""; render();\n    }\n    function doExtract(){\n      if(!heap.length){addLog("extract_min() ERROR: empty");return;}\n      lastSwaps=0;\n      var min=heap[0], last=heap.pop();\n      if(heap.length){heap[0]=last;addLog("extract_min() => "+min+" - moved last ("+last+") to root");siftDown(0);}\n      else addLog("extract_min() => "+min+" - heap now empty");\n      addLog("  done - "+lastSwaps+" swap(s)");\n      render();\n    }\n    function doReset(){heap=[];lastSwaps=0;[5,3,8,1,9,2].forEach(function(v){heap.push(v);var i=heap.length-1;while(i>0){var p=Math.floor((i-1)/2);if(heap[i]<heap[p]){var t=heap[i];heap[i]=heap[p];heap[p]=t;i=p;}else break;}});addLog("reset - preloaded 5,3,8,1,9,2 (heapified)");render();}\n    doReset();\n  </script>\n</body></html>`
      },

      {
        id: "pdsa-viz-bst",
        title: "BST Visualizer",
        language: "html",
        theory: {
          intro: "Grow a real Binary Search Tree node by node. Every insert logs its comparison path ('40 < 50 → left'), Search lights up the exact nodes it visited, and In-Order proves the tree always spits out sorted order.",
          sections: [
            {
              heading: "What to Try",
              content: "1) Reset gives a balanced tree of 7 nodes. Search 65 — watch it visit only 3 nodes out of 7. 2) Click In-Order — sorted output, always. 3) Now Clear and insert 1,2,3,4,5 in order: the tree collapses into a right-leaning chain. Search 5 and count the visits — that's the O(n) skew trap, live.",
              code: null,
              breakdown: []
            },
            {
              heading: "Reading the Search Log",
              content: "Each search line shows one comparison. A balanced 1,000,000-node tree needs ~20 comparisons; a skewed one needs up to 1,000,000. Same data, same algorithm — the SHAPE is everything.",
              code: `# search(65) in the balanced tree:\n#   65 > 50 -> right\n#   65 < 70 -> left\n#   65 > 60 -> right\n#   None -> NOT FOUND (3 comparisons for 7 nodes)`,
              breakdown: []
            }
          ],
          tip: "After building the skewed 1-2-3-4-5 chain, ask yourself what single insert order would have produced a perfectly balanced tree with the same values. (Answer: 3 first, then 2 and 4, then 1 and 5 — middle first, always.)"
        },
        defaultCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>BST Visualizer</title>\n  <style>\n    *{box-sizing:border-box;margin:0;padding:0}\n    body{font-family:system-ui;background:#0f172a;color:#e2e8f0;padding:1.5rem}\n    h2{color:#34d399;margin-bottom:.25rem}\n    .sub{color:#94a3b8;font-size:.85rem;margin-bottom:1.2rem}\n    .controls{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.2rem;align-items:center}\n    input{background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:7px 12px;border-radius:6px;width:90px}\n    button{padding:7px 14px;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:.8rem}\n    .bi{background:#10b981;color:#0f172a}.bs{background:#3b82f6;color:#fff}.bo{background:#8b5cf6;color:#fff}.bc{background:#475569;color:#fff}\n    .treebox{overflow-x:auto;padding:1rem 0;margin-bottom:1rem;min-height:120px}\n    .tnode{display:flex;flex-direction:column;align-items:center;padding:0 8px}\n    .circle{width:48px;height:48px;border-radius:50%;background:#065f46;border:2px solid #10b981;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.95rem;animation:pop .25s ease;flex-shrink:0}\n    .circle.hl{background:#1e40af;border-color:#60a5fa;box-shadow:0 0 12px #3b82f6}\n    .circle.found{background:#166534;border-color:#4ade80;box-shadow:0 0 14px #22c55e}\n    .circle.ghost{background:transparent;border:1.5px dashed #334155;color:#334155}\n    .children{display:flex;margin-top:16px;position:relative}\n    .children:before{content:"";position:absolute;top:-10px;left:25%;right:25%;border-top:1.5px solid #334155}\n    @keyframes pop{from{transform:scale(.5);opacity:0}to{transform:none;opacity:1}}\n    .stats{display:flex;gap:.75rem;margin-bottom:.75rem;flex-wrap:wrap}\n    .stat{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:.6rem 1rem}\n    .lbl{font-size:.65rem;color:#94a3b8;text-transform:uppercase}\n    .val{font-size:1.05rem;font-weight:700;color:#34d399}\n    .log{background:#0a0e14;padding:.75rem;border-radius:8px;font-family:monospace;font-size:.78rem;color:#7dd3fc;max-height:170px;overflow-y:auto}\n    .empty{color:#475569;font-style:italic}\n    .wrap-center{display:flex;justify-content:center;min-width:max-content}\n  </style>\n</head>\n<body>\n  <h2>BST Visualizer</h2>\n  <p class="sub">left &lt; node &lt; right &mdash; blue = visited during search, green glow = found</p>\n  <div class="controls">\n    <input id="val" type="number" placeholder="number..." onkeydown="if(event.key==='Enter')doInsert()">\n    <button class="bi" onclick="doInsert()">+ Insert</button>\n    <button class="bs" onclick="doSearch()">&#128269; Search</button>\n    <button class="bo" onclick="doInorder()">In-Order</button>\n    <button class="bc" onclick="doClearAll()">Clear</button>\n    <button class="bc" onclick="doReset()">Reset (balanced)</button>\n  </div>\n  <div class="treebox"><div class="wrap-center" id="viz"><span class="empty">tree is empty - insert a number</span></div></div>\n  <div class="stats">\n    <div class="stat"><div class="lbl">Nodes</div><div class="val" id="cnt">0</div></div>\n    <div class="stat"><div class="lbl">Height</div><div class="val" id="ht">0</div></div>\n    <div class="stat"><div class="lbl">Last search visits</div><div class="val" id="vis">-</div></div>\n  </div>\n  <div class="log" id="log">-- operation log --</div>\n  <script>\n    var root=null, count=0, hl={}, foundV=null;\n    function NodeT(v){this.v=v;this.l=null;this.r=null;}\n    function insertNode(node,v){\n      if(!node){count++;addLog("  place "+v+" here");return new NodeT(v);}\n      if(v<node.v){addLog("  "+v+" < "+node.v+" -> go left");node.l=insertNode(node.l,v);}\n      else if(v>node.v){addLog("  "+v+" > "+node.v+" -> go right");node.r=insertNode(node.r,v);}\n      else addLog("  "+v+" already exists - ignored");\n      return node;\n    }\n    function height(n){return n?1+Math.max(height(n.l),height(n.r)):0;}\n    function renderNode(n){\n      if(!n)return "<div class=\\"tnode\\"><div class=\\"circle ghost\\">&middot;</div></div>";\n      var cls="circle"+(hl[n.v]?(n.v===foundV?" found":" hl"):"");\n      var html="<div class=\\"tnode\\"><div class=\\""+cls+"\\">"+n.v+"</div>";\n      if(n.l||n.r) html+="<div class=\\"children\\">"+renderNode(n.l)+renderNode(n.r)+"</div>";\n      return html+"</div>";\n    }\n    function render(){\n      var v=document.getElementById("viz");\n      document.getElementById("cnt").textContent=count;\n      document.getElementById("ht").textContent=height(root);\n      v.innerHTML=root?renderNode(root):"<span class=\\"empty\\">tree is empty - insert a number</span>";\n    }\n    function addLog(m){var el=document.getElementById("log"),d=document.createElement("div");d.textContent="> "+m;el.appendChild(d);el.scrollTop=el.scrollHeight;}\n    function getNum(){var v=parseInt(document.getElementById("val").value);document.getElementById("val").value="";return isNaN(v)?null:v;}\n    function doInsert(){var v=getNum();if(v===null){addLog("insert: enter a number");return;}hl={};foundV=null;addLog("insert("+v+"):");root=insertNode(root,v);render();}\n    function doSearch(){\n      var v=getNum();if(v===null){addLog("search: enter a number");return;}\n      hl={};foundV=null;var node=root,visits=0;\n      addLog("search("+v+"):");\n      while(node){\n        visits++;hl[node.v]=true;\n        if(v===node.v){foundV=v;addLog("  "+v+" == "+node.v+" -> FOUND after "+visits+" visit(s)");break;}\n        if(v<node.v){addLog("  "+v+" < "+node.v+" -> left");node=node.l;}\n        else{addLog("  "+v+" > "+node.v+" -> right");node=node.r;}\n      }\n      if(foundV===null)addLog("  hit None -> NOT FOUND ("+visits+" visits)");\n      document.getElementById("vis").textContent=visits;\n      render();\n    }\n    function doInorder(){\n      var out=[];\n      (function walk(n){if(n){walk(n.l);out.push(n.v);walk(n.r);}})(root);\n      addLog("in-order: ["+out.join(", ")+"]  <- always sorted!");\n    }\n    function doClearAll(){root=null;count=0;hl={};foundV=null;addLog("clear()");render();}\n    function doReset(){doClearAll();[50,30,70,20,40,60,80].forEach(function(v){root=(function ins(n,x){if(!n){count++;return new NodeT(x);}if(x<n.v)n.l=ins(n.l,x);else if(x>n.v)n.r=ins(n.r,x);return n;})(root,v);});addLog("reset - balanced tree 50,30,70,20,40,60,80");render();}\n    doReset();\n  </script>\n</body></html>`
      }
    ]
  },

  /* ══════════════ Chapter C: Build-It-Yourself Lab ══════════════ */
  {
    id: "pdsa-lab",
    title: "Build-It-Yourself Lab",
    lessons: [

      {
        id: "pdsa-lab-bootstrap",
        title: "Lab: Build Your Own Visualizer (HTML + Bootstrap)",
        language: "html",
        theory: {
          intro: "You've USED the visualizers — now BUILD one. The editor starts as an almost-empty slate with Bootstrap 5 already loaded (no <link> tags needed — the preview injects it). Your mission: build a working Stack visualizer with Bootstrap components, then level it up.",
          sections: [
            {
              heading: "Your Mission (in 4 stages)",
              content: "Stage 1: render the stack array as Bootstrap badges inside the #viz div. Stage 2: wire the Push/Pop buttons to update the array and re-render. Stage 3: show size and top value in the stat cards. Stage 4 (stretch): add a Bootstrap alert when popping an empty stack, and an operation log using a list-group.",
              code: `// The render loop pattern — everything flows from this:\n// 1. mutate the data      stack.push(value)\n// 2. re-render the DOM    render()\n//\n// function render() {\n//   var viz = document.getElementById('viz');\n//   viz.innerHTML = '';\n//   stack.forEach(function(x) {\n//     var b = document.createElement('span');\n//     b.className = 'badge text-bg-primary fs-5 d-block mb-1';\n//     b.textContent = x;\n//     viz.prepend(b);   // prepend => newest on TOP\n//   });\n// }`,
              breakdown: [
                { line: "viz.innerHTML = ''", explanation: "Wipe and redraw — simplest correct rendering strategy." },
                { line: "viz.prepend(b)", explanation: "prepend (not append) puts the newest badge visually on top — that's your LIFO." },
                { line: "badge text-bg-primary", explanation: "Bootstrap badge component — instant styled box, no custom CSS." },
              ]
            },
            {
              heading: "Bootstrap Cheat Sheet for This Lab",
              content: "Everything you need is a class name away. Buttons: btn btn-success / btn-danger. Cards: card > card-body. Badges: badge text-bg-primary. Alerts: alert alert-warning. Layout: container, row, col-md-6, d-flex, gap-2, mb-3.",
              code: `<!-- the pieces you'll combine: -->\n<button class="btn btn-success">Push</button>\n<span class="badge text-bg-primary">42</span>\n<div class="card"><div class="card-body">...</div></div>\n<div class="alert alert-warning">Stack is empty!</div>\n<ul class="list-group"><li class="list-group-item">push(42)</li></ul>`,
              breakdown: []
            },
            {
              heading: "When You Finish",
              content: "Compare your build against the pre-made Stack Visualizer lesson. Then pick your next target: rebuild the Queue (append instead of prepend — one word changes FIFO to LIFO!), or go ambitious and visualize the Heap.",
              code: null,
              breakdown: []
            }
          ],
          tip: "Don't style anything by hand — force yourself to use only Bootstrap utility classes. That constraint is the fastest way to actually learn them."
        },
        defaultCode: `<!-- ═══════════════════════════════════════════════════\n     BUILD-IT-YOURSELF LAB: Stack Visualizer\n     Bootstrap 5 is ALREADY loaded by the preview.\n     Fill in the TODOs. The empty slate is the point!\n     ═══════════════════════════════════════════════════ -->\n\n<nav class="navbar navbar-dark bg-dark px-3">\n  <span class="navbar-brand mb-0 h1">🧩 My Stack Visualizer</span>\n</nav>\n\n<div class="container py-4">\n  <div class="row g-3">\n\n    <!-- Controls column -->\n    <div class="col-md-5">\n      <div class="card">\n        <div class="card-body">\n          <h5 class="card-title">Controls</h5>\n          <input id="valInput" class="form-control mb-2" placeholder="value...">\n          <div class="d-flex gap-2">\n            <button class="btn btn-success" onclick="doPush()">▲ Push</button>\n            <button class="btn btn-danger" onclick="doPop()">▼ Pop</button>\n          </div>\n        </div>\n      </div>\n\n      <!-- Stats -->\n      <div class="d-flex gap-2 mt-3">\n        <div class="card flex-fill text-center">\n          <div class="card-body py-2">\n            <div class="text-muted small">SIZE</div>\n            <div class="fs-4 fw-bold" id="statSize">0</div>\n          </div>\n        </div>\n        <div class="card flex-fill text-center">\n          <div class="card-body py-2">\n            <div class="text-muted small">TOP</div>\n            <div class="fs-4 fw-bold" id="statTop">-</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- TODO (Stage 4): add an operation log here.\n           Hint: <ul class="list-group" id="log"></ul>\n           and append <li class="list-group-item py-1">...</li> items. -->\n    </div>\n\n    <!-- Visualization column -->\n    <div class="col-md-7">\n      <div class="card h-100">\n        <div class="card-body">\n          <h5 class="card-title">Stack <span class="text-muted small">(top first)</span></h5>\n          <div id="viz" class="d-flex flex-column align-items-center gap-1 py-3">\n            <!-- TODO (Stage 1): badges get rendered here by render() -->\n            <span class="text-muted fst-italic">empty — implement render()!</span>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>\n\n<script>\n  var stack = [];\n\n  // ── Stage 1: render the stack as Bootstrap badges ──\n  function render() {\n    var viz = document.getElementById('viz');\n    viz.innerHTML = '';\n\n    // TODO: if stack is empty, show a muted "empty stack" message\n\n    // TODO: for each value in stack, create:\n    //   <span class="badge text-bg-primary fs-5" style="min-width:120px">value</span>\n    // and viz.prepend(...) it so the NEWEST value appears on TOP.\n    // Bonus: give the top badge text-bg-success instead of primary.\n\n    // ── Stage 3: update the stat cards ──\n    // TODO: set #statSize to stack.length\n    // TODO: set #statTop to the last element (or '-' when empty)\n  }\n\n  // ── Stage 2: wire the buttons ──\n  function doPush() {\n    var input = document.getElementById('valInput');\n    var value = input.value.trim();\n    if (!value) return;\n\n    // TODO: push value onto the stack array\n    // TODO: clear the input\n    // TODO: call render()\n  }\n\n  function doPop() {\n    // TODO: if the stack is empty, show a Bootstrap alert\n    //       (Stage 4 — for now console.log is fine)\n    // TODO: otherwise stack.pop() and render()\n  }\n\n  render();\n</script>`
      },

      {
        id: "pdsa-lab-flask",
        title: "Lab: Flask Data-Structure API",
        language: "python",
        theory: {
          intro: "Real apps expose data structures over HTTP: a job queue behind POST /jobs, a leaderboard heap behind GET /top. In this lab you build a Flask-style JSON API for a Stack and a Priority Queue. Because the browser can't run a real server, a tiny fake @app.route decorator + simulate_request() harness is provided — your handler code is EXACTLY what you'd write in real Flask.",
          sections: [
            {
              heading: "The Real Flask Version",
              content: "This is what the same API looks like in production Flask. Your lab code mirrors it line for line — only the imports differ.",
              code: `# real_app.py — what you'd run with 'flask run'\nfrom flask import Flask, request, jsonify\n\napp = Flask(__name__)\nstack = []\n\n@app.route("/stack/push", methods=["POST"])\ndef push():\n    value = request.json["value"]\n    stack.append(value)\n    return jsonify({"ok": True, "size": len(stack)})\n\n@app.route("/stack/pop", methods=["POST"])\ndef pop():\n    if not stack:\n        return jsonify({"error": "stack empty"}), 400\n    return jsonify({"value": stack.pop()})`,
              breakdown: [
                { line: "@app.route(path, methods)", explanation: "Registers the function as the handler for that URL + HTTP method." },
                { line: "request.json", explanation: "The parsed JSON body the client POSTed." },
                { line: "jsonify(...), 400", explanation: "Return JSON plus an HTTP status code — 400 means 'bad request'." },
              ]
            },
            {
              heading: "Your Mission",
              content: "The stack endpoints are done as a worked example. You implement the priority-queue endpoints: POST /queue/add (uses heapq to store (priority, task)), POST /queue/next (pops the most urgent), GET /queue/peek. The test suite at the bottom calls your endpoints and prints PASS/FAIL.",
              code: `# Endpoint contract to implement:\n#\n# POST /queue/add   body {"task": "fix bug", "priority": 1}\n#                   -> {"ok": true, "size": <n>}\n#\n# POST /queue/next  -> {"task": "fix bug", "priority": 1}\n#                   -> {"error": "queue empty"} + 400 when empty\n#\n# GET  /queue/peek  -> same as next but WITHOUT removing`,
              breakdown: []
            },
            {
              heading: "Connect It to Your Bootstrap Lab",
              content: "In a real deployment, the Bootstrap visualizer you built last lesson would call these endpoints with fetch('/stack/push', {method:'POST', ...}) and render the JSON response. Frontend (Bootstrap) + backend (Flask) + data structure (heap) — that's the full MAD-1 stack in one picture.",
              code: `// frontend snippet that would talk to this API:\nfetch('/stack/push', {\n  method: 'POST',\n  headers: {'Content-Type': 'application/json'},\n  body: JSON.stringify({value: 42})\n}).then(r => r.json()).then(render);`,
              breakdown: []
            }
          ],
          tip: "Store queue items as (priority, task) tuples — heapq compares tuples element by element, so the smallest priority number automatically comes out first."
        },
        defaultCode: `# ═══════════════════════════════════════════════════════\n# LAB: Flask Data-Structure API\n# The fake-Flask harness below lets @app.route work in the\n# browser. Your handler code = real Flask handler code.\n# ═══════════════════════════════════════════════════════\nimport heapq\nimport json\n\n# ── tiny fake-Flask harness (provided — don't edit) ──\nclass FakeFlask:\n    def __init__(self):\n        self.routes = {}\n    def route(self, path, methods=("GET",)):\n        def deco(fn):\n            for m in methods:\n                self.routes[(m, path)] = fn\n            return fn\n        return deco\n\napp = FakeFlask()\n_request_json = {}\n\nclass request:\n    @property\n    def json(self):\n        return _request_json\nrequest = request()\n\ndef jsonify(d):\n    return d\n\ndef simulate_request(method, path, body=None):\n    global _request_json\n    _request_json = body or {}\n    handler = app.routes.get((method, path))\n    if handler is None:\n        return {\"error\": \"404 not found\"}, 404\n    result = handler()\n    if isinstance(result, tuple):\n        return result\n    return result, 200\n\n# ═══════════ WORKED EXAMPLE: Stack API ═══════════\nstack = []\n\n@app.route(\"/stack/push\", methods=[\"POST\"])\ndef stack_push():\n    value = request.json[\"value\"]\n    stack.append(value)\n    return jsonify({\"ok\": True, \"size\": len(stack)})\n\n@app.route(\"/stack/pop\", methods=[\"POST\"])\ndef stack_pop():\n    if not stack:\n        return jsonify({\"error\": \"stack empty\"}), 400\n    return jsonify({\"value\": stack.pop(), \"size\": len(stack)})\n\n# ═══════════ YOUR TURN: Priority Queue API ═══════════\npq = []   # heap of (priority, task) tuples\n\n@app.route(\"/queue/add\", methods=[\"POST\"])\ndef queue_add():\n    # TODO: read request.json[\"task\"] and request.json[\"priority\"]\n    # TODO: heapq.heappush(pq, (priority, task))\n    # TODO: return jsonify({\"ok\": True, \"size\": len(pq)})\n    return jsonify({\"error\": \"not implemented\"}), 501\n\n@app.route(\"/queue/next\", methods=[\"POST\"])\ndef queue_next():\n    # TODO: if pq is empty -> return jsonify({\"error\": \"queue empty\"}), 400\n    # TODO: heapq.heappop(pq) and return {\"task\": ..., \"priority\": ...}\n    return jsonify({\"error\": \"not implemented\"}), 501\n\n@app.route(\"/queue/peek\", methods=[\"GET\"])\ndef queue_peek():\n    # TODO: same as next, but use pq[0] WITHOUT popping\n    return jsonify({\"error\": \"not implemented\"}), 501\n\n# ═══════════ Test suite — run me! ═══════════\ndef check(name, got, expected_body, expected_status):\n    body, status = got\n    ok = status == expected_status and all(body.get(k) == v for k, v in expected_body.items())\n    print(f\"  {'PASS' if ok else 'FAIL'}  {name}: got {body} [{status}]\")\n\nprint(\"Stack API (worked example):\")\ncheck(\"push 10\", simulate_request(\"POST\", \"/stack/push\", {\"value\": 10}), {\"ok\": True, \"size\": 1}, 200)\ncheck(\"push 20\", simulate_request(\"POST\", \"/stack/push\", {\"value\": 20}), {\"ok\": True, \"size\": 2}, 200)\ncheck(\"pop -> 20\", simulate_request(\"POST\", \"/stack/pop\"), {\"value\": 20}, 200)\n\nprint(\"\\nPriority Queue API (your endpoints):\")\ncheck(\"add P2 email\", simulate_request(\"POST\", \"/queue/add\", {\"task\": \"email client\", \"priority\": 2}), {\"ok\": True, \"size\": 1}, 200)\ncheck(\"add P1 bug\", simulate_request(\"POST\", \"/queue/add\", {\"task\": \"fix prod bug\", \"priority\": 1}), {\"ok\": True, \"size\": 2}, 200)\ncheck(\"add P3 plants\", simulate_request(\"POST\", \"/queue/add\", {\"task\": \"water plants\", \"priority\": 3}), {\"ok\": True, \"size\": 3}, 200)\ncheck(\"peek -> P1\", simulate_request(\"GET\", \"/queue/peek\"), {\"task\": \"fix prod bug\", \"priority\": 1}, 200)\ncheck(\"next -> P1\", simulate_request(\"POST\", \"/queue/next\"), {\"task\": \"fix prod bug\", \"priority\": 1}, 200)\ncheck(\"next -> P2\", simulate_request(\"POST\", \"/queue/next\"), {\"task\": \"email client\", \"priority\": 2}, 200)\ncheck(\"next -> P3\", simulate_request(\"POST\", \"/queue/next\"), {\"task\": \"water plants\", \"priority\": 3}, 200)\ncheck(\"next on empty\", simulate_request(\"POST\", \"/queue/next\"), {\"error\": \"queue empty\"}, 400)`
      }
    ]
  }
];
