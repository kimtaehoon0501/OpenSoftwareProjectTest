import React, { useState } from 'react';
import { fetchRecipeMock } from '../api';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // TypeScript를 위해 any 타입 임시 지정
  const [resultData, setResultData] = useState<any>(null); 

  const handleSearch = async () => {
    if (!keyword) return alert("음식 이름을 입력해주세요!");

    setIsLoading(true);
    setResultData(null);

    try {
      const data = await fetchRecipeMock(keyword);
      setResultData(data);
    } catch (error) {
      console.error("데이터를 불러오는 중 에러 발생", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>🍳 최저가 레시피 검색기</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)} 
          placeholder="예: 제육볶음"
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button 
          onClick={handleSearch} 
          disabled={isLoading}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          검색
        </button>
      </div>

      <hr style={{ marginBottom: '20px' }} />

      {/* 로딩 중 화면 */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <p>⏳ DB에서 최저가 식재료를 찾는 중입니다... (약 3초 소요)</p>
        </div>
      )}

      {/* 결과 출력 화면 */}
      {!isLoading && resultData && (
        <div>
          <h3>{resultData.recipeName} ({resultData.servings}인분) 식재료 최저가</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {resultData.ingredients.map((item: any) => (
              <li 
                key={item.id} 
                style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}
              >
                <strong style={{ fontSize: '18px' }}>{item.name}</strong> <br/>
                <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>💰 가격: {item.price.toLocaleString()}원</span> <br/>
                <span style={{ color: '#2980b9' }}>🛒 쇼핑몰: {item.shop}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}