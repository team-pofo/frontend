const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// 사용 예시
const runWithDelay = async () => {
  console.log("대기 시작");
  await delay(2000); // 2초 대기
  console.log("2초 후 실행");
};

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // 예: 서버로 업로드 요청
    // const response = await fetch("https://your-server.com/upload", {
    //   method: "POST",
    //   body: formData,
    // });

    // if (response.ok) {
    //   const result = await response.json();
    //   return result.url; // 업로드된 이미지 URL 반환
    // } else {
    //   console.error("Image upload failed");
    //   return null;
    // }

    await runWithDelay();

    return "https://www.kookmin.ac.kr/content/05sub/style0005/images/sub/ui_5_col_image_2.jpg";
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
