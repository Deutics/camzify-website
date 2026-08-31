#!/usr/bin/env bash
# Deploy to Vercel from a clean export of HEAD.
#
# Why not just `vercel deploy` from the project root: uploads from the working
# directory stall indefinitely on this project — the deployment is created but the
# build never starts (Builds [0ms]). An export of the same commit deploys in ~45s.
# Until that is understood, this is the reliable path.
#
# Usage:  ./scripts/deploy.sh          # production
#         ./scripts/deploy.sh preview  # preview
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAGE="$(mktemp -d /tmp/camzify-deploy.XXXXXX | tr 'A-Z' 'a-z')"
TARGET="${1:-production}"

if [[ -n "$(git -C "$ROOT" status --porcelain)" ]]; then
  echo "Working tree is dirty. Commit first — this deploys HEAD, not your edits." >&2
  exit 1
fi

echo "Exporting $(git -C "$ROOT" rev-parse --short HEAD) to $STAGE"
git -C "$ROOT" archive HEAD | tar -x -C "$STAGE"
cp -r "$ROOT/.vercel" "$STAGE/.vercel"

cd "$STAGE"
if [[ "$TARGET" == "production" ]]; then
  vercel deploy --prod --yes
else
  vercel deploy --yes
fi

rm -rf "$STAGE"
