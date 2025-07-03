
import { Lounge, CreditCard } from '@/types/lounge';

export const searchLounges = (
  lounges: Lounge[],
  cardName?: string,
  city?: string,
  network?: string
): Lounge[] => {
  let results = lounges;

  console.log('Searching with:', { cardName, city, network });
  console.log('Total lounges available:', lounges.length);
  
  // Debug: Log all unique card names in the system
  if (cardName) {
    const allCardNames = new Set<string>();
    lounges.forEach(lounge => {
      lounge.eligibleCards.forEach(card => allCardNames.add(card));
    });
    console.log('All unique card names in system:', Array.from(allCardNames));
    console.log('Looking for card:', cardName);
    
    // Check if the card exists in our card-lounge relationships
    const cardExists = Array.from(allCardNames).some(card => 
      card.toLowerCase().includes(cardName.toLowerCase()) || 
      cardName.toLowerCase().includes(card.toLowerCase())
    );
    console.log('Card exists in relationships:', cardExists);
  }

  if (cardName || city || network) {
    results = lounges.filter(lounge => {
      let matchesCard = true;
      let matchesCity = true;
      let matchesNetwork = true;

      // Card filter - improved matching logic
      if (cardName) {
        matchesCard = lounge.eligibleCards.some(card => {
          const cardLower = card.toLowerCase();
          const searchLower = cardName.toLowerCase();
          
          // Try exact match first
          if (cardLower === searchLower) return true;
          
          // Try partial matches
          if (cardLower.includes(searchLower) || searchLower.includes(cardLower)) return true;
          
          // Try matching individual words
          const cardWords = cardLower.split(' ');
          const searchWords = searchLower.split(' ');
          
          // Check if most significant words match (excluding common words)
          const significantSearchWords = searchWords.filter(word => 
            !['credit', 'card', 'bank'].includes(word) && word.length > 2
          );
          
          return significantSearchWords.some(searchWord => 
            cardWords.some(cardWord => cardWord.includes(searchWord) || searchWord.includes(cardWord))
          );
        });
        
        console.log(`Card "${cardName}" matches ${results.length > 0 ? 'found' : 'not found'} in lounge ${lounge.name}`);
      }

      // City filter
      if (city) {
        matchesCity = lounge.city.toLowerCase().includes(city.toLowerCase()) ||
                    lounge.airport.toLowerCase().includes(city.toLowerCase()) ||
                    lounge.state.toLowerCase().includes(city.toLowerCase());
      }

      // Network filter
      if (network) {
        matchesNetwork = lounge.networks.some(loungeNetwork => 
          loungeNetwork.toLowerCase().includes(network.toLowerCase())
        );
      }

      const matches = matchesCard && matchesCity && matchesNetwork;
      if (cardName && matches) {
        console.log(`Lounge "${lounge.name}" matches card "${cardName}". Eligible cards:`, lounge.eligibleCards);
      }

      return matches;
    });

    console.log('Search results count:', results.length);
    if (results.length > 0) {
      console.log('First result:', results[0].name, 'Eligible cards:', results[0].eligibleCards);
    }
  }

  return results;
};

export const getEligibleCards = (
  lounges: Lounge[],
  cards: CreditCard[],
  city?: string,
  network?: string
): string[] => {
  // Hardcoded fallback cards as requested by user
  const fallbackCardIds = [54, 76, 19, 83, 36, 18, 53, 49, 51];
  const fallbackCardNames = cards
    .filter(card => fallbackCardIds.includes(card.id))
    .map(card => card.name);
  
  // If no filters provided, return all unique eligible cards from all lounges
  if (!city && !network) {
    const allEligibleCardNames = new Set<string>();
    lounges.forEach(lounge => {
      lounge.eligibleCards.forEach(card => allEligibleCardNames.add(card));
    });
    
    const allCards = Array.from(allEligibleCardNames);
    // If no cards found, return hardcoded fallback
    return allCards.length > 0 ? allCards : fallbackCardNames;
  }
  
  let filteredLounges = lounges;

  if (city) {
    filteredLounges = filteredLounges.filter(lounge => 
      lounge.city.toLowerCase().includes(city.toLowerCase()) ||
      lounge.airport.toLowerCase().includes(city.toLowerCase()) ||
      lounge.state.toLowerCase().includes(city.toLowerCase())
    );
  }

  if (network) {
    filteredLounges = filteredLounges.filter(lounge =>
      lounge.networks.some(loungeNetwork => 
        loungeNetwork.toLowerCase().includes(network.toLowerCase())
      )
    );
  }

  const eligibleCardNames = new Set<string>();
  filteredLounges.forEach(lounge => {
    lounge.eligibleCards.forEach(card => eligibleCardNames.add(card));
  });

  const filteredCards = Array.from(eligibleCardNames);
  // If no filtered cards found, return hardcoded fallback
  return filteredCards.length > 0 ? filteredCards : fallbackCardNames;
};
