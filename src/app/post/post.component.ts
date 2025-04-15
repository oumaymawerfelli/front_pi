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
  previewUrl: string | ArrayBuffer | null = null; // Variable pour stocker l'aperçu

  commentTexts: { [postId: number]: string } = {};

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      content: [''],
      img: [null, Validators.required]
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

  submitPost(): void {
    if (this.postForm.invalid) return;

    const formData = new FormData();
    formData.append('content', this.postForm.get('content')?.value);
    const imageFile = this.postForm.get('img')?.value;
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Appel du service et mise à jour de la liste sans perte d'information
    this.postService.addPost(formData).subscribe((newPost: Post) => {
      // Pour que l'image reste affichée, on affecte la preview obtenue

      // Ajout en tête de la liste pour que le nouveau post apparaisse immédiatement
      this.posts.unshift(newPost);

      // Réinitialisation du formulaire et de l'aperçu
      this.postForm.reset();
      this.previewUrl = null;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Affecte le fichier au formulaire
      this.postForm.patchValue({ img: file });

      // Crée une prévisualisation de l'image avec FileReader
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Méthodes de modification / suppression et commentaires
  editPost(post: Post): void {
    this.postForm.patchValue(post);
    this.isEditing = true;
    this.editingPostId = post.id ?? null;
  }

  cancelEdit(): void {
    this.postForm.reset();
    this.isEditing = false;
    this.editingPostId = null;
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
