export enum ProjectCategory {
  ALL = "전체",
  WEB = "웹",
  APP = "앱",
  GAME = "게임",
  GRAPHIC = "그래픽",
  AI = "AI",
  EMBEDDED = "임베디드",
  LIBRARY = "라이브러리",
  ETC = "기타",
}

export function getCategoryKey(value: string): string | undefined {
  return Object.entries(ProjectCategory).find(
    ([, categoryValue]) => categoryValue === value,
  )?.[0];
}
