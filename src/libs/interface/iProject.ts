export interface IProject {
  id: number;
  title: string;
  bio: string;
  urls: string[];
  imageUrls: string[];
  keyImageIndex: number;
  content: string;
  isApproved: boolean;
  likes: number;
  categories: string[];
  stacks: string[];
  authorName: string;
}

export interface IProjectProps {
  project: IProject;
}
