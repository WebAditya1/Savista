# Savista Brand Assets

Source: `SAVISTA Original 2D Logo.pdf`

## Extracted palette (from logo analysis)

| Token | Hex | Usage |
|-------|-----|-------|
| Navy (primary) | `#004088` | Logo wordmark, icon top, buttons, headers |
| Teal (accent) | `#0898a0` | Logo tagline, icon bottom, highlights, gradients |
| Black | `#000000` | Monochrome logo variant |
| White | `#FFFFFF` | Backgrounds, dark-section logo |

## Web assets (`frontend/public/`)

| File | Use |
|------|-----|
| `logo-color.png` | Header on light backgrounds, SEO, general |
| `logo-white.png` | Header on dark/hero backgrounds, footer |
| `logo-mono.png` | Print / alternate monochrome |
| `favicon.png` | Browser tab icon |

## Page 1 — Full color logo (navy + teal)
## Page 2 — Monochrome black logo

To regenerate web assets after updating the PDF:

```bash
python3 scripts/extract-logo.py   # or re-run extraction from project root
```
