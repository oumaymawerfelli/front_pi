
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../core/models/posts';
import { Commentaire } from '../core/models/commentaire';
import { CommentService } from '../core/services/comment.service';
import { PostService } from '../core/services/post.service';
import { ALL_CATEGORIES, PostCategory } from '../core/models/PostCategory';
import {jwtDecode} from 'jwt-decode'; // <-- ajoute cette importation en haut de ton fichier

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
  allPosts: Post[] = [];
  filteredPosts: Post[] = [];
  currentFilter: string = 'All';
  commentLoading: { [postId: number]: boolean } = {};
  searchQuery: string = '';
  isSearching: boolean = false;
  pinnedPosts: Post[] = [];
  categories = ALL_CATEGORIES;
  selectedCategory: string = 'All';

  @ViewChild('postTextarea') postTextarea!: ElementRef;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(5000)]],
      img: [null],
      category: [PostCategory.OTHER, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllPosts();
    this.loadPinnedPosts();
  }

  loadPosts(): void {
    this.postService.getPostsByCategory(this.selectedCategory).subscribe({
      next: (posts) => {
        if (this.selectedCategory === 'All') {
          this.allPosts = posts;
        }
        this.posts = posts;
      },
      error: (err) => console.error('Error loading posts:', err)
    });
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.filteredPosts = [...this.posts];
        this.loadAllComments();
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

  // submitPost(): void {
  //   if (this.postForm.invalid) return;

  //   const formData = new FormData();
  //   formData.append('content', this.postForm.get('content')?.value);
  //   formData.append('category', this.postForm.get('category')?.value || PostCategory.OTHER);

  //   if (this.selectedFile) {
  //     formData.append('image', this.selectedFile);
  //   } else if (this.isEditing && this.editingPostId && this.postForm.value.img) {
  //     formData.append('keepExistingImage', 'true');
  //   }

  //   if (this.isEditing && this.editingPostId) {
  //     this.postService.updatePost(this.editingPostId, formData).subscribe({
  //       next: (updatedPost) => {
  //         const index = this.posts.findIndex(p => p.id === updatedPost.id);
  //         if (index !== -1) {
  //           this.posts[index] = updatedPost;
  //           this.filterPosts(this.currentFilter);
  //         }
  //         this.resetForm();
  //       },
  //       error: (err) => console.error('Update error:', err)
  //     });
  //   } else {
  //     this.postService.addPost(formData).subscribe({
  //       next: (newPost) => {
  //         this.posts.unshift(newPost);
  //         this.filterPosts(this.currentFilter);
  //         this.resetForm();
  //       },
  //       error: (err) => console.error('Create error:', err)
  //     });
  //   }
  // }
  submitPost(): void {
    if (this.postForm.invalid) return;
  
    const formData = new FormData();
    formData.append('content', this.postForm.get('content')?.value);
    formData.append('category', this.postForm.get('category')?.value || PostCategory.OTHER);
  
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.sub) {
      const userId = decodedToken.sub;
      formData.append('user_id', userId); // <-- clé correcte maintenant
    } else {
      console.error('Impossible de récupérer l\'ID utilisateur depuis le token');
      return;
    }
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else if (this.isEditing && this.editingPostId && this.postForm.value.img) {
      formData.append('keepExistingImage', 'true');
    }
  
    if (this.isEditing && this.editingPostId) {
      this.postService.updatePost(this.editingPostId, formData).subscribe({
        next: (updatedPost) => {
          const index = this.posts.findIndex(p => p.id === updatedPost.id);
          if (index !== -1) {
            this.posts[index] = updatedPost;
            this.filterPosts(this.currentFilter);
          }
          this.resetForm();
        },
        error: (err) => console.error('Update error:', err)
      });
    } else {
      this.postService.addPost(formData).subscribe({
        next: (newPost) => {
          this.posts.unshift(newPost);
          this.filterPosts(this.currentFilter);
          this.resetForm();
        },
        error: (err) => console.error('Create error:', err)
      });
    }
  }
  
  
  
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.postForm.patchValue({ img: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFile = null;
    }
  }
  getDecodedToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (!decoded.sub) {
          console.error('Invalid token: no user ID');
          return null;
        }
        return decoded;
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  }
  
  resetForm(): void {
    this.postForm.reset({
      content: '',
      img: null,
      category: PostCategory.OTHER
    });
    this.isEditing = false;
    this.editingPostId = null;
    this.previewUrl = null;
    this.selectedFile = null;
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
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => this.getAllPosts());
  }

  loadComments(post: Post): void {
    this.commentService.getCommentsByPost(post.id!)
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
    this.commentService.likeComment(commentId)
      .subscribe(() => this.loadComments(post));
  }

  dislikeComment(commentId: number, post: Post): void {
    this.commentService.dislikeComment(commentId)
      .subscribe(() => this.loadComments(post));
  }

  deleteComment(commentId: number, post: Post): void {
    this.commentService.deleteComment(commentId)
      .subscribe(() => this.loadComments(post));
  }

  filterPosts(category: string): void {
    this.currentFilter = category;
    this.filteredPosts = category === 'All' 
      ? [...this.posts] 
      : this.posts.filter(post => 
          post.category?.toUpperCase() === category.toUpperCase()
        );
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.loadPosts();
  }

  searchPosts(): void {
    if (!this.searchQuery.trim()) {
      this.getAllPosts();
      this.isSearching = false;
      return;
    }

    this.isSearching = true;
    this.postService.searchPosts(this.searchQuery).subscribe({
      next: (posts) => {
        this.filteredPosts = posts;
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.isSearching = false;
      }
    });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.isSearching = false;
    this.getAllPosts();
  }

  togglePinPost(post: Post): void {
    if (post.pinned) {
      this.postService.unpinPost(post.id!).subscribe({
        next: (updatedPost) => {
          this.updatePostInLists(updatedPost);
        }
      });
    } else {
      this.postService.pinPost(post.id!).subscribe({
        next: (updatedPost) => {
          this.updatePostInLists(updatedPost);
        }
      });
    }
  }

  private updatePostInLists(updatedPost: Post): void {
    const allIndex = this.allPosts.findIndex(p => p.id === updatedPost.id);
    if (allIndex !== -1) {
      this.allPosts[allIndex] = updatedPost;
    }
    
    const filteredIndex = this.filteredPosts.findIndex(p => p.id === updatedPost.id);
    if (filteredIndex !== -1) {
      this.filteredPosts[filteredIndex] = updatedPost;
    }
    this.loadPinnedPosts();
  }

  loadPinnedPosts(): void {
    this.postService.getPinnedPosts().subscribe(posts => {
      this.pinnedPosts = posts;
    });
  }

  get nonPinnedPosts(): Post[] {
    return this.filteredPosts.filter(post => !post.pinned);
  }

  scrollToPost(postId: number): void {
    const element = document.getElementById(`post-${postId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.classList.add('post-highlight');
      setTimeout(() => {
        element.classList.remove('post-highlight');
      }, 2000);
    }
  }

  getPreviewText(content: string): string {
    const maxLength = 60;
    return content.length > maxLength 
      ? content.substring(0, maxLength) + '...' 
      : content;
  }
}