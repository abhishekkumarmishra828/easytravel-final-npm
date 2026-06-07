(function () {
  const data = window.EASYTRAVEL_DATA;
  if (!data) return;

  const img = (file) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1400`;
  const unsplash = (query) => `https://source.unsplash.com/featured/1400x900/?${encodeURIComponent(query)}`;
  const wiki = (name) => `https://en.wikipedia.org/wiki/${encodeURIComponent(name).replace(/%20/g, '_')}`;
  const maps = (place, city) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place + ', ' + city + ', India')}`;
  const google = (place, city) => `https://www.google.com/search?q=${encodeURIComponent(place + ' ' + city + ' travel')}`;
  const youtube = (place, city) => `https://www.youtube.com/results?search_query=${encodeURIComponent(place + ' ' + city + ' travel guide')}`;

  const additions = [
    { key: 'kedarnath', display: 'Kedarnath Yatra', state: 'Uttarakhand', coords: [30.7352, 79.0669], image: img('Kedarnath_Temple.jpg'), places: ['Kedarnath Temple', 'Gaurikund', 'Sonprayag', 'Triyuginarayan Temple', 'Vasuki Tal'] },
    { key: 'badrinath', display: 'Badrinath Yatra', state: 'Uttarakhand', coords: [30.7433, 79.4938], image: img('Badrinath_Temple.jpg'), places: ['Badrinath Temple', 'Mana Village', 'Tapt Kund', 'Charan Paduka', 'Vasudhara Falls'] },
    { key: 'amarnath', display: 'Amarnath Yatra', state: 'Jammu and Kashmir', coords: [34.214, 75.502], image: img('Cave_Temple_of_Lord_Amarnath.jpg'), places: ['Amarnath Cave', 'Pahalgam Base Camp', 'Baltal Base Camp', 'Chandanwari', 'Sheshnag Lake'] },
    { key: 'vaishno-devi', display: 'Vaishno Devi Yatra', state: 'Jammu and Kashmir', coords: [33.0308, 74.949], image: img('Vaishno_Devi_Bhavan.jpg'), places: ['Vaishno Devi Bhawan', 'Katra Base Camp', 'Ardhkuwari Cave', 'Bhairavnath Temple', 'Banganga'] },
    { key: 'ayodhya', display: 'Ayodhya', state: 'Uttar Pradesh', coords: [26.7922, 82.1998], image: img('Ram_Mandir_Ayodhya.jpg'), places: ['Ram Mandir', 'Hanuman Garhi', 'Kanak Bhawan', 'Saryu Ghat', 'Ram Ki Paidi'] },
    { key: 'mathura', display: 'Mathura', state: 'Uttar Pradesh', coords: [27.4924, 77.6737], image: img('Vishram_Ghat,_Mathura.jpg'), places: ['Shri Krishna Janmabhoomi', 'Vishram Ghat', 'Dwarkadhish Temple Mathura', 'Govardhan Hill', 'Barsana'] },
    { key: 'vrindavan', display: 'Vrindavan', state: 'Uttar Pradesh', coords: [27.565, 77.6593], image: img('Prem_Mandir_Vrindavan.jpg'), places: ['Prem Mandir', 'Banke Bihari Temple', 'ISKCON Vrindavan', 'Nidhivan', 'Radha Raman Temple'] },
    { key: 'prayagraj', display: 'Prayagraj', state: 'Uttar Pradesh', coords: [25.4358, 81.8463], image: img('Triveni_Sangam_Allahabad.jpg'), places: ['Triveni Sangam', 'Anand Bhavan', 'Allahabad Fort', 'Khusro Bagh', 'Hanuman Mandir Prayagraj'] },
    { key: 'puri', display: 'Puri', state: 'Odisha', coords: [19.8135, 85.8312], image: img('Jagannath_Temple,_Puri.jpg'), places: ['Jagannath Temple', 'Puri Beach', 'Gundicha Temple', 'Chilika Lake day trip', 'Raghurajpur Craft Village'] },
    { key: 'konark', display: 'Konark', state: 'Odisha', coords: [19.8876, 86.0945], image: img('Konark_Sun_Temple.jpg'), places: ['Konark Sun Temple', 'Chandrabhaga Beach', 'ASI Museum Konark', 'Ramachandi Beach', 'Marine Drive Odisha'] },
    { key: 'bhubaneswar', display: 'Bhubaneswar', state: 'Odisha', coords: [20.2961, 85.8245], image: img('Lingaraj_Temple_Bhubaneswar.jpg'), places: ['Lingaraj Temple', 'Udayagiri Caves', 'Dhauli Shanti Stupa', 'Nandankanan Zoo', 'Mukteswara Temple'] },
    { key: 'kolkata', display: 'Kolkata', state: 'West Bengal', coords: [22.5726, 88.3639], image: img('Victoria_Memorial,_Kolkata.jpg'), places: ['Victoria Memorial', 'Howrah Bridge', 'Dakshineswar Kali Temple', 'Indian Museum', 'Park Street'] },
    { key: 'darjeeling', display: 'Darjeeling', state: 'West Bengal', coords: [27.041, 88.2663], image: img('Darjeeling_Toy_Train.jpg'), places: ['Tiger Hill', 'Darjeeling Himalayan Railway', 'Batasia Loop', 'Peace Pagoda Darjeeling', 'Tea Garden Darjeeling'] },
    { key: 'gangtok', display: 'Gangtok', state: 'Sikkim', coords: [27.3314, 88.6138], image: img('Gangtok_city.jpg'), places: ['MG Marg Gangtok', 'Rumtek Monastery', 'Tsomgo Lake', 'Nathula Pass planning', 'Ganesh Tok'] },
    { key: 'kochi', display: 'Kochi', state: 'Kerala', coords: [9.9312, 76.2673], image: img('Chinese_fishing_nets,_Kochi.jpg'), places: ['Fort Kochi', 'Chinese Fishing Nets', 'Mattancherry Palace', 'Jew Town', 'Marine Drive Kochi'] },
    { key: 'munnar', display: 'Munnar', state: 'Kerala', coords: [10.0889, 77.0595], image: img('Munnar_hill_station_.JPG'), places: ['Tea Gardens Munnar', 'Eravikulam National Park', 'Mattupetty Dam', 'Top Station', 'Echo Point Munnar'] },
    { key: 'alleppey', display: 'Alleppey', state: 'Kerala', coords: [9.4981, 76.3388], image: img('Alappuzha_Boat_Race.jpg'), places: ['Alleppey Backwaters', 'Houseboat cruise', 'Alappuzha Beach', 'Marari Beach', 'Kumarakom day trip'] },
    { key: 'mysuru', display: 'Mysuru', state: 'Karnataka', coords: [12.2958, 76.6394], image: img('Mysore_Palace_Morning.jpg'), places: ['Mysore Palace', 'Chamundi Hills', 'Brindavan Gardens', 'St Philomena Church', 'Devaraja Market'] },
    { key: 'hampi', display: 'Hampi', state: 'Karnataka', coords: [15.335, 76.46], image: img('Hampi_virupaksha_temple.jpg'), places: ['Virupaksha Temple', 'Vittala Temple', 'Stone Chariot Hampi', 'Matanga Hill', 'Hampi Bazaar'] },
    { key: 'coorg', display: 'Coorg', state: 'Karnataka', coords: [12.3375, 75.8069], image: img('Abbey_Falls,_Coorg.jpg'), places: ['Abbey Falls', 'Raja Seat', 'Dubare Elephant Camp', 'Madikeri Fort', 'Coffee estate stay'] },
    { key: 'madurai', display: 'Madurai', state: 'Tamil Nadu', coords: [9.9252, 78.1198], image: img('Meenakshi_Amman_Temple_Madurai.jpg'), places: ['Meenakshi Amman Temple', 'Thirumalai Nayakkar Palace', 'Gandhi Museum Madurai', 'Alagar Kovil', 'Vandiyur Mariamman Teppakulam'] },
    { key: 'tirupati', display: 'Tirupati', state: 'Andhra Pradesh', coords: [13.6288, 79.4192], image: img('Tirumala_090615.jpg'), places: ['Tirupati Balaji', 'Sri Padmavathi Temple', 'Kapila Theertham', 'Talakona Falls', 'Chandragiri Fort'] },
    { key: 'shirdi', display: 'Shirdi', state: 'Maharashtra', coords: [19.7669, 74.4776], image: img('Shirdi_Sai_Baba_Temple.jpg'), places: ['Sai Baba Samadhi Mandir', 'Dwarkamai', 'Chavadi', 'Shani Shingnapur day trip', 'Lendi Baug'] },
    { key: 'nashik', display: 'Nashik', state: 'Maharashtra', coords: [19.9975, 73.7898], image: img('Trimbakeshwar_Temple_Nashik.jpg'), places: ['Trimbakeshwar Temple', 'Panchavati', 'Sula Vineyards', 'Ramkund', 'Pandavleni Caves'] },
    { key: 'aurangabad', display: 'Aurangabad', state: 'Maharashtra', coords: [19.8762, 75.3433], image: img('Ajanta_Caves,_India.jpg'), places: ['Ajanta Caves', 'Ellora Caves', 'Bibi Ka Maqbara', 'Daulatabad Fort', 'Grishneshwar Temple'] },
    { key: 'pune', display: 'Pune', state: 'Maharashtra', coords: [18.5204, 73.8567], image: img('Shaniwarwada_Pune.jpg'), places: ['Shaniwar Wada', 'Aga Khan Palace', 'Sinhagad Fort', 'Dagdusheth Ganpati', 'Koregaon Park'] },
    { key: 'jodhpur', display: 'Jodhpur', state: 'Rajasthan', coords: [26.2389, 73.0243], image: img('Mehrangarh_Fort_Jodhpur.jpg'), places: ['Mehrangarh Fort', 'Jaswant Thada', 'Umaid Bhawan Palace', 'Clock Tower Market', 'Mandore Garden'] },
    { key: 'ajmer', display: 'Ajmer', state: 'Rajasthan', coords: [26.4499, 74.6399], image: img('Ajmer_Sharif_Dargah.jpg'), places: ['Ajmer Sharif Dargah', 'Ana Sagar Lake', 'Adhai Din Ka Jhonpra', 'Pushkar day trip', 'Taragarh Fort Ajmer'] },
    { key: 'pushkar', display: 'Pushkar', state: 'Rajasthan', coords: [26.489, 74.5511], image: img('Pushkar_Lake.jpg'), places: ['Pushkar Lake', 'Brahma Temple Pushkar', 'Savitri Mata Temple', 'Pushkar Bazaar', 'Desert camp Pushkar'] },
    { key: 'mount-abu', display: 'Mount Abu', state: 'Rajasthan', coords: [24.5926, 72.7156], image: img('Dilwara_Temples,_Mount_Abu.jpg'), places: ['Dilwara Temples', 'Nakki Lake', 'Guru Shikhar', 'Sunset Point Mount Abu', 'Achalgarh Fort'] },
    { key: 'khajuraho', display: 'Khajuraho', state: 'Madhya Pradesh', coords: [24.8318, 79.9199], image: img('Khajuraho_Group_of_Monuments.jpg'), places: ['Khajuraho Temples', 'Kandariya Mahadev Temple', 'Raneh Falls', 'Panna National Park day trip', 'Western Group of Temples'] },
    { key: 'bhopal', display: 'Bhopal', state: 'Madhya Pradesh', coords: [23.2599, 77.4126], image: img('Upper_Lake_Bhopal.jpg'), places: ['Upper Lake Bhopal', 'Sanchi Stupa day trip', 'Bhimbetka Caves', 'Taj-ul-Masajid', 'Van Vihar National Park'] },
    { key: 'indore', display: 'Indore', state: 'Madhya Pradesh', coords: [22.7196, 75.8577], image: img('Rajwada_Indore.jpg'), places: ['Rajwada Palace', 'Sarafa Bazaar', 'Khajrana Ganesh Temple', 'Lal Bagh Palace', 'Patalpani Waterfall'] },
    { key: 'gwalior', display: 'Gwalior', state: 'Madhya Pradesh', coords: [26.2183, 78.1828], image: img('Gwalior_Fort.jpg'), places: ['Gwalior Fort', 'Jai Vilas Palace', 'Sas Bahu Temple', 'Tansen Tomb', 'Sun Temple Gwalior'] },
    { key: 'andaman', display: 'Andaman', state: 'Andaman and Nicobar Islands', coords: [11.7401, 92.6586], image: img('Radhanagar_Beach_Havelock_Island.jpg'), places: ['Radhanagar Beach', 'Cellular Jail', 'Havelock Island', 'Neil Island', 'Ross Island'] },
    { key: 'lakshadweep', display: 'Lakshadweep', state: 'Lakshadweep', coords: [10.5667, 72.6417], image: img('Bangaram_Island_Lakshadweep.jpg'), places: ['Bangaram Island', 'Agatti Island', 'Minicoy Island', 'Kadmat Island', 'Kavaratti Lagoon'] },
    { key: 'chandigarh', display: 'Chandigarh', state: 'Chandigarh', coords: [30.7333, 76.7794], image: '/package-assets/garden_real.jpg', places: ['Rock Garden Chandigarh', 'Sukhna Lake', 'Rose Garden Chandigarh', 'Capitol Complex', 'Sector 17 Plaza'] },
    { key: 'patna', display: 'Patna', state: 'Bihar', coords: [25.5941, 85.1376], image: img('Golghar_Patna.jpg'), places: ['Golghar', 'Takht Sri Patna Sahib', 'Bihar Museum', 'Ganga Ghat Patna', 'Patna Sahib Gurudwara'] },
    { key: 'bodh-gaya', display: 'Bodh Gaya', state: 'Bihar', coords: [24.6961, 84.9913], image: img('Mahabodhi_Temple_Bodh_Gaya.jpg'), places: ['Mahabodhi Temple', 'Bodhi Tree', 'Great Buddha Statue', 'Thai Monastery Bodh Gaya', 'Dungeshwari Caves'] },
    { key: 'nainital', display: 'Nainital', state: 'Uttarakhand', coords: [29.3919, 79.4542], image: img('Nainital_lake.jpg'), places: ['Naini Lake', 'Naina Devi Temple', 'Snow View Point', 'Mall Road Nainital', 'Eco Cave Gardens'] },
    { key: 'jim-corbett', display: 'Jim Corbett', state: 'Uttarakhand', coords: [29.53, 78.7747], image: img('Jim_Corbett_National_Park.jpg'), places: ['Corbett Safari Zone', 'Dhikala Zone', 'Garjiya Devi Temple', 'Corbett Falls', 'Ramnagar stay'] },
    { key: 'dwarkadhish-somnath', display: 'Somnath', state: 'Gujarat', coords: [20.888, 70.4012], image: img('Somnath_Temple.jpg'), places: ['Somnath Temple', 'Triveni Sangam Somnath', 'Bhalka Tirth', 'Somnath Beach', 'Gir day trip'] },
    { key: 'statue-of-unity', display: 'Statue of Unity', state: 'Gujarat', coords: [21.838, 73.7191], image: img('Statue_of_Unity.jpg'), places: ['Statue of Unity', 'Valley of Flowers Kevadia', 'Sardar Sarovar Dam', 'Jungle Safari Kevadia', 'Ekta Cruise'] }
  ];

  const imageSets = {
    'Kedarnath Yatra': [img('Kedarnath_Temple.jpg'), img('Kedarnath_Temple_in_Rainy_season.jpg'), img('Kedarnath_valley.jpg')],
    'Badrinath Yatra': [img('Badrinath_Temple.jpg'), img('Badrinath_temple,_Uttarakhand.jpg'), img('Badrinath_Temple_and_Neelkanth_peak.jpg')],
    'Amarnath Yatra': [img('Cave_Temple_of_Lord_Amarnath.jpg'), img('Amarnath_Cave.jpg'), img('Sheshnag_Lake.jpg')],
    'Vaishno Devi Yatra': [img('Vaishno_Devi_Bhavan.jpg'), img('Vaishno_Devi_Temple.jpg'), img('Katra_Vaishno_Devi.jpg')],
    'Jaisalmer': ['/package-assets/fort_real.jpg', img('Jaisalmer_Fort_Rajasthan.jpg'), img('Jaisalmer_Fort_from_Gadisar_Lake.jpg'), img('Sam_Sand_Dunes_Jaisalmer.jpg')],
    'Rajasthan': [img('Hawa_Mahal_2011.jpg'), img('City_Palace_Udaipur.jpg'), img('Jaisalmer_Fort_Rajasthan.jpg'), img('Mehrangarh_Fort_Jodhpur.jpg')],
    'Uttarakhand': [img('Kedarnath_Temple.jpg'), img('Badrinath_Temple.jpg'), img('Har_Ki_Pauri_Haridwar.jpg'), img('Naini_Lake_Nainital.jpg')],
    'Udaipur': [img('Lake_Palace_Udaipur.jpg'), img('City_Palace_Udaipur.jpg'), img('Lake_Pichola_Udaipur.jpg')],
    'Kolkata': [img('Victoria_Memorial,_Kolkata.jpg'), img('Howrah_Bridge_Kolkata.jpg'), img('Dakshineswar_Kali_Temple.jpg'), img('Indian_Museum_Kolkata.jpg')],
    'Kochi': [img('Chinese_fishing_nets,_Kochi.jpg'), img('Fort_Kochi_Beach.jpg'), img('Mattancherry_Palace.jpg'), img('Marine_Drive_Kochi.jpg')],
    'Jammu & Kashmir': [img('Dal_Lake_Srinagar.jpg'), img('Gulmarg_Valley.jpg'), img('Pahalgam_Valley.jpg')],
    'Ladakh': [img('Pangong_Tso_lake.jpg'), img('Leh_Palace.jpg'), img('Nubra_Valley_Ladakh.jpg')],
    'Agra': [img('Taj_Mahal_in_March_2004.jpg'), img('Agra_Fort_India.jpg'), img('Mehtab_Bagh_Agra.jpg')],
    'Lucknow': [img('Bara_Imambara_Lucknow.jpg'), img('Rumi_Darwaza_Lucknow.jpg'), img('Ambedkar_Memorial_Park_Lucknow.jpg')],
    'Ujjain': [img('Mahakaleshwar_Jyotirlinga_Temple.jpg'), img('Ram_Ghat_Ujjain.jpg'), img('Kal_Bhairav_Temple_Ujjain.jpg')],
    'Chennai': [img('Marina_Beach_Chennai.jpg'), img('Kapaleeshwarar_Temple_Chennai.jpg'), img('San_Thome_Basilica_Chennai.jpg')],
    'Bengaluru': [img('Lalbagh_Bangalore.jpg'), img('Bangalore_Palace.jpg'), img('Vidhana_Soudha_Bangalore.jpg')],
    'Kanyakumari': ['https://www.kanyakumaritourism.in/images/places-to-visit/headers/vivekananda-rock-memorial-kanyakumari-tourism-entry-fee-timings-holidays-reviews-header.jpg', img('Vivekananda_Rock_Memorial,_Kanyakumari.jpg'), img('Thiruvalluvar_Statue_Kanyakumari.jpg'), '/package-assets/sunset_real.jpg'],
    'Chandigarh': ['/package-assets/garden_real.jpg', img('Rock_Garden_of_Chandigarh.jpg'), img('Sukhna_Lake_Chandigarh.jpg'), img('Capitol_Complex_Chandigarh.jpg')],
    'Ahmedabad': [img('Sabarmati_Ashram_Ahmedabad.jpg'), img('Adalaj_Stepwell.jpg'), img('Kankaria_Lake_Ahmedabad.jpg')],
    'Manali': [img('Solang_Valley_Manali.jpg'), img('Hadimba_Temple_Manali.jpg'), img('Mall_Road_Manali.jpg')],
    'Shimla': [img('The_Ridge_Shimla.jpg'), img('Mall_Road_Shimla.jpg'), img('Jakhoo_Temple_Shimla.jpg')],
    'Ooty': [img('Ooty_Lake.jpg'), img('Botanical_Gardens_Ooty.jpg'), img('Doddabetta_peak_Ooty.jpg')],
    'Hyderabad': [img('Charminar_Hyderabad.jpg'), img('Golconda_Fort_Hyderabad.jpg'), img('Hussain_Sagar_Lake_Hyderabad.jpg')],
    'Dehradun': [img('Robbers_Cave_Dehradun.jpg'), img('Forest_Research_Institute_Dehradun.jpg'), img('Sahastradhara_Dehradun.jpg')],
    'Shillong': [img('Umiam_Lake_Meghalaya.jpg'), img('Elephant_Falls_Shillong.jpg'), img('Shillong_Peak.jpg')],
    'Arunachal Pradesh': [img('Tawang_Monastery_Arunachal_Pradesh.jpg'), img('Sela_Pass.jpg'), img('Ziro_Valley.jpg')],
    'Amritsar': [img('Golden_Temple_Amritsar.jpg'), img('Jallianwala_Bagh_Amritsar.jpg'), img('Wagah_Border_ceremony.jpg')],
    'Puducherry': [img('Promenade_Beach_Pondicherry.jpg'), img('Auroville_Matrimandir.jpg'), img('Paradise_Beach_Puducherry.jpg')],
    'Rajgir': [img('Vishwa_Shanti_Stupa_Rajgir.jpg'), img('Rajgir_Ropeway.jpg'), img('Rajgir_hot_springs.jpg')],
    'Lonavala': [img('Tiger_Point_Lonavala.jpg'), img('Bhushi_Dam_Lonavala.jpg'), img('Karla_Caves.jpg')],
    'Mussoorie': [img('Kempty_Falls_Mussoorie.jpg'), img('Gun_Hill_Mussoorie.jpg'), img('Mall_Road_Mussoorie.jpg')],
    'Goa': [img('Calangute_Beach_Goa.jpg'), img('Fort_Aguada_Goa.jpg'), img('Basilica_of_Bom_Jesus_Goa.jpg')],
    'Delhi': [img('India_Gate_in_New_Delhi_03-2016.jpg'), img('Red_Fort_in_Delhi_03-2016_img3.jpg'), img('Qutb_Minar_2011.jpg')]
  };
  const fallbackQueries = {
    'Kochi': 'kochi kerala backwaters fort kochi',
    'Kolkata': 'kolkata victoria memorial howrah bridge',
    'Uttarakhand': 'uttarakhand himalayas kedarnath badrinath',
    'Rajasthan': 'rajasthan fort desert palace',
    'Kedarnath Yatra': 'kedarnath temple himalayas',
    'Badrinath Yatra': 'badrinath temple uttarakhand',
    'Jaisalmer': 'jaisalmer fort sam sand dunes',
    'Kanyakumari': 'kanyakumari vivekananda rock memorial sunrise',
    'Chandigarh': 'chandigarh rock garden sukhna lake'
  };

  const bands = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60+'];

  function ageBandsFor(places) {
    const list = [...places];
    return bands.reduce((acc, band, index) => {
      const a = list[index % list.length];
      const b = list[(index + 1) % list.length];
      const c = list[(index + 2) % list.length];
      acc[band] = [a, b, c];
      return acc;
    }, {});
  }

  function placeCard(city, place, index) {
    const lat = city.coords[0] + (index % 3) * 0.006;
    const lon = city.coords[1] + (index % 4) * 0.006;
    const placeImage = (city.images && city.images[index % city.images.length]) || city.image;
    return {
      name: place,
      city: city.display,
      coords: [Number(lat.toFixed(4)), Number(lon.toFixed(4))],
      bestFor: index === 0 ? 'Main attraction' : index === 1 ? 'Arrival support' : 'Sightseeing',
      distance: index === 0 ? 'Primary destination point' : `${Math.max(2, index * 4)} km route idea`,
      summary: `${place} ${city.display} trip ka important stop hai. Isko hotel pickup, local transport aur sightseeing flow ke saath plan kiya ja sakta hai.`,
      wiki: wiki(place),
      google: google(place, city.display),
      maps: maps(place, city.display),
      image: placeImage,
      videos: [
        { title: `${place} travel guide`, desc: `${city.display} me ${place} ka realistic travel preview.`, url: youtube(place, city.display) },
        { title: `${city.display} itinerary`, desc: 'Route, stay aur local movement planning video search.', url: youtube(city.display, city.state) }
      ]
    };
  }

  function installCity(city) {
    city.images = imageSets[city.display] || city.images || [
      city.image,
      unsplash(`${city.display} ${city.state} tourism`),
      unsplash(`${city.places[0]} ${city.display}`),
      unsplash(`${city.places[1]} ${city.state} travel`)
    ];
    city.image = city.images[0] || city.image;
    const places = {};
    city.places.forEach((place, index) => {
      places[place] = placeCard(city, place, index);
    });
    data.destinations[city.display] = {
      mapCenter: city.coords,
      defaultPlace: city.places[0],
      ageBands: ageBandsFor(city.places),
      places
    };
    data.heroCities[city.key] = {
      title: `${city.display} package, yatra aur local travel support`,
      subtitle: `${city.state} ke liye realistic place images, age-based recommendations, local transport guidance aur package flow.`,
      slides: city.images,
      landmarks: city.places.slice(0, 5).map(name => ({ name, wiki: wiki(name) }))
    };
  }

  additions.forEach(installCity);

  Object.entries(imageSets).forEach(([cityName, images]) => {
    const destination = data.destinations && data.destinations[cityName];
    if (!destination || !destination.places) return;
    Object.values(destination.places).forEach((place, index) => {
      place.image = images[index % images.length];
    });
    const key = data.cityKeyFromValue ? data.cityKeyFromValue(cityName) : cityName.toLowerCase();
    if (data.heroCities && data.heroCities[key]) {
      data.heroCities[key].slides = images;
    }
  });

  window.EASYTRAVEL_IMAGE_SETS = imageSets;
  window.EASYTRAVEL_IMAGE_FALLBACK = function imageFallback(city, place) {
    const key = fallbackQueries[city] || fallbackQueries[place] || `${place || city || 'India travel'} realistic travel`;
    return unsplash(key);
  };

  const keyToDisplay = {};
  additions.forEach(city => {
    keyToDisplay[city.key] = city.display;
  });

  const originalCityKeyFromValue = data.cityKeyFromValue || ((value) => String(value || 'delhi').toLowerCase());
  const aliasMap = {};
  additions.forEach(city => {
    aliasMap[city.key] = city.key;
    aliasMap[city.display.toLowerCase()] = city.key;
    aliasMap[city.display.toLowerCase().replace(/\s+yatra$/, '')] = city.key;
  });
  Object.assign(aliasMap, {
    'mata vaishno devi': 'vaishno-devi',
    'vaishno devi': 'vaishno-devi',
    'katra': 'vaishno-devi',
    'jammu vaishno devi': 'vaishno-devi',
    'jammu and kashmir vaishno devi': 'vaishno-devi',
    'amarnath cave': 'amarnath',
    'kedarnath dham': 'kedarnath',
    'badrinath dham': 'badrinath',
    'ram mandir': 'ayodhya',
    'ayodhya ram mandir': 'ayodhya',
    'jagannath puri': 'puri',
    'jagannath temple': 'puri',
    'alleppey': 'alleppey',
    'alappuzha': 'alleppey',
    'mysore': 'mysuru',
    'coorg': 'coorg',
    'kodagu': 'coorg',
    'tirumala': 'tirupati',
    'somnath': 'dwarkadhish-somnath',
    'statue of unity': 'statue-of-unity',
    'kevadiya': 'statue-of-unity',
    'bodhgaya': 'bodh-gaya',
    'bodh gaya': 'bodh-gaya',
    'corbett': 'jim-corbett',
    'jim corbett': 'jim-corbett',
    'mount abu': 'mount-abu'
  });

  data.cityKeyFromValue = function cityKeyFromExpandedValue(value) {
    const raw = String(value || '').trim().toLowerCase();
    if (!raw) return originalCityKeyFromValue(value);
    for (const [alias, key] of Object.entries(aliasMap)) {
      if (raw.includes(alias)) return key;
    }
    return originalCityKeyFromValue(value);
  };
  data.destinationNameFromKey = function destinationNameFromKey(key) {
    return keyToDisplay[key] || (String(key || '').charAt(0).toUpperCase() + String(key || '').slice(1));
  };

  const extraStations = [
    'Kedarnath access via Haridwar/Rishikesh',
    'Badrinath access via Haridwar/Rishikesh',
    'Shri Mata Vaishno Devi Katra (SVDK)',
    'Amarnath access via Jammu/Srinagar',
    'Ayodhya Dham Junction (AY)',
    'Mathura Junction (MTJ)',
    'Prayagraj Junction (PRYJ)',
    'Puri (PURI)',
    'Kolkata Howrah (HWH)',
    'Darjeeling access via New Jalpaiguri',
    'Kochi Ernakulam Junction (ERS)',
    'Mysuru Junction (MYS)',
    'Madurai Junction (MDU)',
    'Shirdi Sainagar (SNSI)',
    'Bodh Gaya access via Gaya Junction'
  ];
  data.stations = [...new Set([...(data.stations || []), ...extraStations])];
})();
