# Icon Source

Put your master icon here as:

```txt
assets/icons/source.png
```

Use a square PNG, ideally `512x512` or larger. Transparent background is fine.

Then run from the project root:

```bash
npm run icons
```

The script generates and overwrites:

```txt
app/favicon.ico
app/icon.png
app/apple-icon.png
```

That is enough for the Next.js App Router to use the favicon, browser icon, and Apple touch icon automatically.
