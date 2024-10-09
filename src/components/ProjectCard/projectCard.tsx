import React, { useState } from "react";
import * as S from "./styles";
import Image from "next/image";

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
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
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
          <S.LikeButton onClick={handleLike} liked={liked}>
            ❤️
          </S.LikeButton>
          <S.LikeCount>{likeCount} likes</S.LikeCount>
        </S.LikeSection>
      </S.Content>
    </S.Card>
  );
};

export default ProjectCard;
