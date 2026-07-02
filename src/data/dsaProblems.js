// DSA Practice Arena — judge-style problems (Codeforces/CodeChef format).
// Each problem: statement, public sample tests (shown), hidden tests (judged
// blind), an empty-slate starter, and a solution revealed only on demand.
//
// Test format: args is the positional argument list; expected is compared
// with Python == after the user's function returns.

export const dsaProblems = [

  /* ───────────── STACK ───────────── */

  {
    id: "prob-reverse-string",
    title: "Reverse a String",
    topic: "Stack",
    difficulty: "Easy",
    functionName: "reverse_string",
    statement: "Given a string s, return it reversed. You must use an explicit stack (push all characters, then pop them) — the point is to practice the LIFO pattern, even though Python has slicing.",
    inputFormat: "reverse_string(s) — s is a string of length 0 to 1000.",
    constraints: ["0 <= len(s) <= 1000", "s contains printable characters"],
    starterCode: "def reverse_string(s):\n    # Push every character onto a stack, then pop them all.\n    # Write your code here\n    pass\n",
    solution: "def reverse_string(s):\n    stack = []\n    for ch in s:\n        stack.append(ch)\n    result = \"\"\n    while stack:\n        result += stack.pop()\n    return result\n",
    publicTests: [
      { args: ["hello"], expected: "olleh" },
      { args: ["PDSA"], expected: "ASDP" },
      { args: [""], expected: "" },
    ],
    hiddenTests: [
      { args: ["racecar"], expected: "racecar" },
      { args: ["a"], expected: "a" },
      { args: ["ab cd"], expected: "dc ba" },
      { args: ["12345678"], expected: "87654321" },
    ],
  },

  {
    id: "prob-balanced",
    title: "Balanced Brackets",
    topic: "Stack",
    difficulty: "Easy",
    functionName: "is_balanced",
    statement: "Given a string containing only the characters ( ) [ ] { }, return True if every opening bracket is closed by the same type of bracket in the correct order, otherwise False. The classic stack interview question: push openers, pop and match on closers.",
    inputFormat: "is_balanced(s) — s is a string of brackets.",
    constraints: ["0 <= len(s) <= 10000", "s contains only ()[]{}"],
    starterCode: "def is_balanced(s):\n    # Push opening brackets; on a closer, the top of the\n    # stack must be the matching opener.\n    # Write your code here\n    pass\n",
    solution: "def is_balanced(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        else:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return not stack\n",
    publicTests: [
      { args: ["()[]{}"], expected: true },
      { args: ["(]"], expected: false },
      { args: ["([{}])"], expected: true },
    ],
    hiddenTests: [
      { args: [""], expected: true },
      { args: ["((("], expected: false },
      { args: ["())"], expected: false },
      { args: ["{[()()]}"], expected: true },
      { args: ["]"], expected: false },
    ],
  },

  {
    id: "prob-min-stack",
    title: "Min Stack (Op Simulation)",
    topic: "Stack",
    difficulty: "Medium",
    functionName: "min_stack",
    statement: "Simulate a stack that can report its minimum in O(1). You receive a list of operations: 'push X' pushes integer X, 'pop' removes the top, and 'min' asks for the current minimum. Return the list of answers produced by the 'min' operations, in order. Use a second stack that tracks the minimum alongside the main one — recomputing min by scanning is the slow way.",
    inputFormat: "min_stack(ops) — ops is a list of strings like ['push 5', 'push 2', 'min', 'pop', 'min'].",
    constraints: ["1 <= len(ops) <= 10000", "'pop' and 'min' are never called on an empty stack"],
    starterCode: "def min_stack(ops):\n    # Keep two stacks: values, and the minimum-so-far.\n    # Collect the answer to every 'min' op in a list.\n    # Write your code here\n    pass\n",
    solution: "def min_stack(ops):\n    stack, mins, out = [], [], []\n    for op in ops:\n        if op.startswith('push'):\n            x = int(op.split()[1])\n            stack.append(x)\n            mins.append(x if not mins else min(x, mins[-1]))\n        elif op == 'pop':\n            stack.pop()\n            mins.pop()\n        else:  # 'min'\n            out.append(mins[-1])\n    return out\n",
    publicTests: [
      { args: [["push 5", "push 2", "min", "pop", "min"]], expected: [2, 5] },
      { args: [["push 3", "min"]], expected: [3] },
    ],
    hiddenTests: [
      { args: [["push 1", "push 2", "push 3", "min", "pop", "min", "pop", "min"]], expected: [1, 1, 1] },
      { args: [["push 9", "push 7", "push 8", "min", "pop", "pop", "min"]], expected: [7, 9] },
      { args: [["push -5", "push 0", "min"]], expected: [-5] },
      { args: [["push 4", "push 4", "min", "pop", "min"]], expected: [4, 4] },
    ],
  },

  {
    id: "prob-postfix",
    title: "Evaluate Postfix Expression",
    topic: "Stack",
    difficulty: "Medium",
    functionName: "eval_postfix",
    statement: "Evaluate a postfix (Reverse Polish Notation) expression given as a list of tokens. Each token is an integer or one of + - * /. Push numbers; on an operator, pop the top two values (second popped is the LEFT operand), apply, and push the result. Division is integer division truncated toward zero (use int(a / b)).",
    inputFormat: "eval_postfix(tokens) — tokens is a list of strings, e.g. ['2', '3', '+', '4', '*'].",
    constraints: ["1 <= len(tokens) <= 1000", "the expression is always valid", "no division by zero"],
    starterCode: "def eval_postfix(tokens):\n    # On operator: b = pop(), a = pop(), push(a OP b)\n    # Careful: the FIRST pop is the RIGHT operand.\n    # Write your code here\n    pass\n",
    solution: "def eval_postfix(tokens):\n    stack = []\n    for tok in tokens:\n        if tok in ('+', '-', '*', '/'):\n            b = stack.pop()\n            a = stack.pop()\n            if tok == '+': stack.append(a + b)\n            elif tok == '-': stack.append(a - b)\n            elif tok == '*': stack.append(a * b)\n            else: stack.append(int(a / b))\n        else:\n            stack.append(int(tok))\n    return stack[0]\n",
    publicTests: [
      { args: [["2", "3", "+", "4", "*"]], expected: 20 },
      { args: [["5", "1", "2", "+", "4", "*", "+", "3", "-"]], expected: 14 },
    ],
    hiddenTests: [
      { args: [["42"]], expected: 42 },
      { args: [["10", "3", "/"]], expected: 3 },
      { args: [["7", "2", "-"]], expected: 5 },
      { args: [["3", "4", "5", "*", "+"]], expected: 23 },
      { args: [["-7", "2", "/"]], expected: -3 },
    ],
  },

  /* ───────────── QUEUE / DEQUE ───────────── */

  {
    id: "prob-queue-two-stacks",
    title: "Queue via Two Stacks",
    topic: "Queue",
    difficulty: "Medium",
    functionName: "simulate_queue",
    statement: "Implement a FIFO queue using ONLY two stacks (Python lists where you may only use append and pop — no pop(0), no insert, no reversed, no slicing). Process a list of operations: 'enqueue X' adds integer X, 'dequeue' removes and records the front element. Return the list of dequeued values in order. Use the inbox/outbox pattern: enqueue pushes to inbox; dequeue pops from outbox, refilling it from inbox only when empty.",
    inputFormat: "simulate_queue(ops) — ops is a list of strings like ['enqueue 1', 'enqueue 2', 'dequeue'].",
    constraints: ["1 <= len(ops) <= 10000", "'dequeue' is never called on an empty queue", "only append/pop allowed on the two lists"],
    starterCode: "def simulate_queue(ops):\n    inbox, outbox = [], []\n    result = []\n    # enqueue -> inbox.append(x)\n    # dequeue -> if outbox empty, move ALL of inbox over\n    #            (pop from inbox, append to outbox), then pop outbox\n    # Write your code here\n    pass\n",
    solution: "def simulate_queue(ops):\n    inbox, outbox, result = [], [], []\n    for op in ops:\n        if op.startswith('enqueue'):\n            inbox.append(int(op.split()[1]))\n        else:\n            if not outbox:\n                while inbox:\n                    outbox.append(inbox.pop())\n            result.append(outbox.pop())\n    return result\n",
    publicTests: [
      { args: [["enqueue 1", "enqueue 2", "dequeue", "enqueue 3", "dequeue", "dequeue"]], expected: [1, 2, 3] },
      { args: [["enqueue 10", "dequeue"]], expected: [10] },
    ],
    hiddenTests: [
      { args: [["enqueue 1", "enqueue 2", "enqueue 3", "dequeue", "dequeue", "enqueue 4", "dequeue", "dequeue"]], expected: [1, 2, 3, 4] },
      { args: [["enqueue 5", "dequeue", "enqueue 6", "dequeue"]], expected: [5, 6] },
      { args: [["enqueue 1", "enqueue 2", "dequeue", "enqueue 3", "enqueue 4", "dequeue", "dequeue", "dequeue"]], expected: [1, 2, 3, 4] },
    ],
  },

  {
    id: "prob-window-max",
    title: "Sliding Window Maximum",
    topic: "Deque",
    difficulty: "Hard",
    functionName: "window_max",
    statement: "Given a list of integers nums and a window size k, return a list of the maximum of every contiguous window of size k. The O(n*k) brute force re-scans each window; the intended O(n) solution keeps a deque of indexes whose values are decreasing — the front is always the current window's maximum. Drop indexes from the back while their values are <= the new value, and drop the front when it slides out of the window.",
    inputFormat: "window_max(nums, k) — nums is a list of integers, k is the window size.",
    constraints: ["1 <= k <= len(nums) <= 100000", "brute force passes the samples but the idea to master is the monotonic deque"],
    starterCode: "def window_max(nums, k):\n    # Monotonic deque of INDEXES:\n    #  - pop back while nums[back] <= new value\n    #  - pop front when it leaves the window (front <= i - k)\n    #  - front of deque = max of current window\n    # Write your code here\n    pass\n",
    solution: "from collections import deque\n\ndef window_max(nums, k):\n    dq, out = deque(), []\n    for i, x in enumerate(nums):\n        while dq and nums[dq[-1]] <= x:\n            dq.pop()\n        dq.append(i)\n        if dq[0] <= i - k:\n            dq.popleft()\n        if i >= k - 1:\n            out.append(nums[dq[0]])\n    return out\n",
    publicTests: [
      { args: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7] },
      { args: [[4, 2], 2], expected: [4] },
    ],
    hiddenTests: [
      { args: [[9, 8, 7, 6], 2], expected: [9, 8, 7] },
      { args: [[1, 2, 3, 4], 4], expected: [4] },
      { args: [[5], 1], expected: [5] },
      { args: [[2, 2, 2, 2], 2], expected: [2, 2, 2] },
      { args: [[1, 3, 1, 2, 0, 5], 3], expected: [3, 3, 2, 5] },
    ],
  },

  /* ───────────── LINKED LIST ───────────── */

  {
    id: "prob-ll-middle",
    title: "Middle of a Linked List",
    topic: "Linked List",
    difficulty: "Easy",
    functionName: "middle_node",
    statement: "The list values are given as a Python list, but solve it the linked-list way: you may make ONE pass with two pointers (indexes) — slow advances 1 step, fast advances 2 — and may NOT use len() or index arithmetic like n//2. Return the value at the middle; for even-length lists return the SECOND middle (the same node Floyd's fast/slow lands on).",
    inputFormat: "middle_node(values) — values is a non-empty list.",
    constraints: ["1 <= len(values) <= 10000", "no len(), no values[len//2] — walk with fast/slow"],
    starterCode: "def middle_node(values):\n    # slow moves 1, fast moves 2; when fast falls off the\n    # end, slow is at the middle. Simulate with indexes but\n    # advance them pointer-style (check bounds like .next).\n    # Write your code here\n    pass\n",
    solution: "def middle_node(values):\n    slow = fast = 0\n    # emulate: while fast and fast.next -> slow=slow.next, fast=fast.next.next\n    while fast < len(values) and fast + 1 < len(values):\n        slow += 1\n        fast += 2\n    return values[slow]\n",
    publicTests: [
      { args: [[1, 2, 3, 4, 5]], expected: 3 },
      { args: [[1, 2, 3, 4, 5, 6]], expected: 4 },
    ],
    hiddenTests: [
      { args: [[7]], expected: 7 },
      { args: [[1, 2]], expected: 2 },
      { args: [[10, 20, 30]], expected: 20 },
      { args: [[5, 4, 3, 2, 1, 0, -1, -2]], expected: 1 },
    ],
  },

  {
    id: "prob-ll-remove-nth",
    title: "Remove Nth Node From End",
    topic: "Linked List",
    difficulty: "Medium",
    functionName: "remove_nth_from_end",
    statement: "Given the list values and an integer n, remove the nth element FROM THE END and return the resulting list. Solve it the one-pass linked-list way: advance a fast pointer n steps first, then move fast and slow together until fast reaches the end — slow now sits just before the victim. (A dummy node handles the remove-the-head case.)",
    inputFormat: "remove_nth_from_end(values, n) — 1 <= n <= len(values).",
    constraints: ["1 <= len(values) <= 10000", "n = len(values) means remove the first element"],
    starterCode: "def remove_nth_from_end(values, n):\n    # Two pointers with a gap of n. When the fast one hits\n    # the end, the slow one is right before the node to cut.\n    # Write your code here\n    pass\n",
    solution: "def remove_nth_from_end(values, n):\n    # index of the victim from the front, found pointer-style:\n    fast = 0\n    for _ in range(n):\n        fast += 1\n    slow = 0\n    while fast < len(values):\n        fast += 1\n        slow += 1\n    return values[:slow] + values[slow + 1:]\n",
    publicTests: [
      { args: [[1, 2, 3, 4, 5], 2], expected: [1, 2, 3, 5] },
      { args: [[1], 1], expected: [] },
    ],
    hiddenTests: [
      { args: [[1, 2], 2], expected: [2] },
      { args: [[1, 2], 1], expected: [1] },
      { args: [[10, 20, 30, 40], 4], expected: [20, 30, 40] },
      { args: [[7, 7, 7], 2], expected: [7, 7] },
    ],
  },

  {
    id: "prob-ll-merge",
    title: "Merge Two Sorted Lists",
    topic: "Linked List",
    difficulty: "Medium",
    functionName: "merge_sorted",
    statement: "Merge two ascending sorted lists a and b into one ascending sorted list, in O(len(a) + len(b)) — walk both lists with two pointers, always taking the smaller head. Calling sorted(a + b) defeats the purpose (and the hidden tests are big enough to notice the difference on a real machine).",
    inputFormat: "merge_sorted(a, b) — a and b are sorted lists of integers (possibly empty).",
    constraints: ["0 <= len(a), len(b) <= 100000", "duplicates allowed, keep them all"],
    starterCode: "def merge_sorted(a, b):\n    # Two pointers i and j; append the smaller of a[i], b[j];\n    # when one list runs out, extend with the rest of the other.\n    # Write your code here\n    pass\n",
    solution: "def merge_sorted(a, b):\n    i = j = 0\n    out = []\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            out.append(a[i]); i += 1\n        else:\n            out.append(b[j]); j += 1\n    out.extend(a[i:])\n    out.extend(b[j:])\n    return out\n",
    publicTests: [
      { args: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6] },
      { args: [[], [1, 2]], expected: [1, 2] },
    ],
    hiddenTests: [
      { args: [[], []], expected: [] },
      { args: [[1, 1, 1], [1, 1]], expected: [1, 1, 1, 1, 1] },
      { args: [[5], [1, 2, 3]], expected: [1, 2, 3, 5] },
      { args: [[-3, 0, 4], [-5, -1, 8]], expected: [-5, -3, -1, 0, 4, 8] },
    ],
  },

  /* ───────────── ARRAYS / HEAP / BST ───────────── */

  {
    id: "prob-rotate",
    title: "Rotate Array Right",
    topic: "Arrays",
    difficulty: "Easy",
    functionName: "rotate_right",
    statement: "Rotate the list k positions to the right and return it. The elegant O(1)-extra-space method is triple reversal: reverse the whole list, reverse the first k elements, reverse the rest. Remember k can be larger than the list length.",
    inputFormat: "rotate_right(nums, k) — nums is a list, k >= 0.",
    constraints: ["0 <= len(nums) <= 100000", "0 <= k <= 10^9 (use k % n!)"],
    starterCode: "def rotate_right(nums, k):\n    # 1) guard the empty list  2) k %= len(nums)\n    # 3) triple reversal (or slicing if you must)\n    # Write your code here\n    pass\n",
    solution: "def rotate_right(nums, k):\n    if not nums:\n        return nums\n    k %= len(nums)\n    def rev(lo, hi):\n        while lo < hi:\n            nums[lo], nums[hi] = nums[hi], nums[lo]\n            lo += 1; hi -= 1\n    rev(0, len(nums) - 1)\n    rev(0, k - 1)\n    rev(k, len(nums) - 1)\n    return nums\n",
    publicTests: [
      { args: [[1, 2, 3, 4, 5], 2], expected: [4, 5, 1, 2, 3] },
      { args: [[1, 2], 0], expected: [1, 2] },
    ],
    hiddenTests: [
      { args: [[], 5], expected: [] },
      { args: [[1], 100], expected: [1] },
      { args: [[1, 2, 3], 3], expected: [1, 2, 3] },
      { args: [[1, 2, 3, 4], 6], expected: [3, 4, 1, 2] },
    ],
  },

  {
    id: "prob-k-largest",
    title: "K Largest Elements",
    topic: "Heap",
    difficulty: "Medium",
    functionName: "k_largest",
    statement: "Return the k largest elements of nums in DESCENDING order. The intended solution keeps a min-heap of size k: push until full, then only replace the root when a bigger value arrives — O(n log k) instead of sorting everything at O(n log n).",
    inputFormat: "k_largest(nums, k) — 1 <= k <= len(nums).",
    constraints: ["1 <= len(nums) <= 100000", "duplicates allowed"],
    starterCode: "import heapq\n\ndef k_largest(nums, k):\n    # Min-heap of size k: the root is the smallest of the\n    # current top-k. heapq.heapreplace swaps it out in O(log k).\n    # Return sorted(heap, reverse=True) at the end.\n    # Write your code here\n    pass\n",
    solution: "import heapq\n\ndef k_largest(nums, k):\n    heap = []\n    for x in nums:\n        if len(heap) < k:\n            heapq.heappush(heap, x)\n        elif x > heap[0]:\n            heapq.heapreplace(heap, x)\n    return sorted(heap, reverse=True)\n",
    publicTests: [
      { args: [[7, 2, 19, 4, 42, 13], 3], expected: [42, 19, 13] },
      { args: [[5, 5, 5], 2], expected: [5, 5] },
    ],
    hiddenTests: [
      { args: [[1], 1], expected: [1] },
      { args: [[3, 1, 2], 3], expected: [3, 2, 1] },
      { args: [[-1, -5, -3], 2], expected: [-1, -3] },
      { args: [[10, 9, 8, 7, 6, 5], 4], expected: [10, 9, 8, 7] },
    ],
  },

  {
    id: "prob-running-median",
    title: "Running Median",
    topic: "Heap",
    difficulty: "Hard",
    functionName: "running_median",
    statement: "Given a stream of integers, return the median after EACH insertion. For an odd count the median is the middle value (return it as an int); for an even count it is the average of the two middle values (return a float, e.g. 10.0 or 4.5). The O(n log n) solution keeps two heaps: a max-heap for the lower half and a min-heap for the upper half, rebalanced so their sizes never differ by more than 1.",
    inputFormat: "running_median(nums) — nums is a non-empty list of integers; return a list of medians.",
    constraints: ["1 <= len(nums) <= 100000", "odd count -> int, even count -> average of two middles"],
    starterCode: "import heapq\n\ndef running_median(nums):\n    # lower = max-heap (store negatives), upper = min-heap\n    # Invariant: max(lower) <= min(upper), sizes differ <= 1\n    # Odd total  -> median = top of the bigger heap\n    # Even total -> median = (top_lower + top_upper) / 2\n    # Write your code here\n    pass\n",
    solution: "import heapq\n\ndef running_median(nums):\n    lower, upper, out = [], [], []   # lower is a max-heap via negatives\n    for x in nums:\n        heapq.heappush(lower, -x)\n        heapq.heappush(upper, -heapq.heappop(lower))\n        if len(upper) > len(lower):\n            heapq.heappush(lower, -heapq.heappop(upper))\n        if len(lower) > len(upper):\n            out.append(-lower[0])\n        else:\n            out.append((-lower[0] + upper[0]) / 2)\n    return out\n",
    publicTests: [
      { args: [[5, 15, 1, 3]], expected: [5, 10.0, 5, 4.0] },
      { args: [[2, 4, 6]], expected: [2, 3.0, 4] },
    ],
    hiddenTests: [
      { args: [[1]], expected: [1] },
      { args: [[3, 3, 3, 3]], expected: [3, 3.0, 3, 3.0] },
      { args: [[10, 1, 5]], expected: [10, 5.5, 5] },
      { args: [[1, 2, 3, 4, 5, 6]], expected: [1, 1.5, 2, 2.5, 3, 3.5] },
      { args: [[-2, 0, -4]], expected: [-2, -1.0, -2] },
    ],
  },

  {
    id: "prob-bst-height",
    title: "BST Height After Inserts",
    topic: "BST",
    difficulty: "Medium",
    functionName: "bst_height",
    statement: "Insert the given values one by one into an initially empty Binary Search Tree (standard insert, ignore duplicates) and return the tree's height — the number of nodes on the longest root-to-leaf path. An empty list gives height 0. This is exactly the balanced-vs-skewed experiment: [50,30,70,20,40,60,80] gives 3, but [1,2,3,4,5] gives 5.",
    inputFormat: "bst_height(values) — values is a list of integers (may be empty).",
    constraints: ["0 <= len(values) <= 10000", "duplicates are ignored (do not insert twice)"],
    starterCode: "class Node:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef bst_height(values):\n    # 1) build the BST with standard inserts (skip duplicates)\n    # 2) height(node) = 1 + max(height(left), height(right))\n    # Write your code here\n    pass\n",
    solution: "class Node:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef bst_height(values):\n    root = None\n    def insert(node, v):\n        if node is None:\n            return Node(v)\n        if v < node.value:\n            node.left = insert(node.left, v)\n        elif v > node.value:\n            node.right = insert(node.right, v)\n        return node\n    for v in values:\n        root = insert(root, v)\n    def height(node):\n        if node is None:\n            return 0\n        return 1 + max(height(node.left), height(node.right))\n    return height(root)\n",
    publicTests: [
      { args: [[50, 30, 70, 20, 40, 60, 80]], expected: 3 },
      { args: [[1, 2, 3, 4, 5]], expected: 5 },
    ],
    hiddenTests: [
      { args: [[]], expected: 0 },
      { args: [[42]], expected: 1 },
      { args: [[5, 5, 5, 5]], expected: 1 },
      { args: [[3, 1, 4, 1, 5, 9, 2, 6]], expected: 5 },
      { args: [[10, 5, 15, 3, 7, 12, 18, 1]], expected: 4 },
    ],
  },
];
