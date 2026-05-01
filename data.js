(function(){
  const STATIONS = ["Patna Junction (PNBE)", "Rajendra Nagar Terminal (RJPB)", "Danapur (DNR)", "New Delhi (NDLS)", "Old Delhi (DLI)", "Anand Vihar Terminal (ANVT)", "Mumbai Central (MMCT)", "C Shivaji Maharaj Terminus (CSMT)", "Bandra Terminus (BDTS)", "Lokmanya Tilak Terminus (LTT)", "Chennai Central (MAS)", "Chennai Egmore (MS)", "Bengaluru City Junction (SBC)", "Yesvantpur (YPR)", "Jaipur Junction (JP)", "Udaipur City (UDZ)", "Jaisalmer (JSM)", "Lucknow NR (LKO)", "Agra Cantt (AGC)", "Amritsar Junction (ASR)", "Jammu Tawi (JAT)", "Guwahati (GHY)", "Varanasi Junction (BSB)", "Banaras (BSBS)", "Ahmedabad Junction (ADI)", "Dehradun (DDN)", "Haridwar Junction (HW)", "Rishikesh access via Haridwar", "Shimla (SML)", "Katra (SVDK)", "Puducherry (PDY)", "Rajgir (RGD)", "Lonavala (LNL)", "Ooty / Udagamandalam access", "Shillong access via Guwahati", "Hyderabad Deccan (HYB)", "Secunderabad (SC)", "Rameswaram (RMM)", "Kanyakumari (CAPE)", "Dwarka (DWK)", "Manali access via Chandigarh", "Leh / Ladakh access"];

  const CITY_MAP = {"delhi": {"display": "Delhi", "state": "Delhi", "coords": [28.6139, 77.209], "landmarks": ["India Gate", "Qutub Minar", "Humayun Tomb"], "ageBands": {"0-9": ["National Rail Museum", "Children Park", "Nehru Planetarium"], "10-19": ["India Gate", "National Science Centre", "Adventure Island"], "20-29": ["Red Fort", "Humayun Tomb", "Chandni Chowk food trail"], "30-39": ["Qutub Minar", "Lodhi Garden", "Akshardham"], "40-49": ["India Gate", "Humayun Tomb", "Dilli Haat"], "50-59": ["Bangla Sahib", "Lodhi Garden", "Akshardham"], "60+": ["Lotus Temple", "Bangla Sahib", "Akshardham"]}}, "guwahati": {"display": "Guwahati", "state": "Assam", "coords": [26.1445, 91.7362], "landmarks": ["Kamakhya Temple", "Umananda Island", "Assam State Zoo"], "ageBands": {"0-9": ["Assam State Zoo", "Nehru Park Guwahati", "Accoland"], "10-19": ["Umananda Island", "Assam State Zoo", "Brahmaputra riverfront"], "20-29": ["Kamakhya Temple", "Umananda Island", "Brahmaputra cruise"], "30-39": ["Kamakhya Temple", "Pobitora planning", "Basistha Ashram"], "40-49": ["Kamakhya Temple", "Umananda Island", "Srimanta Sankardev Kalakshetra"], "50-59": ["Kamakhya Temple", "Basistha Ashram", "Navagraha Temple"], "60+": ["Kamakhya Temple", "Umananda Island", "Navagraha Temple"]}}, "dehradun": {"display": "Dehradun", "state": "Uttarakhand", "coords": [30.3165, 78.0322], "landmarks": ["Robber's Cave", "Sahastradhara", "Forest Research Institute"], "ageBands": {"0-9": ["Malsi Deer Park", "Robber's Cave", "Fun Valley"], "10-19": ["Robber's Cave", "Sahastradhara", "Mindrolling Monastery"], "20-29": ["Robber's Cave", "Forest Research Institute", "Sahastradhara"], "30-39": ["Forest Research Institute", "Tapkeshwar Temple", "Sahastradhara"], "40-49": ["Tapkeshwar Temple", "Mindrolling Monastery", "FRI"], "50-59": ["Tapkeshwar Temple", "Mindrolling Monastery", "Sahastradhara"], "60+": ["Tapkeshwar Temple", "Mindrolling Monastery", "Buddha Temple"]}}, "shillong": {"display": "Shillong", "state": "Meghalaya", "coords": [25.5788, 91.8933], "landmarks": ["Umiam Lake", "Elephant Falls", "Shillong Peak"], "ageBands": {"0-9": ["Umiam Lake", "Ward's Lake", "Lady Hydari Park"], "10-19": ["Elephant Falls", "Shillong Peak", "Umiam Lake"], "20-29": ["Laitlum Canyon", "Elephant Falls", "Umiam Lake"], "30-39": ["Shillong Peak", "Umiam Lake", "Cathedral Church"], "40-49": ["Umiam Lake", "Shillong Peak", "Ward's Lake"], "50-59": ["Cathedral Church", "Ward's Lake", "Elephant Falls"], "60+": ["Ward's Lake", "Cathedral Church", "Umiam Lake"]}}, "arunachal": {"display": "Arunachal Pradesh", "state": "Arunachal Pradesh", "coords": [27.0844, 93.6053], "landmarks": ["Tawang Monastery", "Sela Pass", "Ziro Valley"], "ageBands": {"0-9": ["Ziro Valley", "Tawang Monastery", "Itanagar Zoo"], "10-19": ["Sela Pass", "Tawang Monastery", "Ziro Valley"], "20-29": ["Tawang Monastery", "Sela Pass", "Bum La orientation"], "30-39": ["Tawang Monastery", "Ziro Valley", "Namdapha planning"], "40-49": ["Tawang Monastery", "Sela Pass", "Bomdila Monastery"], "50-59": ["Bomdila Monastery", "Tawang Monastery", "Ziro Valley"], "60+": ["Bomdila Monastery", "Tawang Monastery", "Ziro Valley"]}}, "jaipur": {"display": "Jaipur", "state": "Rajasthan", "coords": [26.9124, 75.7873], "landmarks": ["Hawa Mahal", "Amber Fort", "Jal Mahal"], "ageBands": {"0-9": ["Jawahar Circle", "Jhalana Safari view", "Albert Hall lawn"], "10-19": ["Nahargarh Fort", "Jal Mahal", "Birla Mandir"], "20-29": ["Hawa Mahal", "Nahargarh sunset", "Bapu Bazaar"], "30-39": ["Amber Fort", "City Palace", "Patrika Gate"], "40-49": ["Amber Fort", "Birla Mandir", "Jal Mahal"], "50-59": ["Govind Dev Ji Temple", "Birla Mandir", "City Palace"], "60+": ["Govind Dev Ji Temple", "Birla Mandir", "Albert Hall Museum"]}}, "udaipur": {"display": "Udaipur", "state": "Rajasthan", "coords": [24.5854, 73.7125], "landmarks": ["City Palace", "Lake Pichola", "Jagdish Temple"], "ageBands": {"0-9": ["Saheliyon Ki Bari", "Fateh Sagar Boat ride", "Vintage Car Museum"], "10-19": ["City Palace", "Fateh Sagar", "Bagore Ki Haveli"], "20-29": ["Lake Pichola sunset", "City Palace", "Ambrai Ghat"], "30-39": ["City Palace", "Jag Mandir", "Fateh Sagar"], "40-49": ["Lake Pichola cruise", "Sajjangarh", "Jagdish Temple"], "50-59": ["Jagdish Temple", "Saheliyon Ki Bari", "City Palace"], "60+": ["Jagdish Temple", "Saheliyon Ki Bari", "Lake Pichola"]}}, "jaisalmer": {"display": "Jaisalmer", "state": "Rajasthan", "coords": [26.9157, 70.9083], "landmarks": ["Jaisalmer Fort", "Sam Sand Dunes", "Patwon Ki Haveli"], "ageBands": {"0-9": ["Gadisar Lake", "Jaisalmer Fort", "Desert camp easy zone"], "10-19": ["Sam Sand Dunes", "Jaisalmer Fort", "Gadisar Lake"], "20-29": ["Sam Sand Dunes", "Jaisalmer Fort", "Patwon Ki Haveli"], "30-39": ["Jaisalmer Fort", "Patwon Ki Haveli", "Bada Bagh"], "40-49": ["Jaisalmer Fort", "Gadisar Lake", "Sam Dunes sunset"], "50-59": ["Jaisalmer Fort", "Gadisar Lake", "Patwon Ki Haveli"], "60+": ["Jaisalmer Fort", "Gadisar Lake", "Vyas Chhatri"]}}, "srinagar": {"display": "Jammu & Kashmir", "state": "Jammu and Kashmir", "coords": [34.0837, 74.7973], "landmarks": ["Dal Lake", "Mughal Gardens", "Shankaracharya Temple"], "ageBands": {"0-9": ["Nishat Bagh", "Dal Lake shikara", "Pari Mahal lawns"], "10-19": ["Dal Lake", "Gulmarg planning", "Mughal Gardens"], "20-29": ["Dal Lake", "Gulmarg planning", "Shalimar Bagh"], "30-39": ["Dal Lake", "Shankaracharya Temple", "Mughal Gardens"], "40-49": ["Shankaracharya Temple", "Dal Lake", "Nishat Bagh"], "50-59": ["Shankaracharya Temple", "Hazratbal Shrine", "Mughal Gardens"], "60+": ["Hazratbal Shrine", "Shankaracharya Temple", "Dal Lake easy shikara"]}}, "amritsar": {"display": "Amritsar", "state": "Punjab", "coords": [31.634, 74.8723], "landmarks": ["Golden Temple", "Jallianwala Bagh", "Wagah Border"], "ageBands": {"0-9": ["Jallianwala Bagh", "Gobindgarh Fort", "Sadda Pind"], "10-19": ["Wagah Border", "Golden Temple", "Gobindgarh Fort"], "20-29": ["Golden Temple", "Wagah Border", "Heritage Street"], "30-39": ["Golden Temple", "Jallianwala Bagh", "Durgiana Temple"], "40-49": ["Golden Temple", "Jallianwala Bagh", "Wagah Border"], "50-59": ["Golden Temple", "Durgiana Temple", "Jallianwala Bagh"], "60+": ["Golden Temple", "Durgiana Temple", "Heritage Street"]}}, "goa": {"display": "Goa", "state": "Goa", "coords": [15.2993, 74.124], "landmarks": ["Fort Aguada", "Basilica of Bom Jesus", "Calangute Beach"], "ageBands": {"0-9": ["Campal Garden", "Dona Paula", "Miramar Beach"], "10-19": ["Baga Beach", "Fort Aguada", "Snow Park Goa"], "20-29": ["Anjuna", "Calangute Beach", "Fort Aguada"], "30-39": ["Basilica of Bom Jesus", "Candolim", "Dudhsagar planning"], "40-49": ["South Goa calm stays", "Basilica of Bom Jesus", "Dona Paula"], "50-59": ["Old Goa churches", "Miramar promenade", "Fort Aguada"], "60+": ["Basilica of Bom Jesus", "Mangueshi Temple", "Miramar promenade"]}}, "puducherry": {"display": "Puducherry", "state": "Puducherry", "coords": [11.9416, 79.8083], "landmarks": ["Promenade Beach", "Auroville", "Paradise Beach"], "ageBands": {"0-9": ["Promenade Beach", "Botanical Garden", "Paradise Beach"], "10-19": ["Auroville", "Promenade Beach", "Paradise Beach"], "20-29": ["French Quarter", "Auroville", "Rock Beach"], "30-39": ["Auroville", "Basilica of the Sacred Heart", "Promenade Beach"], "40-49": ["Aurobindo Ashram", "Promenade Beach", "Paradise Beach"], "50-59": ["Aurobindo Ashram", "Basilica Church", "Promenade Beach"], "60+": ["Aurobindo Ashram", "Promenade Beach", "French Quarter walk"]}}, "rajgir": {"display": "Rajgir", "state": "Bihar", "coords": [25.0173, 85.4245], "landmarks": ["Vishwa Shanti Stupa", "Rajgir Ropeway", "Cyclopean Wall"], "ageBands": {"0-9": ["Nature Safari Rajgir", "Venu Van", "Ropeway"], "10-19": ["Vishwa Shanti Stupa", "Ropeway", "Hot Springs"], "20-29": ["Vishwa Shanti Stupa", "Cyclopean Wall", "Son Bhandar Caves"], "30-39": ["Vishwa Shanti Stupa", "Ajatshatru Fort", "Venu Van"], "40-49": ["Ropeway", "Hot Springs", "Vishwa Shanti Stupa"], "50-59": ["Vishwa Shanti Stupa", "Hot Springs", "Jivaka's Mango Garden"], "60+": ["Vishwa Shanti Stupa", "Venu Van", "Hot Springs"]}}, "lonavala": {"display": "Lonavala", "state": "Maharashtra", "coords": [18.7546, 73.4062], "landmarks": ["Tiger Point", "Bhushi Dam", "Karla Caves"], "ageBands": {"0-9": ["Bhushi Dam", "Della kids zone", "Wax Museum"], "10-19": ["Tiger Point", "Bhushi Dam", "Karla Caves"], "20-29": ["Tiger Point", "Lonavala Lake", "Lion Point"], "30-39": ["Karla Caves", "Bhushi Dam", "Tiger Point"], "40-49": ["Karla Caves", "Bhaja Caves", "Tiger Point"], "50-59": ["Karla Caves", "Lonavala Lake", "Narayani Dham"], "60+": ["Narayani Dham", "Karla Caves", "Lonavala Lake"]}}, "mussoorie": {"display": "Mussoorie", "state": "Uttarakhand", "coords": [30.4598, 78.0644], "landmarks": ["Kempty Falls", "Gun Hill", "Mall Road Mussoorie"], "ageBands": {"0-9": ["Company Garden", "Kempty Falls", "Mall Road"], "10-19": ["Gun Hill", "Kempty Falls", "George Everest House"], "20-29": ["Lal Tibba", "Mall Road Mussoorie", "George Everest House"], "30-39": ["Kempty Falls", "Lal Tibba", "Gun Hill"], "40-49": ["Lal Tibba", "Camel's Back Road", "Gun Hill"], "50-59": ["Camel's Back Road", "Christ Church", "Lal Tibba"], "60+": ["Christ Church", "Mall Road Mussoorie", "Lal Tibba"]}}, "lucknow": {"display": "Lucknow", "state": "Uttar Pradesh", "coords": [26.8467, 80.9462], "landmarks": ["Bara Imambara", "Rumi Darwaza", "Ambedkar Memorial Park"], "ageBands": {"0-9": ["Janeshwar Mishra Park", "Lucknow Zoo", "Marine Drive Lucknow"], "10-19": ["Bara Imambara", "Rumi Darwaza", "Lucknow Zoo"], "20-29": ["Hazratganj", "Ambedkar Memorial Park", "Bara Imambara"], "30-39": ["Bara Imambara", "Chota Imambara", "Rumi Darwaza"], "40-49": ["Ambedkar Memorial Park", "Bara Imambara", "Rumi Darwaza"], "50-59": ["Chota Imambara", "Bara Imambara", "Hanuman Setu"], "60+": ["Chota Imambara", "Hanuman Setu", "Residency"]}}, "agra": {"display": "Agra", "state": "Uttar Pradesh", "coords": [27.1767, 78.0081], "landmarks": ["Taj Mahal", "Agra Fort", "Mehtab Bagh"], "ageBands": {"0-9": ["Taj Nature Walk", "Agra Fort", "Mehtab Bagh"], "10-19": ["Taj Mahal", "Agra Fort", "Mehtab Bagh"], "20-29": ["Taj Mahal sunrise", "Mehtab Bagh", "Sadar Bazaar"], "30-39": ["Taj Mahal", "Agra Fort", "Fatehpur Sikri planning"], "40-49": ["Taj Mahal", "Agra Fort", "Mehtab Bagh"], "50-59": ["Taj Mahal", "Itmad-ud-Daulah", "Agra Fort"], "60+": ["Taj Mahal", "Itmad-ud-Daulah", "Mehtab Bagh"]}}, "ujjain": {"display": "Ujjain", "state": "Madhya Pradesh", "coords": [23.1765, 75.7885], "landmarks": ["Mahakaleshwar Temple", "Kal Bhairav Temple", "Ram Ghat"], "ageBands": {"0-9": ["Ram Ghat", "Jantar Mantar Ujjain", "Kaliyadeh Palace"], "10-19": ["Mahakaleshwar Temple", "Ram Ghat", "Kal Bhairav Temple"], "20-29": ["Mahakaleshwar Temple", "Ram Ghat", "Harsiddhi Temple"], "30-39": ["Mahakaleshwar Temple", "Kal Bhairav Temple", "Harsiddhi Temple"], "40-49": ["Mahakaleshwar Temple", "Kal Bhairav Temple", "Ram Ghat"], "50-59": ["Mahakaleshwar Temple", "Harsiddhi Temple", "Mangalnath Temple"], "60+": ["Mahakaleshwar Temple", "Harsiddhi Temple", "Mangalnath Temple"]}}, "chennai": {"display": "Chennai", "state": "Tamil Nadu", "coords": [13.0827, 80.2707], "landmarks": ["Marina Beach", "Kapaleeshwarar Temple", "Mahabalipuram day trip"], "ageBands": {"0-9": ["Semmozhi Poonga", "Marina Beach kids area", "VGP Marine zone"], "10-19": ["Marina Beach", "Guindy National Park", "Snow Kingdom"], "20-29": ["Marina Beach", "Elliot Beach", "Phoenix Marketcity"], "30-39": ["Kapaleeshwarar Temple", "DakshinaChitra", "Mahabalipuram day trip"], "40-49": ["Marina Beach sunrise", "San Thome Basilica", "Kapaleeshwarar Temple"], "50-59": ["Kapaleeshwarar Temple", "San Thome Basilica", "Government Museum"], "60+": ["Kapaleeshwarar Temple", "San Thome Basilica", "Marina promenade"]}}, "bengaluru": {"display": "Bengaluru", "state": "Karnataka", "coords": [12.9716, 77.5946], "landmarks": ["Lalbagh", "Bangalore Palace", "Cubbon Park"], "ageBands": {"0-9": ["Cubbon Park", "Bannerghatta easy zone", "Visvesvaraya Museum"], "10-19": ["Lalbagh", "Wonderla planning", "Visvesvaraya Museum"], "20-29": ["Church Street", "Cubbon Park", "Bangalore Palace"], "30-39": ["Lalbagh", "Bangalore Palace", "Nandi Hills day trip"], "40-49": ["ISKCON Bangalore", "Lalbagh", "Bangalore Palace"], "50-59": ["ISKCON Bangalore", "Cubbon Park", "Bull Temple"], "60+": ["ISKCON Bangalore", "Bull Temple", "Lalbagh"]}}, "kanyakumari": {"display": "Kanyakumari", "state": "Tamil Nadu", "coords": [8.0883, 77.5385], "landmarks": ["Vivekananda Rock Memorial", "Thiruvalluvar Statue", "Sunset Point Kanyakumari"], "ageBands": {"0-9": ["Sunset Point Kanyakumari", "Beach walk", "Wax Museum"], "10-19": ["Vivekananda Rock Memorial", "Thiruvalluvar Statue", "Sunrise Point"], "20-29": ["Sunrise Point", "Vivekananda Rock Memorial", "Thiruvalluvar Statue"], "30-39": ["Vivekananda Rock Memorial", "Thiruvalluvar Statue", "Kanyakumari Beach"], "40-49": ["Vivekananda Rock Memorial", "Kumari Amman Temple", "Sunset Point Kanyakumari"], "50-59": ["Kumari Amman Temple", "Vivekananda Rock Memorial", "Thiruvalluvar Statue"], "60+": ["Kumari Amman Temple", "Sunset Point Kanyakumari", "Vivekananda Rock Memorial"]}}, "rameshwaram": {"display": "Rameshwaram", "state": "Tamil Nadu", "coords": [9.2881, 79.3129], "landmarks": ["Ramanathaswamy Temple", "Dhanushkodi", "Pamban Bridge"], "ageBands": {"0-9": ["Pamban Bridge", "APJ Memorial", "Dhanushkodi beach"], "10-19": ["Dhanushkodi", "Pamban Bridge", "Ramanathaswamy Temple"], "20-29": ["Dhanushkodi", "Pamban Bridge", "Kothandaramaswamy Temple"], "30-39": ["Ramanathaswamy Temple", "Dhanushkodi", "Pamban Bridge"], "40-49": ["Ramanathaswamy Temple", "Pamban Bridge", "Agni Theertham"], "50-59": ["Ramanathaswamy Temple", "Agni Theertham", "Panchmukhi Hanuman Temple"], "60+": ["Ramanathaswamy Temple", "Agni Theertham", "Pamban Bridge view"]}}, "ahmedabad": {"display": "Ahmedabad", "state": "Gujarat", "coords": [23.0225, 72.5714], "landmarks": ["Sabarmati Ashram", "Adalaj Stepwell", "Kankaria Lake"], "ageBands": {"0-9": ["Kankaria Lake", "Science City Ahmedabad", "Zoo Kankaria"], "10-19": ["Sabarmati Riverfront", "Kankaria Lake", "Science City Ahmedabad"], "20-29": ["Sabarmati Riverfront", "Adalaj Stepwell", "Manek Chowk"], "30-39": ["Sabarmati Ashram", "Adalaj Stepwell", "Riverfront"], "40-49": ["Sabarmati Ashram", "Kankaria Lake", "Akshardham Gandhinagar day trip"], "50-59": ["Sabarmati Ashram", "Adalaj Stepwell", "Swaminarayan Temple"], "60+": ["Sabarmati Ashram", "Swaminarayan Temple", "Kankaria Lake"]}}, "dwarka": {"display": "Dwarka", "state": "Gujarat", "coords": [22.2442, 68.9685], "landmarks": ["Dwarkadhish Temple", "Bet Dwarka", "Rukmini Temple"], "ageBands": {"0-9": ["Dwarka Beach", "Bet Dwarka boat", "Rukmini Temple"], "10-19": ["Dwarkadhish Temple", "Bet Dwarka", "Dwarka Beach"], "20-29": ["Dwarkadhish Temple", "Bet Dwarka", "Shivrajpur Beach"], "30-39": ["Dwarkadhish Temple", "Rukmini Temple", "Bet Dwarka"], "40-49": ["Dwarkadhish Temple", "Rukmini Temple", "Nageshwar Jyotirlinga"], "50-59": ["Dwarkadhish Temple", "Nageshwar Jyotirlinga", "Rukmini Temple"], "60+": ["Dwarkadhish Temple", "Rukmini Temple", "Bet Dwarka easy boat"]}}, "manali": {"display": "Manali", "state": "Himachal Pradesh", "coords": [32.2432, 77.1892], "landmarks": ["Solang Valley", "Hadimba Temple", "Mall Road Manali"], "ageBands": {"0-9": ["Van Vihar", "Solang Valley", "Hidimba Temple"], "10-19": ["Solang Valley", "Mall Road Manali", "Jogini Falls"], "20-29": ["Solang Valley", "Old Manali", "Atal Tunnel side trip"], "30-39": ["Hadimba Temple", "Solang Valley", "Naggar Castle"], "40-49": ["Hadimba Temple", "Mall Road Manali", "Solang Valley"], "50-59": ["Hadimba Temple", "Vashisht Temple", "Naggar Castle"], "60+": ["Hadimba Temple", "Vashisht Temple", "Mall Road Manali"]}}, "shimla": {"display": "Shimla", "state": "Himachal Pradesh", "coords": [31.1048, 77.1734], "landmarks": ["The Ridge", "Mall Road Shimla", "Jakhoo Temple"], "ageBands": {"0-9": ["Kufri Fun World", "The Ridge", "Himalayan Nature Park"], "10-19": ["Kufri", "The Ridge", "Mall Road Shimla"], "20-29": ["The Ridge", "Mall Road Shimla", "Kufri"], "30-39": ["Jakhoo Temple", "Christ Church Shimla", "The Ridge"], "40-49": ["Jakhoo Temple", "The Ridge", "Mall Road Shimla"], "50-59": ["Jakhoo Temple", "Christ Church Shimla", "The Ridge"], "60+": ["Jakhoo Temple", "Christ Church Shimla", "Mall Road Shimla"]}}, "ladakh": {"display": "Ladakh", "state": "Ladakh", "coords": [34.1526, 77.577], "landmarks": ["Pangong Lake", "Leh Palace", "Shanti Stupa Leh"], "ageBands": {"0-9": ["Hall of Fame", "Shanti Stupa Leh", "Leh Market"], "10-19": ["Pangong Lake", "Shanti Stupa Leh", "Leh Palace"], "20-29": ["Pangong Lake", "Nubra Valley planning", "Leh Market"], "30-39": ["Shanti Stupa Leh", "Leh Palace", "Magnetic Hill"], "40-49": ["Shanti Stupa Leh", "Hall of Fame", "Pangong Lake"], "50-59": ["Shanti Stupa Leh", "Leh Palace", "Hall of Fame"], "60+": ["Shanti Stupa Leh", "Leh Palace", "Leh Market"]}}, "ooty": {"display": "Ooty", "state": "Tamil Nadu", "coords": [11.4064, 76.6932], "landmarks": ["Ooty Lake", "Botanical Garden Ooty", "Doddabetta Peak"], "ageBands": {"0-9": ["Ooty Lake", "Toy Train Ooty", "Botanical Garden Ooty"], "10-19": ["Doddabetta Peak", "Ooty Lake", "Botanical Garden Ooty"], "20-29": ["Doddabetta Peak", "Tea Museum Ooty", "Pykara Lake"], "30-39": ["Botanical Garden Ooty", "Ooty Lake", "Doddabetta Peak"], "40-49": ["Rose Garden Ooty", "Botanical Garden Ooty", "Ooty Lake"], "50-59": ["Botanical Garden Ooty", "Rose Garden Ooty", "Ooty Lake"], "60+": ["Botanical Garden Ooty", "Ooty Lake", "Tea Museum Ooty"]}}, "andhra": {"display": "Andhra Pradesh", "state": "Andhra Pradesh", "coords": [16.5062, 80.648], "landmarks": ["Tirupati Balaji", "Araku Valley", "Borra Caves"], "ageBands": {"0-9": ["Araku Valley", "RK Beach Vizag", "Borra Caves"], "10-19": ["Araku Valley", "RK Beach Vizag", "Borra Caves"], "20-29": ["Araku Valley", "Rushikonda Beach", "Lambasingi planning"], "30-39": ["Tirupati Balaji", "Araku Valley", "Borra Caves"], "40-49": ["Tirupati Balaji", "RK Beach Vizag", "Borra Caves"], "50-59": ["Tirupati Balaji", "Kanaka Durga Temple", "Araku Valley"], "60+": ["Tirupati Balaji", "Kanaka Durga Temple", "RK Beach Vizag"]}}, "hyderabad": {"display": "Hyderabad", "state": "Telangana", "coords": [17.385, 78.4867], "landmarks": ["Charminar", "Golconda Fort", "Birla Mandir Hyderabad"], "ageBands": {"0-9": ["Nehru Zoological Park", "Lumbini Park", "Snow World"], "10-19": ["Charminar", "Golconda Fort", "Ramoji Film City"], "20-29": ["Charminar night area", "Durgam Cheruvu", "Hitech cafe belt"], "30-39": ["Golconda Fort", "Birla Mandir Hyderabad", "Salar Jung Museum"], "40-49": ["Birla Mandir Hyderabad", "Golconda Fort", "Hussain Sagar"], "50-59": ["Birla Mandir Hyderabad", "Salar Jung Museum", "Charminar"], "60+": ["Birla Mandir Hyderabad", "Salar Jung Museum", "Hussain Sagar easy ride"]}}, "varanasi": {"display": "Varanasi", "state": "Uttar Pradesh", "coords": [25.3176, 82.9739], "landmarks": ["Kashi Vishwanath", "Dashashwamedh Ghat", "Sarnath"], "ageBands": {"0-9": ["Assi Ghat boat view", "Sarnath", "Ramnagar Fort lawn"], "10-19": ["Dashashwamedh Ghat", "Sarnath", "Assi Ghat"], "20-29": ["Kashi Vishwanath", "Dashashwamedh Ghat", "Ganga Aarti experience"], "30-39": ["Kashi Vishwanath", "Sarnath", "Assi Ghat"], "40-49": ["Kashi Vishwanath", "Dashashwamedh Ghat", "Sarnath"], "50-59": ["Kashi Vishwanath", "Sankat Mochan Temple", "Dashashwamedh Ghat"], "60+": ["Kashi Vishwanath", "Dashashwamedh Ghat", "Sarnath"]}}, "haridwar": {"display": "Haridwar", "state": "Uttarakhand", "coords": [29.9457, 78.1642], "landmarks": ["Har Ki Pauri", "Mansa Devi Temple", "Chandi Devi Temple"], "ageBands": {"0-9": ["Har Ki Pauri", "Bharat Mata Mandir", "Rajaji outlook"], "10-19": ["Har Ki Pauri", "Mansa Devi Temple", "Ganga Aarti"], "20-29": ["Har Ki Pauri", "Mansa Devi Temple", "Chandi Devi Temple"], "30-39": ["Har Ki Pauri", "Chandi Devi Temple", "Daksha Mahadev Temple"], "40-49": ["Har Ki Pauri", "Mansa Devi Temple", "Daksha Mahadev Temple"], "50-59": ["Har Ki Pauri", "Mansa Devi Temple", "Chandi Devi Temple"], "60+": ["Har Ki Pauri", "Mansa Devi Temple", "Chandi Devi Temple"]}}, "rishikesh": {"display": "Rishikesh", "state": "Uttarakhand", "coords": [30.0869, 78.2676], "landmarks": ["Lakshman Jhula", "Ram Jhula", "Triveni Ghat"], "ageBands": {"0-9": ["Triveni Ghat", "Beatles Ashram garden", "Parmarth Niketan"], "10-19": ["Lakshman Jhula", "Triveni Ghat", "Neer Garh Waterfall"], "20-29": ["Lakshman Jhula", "River rafting zone", "Beatles Ashram"], "30-39": ["Ram Jhula", "Parmarth Niketan", "Triveni Ghat"], "40-49": ["Triveni Ghat", "Parmarth Niketan", "Lakshman Jhula"], "50-59": ["Triveni Ghat", "Parmarth Niketan", "Ram Jhula"], "60+": ["Triveni Ghat", "Parmarth Niketan", "Ram Jhula"]}}, "mumbai": {"display": "Mumbai", "state": "Maharashtra", "coords": [19.076, 72.8777], "landmarks": ["Gateway of India", "Marine Drive", "Elephanta Caves"], "ageBands": {"0-9": ["Nehru Science Centre", "Taraporewala Aquarium", "Juhu Beach"], "10-19": ["Gateway of India", "Marine Drive", "EsselWorld zone"], "20-29": ["Bandra Fort", "Marine Drive", "Colaba Causeway"], "30-39": ["Gateway of India", "Kala Ghoda", "Elephanta Caves"], "40-49": ["Siddhivinayak Temple", "Bandra sea face", "Elephanta Caves"], "50-59": ["Haji Ali Dargah", "Gateway of India", "Sanjay Gandhi National Park"], "60+": ["Siddhivinayak Temple", "Haji Ali Dargah", "Marine Drive sunset"]}}};
  const PLACE_COORDS = {"Kamakhya Temple": [26.1665, 91.7056], "Umananda Island": [26.1867, 91.7512], "Assam State Zoo": [26.1679, 91.7818], "Robber's Cave": [30.3872, 78.0776], "Sahastradhara": [30.3879, 78.1318], "Forest Research Institute": [30.3438, 77.999], "Umiam Lake": [25.6706, 91.9145], "Elephant Falls": [25.5419, 91.8479], "Shillong Peak": [25.5704, 91.8553], "Tawang Monastery": [27.586, 91.863], "Sela Pass": [27.501, 92.1047], "Ziro Valley": [27.5883, 93.8289], "Jaisalmer Fort": [26.9124, 70.9151], "Sam Sand Dunes": [26.828, 70.495], "Patwon Ki Haveli": [26.9155, 70.9112], "Golden Temple": [31.62, 74.8765], "Jallianwala Bagh": [31.6206, 74.8801], "Wagah Border": [31.6044, 74.572], "Promenade Beach": [11.9341, 79.8351], "Auroville": [12.0054, 79.8083], "Paradise Beach": [11.895, 79.8158], "Vishwa Shanti Stupa": [25.005, 85.4211], "Rajgir Ropeway": [25.0089, 85.4205], "Cyclopean Wall": [25.0186, 85.4201], "Tiger Point": [18.6969, 73.3898], "Bhushi Dam": [18.7428, 73.3969], "Karla Caves": [18.783, 73.471], "Kempty Falls": [30.4895, 78.0367], "Gun Hill": [30.4594, 78.0667], "Mall Road Mussoorie": [30.4567, 78.0718], "Bara Imambara": [26.8695, 80.912], "Rumi Darwaza": [26.869, 80.9128], "Ambedkar Memorial Park": [26.8438, 80.9876], "Mahakaleshwar Temple": [23.1828, 75.7681], "Kal Bhairav Temple": [23.1839, 75.7602], "Ram Ghat": [23.1814, 75.7888], "Vivekananda Rock Memorial": [8.078, 77.5548], "Thiruvalluvar Statue": [8.0774, 77.555], "Sunset Point Kanyakumari": [8.0793, 77.5502], "Ramanathaswamy Temple": [9.2881, 79.3174], "Dhanushkodi": [9.1749, 79.426], "Pamban Bridge": [9.2863, 79.192], "Sabarmati Ashram": [23.0609, 72.58], "Adalaj Stepwell": [23.1653, 72.5811], "Kankaria Lake": [22.9907, 72.6018], "Dwarkadhish Temple": [22.2394, 68.9678], "Bet Dwarka": [22.4639, 69.1352], "Rukmini Temple": [22.254, 68.9523], "Solang Valley": [32.3169, 77.155], "Hadimba Temple": [32.2396, 77.1887], "Mall Road Manali": [32.2435, 77.1891], "The Ridge": [31.104, 77.1734], "Mall Road Shimla": [31.1048, 77.1746], "Jakhoo Temple": [31.1047, 77.1884], "Pangong Lake": [33.7388, 78.9629], "Leh Palace": [34.1642, 77.5848], "Shanti Stupa Leh": [34.1643, 77.592], "Ooty Lake": [11.4068, 76.7011], "Botanical Garden Ooty": [11.4201, 76.7111], "Doddabetta Peak": [11.4074, 76.7351], "Tirupati Balaji": [13.6833, 79.3477], "Araku Valley": [18.327, 82.8802], "Borra Caves": [18.279, 83.0422], "Charminar": [17.3616, 78.4747], "Golconda Fort": [17.3833, 78.4011], "Birla Mandir Hyderabad": [17.4062, 78.4691]};


  const PLACE_IMAGE_OVERRIDES = {
    'Guwahati::Umananda Temple': '/place-assets/guwahati-rain-view.jpg',
    'Guwahati::Brahmaputra River Cruise': '/place-assets/guwahati-river-view.jpg',
    'Guwahati::Kamakhya Temple': '/place-assets/guwahati-sign.jpg',
    'Delhi::Red Fort': '/place-assets/delhi-india-gate-place.jpg',
    'Delhi::India Gate': '/place-assets/delhi-india-gate-place.jpg',
    'Dwarka::Dwarkadhish Temple': '/place-assets/dwarka-temple-main.jpg',
    'Dwarka::Shivrajpur Beach': '/place-assets/dwarka-sunset-birds.jpg',
    'Dwarka::Nageshwar Jyotirlinga': '/place-assets/dwarka-shiv-statue.jpg',
    'Rameshwaram::Dhanushkodi': '/place-assets/rameshwaram-sea-waves.jpg',
    'Rameshwaram::Ramanathaswamy Temple': '/place-assets/rameshwaram-temple-front.jpg',
    'Rameshwaram::Pamban Bridge': '/place-assets/rameshwaram-sea.jpg'
  };

  
const SERIAL_CITY_PLACE_IMAGE = {
  Jaipur: '/place-assets/jaipur-hawa-mahal.jpg',
  Haridwar: '/place-assets/haridwar-main.jpg',
  Rishikesh: '/place-assets/rishikesh-main.jpg',
  Guwahati: '/place-assets/guwahati-kamakhya-main.jpg',
  Gauhati: '/place-assets/guwahati-kamakhya-main.jpg',
  Varanasi: '/place-assets/varanasi-kashi-main.jpg',
  Kashi: '/place-assets/varanasi-kashi-main.jpg',
  Rameshwaram: '/place-assets/rameshwaram-main.jpg',
  Dwarka: '/place-assets/dwarka-main.jpg',
  Dwarika: '/place-assets/dwarka-main.jpg',
  Mumbai: '/place-assets/mumbai-main.jpg'
};

const placeImage = (city, place) => SERIAL_CITY_PLACE_IMAGE[city] || SERIAL_CITY_PLACE_IMAGE[place] || '/assets/hero-show-1.png';

  const wikiLink = (place) => `https://en.wikipedia.org/wiki/${encodeURIComponent(place).replace(/%20/g,'_')}`;
  const googleSearch = (place, city) => `https://www.google.com/search?q=${encodeURIComponent(place + ' ' + city + ' travel')}`;
  const youtubeSearch = (place, city) => `https://www.youtube.com/results?search_query=${encodeURIComponent(place + ' ' + city + ' travel guide')}`;
  const mapsLink = (place, city) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place + ', ' + city + ', India')}`;
  function normalizeInput(v){ return (v||'').trim().toLowerCase(); }
  const aliases = {"delhi": "delhi", "new delhi": "delhi", "gauhati": "guwahati", "guwahati": "guwahati", "ghy": "guwahati", "assam": "guwahati", "dehradun": "dehradun", "varanasi": "varanasi", "banaras": "varanasi", "kashi": "varanasi", "haridwar": "haridwar", "rishikesh": "rishikesh", "uttarakhand": "dehradun", "uttrakhand": "dehradun", "meghalaya": "shillong", "shillong": "shillong", "shilong": "shillong", "arunachal pradesh": "arunachal", "arunachal": "arunachal", "tawang": "arunachal", "rajasthan": "jaipur", "jaipur": "jaipur", "udaipur": "udaipur", "jaisalmer": "jaisalmer", "jammu and kashmir": "srinagar", "jammu & kashmir": "srinagar", "jammu": "srinagar", "kashmir": "srinagar", "srinagar": "srinagar", "ladakh": "ladakh", "punjab": "amritsar", "amritsar": "amritsar", "goa": "goa", "puducherry": "puducherry", "pondicherry": "puducherry", "punducherry": "puducherry", "rajgir": "rajgir", "lonavala": "lonavala", "lonawala": "lonavala", "mussoorie": "mussoorie", "masoori": "mussoorie", "mussorie": "mussoorie", "lucknow": "lucknow", "agra": "agra", "ujjain": "ujjain", "chennai": "chennai", "madras": "chennai", "tamil nadu": "chennai", "tamilnadu": "chennai", "bengaluru": "bengaluru", "bangalore": "bengaluru", "bengluru": "bengaluru", "kanyakumari": "kanyakumari", "rameshwaram": "rameshwaram", "gujarat": "ahmedabad", "ahmedabad": "ahmedabad", "ahmdabad": "ahmedabad", "dwarka": "dwarka", "manali": "manali", "shimla": "shimla", "ooty": "ooty", "ooti": "ooty", "andhra pradesh": "andhra", "andhra": "andhra", "tirupati": "andhra", "visakhapatnam": "andhra", "vizag": "andhra", "hyderabad": "hyderabad", "hydrabad": "hyderabad", "mumbai": "mumbai", "maharashtra": "mumbai"};
  function cityKeyFromValue(v){
    const raw = normalizeInput(v);
    if(!raw) return 'delhi';
    for(const [alias,key] of Object.entries(aliases)){ if(raw.includes(alias)) return key; }
    return 'delhi';
  }
  function ageBand(age){
    if(age <= 9) return '0-9';
    if(age <= 19) return '10-19';
    if(age <= 29) return '20-29';
    if(age <= 39) return '30-39';
    if(age <= 49) return '40-49';
    if(age <= 59) return '50-59';
    return '60+';
  }
  const CITY_SLIDE_OVERRIDES = {
    'Guwahati': [
      '/place-assets/guwahati-kamakhya-main.jpg',
      '/place-assets/guwahati-rain-view.jpg',
      '/place-assets/guwahati-river-view.jpg',
      '/place-assets/guwahati-sign.jpg'
    ],
    'Dwarka': [
      '/place-assets/dwarka-shiv-statue-wide.jpg',
      '/place-assets/dwarka-red-temple.jpg',
      '/place-assets/dwarka-temple-main.jpg',
      '/place-assets/dwarka-temple-flag-close.jpg',
      '/place-assets/dwarka-sunset-birds.jpg'
    ],
    'Rameshwaram': [
      '/place-assets/rameshwaram-corridor.jpg',
      '/place-assets/rameshwaram-temple-front.jpg',
      '/place-assets/rameshwaram-sea-waves.jpg'
    ]
  };

function slideImages(display, state, landmarks){
    if (CITY_SLIDE_OVERRIDES && CITY_SLIDE_OVERRIDES[display]) return CITY_SLIDE_OVERRIDES[display];
    if (CITY_SLIDE_OVERRIDES[display]) return CITY_SLIDE_OVERRIDES[display];
    return [
      `https://source.unsplash.com/featured/1600x900/?${encodeURIComponent(display + ' ' + state + ' India skyline')}`,
      `https://source.unsplash.com/featured/1600x900/?${encodeURIComponent((landmarks[0]||display) + ' India')}`,
      `https://source.unsplash.com/featured/1600x900/?${encodeURIComponent((landmarks[1]||display) + ' ' + state + ' travel')}`
    ];
  }
  function buildCityObjects(){
    const destinations={};
    const heroCities={};
    Object.entries(CITY_MAP).forEach(([key,city])=>{
      const places={};
      const uniquePlaces = [...new Set(Object.values(city.ageBands).flat())];
      uniquePlaces.forEach(name=>{
        const coords = PLACE_COORDS[name] || city.coords;
        places[name] = {
          name,
          city: city.display,
          summary: `${name} ${city.display} ke highlighted attractions me se ek hai. Age, travel mood, family comfort aur arrival planning ke hisaab se EasyTravel is jagah ko recommend karta hai.`,
          coords,
          bestFor: `${city.state} travel, local discovery, arrival ke baad smart city exploration`,
          distance: `Hotel ya station location ke hisaab se distance change hoga. Map open karke exact route dekha ja sakta hai.`,
          image: placeImage(city.display,name),
          videos: [
            {title:`${name} travel guide`, desc:`${name} ka travel guide aur arrival experience videos.`, url: youtubeSearch(name,city.display)},
            {title:`${name} vlog / walkthrough`, desc:`${name} ke vlog, walkthrough aur local experience clips.`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' ' + city.display + ' vlog walkthrough')}`}
          ],
          wiki: wikiLink(name),
          google: googleSearch(name,city.display),
          maps: mapsLink(name,city.display)
        };
      });
      destinations[city.display] = { mapCenter:city.coords, defaultPlace:city.landmarks[0], ageBands:city.ageBands, places };
      heroCities[key]={ title:`${city.display} travel, booking aur city planning ek saath.`, subtitle:`Ticket discovery ke saath age-based famous places, map access, video links, station arrival comfort aur stay planning.`, slides: slideImages(city.display, city.state, city.landmarks), landmarks: city.landmarks.map(name=>({name,wiki:wikiLink(name)})) };
    });
    return {destinations,heroCities};
  }
  const built = buildCityObjects();

  function haversineKm(a, b){
    if(!a || !b) return 850;
    const toRad = d => (d * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(b[0] - a[0]);
    const dLon = toRad(b[1] - a[1]);
    const lat1 = toRad(a[0]);
    const lat2 = toRad(b[0]);
    const x = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
    return Math.round(R * y);
  }

  function estimateRouteKm(from, to){
    const fromKey = cityKeyFromValue(from);
    const toKey = cityKeyFromValue(to);
    const fromCoords = CITY_MAP[fromKey]?.coords;
    const toCoords = CITY_MAP[toKey]?.coords;
    return haversineKm(fromCoords, toCoords);
  }

  function fareByKm(km, multiplier){
    const base = 250;
    const value = base + (km * multiplier);
    return '₹' + Math.round(value / 10) * 10;
  }

  function trainRoute(from,to){
    const key = cityKeyFromValue(to);
    const city = CITY_MAP[key]?.display || 'Delhi';
    const km = estimateRouteKm(from,to);
    const baseHours = Math.max(6, Math.round(km / 85));
    return [
      {name:`Rajdhani Express to ${city}`, no:'12951', dep:'06:10', arr:'14:20', duration:`${baseHours}h 10m`, fare:fareByKm(km, 2.2), distance:`Approx ${km} km`},
      {name:`Superfast Express to ${city}`, no:'12491', dep:'13:40', arr:'23:55', duration:`${baseHours + 2}h 05m`, fare:fareByKm(km, 1.7), distance:`Approx ${km} km`},
      {name:`Night Mail to ${city}`, no:'12809', dep:'21:15', arr:'07:30', duration:`${baseHours + 3}h 00m`, fare:fareByKm(km, 1.35), distance:`Approx ${km} km`}
    ];
  }
  function busRoute(from,to){
    const key = cityKeyFromValue(to); const title=CITY_MAP[key]?.display || 'Delhi';
    const km = estimateRouteKm(from,to);
    return [
      {name:`Sleeper Coach to ${title}`, dep:'18:30', arr:'06:15', duration:'11h 45m', price:fareByKm(km, 1.15), rating:'4.4', seats:'18 seats left'},
      {name:`Volvo Multi-Axle to ${title}`, dep:'20:00', arr:'07:45', duration:'11h 45m', price:fareByKm(km, 1.55), rating:'4.6', seats:'12 seats left'},
      {name:`Seater/Sleeper to ${title}`, dep:'22:10', arr:'09:50', duration:'11h 40m', price:fareByKm(km, 0.98), rating:'4.1', seats:'23 seats left'}
    ];
  }
  function hotelRoute(from,to){
    const key = cityKeyFromValue(to); const title=CITY_MAP[key]?.display || 'Delhi';
    return [
      {name:`Sleeper Coach to ${title}`, dep:'18:30', arr:'06:15', duration:'11h 45m', price:'₹1,150', rating:'4.4', seats:'18 seats left'},
      {name:`Volvo Multi-Axle to ${title}`, dep:'20:00', arr:'07:45', duration:'11h 45m', price:'₹1,650', rating:'4.6', seats:'12 seats left'},
      {name:`Seater/Sleeper to ${title}`, dep:'22:10', arr:'09:50', duration:'11h 40m', price:'₹980', rating:'4.1', seats:'23 seats left'}
    ];
  }
  function hotelRoute(to){
    const key = cityKeyFromValue(to); const title=CITY_MAP[key]?.display || 'Delhi';
    return [
      {name:`Business Stay ${title} Central`, area:`Near ${title} station/business district`, price:'₹3,200 / night', vibe:'Official work + quick city access', rating:'4.3', distance:'Approx 15–25 min from arrival point'},
      {name:`Comfort Inn ${title}`, area:`Popular local cluster`, price:'₹2,450 / night', vibe:'Budget + family friendly', rating:'4.1', distance:'Approx 10–20 min from station/bus stop'},
      {name:`Premium Suites ${title}`, area:`City landmark side`, price:'₹4,950 / night', vibe:'Premium stay + pickup support concept', rating:'4.6', distance:'Approx 20–35 min from arrival point'}
    ];
  }
  window.EASYTRAVEL_DATA = { stations: STATIONS, heroCities: built.heroCities, destinations: built.destinations, cityKeyFromValue, ageBand, trains: {}, buses: {}, hotels: {}, dynamicTrainRoute: trainRoute, dynamicBusRoute: busRoute, dynamicHotelRoute: hotelRoute };
})();
