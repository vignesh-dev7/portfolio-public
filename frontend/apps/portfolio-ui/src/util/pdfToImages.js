import * as pdfjsLib from "pdfjs-dist/build/pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";

// Setup pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

/**
 * Convert a PDF into HD images (client-side)
 * @param {string} pdfUrl - AWS or external PDF URL
 * @param {number} scale - HD scale (default 2)
 * @returns {Promise<string[]>} - Array of base64 image URLs
 */
export async function pdfToImages(pdfUrl, scale = 2) {
    try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const pages = [];

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale });

            // Create a canvas to render each page
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: ctx, viewport }).promise;
            pages.push(canvas.toDataURL("image/png"));
        }

        return pages;
    } catch (err) {
        console.error("PDF Conversion Error:", err);
        return [];
    }
}
