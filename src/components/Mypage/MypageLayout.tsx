import * as Styles from "./styles";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { LuFileText, LuHeart, LuSettings } from "react-icons/lu";

function MypageMyInfo() {
  return (
    <Styles.MypageMyinfo>
      <Image
        src="https://avatars.githubusercontent.com/u/55120784?v=4"
        alt=""
        width={200}
        height={200}
        style={{ borderRadius: "50%" }}
      />
      <Styles.MypageNickname>kevinmj12</Styles.MypageNickname>
      <Styles.MypageEmail>kevinmj12@gmail.com</Styles.MypageEmail>
    </Styles.MypageMyinfo>
  );
}

function MypageSidebar({
  sidebarIndex,
  setSidebarIndex,
}: {
  sidebarIndex: number;
  setSidebarIndex: (sidebarIndex: number) => void;
}) {
  const items = [
    {
      icon: <LuFileText />,
      label: "나의 프로젝트",
      link: "/myprojects",
    },
    {
      icon: <LuHeart />,
      label: "좋아요한 프로젝트",
      link: "/likeprojects",
    },
    {
      icon: <LuSettings />,
      label: "개인정보 변경",
      link: "/editprofile",
    },
  ];

  return (
    <Styles.MypageSidebar>
      {items.map((item, index) => (
        <Link
          key={index}
          href={`/mypage/${item.link}`}
          style={{ width: "100%" }}
          passHref
        >
          <button
            key={index}
            onClick={() => setSidebarIndex(index)}
            style={{
              backgroundColor:
                sidebarIndex === index ? "#F4F4F5" : "transparent",
            }}
          >
            {item.icon}
            {item.label}
          </button>
        </Link>
      ))}
    </Styles.MypageSidebar>
  );
}

type MypageLayoutProps = {
  children: React.ReactNode;
};

const MypageLayout: React.FC<MypageLayoutProps> = ({ children }) => {
  const [sidebarIndex, setSidebarIndex] = useState(0);

  return (
    <div>
      <Styles.MypageContainer>
        <Styles.MypageSidebarContainer>
          <MypageMyInfo />
          <MypageSidebar
            sidebarIndex={sidebarIndex}
            setSidebarIndex={setSidebarIndex}
          />
        </Styles.MypageSidebarContainer>
        <Styles.MypageContentContainer>
          {children}
        </Styles.MypageContentContainer>
      </Styles.MypageContainer>
    </div>
  );
};

export default MypageLayout;
