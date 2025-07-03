
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
}

export interface CreditCard {
  id: number;
  name: string;
  logo?: string;
  network?: string;
}

export const useLoungeFinder = () => {
  const [lounges, setLounges] = useState<Lounge[]>([]);
  const [cards, setCards] = useState<CreditCard[]>([]);
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
      
      // Fetch lounges with properly quoted column names
      const { data: loungesData, error: loungesError } = await supabase
        .from('LoungesDB')
        .select(`
          Lounge_Id,
          "Lounge Name",
          "Airport Name",
          City,
          State,
          "Location (Terminal, Concourse, Gate, Floor)",
          "Opening Hours",
          "Guest Policy",
          "Paid Access Fee",
          "User Ratings",
          "Lounge Photos"
        `);

      if (loungesError) {
        console.error('Lounges fetch error:', loungesError);
        throw loungesError;
      }

      console.log('Lounges data fetched:', loungesData?.length || 0, 'records');

      // Fetch cards
      const { data: cardsData, error: cardsError } = await supabase
        .from('cards')
        .select('Card_ID, Card_Name, CG_Name');

      if (cardsError) {
        console.error('Cards fetch error:', cardsError);
        throw cardsError;
      }

      console.log('Cards data fetched:', cardsData?.length || 0, 'records');

      // Fetch card-lounge relationships
      const { data: cardLoungeData, error: cardLoungeError } = await supabase
        .from('cards_lounge')
        .select('card_id, lounge_id, card_name, network');

      if (cardLoungeError) {
        console.error('Card-lounge relationship fetch error:', cardLoungeError);
        throw cardLoungeError;
      }

      console.log('Card-lounge relationships fetched:', cardLoungeData?.length || 0, 'records');

      // Transform and combine data
      const transformedLounges: Lounge[] = loungesData?.map((lounge: any) => {
        const eligibleCards = cardLoungeData
          ?.filter((cl: any) => cl.lounge_id === lounge.Lounge_Id)
          ?.map((cl: any) => cl.card_name || 'Unknown Card') || [];

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
          image: lounge['Lounge Photos'] || '/placeholder.svg',
          eligibleCards
        };
      }) || [];

      const transformedCards: CreditCard[] = cardsData?.map((card: any) => ({
        id: card.Card_ID,
        name: card.Card_Name || 'Unknown Card',
        network: card.CG_Name
      })) || [];

      console.log('Data transformation complete');
      console.log('Transformed lounges:', transformedLounges.length);
      console.log('Transformed cards:', transformedCards.length);

      setLounges(transformedLounges);
      setCards(transformedCards);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const searchLounges = (cardName?: string, location?: string) => {
    let results = lounges;

    console.log('Searching with:', { cardName, location });
    console.log('Total lounges available:', lounges.length);

    if (cardName && location) {
      // Both criteria: AND logic
      results = lounges.filter(lounge => 
        lounge.eligibleCards.some(card => 
          card.toLowerCase().includes(cardName.toLowerCase())
        ) &&
        (lounge.city.toLowerCase().includes(location.toLowerCase()) ||
         lounge.airport.toLowerCase().includes(location.toLowerCase()) ||
         lounge.state.toLowerCase().includes(location.toLowerCase()))
      );
      console.log('Search results (both criteria):', results.length);
    } else if (cardName) {
      // Card only
      results = lounges.filter(lounge => 
        lounge.eligibleCards.some(card => 
          card.toLowerCase().includes(cardName.toLowerCase())
        )
      );
      console.log('Search results (card only):', results.length);
    } else if (location) {
      // Location only
      results = lounges.filter(lounge => 
        lounge.city.toLowerCase().includes(location.toLowerCase()) ||
        lounge.airport.toLowerCase().includes(location.toLowerCase()) ||
        lounge.state.toLowerCase().includes(location.toLowerCase())
      );
      console.log('Search results (location only):', results.length);
    }

    return results;
  };

  const getEligibleCards = (location?: string) => {
    if (!location) return [];
    
    const locationLounges = lounges.filter(lounge => 
      lounge.city.toLowerCase().includes(location.toLowerCase()) ||
      lounge.airport.toLowerCase().includes(location.toLowerCase()) ||
      lounge.state.toLowerCase().includes(location.toLowerCase())
    );

    const eligibleCardNames = new Set<string>();
    locationLounges.forEach(lounge => {
      lounge.eligibleCards.forEach(card => eligibleCardNames.add(card));
    });

    return Array.from(eligibleCardNames);
  };

  return {
    lounges,
    cards,
    loading,
    error,
    searchLounges,
    getEligibleCards,
    refetch: fetchData
  };
};
