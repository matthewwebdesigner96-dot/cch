import { describe, it, expect } from "vitest";
import { descriptionToHtml } from "./richtext";

describe("descriptionToHtml", () => {
  it("keeps normal WYSIWYG formatting", () => {
    const html = "<p>Overview <strong>bold</strong> <em>it</em></p><ul><li>One</li></ul>";
    expect(descriptionToHtml(html)).toBe(html);
  });

  it("removes script tags and their contents", () => {
    expect(descriptionToHtml("<p>Hi</p><script>alert(1)</script>")).toBe("<p>Hi</p>");
  });

  it("removes event handler attributes", () => {
    expect(descriptionToHtml('<p onclick="x()">Hi <img src=x onerror="alert(1)"></p>')).toBe("<p>Hi </p>");
  });

  it("removes javascript: links but keeps the text", () => {
    expect(descriptionToHtml('<a href="javascript:alert(1)">click</a>')).toBe('<p><a rel="noopener noreferrer">click</a></p>');
  });

  it("keeps safe links and forces rel on them", () => {
    expect(descriptionToHtml('<a href="https://example.com" target="_blank">site</a>')).toBe(
      '<p><a href="https://example.com" target="_blank" rel="noopener noreferrer">site</a></p>',
    );
  });

  it("adds paragraphs to WordPress editor output that has tags but no <p>", () => {
    expect(descriptionToHtml("<strong>Overview</strong>\r\n\r\nFirst line\r\nSecond line\r\n\r\nLast")).toBe(
      "<p><strong>Overview</strong></p><p>First line<br />Second line</p><p>Last</p>",
    );
  });

  it("leaves lists intact between text paragraphs", () => {
    expect(descriptionToHtml("Intro <b>x</b>\n\n<ul>\n<li>One</li>\n</ul>\n\nOutro")).toBe(
      "<p>Intro <b>x</b></p><ul>\n<li>One</li>\n</ul><p>Outro</p>",
    );
  });

  it("turns legacy plain text into escaped paragraphs", () => {
    expect(descriptionToHtml("Overview\r\n\r\nA < B & C")).toBe(
      "<p>Overview</p><p>A &lt; B &amp; C</p>",
    );
  });

  it("returns an empty string for empty input", () => {
    expect(descriptionToHtml("")).toBe("");
  });
});
