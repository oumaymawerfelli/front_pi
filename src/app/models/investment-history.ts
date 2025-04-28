export class InvestmentHistory {
  constructor(
    public id: number,
    public investmentId: number,
    public action: string,
    public actionDate: string,
    public performedBy: string
  ) {}

  formatActionDate(): string {
    const date = new Date(this.actionDate);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }); // Exemple : "21 avril 2025"
  }
}
