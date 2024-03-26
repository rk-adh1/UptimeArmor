import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { PaginationService } from 'src/app/pagination/pagination.service';
import { Report } from '../model/report.model';
import { ReportService } from '../service/report.service';
import { Record } from '../model/record.model';
import pptxgen from "pptxgenjs";
// import html2canvas from 'html2canvas';



import domtoimage from 'dom-to-image';
import { AuthService } from 'src/app/auth/auth.service';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent  implements AfterViewInit {

  @ViewChild('chartContainer1') chartContainer1!: ElementRef;
  @ViewChild('chartContainer2') chartContainer2!: ElementRef;
  @ViewChild('chartContainer3') chartContainer3!: ElementRef;
  @ViewChild('chartContainer4') chartContainer4!: ElementRef;
  chartsRendered: number = 0;
  chartContainers: ElementRef[] = [];
  

  reports : Report [] = [];
 
  openReport : Record [] = [];
  inProgressReport : Record [] = [];
  readyToCloseReport: Record [] = [];
  closedReport: Record [] = [];
  selectedType: string = "Outage";
  generatedImageUrls: string[] = [];
  legendTitles: string[] = ['Open', 'InProgress', 'ReadyToClose', 'Closed'];



  constructor( 
    public ps: PaginationService, 
    private reportService: ReportService,
    public authService: AuthService){
  }
 
 
  // async ngOnInit() {
  //   await this.getSelectedReports();
  //   console.log("reports", this.reports); 
  //   console.log("chartContainer1", this.chartContainer1);
    
  // }

 
  
  async ngAfterViewInit() {
    await this.getSelectedReports();
    console.log("reports", this.reports);
    this.chartContainers = [
      this.chartContainer1,
      this.chartContainer2,
      this.chartContainer3,
      this.chartContainer4
    ];
    // console.log("chartContainer1", this.chartContainer1);
  }

fillReports()
{
    this.openReport = this.getReports("Open");
    this.inProgressReport = this.getReports("InProgress");
    this.readyToCloseReport = this.getReports("ReadyToClose");
    this.closedReport = this.getReports("Closed");
}

async fetchIncidentReports() {
 
  const data = await this.reportService.getincidentReports().toPromise();
  this.reports = data!;
  this.fillReports();
  

}

async fetchOutageReports() { 
  const data = await this.reportService.getoutageReports().toPromise();
  this.reports = data!;
  this.fillReports();
}

  
getReports(status: string): Record[] {
  let records: Record[] = [];

  switch (status) {
    case "Open":
      records = this.reports.map(report => ({
        name: report.businessUnitName,
        value: report.openCount
      }));
      break;
    case "InProgress":
      records = this.reports.map(report => ({
        name: report.businessUnitName,
        value: report.inProgressCount
      }));
      break;
    case "ReadyToClose":
      records = this.reports.map(report => ({
        name: report.businessUnitName,
        value: report.readyToCloseCount
      }));
      break;
    case "Closed":
      records = this.reports.map(report => ({
        name: report.businessUnitName,
        value: report.closedCount
      }));
      break;
  }

  return records;
}


  view: [number, number] = [700, 400];

  colorScheme: string | Color = {
    domain: ['#FF4500', '#FFD801', '#4B0082', '#008080', '#AAAAAA'],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal
  };

  labelFormat(value: any) {
    return `${value.toLocaleString()}`;
  }

  onSelect(event: any) {
    console.log(event);
  }

async getSelectedReports(){
  switch(this.selectedType){
    case "Outage":
      await this.fetchOutageReports();
      this.fillReports();
      break;
    case "Incident":
     await this.fetchIncidentReports();
     this.fillReports();
      break;
    default:
    await  this.fetchOutageReports();
    this.fillReports();
  }
}


async generatePowerPoint() {
  const pptx = new pptxgen();
  const reportsArray = [this.openReport, this.inProgressReport, this.readyToCloseReport, this.closedReport];

  
  const firstSlide = pptx.addSlide();
  firstSlide.addText(`${this.selectedType} Reports`, {x:2.5, y:3, fontSize:50, color: '363636'});
  
  for (let index = 0; index < this.chartContainers.length; index++) {
    const chartContainer = this.chartContainers[index];
    
    const legendTitle = this.legendTitles[index];
    const chartDiv = chartContainer.nativeElement;
    try {      
      const chartImage = await domtoimage.toPng(chartDiv);
      const slide = pptx.addSlide();
      slide.addImage({ data: chartImage, x: 0.5, y: 1.5, w: 6, h: 4.7 });
      const reportArray = reportsArray[index];
      slide.addText(legendTitle, { x: 1, y: 1, fontSize: 20, color: '363636' });
      const tableHeaderRow = ['BU Name', 'Count'];
      const tableRows = [
        tableHeaderRow, 
        ...reportArray.map(record => [record.name, record.value.toString()])
      ];
      
      const tableOpts = {
        x: 7, // Adjust the x-coordinate as needed
        y: 1.5, // Adjust the y-coordinate as needed
        w: 3, // Adjust the width of the table as needed
        h: 4, // Adjust the height of the table as needed
        autoPage: true, // Enable auto pagination if the table height exceeds the slide height
        fontSize: 14, // Adjust the font size as needed
        color: '363636', // Adjust the font color as needed
        rowH:0.5
      };

      const formattedTableRows: pptxgen.TableRow[] = tableRows.map(rowData => {
        return rowData.map(cellData => {
          return { text: cellData.toString() }; // Ensure each cell is of type string
        });
      });

      slide.addTable(formattedTableRows, tableOpts);
    } catch (error) {
      console.error(`Error capturing chart ${index + 1}:`, error);
    }
  }

  pptx.writeFile({ fileName: 'presentation.pptx' });
}



}
