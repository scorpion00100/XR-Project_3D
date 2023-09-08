export class UpdateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  ingredients: string; // Nouvelle propriété
  customizationOptions: string; // Nouvelle propriété
  imageUrl: string;
  arExperienceId: string;
}
