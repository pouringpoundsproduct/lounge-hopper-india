
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Lounge {
  id: number;
  name: string;
  airport: string;
  city: string;
  state: string;
  location: string;
  hours: string;
  amenities: string[];
  guestPolicy: string;
  paidAccess?: string;
  rating: string;
  reviews: string;
  image: string;
  eligibleCards: string[];
  networks: string[];
}

export interface CreditCard {
  id: number;
  name: string;
  logo?: string;
  network?: string;
}

export interface Network {
  name: string;
  cardCount: number;
}

export const useLoungeFinder = () => {
  const [lounges, setLounges] = useState<Lounge[]>([]);
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Starting data fetch...');
      
      // Fetch lounges - using exact column names from database
      const { data: loungesData, error: loungesError } = await supabase
        .from('LoungesDB')
        .select('*');

      if (loungesError) {
        console.error('Lounges fetch error:', loungesError);
        throw loungesError;
      }

      console.log('Raw lounges data:', loungesData);

      // Fetch cards
      const { data: cardsData, error: cardsError } = await supabase
        .from('cards')
        .select('*');

      if (cardsError) {
        console.error('Cards fetch error:', cardsError);
        throw cardsError;
      }

      console.log('Raw cards data:', cardsData);

      // Fetch card-lounge relationships
      const { data: cardLoungeData, error: cardLoungeError } = await supabase
        .from('cards_lounge')
        .select('*');

      if (cardLoungeError) {
        console.error('Card-lounge relationship fetch error:', cardLoungeError);
        throw cardLoungeError;
      }

      console.log('Raw card-lounge data:', cardLoungeData);

      // Transform lounges data
      const transformedLounges: Lounge[] = loungesData?.map((lounge: any) => {
        const loungeRelations = cardLoungeData?.filter((cl: any) => cl.lounge_id === lounge.Lounge_Id) || [];
        
        const eligibleCards = loungeRelations.map((rel: any) => rel.card_name || 'Unknown Card');
        const networks = [...new Set(loungeRelations.map((rel: any) => rel.network).filter(Boolean))];

        return {
          id: lounge.Lounge_Id,
          name: lounge['Lounge Name'] || 'Unknown Lounge',
          airport: lounge['Airport Name'] || 'Unknown Airport',
          city: lounge.City || 'Unknown City',
          state: lounge.State || 'Unknown State',
          location: lounge['Location (Terminal, Concourse, Gate, Floor)'] || 'Location not specified',
          hours: lounge['Opening Hours'] || '24 hours',
          amenities: ['Wi-Fi', 'Food & Beverages', 'Comfortable Seating'], // Default amenities
          guestPolicy: lounge['Guest Policy'] || 'Check with lounge for guest policy',
          paidAccess: lounge['Paid Access Fee'],
          rating: lounge['User Ratings'] || '4.0',
          reviews: '100+',
          image: lounge['Lounge Photos'] || '/src/assets/lounge-default.jpg',
          eligibleCards,
          networks
        };
      }) || [];

      // Transform cards data
      const transformedCards: CreditCard[] = cardsData?.map((card: any) => ({
        id: card.Card_ID || card.id,
        name: card.Card_Name || 'Unknown Card',
        network: card.CG_Name
      })) || [];

      // Extract unique cities from lounges
      const uniqueCities = [...new Set(transformedLounges.map(lounge => lounge.city).filter(Boolean))].sort();
      
      // Extract unique networks from card-lounge relationships (independent of card selection)
      const networkCounts = cardLoungeData?.reduce((acc: any, relation: any) => {
        if (relation.network) {
          acc[relation.network] = (acc[relation.network] || 0) + 1;
        }
        return acc;
      }, {}) || {};

      const uniqueNetworks = Object.entries(networkCounts).map(([name, count]) => ({
        name,
        cardCount: count as number
      })).sort((a, b) => a.name.localeCompare(b.name));

      console.log('Final transformed data:');
      console.log('- Lounges:', transformedLounges.length);
      console.log('- Cards:', transformedCards.length);
      console.log('- Cities:', uniqueCities.length);
      console.log('- Networks:', uniqueNetworks.length);

      setLounges(transformedLounges);
      setCards(transformedCards);
      setCities(uniqueCities);
      setNetworks(uniqueNetworks);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const searchLounges = (cardName?: string, city?: string, network?: string) => {
    let results = lounges;

    console.log('Searching with:', { cardName, city, network });
    console.log('Total lounges available:', lounges.length);

    if (cardName || city || network) {
      results = lounges.filter(lounge => {
        let matchesCard = true;
        let matchesCity = true;
        let matchesNetwork = true;

        // Card filter
        if (cardName) {
          matchesCard = lounge.eligibleCards.some(card => 
            card.toLowerCase().includes(cardName.toLowerCase())
          );
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

        return matchesCard && matchesCity && matchesNetwork;
      });

      console.log('Search results:', results.length);
    }

    return results;
  };

  const getEligibleCards = (city?: string, network?: string) => {
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

  return {
    lounges,
    cards,
    networks,
    cities,
    loading,
    error,
    searchLounges,
    getEligibleCards,
    refetch: fetchData
  };
};
