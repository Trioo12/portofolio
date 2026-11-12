import { createContext, useContext } from 'react';

export const PortfolioContext = createContext(null);

export function usePortfolio() {
  const portfolio = useContext(PortfolioContext);
  if (!portfolio) {
    throw new Error('Portfolio components must be rendered inside PortfolioContext.Provider.');
  }
  return portfolio;
}
