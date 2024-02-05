export interface TaxRate {
  active: boolean;
  country?: string;
  state?: string;
  jurisdiction?: string;
  effectivePercentage?: number;
  percentage: number;
  description?: string;
}
