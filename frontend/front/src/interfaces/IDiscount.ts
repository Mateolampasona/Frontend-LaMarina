export interface IDiscount {
  id: number;
  name: string;
  maxUses: number;
  discountValue: number;
  startDate: Date;
  endDate: Date;
  discountCode: string;
  isActive: boolean;
  discountType: string;
  uses: number;
}

export interface IDiscountProps {
  name: string;
  maxUses: number;
  percentage: number;
  startDate: Date;
  endDate: Date;
  isActive?: boolean;
  discountCode: string;
}
