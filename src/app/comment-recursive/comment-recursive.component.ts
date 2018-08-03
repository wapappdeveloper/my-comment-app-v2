import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-recursive',
  templateUrl: './comment-recursive.component.html',
  styles: []
})
export class CommentRecursiveComponent implements OnInit {
  @Input('chat') chatArray:any;
  @Output('emitter') private emitter:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  removeComment(comment:any, chatArray:any){
    this.emitter.emit({methodName:'removeComment', param:{comment, chatArray}});
  }

  replyToComment(comment:any, chatArray:any){
    this.emitter.emit({methodName:'replyToComment', param:{comment, chatArray}});
  }

  editComment(comment:any, chatArray:any){
    this.emitter.emit({methodName:'editComment', param:{comment, chatArray}});
  }

  emitterChild(obj:any){
    this.emitter.emit({methodName:'emitterChild', param:obj});
  }
}
