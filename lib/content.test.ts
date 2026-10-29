import { describe, it, expect } from "vitest";
import { stripHtml } from "./content";

describe("stripHtml", () => {
  it("removes tags and decodes entities", () => {
    expect(stripHtml("<p>Tom &amp; Jerry&#8217;s</p>\n")).toBe("Tom & Jerry’s");
  });

  it("keeps unknown entities as written", () => {
    expect(stripHtml("a &foo; b")).toBe("a &foo; b");
  });
});
