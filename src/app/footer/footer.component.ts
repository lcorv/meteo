import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NoteService } from '../services/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  dark: boolean;
  subscription: Subscription;
  faFacebook = faFacebook;
  faTwitter= faTwitter;
  constructor(private noteService: NoteService) {}

  ngOnInit() {
    setTimeout(() => {
      this.getDark();
    }, 500);
  }
  getDark() {
    this.noteService.data.subscribe((response) => {
      this.dark = response;
    });
  }
  
}
