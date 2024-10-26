const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0JRdlZwREt0ZFUwSFBoRm5CcVhYQ25Qbi92TElBbjBCNUE2TnoxNUNXST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVGo2UFhmZytrc1dsQzUwSW53Z0l2Q2h1VTRkRkg3NHJiaElYOUZ3d2htST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2R3FmMkxiaVdtTGpqeDB3b1F4dlFXd0VmZUpSRis4SXZqWDMzWnpkd0YwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQWRDa1hjRUFIYTRyd2tUSWV1ZDRMNzh4RCtFdG5qc3UvVDc0Qm1GZVR3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFNSE1uTUN0NGFYZUMzeFRiNlAxUHZPTStmSHB4TjRtMlhTbzJseU5Ta1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhSL0p4MmRwTDhpQkVoVjMyYUZlb3VMblFYYVVoUlVlRDZwU0Q2VzN6UjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUsrbnM3RnJpaktBaDVobVhLcG9LeWNsRWRNeXNsY3d2dHRyVUQ2ZjdIUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1FoWDVnSEpjNTdDT29tQjV6REZ0eHRDcWdTR1dyYmVSeFM1RVgzQXZFQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkduZGlGUHUyaStqb1hVWWxkTkZhRHl0OGJHZU9Xamg1cDEvQjVBRWtvRW9tRVpYdVNMN2FVbU8yUkJqQk9CdnJKNHBSeXRhL0Q3WDBaQUVQclFqaEJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMwLCJhZHZTZWNyZXRLZXkiOiJuWlAyWDc0VFJ0eVdWQmlMZy9GeWZFOTJycFMzVGQ5UTVPRUh2UXgzOGdvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJOOWkxX1JHalEtVzhHTzJhRXRndzdnIiwicGhvbmVJZCI6ImM5Y2I4OWI4LTU0YTgtNGVlYy1iZjZhLWRiYmI1MGQ2OWRmMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKNk9oR3dPWGpEK1llc1JiTFVjSExEY0ZZQUU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEJrOWxZd3hEUHRtODR6TDVRcTFZVTNGMEVBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBLUkhSNkVLIiwibWUiOnsiaWQiOiIyMzQ3MDQyOTUyMzMyOjIyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOZnU3SndDRUtLZThyZ0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJNVVlVOU1wdTdheU40SUNSeFY2dVVKTktXdUVkbkVYN0MyOTdsVzR5WTJBPSIsImFjY291bnRTaWduYXR1cmUiOiJDRjhPemRaa3hMV2MraTM3Q05Ba090OFdpUWoyVzhsUDVYVU1iaUVTaDVJMlNCdHRWWGlWU1h5eXNGZGZJWjlxMzlUaGRHYzZSenBDTmd5VzVSWUxDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoicXhuSmtybHR3cWFTeHVSZXZnNisrWTVRcWQ4V0dRUkp5anNoVVFIczhvQUU1RnZtUXhmQnNQWTc4aElSR0pvSzZvMk5BTXgzUTl2QW1SQU1HVUtJQmc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDQyOTUyMzMyOjIyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRGR0ZQVEtidTJzamVDQWtjVmVybENUU2xyaEhaeEYrd3R2ZTVWdU1tTmcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjk5MjQ5MTEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ2tGIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Royalty",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2347042952332",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
