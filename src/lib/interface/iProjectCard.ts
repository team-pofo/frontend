export interface IProjectCard {
  //   __typename: string;

  id: string;
  title: string;
  imageUrls: string[];
  bio: string;
  likes: number;
  authorName: string;
}

export interface IProjectCardProps {
  projectCard: IProjectCard;
}
