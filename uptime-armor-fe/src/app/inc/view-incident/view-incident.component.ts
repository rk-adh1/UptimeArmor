import { Component } from '@angular/core';
import { IncidentEntity } from '../models/incident';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../service/incident.service';
import { Comment, CommentModel } from '../models/comment';
import { AuthService } from 'src/app/auth/auth.service';
import * as moment from 'moment';
import { data } from 'jquery';

@Component({
  selector: 'app-view-incident',
  templateUrl: './view-incident.component.html',
  styleUrls: ['./view-incident.component.css']
})
export class ViewIncidentComponent {
  incident:IncidentEntity = new IncidentEntity();
  incidentId: string = "";
  showComments=false;
  comments:Comment[];
  commentM:CommentModel = new CommentModel();
  currentUser:string = "";

  constructor(private router: Router, private route: ActivatedRoute, private incidentService: IncidentService, private authService: AuthService)
  {}

  ngOnInit(){
    this.route.params.subscribe(params => {
      if (params['incidentId']) {
           this.incidentId = params['incidentId'];
          this.loadIncident(this.incidentId);
      }
    });
  }

  loadIncident(incidentId: string): void {
    this.incidentService.getIncidentById(incidentId).subscribe(
      (data: any) => {
        this.incident = data;
      }
    );
  }

  showCommentDetails(){
    this.showComments = !this.showComments;
    this.currentUser = this.authService.currentUserId!;
    this.incidentService.getCommentsByIncidentId(this.incidentId).subscribe(
      (data:any) => {
        this.comments = data;
      }
    )
  }

  addComment(){
    if(this.authService.currentUserId != null)
    {this.commentM.employee.employeeId = this.authService.currentUserId;}
    this.commentM.incident.incidentId = this.incident.incidentId;
    this.commentM.creationDate = moment().toDate();
    this.incidentService.addComment(this.commentM).subscribe(
      data => console.log(data)
    );
    this.commentM.note = '';
    this.showCommentDetails();
  }

  deleteComment(commentId:string){
    this.incidentService.deleteComment(commentId).subscribe(data => 
      console.log(data));
  }

  cancel(){
    this.router.navigateByUrl('incident');
  }

}
