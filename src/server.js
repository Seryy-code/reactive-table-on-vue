const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "src", "credentials.json");

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function listCars(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "159BewtqQtENsCT68y3yFnXcWyEsYWBDB-Wlds76icOA",
    range: "Page1!A2:H",
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }
  console.log("Что приходит:");
  rows.forEach((row) => {
    console.log(
      `${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}, ${row[5]}, ${row[6]}, ${row[7]}`
    );
  });
}
authorize().then(listCars).catch(console.error);

// require("core-js/features/array");
// const path = require("path");

// const { google } = require("googleapis");

// function NodeGoogleSheets(file, sheetId, keyMass, fun) {
//   const filePath = path.join(__dirname, file);

//   const auth = new google.auth.GoogleAuth({
//     keyFile: filePath,
//     scopes: "https://www.googleapis.com/auth/spreadsheets",
//   });

//   (async () => {
//     const client = await auth.getClient();
//     const googleSheets = google.sheets({ version: "v4", auth: client });
//     const spreadsheetId = sheetId;

//     try {
//       // Получение метаданных таблицы
//       const metaData = await googleSheets.spreadsheets.get({
//         auth,
//         spreadsheetId,
//       });

//       // Подготовка данных для операции в таблице
//       const data = {
//         auth,
//         spreadsheetId,
//         valueInputOption: "USER_ENTERED",
//         resource: {
//           values: keyMass.change,
//         },
//       };

//       if (keyMass.append) {
//         // Добавление данных в таблицу
//         data.range = keyMass.append;
//         const append = await googleSheets.spreadsheets.values.append(data);
//         fun(append.data);
//       } else if (keyMass.values) {
//         // Получение данных из таблицы
//         data.range = keyMass.values;
//         delete data.valueInputOption;
//         delete data.resource;
//         const values = await googleSheets.spreadsheets.values.get(data);
//         fun(values.data);
//       } else if (keyMass.update) {
//         // Обновление данных в таблице
//         data.range = keyMass.update;
//         const update = await googleSheets.spreadsheets.values.update(data);
//         fun(update.data);
//       } else {
//         // Если keyMass не содержит нужного свойства
//         throw new Error("Invalid keyMass operation");
//       }
//     } catch (err) {
//       console.error("Error executing NodeGoogleSheets:", err);
//     }
//   })();
// }

// // Пример вызова функции NodeGoogleSheets
// NodeGoogleSheets(
//   "google_file.json", // замените на ваш ключевой файл Google
//   "159BewtqQtENsCT68y3yFnXcWyEsYWBDB-Wlds76icOA", // замените на ID вашей таблицы
//   // { append: 'list', change: [['Привет', 'Как дела?']] }, // пример данных для добавления
//   { values: "Page1" }, // пример операции на получение данных
//   (data) => {
//     console.log(data.values);
//   }
// );
