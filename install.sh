#!/usr/bin/env bash

set -e

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
npm install
DESKTOP_DIR="$HOME/.local/share/applications"
DESKTOP_FILE="$DESKTOP_DIR/whatsapp.desktop"

mkdir -p "$DESKTOP_DIR"

sed "s|__APP_DIR__|$APP_DIR|g" \
    "$APP_DIR/asset/whatsapp.desktop" \
    > "$DESKTOP_FILE"

chmod +x "$DESKTOP_FILE"

echo "Installed desktop entry:"
echo "$DESKTOP_FILE"
update-desktop-database "$HOME/.local/share/applications"
