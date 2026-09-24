export const SITE_URL = "https://www.cch-investments.com";

export const WORDPRESS_API_URL = "https://mediumaquamarine-partridge-477378.hostingersite.com/wp-json/wp/v2";

export const REVALIDATE_TIME = 3600; // 1 hour in seconds

export const ENDPOINTS = {
    PORTFOLIO: `${WORDPRESS_API_URL}/portfolio`,
    PORTFOLIO_BY_SLUG: (slug: string) => `${WORDPRESS_API_URL}/portfolio?_embed&slug=${encodeURIComponent(slug)}`,
    EDGE_SECTORS: `${WORDPRESS_API_URL}/posts`,
    MEDIA_BY_ID: (id: number) => `${WORDPRESS_API_URL}/media/${id}`,
} as const;

export const LINK_ARR = [
  { text: "ABOUT US", link: "#about-us" },
  { text: "OUR EDGE", link: "#our-edge" },
  { text: "OUR APPROACH", link: "#our-approach" },
  { text: "PORTFOLIO", link: "portfolios" },
  { text: "CONTACT US", link: "#contact-us" },
];
