import React from "react";
import * as Styles from "./styles";
import empty_heart from "../../../../public/icons/empty_heart.svg";
import fill_heart from "../../../../public/icons/fill_heart.svg";
import Image from "next/image";
import Link from "next/link";
import { IProjectCardProps } from "@/lib/interface/iProjectCard";

export default function MypageProjectCard(projectCard: IProjectCardProps) {
  // const [likeCount, setLikeCount] = useState(likes);
  // const [liked, setLiked] = useState(false);

  const handleLike = () => {
    // setLikeCount(likeCount + (liked ? -1 : 1));
    // setLiked(!liked);
  };

  const { id, title, imageUrls, bio } = projectCard.projectCard;
  return (
    <Link style={{ width: "100%" }} href={`/project/${id}`}>
      <Styles.Card>
        <Styles.ImageWrapper>
          <Image
            src={
              imageUrls !== null && imageUrls.length > 0
                ? imageUrls[0]
                : "https://velog.velcdn.com/images/yena1025/post/295eb434-5b73-421f-bbe4-6bc13acd4c33/image.png"
            }
            alt={title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Styles.ImageWrapper>
        <Styles.Content>
          <Styles.Title>{title}</Styles.Title>
          <Styles.Description>{bio}</Styles.Description>
          <Styles.Author>{id}</Styles.Author>
          <Styles.LikeSection>
            <Styles.LikeButton onClick={handleLike}>
              <Image
                src={true ? fill_heart : empty_heart}
                alt="like button"
                width={24}
                height={24}
              />
            </Styles.LikeButton>
            <Styles.LikeCount>{100} likes</Styles.LikeCount>
          </Styles.LikeSection>
        </Styles.Content>
      </Styles.Card>
    </Link>
  );
}
