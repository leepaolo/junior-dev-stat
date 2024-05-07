// ApiService.tsx

import { IData } from "../models/data";

export async function fetchUserData(): Promise<IData[]> {
  const apiUrl =
    "https://script.googleusercontent.com/macros/echo?user_content_key=mlPoA54TWr6gO7-2W6QPF2HYWR9ZTpNOrqaFnL9RKse9EcRLSMLnUaCTKwka9kE2fYCp68DwhRAeYLwj0hxUf_q4E21j5_L9m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnH0OeD4X8d22QejNQiFKZSjS4qN13ofUJ-XzRNLocrAZtPoYXcf8rMUHzA16cle0JVuv27DCw97l2NqdDsTz-KG8mzDTCqnGIg&lib=M18bObiq9KnLXlDngnknKagBx2wiTu6LV";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}
