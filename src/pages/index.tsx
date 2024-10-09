import ProjectCard from "@/components/ProjectCard/projectCard";
export default function Home() {
  return (
    <div>
      <ProjectCard
        imageSrc="https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg"
        title="외국민"
        description="외국인 유학생을 위한 앱"
        likes={123}
        author="캡스톤 30조"
      />
    </div>
  );
}
