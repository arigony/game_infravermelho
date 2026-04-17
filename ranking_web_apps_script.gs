const SHEET_NAME = 'ranking_ir';

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = (params.action || 'list').toLowerCase();
  const callback = params.callback;

  try {
    const sheet = getSheet_();
    let payload;

    if (action === 'submit') {
      const name = normalizeName_(params.name || 'Visitante');
      const score = Math.max(0, Number(params.score || 0));
      submitScore_(sheet, name, score);
      payload = { ok: true, mode: 'submit', ranking: getRanking_(sheet) };
    } else {
      payload = { ok: true, mode: 'list', ranking: getRanking_(sheet) };
    }

    return output_(payload, callback);
  } catch (err) {
    return output_({ ok: false, error: String(err) }, callback);
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['name', 'score', 'updated_at']);
  }
  return sheet;
}

function normalizeName_(name) {
  return String(name || 'Visitante').trim().replace(/\s+/g, ' ').slice(0, 22) || 'Visitante';
}

function getRanking_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  const values = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  return values
    .filter(row => row[0] !== '')
    .map(row => ({ name: row[0], score: Number(row[1] || 0), updated_at: row[2] || '' }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

function submitScore_(sheet, name, score) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    sheet.appendRow([name, score, new Date()]);
    return;
  }

  const range = sheet.getRange(2, 1, lastRow - 1, 3);
  const values = range.getValues();
  let foundRowIndex = -1;

  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0]).toLowerCase() === name.toLowerCase()) {
      foundRowIndex = i + 2;
      break;
    }
  }

  if (foundRowIndex === -1) {
    sheet.appendRow([name, score, new Date()]);
    return;
  }

  const currentScore = Number(sheet.getRange(foundRowIndex, 2).getValue() || 0);
  if (score > currentScore) {
    sheet.getRange(foundRowIndex, 2, 1, 2).setValues([[score, new Date()]]);
  }
}

function output_(payload, callback) {
  const json = JSON.stringify(payload);
  const text = callback ? `${callback}(${json})` : json;
  return ContentService
    .createTextOutput(text)
    .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}
