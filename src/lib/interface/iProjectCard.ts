export interface IProjectCard {
  // likes: number;
  // author: string;
  //   __typename: string;

  id: string;
  title: string;
  imageUrls: string[];
  bio: string;
}

export interface IProjectCardProps {
  projectCard: IProjectCard;
}
