# Flexbox Notes

## `flex-grow`
Distributes **remaining (extra) space** among flex items.

```css
A { flex-grow: 1; }
B { flex-grow: 2; }
C { flex-grow: 1; }
```

If 400px is left:

- A → +100px
- B → +200px

- C → +100px

> It is a **weight**, not a width.

---

## `flex-shrink`
Determines who sacrifices space when the parent is too small.

```css
A { flex-shrink: 0; }
B { flex-shrink: 1; }
C { flex-shrink: 1; }
```

- A keeps its size.
- B & C shrink to fit.

If all have:

```css
flex-shrink: 0;
```

Nothing shrinks, so the parent **overflows**.

---

## Mental Model

- **`flex-grow`** → Who gets the extra space?
- **`flex-shrink`** → Who gives up space?