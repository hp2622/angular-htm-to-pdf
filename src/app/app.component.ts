import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';

declare var require: any;
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-htm-to-pdf';

  @ViewChild('pdfPart') pdfPart!: ElementRef;

  download() {
    const element = document.getElementById('table') as HTMLElement;
    const pdf = new jsPDF('l', 'pt', 'a2', true);
    const anchors = element.getElementsByTagName('a');
    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      const link = anchor.getAttribute('href');
      if (link) {
        const x = anchor.offsetLeft;
        const y = anchor.offsetTop;
        const width = anchor.offsetWidth;
        const height = anchor.offsetHeight;
        pdf.link(x, y, width, height, { url: link });
        // pdf.link(5, 55, 10, 3, { url: 'https://www.example.com' });
      }
    }
    //pdf.link(5, 55, 10, 3, { url: 'https://www.example.com' });
    pdf.html(this.pdfPart.nativeElement, {
      callback: (pdf) => {
        pdf.save('sample.pdf');
      },
    });
  }

  download1() {
    const element = document.getElementById('table') as HTMLElement;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('your_pdf_filename.pdf');
    });
  }

  async downloadAsPDF() {
    const element = document.getElementById('table') as HTMLElement;

    const canvas = await html2canvas(element);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Add clickable link to the PDF
    pdf.link(5, 55, 10, 3, { url: 'https://www.example.com' });
    //pdf.link(30, 353, 75, 17, { url: 'https://www.example.com' });
    pdf.save('invoice.pdf');
  }
}
