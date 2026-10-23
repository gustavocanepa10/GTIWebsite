import { existsSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Inventory only: Vite serves/copies the files from public without bundling MP4s.
export function getPublicVideoFiles() {
  const directory = fileURLToPath(new URL("../public/videos/", import.meta.url));
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.mp4$/i.test(entry.name))
    .filter((entry) => statSync(path.join(directory, entry.name)).size > 0)
    .map((entry) => `/videos/${entry.name}`);
}
