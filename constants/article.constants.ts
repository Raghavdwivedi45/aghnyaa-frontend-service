import { IArticleForm1, IBookmark, ILike, INewArticlePayload } from './article.interfaces';
import { Option, publishingType } from './types';

export const initialCreateNewArticle: INewArticlePayload = {
  title: '',
  excerpt: '',
  content: '',
  coverImage: '',
  tags: [],
  isFeatured: false,
  category: '',
  readTime: 0,
};

// export const articleCategory: { key: string | number; text: string | number }[] = [
//   { key: 'technology', text: 'technology' },
//   { key: 'programming', text: 'programming' },
//   { key: 'javascript', text: 'javascript' },
//   { key: 'typescript', text: 'typescript' },
//   { key: 'nodejs', text: 'nodejs' },
//   { key: 'mongodb', text: 'mongodb' },
//   { key: 'nextjs', text: 'nextjs' },
//   { key: 'react', text: 'react' },
//   { key: 'career', text: 'career' },
// ] as const;

export const articleTags: { key: string; text: string }[] = [
  { key: 'jwt', text: 'jwt' },
  { key: 'express', text: 'express' },
  { key: 'mongoose', text: 'mongoose' },
  { key: 'docker', text: 'docker' },
  { key: 'git', text: 'git' },
  { key: 'redis', text: 'redis' },
  { key: 'aws', text: 'aws' },
  { key: 'css', text: 'css' },
  { key: 'html', text: 'html' },
  { key: 'vedas', text: 'Vedas' },
  { key: 'upanishads', text: 'Upanishadas' },
  { key: 'dharmashastras', text: 'Dharmashastras' },
  { key: 'ramayana', text: 'Ramayana' },
  { key: 'mahabharata', text: 'Mahabharata' },
  { key: 'puranas', text: 'Puranas' },
  { key: 'yoga', text: 'Yoga' },
  { key: 'ayurveda', text: 'Ayurveda' },
  { key: 'vedanta', text: 'Vedanta' },
  { key: 'dharma', text: 'Dharma' },
  { key: 'karma', text: 'Karma' },
  { key: 'moksha', text: 'Moksha' },
  { key: 'bhakti', text: 'Bhakti' },
  { key: 'nyaya', text: 'Nyaya' },
  { key: 'vaisheshika', text: 'Vaisheshika' },
  { key: 'samkhya', text: 'Samkhya' },
  { key: 'mimamsa', text: 'Mimamsa' },
  { key: 'jyotisha', text: 'Jyotisha' },
  { key: 'vastu-shastra', text: 'Vastu Shastra' },
  { key: 'mantras', text: 'Mantras' },
  { key: 'yajna', text: 'Yajna' },
  { key: 'tantra', text: 'Tantra' },
  { key: 'neeti-shastra', text: 'Neeti Shastra' },
  { key: 'parva', text: 'Parva' },
] as const;

export const publishingOptions: Option[] = [
  { value: 'DRAFT', label: 'Draft', svg: 'eye-off' },
  { value: 'PUBLISHED', label: 'Published', svg: 'eye' },
];

export const initialPayload: IArticleForm1 = {
  title: '',
  slug: '',
  author: {
    _id: '',
    username: '',
    avatar: '',
  },
  likes: 0,
  bookmarks: 0,
  language: 'English',
  excerpt: '',
  category: '',
  coverImage: '',
  tags: [],
  content: '',
  status: 'DRAFT' as publishingType,
  isFeatured: false,
  readTime: 2,
  isLikedByUser: false,
  isBookmarkedByUser: false,
};

export const initialBookmarks: IBookmark = { isBookmarkedByUser: false, bookmarks: 0 };
