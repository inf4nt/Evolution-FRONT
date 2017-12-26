import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedTagElementComponent} from "./component/feed-tag-element/feed-tag-element.component";
import {FeedPostComponent} from "./component/feed-post/feed-post.component";
import {FeedListComponent} from "./component/feed-list/feed-list.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    FeedPostComponent,
    FeedListComponent,
    FeedTagElementComponent,
  ],
  declarations: [
    FeedPostComponent,
    FeedListComponent,
    FeedTagElementComponent
  ]
})
export class FeedModule { }
