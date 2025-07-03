
import { supabase } from '@/integrations/supabase/client';
import { Lounge, CreditCard, Network } from '@/types/lounge';

export interface LoungeFetchResult {
  lounges: Lounge[];
  cards: CreditCard[];
  networks: Network[];
  cities: string[];
}

export const fetchLoungeData = async (): Promise<LoungeFetchResult> => {
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

  return {
    lounges: transformedLounges,
    cards: transformedCards,
    networks: uniqueNetworks,
    cities: uniqueCities
  };
};
