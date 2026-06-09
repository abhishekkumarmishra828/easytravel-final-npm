(function () {
  const maps = (query, city) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query}, ${city}, India`)}`;
  const google = (query, city) => `https://www.google.com/search?q=${encodeURIComponent(`${query} ${city}`)}`;

  const cityGuides = {
    Delhi: {
      foods: [
        { dish: 'Paranthe wali gali paratha', caption: 'Old Delhi ka classic breakfast-lunch bite.', restaurant: 'Pandit Gaya Prasad Shiv Charan', area: 'Chandni Chowk', since: 'old market legacy' },
        { dish: 'Butter chicken', caption: 'Delhi ka rich tandoori-style comfort food.', restaurant: 'Moti Mahal', area: 'Daryaganj', since: '1947 legacy' }
      ],
      articles: [
        { item: 'Meenakari jewellery', place: 'Dariba Kalan', note: 'Old Delhi jewellery lane' },
        { item: 'Indian handicrafts', place: 'Dilli Haat', note: 'state-wise craft stalls' }
      ]
    },
    Kolkata: {
      foods: [
        { dish: 'Kathi roll', caption: 'Kolkata ka iconic street-food roll.', restaurant: 'Nizam\'s Restaurant', area: 'New Market', since: 'old roll legacy' },
        { dish: 'Kosha mangsho', caption: 'Bengali slow-cooked mutton favourite.', restaurant: 'Golpark 6 Ballygunge Place', area: 'Ballygunge', since: 'classic Bengali dining' }
      ],
      articles: [
        { item: 'Baluchari saree', place: 'Biswa Bangla Store', note: 'Bengal textile pick' },
        { item: 'Terracotta crafts', place: 'Dakshinapan Shopping Complex', note: 'local craft shopping' }
      ]
    },
    Varanasi: {
      foods: [
        { dish: 'Kachori sabzi', caption: 'Banaras ka subah wala famous local breakfast.', restaurant: 'Ram Bhandar', area: 'Thatheri Bazaar', since: 'old city favourite' },
        { dish: 'Malaiyyo', caption: 'Winter-season airy milk dessert.', restaurant: 'Markandey Sardar', area: 'Godowlia', since: 'Banarasi sweet legacy' }
      ],
      articles: [
        { item: 'Banarasi silk saree', place: 'Peeli Kothi silk market', note: 'signature textile' },
        { item: 'Wooden toys', place: 'Khojwa / local craft market', note: 'traditional craft' }
      ]
    },
    Jaipur: {
      foods: [
        { dish: 'Pyaaz kachori', caption: 'Jaipur ka most loved snack.', restaurant: 'Rawat Misthan Bhandar', area: 'Sindhi Camp', since: 'local classic' },
        { dish: 'Rajasthani thali', caption: 'Dal baati churma aur gatte ki sabzi ek saath.', restaurant: 'Chokhi Dhani', area: 'Tonk Road side', since: 'heritage dining' }
      ],
      articles: [
        { item: 'Lac bangles', place: 'Johari Bazaar', note: 'traditional jewellery' },
        { item: 'Blue pottery', place: 'Kripal Kumbh / Jaipur bazaars', note: 'Rajasthan craft' }
      ]
    },
    'Jammu & Kashmir': {
      foods: [
        { dish: 'Kashmiri wazwan', caption: 'Kashmir ka ceremonial multi-course food experience.', restaurant: 'Ahdoos', area: 'Srinagar', since: '1918 legacy' },
        { dish: 'Kahwa and bakery', caption: 'Cold-weather tea and local bakery stop.', restaurant: 'Mughal Darbar', area: 'Srinagar', since: 'popular local dining' }
      ],
      articles: [
        { item: 'Pashmina shawl', place: 'Lal Chowk', note: 'Kashmir textile' },
        { item: 'Walnut wood carving', place: 'Srinagar craft market', note: 'local handicraft' }
      ]
    },
    Ranchi: {
      foods: [
        { dish: 'Dhuska with ghugni', caption: 'Jharkhand ka traditional fried rice-lentil snack.', restaurant: 'Kaveri Restaurant', area: 'Main Road Ranchi', since: 'local family favourite' },
        { dish: 'Litti chokha', caption: 'Ranchi me widely loved rustic regional food.', restaurant: 'Madhuban', area: 'Ranchi', since: 'vegetarian local dining' }
      ],
      articles: [
        { item: 'Dokra craft', place: 'Jharcraft Ranchi', note: 'Jharkhand metal craft' },
        { item: 'Tussar silk', place: 'Jharcraft outlet', note: 'state textile' }
      ]
    },
    Jamshedpur: {
      foods: [
        { dish: 'Litti chokha', caption: 'Steel city me popular Bihari-Jharkhandi comfort food.', restaurant: 'The Madrasi Hotel / local food lanes', area: 'Sakchi', since: 'old market food belt' },
        { dish: 'South Indian dosa', caption: 'Jamshedpur ke old market me famous quick meal.', restaurant: 'Anand Restaurant', area: 'Bistupur', since: 'local favourite' }
      ],
      articles: [
        { item: 'Tribal handicrafts', place: 'Bistupur / state emporium', note: 'Jharkhand craft' },
        { item: 'Dokra metal art', place: 'Jharcraft / local craft stores', note: 'regional article' }
      ]
    },
    Ahmedabad: {
      foods: [
        { dish: 'Gujarati thali', caption: 'Ahmedabad ka full sweet-savoury thali experience.', restaurant: 'Gordhan Thal', area: 'Satellite', since: 'classic thali stop' },
        { dish: 'Fafda jalebi', caption: 'Morning snack strongly associated with Gujarat.', restaurant: 'Chandravilas', area: 'Old Ahmedabad', since: '1900s legacy' }
      ],
      articles: [
        { item: 'Ghaghra choli', place: 'Law Garden Night Market', note: 'Gujarati festive wear' },
        { item: 'Bandhani dupatta', place: 'Rani no Hajiro', note: 'traditional textile' }
      ]
    },
    Kanyakumari: {
      foods: [
        { dish: 'South Indian meals', caption: 'Coastal Tamil Nadu ka simple, filling banana-leaf meal.', restaurant: 'Hotel Saravana', area: 'Kanyakumari', since: 'pilgrim favourite' },
        { dish: 'Fresh seafood curry', caption: 'Coastal travellers ke liye local seafood pick.', restaurant: 'Sea View Restaurant', area: 'Beach road', since: 'coastal dining' }
      ],
      articles: [
        { item: 'Sea-shell articles', place: 'Beach market', note: 'souvenir pick' },
        { item: 'Pearl jewellery', place: 'Kanyakumari local shops', note: 'coastal accessory' }
      ]
    },
    Goa: {
      foods: [
        { dish: 'Goan fish curry rice', caption: 'Goa ka everyday coastal classic.', restaurant: 'Ritz Classic', area: 'Panjim', since: 'local seafood favourite' },
        { dish: 'Pork vindaloo', caption: 'Goan-Portuguese spicy curry.', restaurant: 'Viva Panjim', area: 'Fontainhas', since: 'heritage dining' }
      ],
      articles: [
        { item: 'Azulejo tiles', place: 'Fontainhas shops', note: 'Goan-Portuguese art' },
        { item: 'Cashew products', place: 'Panjim market', note: 'local specialty' }
      ]
    },
    Amritsar: {
      foods: [
        { dish: 'Amritsari kulcha', caption: 'Punjab ka crispy stuffed kulcha with chole.', restaurant: 'Kesar Da Dhaba / Kulcha Land', area: 'Amritsar', since: 'old city favourite' },
        { dish: 'Lassi', caption: 'Thick Punjabi lassi, easy tourist favourite.', restaurant: 'Ahuja Milk Bhandar', area: 'Dhab Khatikan', since: 'classic dairy stop' }
      ],
      articles: [
        { item: 'Phulkari dupatta', place: 'Hall Bazaar', note: 'Punjab embroidery' },
        { item: 'Punjabi jutti', place: 'Hall Bazaar', note: 'traditional footwear' }
      ]
    },
    Mumbai: {
      foods: [
        { dish: 'Vada pav', caption: 'Mumbai ka most famous street-food icon.', restaurant: 'Ashok Vada Pav', area: 'Dadar', since: 'street-food legend' },
        { dish: 'Berry pulao', caption: 'Parsi food culture ka famous pick.', restaurant: 'Britannia & Co.', area: 'Ballard Estate', since: 'heritage restaurant' }
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

  const defaultGuide = {
    foods: [
      { dish: 'Local thali', caption: 'Destination ke state-wise authentic thali ko try karein.', restaurant: 'Top rated local restaurant', area: 'city centre', since: 'local favourite' },
      { dish: 'Regional sweet/snack', caption: 'Har city ka ek local snack hota hai jo trip ko yaadgaar banata hai.', restaurant: 'Old market food lane', area: 'main market', since: 'traditional stop' }
    ],
    articles: [
      { item: 'State handloom', place: 'government emporium', note: 'safe shopping idea' },
      { item: 'Local handicraft', place: 'old city market', note: 'souvenir pick' }
    ]
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
      return {
        city: resolved,
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
