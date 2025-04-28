import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/orders.service';
import { Order } from 'src/app/core/models/Order';
import { LignePanier } from 'src/app/core/models/LignePanier';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  
  editedOrder: Order = {
    id: 0,
    customer: { name: '' },
    status: '',
    dateCommande: new Date(),
    lignePanier: [],
    paymentMethod: ''
  };

  editOrderId: number | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.orders = data;
        console.log('Commandes chargées:', data);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors du chargement des commandes';
        console.error('Erreur lors du chargement:', error);
      }
    });
  }

  deleteOrder(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette commande ?')) {
      this.orderService.deleteOrder(id).subscribe({
        next: () => {
          this.orders = this.orders.filter(order => order.id !== id);
        },
        error: () => {
          this.errorMessage = 'Erreur lors de la suppression de la commande';
        }
      });
    }
  }

  editOrder(order: any): void {
    console.log('Commande à éditer:', order);

    this.editedOrder = {
      ...order,
      lignePanier: order.lignesPanier ? [...order.lignesPanier] : []
    };

    console.log('Commande éditée:', this.editedOrder);
    this.editOrderId = order.id ?? null;
  }

  saveEdit(): void {
    if (this.editedOrder && this.editedOrder.id !== undefined) {
      this.orderService.updateOrder(this.editedOrder.id, this.editedOrder).subscribe({
        next: (updatedOrder) => {
          console.log('Commande mise à jour avec succès', updatedOrder);
          this.editOrderId = null;
          this.loadOrders();
        },
        error: (error) => {
          console.error('Erreur de mise à jour', error);
          this.errorMessage = 'Erreur lors de l\'enregistrement de la commande';
          console.log('Détails de l\'erreur:', error); // Ajoute cette ligne pour mieux comprendre l'erreur
        }
      });
    }
  }
  
  

  deleteProductFromOrder(productId: number): void {
    if (this.editedOrder.lignePanier) {
      this.editedOrder.lignePanier = this.editedOrder.lignePanier.filter(
        ligne => ligne.produit.productId !== productId
      );
    }
  }

  updateProductQuantity(ligne: LignePanier, newQuantity: number): void {
    if (this.editedOrder.lignePanier) {
      const ligneToUpdate = this.editedOrder.lignePanier.find(
        lp => lp.produit.productId === ligne.produit.productId
      );
      if (ligneToUpdate && newQuantity > 0) {
        ligneToUpdate.quantite = newQuantity;
      }
    }
  }

  getTotalPrice(order: Order): number {
    return (order.lignePanier ?? []).reduce((total: number, ligne: LignePanier) => {
      const price = ligne.produit.productPrice ?? 0;
      const quantity = ligne.quantite ?? 0;
      return total + (price * quantity);
    }, 0);
  }
}
