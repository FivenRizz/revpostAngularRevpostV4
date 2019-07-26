import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../post-service.service';
import { Post } from './Post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts:Post[];
  statusMessage: string
  post = new Post();

  
  id:number;


  constructor(private router: Router, private _postService:PostServiceService) { }
  ngOnInit() {
    this.id = +localStorage.getItem('user_id');
    this.getPosts();
  }
  
  getPosts():void
  {
    console.log("Got a post");
    this._postService.getPostByUserID(this.id)
    .subscribe((postData) => this.posts = postData,
                                (error) => {console.log(error);
                                this.statusMessage = "Problem with service"
                                }
    );
  }

  addPost():void{
    if(this.id != null && this.id != 0){
    this.post.user_id = this.id;
    this._postService.addPost(this.post)
    .subscribe((response)=>{console.log(response);
    },
    (error)=>{
      console.log(error);
      this.statusMessage = "Problem with service. Please try again later!";
    });
  }
  else{
    this.post = null;
  }

  }
  deletePost(id:number)
  {
    this._postService.deletePost(id)
    .subscribe(
      (response) => {console.log(response);
                    this.getPosts();},
                    (error) =>{
                      console.log(error); 
                      this.statusMessage = "Problem with service"
                    }
    )
  }

  goHome():void{
    this.router.navigate(['/Home']);
}

}
