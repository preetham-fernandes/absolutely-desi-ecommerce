// src/lib/services/fileUpload/parsers/index.ts
import * as XLSX from 'xlsx';

export type ParsedRow = Record<string, any>;

/**
 * Parse a file buffer into rows based on file type
 */
export async function parseFile(
  filename: string,
  buffer: ArrayBuffer
): Promise<{ success: boolean; data?: ParsedRow[]; error?: string }> {
  try {
    // Get file extension
    const extension = filename.split('.').pop()?.toLowerCase();
    
    if (!extension) {
      return { success: false, error: 'Invalid file format: missing extension' };
    }
    
    // Check if it's a CSV or Excel file
    if (extension === 'csv') {
      return parseCSV(buffer);
    } else if (['xlsx', 'xls'].includes(extension)) {
      return parseExcel(buffer);
    } else {
      return { success: false, error: 'Unsupported file format. Please upload a CSV or Excel file.' };
    }
  } catch (error) {
    console.error('Error parsing file:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to parse file'
    };
  }
}

/**
 * Parse a CSV file buffer
 */
function parseCSV(buffer: ArrayBuffer): { success: boolean; data?: ParsedRow[]; error?: string } {
  try {
    // Convert buffer to Uint8Array
    const data = new Uint8Array(buffer);
    
    // Parse CSV using XLSX.js
    const workbook = XLSX.read(data, { type: 'array' });
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json<ParsedRow>(sheet, { 
      header: 'A',
      defval: '', // Default empty cells to empty string
      blankrows: false,
    });
    
    // Get headers from the first row
    const headers = Object.values(jsonData[0] || {});
    
    // Parse headers and create a normalized dataset
    const normalizedData: ParsedRow[] = [];
    
    for (let i = 1; i < jsonData.length; i++) {
      const row = jsonData[i];
      const normalizedRow: ParsedRow = {};
      
      // Assign values based on headers
      headers.forEach((header, index) => {
        const colKey = String.fromCharCode(65 + index); // Convert to A, B, C, etc.
        normalizedRow[header.toString().trim()] = row[colKey] || '';
      });
      
      normalizedData.push(normalizedRow);
    }
    
    return { success: true, data: normalizedData };
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to parse CSV file'
    };
  }
}

/**
 * Parse an Excel file buffer
 */
function parseExcel(buffer: ArrayBuffer): { success: boolean; data?: ParsedRow[]; error?: string } {
  try {
    // Parse Excel using XLSX.js
    const workbook = XLSX.read(buffer, { type: 'array' });
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Convert to JSON with headers
    const jsonData = XLSX.utils.sheet_to_json<ParsedRow>(sheet, { 
      defval: '', // Default empty cells to empty string
      blankrows: false,
    });
    
    return { success: true, data: jsonData };
  } catch (error) {
    console.error('Error parsing Excel:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to parse Excel file'
    };
  }
}