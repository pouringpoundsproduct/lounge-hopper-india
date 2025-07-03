
export const sampleLounges = [
  {
    id: 1,
    name: "GVK Lounge",
    airport: "Chhatrapati Shivaji Maharaj International Airport (BOM)",
    city: "Mumbai",
    state: "Maharashtra",
    operator: "GVK",
    location: "Terminal 2, Level 4, Near Gate 41",
    hours: "24 Hours",
    rating: 4.2,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Free WiFi",
      "Food & Beverages", 
      "Comfortable Seating",
      "Shower Facilities",
      "Business Center",
      "Kids Play Area"
    ],
    eligibleCards: [
      "HDFC Diners Club Black",
      "American Express Platinum",
      "Axis Magnus",
      "ICICI Emeralde",
      "Standard Chartered Ultimate"
    ],
    guestPolicy: "Complimentary for cardholders. Guests can be brought at ₹2,000 per person.",
    paidAccess: "₹2,500 for 3 hours access without eligible card"
  },
  {
    id: 2,
    name: "Plaza Premium Lounge",
    airport: "Indira Gandhi International Airport (DEL)",
    city: "Delhi",
    state: "Delhi",
    operator: "Plaza Premium Group",
    location: "Terminal 3, Level 3, Near Gate 15",
    hours: "24 Hours",
    rating: 4.5,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Free WiFi",
      "Premium Dining",
      "Shower Facilities", 
      "Massage Services",
      "Business Center",
      "Sleeping Pods",
      "Kids Play Area"
    ],
    eligibleCards: [
      "HDFC Diners Club Black",
      "American Express Platinum",
      "Citi Prestige",
      "Axis Magnus",
      "HSBC Visa Infinite"
    ],
    guestPolicy: "Complimentary for cardholders. Up to 2 guests allowed at ₹1,800 per person.",
    paidAccess: "₹3,000 for 4 hours access"
  },
  {
    id: 3,
    name: "Encalm Lounge",
    airport: "Kempegowda International Airport (BLR)",
    city: "Bangalore",
    state: "Karnataka", 
    operator: "Encalm",
    location: "Terminal 1, Level 2, Departure Area",
    hours: "5:00 AM - 11:00 PM",
    rating: 4.0,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Free WiFi",
      "Food & Beverages",
      "Comfortable Seating",
      "Gaming Zone",
      "Library Corner"
    ],
    eligibleCards: [
      "HDFC Diners Club",
      "Axis Magnus",
      "ICICI Sapphiro",
      "Kotak White"
    ],
    guestPolicy: "Complimentary for cardholders. Guests at ₹1,500 per person.",
    paidAccess: "₹2,000 for 3 hours access"
  },
  {
    id: 4,
    name: "TFS Lounge", 
    airport: "Rajiv Gandhi International Airport (HYD)",
    city: "Hyderabad",
    state: "Telangana",
    operator: "Travel Food Services",
    location: "Terminal, Level 3, International Departure",
    hours: "24 Hours",
    rating: 3.8,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Free WiFi",
      "Food & Beverages",
      "Comfortable Seating", 
      "TV Entertainment",
      "Charging Stations"
    ],
    eligibleCards: [
      "HDFC Diners Club",
      "American Express",
      "Axis Bank Cards",
      "Yes Bank Cards"
    ],
    guestPolicy: "Complimentary for cardholders. Limited guest access.",
    paidAccess: "₹1,800 for 3 hours access"
  },
  {
    id: 5,
    name: "Adani Lounge",
    airport: "Sardar Vallabhbhai Patel International Airport (AMD)",
    city: "Ahmedabad", 
    state: "Gujarat",
    operator: "Adani Group",
    location: "Terminal 1, Level 2, Domestic Departure",
    hours: "5:00 AM - 10:00 PM",
    rating: 4.1,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixLib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Free WiFi",
      "Gujarati Cuisine", 
      "Comfortable Seating",
      "Business Center",
      "Prayer Room"
    ],
    eligibleCards: [
      "HDFC Diners Club",
      "ICICI Bank Cards",
      "Axis Magnus",
      "Standard Chartered"
    ],
    guestPolicy: "Complimentary for cardholders. Guests at ₹1,200 per person.",
    paidAccess: "₹1,500 for 3 hours access"
  }
];

export const sampleCards = [
  {
    id: 1,
    name: "HDFC Diners Club Black",
    bank: "HDFC Bank",
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    loungeAccess: "Unlimited domestic lounge access",
    annualFee: "₹10,000",
    features: ["Unlimited lounge access", "Milestone benefits", "Reward points"]
  },
  {
    id: 2, 
    name: "American Express Platinum",
    bank: "American Express",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    loungeAccess: "Global lounge access including Priority Pass",
    annualFee: "₹60,000",
    features: ["Global lounge access", "Hotel benefits", "Travel insurance"]
  },
  {
    id: 3,
    name: "Axis Magnus",
    bank: "Axis Bank", 
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    loungeAccess: "8 complimentary domestic lounge visits per quarter",
    annualFee: "₹12,500",
    features: ["Lounge access", "Golf benefits", "Dining privileges"]
  },
  {
    id: 4,
    name: "ICICI Emeralde",
    bank: "ICICI Bank",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    loungeAccess: "Unlimited domestic and international lounge access",
    annualFee: "₹12,000", 
    features: ["Unlimited lounge access", "Concierge services", "Travel benefits"]
  }
];
