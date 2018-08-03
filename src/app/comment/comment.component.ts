import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styles: []
})
export class CommentComponent implements OnInit {
  /**
   * access child elements
   */
  @ViewChild('commentMessage') commentMessage:ElementRef;
  @ViewChild('nameOfCommenter') nameOfCommenter:ElementRef;
  @ViewChild('allChatContainer') allChatContainer:ElementRef;


  chatArray:any = [];
  sampleChatArray:any = [
    { name:"person-1",message:"Hi!... This is Person-1",time:"" },
    { name:"person-2",message:"Hi!... This is Person-2",time:"" },
    { name:"person-3",message:"Hi!... This is Person-3",time:"" },
    { name:"person-4",message:"Hi!... This is Person-4",time:"" },
    { name:"person-5",message:"Hi!... This is Person-5",time:"" }
  ];

  chatOpen:boolean = false;
  chatClose:boolean = false;
  /*setChatWindowPosition:string = 'absolute';
  closeButtonText:string = "close comment";
  chatWindowHeight:number = 600;*/
  setChatWindowPosition:string = 'relative';
  closeButtonText:string = "open comment";
  chatWindowHeight:number = 0;

  tempCommentObj:any = null;
  commentInEditMode:boolean = false;
  commentInReplyMode:boolean = false;

  messageTitle:string = 'enter message';

  constructor() { }

  ngOnInit() {
    //this.chatArray = this.sampleChatArray;
  }

  chatOpenClose(){
    if(this.closeButtonText === 'open comment'){
      this.setChatWindowPosition = 'absolute';
      this.closeButtonText = 'close comment';
      this.chatWindowHeight = 600;
    }else{
      this.setChatWindowPosition = 'relative';
      this.closeButtonText = 'open comment';
      this.chatWindowHeight = 0;
    }
  }

  publishComment(comment?:any){
    var commenterName:string    = this.nameOfCommenter.nativeElement.value;
    var commenterMessage:string = this.commentMessage.nativeElement.value;
    var commentedTime:string = this.getTime();
    if(commenterName.trim()==="" || commenterMessage.trim()===""){
      alert("some fields still empty");
      return;
    }
    
    if(this.tempCommentObj && this.commentInEditMode){
      this.tempCommentObj.name = commenterName;
      this.tempCommentObj.message = commenterMessage;
      this.tempCommentObj.time = commentedTime;
      this.commentInEditMode = false;
    }else if(this.tempCommentObj && this.commentInReplyMode){
      let tempCommentObj:any = {
        name:commenterName,
        message:commenterMessage,
        time:commentedTime
      }
      if(this.tempCommentObj && this.tempCommentObj.reply && this.tempCommentObj.reply.length>0){
        this.tempCommentObj.reply.unshift(tempCommentObj);
      }else{
        this.tempCommentObj.reply = [];
        this.tempCommentObj.reply.unshift(tempCommentObj);
      }
      this.commentInReplyMode = false;
    }else{
      let tempCommentObj:any = {
        name:commenterName,
        message:commenterMessage,
        time:commentedTime
      }
      this.chatArray.push(tempCommentObj);
      setTimeout(() => {
        this.allChatContainer.nativeElement.scrollTop = this.allChatContainer.nativeElement.scrollHeight;
      }, 10);
    }
    this.messageTitle = 'enter message';
    
    this.nameOfCommenter.nativeElement.value = "";
    this.commentMessage.nativeElement.value = "";
  }

  removeComment(comment:any, chatArray:any){
    if(chatArray.indexOf(comment)!==-1){
      chatArray.splice(chatArray.indexOf(comment),1);
    }else{
      console.error('please check the array');
    }
  }

  replyToComment(comment:any, chatArray:any){
    this.nameOfCommenter.nativeElement.value = "";
    this.commentMessage.nativeElement.value = "";
    this.commentInReplyMode = true;
    this.messageTitle = 'enter message to replay';
    this.tempCommentObj = comment;
  }

  editComment(comment:any, chatArray:any){
    this.nameOfCommenter.nativeElement.value = "";
    this.commentMessage.nativeElement.value = "";
    this.commentInEditMode = true;
    this.nameOfCommenter.nativeElement.value = comment.name;
    this.commentMessage.nativeElement.value = comment.message;
    this.tempCommentObj = comment;
  }

  emitter(obj:any){
    if(obj && obj.methodName && obj.methodName==='removeComment'){
      this.removeComment(obj.param.comment, obj.param.chatArray);
    }else if(obj && obj.methodName && obj.methodName==='replyToComment'){
      this.replyToComment(obj.param.comment, obj.param.chatArray);
    }else if(obj && obj.methodName && obj.methodName==='editComment'){
      this.editComment(obj.param.comment, obj.param.chatArray);
    }else if(obj && obj.methodName && obj.methodName==='emitterChild'){
      this.emitter(obj.param);
    }else{
      console.error('unknown methodName');
    }
  }

  

  getTime():string{
    function checkTime(i) {
      return (i < 10) ? "0" + i : i;
    }
    var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
    var time = h + ":" + m + ":" + s;
    return time;
  }
}
