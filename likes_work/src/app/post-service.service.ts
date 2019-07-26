import { Injectable } from '@angular/core';

import { Post } from './post/Post';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { componentHostSyntheticProperty } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private _httpService: HttpClient) { }
  getPosts(): Observable<any>{
   return this._httpService.get("http://localhost:8080/Rev_SpringMVC_Hello/api/posts")
  }

  addPost(post: Post){
    let body = JSON.parse(JSON.stringify(post));
    
    if(post.post_id){
      console.log("Entered for updates");
      return this._httpService.post("http://localhost:8080/Rev_SpringMVC_Hello/api/posts", body);

    }else{
    return this._httpService.post("http://localhost:8080/Rev_SpringMVC_Hello/api/posts",body);
    }
  }

  deletePost(postId: number){
    return this._httpService.delete("http://localhost:8080/Rev_SpringMVC_Hello/api/posts/"+postId);
  }

  sendLike(idnumber: number){
    return this._httpService.get("http://localhost:8080/Rev_SpringMVC_Hello/api/posts/like/"+idnumber);
  }

  getPostByUserID(userId: number): Observable<any>{
    return this._httpService.get("http://localhost:8080/Rev_SpringMVC_Hello/api/posts/"+userId);
  }

  getPostsNotUserID(userId: number): Observable<any>{
    return this._httpService.get("http://localhost:8080/Rev_SpringMVC_Hello/api/posts/not/"+userId);
  }

}

