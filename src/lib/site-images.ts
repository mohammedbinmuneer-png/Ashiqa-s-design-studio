/**
 * Home page: local stock photos (Pexels — free to use)
 * Portfolio page: separate assets under /lobarch/
 */

const home = "/stock/home";

export const siteImages = {
  hero: [`${home}/hero-1.jpg`, `${home}/hero-2.jpg`, `${home}/hero-3.jpg`],
  mission: `${home}/mission.jpg`,
  projects: {
    featured: `${home}/project-1.jpg`,
    one: `${home}/project-1.jpg`,
    two: `${home}/project-2.jpg`,
    three: `${home}/project-3.jpg`,
    four: `${home}/project-4.jpg`,
    five: `${home}/project-5.jpg`,
  },
  focus: {
    architecture: `${home}/focus-architecture.jpg`,
    interior: `${home}/focus-interior.jpg`,
    landscape: `${home}/focus-landscape.jpg`,
  },
  gallery: {
    sophistication: `${home}/gallery-1.jpg`,
    creativity: `${home}/gallery-2.jpg`,
    elegance: `${home}/gallery-3.jpg`,
  },
  cta: `${home}/cta.jpg`,
  portfolio: {
    residential: "/lobarch/alayam-1.avif",
    cultural: "/lobarch/haven-1.avif",
    urban: "/lobarch/001-scaled-e1765178187917.jpg",
    interior: "/lobarch/lob-interior-living-area-2.avif",
    pavilion: "/lobarch/the-mansion-within-1.avif",
    solar: "/lobarch/lob-architecture-1.avif",
  },
} as const;
