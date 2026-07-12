#!/usr/bin/env bash
# Seed MongoDB Atlas after Render deploy. Usage:
#   MONGODB_URI="mongodb+srv://..." ./scripts/seed-atlas.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/backend"

if [[ -z "${MONGODB_URI:-}" ]]; then
  echo "Error: set MONGODB_URI to your MongoDB Atlas connection string."
  exit 1
fi

export SEED_IF_EMPTY=true
npm run build
npm run seed:prod
echo "Done. Products and gallery seeded on Atlas."
