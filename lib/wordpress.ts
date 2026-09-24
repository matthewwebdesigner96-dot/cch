import { ENDPOINTS, REVALIDATE_TIME } from "./constants";

export interface PortfolioItem {
  slug: string;
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  acf: {
    project_logo: string;
    region: string;
    industry: string;
    year: number;
    description: string;
    cover_image: string;
    key_tags: string;
    linkedin_url: string;
    website_url: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
}

export async function getPortfolios(): Promise<PortfolioItem[]> {
  try {
    const res = await fetch(`${ENDPOINTS.PORTFOLIO}?_embed`, {
      next: { revalidate: REVALIDATE_TIME },
    });
    if (!res.ok) {
      throw new Error(
        `Failed to fetch portfolios: ${res.status} ${res.statusText}`,
      );
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    throw error;
  }
}

interface EdgeSectorPost {
  id: number;
  acf: {
    title: string;
    short_description: string;
    image: number;
    hover_icon: number;
  };
}

export interface EdgeSector {
  title: string;
  description: string;
  img: string;
  svg: string;
}

export async function getEdgeSectors(): Promise<EdgeSector[]> {
  try {
    const res = await fetch(`${ENDPOINTS.EDGE_SECTORS}?per_page=100`, {
      next: { revalidate: REVALIDATE_TIME },
    });
    if (!res.ok) {
      throw new Error(
        `Failed to fetch edge sectors: ${res.status} ${res.statusText}`,
      );
    }
    const posts: EdgeSectorPost[] = await res.json();
    const resolveMediaUrl = async (id: number): Promise<string> => {
      const mediaRes = await fetch(ENDPOINTS.MEDIA_BY_ID(id), {
        next: { revalidate: REVALIDATE_TIME },
      });
      if (!mediaRes.ok) return "";
      const media = await mediaRes.json();
      return media.source_url ?? "";
    };

    return Promise.all(
      posts.map(async (post) => {
        const [img, svg] = await Promise.all([
          resolveMediaUrl(post.acf.image),
          resolveMediaUrl(post.acf.hover_icon),
        ]);

        return {
          title: post.acf.title,
          description: post.acf.short_description,
          img,
          svg,
        };
      }),
    );
  } catch (error) {
    console.error("Error fetching edge sectors:", error);
    throw error;
  }
}

export async function getPortfolioBySlug(
  slug: string,
): Promise<PortfolioItem | null> {
  try {
    const res = await fetch(ENDPOINTS.PORTFOLIO_BY_SLUG(slug), {
      next: { revalidate: REVALIDATE_TIME },
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(
        `Failed to fetch portfolio "${slug}": ${res.status} ${res.statusText}`,
      );
    }
    const data: PortfolioItem[] = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching portfolio by slug:", error);
    throw error;
  }
}
