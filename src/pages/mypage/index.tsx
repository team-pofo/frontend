import { useRouter } from "next/router";

export default function Mypage() {
  const router = useRouter();
  router.replace("/mypage/myprojects");
  return null;
}
