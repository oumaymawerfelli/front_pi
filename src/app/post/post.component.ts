import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Commentaire } from "src/model/commentaire";
import { Post } from "src/model/post";
import { CommentService } from "src/services/comment.service";
import { PostService } from "src/services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})


export class PostComponent implements OnInit {
  posts: Post[] = [];
  postForm: FormGroup;
  isEditing = false;
  editingPostId: number | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  commentTexts: { [postId: number]: string } = {};
  selectedFile: File | null = null;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      content: [''],
      img: [null]
    });
  }
  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
      this.posts.forEach(post => this.loadComments(post));
    });
  }

  

  submitPost(): void {
    if (this.postForm.invalid) return;

    const formData = new FormData();
    formData.append('content', this.postForm.get('content')?.value);

    // Handle image for both new and updated posts
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditing && this.editingPostId) {
      // Update existing post
      this.postService.updatePost(this.editingPostId, formData).subscribe({
        next: (updatedPost) => {
          const index = this.posts.findIndex(p => p.id === updatedPost.id);
          if (index !== -1) {
            this.posts[index] = updatedPost;
          }
          this.resetForm();
        },
        error: (err) => console.error('Update error:', err)
      });
    } else {
      // Create new post
      this.postService.addPost(formData).subscribe({
        next: (newPost) => {
          this.posts.unshift(newPost);
          this.resetForm();
        },
        error: (err) => console.error('Create error:', err)
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.postForm.patchValue({ img: file });
      
      // Show preview for BOTH new posts AND when editing
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  resetForm(): void {
    this.postForm.reset();
    this.isEditing = false;
    this.editingPostId = null;
    this.previewUrl = null;
    this.selectedFile = null;
    // Reset file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
 

  editPost(post: Post): void {
    this.isEditing = true;
    this.editingPostId = post.id ?? null;
    
    this.postForm.patchValue({
      content: post.content,
      img: post.img || null
    });


    // Show existing image as preview when editing
    if (post.img) {
      this.previewUrl = `assets/img/posts${post.img}`;
    } else {
      this.previewUrl = null;
    }
  }
  removeImagePreview(): void {
    this.previewUrl = null;
    this.selectedFile = null;
    this.postForm.patchValue({ img: null });
    // Clear file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  
existingImage: string | null = null;


  cancelEdit(): void {
    this.postForm.reset();
    this.isEditing = false;
    this.editingPostId = null;
    this.previewUrl = null;
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => this.getAllPosts());
  }

  loadComments(post: Post): void {
    this.commentService.getCommentsByPost(post.id!).subscribe((comments: Commentaire[]) => {
      post.comments = comments;
    });
  }

  submitComment(postId: number): void {
    const text = this.commentTexts[postId];
    if (!text || text.trim() === '') return;

    const comment: Commentaire = { text };
    this.commentService.addComment(postId, comment).subscribe(() => {
      this.commentTexts[postId] = '';
      const post = this.posts.find(p => p.id === postId);
      if (post) this.loadComments(post);
    });
  }

  likeComment(commentId: number, post: Post): void {
    this.commentService.likeComment(commentId).subscribe(() => this.loadComments(post));
  }

  dislikeComment(commentId: number, post: Post): void {
    this.commentService.dislikeComment(commentId).subscribe(() => this.loadComments(post));
  }

  deleteComment(commentId: number, post: Post): void {
    this.commentService.deleteComment(commentId).subscribe(() => this.loadComments(post));
  }
}