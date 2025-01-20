import React, { forwardRef } from "react";
import * as S from "./styles";
import Image from "next/image";
import empty_heart from "../../../public/icons/empty_heart.svg";
import fill_heart from "../../../public/icons/fill_heart.svg";
import Link from "next/link";
import { IProjectCardProps } from "@/lib/interface/iProjectCard";

const ProjectCard = forwardRef<HTMLDivElement, IProjectCardProps>(
  (projectCard, ref) => {
    // const [likeCount, setLikeCount] = useState(likes);
    // const [liked, setLiked] = useState(false);

    const handleLike = () => {
      // setLikeCount(likeCount + (liked ? -1 : 1));
      // setLiked(!liked);
    };

    const { id, title, imageUrls, bio, likes, authorName } =
      projectCard.projectCard;

    return (
      <Link style={{ width: "100%" }} href={`/project/${id}`}>
        <S.Card ref={ref}>
          <S.ImageWrapper>
            <Image
              src={
                imageUrls !== null && imageUrls.length > 0
                  ? imageUrls[0]
                  : "https://velog.velcdn.com/images/yena1025/post/295eb434-5b73-421f-bbe4-6bc13acd4c33/image.png"
              }
              alt={title}
              layout="fill"
              objectFit="cover"
            />
          </S.ImageWrapper>
          <S.Content>
            <S.Title>{title}</S.Title>
            <S.Description>{bio}</S.Description>
            <S.Author>
              {authorName} {id}
            </S.Author>
            <S.LikeSection>
              <S.LikeButton onClick={handleLike}>
                <Image
                  src={true ? fill_heart : empty_heart}
                  alt="like button"
                  width={24}
                  height={24}
                />
              </S.LikeButton>
              <S.LikeCount>{likes} likes</S.LikeCount>
            </S.LikeSection>
          </S.Content>
        </S.Card>
      </Link>
    );
  },
);
ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
