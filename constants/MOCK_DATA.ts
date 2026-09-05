import { IBook, IBookIndexChapters, IChapterSidebarDetails, IVideo } from "./interfaces";

export const sampleBooks: IBook[] = [
  {
    id: 1,
    tag: "Editor's Pick",
    title: "Bhagavad Gita",
    author: "Vedavyasa",
    description: "A timeless dialogue on duty, devotion and the nature of the self, set on the battlefield of Kurukshetra. A timeless dialogue on duty, devotion and the nature of the self, set on the battlefield of Kurukshetra. A timeless dialogue on duty, devotion and the nature of the self, set on the battlefield of Kurukshetra.",
    createdAt: "2026-06-25T10:30:00Z",
    slug: "bhagavad-gita",
  },
  {
    id: 2,
    tag: "Featured",
    title: "Arthashastra",
    author: "Kautilya",
    description: "An ancient treatise on statecraft, economics and military strategy that shaped governance for centuries. A timeless dialogue on duty, devotion and the nature of the self, set on the battlefield of Kurukshetra. A timeless dialogue on duty, devotion and the nature of the self, set on the battlefield of Kurukshetra.",
    createdAt: "2026-06-22T09:15:00Z",
    slug: "arthashastra",
  },
  {
    id: 3,
    tag: "Trending",
    title: "Yoga Sutras",
    author: "Patanjali",
    description: "The foundational text of classical yoga, mapping the path of the mind toward stillness and liberation. A timeless dialogue on duty, devotion and the nature of the self, set on the battlefield of Kurukshetra. A timeless dialogue on duty, devotion and the nature of the self, set on the battlefield of Kurukshetra.",
    createdAt: "2026-06-20T14:45:00Z",
    slug: "yoga-sutras",
  },
];

export const sampleVideo: IVideo[] = [
  {
    id: 1,
    tag: "Editor's Pick",
    title: "Bhagavad Gita",
    creator: "Vedavyasa",
    createdAt: "2026-06-25T10:30:00Z",
    thumbnail: {
      url: "https://i.ytimg.com/vi/D7iq7w81Atg/sddefault.jpg",
      width: 1280,
      height: 720,
    },
    duration: "07:65",
    embedUrl: "https://www.youtube.com/embed/D7iq7w81Atg",
    videoURL: "",
    source: "youtube",
    height: 720,
    width: 1280,
  },
  {
    id: 2,
    tag: "Featured",
    title: "Arthashastra",
    creator: "Kautilya",
    createdAt: "2026-06-22T09:15:00Z",
    thumbnail: {
      url: "https://i.ytimg.com/vi/D7iq7w81Atg/sddefault.jpg",
      width: 1280,
      height: 720,
    },
    duration: "05:10",
    embedUrl: "https://www.youtube.com/embed/Gcz4YVdLF6g",
    videoURL: "",
    source: "youtube",
    height: 720,
    width: 1280,
  },
  {
    id: 3,
    tag: "Trending",
    title: "Yoga Sutras",
    creator: "Patanjali",
    createdAt: "2026-06-20T14:45:00Z",
    thumbnail: {
      url: "https://i.ytimg.com/vi/D7iq7w81Atg/sddefault.jpg",
      width: 1280,
      height: 720,
    },
    duration: "09:20",
    embedUrl: "https://www.youtube.com/embed/gsyeoIE4nVI",
    videoURL: "",
    source: "youtube",
    height: 720,
    width: 1280,
  },
];

export const bookIndexChapters: IBookIndexChapters[] = [
  {
    id: "1",
    title: "Invocation",
    verseCount: 12,
    slug: "invocation",
  },
  {
    id: "2",
    title: "The Call",
    verseCount: 18,
    slug: "the-call",
  },
  {
    id: "3",
    title: "The Path",
    verseCount: 24,
    slug: "the-path",
  },
  {
    id: "4",
    title: "Inner Reflection",
    verseCount: 21,
    slug: "inner-reflection",
  },
  {
    id: "5",
    title: "Wisdom",
    verseCount: 30,
    slug: "wisdom",
  },
  {
    id: "6",
    title: "Compassion",
    verseCount: 16,
    slug: "compassion",
  },
  {
    id: "7",
    title: "Detachment",
    verseCount: 27,
    slug: "detachment",
  },
  {
    id: "8",
    title: "Devotion",
    verseCount: 19,
    slug: "devotion",
  },
  {
    id: "9",
    title: "Liberation",
    verseCount: 15,
    slug: "liberation",
  },
];

// Derived from bookIndexChapters so the sidebar and the book index page
// always agree on chapter slugs and verse counts.
export const chapterContents: IChapterSidebarDetails[] = bookIndexChapters.map(
  (chapter, idx) => ({
    chapterNumber: idx + 1,
    title: chapter.title,
    slug: chapter.slug,
    totalVerses: chapter.verseCount,
  })
)