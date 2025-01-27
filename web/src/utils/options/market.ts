import { SupermarketSections } from '@/models/enums';

export const SupermarketOptLabels: Record<SupermarketSections, string> = {
  [SupermarketSections.PRODUCE]: 'Hortifruti',
  [SupermarketSections.DAIRY]: 'Laticínios',
  [SupermarketSections.MEAT_POULTRY]: 'Carnes e Aves',
  [SupermarketSections.SEAFOOD]: 'Peixes e Frutos do Mar',
  [SupermarketSections.BAKERY]: 'Padaria',
  [SupermarketSections.FROZEN_FOODS]: 'Congelados',
  [SupermarketSections.PANTRY_STAPLES]: 'Mercearia',
  [SupermarketSections.SNACKS_CONFECTIONERY]: 'Snacks e Confeitaria',
  [SupermarketSections.BEVERAGES]: 'Bebidas',
  [SupermarketSections.HEALTH_WELLNESS]: 'Saúde e Bem-estar',
  [SupermarketSections.HOUSEHOLD_ITEMS]: 'Itens de Limpeza',
  [SupermarketSections.PERSONAL_CARE]: 'Higiene Pessoal',
  [SupermarketSections.BABY_PRODUCTS]: 'Bebês',
  [SupermarketSections.PET_SUPPLIES]: 'Pets',
  [SupermarketSections.INTERNATIONAL_FOODS]: 'Importados',
  [SupermarketSections.ALCOHOL_TOBACCO]: 'Álcool e Tabaco'
};
