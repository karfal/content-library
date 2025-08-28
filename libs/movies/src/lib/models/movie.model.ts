export interface IMovie {
  id: string;
  slug: string;
  title: string;
  popularity: string;
  image: {
    url: string;
    title: string;
  };
  runtime: string;
  released: string;
  genres: string[];
  budget: number;
}
