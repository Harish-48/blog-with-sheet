import { BlogPost, SheetResponse } from '../types';

const API_KEY = 'Your API_Key';//Enter your api inside the -> ''
const SHEET_ID = 'Your Sheet_ID'; //Enter your sheet id inside the -> ''
const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data: SheetResponse = await response.json();
    
    // The first row contains headers, so we start from index 1
    return data.values.slice(1).map((row) => {
      return {
        slNo: parseInt(row[0] || '0'),
        title: row[1] || '',
        category: row[2] || '',
        description: row[3] || '',
        date: row[4] || '',
        imageUrl: row[5] || '',
        linkedin: row[6] || ''
      };
    });
  } catch (error) {
    console.error('Error fetching data from Google Sheet:', error);
    return [];
  }
}