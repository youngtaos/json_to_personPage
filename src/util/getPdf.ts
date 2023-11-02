import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const ExportPdf = async (refs: React.MutableRefObject<T>[], name: string) => {
  const scale = window.devicePixelRatio > 1 ? window.devicePixelRatio : 2;
  const pdf = new jsPDF("p", "pt", "a4");
  for (const i in refs) {
    const toPdfRef = refs[i];
    let width = toPdfRef.current.offsetWidth;
    let height = toPdfRef.current.offsetHeight;

    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const pdfCanvas = await html2canvas(toPdfRef.current, {
      useCORS: true,
      canvas,
      scale,
      width,
      height,
      x: 0,
      y: 0,
    });
    const imgDataUrl = pdfCanvas.toDataURL();

    if (height > 14400) {
      const ratio = 14400 / height;
      height = 14400;
      width = width * ratio;
    }

    height = (height * pdf.internal.pageSize.getWidth()) / width;
    width = pdf.internal.pageSize.getWidth();
    pdf.addImage(imgDataUrl, "png", 0, 0, width, height);
    if (+i >= refs.length - 1) {
      break;
    }
    pdf.addPage();
  }
  await pdf.save(`${name}`, { returnPromise: true });
};