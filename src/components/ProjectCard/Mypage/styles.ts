import styled from "@emotion/styled";

export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;

  overflow: hidden;
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 180px;
  min-width: 180px;
  height: 180px;
  min-height: 180px;
  overflow: hidden;
`;

export const Content = styled.div``;

export const Title = styled.h2`
  font-size: 25px;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 8px;
`;

export const Author = styled.p`
  font-size: 16px;
  color: #888;
  margin-bottom: 8px;
`;

export const LikeSection = styled.div`
  display: flex;
  align-items: center;
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

export const LikeCount = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: #333;
`;
