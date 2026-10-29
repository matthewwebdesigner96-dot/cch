import sanitizeHtml from "sanitize-html";

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "a", "blockquote", "h2", "h3", "h4"],
  allowedAttributes: { a: ["href", "title", "target", "rel"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
  },
};

const BLOCK_START = /^<(p|ul|ol|li|h[1-6]|blockquote)[\s>]/i;

// WordPress's editor stores paragraphs as blank lines, not <p> tags (and single line breaks as <br>).
function autoParagraph(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => (BLOCK_START.test(chunk) ? chunk : `<p>${chunk.replace(/\n/g, "<br>")}</p>`))
    .join("");
}

// Server only: sanitize-html must not be imported from client components.
// Handles WYSIWYG content (inline tags, blank-line paragraphs) and older plain-text values.
export function descriptionToHtml(value: string): string {
  if (/<\/?[a-z][^>]*>/i.test(value)) return sanitizeHtml(autoParagraph(value), SANITIZE_OPTIONS);

  return autoParagraph(escapeHtml(value));
}
