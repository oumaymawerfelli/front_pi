import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Commentaire } from 'src/model/commentaire';
import { Post } from 'src/model/post';
import { CommentService } from 'src/services/comment.service';
import { PostService } from 'src/services/post.service';

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
  commentTexts: { [postId: number]: string } = {};
  
  // Image upload properties
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isUploading = false;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      content: ['']
    });
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  // 🔁 Posts
  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
      this.posts.forEach(post => this.loadComments(post));
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        alert('Only image files are allowed!');
        return;
      }
      
      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitPost(): void {
    if (this.postForm.invalid) return;

    const post: Post = this.postForm.value;
    this.isUploading = true;

    if (this.isEditing && this.editingPostId !== null) {
      // Handle post update
      this.postService.updatePost(this.editingPostId, post).subscribe({
        next: () => {
          this.getAllPosts();
          this.cancelEdit();
          this.isUploading = false;
        },
        error: (err) => {
          console.error('Update failed', err);
          this.isUploading = false;
        }
      });
    } else {
      // Handle new post creation
      this.postService.addPost(post).subscribe({
        next: (newPost: Post) => {
          if (this.selectedFile && newPost.id) {
            this.uploadImageForPost(newPost.id);
          } else {
            this.getAllPosts();
            this.resetForm();
            this.isUploading = false;
          }
        },
        error: (err) => {
          console.error('Post creation failed', err);
          this.isUploading = false;
        }
      });
    }
  }

  private uploadImageForPost(postId: number): void {
    if (!this.selectedFile) return;

    this.postService.uploadImage(this.selectedFile, postId).subscribe({
      next: () => {
        this.getAllPosts();
        this.resetForm();
        this.isUploading = false;
      },
      error: (err) => {
        console.error('Image upload failed', err);
        this.isUploading = false;
        // Even if image upload fails, we still have the post
        this.getAllPosts();
        this.resetForm();
      }
    });
  }

  clearImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  private resetForm(): void {
    this.postForm.reset();
    this.clearImage();
  }

  editPost(post: Post): void {
    this.postForm.patchValue(post);
    this.isEditing = true;
    this.editingPostId = post.id ?? null;
    // If the post has an image, show it in preview
    if (post.imageUrl) {
      this.imagePreview = post.imageUrl;
    }
  }

  cancelEdit(): void {
    this.resetForm();
    this.isEditing = false;
    this.editingPostId = null;
  }

  deletePost(id: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe(() => this.getAllPosts());
    }
  }

  // 💬 Commentaires
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
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService.deleteComment(commentId).subscribe(() => this.loadComments(post));
    }
  }
}