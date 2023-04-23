import {NgModule} from "@angular/core";

import {TagFeedComponent} from "./components/yourFeed/tagFeed.component";
import {CommonModule} from "@angular/common";
import {FeedTogglerModule} from "../shared/modules/feedToggler/feedToggler.module";
import {RouterModule} from "@angular/router";
import {FeedModule} from "../shared/modules/feed/feed.module";
import {BannerModule} from "../shared/modules/banner/banner.module";
import {PopularTagsModule} from "../shared/modules/popularTags/popularTags.module";

const routes = [
  {
    path: "tags/:slug",
    component: TagFeedComponent
  }
]

@NgModule({
  imports: [CommonModule, FeedTogglerModule, RouterModule.forChild(routes), FeedModule, BannerModule, PopularTagsModule],
  declarations: [TagFeedComponent]
})
export class TagFeedModule {

}
