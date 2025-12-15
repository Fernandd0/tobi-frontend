export interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

export interface Track {
  id: string;
  name: string;
  album: { images: { url: string }[] };
  artists: { name: string }[];
}
