(function () {
  const maps = (query, city) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query}, ${city}, India`)}`;
  const google = (query, city) => `https://www.google.com/search?q=${encodeURIComponent(`${query} ${city}`)}`;

  const cityGuides = {
    Delhi: {
      foods: [
        { dish: 'Paranthe Wali Gali Paratha', caption: 'Classic Old Delhi breakfast and lunch bite.', restaurant: 'Pandit Gaya Prasad Shiv Charan', area: 'Chandni Chowk', since: 'old market legacy' },
        { dish: 'Butter Chicken', caption: 'Rich tandoori-style Delhi comfort food.', restaurant: 'Moti Mahal', area: 'Daryaganj', since: '1947 legacy' }
      ],
      articles: [
        { item: 'Meenakari jewellery', place: 'Dariba Kalan', note: 'Old Delhi jewellery lane' },
        { item: 'Indian handicrafts', place: 'Dilli Haat', note: 'state-wise craft stalls' }
      ]
    },
    Kolkata: {
      foods: [
        { dish: 'Kathi Roll', caption: 'Kolkata’s iconic street-food roll.', restaurant: 'Nizam\'s Restaurant', area: 'New Market', since: 'old roll legacy' },
        { dish: 'Kosha mangsho', caption: 'Bengali slow-cooked mutton favourite.', restaurant: 'Golpark 6 Ballygunge Place', area: 'Ballygunge', since: 'classic Bengali dining' }
      ],
      articles: [
        { item: 'Baluchari saree', place: 'Biswa Bangla Store', note: 'Bengal textile pick' },
        { item: 'Terracotta crafts', place: 'Dakshinapan Shopping Complex', note: 'local craft shopping' }
      ]
    },
    Varanasi: {
      foods: [
        { dish: 'Kachori Sabzi', caption: 'A famous morning breakfast from Banaras.', restaurant: 'Ram Bhandar', area: 'Thatheri Bazaar', since: 'old city favourite' },
        { dish: 'Malaiyyo', caption: 'Winter-season airy milk dessert.', restaurant: 'Markandey Sardar', area: 'Godowlia', since: 'Banarasi sweet legacy' }
      ],
      articles: [
        { item: 'Banarasi silk saree', place: 'Peeli Kothi silk market', note: 'signature textile' },
        { item: 'Wooden toys', place: 'Khojwa / local craft market', note: 'traditional craft' }
      ]
    },
    Jaipur: {
      foods: [
        { dish: 'Pyaaz Kachori', caption: 'One of Jaipur’s most loved snacks.', restaurant: 'Rawat Misthan Bhandar', area: 'Sindhi Camp', since: 'local classic' },
        { dish: 'Rajasthani Thali', caption: 'Dal baati churma and gatte ki sabzi served together.', restaurant: 'Chokhi Dhani', area: 'Tonk Road side', since: 'heritage dining' }
      ],
      articles: [
        { item: 'Lac bangles', place: 'Johari Bazaar', note: 'traditional jewellery' },
        { item: 'Blue pottery', place: 'Kripal Kumbh / Jaipur bazaars', note: 'Rajasthan craft' }
      ]
    },
    'Jammu & Kashmir': {
      foods: [
        { dish: 'Kashmiri Wazwan', caption: 'Kashmir’s ceremonial multi-course food experience.', restaurant: 'Ahdoos', area: 'Srinagar', since: '1918 legacy' },
        { dish: 'Kahwa and bakery', caption: 'Cold-weather tea and local bakery stop.', restaurant: 'Mughal Darbar', area: 'Srinagar', since: 'popular local dining' }
      ],
      articles: [
        { item: 'Pashmina shawl', place: 'Lal Chowk', note: 'Kashmir textile' },
        { item: 'Walnut wood carving', place: 'Srinagar craft market', note: 'local handicraft' }
      ]
    },
    Ranchi: {
      foods: [
        { dish: 'Dhuska With Ghugni', caption: 'A traditional Jharkhand fried rice-lentil snack.', restaurant: 'Kaveri Restaurant', area: 'Main Road Ranchi', since: 'local family favourite' },
        { dish: 'Litti Chokha', caption: 'A widely loved rustic regional food in Ranchi.', restaurant: 'Madhuban', area: 'Ranchi', since: 'vegetarian local dining' }
      ],
      articles: [
        { item: 'Dokra craft', place: 'Jharcraft Ranchi', note: 'Jharkhand metal craft' },
        { item: 'Tussar silk', place: 'Jharcraft outlet', note: 'state textile' }
      ]
    },
    Jamshedpur: {
      foods: [
        { dish: 'Litti Chokha', caption: 'Popular Bihari-Jharkhandi comfort food in the Steel City.', restaurant: 'The Madrasi Hotel / local food lanes', area: 'Sakchi', since: 'old market food belt' },
        { dish: 'South Indian Dosa', caption: 'A famous quick meal around Jamshedpur’s old market areas.', restaurant: 'Anand Restaurant', area: 'Bistupur', since: 'local favourite' }
      ],
      articles: [
        { item: 'Tribal handicrafts', place: 'Bistupur / state emporium', note: 'Jharkhand craft' },
        { item: 'Dokra metal art', place: 'Jharcraft / local craft stores', note: 'regional article' }
      ]
    },
    Ahmedabad: {
      foods: [
        { dish: 'Gujarati Thali', caption: 'Ahmedabad’s full sweet-and-savoury thali experience.', restaurant: 'Gordhan Thal', area: 'Satellite', since: 'classic thali stop' },
        { dish: 'Fafda jalebi', caption: 'Morning snack strongly associated with Gujarat.', restaurant: 'Chandravilas', area: 'Old Ahmedabad', since: '1900s legacy' }
      ],
      articles: [
        { item: 'Ghaghra choli', place: 'Law Garden Night Market', note: 'Gujarati festive wear' },
        { item: 'Bandhani dupatta', place: 'Rani no Hajiro', note: 'traditional textile' }
      ]
    },
    Kanyakumari: {
      foods: [
        { dish: 'South Indian Meals', caption: 'A simple and filling banana-leaf meal from coastal Tamil Nadu.', restaurant: 'Hotel Saravana', area: 'Kanyakumari', since: 'pilgrim favourite' },
        { dish: 'Fresh Seafood Curry', caption: 'A local seafood pick for coastal travellers.', restaurant: 'Sea View Restaurant', area: 'Beach road', since: 'coastal dining' }
      ],
      articles: [
        { item: 'Sea-shell articles', place: 'Beach market', note: 'souvenir pick' },
        { item: 'Pearl jewellery', place: 'Kanyakumari local shops', note: 'coastal accessory' }
      ]
    },
    Goa: {
      foods: [
        { dish: 'Goan Fish Curry Rice', caption: 'Goa’s everyday coastal classic.', restaurant: 'Ritz Classic', area: 'Panjim', since: 'local seafood favourite' },
        { dish: 'Pork vindaloo', caption: 'Goan-Portuguese spicy curry.', restaurant: 'Viva Panjim', area: 'Fontainhas', since: 'heritage dining' }
      ],
      articles: [
        { item: 'Azulejo tiles', place: 'Fontainhas shops', note: 'Goan-Portuguese art' },
        { item: 'Cashew products', place: 'Panjim market', note: 'local specialty' }
      ]
    },
    Amritsar: {
      foods: [
        { dish: 'Amritsari Kulcha', caption: 'Punjab’s crispy stuffed kulcha served with chole.', restaurant: 'Kesar Da Dhaba / Kulcha Land', area: 'Amritsar', since: 'old city favourite' },
        { dish: 'Lassi', caption: 'Thick Punjabi lassi, easy tourist favourite.', restaurant: 'Ahuja Milk Bhandar', area: 'Dhab Khatikan', since: 'classic dairy stop' }
      ],
      articles: [
        { item: 'Phulkari dupatta', place: 'Hall Bazaar', note: 'Punjab embroidery' },
        { item: 'Punjabi jutti', place: 'Hall Bazaar', note: 'traditional footwear' }
      ]
    },
    Mumbai: {
      foods: [
        { dish: 'Vada Pav', caption: 'Mumbai’s most famous street-food icon.', restaurant: 'Ashok Vada Pav', area: 'Dadar', since: 'street-food legend' },
        { dish: 'Berry Pulao', caption: 'A famous pick from Mumbai’s Parsi food culture.', restaurant: 'Britannia & Co.', area: 'Ballard Estate', since: 'heritage restaurant' }
      ],
      articles: [
        { item: 'Kolhapuri chappal', place: 'Colaba Causeway', note: 'Maharashtra footwear' },
        { item: 'Fashion street finds', place: 'Fashion Street', note: 'budget shopping' }
      ]
    }
  };

  const aliases = {
    Srinagar: 'Jammu & Kashmir',
    Jammu: 'Jammu & Kashmir',
    Kashmir: 'Jammu & Kashmir',
    Udaipur: 'Jaipur',
    Jodhpur: 'Jaipur',
    Jaisalmer: 'Jaipur',
    Gujarat: 'Ahmedabad',
    Dwarka: 'Ahmedabad',
    Somnath: 'Ahmedabad',
    Jharkhand: 'Ranchi',
    Tatanagar: 'Jamshedpur'
  };

  const legacyRestaurants = {
    Delhi: { name: 'Moti Mahal', dish: 'Butter chicken', area: 'Daryaganj', age: '1947 legacy', note: 'A classic stop in Delhi food history.' },
    Kolkata: { name: 'Nizam\'s Restaurant', dish: 'Kathi roll', area: 'New Market', age: '1932 legacy', note: 'Original-style landmark for Kolkata roll culture.' },
    Varanasi: { name: 'Ram Bhandar', dish: 'Kachori sabzi', area: 'Thatheri Bazaar', age: 'old city legacy', note: 'Trusted stop on the Banaras breakfast trail.' },
    Jaipur: { name: 'Rawat Misthan Bhandar', dish: 'Pyaaz kachori', area: 'Sindhi Camp', age: 'local legacy', note: 'Easy-to-locate Jaipur snack stop for tourists.' },
    'Jammu & Kashmir': { name: 'Ahdoos', dish: 'Kashmiri wazwan', area: 'Srinagar', age: '1918 legacy', note: 'Century-old Srinagar food landmark.' },
    Ranchi: { name: 'Kaveri Restaurant', dish: 'Dhuska with ghugni', area: 'Main Road Ranchi', age: 'long-running local favourite', note: 'Family-friendly local food stop.' },
    Jamshedpur: { name: 'Anand Restaurant', dish: 'Dosa and local meals', area: 'Bistupur', age: 'old local favourite', note: 'Easy food stop for Steel City travellers.' },
    Ahmedabad: { name: 'Chandravilas', dish: 'Fafda jalebi', area: 'Old Ahmedabad', age: 'since 1900', note: 'Ahmedabad heritage food stop.' },
    Kanyakumari: { name: 'Hotel Saravana', dish: 'South Indian meals', area: 'Kanyakumari', age: 'pilgrim favourite', note: 'Simple trusted meal stop on temple and coast routes.' },
    Goa: { name: 'Viva Panjim', dish: 'Goan curry', area: 'Fontainhas', age: 'heritage dining', note: 'Old Goan neighbourhood dining feel.' },
    Amritsar: { name: 'Kesar Da Dhaba', dish: 'Dal makhani', area: 'Chowk Passian', age: '1916 legacy', note: 'Iconic old Amritsar dhaba.' },
    Mumbai: { name: 'Britannia & Co.', dish: 'Berry pulao', area: 'Ballard Estate', age: '1923 legacy', note: 'Mumbai Parsi food heritage stop.' }
  };

  const productMarkets = {
    Delhi: { edible: 'Old Delhi spices and namkeen', ediblePlace: 'Khari Baoli', wearable: 'Silver jewellery', wearablePlace: 'Dariba Kalan' },
    Kolkata: { edible: 'Mishti and bakery items', ediblePlace: 'New Market', wearable: 'Baluchari saree', wearablePlace: 'Biswa Bangla Store' },
    Varanasi: { edible: 'Banarasi paan and sweets', ediblePlace: 'Godowlia', wearable: 'Banarasi silk saree', wearablePlace: 'Peeli Kothi silk market' },
    Jaipur: { edible: 'Ghewar and kachori', ediblePlace: 'Johari Bazaar / Rawat', wearable: 'Lac bangles and block print cloth', wearablePlace: 'Johari Bazaar' },
    'Jammu & Kashmir': { edible: 'Kahwa and dry fruits', ediblePlace: 'Lal Chowk', wearable: 'Pashmina shawl', wearablePlace: 'Lal Chowk' },
    Ranchi: { edible: 'Thekua and local snacks', ediblePlace: 'Main Road Ranchi', wearable: 'Tussar silk', wearablePlace: 'Jharcraft Ranchi' },
    Jamshedpur: { edible: 'Litti chokha and local sweets', ediblePlace: 'Sakchi market', wearable: 'Tribal handicrafts', wearablePlace: 'Bistupur / state emporium' },
    Ahmedabad: { edible: 'Fafda jalebi and khakhra', ediblePlace: 'Chandravilas / old city', wearable: 'Ghaghra choli and Bandhani', wearablePlace: 'Law Garden Night Market' },
    Kanyakumari: { edible: 'Banana chips and coastal snacks', ediblePlace: 'Beach market', wearable: 'Pearl jewellery', wearablePlace: 'Kanyakumari local shops' },
    Goa: { edible: 'Cashew and bebinca', ediblePlace: 'Panjim market', wearable: 'Azulejo tiles and beachwear', wearablePlace: 'Fontainhas / Panjim market' },
    Amritsar: { edible: 'Papad wadiyan and pinni', ediblePlace: 'Hall Bazaar', wearable: 'Phulkari dupatta and Punjabi jutti', wearablePlace: 'Hall Bazaar' },
    Mumbai: { edible: 'Chikki and farsan', ediblePlace: 'Crawford Market', wearable: 'Kolhapuri chappal and street fashion', wearablePlace: 'Colaba Causeway' }
  };

  const defaultGuide = {
    foods: [
      { dish: 'Local thali', caption: 'Try an authentic state-wise thali for the destination.', restaurant: 'Top rated local restaurant', area: 'city centre', since: 'local favourite' },
      { dish: 'Regional sweet/snack', caption: 'Every city has a local snack that makes the trip memorable.', restaurant: 'Old market food lane', area: 'main market', since: 'traditional stop' }
    ],
    articles: [
      { item: 'State handloom', place: 'government emporium', note: 'safe shopping idea' },
      { item: 'Local handicraft', place: 'old city market', note: 'souvenir pick' }
    ]
  };

  const defaultProducts = {
    edible: 'Regional snacks and sweets',
    ediblePlace: 'old city market',
    wearable: 'State handloom and handicraft',
    wearablePlace: 'government emporium'
  };

  function resolve(city) {
    const name = String(city || '').trim();
    return cityGuides[name] ? name : aliases[name] || name;
  }

  function withLinks(entry, city) {
    return {
      ...entry,
      mapUrl: maps(`${entry.restaurant} ${entry.dish}`, city),
      searchUrl: google(`${entry.dish} ${entry.restaurant}`, city)
    };
  }

  window.EASYTRAVEL_CULTURE = {
    getPlan(city) {
      const resolved = resolve(city);
      const guide = cityGuides[resolved] || defaultGuide;
      const legacy = legacyRestaurants[resolved] || {
        name: guide.foods[0].restaurant,
        dish: guide.foods[0].dish,
        area: guide.foods[0].area,
        age: guide.foods[0].since,
        note: guide.foods[0].caption
      };
      const products = productMarkets[resolved] || defaultProducts;
      return {
        city: resolved,
        legacy: {
          ...legacy,
          mapUrl: maps(`${legacy.name} ${legacy.dish}`, resolved),
          searchUrl: google(`${legacy.name} ${legacy.dish}`, resolved)
        },
        products: {
          ...products,
          edibleMapUrl: maps(`${products.edible} ${products.ediblePlace}`, resolved),
          wearableMapUrl: maps(`${products.wearable} ${products.wearablePlace}`, resolved)
        },
        foods: guide.foods.map(item => withLinks(item, resolved)),
        articles: guide.articles.map(item => ({
          ...item,
          mapUrl: maps(`${item.item} ${item.place}`, resolved),
          searchUrl: google(`${item.item} ${item.place}`, resolved)
        }))
      };
    }
  };
})();
