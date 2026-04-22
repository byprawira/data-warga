const CONFIG = {
  APP_TITLE: 'Data Warga',
  SPREADSHEET_ID: '16hOtp5Y8hD4Ew7B9XRJzpYnRdCjVCzJpdfwm_Mshx5Q',
  SHEET_NAME: 'Master' // kosongkan jika mau pakai sheet pertama
};

function doGet() {
  const tpl = HtmlService.createTemplateFromFile('Index');
  tpl.appTitle = CONFIG.APP_TITLE;

  return tpl.evaluate()
    .setTitle(CONFIG.APP_TITLE)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getResidents() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sh = getSheet_(ss);
  const values = sh.getDataRange().getValues();

  if (values.length < 2) return [];

  const result = [];
  let currentBlock = '';

  for (let i = 1; i < values.length; i++) {
    const row = values[i].map(v => String(v ?? '').trim());
    const [blok, pemilik, hpPemilik, kontrak, hpKontrak, kosong] = row;

    if (blok) currentBlock = blok;
    if (!row.some(Boolean)) continue;

    result.push({
      row: i + 1,
      blok: currentBlock,
      pemilik: pemilik || '',
      hpPemilik: hpPemilik || '',
      kontrak: kontrak || '',
      hpKontrak: hpKontrak || '',
      kosong: kosong || ''
    });
  }

  return result;
}

function getSheet_(ss) {
  if (CONFIG.SHEET_NAME) {
    const byName = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (byName) return byName;
  }

  const sheets = ss.getSheets();
  if (!sheets.length) {
    throw new Error('Spreadsheet tidak memiliki sheet.');
  }

  return sheets[0];
}
