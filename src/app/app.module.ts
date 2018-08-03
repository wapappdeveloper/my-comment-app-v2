import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CommentComponent } from './comment/comment.component';
import { CommentRecursiveComponent } from './comment-recursive/comment-recursive.component';


@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    CommentRecursiveComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
