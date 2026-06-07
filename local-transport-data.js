(function () {
  const defaultLinks = {
    cab: [
      { label: 'Book Ola cab', url: 'https://book.olacabs.com/' },
      { label: 'Book Uber cab', url: 'https://m.uber.com/ul/' }
    ],
    bus: [
      { label: 'Search state bus ticket', url: 'https://www.redbus.in/' }
    ],
    metro: [
      { label: 'Search official city transit', url: 'https://www.google.com/search?q=official+metro+ticket+booking+India' }
    ],
    help: [
      { label: 'Open Google Maps route', url: 'https://www.google.com/maps' }
    ]
  };

  const plans = {
    Delhi: {
      headline: 'Delhi local transport support',
      summary: 'Metro QR ticket, cab pickup, DTC bus route aur Old Delhi e-rickshaw support ko ek jagah arrange karo.',
      modes: [
        { title: 'Cab pickup', text: 'Airport, railway station ya bus stop se Ola/Uber cab book karke hotel ya place tak jao.' },
        { title: 'Metro ticket', text: 'DMRC QR ticket official portal/app se book karo, phir last-mile cab ya e-rickshaw lo.' },
        { title: 'Local bus', text: 'Delhi city bus route ke liye DTC/One Delhi support use karo.' },
        { title: 'Last mile', text: 'Red Fort, Chandni Chowk aur market area ke liye e-rickshaw guidance rakho.' }
      ],
      links: {
        cab: defaultLinks.cab,
        metro: [
          { label: 'Book DMRC QR ticket', url: 'https://qrticket.dmrc.org/qrapp/' },
          { label: 'DMRC official website', url: 'https://www.delhimetrorail.com/' }
        ],
        bus: [
          { label: 'DTC official website', url: 'https://dtc.delhi.gov.in/' },
          { label: 'One Delhi app info', url: 'https://www.google.com/search?q=One+Delhi+app+official' }
        ],
        help: defaultLinks.help
      }
    },
    Varanasi: {
      headline: 'Varanasi local transport support',
      summary: 'Ghat area ke liye e-rickshaw, temple lane walk, boat point drop aur UPSRTC bus support clearly plan karo.',
      modes: [
        { title: 'Cab pickup', text: 'Station ya airport se cab book karke hotel/Assi Ghat/Kashi Vishwanath corridor tak jao.' },
        { title: 'E-rickshaw', text: 'Temple lane aur ghat area me e-rickshaw + walking route sabse practical rahega.' },
        { title: 'Boat point', text: 'Dashashwamedh/Assi Ghat boat point ke liye drop guidance aur timing check karo.' },
        { title: 'State bus', text: 'Intercity ya nearby trip ke liye UPSRTC official booking redirect use karo.' }
      ],
      links: {
        cab: defaultLinks.cab,
        metro: [
          { label: 'Open city route map', url: 'https://www.google.com/maps/search/Varanasi+local+transport' }
        ],
        bus: [
          { label: 'UPSRTC official booking', url: 'https://upsrtc.net/' }
        ],
        help: defaultLinks.help
      }
    },
    Jaipur: {
      headline: 'Jaipur local transport support',
      summary: 'Amber Fort cab route, Jaipur Metro, old city e-rickshaw aur RSRTC/JCTSL bus support.',
      modes: [
        { title: 'Cab pickup', text: 'Station/airport se cab book karke hotel, Amber Fort ya City Palace route cover karo.' },
        { title: 'Metro ticket', text: 'Jaipur Metro route available ho to official metro info/booking page check karo.' },
        { title: 'Old city ride', text: 'Hawa Mahal, Johri Bazaar aur Bapu Bazaar ke liye e-rickshaw easy rahega.' },
        { title: 'State/city bus', text: 'RSRTC intercity bus aur Jaipur city bus options ko official redirect se check karo.' }
      ],
      links: {
        cab: defaultLinks.cab,
        metro: [
          { label: 'Jaipur Metro official', url: 'https://transport.rajasthan.gov.in/jmrc' }
        ],
        bus: [
          { label: 'RSRTC official booking', url: 'https://rsrtconline.rajasthan.gov.in/' },
          { label: 'JCTSL city bus info', url: 'https://transport.rajasthan.gov.in/jctsl' }
        ],
        help: defaultLinks.help
      }
    },
    Mumbai: {
      headline: 'Mumbai local transport support',
      summary: 'Local train, metro, BEST bus, cab aur Marine Drive/Colaba last-mile transfer ko separate plan me dekho.',
      modes: [
        { title: 'Cab pickup', text: 'Airport, railway station ya hotel se Ola/Uber cab book karke direct transfer lo.' },
        { title: 'Metro/local', text: 'Mumbai Metro aur local train route se fast city movement plan karo.' },
        { title: 'City bus', text: 'BEST/Chalo mobile ticket support se bus travel check karo.' },
        { title: 'Last mile', text: 'Gateway, Colaba, Bandra aur Marine Drive ke liye cab + walk route best rahega.' }
      ],
      links: {
        cab: defaultLinks.cab,
        metro: [
          { label: 'Mumbai Metro official', url: 'https://www.mumbaimetroone.com/' },
          { label: 'Mumbai local train info', url: 'https://www.google.com/search?q=Mumbai+local+train+official+ticket' }
        ],
        bus: [
          { label: 'BEST official website', url: 'https://bestundertaking.com/' },
          { label: 'Chalo bus ticket', url: 'https://web.chalo.com/chalo-app/mobile-ticket' }
        ],
        help: defaultLinks.help
      }
    },
    Guwahati: {
      headline: 'Guwahati local transport support',
      summary: 'Kamakhya Temple cab, Umananda ferry point transfer, ASTC bus aur riverfront route support.',
      modes: [
        { title: 'Cab pickup', text: 'Station/airport se Kamakhya Temple, hotel ya Brahmaputra riverfront tak cab lo.' },
        { title: 'Ferry point', text: 'Umananda Island ke liye ferry point drop aur return pickup plan rakho.' },
        { title: 'State bus', text: 'ASTC bus support se Assam local/intercity route check karo.' },
        { title: 'Auto/local', text: 'Market aur riverfront ke liye auto/cab mix practical rahega.' }
      ],
      links: {
        cab: defaultLinks.cab,
        metro: [
          { label: 'Open Guwahati route map', url: 'https://www.google.com/maps/search/Guwahati+local+transport' }
        ],
        bus: [
          { label: 'ASTC official website', url: 'https://astc.assam.gov.in/' }
        ],
        help: defaultLinks.help
      }
    },
    Goa: {
      headline: 'Goa local transport support',
      summary: 'Airport cab, scooter rental guidance, beach route planning aur Kadamba bus support.',
      modes: [
        { title: 'Cab pickup', text: 'Airport/station se hotel ya beach cluster tak cab book karo.' },
        { title: 'Scooter/cab', text: 'North/South Goa beach movement ke liye scooter guidance ya family cab plan rakho.' },
        { title: 'Local bus', text: 'Kadamba/Goa transport official support se bus route check karo.' },
        { title: 'Beach route', text: 'Baga, Calangute, Candolim ya South Goa ke liye area-wise route choose karo.' }
      ],
      links: {
        cab: defaultLinks.cab,
        metro: [
          { label: 'Open Goa route map', url: 'https://www.google.com/maps/search/Goa+local+transport' }
        ],
        bus: [
          { label: 'Kadamba transport official', url: 'https://ktclgoa.com/' }
        ],
        help: defaultLinks.help
      }
    },
    Rameshwaram: {
      headline: 'Rameshwaram local transport support',
      summary: 'Temple cab, Pamban Bridge stop, Dhanushkodi local cab aur TNSTC bus guidance.',
      modes: [
        { title: 'Cab pickup', text: 'Station se temple/hotel transfer aur Dhanushkodi cab route plan karo.' },
        { title: 'Auto support', text: 'Temple corridor aur nearby stops ke liye auto/local cab useful rahega.' },
        { title: 'State bus', text: 'TNSTC official booking/info se Tamil Nadu bus route check karo.' },
        { title: 'Sightseeing', text: 'Pamban Bridge, Dhanushkodi aur APJ Memorial ko one route me combine karo.' }
      ],
      links: {
        cab: defaultLinks.cab,
        metro: [
          { label: 'Open Rameshwaram route map', url: 'https://www.google.com/maps/search/Rameshwaram+local+transport' }
        ],
        bus: [
          { label: 'TNSTC official booking', url: 'https://www.tnstc.in/' }
        ],
        help: defaultLinks.help
      }
    },
    Dwarka: {
      headline: 'Dwarka local transport support',
      summary: 'Dwarkadhish Temple cab, Bet Dwarka boat point transfer aur GSRTC bus support.',
      modes: [
        { title: 'Cab pickup', text: 'Station/hotel se Dwarkadhish Temple, Rukmini Temple aur Nageshwar route cover karo.' },
        { title: 'Boat point', text: 'Bet Dwarka ke liye jetty drop, boat timing aur return transfer plan karo.' },
        { title: 'State bus', text: 'GSRTC official support se Gujarat bus route check karo.' },
        { title: 'Local auto', text: 'Temple area aur nearby market ke liye auto support practical rahega.' }
      ],
      links: {
        cab: defaultLinks.cab,
        metro: [
          { label: 'Open Dwarka route map', url: 'https://www.google.com/maps/search/Dwarka+Gujarat+local+transport' }
        ],
        bus: [
          { label: 'GSRTC official booking', url: 'https://gsrtc.in/' }
        ],
        help: defaultLinks.help
      }
    },
    Haridwar: {
      headline: 'Haridwar local transport support',
      summary: 'Har Ki Pauri e-rickshaw, ropeway point drop, aarti return pickup aur Uttarakhand bus support.',
      modes: [
        { title: 'Cab pickup', text: 'Station/bus stop se hotel, Har Ki Pauri ya ropeway point tak pickup lo.' },
        { title: 'E-rickshaw', text: 'Ghat area me e-rickshaw + short walk route best rahega.' },
        { title: 'State bus', text: 'UTC official support se Uttarakhand bus route check karo.' },
        { title: 'Aarti return', text: 'Evening Ganga Aarti ke baad return pickup/auto plan pehle set karo.' }
      ],
      links: {
        cab: defaultLinks.cab,
        metro: [
          { label: 'Open Haridwar route map', url: 'https://www.google.com/maps/search/Haridwar+local+transport' }
        ],
        bus: [
          { label: 'UTC official booking', url: 'https://www.utconline.uk.gov.in/' }
        ],
        help: defaultLinks.help
      }
    },
    Rishikesh: {
      headline: 'Rishikesh local transport support',
      summary: 'Ram Jhula/Lakshman Jhula auto route, Triveni Ghat transfer, rafting point cab aur UTC bus support.',
      modes: [
        { title: 'Cab pickup', text: 'Station/bus stop se hotel, ghat ya rafting point tak cab/auto plan karo.' },
        { title: 'Auto route', text: 'Bridge area me local auto + walking route user-friendly rahega.' },
        { title: 'State bus', text: 'UTC official support se Rishikesh/Haridwar/Dehradun bus route check karo.' },
        { title: 'Activity transfer', text: 'Rafting point ya Neer Garh route ke liye local cab timing plan karo.' }
      ],
      links: {
        cab: defaultLinks.cab,
        metro: [
          { label: 'Open Rishikesh route map', url: 'https://www.google.com/maps/search/Rishikesh+local+transport' }
        ],
        bus: [
          { label: 'UTC official booking', url: 'https://www.utconline.uk.gov.in/' }
        ],
        help: defaultLinks.help
      }
    }
  };

  function normalizeCity(value) {
    const raw = String(value || 'Delhi').trim();
    const aliases = {
      Kashi: 'Varanasi',
      Dwarika: 'Dwarka',
      Gauhati: 'Guwahati',
      Bengaluru: 'Bengaluru',
      Bangalore: 'Bengaluru'
    };
    return aliases[raw] || raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
  }

  function fallbackPlan(city) {
    return {
      headline: `${city} local transport support`,
      summary: `${city} ke liye cab, auto, local bus aur official route support ko one-page guidance me dekhein.`,
      modes: [
        { title: 'Cab pickup', text: 'Ola/Uber se station, airport ya bus stop pickup book karo.' },
        { title: 'Local route', text: 'Google Maps route se nearest auto/cab/bus option compare karo.' },
        { title: 'State bus', text: 'State transport official portal ya trusted booking partner se bus ticket check karo.' },
        { title: 'Support', text: 'Destination aur place ke hisaab se local pickup/drop plan confirm karo.' }
      ],
      links: {
        cab: defaultLinks.cab,
        metro: [{ label: 'Open local route map', url: `https://www.google.com/maps/search/${encodeURIComponent(city + ' local transport')}` }],
        bus: [{ label: 'Search official state bus', url: `https://www.google.com/search?q=${encodeURIComponent(city + ' official state bus booking')}` }],
        help: defaultLinks.help
      }
    };
  }

  window.EASYTRAVEL_TRANSPORT = {
    getPlan(city) {
      const normalized = normalizeCity(city);
      return plans[normalized] || fallbackPlan(normalized);
    },
    cityNames: Object.keys(plans)
  };
})();
