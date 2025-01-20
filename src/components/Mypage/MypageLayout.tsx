import * as Styles from "./styles";
import Image from "next/image";
import Link from "next/link";
import { useSidebarStore } from "@/stores/mypageSidebarStore";
import { LuFileText, LuHeart, LuSettings } from "react-icons/lu";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/router";

function MypageMyInfo() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { username } = router.query;

  return (
    <Styles.MypageMyinfo>
      <Image
        src="https://avatars.githubusercontent.com/u/55120784?v=4"
        alt=""
        width={200}
        height={200}
        style={{ borderRadius: "50%" }}
      />
      <Styles.MypageNickname>{username}</Styles.MypageNickname>
      <Styles.MypageEmail>{user?.email}</Styles.MypageEmail>
    </Styles.MypageMyinfo>
  );
}

function MypageSidebar() {
  const items = [
    {
      icon: <LuFileText />,
      label: "나의 프로젝트",
      link: "myprojects",
    },
    {
      icon: <LuHeart />,
      label: "좋아요한 프로젝트",
      link: "likeprojects",
    },
    {
      icon: <LuSettings />,
      label: "개인정보 변경",
      link: "editprofile",
    },
  ];

  const { sidebarIndex, setSidebarIndex } = useSidebarStore();

  return (
    <Styles.MypageSidebar>
      {items.map((item, index) => (
        <Link
          key={index}
          href={`/mypage/${item.link}`}
          passHref
          style={{ width: "100%" }}
        >
          <button
            onClick={() => {
              setSidebarIndex(index);
            }}
            className={sidebarIndex === index ? "active" : ""}
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

export default function MypageLayout({ children }: MypageLayoutProps) {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Styles.MypageContainer>
      <Styles.MypageSidebarContainer>
        <MypageMyInfo />
        <MypageSidebar />
      </Styles.MypageSidebarContainer>
      <Styles.MypageContentContainer>{children}</Styles.MypageContentContainer>
    </Styles.MypageContainer>
  );
}
