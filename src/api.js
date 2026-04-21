const API_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPT_URL;

export const fetchQuestions = async (count) => {
  try {
    const response = await fetch(`${API_URL}?action=getQuestions&count=${count}`);
    let data = await response.json();
    
    // 如果回傳的是陣列，就直接使用；如果回傳的是物件則取 .questions
    let questionsArray = Array.isArray(data) ? data : data.questions;
    
    // 確保每題都有一個 id
    questionsArray = questionsArray.map((q, index) => ({
      ...q,
      id: q.id || `q_${index}`
    }));
    
    // 根據 count 隨機打亂並取一定數量的題目
    if (questionsArray && count) {
      questionsArray = questionsArray.sort(() => 0.5 - Math.random()).slice(0, count);
    }
    
    return questionsArray;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("無法取得題目，請稍後再試！");
  }
};

export const submitAnswers = async (userId, score, passThreshold) => {
  try {
    const passed = score >= passThreshold;
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        userId,
        score,
        passed
      }),
    });
    
    // 即使 GAS 沒有回傳分數，前端自己包裝好分數傳給 Result 頁面
    return { score, isPassed: passed };
  } catch (error) {
    console.error("Error submitting answers:", error);
    throw new Error("無法送出答案，請稍後再試！");
  }
};
