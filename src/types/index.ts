export interface BlogPost {
    slNo: number;
    title: string;
    category: string;
    description: string;
    date: string;
    imageUrl: string;
    linkedin: string;
  }
  
  export interface SheetResponse {
    range: string;
    majorDimension: string;
    values: string[][];
  }