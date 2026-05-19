import express from "express";
import { createServer as createViteServer } from "vite";
import gplay from "google-play-scraper";
import store from "app-store-scraper";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fallback data in case the scraper is blocked in production
const FALLBACK_APPS = [
  {
    appId: "com.king.candycrushsaga",
    title: "Candy Crush Saga",
    icon: "https://play-lh.googleusercontent.com/TLU9wp9C9S9p-v3I9-p-v3I9-p-v3I9-p-v3I9-p-v3I9",
    developer: "King",
    scoreText: "4.6",
    summary: "Master the legendary match 3 puzzle game from King! With over a trillion levels played, Candy Crush Saga is the popular match 3 puzzle game that you will love playing.",
    url: "https://play.google.com/store/apps/details?id=com.king.candycrushsaga",
    free: true,
    priceText: "Free"
  },
  {
    appId: "com.roblox.client",
    title: "Roblox",
    icon: "https://picsum.photos/seed/roblox/512/512",
    developer: "Roblox Corporation",
    scoreText: "4.4",
    summary: "Roblox is the ultimate virtual universe that lets you create, share experiences with friends, and be anything you can imagine. Join millions of people today!",
    url: "https://play.google.com/store/apps/details?id=com.roblox.client",
    free: true,
    priceText: "Free"
  },
  {
    appId: "com.kiloo.subwaysurf",
    title: "Subway Surfers",
    icon: "https://picsum.photos/seed/subwaysurf/512/512",
    developer: "SYBO Games",
    scoreText: "4.5",
    summary: "Help Jake, Tricky & Fresh escape from the grumpy Inspector and his dog! DASH as fast as you can, DODGE the oncoming trains and experience our most addictive world tour yet.",
    url: "https://play.google.com/store/apps/details?id=com.kiloo.subwaysurf",
    free: true,
    priceText: "Free"
  },
  {
    appId: "com.whatsapp",
    title: "WhatsApp Messenger",
    icon: "https://picsum.photos/seed/whatsapp/512/512",
    developer: "WhatsApp LLC",
    scoreText: "4.3",
    summary: "WhatsApp from Meta is a FREE messaging and video calling app used by over 2B people in more than 180 countries. It's simple, reliable, and private, so you can easily keep in touch.",
    url: "https://play.google.com/store/apps/details?id=com.whatsapp",
    free: true,
    priceText: "Free"
  },
  {
    appId: "com.instagram.android",
    title: "Instagram",
    icon: "https://picsum.photos/seed/instagram/512/512",
    developer: "Instagram",
    scoreText: "4.0",
    summary: "Bring you closer to the people and things you love. Connect with friends, share what you’re up to, or see what's new from others all over the world.",
    url: "https://play.google.com/store/apps/details?id=com.instagram.android",
    free: true,
    priceText: "Free"
  },
  {
    appId: "com.zhiliaoapp.musically",
    title: "TikTok",
    icon: "https://picsum.photos/seed/tiktok/512/512",
    developer: "TikTok Pte. Ltd.",
    scoreText: "4.4",
    summary: "TikTok is the destination for mobile videos. On TikTok, short-form videos are exciting, spontaneous, and genuine. From your morning coffee to your afternoon errands, TikTok has the videos that are guaranteed to make your day.",
    url: "https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically",
    free: true,
    priceText: "Free"
  },
  {
    appId: "com.snapchat.android",
    title: "Snapchat",
    icon: "https://picsum.photos/seed/snapchat/512/512",
    developer: "Snap Inc",
    scoreText: "4.1",
    summary: "Snapchat is a fast and fun way to share the moment with your friends and family. Share a Snap, Chat with friends, or watch Stories to stay connected to what matters most.",
    url: "https://play.google.com/store/apps/details?id=com.snapchat.android",
    free: true,
    priceText: "Free"
  },
  {
    appId: "com.netflix.mediaclient",
    title: "Netflix",
    icon: "https://picsum.photos/seed/netflix/512/512",
    developer: "Netflix, Inc.",
    scoreText: "4.2",
    summary: "Looking for the most talked about TV shows and movies from the around the world? They’re all on Netflix. We’ve got award-winning series, movies, documentaries, and stand-up specials.",
    url: "https://play.google.com/store/apps/details?id=com.netflix.mediaclient",
    free: true,
    priceText: "Free"
  },
  {
    appId: "com.spotify.music",
    title: "Spotify",
    icon: "https://picsum.photos/seed/spotify/512/512",
    developer: "Spotify AB",
    scoreText: "4.4",
    summary: "Listen to music, podcasts and audiobooks you love. Discover new music and albums with personal recommendations. Create and share playlists of any song you like.",
    url: "https://play.google.com/store/apps/details?id=com.spotify.music",
    free: true,
    priceText: "Free"
  },
  {
    appId: "com.supercell.brawlstars",
    title: "Brawl Stars",
    icon: "https://picsum.photos/seed/brawlstars/512/512",
    developer: "Supercell",
    scoreText: "4.3",
    summary: "Fast-paced 3v3 multiplayer and battle royale made for mobile! Play with friends or solo across a variety of game modes in under three minutes.",
    url: "https://play.google.com/store/apps/details?id=com.supercell.brawlstars",
    free: true,
    priceText: "Free"
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable CORS for production
  app.use(cors());
  app.use(express.json());

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // API Routes
  app.get("/api/apps/top", async (req, res) => {
    const { category, collection, num = 30, store: storeType = 'play' } = req.query;
    
    const limit = Math.min(parseInt(num as string) || 30, 1000);

    if (storeType === 'apple') {
      try {
        const results = await store.list({
          collection: store.collection.TOP_FREE_IOS,
          num: limit,
          country: 'us'
        });
        res.json(results.map(app => ({
          ...app,
          appId: app.id,
          score: app.score || 0,
          scoreText: (app.score || 0).toFixed(1),
          priceText: app.free ? 'Free' : (app.price || 'Paid').toString(),
          developer: app.developer,
          store: 'apple'
        })));
      } catch (error) {
        console.error("App Store Scraper Error:", error);
        res.status(500).json({ error: "Failed to fetch App Store apps" });
      }
      return;
    }

    // Validate collection
    const validCollections = ['TOP_FREE', 'TOP_PAID', 'GROSSING'];
    let collectionToUse = (collection as string) || 'TOP_FREE';
    
    if (!validCollections.includes(collectionToUse)) {
      console.warn(`Invalid collection requested: ${collectionToUse}. Falling back to TOP_FREE.`);
      collectionToUse = 'TOP_FREE';
    }

    // Map special UI categories to collections/categories
    let categoryToUse = (category as string) || 'GAME';
    if (categoryToUse === 'TRENDING') {
      collectionToUse = 'TOP_FREE'; // No native trending, use top free
      categoryToUse = 'GAME'; // Default fallback
    } else if (categoryToUse === 'NEW') {
      collectionToUse = 'TOP_FREE'; 
      categoryToUse = 'APPLICATION';
    } else if (categoryToUse === 'TOP') {
      collectionToUse = 'GROSSING';
      categoryToUse = 'GAME';
    }

    console.log(`Fetching top apps: category=${categoryToUse}, collection=${collectionToUse}, num=${limit}`);
    
    try {
      const results = await gplay.list({
        category: categoryToUse as any,
        collection: collectionToUse as any,
        num: limit,
        country: 'us'
      });
      
      console.log(`Successfully fetched ${results.length} apps`);
      res.json(results);
    } catch (error) {
      console.error("Scraper Error (Top Apps):", error);
      // Return fallback data if scraper fails (likely due to IP blocking)
      console.log("Returning fallback data...");
      res.json(FALLBACK_APPS);
    }
  });

  app.get("/api/search", async (req, res) => {
    const { term, num = 30 } = req.query;
    if (!term) {
      return res.status(400).json({ error: "Search term is required" });
    }
    const limit = Math.min(parseInt(num as string) || 30, 250);

    console.log(`Searching for: ${term}, limit: ${limit}`);
    try {
      const results = await gplay.search({
        term: term as string,
        num: limit,
        country: 'us'
      });

      console.log(`Search found ${results.length} results`);
      res.json(results);
    } catch (error) {
      console.error("Scraper Error (Search):", error);
      // Filter fallback data as a simple search fallback
      const filtered = FALLBACK_APPS.filter(a => 
        a.title.toLowerCase().includes((term as string).toLowerCase())
      );
      res.json(filtered.length > 0 ? filtered : FALLBACK_APPS);
    }
  });

  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await gplay.categories();
      res.json(categories);
    } catch (error) {
      console.error("Scraper Error (Categories):", error);
      // Fallback categories if scraper fails
      const fallback = [
        { name: "GAME_ACTION" }, { name: "GAME_RACING" }, { name: "GAME_PUZZLE" }, 
        { name: "GAME_ADVENTURE" }, { name: "GAME_CASUAL" }, { name: "TOOLS" }, 
        { name: "SOCIAL" }, { name: "COMMUNICATION" }, { name: "EDUCATION" }
      ];
      res.json(fallback);
    }
  });

  app.get("/api/app/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching details for: ${id}`);
    
    try {
      const result = await gplay.app({ appId: id });
      
      // Parallelize supplemental data fetching
      const [appStoreResults, similar] = await Promise.all([
        store.search({ term: result.title, num: 1 }).catch(e => {
          console.warn("Could not find iOS version:", e);
          return [];
        }),
        gplay.similar({ appId: id }).catch(e => {
          console.warn("Could not find similar apps:", e);
          return [];
        })
      ]);

      const appStoreUrl = appStoreResults.length > 0 ? (appStoreResults as any)[0].url : null;
      res.json({ ...result, appStoreUrl, similar });
    } catch (error) {
      console.error("Scraper Error (Details):", error);
      res.status(404).json({ error: "App not found or scraper blocked" });
    }
  });

  app.get("/api/blog", async (req, res) => {
    try {
      // Fetching from Dev.to for fresh gaming/tech news
      const response = await fetch("https://dev.to/api/articles?tag=gaming&per_page=12");
      if (!response.ok) throw new Error("Failed to fetch blog");
      const data = await response.json();
      res.json(data);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve from the 'dist' folder relative to this file
    const isInsideDist = __dirname.endsWith('dist');
    const distPath = isInsideDist ? __dirname : path.join(process.cwd(), 'dist');
    
    console.log(`Production mode: serving static files from ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
