const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

require('dotenv').config({ path: path.join(__dirname, '../.env.development') });


const SHEET_ID = process.env.GOOGLE_SHEET_ID;
if (!SHEET_ID) {
  console.error('❌ Error: GOOGLE_SHEET_ID is not defined in .env.development');
  process.exit(1);
}
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

const COLUMN_MAP = {
  key: 'Key',
  vi: '[vi] Vietnamese',
  en: '[en] English',
};

async function syncTranslations() {
  try {
    console.log('🚀 Fetching translations from Google Sheet...');
    const response = await axios.get(CSV_URL);

    const records = parse(response.data, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const translations = {
      vi: {},
      en: {},
    };

    const errors = [];

    records.forEach((row, index) => {
      const key = row[COLUMN_MAP.key];
      const rowNum = index + 2;

      if (!key) {
        return;
      }

      const viVal = row[COLUMN_MAP.vi];
      const enVal = row[COLUMN_MAP.en];

      if (!viVal) errors.push(`Row ${rowNum} [${key}]: Missing Vietnamese translation`);
      if (!enVal) errors.push(`Row ${rowNum} [${key}]: Missing English translation`);

      if (errors.length > 0) return;

      const setNestedValue = (obj, pathKey, value) => {
        const pathKeys = pathKey.split('.');
        let current = obj;
        for (let i = 0; i < pathKeys.length - 1; i++) {
          const k = pathKeys[i];
          if (!current[k]) current[k] = {};
          current = current[k];
        }
        current[pathKeys[pathKeys.length - 1]] = value;
      };

      setNestedValue(translations.vi, key, viVal);
      setNestedValue(translations.en, key, enVal);
    });

    if (errors.length > 0) {
      console.error('\n❌ Validation failed:');
      errors.forEach(err => console.error(`  - ${err}`));
      process.exit(1);
    }

    const messagesDir = path.join(__dirname, '../packages/resource/locales');
    if (!fs.existsSync(messagesDir)) fs.mkdirSync(messagesDir, { recursive: true });

    fs.writeFileSync(
      path.join(messagesDir, 'vi.json'),
      JSON.stringify(translations.vi, null, 2)
    );
    fs.writeFileSync(
      path.join(messagesDir, 'en.json'),
      JSON.stringify(translations.en, null, 2)
    );

    console.log('✅ Translations synced successfully!');
  } catch (error) {
    console.error('❌ Error syncing translations:', error.message);
  }
}

syncTranslations();
