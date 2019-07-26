import { Component, OnInit } from '@angular/core';
// import
import { Post } from '../post/Post';
import { PostServiceService } from '../post-service.service';
import {} from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {
  posts:Post[];
  statusMessage: string
  post = new Post();

id:number;

  constructor(private router: Router, private _postService:PostServiceService) { }
  ngOnInit() {
    this.id = +localStorage.getItem('user_id');
    //this.id = 1;
    this.getPosts();
  }

  getPosts():void
  {
    if(this.id != null && this.id != 0){

    this._postService.getPostsNotUserID(this.id)
    .subscribe((postData) =>
                                {this.posts = postData;
                                console.log(this.id);},
                                (error) => {console.log(error);
                                this.statusMessage = "Problem with service"
                                }
    );
                              }
                              else{
                                this.posts = null;
                              }
  }

  likePost(id: number):void
  {
    this._postService.sendLike(id)   
    .subscribe(
      (response) => {console.log(response);
                    this.getPosts();},
                    (error) =>{
                      console.log(error); 
                      this.statusMessage = "Problem with service"
                    }
    );
  }

  goHome():void{
    this.router.navigate(['/Home']);
}

}
