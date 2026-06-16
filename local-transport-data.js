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
      summary: 'Metro QR tickets, cab pickup, DTC bus routes and Old Delhi e-rickshaw guidance in one place.',
      modes: [
        { title: 'Cab Pickup', text: 'Book an Ola/Uber cab from the airport, railway station or bus stop to the hotel or selected place.' },
        { title: 'Metro Ticket', text: 'Book DMRC QR tickets through the official portal/app, then use a cab or e-rickshaw for last-mile travel.' },
        { title: 'Local Bus', text: 'Use DTC/One Delhi support for Delhi city bus routes.' },
        { title: 'Last Mile', text: 'Use e-rickshaw guidance for Red Fort, Chandni Chowk and market areas.' }
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
      summary: 'Plan e-rickshaws, lane walks, boat-point drops and UPSRTC bus support for the ghat area.',
      modes: [
        { title: 'Cab Pickup', text: 'Book a cab from the station or airport to the hotel, Assi Ghat or Kashi Vishwanath corridor.' },
        { title: 'E-Rickshaw', text: 'E-rickshaw plus walking routes are practical for lanes and ghat areas.' },
        { title: 'Boat Point', text: 'Check drop guidance and timing for Dashashwamedh or Assi Ghat boat points.' },
        { title: 'State Bus', text: 'Use the UPSRTC official booking redirect for intercity or nearby trips.' }
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
      summary: 'Amber Fort cab routes, Jaipur Metro, old-city e-rickshaws and RSRTC/JCTSL bus support.',
      modes: [
        { title: 'Cab Pickup', text: 'Book a cab from the station or airport to cover the hotel, Amber Fort or City Palace route.' },
        { title: 'Metro Ticket', text: 'Check the official Jaipur Metro information or booking page when metro routes are available.' },
        { title: 'Old City Ride', text: 'E-rickshaws are convenient for Hawa Mahal, Johri Bazaar and Bapu Bazaar.' },
        { title: 'State/City Bus', text: 'Check RSRTC intercity bus and Jaipur city bus options through official redirects.' }
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
      summary: 'Review local train, metro, BEST bus, cab and Marine Drive/Colaba last-mile transfer options.',
      modes: [
        { title: 'Cab Pickup', text: 'Book an Ola/Uber cab from the airport, railway station or hotel for a direct transfer.' },
        { title: 'Metro/Local', text: 'Use Mumbai Metro and local train routes for faster city movement.' },
        { title: 'City Bus', text: 'Check BEST/Chalo mobile ticket support for bus travel.' },
        { title: 'Last Mile', text: 'Cab plus walking routes work well for Gateway, Colaba, Bandra and Marine Drive.' }
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
      summary: 'Kamakhya Temple cab support, Umananda ferry-point transfer, ASTC bus and riverfront route support.',
      modes: [
        { title: 'Cab Pickup', text: 'Use a cab from the station or airport to Kamakhya Temple, the hotel or Brahmaputra riverfront.' },
        { title: 'Ferry Point', text: 'Plan ferry-point drop and return pickup for Umananda Island.' },
        { title: 'State Bus', text: 'Check Assam local and intercity routes through ASTC support.' },
        { title: 'Auto/Local', text: 'A mix of auto and cab works well for markets and riverfront movement.' }
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
      summary: 'Airport cab, scooter rental guidance, beach route planning and Kadamba bus support.',
      modes: [
        { title: 'Cab Pickup', text: 'Book a cab from the airport or station to the hotel or beach cluster.' },
        { title: 'Scooter/Cab', text: 'Use scooter guidance or a family cab plan for North and South Goa beach movement.' },
        { title: 'Local Bus', text: 'Check bus routes through Kadamba/Goa transport official support.' },
        { title: 'Beach Route', text: 'Choose area-wise routes for Baga, Calangute, Candolim or South Goa.' }
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
      summary: 'Temple cab support, Pamban Bridge stop, Dhanushkodi local cab and TNSTC bus guidance.',
      modes: [
        { title: 'Cab Pickup', text: 'Plan station-to-temple, station-to-hotel and Dhanushkodi cab routes.' },
        { title: 'Auto Support', text: 'Auto or local cab support is useful for the temple corridor and nearby stops.' },
        { title: 'State Bus', text: 'Check Tamil Nadu bus routes through TNSTC official booking or information pages.' },
        { title: 'Sightseeing', text: 'Combine Pamban Bridge, Dhanushkodi and APJ Memorial into one route.' }
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
      summary: 'Dwarkadhish Temple cab support, Bet Dwarka boat-point transfer and GSRTC bus support.',
      modes: [
        { title: 'Cab Pickup', text: 'Cover Dwarkadhish Temple, Rukmini Temple and Nageshwar routes from the station or hotel.' },
        { title: 'Boat Point', text: 'Plan jetty drop, boat timing and return transfer for Bet Dwarka.' },
        { title: 'State Bus', text: 'Check Gujarat bus routes through GSRTC official support.' },
        { title: 'Local Auto', text: 'Auto support is practical for temple areas and nearby markets.' }
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
      summary: 'Har Ki Pauri e-rickshaw support, ropeway-point drop, evening return pickup and Uttarakhand bus support.',
      modes: [
        { title: 'Cab Pickup', text: 'Use pickup from the station or bus stop to the hotel, Har Ki Pauri or ropeway point.' },
        { title: 'E-Rickshaw', text: 'E-rickshaw plus short walking routes work best in the ghat area.' },
        { title: 'State Bus', text: 'Check Uttarakhand bus routes through UTC official support.' },
        { title: 'Evening Return', text: 'Set return pickup or auto planning before the evening Ganga Aarti.' }
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
      summary: 'Ram Jhula/Lakshman Jhula auto routes, Triveni Ghat transfer, rafting-point cab and UTC bus support.',
      modes: [
        { title: 'Cab Pickup', text: 'Plan cab or auto support from the station or bus stop to hotels, ghats or rafting points.' },
        { title: 'Auto Route', text: 'Local auto plus walking routes are user-friendly around bridge areas.' },
        { title: 'State Bus', text: 'Check Rishikesh, Haridwar and Dehradun bus routes through UTC official support.' },
        { title: 'Activity Transfer', text: 'Plan local cab timing for rafting points or the Neer Garh route.' }
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
      summary: `One-page guidance for cab, auto, local bus and official route support in ${city}.`,
      modes: [
        { title: 'Cab Pickup', text: 'Book station, airport or bus-stop pickup through Ola/Uber.' },
        { title: 'Local Route', text: 'Compare nearby auto, cab and bus options through Google Maps routes.' },
        { title: 'State Bus', text: 'Check bus tickets through the official state transport portal or a trusted booking partner.' },
        { title: 'Support', text: 'Confirm local pickup and drop planning based on destination and selected place.' }
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
