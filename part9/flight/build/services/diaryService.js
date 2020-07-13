"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diaries_1 = __importDefault(require("../data/diaries"));
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;
const getEntries = () => {
    return diaries_1.default;
};
const getNonSensitiveEntries = () => {
    return diaries_1.default.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
const addEntry = () => {
    return null;
};
exports.default = {
    getEntries,
    addEntry,
    getNonSensitiveEntries
};
