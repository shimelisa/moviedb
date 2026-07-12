import KillerSally from '../assets/image/10061.jpg'
import Pepsi from '../assets/image/10066.jpg'
import FitForTv from '../assets/image/10067.jpg'
import champion from '../assets/image/10079.jpg'
import TheArt from '../assets/image/10072.jpg'
import coldStorage from '../assets/image/coldStorage.webp'
import hamnet from '../assets/image/hamnet.webp'
import hoppers from '../assets/image/hoppers.webp'
import marshals from '../assets/image/marshals.webp'
import monarch from '../assets/image/monarchLegacyOfMonsters.webp'
import pursuit from '../assets/image/pursuitOfJade.webp'
import scream from '../assets/image/scream7.webp' // FIX: was pointing at pursuitOfJade.webp
import TheBride from '../assets/image/TheBride.webp'
import Vladimir from '../assets/image/vladimir.webp'
import YoungSherlock from '../assets/image/youngSherlock.webp'

export const moviesManual = [
  {
    id: 1,
    title: "Monarch",
    poster_path: monarch,
    matureRating: "U/A 16+",
    category: "Movie",
    quality: "HD",
    genres: ["Action", "Thriller", "Adventure"],
    badge: "Recently added"
  },
  {
    id: 2,
    title: "Killer Sally",
    poster_path: KillerSally,
    matureRating: "U/A 16+",
    category: "Movie",
    quality: "HD",
    genres: ["Crime", "Drama", "Thriller"],
    badge: "Recently added"
  },
  {
    id: 3,
    title: "Pepsi",
    poster_path: Pepsi,
    matureRating: "U/A 16+",
    category: "Movie",
    quality: "HD",
    genres: ["Sci-Fi", "Thriller", "Action"],
    badge: "Recently added"
  },
  {
    id: 4,
    title: "Fit For Tv",
    poster_path: FitForTv,
    matureRating: "U/A 13+",
    category: "Movie",
    quality: "HD",
    genres: ["Adventure", "Fantasy"],
    badge: "Recently added"
  },
  {
    id: 5,
    title: "Champion",
    poster_path: champion,
    matureRating: "U/A 13+",
    category: "Movie",
    quality: "HD",
    genres: ["Adventure", "Fantasy"],
    badge: "Recently added"
  },
  {
    id: 6,
    title: "Damsel",
    poster_path: TheArt,
    matureRating: "U/A 13+",
    category: "Movie",
    quality: "HD",
    genres: ["Adventure", "Fantasy"],
    badge: "Recently added"
  },
  {
    id: 7,
    title: "Cold Storage",
    poster_path: coldStorage,
    matureRating: "U/A 13+",
    category: "Movie",
    quality: "HD",
    genres: ["Adventure", "Fantasy"],
    badge: "Recently added"
  },
  {
    id: 8,
    title: "Hamnet",
    poster_path: hamnet,
    matureRating: "U/A 13+",
    category: "Movie",
    quality: "HD",
    genres: ["Adventure", "Fantasy"],
    badge: "Recently added"
  },
  {
    id: 9,
    title: "Marshals",
    poster_path: marshals,
    matureRating: "U/A 13+",
    category: "Movie",
    quality: "HD",
    genres: ["Adventure", "Fantasy"],
    badge: "Recently added"
  },
  // --- Below: these image assets already existed in src/assets/image but
  // were never referenced anywhere, so their movies never showed up in the
  // "Local Movie List" row. Added them here. Remove if not wanted. ---
  {
    id: 10,
    title: "Hoppers",
    poster_path: hoppers,
    matureRating: "PG",
    category: "Movie",
    quality: "HD",
    genres: ["Animation", "Family"],
    badge: "Recently added"
  },
  {
    id: 11,
    title: "Pursuit of Jade",
    poster_path: pursuit,
    matureRating: "U/A 16+",
    category: "Movie",
    quality: "HD",
    genres: ["Action", "Crime"],
    badge: "Recently added"
  },
  {
    id: 12,
    title: "Scream 7",
    poster_path: scream,
    matureRating: "U/A 18+",
    category: "Movie",
    quality: "HD",
    genres: ["Horror", "Thriller"],
    badge: "Recently added"
  },
  {
    id: 13,
    title: "The Bride",
    poster_path: TheBride,
    matureRating: "U/A 16+",
    category: "Movie",
    quality: "HD",
    genres: ["Horror", "Drama"],
    badge: "Recently added"
  },
  {
    id: 14,
    title: "Vladimir",
    poster_path: Vladimir,
    matureRating: "U/A 16+",
    category: "Movie",
    quality: "HD",
    genres: ["Drama", "Thriller"],
    badge: "Recently added"
  },
  {
    id: 15,
    title: "Young Sherlock",
    poster_path: YoungSherlock,
    matureRating: "PG-13",
    category: "Movie",
    quality: "HD",
    genres: ["Mystery", "Adventure"],
    badge: "Recently added"
  },
];
