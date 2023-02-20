import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss']
})
export class CommentInputComponent implements OnInit {

  constructor() {
  }

  @Output() public addComment: EventEmitter<string> = new EventEmitter<string>();
  public comment = '';

  onAddComment(): void {
    if (this.comment) {
      const id = localStorage.getItem('filmId');
      this.addComment.emit(this.comment);
      this.comment = '';
      localStorage.removeItem('unsavedCommentFor' + id);
    }
  }

  onEditComment(ev): void {
    const id = localStorage.getItem('filmId');
    localStorage.setItem('unsavedCommentFor' + id, ev.target.value);
  }

  ngOnInit(): void {
    const id = localStorage.getItem('filmId');
    const unsavedComment = localStorage.getItem('unsavedCommentFor' + id);
    if (unsavedComment) {
      this.comment = unsavedComment;
    }
  }

}
