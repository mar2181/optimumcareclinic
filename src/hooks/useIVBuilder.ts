import { useState, useMemo, useCallback } from 'react';

export interface IVTreatment {
  id: string;
  name: string;
  description: string;
  base_price: number;
  benefits: string[];
  duration_min: number;
}

export interface IVAddon {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface UseIVBuilderReturn {
  selectedBase: IVTreatment | null;
  selectedAddons: IVAddon[];
  totalPrice: number;
  selectBase: (treatment: IVTreatment) => void;
  toggleAddon: (addon: IVAddon) => void;
  resetBuilder: () => void;
  isAddonSelected: (addonId: string) => boolean;
}

export const useIVBuilder = (): UseIVBuilderReturn => {
  const [selectedBase, setSelectedBase] = useState<IVTreatment | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<IVAddon[]>([]);

  const totalPrice = useMemo(() => {
    const basePrice = selectedBase?.base_price ?? 0;
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return basePrice + addonsPrice;
  }, [selectedBase, selectedAddons]);

  const selectBase = useCallback((treatment: IVTreatment) => {
    setSelectedBase(treatment);
    // Keep addons when changing base (as specified)
  }, []);

  const toggleAddon = useCallback((addon: IVAddon) => {
    setSelectedAddons(prev => {
      const exists = prev.some(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  }, []);

  const resetBuilder = useCallback(() => {
    setSelectedBase(null);
    setSelectedAddons([]);
  }, []);

  const isAddonSelected = useCallback((addonId: string) => {
    return selectedAddons.some(a => a.id === addonId);
  }, [selectedAddons]);

  return {
    selectedBase,
    selectedAddons,
    totalPrice,
    selectBase,
    toggleAddon,
    resetBuilder,
    isAddonSelected,
  };
};
