import styled from "@emotion/styled";

export const Card = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
`;

export const Content = styled.div`
  padding: 16px;
`;

export const Title = styled.h2`
  font-size: 18px;
  margin: 0;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 12px;
`;

export const Author = styled.p`
  font-size: 12px;
  color: #888;
  margin-bottom: 16px;
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
