import { useState } from 'react';
import { getNutritionInfo } from './api';

function App() {
  const [query, setQuery] = useState('');
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setFood(null);
    try {
      const result = await getNutritionInfo(query);
      if (result && result.length > 0) {
        setFood(result[0]);
      } else {
        setError('검색 결과가 없습니다.');
      }
    } catch (err) {
      setError('데이터를 불러오는 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🥗 식품영양정보 조회 🥗</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="식품명을 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>

      {loading && <p>로딩중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {food && (
        <div>
          {console.log(food)}

          <h2>✅ 결과</h2>
          <p>식품명: {food.DESC_KOR || '정보 없음'}</p>
          <p>분류: {food.GROUP_NAME || '정보 없음'}</p>
          <p>제조업체: {food.MAKER_NAME || '정보 없음'}</p>
          <p>칼로리: {food.NUTR_CONT1 ? `${food.NUTR_CONT1} kcal` : '정보 없음'}</p>
          <p>탄수화물: {food.NUTR_CONT2 ? `${food.NUTR_CONT2} g` : '정보 없음'}</p>
          <p>단백질: {food.NUTR_CONT3 ? `${food.NUTR_CONT3} g` : '정보 없음'}</p>
          <p>지방: {food.NUTR_CONT4 ? `${food.NUTR_CONT4} g` : '정보 없음'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
