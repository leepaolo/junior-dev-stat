// Normalize.tsx

import { IData } from "../models/data";
import { keyMap } from "../models/KeyMap";

// This function takes an array of any type and returns an array of IData
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeData(originalDataArray: any[]): IData[] {
  return originalDataArray.map((originalData) => {
    const result: Partial<IData> = {};
    Object.keys(keyMap).forEach((key) => {
      const newKey = keyMap[key as keyof typeof keyMap];
      if (newKey && originalData[key] !== undefined) {
        result[newKey as keyof IData] = originalData[key];
      }
    });
    return result as IData;
  });
}
