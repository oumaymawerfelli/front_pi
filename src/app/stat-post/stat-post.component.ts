import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/posts';
import { PostService } from 'src/app/core/services/post.service';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-stat-post',
  templateUrl: './stat-post.component.html',
  styleUrls: ['./stat-post.component.css']
})
export class StatPostComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;

  postCategories: { label: string, count: number, percentage: number, color: string }[] = [];
  totalComments = 0;
  totalLikes = 0;
  totalDislikes = 0;
  likePercent = 0;
  dislikePercent = 0;

  postActivityPoints: string = '';
  topCommentedPosts: { title: string, comments: number }[] = [];

  topLikedComments: { text: string, likeCount: number }[] = [];
  likesPerCategory: { category: string, totalLikes: number, percentage: number }[] = [];
  likeDislikeBackground: string = '';

  yAxisLabels = [0, 5, 10, 15, 20];
  xAxisLabels: string[] = [];
  dataPoints: { x: number, y: number, label: string }[] = [];

  constructor(
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  async loadStatistics() {
    try {
      const posts = await this.postService.getAllPosts().toPromise();
      this.posts = Array.isArray(posts) ? posts : [];

      this.calculateLikesDislikes();
      this.calculatePostCategories();
      this.calculateTotalComments();
      this.calculatePostActivity();
      this.calculateTopCommentedPosts();
      this.calculateTopLikedComments();
      this.calculateLikesPerCategory();
      this.buildLikeDislikeBackground();
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      this.isLoading = false;
    }
  }

  calculateLikesDislikes() {
    this.totalLikes = 0;
    this.totalDislikes = 0;
    this.posts.forEach(post => {
      (post.comments || []).forEach(comment => {
        this.totalLikes += comment.likeCount || 0;
        this.totalDislikes += comment.dislikeCount || 0;
      });
    });
  }
  shouldShowLabel(index: number): boolean {
    if (this.xAxisLabels.length <= 8) {
      return true; // Si peu de dates, on affiche tout
    }
    return index % 2 === 0; // Sinon, on affiche 1 date sur 2
  }

  calculatePostCategories() {
    const categoriesCount: { [key: string]: number } = {};
    const total = this.posts.length;

    this.posts.forEach(post => {
      const category = post.category || 'Other';
      categoriesCount[category] = (categoriesCount[category] || 0) + 1;
    });

    const colors = [
      '#ff6b6b', '#ffb74d', '#81c784', '#fdd835', '#e57373', '#ba68c8', '#ff7043'
    ];

    this.postCategories = Object.entries(categoriesCount).map(([label, count], index) => ({
      label,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
      color: colors[index % colors.length]
    }));
  }

  calculateTotalComments() {
    this.totalComments = this.posts.reduce((sum, post) => sum + (post.comments?.length || 0), 0);
  }

  calculatePostActivity() {
    const postsPerDay: { [date: string]: number } = {};

    this.posts.forEach(post => {
      const createdAt = post.dateCreated ? new Date(post.dateCreated) : new Date();
      const dateKey = createdAt.toLocaleDateString('en-GB');
      postsPerDay[dateKey] = (postsPerDay[dateKey] || 0) + 1;
    });

    const dates = Object.keys(postsPerDay).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    this.xAxisLabels = dates;
    this.postActivityPoints = dates.map((date, index) => {
      const x = 50 + index * 60; // <-- 60 au lieu de 30
      const y = 200 - (postsPerDay[date] * 8);
      return `${x},${y}`;
    }).join(' ');
  }




  calculateTopCommentedPosts() {
    const sorted = [...this.posts].sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
    this.topCommentedPosts = sorted.slice(0, 5).map(post => ({
      title: post.content.length > 20 ? post.content.slice(0, 20) + '...' : post.content,
      comments: post.comments?.length || 0
    }));
  }

  calculateTopLikedComments() {
    const allComments = this.posts.flatMap(post => post.comments || []);
    const sorted = [...allComments].sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
    this.topLikedComments = sorted.slice(0, 5).map(comment => ({
      text: comment.text,
      likeCount: comment.likeCount || 0
    }));
  }

  // calculateLikesPerCategory() {
  //   this.likesPerCategory = [];

  //   const allCategories = ['Feedback', 'Products', 'Ideas', 'Questions', 'Recommendations', 'Other'];

  //   allCategories.forEach(category => {
  //     const commentsInCategory = this.posts
  //       .filter(p => p.category === category)
  //       .flatMap(p => p.comments || []);
  //     const totalLikesInCategory = commentsInCategory.reduce((sum, c) => sum + (c.likeCount || 0), 0);

  //     this.likesPerCategory.push({
  //       category,
  //       totalLikes: totalLikesInCategory,
  //       percentage: this.totalLikes > 0 ? (totalLikesInCategory / this.totalLikes) * 100 : 0
  //     });
  //   });
  // }
  calculateLikesPerCategory() {
    const likesMap: { [key: string]: number } = {};

    // Initialiser avec 0
    this.posts.forEach(post => {
      const cat = post.category || 'Other';
      likesMap[cat] = (likesMap[cat] || 0);

      (post.comments || []).forEach(comment => {
        likesMap[cat] += comment.likeCount || 0;
      });
    });

    const totalLikesAllCategories = Object.values(likesMap).reduce((sum, likes) => sum + likes, 0);

    this.likesPerCategory = Object.entries(likesMap).map(([category, totalLikes]) => ({
      category,
      totalLikes,
      percentage: totalLikesAllCategories > 0 ? (totalLikes / totalLikesAllCategories) * 100 : 0
    }));
  }
  buildLikeDislikeBackground() {
    const total = this.totalLikes + this.totalDislikes;
    this.likePercent = total > 0 ? (this.totalLikes / total) * 100 : 0;
    this.dislikePercent = total > 0 ? (this.totalDislikes / total) * 100 : 0;

    this.likeDislikeBackground = `conic-gradient(#4caf50 0% ${this.likePercent}%, #f44336 ${this.likePercent}% 100%)`;
  }

  scaleY(value: number): number {
    return 200 - (value * 8);
  }
}
