import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export const getNutritionInfo = async (foodName) => {
  const url = `https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02?serviceKey=${API_KEY}&desc_kor=${encodeURIComponent(foodName)}&pageNo=1&numOfRows=3&type=json`;

  const response = await axios.get(url);
  return response.data.body.items;
};
