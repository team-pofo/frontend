// data/dummyData.ts
const dummyData = Array.from({ length: 100 }, (_, index) => ({
  imageSrc:
    "https://velog.velcdn.com/images/yena1025/post/295eb434-5b73-421f-bbe4-6bc13acd4c33/image.png",
  title: `프로젝트 ${index + 1}`,
  description: "외국인 유학생을 위한 앱",
  likes: 124 + index,
  author: "캡스톤 30조",
}));

export default dummyData;
