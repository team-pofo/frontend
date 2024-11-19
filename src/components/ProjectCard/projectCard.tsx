import React, { useState } from "react";
import * as S from "./Styles";
import Image from "next/image";
import empty_heart from "../../../public/icons/empty_heart.svg";
import fill_heart from "../../../public/icons/fill_heart.svg";

type ProjectCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  author: string;
  likes: number;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageSrc,
  title,
  description,
  author,
  likes,
}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLikeCount(likeCount + (liked ? -1 : 1));
    setLiked(!liked);
  };

  return (
    <S.Card>
      <S.ImageWrapper>
        <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
      </S.ImageWrapper>
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.Author>{author}</S.Author>
        <S.LikeSection>
          <S.LikeButton onClick={handleLike}>
            <Image
              src={liked ? fill_heart : empty_heart}
              alt="like button"
              width={24}
              height={24}
            />
          </S.LikeButton>
          <S.LikeCount>{likeCount} likes</S.LikeCount>
        </S.LikeSection>
      </S.Content>
    </S.Card>
  );
};

export default ProjectCard;
