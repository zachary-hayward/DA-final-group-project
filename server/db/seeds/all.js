/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      auth0_id: 'google-oauth2|118294311203163729435',
      username: 'gardener_john',
      location: 'New York',
      summer_start_month: 'June',
    },
    {
      id: 2,
      auth0_id: 'auth0|456',
      username: 'plantlover_jane',
      location: 'California',
      summer_start_month: 'March',
    },
    {
      id: 3,
      auth0_id: 'auth0|789',
      username: 'green_thumb_joe',
      location: 'Wellington',
      summer_start_month: 'December',
    },
  ])
  await knex('gardens').del()
  await knex('gardens').insert([
    {
      id: 1,
      user_id: 1,
      layout: `[  { i: '1', x: 0, y: 0, w: 11, h: 12 },
  { i: '2', x: 11, y: 0, w: 3, h: 16 },
  { i: '3', x: 14, y: 0, w: 12, h: 20 }]`,
      name: 'Kitchen',
    },
    {
      id: 2,
      user_id: 2,
      layout: `[ { i: '4', x: 0, y: 6, w: 11, h: 4 },
  { i: '6', x: 26, y: 3, w: 21, h: 14 },
  { i: '7', x: 26, y: 0, w: 21, h: 6 }]`,
      name: 'front',
    },
    {
      id: 3,
      user_id: 3,
      layout: `[{ i: '8', x: 0, y: 8, w: 14, h: 18 },
  { i: '9', x: 14, y: 10, w: 33, h: 6 },
  { i: '10', x: 14, y: 13, w: 33, h: 8 }]`,
      name: 'back',
    },
  ])
  await knex('plants').del()
  await knex('plants').insert([
    {
      id: 1,
      name: 'Tomato',
      icon_src: '/images/flat-icons/veg-fruit-icons/tomato.png',
      photo_src: '/images/photos/tomatoes.jpg',
      difficulty: 'Medium',
      planting_starts: 'early-spring',
      planting_ends: 'summer',
      watering_frequency: 'Daily',
      sun_level: 'full-sun',
      cycle: 'Annual',
      days_from_seed_until_seedling: 40,
      days_from_planting_until_harvest: 180,
    },
    {
      id: 2,
      name: 'Basil',
      icon_src: '/images/flat-icons/veg-fruit-icons/basil.png',
      photo_src: '/images/photos/basil.jpg',
      difficulty: 'Easy',
      planting_starts: 'late-summer',
      planting_ends: 'early-winter',
      watering_frequency: 'Twice a week',
      sun_level: 'part-sun',
      cycle: 'Annual',
      days_from_seed_until_seedling: 20,
      days_from_planting_until_harvest: 90,
    },
    {
      id: 3,
      name: 'Carrot',
      icon_src: '/images/flat-icons/veg-fruit-icons/carrot.png',
      photo_src: '/images/photos/carrots.jpg',
      difficulty: 'Hard',
      planting_starts: 'early-spring',
      planting_ends: 'late-spring',
      watering_frequency: 'Every other day',
      sun_level: 'full-sun',
      cycle: 'Biennial',
      days_from_seed_until_seedling: 0,
      days_from_planting_until_harvest: 190,
    },
    {
      id: 4,
      name: 'Cauliflower',
      icon_src: '/images/flat-icons/veg-fruit-icons/cauliflower.png',
      photo_src: '/images/photos/cauliflower.jpg',
      difficulty: 'Medium',
      planting_starts: 'summer',
      planting_ends: 'winter',
      watering_frequency: 'Daily',
      sun_level: 'full-sun to part-sun',
      cycle: 'Annual',
      days_from_seed_until_seedling: 40,
      days_from_planting_until_harvest: 180,
    },
    {
      id: 5,
      name: 'Broccoli',
      icon_src: '/images/flat-icons/veg-fruit-icons/broccoli.png',
      photo_src: '/images/photos/broccoli.jpg',
      difficulty: 'Easy',
      planting_starts: 'summer',
      planting_ends: 'late-summer',
      watering_frequency: 'Twice a week',
      sun_level: 'part-sun to full-shade',
      cycle: 'Annual',
      days_from_seed_until_seedling: 20,
      days_from_planting_until_harvest: 90,
    },
    {
      id: 6,
      name: 'Silverbeet',
      icon_src: '/images/flat-icons/veg-fruit-icons/chard.png',
      photo_src: '/images/photos/silverbeet.jpg',
      difficulty: 'Easy',
      planting_starts: 'year-round',
      planting_ends: 'year-round',
      watering_frequency: 'Every other day',
      sun_level: 'full-shade',
      cycle: 'Biennial',
      days_from_seed_until_seedling: 0,
      days_from_planting_until_harvest: 190,
    },
      {
        id: 7,
        name: 'Asparagus',
        icon_src: '/images/flat-icons/veg-fruit-icons/asparagus.png',
        photo_src: '/images/photos/asparagus.jpg',
        difficulty: 'Hard',
        planting_starts: 'early-spring',
        planting_ends: 'late-spring',
        watering_frequency: 'Weekly',
        sun_level: 'full-sun',
        cycle: 'Perennial',
        days_from_seed_until_seedling: 25,
        days_from_planting_until_harvest: 850,
      },
      {
        id: 8,
        name: 'Blackberry',
        icon_src: '/images/flat-icons/veg-fruit-icons/blackberry.png',
        photo_src: '/images/photos/blackberries.jpg',
        difficulty: 'Medium',
        planting_starts: 'early-spring',
        planting_ends: 'late-spring',
        watering_frequency: 'Weekly',
        sun_level: 'full-sun',
        cycle: 'Perennial',
        days_from_seed_until_seedling: 35,
        days_from_planting_until_harvest: 500
      },
      {
        id: 9,
        name: 'Blueberry',
        icon_src: '/images/flat-icons/veg-fruit-icons/blueberry.png',
        photo_src: '/images/photos/blueberries.jpg',
        difficulty: 'Medium to Hard',
        planting_starts: 'early-spring',
        planting_ends: 'late-spring',
        watering_frequency: 'Weekly',
        sun_level: 'full-sun to partial-shade',
        cycle: 'Perennial',
        days_from_seed_until_seedling: 45,
        days_from_planting_until_harvest: 875
      },
      {
        id: 10,
        name: 'Bok Choy',
        icon_src: '/images/flat-icons/veg-fruit-icons/bokchoi.png',
        photo_src: '/images/photos/bokchoi.jpg',
        difficulty: 'Easy',
        planting_starts: 'early-spring',
        planting_ends: 'late-summer',
        watering_frequency: 'Every 2-3 days',
        sun_level: 'partial-sun to full-sun',
        cycle: 'Annual',
        days_from_seed_until_seedling: 8,
        days_from_planting_until_harvest: 55
      },
      {
        id: 11,
        name: 'Broad Beans',
        icon_src: '/images/flat-icons/veg-fruit-icons/broadbeans.png',
        photo_src: '/images/photos/broad-beans.jpg',
        difficulty: 'Easy',
        planting_starts: 'early-spring',
        planting_ends: 'late-spring',
        watering_frequency: 'Weekly',
        sun_level: 'full-sun',
        cycle: 'Annual',
        days_from_seed_until_seedling: 10,
        days_from_planting_until_harvest: 90
      },
      {
        id: 13,
        name: "Capsicum",
        icon_src: "/images/flat-icons/veg-fruit-icons/capsicum.png",
        photo_src: "/images/photos/capsicum.jpg",
        difficulty: "Medium",
        planting_starts: "early-spring",
        planting_ends: "summer",
        watering_frequency: "Regularly, when soil is dry",
        sun_level: "full-sun",
        cycle: "Annual",
        days_from_seed_until_seedling: 10,
        days_from_planting_until_harvest: 75
      },
      {
        id: 16,
        name: "Celery",
        icon_src: "/images/flat-icons/veg-fruit-icons/celery.png",
        photo_src: "/images/photos/celery.jpg",
        difficulty: "Medium",
        planting_starts: "early-spring",
        planting_ends: "mid-summer",
        watering_frequency: "Regularly, keep soil consistently moist",
        sun_level: "partial-sun to full-sun",
        cycle: "Biennial",
        days_from_seed_until_seedling: 14,
        days_from_planting_until_harvest: 120
      },
      {
        id: 17,
        name: "Coriander",
        icon_src: "/images/flat-icons/veg-fruit-icons/coriander.png",
        photo_src: "/images/photos/coriander.jpg",
        difficulty: "Easy",
        planting_starts: "early-spring",
        planting_ends: "late-summer",
        watering_frequency: "Regularly, keep soil moist but not waterlogged",
        sun_level: "partial-sun to full-sun",
        cycle: "Annual",
        days_from_seed_until_seedling: 10,
        days_from_planting_until_harvest: 40
      },
      {
        id: 18,
        name: "Corn",
        icon_src: "/images/flat-icons/veg-fruit-icons/corn.png",
        photo_src: "/images/photos/corn.jpg",
        difficulty: "Medium",
        planting_starts: "spring",
        planting_ends: "early-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun",
        cycle: "Annual",
        days_from_seed_until_seedling: 10,
        days_from_planting_until_harvest: 80
      },
      {
        id: 19,
        name: "Courgette",
        icon_src: "/images/flat-icons/veg-fruit-icons/courgette.png",
        photo_src: "/images/photos/courgette.jpg",
        difficulty: "Easy",
        planting_starts: "spring",
        planting_ends: "early-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun",
        cycle: "Annual",
        days_from_seed_until_seedling: 10,
        days_from_planting_until_harvest: 55
      },
      {
        id: 20,
        name: "Cucumber",
        icon_src: "/images/flat-icons/veg-fruit-icons/cucumber.png",
        photo_src: "/images/photos/cucumber.jpg",
        difficulty: "Easy",
        planting_starts: "spring",
        planting_ends: "early-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun",
        cycle: "Annual",
        days_from_seed_until_seedling: 7,
        days_from_planting_until_harvest: 60
      },
      {
        id: 21,
        name: "Eggplant",
        icon_src: "/images/flat-icons/veg-fruit-icons/eggplant.png",
        photo_src: "/images/photos/eggplant.jpg",
        difficulty: "Medium",
        planting_starts: "spring",
        planting_ends: "early-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun",
        cycle: "Annual",
        days_from_seed_until_seedling: 10,
        days_from_planting_until_harvest: 80
      },
      {
        id: 22,
        name: "Feijoa",
        icon_src: "/images/flat-icons/veg-fruit-icons/feijoa.png",
        photo_src: "/images/photos/feijoa.jpg",
        difficulty: "Medium",
        planting_starts: "spring",
        planting_ends: "early-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun to partial-shade",
        cycle: "Perennial",
        days_from_seed_until_seedling: 30,
        days_from_planting_until_harvest: 365
      },
      {
        id: 23,
        name: "Kale",
        icon_src: "/images/flat-icons/veg-fruit-icons/kale.png",
        photo_src: "/images/photos/kale.jpg",
        difficulty: "Medium",
        planting_starts: "spring",
        planting_ends: "early-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun to partial-shade",
        cycle: "Annual",
        days_from_seed_until_seedling: 14,
        days_from_planting_until_harvest: 60
      },
      {
        id: 24,
        name: "Kumara",
        icon_src: "/images/flat-icons/veg-fruit-icons/kumara.png",
        photo_src: "/images/photos/kumara.jpg",
        difficulty: "Medium",
        planting_starts: "spring",
        planting_ends: "early-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun",
        cycle: "Annual",
        days_from_seed_until_seedling: 30,
        days_from_planting_until_harvest: 120
      },
      {
        id: 25,
        name: "Lettuce",
        icon_src: "/images/flat-icons/veg-fruit-icons/lettuce.png",
        photo_src: "/images/photos/lettuce.jpg",
        difficulty: "Medium",
        planting_starts: "spring",
        planting_ends: "early-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "partial-sun to full-sun",
        cycle: "Annual",
        days_from_seed_until_seedling: 7,
        days_from_planting_until_harvest: 30
      },
      {
        id: 26,
        name: "Mandarins",
        icon_src: "/images/flat-icons/veg-fruit-icons/mandarin.png",
        photo_src: "/images/photos/mandarins.jpg",
        difficulty: "Medium",
        planting_starts: "spring",
        planting_ends: "early-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun",
        cycle: "Perennial",
        days_from_seed_until_seedling: null,
        days_from_planting_until_harvest: 365
      },
      {
        id: 27,
        name: "Mesclun",
        icon_src: "/images/flat-icons/veg-fruit-icons/mesclun.png",
        photo_src: "/images/photos/mesclun.jpg",
        difficulty: "Easy",
        planting_starts: "early-spring",
        planting_ends: "late-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "partial-sun to full-sun",
        cycle: "Annual",
        days_from_seed_until_seedling: 7,
        days_from_planting_until_harvest: 21
      },
      {
        id: 28,
        name: "Onion",
        icon_src: "/images/flat-icons/veg-fruit-icons/onion.png",
        photo_src: "/images/photos/onion.jpg",
        difficulty: "Easy",
        planting_starts: "early-spring",
        planting_ends: "mid-spring",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun",
        cycle: "Biennial",
        days_from_seed_until_seedling: 14,
        days_from_planting_until_harvest: 90
      },
      {
        id: 29,
        name: "Orange",
        icon_src: "/images/flat-icons/veg-fruit-icons/orange.png",
        photo_src: "/images/photos/orange.jpg",
        difficulty: "Medium",
        planting_starts: "spring",
        planting_ends: "early-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun",
        cycle: "Perennial",
        days_from_seed_until_seedling: null,
        days_from_planting_until_harvest: 730
      },
      {
        id: 30,
        name: "Parsley",
        icon_src: "/images/flat-icons/veg-fruit-icons/parsley.png",
        photo_src: "/images/photos/parsley.jpg",
        difficulty: "Easy",
        planting_starts: "early-spring",
        planting_ends: "late-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "partial-sun to full-sun",
        cycle: "Biennial",
        days_from_seed_until_seedling: 14,
        days_from_planting_until_harvest: 70
      },
      {
        id: 31,
        name: "Passionfruit",
        icon_src: "/images/flat-icons/veg-fruit-icons/passionfruit.png",
        photo_src: "/images/photos/passionfruit.jpg",
        difficulty: "Medium",
        planting_starts: "spring",
        planting_ends: "early-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun",
        cycle: "Perennial",
        days_from_seed_until_seedling: null,
        days_from_planting_until_harvest: 365
      },
      {
        id: 32,
        name: "Pears",
        icon_src: "/images/flat-icons/veg-fruit-icons/pear.png",
        photo_src: "/images/photos/pears.jpg",
        difficulty: "Medium",
        planting_starts: "late winter",
        planting_ends: "early spring",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun",
        cycle: "Perennial",
        days_from_seed_until_seedling: null,
        days_from_planting_until_harvest: 730
      },
      {
        id: 33,
        name: "Peas",
        icon_src: "/images/flat-icons/veg-fruit-icons/peas.png",
        photo_src: "/images/photos/peas.jpg",
        difficulty: "Easy",
        planting_starts: "early spring",
        planting_ends: "mid-spring",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun to partial-shade",
        cycle: "Annual",
        days_from_seed_until_seedling: 7,
        days_from_planting_until_harvest: 60
      },
      {
        id: 34,
        name: "Pumpkin",
        icon_src: "/images/flat-icons/veg-fruit-icons/pumpkin.png",
        photo_src: "/images/photos/pumpkin.jpg",
        difficulty: "Easy",
        planting_starts: "spring",
        planting_ends: "early summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun",
        cycle: "Annual",
        days_from_seed_until_seedling: 7,
        days_from_planting_until_harvest: 90
      },
      {
        id: 35,
        name: "Radish",
        icon_src: "/images/flat-icons/veg-fruit-icons/radish.png",
        photo_src: "/images/photos/radish.jpg",
        difficulty: "Easy",
        planting_starts: "early spring",
        planting_ends: "late summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun to partial-shade",
        cycle: "Annual",
        days_from_seed_until_seedling: 5,
        days_from_planting_until_harvest: 25
      },
      
      {
        id: 36,
        name: "Spinach",
        icon_src: "/images/flat-icons/veg-fruit-icons/spinach.png",
        photo_src: "/images/photos/spinach.jpg",
        difficulty: "Easy",
        planting_starts: "early spring",
        planting_ends: "mid-spring",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "partial-sun to full-sun",
        cycle: "Annual",
        days_from_seed_until_seedling: 7,
        days_from_planting_until_harvest: 30
      },
      {
        id: 37,
        name: "Spring Onion",
        icon_src: "/images/flat-icons/veg-fruit-icons/springonion.png",
        photo_src: "/images/photos/springonion.jpg",
        difficulty: "Easy",
        planting_starts: "early spring",
        planting_ends: "mid-summer",
        watering_frequency: "Regularly, keep soil moist",
        sun_level: "full-sun to partial-shade",
        cycle: "Annual",
        days_from_seed_until_seedling: 7,
        days_from_planting_until_harvest: 60
      },
      {
        id: 38,
        name: 'Apple',
        icon_src: '/images/flat-icons/veg-fruit-icons/apple.png',
        photo_src: '/images/photos/apples.jpg',
        difficulty: 'Medium',
        planting_starts: 'late-winter',
        planting_ends: 'early-spring',
        watering_frequency: 'Weekly',
        sun_level: 'full-sun',
        cycle: 'Perennial',
        days_from_seed_until_seedling: 60,
        days_from_planting_until_harvest: 365,
      },
      {
        id: 39,
        name: 'Arugula',
        icon_src: '/images/flat-icons/veg-fruit-icons/arugula.png',
        photo_src: '/images/photos/arugula.jpg',
        difficulty: 'Easy',
        planting_starts: 'early-spring',
        planting_ends: 'late-summer',
        watering_frequency: 'Every 2-3 days',
        sun_level: 'partial-sun',
        cycle: 'Annual',
        days_from_seed_until_seedling: 7,
        days_from_planting_until_harvest: 30,
      },
  ])

  await knex('plant_care_data').del()
  await knex('plant_care_data').insert([
    {
      id: 1,
      plantName: 'Tomato',
      scientificName: 'Solanum lycopersicum',
      description:
        'The tomato is a widely cultivated plant species, producing edible red fruits, commonly known as tomatoes.',
      soil: 'Well-drained',
      sunlight: 'Full sun',
      watering: 'Medium',
      fertilization: 'Regularly',
      pruning: 'Prune regularly',
      pests: 'Watch for insects',
      diseases: 'Protect from disease',
      indoorsPlantingTime: 'Start seeds indoors August - September',
      outdoorsPlantingTime: 'Transplant outdoors October - November',
      spacing: '0.6 - 1.0 metres',
      plantingTime: 'October - November',
      havestingTime: 'Summer',
      harvestingTips: 'Harvest when red',
    },
    {
      id: 2,
      plantName: 'Potato',
      scientificName: 'Solanum tuberosum',
      description: 'A starchy tuberous crop grown for its edible tubers.',
      soil: 'Well drained, loose soil',
      sunlight: 'Full sun',
      watering: 'Medium',
      fertilization: 'Regularly',
      pruning: 'Remove any diseased foliage',
      pests: 'Aphids, Colorado potato beetles',
      diseases: 'Late blight, early blight',
      indoorsPlantingTime: 'Not applicable',
      outdoorsPlantingTime: 'Spring',
      spacing: '0.3 - 0.6 meters',
      plantingTime: 'August - October',
      havestingTime: 'Summer',
      harvestingTips: 'Harvest when tubers are firm and mature',
    },
    {
      id: 3,
      plantName: 'Zucchini',
      scientificName: 'Cucurbita pepo',
      description:
        'Zucchini is a summer squash with a mild flavor and a versatile range of culinary uses.',
      soil: 'Well-drained',
      sunlight: 'Full sun',
      watering: 'Medium',
      fertilization: 'Regularly',
      pruning: 'Pinch off blossoms',
      pests: 'Squash bugs',
      diseases: 'Powdery mildew',
      indoorsPlantingTime: 'Start seeds indoors August - September',
      outdoorsPlantingTime: 'Transplant outdoors October - November',
      spacing: '0.6 - 1 meter',
      plantingTime: 'Spring',
      havestingTime: 'Summer to autumn',
      harvestingTips: 'Harvest zucchini when small and tender',
    },
  ])

  await knex('user_desired_plants').del()
  await knex('user_desired_plants').insert([
    { id: 1, user_id: 1, plant_id: 1 },
    { id: 2, user_id: 1, plant_id: 2 },
    { id: 3, user_id: 1, plant_id: 3 },
    { id: 4, user_id: 2, plant_id: 1 },
    { id: 5, user_id: 2, plant_id: 2 },
    { id: 6, user_id: 2, plant_id: 3 },
    { id: 7, user_id: 3, plant_id: 1 },
    { id: 8, user_id: 3, plant_id: 2 },
    { id: 9, user_id: 3, plant_id: 3 },
  ])
  await knex('plots').del()
  await knex('plots').insert([
    {
      id: 1,
      garden_id: 1,
      plot_number: 1,
      sun_level: 'part-sun',
      plot_type: 'house',
      size: 5,
      growable: false,
      name: 'Kitchen',
    },
    {
      id: 2,
      garden_id: 1,
      plot_number: 2,
      sun_level: 'full-sun',
      plot_type: 'path',
      size: 4,
      growable: true,
      name: 'Wonderland',
    },
    {
      id: 3,
      garden_id: 1,
      plot_number: 3,
      sun_level: 'full-shade',
      plot_type: 'garden',
      size: 4,
      growable: true,
      name: 'Secret Garden',
    },
    {
      id: 4,
      garden_id: 2,
      plot_number: 1,
      sun_level: 'part-sun',
      plot_type: 'garden',
      size: 5,
      growable: true,
      name: 'Edible for sure',
    },
    {
      id: 5,
      garden_id: 2,
      plot_number: 2,
      sun_level: 'full-sun',
      plot_type: 'garden',
      size: 4,
      growable: true,
      name: 'Underground world',
    },
    {
      id: 6,
      garden_id: 2,
      plot_number: 3,
      sun_level: 'full-shade',
      plot_type: 'garden',
      size: 2,
      growable: true,
      name: 'Floral planet',
    },
    {
      id: 7,
      garden_id: 3,
      plot_number: 1,
      sun_level: 'part-sun',
      plot_type: 'grass',
      size: 5,
      growable: true,
      name: 'Greenhouse',
    },
    {
      id: 8,
      garden_id: 3,
      plot_number: 2,
      sun_level: 'full-sun',
      plot_type: 'grass',
      size: 4,
      growable: true,
      name: 'Underground gold',
    },
    {
      id: 9,
      garden_id: 3,
      plot_number: 3,
      sun_level: 'full-shade',
      plot_type: 'garden',
      size: 2,
      growable: true,
      name: 'Secret garden',
    },
  ])
  await knex('plots_plants').del()
  await knex('plots_plants').insert([
    {
      id: 1,
      plant_id: 1,
      plot_id: 1,
      date_planted: '2024-03-01',
      last_watered: '2024-03-15',
      watering_history: '[2024-03-15]',
      user_id: 1,
      name: 'tomato 1',
    },
    {
      id: 2,
      plant_id: 2,
      plot_id: 2,
      date_planted: '2024-04-01',
      last_watered: '2024-04-10',
      watering_history: '[2024-03-15]',
      user_id: 1,
      name: 'tomato 2',
    },
    {
      id: 3,
      plant_id: 3,
      plot_id: 3,
      date_planted: '2024-02-15',
      last_watered: '2024-02-20',
      watering_history: '[2024-03-15]',
      user_id: 1,
      name: 'tomato 3',
    },
    {
      id: 4,
      plant_id: 1,
      plot_id: 4,
      date_planted: '2024-03-01',
      last_watered: '2024-03-15',
      watering_history: '[2024-03-15]',
      user_id: 2,
      name: 'cucumber 1',
    },
    {
      id: 5,
      plant_id: 2,
      plot_id: 5,
      date_planted: '2024-04-01',
      last_watered: '2024-04-10',
      watering_history: '[2024-03-15]',
      user_id: 2,
      name: 'cucumber 2',
    },
    {
      id: 6,
      plant_id: 3,
      plot_id: 6,
      date_planted: '2024-02-15',
      last_watered: '2024-02-20',
      watering_history: '[2024-03-15]',
      user_id: 2,
      name: 'cucumber 3',
    },
    {
      id: 7,
      plant_id: 1,
      plot_id: 7,
      date_planted: '2024-03-01',
      last_watered: '2024-03-15',
      watering_history: '[2024-03-15]',
      user_id: 3,
      name: 'potato 1',
    },
    {
      id: 8,
      plant_id: 2,
      plot_id: 8,
      date_planted: '2024-04-01',
      last_watered: '2024-04-10',
      watering_history: '[2024-03-15]',
      user_id: 3,
      name: 'potato 2',
    },
    {
      id: 9,
      plant_id: 3,
      plot_id: 9,
      date_planted: '2024-02-15',
      last_watered: '2024-02-20',
      watering_history: '[2024-03-15]',
      user_id: 3,
      name: 'potato 3',
    },
  ])

  // await knex('plant_notes').del()
  // await knex('plant_notes').insert([
  //   {id: 1, plot_plant_id: 1, date: '2024-03-16', note: 'Plant is growing well.' },
  //   {id: 2, plot_plant_id: 2, date: '2024-04-12', note: 'Leaves are green and healthy.' },
  //   {id: 3, plot_plant_id: 3, date: '2024-02-22', note: 'Showing signs of growth.' },
  //   {id: 4, plot_plant_id: 4, date: '2024-03-16', note: 'Plant is growing well.' },
  //   {id: 5, plot_plant_id: 5, date: '2024-04-12', note: 'Leaves are green and healthy.' },
  //   {id: 6, plot_plant_id: 6, date: '2024-02-22', note: 'Showing signs of growth.' },
  //   {id: 7, plot_plant_id: 7, date: '2024-03-16', note: 'Plant is growing well.' },
  //   {id: 8, plot_plant_id: 8, date: '2024-04-12', note: 'Leaves are green and healthy.' },
  //   {id: 9, plot_plant_id: 9, date: '2024-02-22', note: 'Showing signs of growth.' },
  // ]);
  // await knex('images').del()
  // await knex('images').insert([
  //   {id: 1, plot_notes_id: 1, image: 'image1.jpg' },
  //   {id: 2, plot_notes_id: 2, image: 'image2.jpg' },
  //   {id: 3, plot_notes_id: 3, image: 'image3.jpg' }
  // ]);
}
