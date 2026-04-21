function doGet(e) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName("Questions");
    const data = sheet.getDataRange().getValues();
    
    // 第一列是標題列，從第二列開始讀取
    const questions = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0]) continue; // 跳過空行
      
      questions.push({
        question: row[0],
        options: {
          A: row[1],
          B: row[2],
          C: row[3],
          D: row[4]
        },
        answer: row[5]
      });
    }
    
    // 回傳 JSON 格式的題目
    return ContentService.createTextOutput(JSON.stringify(questions))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName("Scores");
    
    // 解析前端傳來的 JSON 資料
    const body = JSON.parse(e.postData.contents);
    const userId = body.userId;
    const score = body.score;
    const passed = body.passed;
    const timestamp = new Date();
    
    // 寫入一行新資料到 Scores 工作表
    sheet.appendRow([timestamp, userId, score, passed]);
    
    // 回傳成功訊息
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
