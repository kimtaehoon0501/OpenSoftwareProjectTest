// 1. 가짜 데이터 정의
export const mockRecipeData = {
  recipeName: "제육볶음",
  servings: 2,
  ingredients: [
    {
      id: 1,
      name: "돼지고기 앞다리살 600g",
      price: 8500,
      shop: "이마트몰",
    },
    { id: 2, name: "양파 1kg", price: 2000, shop: "쿠팡" },
    { id: 3, name: "대파 1단", price: 1500, shop: "마켓컬리" },
  ],
};

// 2. 가짜 API 호출 함수 (3초 딜레이)
export const fetchRecipeMock = (foodName: string) => {
  return new Promise<typeof mockRecipeData>((resolve) => {
    setTimeout(() => {
      resolve(mockRecipeData);
    }, 3000); // 3초 대기
  });
};