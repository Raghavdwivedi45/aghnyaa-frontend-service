# ResizeObserver — Quick Notes (Accordion)

## What is it?

A browser API that **watches an element's size** and notifies you whenever its width or height changes.
> Think: **"Call me whenever this element is resized."**

CSS **can't animate**:

```css
height: 0;
height: auto;
```

So we:
1. Measure the content's height.
2. Store it in state.
3. Animate the wrapper from `0px` to that height.

If the content changes later (API data, images, etc.), `ResizeObserver` automatically updates the height.

---
## Basic Flow
```
Content -> ResizeObserver -> Height changes -> Update state -> Smooth height transition
```
---

## Essential Code

```tsx
const contentRef = useRef<HTMLDivElement>(null);
const [height, setHeight] = useState(0);

useEffect(() => {
  if (!contentRef.current) return;

  const observer = new ResizeObserver(([entry]) => {
    setHeight(entry.contentRect.height);
  });

  observer.observe(contentRef.current);

  return () => observer.disconnect();
}, []);
```

```tsx
<div
  style={{
    height: isOpen ? `${height}px` : "0px",
    overflow: "hidden",
    transition: "height 300ms ease",
  }}
>
  <div ref={contentRef}>
    ...
  </div>
</div>
```

---
## When to use it?
✅ Dynamic content - API data, Images, Nested accordions, Content that can grow/shrink
❌ Static content - `scrollHeight` is usually enough.
---

## Remember
- Observe the **inner content**, not the animated wrapper.
- Create the observer inside `useEffect()`.
- Always call `disconnect()` on cleanup.
---












