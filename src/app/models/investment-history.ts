export class InvestmentHistory {
  constructor(
    public id: number,
    public action: string,
    public description: string,
    public performedBy: string,
    public actionDate: Date
  ) {}

  formatActionDate(): string {
    return this.actionDate.toLocaleString();
  }
}
