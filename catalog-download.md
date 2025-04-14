# PDF Generation Dependencies

Run the following command to install the required dependencies:

```bash
npm install pdfkit axios file-saver
npm install @types/pdfkit @types/file-saver --save-dev
```

These packages will help with:

- `pdfkit`: PDF generation library (more compatible with Next.js server environment)
- `axios`: For fetching images
- `file-saver`: For client-side downloading of PDFs

After installing, proceed with implementing the PDF generation API route.