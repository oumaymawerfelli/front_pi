// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/core/models/posts';
import { Commentaire } from 'src/app/core/models/commentaire';
import { CommentService } from '../core/services/comment.service';
import { PostService } from '../core/services/post.service';
import { ALL_CATEGORIES, PostCategory } from '../core/models/PostCategory';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  postForm: FormGroup;
  isEditing = false;
  editingPostId: number | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  commentTexts: { [postId: number]: string } = {};
  selectedFile: File | null = null;
  allPosts: Post[] = []; // Stores ALL posts
  filteredPosts: Post[] = [];
  currentFilter: string = 'All';
  showDebug: boolean = true;
  commentLoading: { [postId: number]: boolean } = {};

 // Stores filtered posts


  categories = ALL_CATEGORIES;
  // selectedCategory: PostCategory | 'All' = 'All';
  selectedCategory: string = 'All';

  @ViewChild('postTextarea') postTextarea!: ElementRef;
PostCategory: any;
ALL_CATEGORIES: any;


  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(5000)]],
      img: [null],
    });
  }




ngOnInit(): void {
  this.postForm = this.fb.group({
    content: ['', [Validators.required, Validators.maxLength(5000)]],
    img: [null],
    category: [PostCategory.OTHER, Validators.required] // Add this line
  });
  this.getAllPosts();
}
loadPosts(): void {
  this.postService.getPostsByCategory(this.selectedCategory).subscribe({
    next: (posts) => {
      if (this.selectedCategory === 'All') {
        this.allPosts = posts;
      }
      this.posts = posts; // This displays the posts
    },
    error: (err) => console.error('Error loading posts:', err)
  });
}

getAllPosts(): void {
  this.postService.getAllPosts().subscribe({
    next: (posts) => {
      this.posts = posts;
      this.filteredPosts = [...this.posts]; // Initialize filtered view
      this.loadAllComments(); // Load comments for all posts
    },
    error: (err) => console.error('Error loading posts:', err)
  });
}
loadAllComments(): void {
  this.posts.forEach(post => {
    this.commentService.getCommentsByPost(post.id!)
      .subscribe(comments => post.comments = comments);
  });
}


submitPost(): void {
  if (this.postForm.invalid) return;

  const formData = new FormData();
  formData.append('content', this.postForm.get('content')?.value);
  formData.append('category', this.postForm.get('category')?.value || PostCategory.OTHER);

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  } else if (this.isEditing && this.editingPostId && this.postForm.value.img) {
    formData.append('keepExistingImage', 'true');
  }

  if (this.isEditing && this.editingPostId) {
    this.postService.updatePost(this.editingPostId, formData).subscribe({
      next: (updatedPost) => {
        // Update in both arrays
        const index = this.posts.findIndex(p => p.id === updatedPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
          this.filterPosts(this.currentFilter); // Re-apply filter
        }
        this.resetForm();
      },
      error: (err) => console.error('Update error:', err)
    });
  } else {
    this.postService.addPost(formData).subscribe({
      next: (newPost) => {
        this.posts.unshift(newPost); // Add to beginning
        this.filterPosts(this.currentFilter); // Re-apply filter
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
  
      // Show preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFile = null;
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
      img: post.img || null,
      category: post.category || PostCategory.OTHER
    });
    
    
  setTimeout(() => {
    this.postTextarea.nativeElement.focus();
    this.postTextarea.nativeElement.select();
  }, 50);

  if (post.img) {
    this.previewUrl = `assets/img/posts/${post.img}`;
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

 

deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => this.getAllPosts());
  }



  loadComments(post: Post): void {
    this.commentService
      .getCommentsByPost(post.id!)
      .subscribe((comments: Commentaire[]) => {
        post.comments = comments;
      });
  }

 
  submitComment(postId: number): void {
    const text = this.commentTexts[postId];
    if (!text || text.trim() === '') return;

    const comment: Commentaire = { text };
    this.commentService.addComment(postId, comment).subscribe(() => {
      this.commentTexts[postId] = '';
      const post = this.posts.find((p) => p.id === postId);
      if (post) this.loadComments(post);
    });
  }
  
  likeComment(commentId: number, post: Post): void {
    this.commentService
      .likeComment(commentId)
      .subscribe(() => this.loadComments(post));
  }

  dislikeComment(commentId: number, post: Post): void {
    this.commentService
      .dislikeComment(commentId)
      .subscribe(() => this.loadComments(post));
  }

  deleteComment(commentId: number, post: Post): void {
    this.commentService
      .deleteComment(commentId)
      .subscribe(() => this.loadComments(post));
  }

 

filterPosts(category: string): void {
  this.currentFilter = category;
  
  if (category === 'All') {
    this.filteredPosts = [...this.posts];
  } else {
    this.filteredPosts = this.posts.filter(post => 
      post.category?.toUpperCase() === category.toUpperCase()
    );
  }
}

onCategoryChange(category: string): void {
  this.selectedCategory = category;
  this.loadPosts();
}


}