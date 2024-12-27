import React, { forwardRef } from "react";
import * as S from "./styles";
import Image from "next/image";
import empty_heart from "../../../public/icons/empty_heart.svg";
import fill_heart from "../../../public/icons/fill_heart.svg";

type ProjectCardProps = {
  __typename: string;
  title: string;
  imageUrls: string[];
  id: string;
  bio: string;
};

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      id,
      imageUrls,
      title,
      bio,
      // author,
      // likes,
    },
    ref,
  ) => {
    // const [likeCount, setLikeCount] = useState(likes);
    // const [liked, setLiked] = useState(false);

    const handleLike = () => {
      // setLikeCount(likeCount + (liked ? -1 : 1));
      // setLiked(!liked);
    };

    return (
      <S.Card ref={ref}>
        <S.ImageWrapper>
          <Image
            src={imageUrls[0]}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </S.ImageWrapper>
        <S.Content>
          <S.Title>{title}</S.Title>
          <S.Description>{bio}</S.Description>
          <S.Author>{id}</S.Author>
          <S.LikeSection>
            <S.LikeButton onClick={handleLike}>
              <Image
                src={true ? fill_heart : empty_heart}
                alt="like button"
                width={24}
                height={24}
              />
            </S.LikeButton>
            <S.LikeCount>{100} likes</S.LikeCount>
          </S.LikeSection>
        </S.Content>
      </S.Card>
    );
  },
);
ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
