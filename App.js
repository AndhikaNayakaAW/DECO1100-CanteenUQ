import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
  primaryPurple: '#51247A',
  darkPurple: '#2A0A4A',
  white: '#FFFFFF',
  lightGrey: '#F5F5F7',
  mediumGrey: '#D9D9D9',
  darkText: '#333333',
  successGreen: '#2E7D32',
  warningOrange: '#F59E0B',
  errorRed: '#D32F2F',
};

const LOGOS = {
  uqCrest: 'https://static.uq.net.au/v10/logos/corporate/uq-apple-touch-icon.png',
  uqUnion:
    'https://uqu.com.au/wp-content/uploads/UQU_Side-Stacked_Your-Student-Union-Logo_Current_BLACK-1-1.png',
};

const ICON_IMAGES = {
  home: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/1f3e0.png',
  restaurants:
    'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/1f374.png',
  freeFood: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/1f34e.png',
  orders: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/1f4dd.png',
  profile: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/1f464.png',
  check: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/2705.png',
};

const USER = {
  username: 's4984700',
  password: 'uqstudent',
  name: 'Andhika Nayaka Arya Wibowo',
  studentId: 's4984700',
  role: 'student',
};

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const FREE_FOOD_BREAKFAST_MENU = {
  Monday: {
    option1: 'Wholemeal toast with margarine and strawberry jam',
    option2: 'Muesli cup with yoghurt and fruit',
    drink: 'Full cream milk / soy milk / oat milk',
    fruit: 'Banana',
  },
  Tuesday: {
    option1: 'White toast with Vegemite',
    option2: 'Multigrain toast with peanut butter',
    drink: 'Milk / soy milk / oat milk',
    fruit: 'Banana',
  },
  Wednesday: {
    option1: 'Wholemeal toast with marmalade',
    option2: 'Muesli cup with yoghurt and berries',
    drink: 'Milk / soy milk / oat milk',
    fruit: 'Apple or banana',
  },
  Thursday: {
    option1: 'Pancake serve with honey',
    option2: 'Toast with Nutella',
    drink: 'Milk / soy milk / oat milk',
    fruit: 'Banana',
  },
  Friday: {
    option1: 'Multigrain toast with strawberry jam',
    option2: 'Wholemeal toast with peanut butter',
    drink: 'Milk / soy milk / oat milk',
    fruit: 'Banana',
  },
};

const FREE_FOOD_DINNER_MENU = {
  Monday: {
    option1: 'Vegetarian curry with rice',
    option2: 'Chicken pasta bake',
    side: 'Fruit cup',
  },
  Tuesday: {
    option1: 'Fried rice with vegetables',
    option2: 'Beef bolognese pasta',
    side: 'Bread roll',
  },
  Wednesday: {
    option1: 'Lentil dhal with rice',
    option2: 'Chicken stir-fry noodles',
    side: 'Banana',
  },
  Thursday: {
    option1: 'Vegetarian pasta',
    option2: 'Teriyaki chicken rice bowl',
    side: 'Fruit cup',
  },
  Friday: {
    option1: 'Chickpea curry with rice',
    option2: 'Sausage and mash',
    side: 'Bread roll',
  },
};

const mkItem = (
  id,
  name,
  description,
  price,
  image,
  tags = [],
  dietary = [],
  popular = false
) => ({
  id,
  name,
  description,
  price,
  image,
  tags,
  dietary,
  popular,
});

const RESTAURANTS = [
  {
    id: 'uq-free-food',
    name: 'UQ Free Food',
    category: 'Student welfare food',
    description: 'Free breakfast and dinner support by UQ Union',
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    logo:
      'https://uqu.com.au/wp-content/uploads/UQU_Side-Stacked_Your-Student-Union-Logo_Current_BLACK-1-1.png',
    rating: 4.9,
    waitTime: 18,
    queueCount: 25,
    isOpen: true,
    location: 'Union Complex, next to Boost Juice',
    tags: ['Free Food', 'Breakfast', 'Lunch', 'Dinner', 'Vegetarian'],
    priceRange: '$0',
    features: [
      'Student ID required',
      'Queue number system',
      'Limited servings',
    ],
    menuItems: [
      mkItem(
        'free-toast-jam',
        'Wholemeal Toast & Jam',
        'Toasted wholemeal bread with margarine and strawberry jam',
        0,
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
        ['Breakfast'],
        ['Vegetarian']
      ),
      mkItem(
        'free-muesli',
        'Muesli Cup',
        'Muesli with yoghurt and seasonal fruit',
        0,
        'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80',
        ['Breakfast', 'Popular'],
        ['Vegetarian'],
        true
      ),
      mkItem(
        'free-pancake',
        'Pancake Serve',
        'Warm pancakes with honey drizzle',
        0,
        'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
        ['Breakfast'],
        ['Vegetarian']
      ),
      mkItem(
        'free-veg-curry-rice',
        'Vegetarian Curry with Rice',
        'Mild vegetable curry served over steamed rice',
        0,
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
        ['Dinner'],
        ['Vegetarian', 'Halal Friendly']
      ),
      mkItem(
        'free-chicken-pasta-bake',
        'Chicken Pasta Bake',
        'Baked pasta with chicken and tomato herb sauce',
        0,
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
        ['Dinner'],
        []
      ),
      mkItem(
        'free-teriyaki-bowl',
        'Teriyaki Chicken Rice Bowl',
        'Teriyaki chicken with vegetables and rice',
        0,
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
        ['Dinner', 'Popular'],
        [],
        true
      ),
    ],
  },
  {
    id: 'boost-juice',
    name: 'Boost Juice',
    category: 'Juice and smoothies',
    description: 'Smoothies, crushes, juices, protein drinks',
    image:
      'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&w=1200&q=80',
    logo:
      'https://www.boostjuice.com.au/img/boost-juice-logo.png',
    rating: 4.7,
    waitTime: 9,
    queueCount: 12,
    isOpen: true,
    location: 'Union Complex, St Lucia',
    tags: ['Drinks', 'Breakfast', 'Vegetarian'],
    priceRange: '$8-$12',
    menuItems: [
      mkItem(
        'boost-mango-magic',
        'Mango Magic',
        'Mango, banana, mango nectar, vanilla yoghurt and ice',
        9.9,
        'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
        ['Smoothie', 'Popular'],
        ['Vegetarian'],
        true
      ),
      mkItem(
        'boost-mango-tango',
        'Mango Tango Crush',
        'Mango and tropical fruit crush with ice',
        9.5,
        'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80',
        ['Crush'],
        ['Vegan']
      ),
      mkItem(
        'boost-berry-crush',
        'Berry Crush',
        'Mixed berries blended with apple juice and ice',
        9.5,
        'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80',
        ['Crush'],
        ['Vegan']
      ),
      mkItem(
        'boost-all-berry-bang',
        'All Berry Bang',
        'Blueberries, strawberries, raspberry and yoghurt',
        10.2,
        'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80',
        ['Smoothie'],
        ['Vegetarian']
      ),
      mkItem(
        'boost-protein-supreme',
        'Protein Supreme',
        'Banana, protein blend, milk and peanut butter',
        11.5,
        'https://images.unsplash.com/photo-1579722821273-0f6c77d4434d?auto=format&fit=crop&w=800&q=80',
        ['Protein'],
        ['Vegetarian']
      ),
      mkItem(
        'boost-energy-lift',
        'Energy Lift',
        'Citrus blend with guarana and vitamin boost',
        10.9,
        'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80',
        ['Juice'],
        ['Vegan']
      ),
    ],
  },
  {
    id: 'kenko-sushi',
    name: 'Kenko Sushi House',
    category: 'Japanese food',
    description: 'Sushi, curry, dons, noodles, starters',
    image:
      'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80',
    logo:
      'https://www.kenkosushi.com.au/kenko-logo.png',
    rating: 4.6,
    waitTime: 14,
    queueCount: 17,
    isOpen: true,
    location: 'Union Complex, St Lucia',
    tags: ['Sushi', 'Lunch', 'Dinner'],
    priceRange: '$3.50-$13',
    menuItems: [
      mkItem(
        'kenko-miso-soup',
        'Miso Soup',
        'Traditional miso soup with tofu and wakame',
        3.5,
        'https://images.unsplash.com/photo-1607301405390-d831c242f59b?auto=format&fit=crop&w=800&q=80',
        ['Soup'],
        ['Vegetarian']
      ),
      mkItem(
        'kenko-takoyaki',
        'Takoyaki',
        'Octopus balls topped with mayo and bonito flakes',
        7.9,
        'https://images.unsplash.com/photo-1642104704074-907c0698cbdd?auto=format&fit=crop&w=800&q=80',
        ['Starter', 'Popular'],
        [],
        true
      ),
      mkItem(
        'kenko-chicken-curry',
        'Chicken Curry',
        'Japanese curry with tender chicken and rice',
        11.9,
        'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
        ['Curry'],
        []
      ),
      mkItem(
        'kenko-karaagedon',
        'Chicken Karaagedon',
        'Crispy karaage chicken over rice bowl',
        12.9,
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
        ['Don'],
        []
      ),
      mkItem(
        'kenko-katsudon-pork',
        'Katsudon Pork',
        'Pork cutlet with egg and onion over rice',
        13,
        'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?auto=format&fit=crop&w=800&q=80',
        ['Don', 'Popular'],
        [],
        true
      ),
      mkItem(
        'kenko-prawn-tempura-udon',
        'Prawn Tempura Udon',
        'Udon noodle soup with prawn tempura',
        12.5,
        'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80',
        ['Noodles'],
        []
      ),
    ],
  },
  {
    id: 'pizza-caffe',
    name: 'Pizza Caffe',
    category: 'Pizza and Italian',
    description: 'Stone-baked pizza, pasta and quick Italian bites',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    logo:
      'https://placehold.co/180x180/DC2626/FFFFFF?text=Pizza+Caffe',
    rating: 4.4,
    waitTime: 16,
    queueCount: 20,
    isOpen: true,
    location: 'Union Complex, St Lucia',
    tags: ['Lunch', 'Dinner', 'Vegetarian'],
    priceRange: '$8-$17',
    menuItems: [
      mkItem(
        'pizza-margherita',
        'Margherita Pizza',
        'Tomato, mozzarella, basil and olive oil',
        12.9,
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
        ['Pizza'],
        ['Vegetarian'],
        true
      ),
      mkItem(
        'pizza-pepperoni',
        'Pepperoni Pizza',
        'Classic pepperoni with mozzarella cheese',
        14.9,
        'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
        ['Pizza', 'Popular'],
        [],
        true
      ),
      mkItem(
        'pizza-bbq-chicken',
        'BBQ Chicken Pizza',
        'BBQ chicken, onions, cheese and smoky sauce',
        15.9,
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        ['Pizza'],
        []
      ),
      mkItem(
        'pizza-vegetarian',
        'Vegetarian Pizza',
        'Mushroom, capsicum, onion, olives and mozzarella',
        14.5,
        'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80',
        ['Pizza'],
        ['Vegetarian']
      ),
      mkItem(
        'pizza-garlic-bread',
        'Garlic Bread',
        'Toasted garlic herb bread slices',
        6.5,
        'https://images.unsplash.com/photo-1619535860434-da9d8f3406b5?auto=format&fit=crop&w=800&q=80',
        ['Sides'],
        ['Vegetarian']
      ),
      mkItem(
        'pizza-pasta-day',
        'Pasta of the Day',
        'Fresh daily pasta special, ask staff for details',
        13.9,
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
        ['Pasta'],
        []
      ),
    ],
  },
  {
    id: 'main-course',
    name: 'Main Course',
    category: 'Hot meals',
    description: 'Hearty hot meals for lunch and dinner',
    image:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80',
    logo:
      'https://placehold.co/180x180/2563EB/FFFFFF?text=Main+Course',
    rating: 4.3,
    waitTime: 13,
    queueCount: 11,
    isOpen: true,
    location: 'Union Complex, St Lucia',
    tags: ['Lunch', 'Dinner', 'Halal'],
    priceRange: '$9-$16',
    menuItems: [
      mkItem(
        'main-schnitzel',
        'Chicken Schnitzel Meal',
        'Crispy schnitzel with mash, gravy and salad',
        14.5,
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        ['Meal', 'Popular'],
        [],
        true
      ),
      mkItem(
        'main-beef-burger',
        'Beef Burger Meal',
        'Beef burger, chips and house sauce',
        14.9,
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        ['Burger'],
        []
      ),
      mkItem(
        'main-veg-pasta',
        'Vegetarian Pasta',
        'Roasted vegetable pasta with tomato basil sauce',
        12.5,
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
        ['Pasta'],
        ['Vegetarian']
      ),
      mkItem(
        'main-rice-bowl',
        'Rice Bowl',
        'Protein rice bowl with seasonal vegetables',
        11.9,
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
        ['Meal'],
        ['Halal Friendly']
      ),
      mkItem(
        'main-chips',
        'Chips',
        'Crispy seasoned fries with tomato sauce',
        5.5,
        'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
        ['Sides'],
        ['Vegetarian']
      ),
      mkItem(
        'main-daily-special',
        'Daily Special',
        'Chef special rotating hot meal',
        13.9,
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        ['Special'],
        []
      ),
    ],
  },
  {
    id: 'merlo-coffee',
    name: 'Merlo Coffee',
    category: 'Coffee and snacks',
    description: 'Coffee, pastries and quick snack options',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    logo:
      'https://www.merlo.com.au/cdn/shop/files/Social_media_icon_3_32x32.png?v=1676513963',
    rating: 4.8,
    waitTime: 7,
    queueCount: 8,
    isOpen: true,
    location: 'Union Complex, St Lucia',
    tags: ['Coffee', 'Breakfast', 'Drinks'],
    priceRange: '$4-$10',
    menuItems: [
      mkItem(
        'merlo-cappuccino',
        'Cappuccino',
        'Classic espresso with velvety milk foam',
        4.8,
        'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=800&q=80',
        ['Coffee', 'Popular'],
        ['Vegetarian'],
        true
      ),
      mkItem(
        'merlo-latte',
        'Latte',
        'Smooth espresso with steamed milk',
        4.8,
        'https://images.unsplash.com/photo-1523942839745-7848d8c8f661?auto=format&fit=crop&w=800&q=80',
        ['Coffee'],
        ['Vegetarian']
      ),
      mkItem(
        'merlo-iced-latte',
        'Iced Latte',
        'Chilled espresso, milk and ice',
        5.2,
        'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
        ['Coffee', 'Cold'],
        ['Vegetarian']
      ),
      mkItem(
        'merlo-hot-choc',
        'Hot Chocolate',
        'Rich chocolate drink with steamed milk',
        5,
        'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?auto=format&fit=crop&w=800&q=80',
        ['Drinks'],
        ['Vegetarian']
      ),
      mkItem(
        'merlo-banana-bread',
        'Banana Bread',
        'House banana bread slice',
        5.5,
        'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=800&q=80',
        ['Snack'],
        ['Vegetarian']
      ),
      mkItem(
        'merlo-croissant',
        'Croissant',
        'Buttery oven-baked croissant',
        5.2,
        'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=800&q=80',
        ['Snack'],
        ['Vegetarian']
      ),
    ],
  },
  {
    id: 'gyg',
    name: 'Guzman y Gomez',
    category: 'Mexican',
    description: 'Fast Mexican favourites and fresh bowls',
    image:
      'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1200&q=80',
    logo:
      'https://www.guzmanygomez.com.au/wp-content/uploads/2022/03/favicon-guzmanygomez.png',
    rating: 4.5,
    waitTime: 11,
    queueCount: 14,
    isOpen: true,
    location: 'Union Complex, St Lucia',
    tags: ['Lunch', 'Dinner', 'Halal'],
    priceRange: '$10-$18',
    menuItems: [
      mkItem(
        'gyg-burrito',
        'Burrito',
        'Flour tortilla filled with rice, beans, salsa and protein',
        13.5,
        'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
        ['Mexican', 'Popular'],
        [],
        true
      ),
      mkItem(
        'gyg-burrito-bowl',
        'Burrito Bowl',
        'All burrito fillings served in a bowl',
        13.5,
        'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&w=800&q=80',
        ['Mexican'],
        ['Gluten Free']
      ),
      mkItem(
        'gyg-nachos',
        'Nachos',
        'Corn chips with cheese, salsa and guacamole',
        12.5,
        'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80',
        ['Mexican'],
        ['Vegetarian Option']
      ),
      mkItem(
        'gyg-tacos',
        'Tacos',
        'Soft shell tacos with your choice of filling',
        10.9,
        'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
        ['Mexican'],
        []
      ),
      mkItem(
        'gyg-quesadilla',
        'Quesadilla',
        'Toasted tortilla with cheese and protein',
        11.9,
        'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80',
        ['Mexican'],
        []
      ),
      mkItem(
        'gyg-churros',
        'Churros',
        'Cinnamon sugar churros with chocolate dip',
        6.5,
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
        ['Dessert'],
        ['Vegetarian']
      ),
    ],
  },
  {
    id: 'market-cart',
    name: 'Market Cart',
    category: 'Quick meals and snacks',
    description: 'Grab-and-go meals, fruit and healthy snacks',
    image:
      'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?auto=format&fit=crop&w=1200&q=80',
    logo:
      'https://placehold.co/180x180/16A34A/FFFFFF?text=Market+Cart',
    rating: 4.2,
    waitTime: 6,
    queueCount: 6,
    isOpen: true,
    location: 'Union Complex, St Lucia',
    tags: ['Breakfast', 'Lunch', 'Vegetarian'],
    priceRange: '$5-$13',
    menuItems: [
      mkItem(
        'market-sandwich',
        'Sandwich',
        'Fresh sandwich with rotating fillings',
        8.5,
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
        ['Quick Meal'],
        []
      ),
      mkItem(
        'market-salad-bowl',
        'Salad Bowl',
        'Seasonal salad bowl with protein option',
        10.5,
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
        ['Healthy'],
        ['Vegetarian Option']
      ),
      mkItem(
        'market-fruit-cup',
        'Fruit Cup',
        'Mixed seasonal fruit cup',
        6,
        'https://images.unsplash.com/photo-1574226516831-e1dff420e37f?auto=format&fit=crop&w=800&q=80',
        ['Snack'],
        ['Vegan']
      ),
      mkItem(
        'market-yoghurt-cup',
        'Yoghurt Cup',
        'Greek yoghurt with muesli and honey',
        5.8,
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
        ['Snack'],
        ['Vegetarian']
      ),
      mkItem(
        'market-snack-box',
        'Snack Box',
        'Crackers, cheese, fruit and nuts',
        7.9,
        'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=800&q=80',
        ['Snack'],
        ['Vegetarian']
      ),
      mkItem(
        'market-protein-wrap',
        'Protein Wrap',
        'Chicken and salad wrap with aioli',
        9.9,
        'https://images.unsplash.com/photo-1625944515295-0f4bdb6f0ecf?auto=format&fit=crop&w=800&q=80',
        ['Quick Meal', 'Popular'],
        [],
        true
      ),
    ],
  },
  {
    id: 'on-a-roll-bakery',
    name: 'On a Roll Bakery',
    category: 'Bakery',
    description: 'Freshly baked pastries, pies and sandwiches',
    image:
      'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1200&q=80',
    logo:
      'https://placehold.co/180x180/F59E0B/FFFFFF?text=On+a+Roll',
    rating: 4.3,
    waitTime: 8,
    queueCount: 9,
    isOpen: true,
    location: 'Union Complex, St Lucia',
    tags: ['Breakfast', 'Lunch', 'Bakery'],
    priceRange: '$4-$12',
    menuItems: [
      mkItem(
        'bakery-sausage-roll',
        'Sausage Roll',
        'Flaky pastry with seasoned sausage filling',
        5.2,
        'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80',
        ['Bakery', 'Popular'],
        [],
        true
      ),
      mkItem(
        'bakery-meat-pie',
        'Meat Pie',
        'Classic Australian meat pie',
        6.2,
        'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=800&q=80',
        ['Bakery'],
        []
      ),
      mkItem(
        'bakery-spinach-roll',
        'Spinach Roll',
        'Spinach and feta pastry roll',
        5.8,
        'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
        ['Bakery'],
        ['Vegetarian']
      ),
      mkItem(
        'bakery-chicken-sandwich',
        'Chicken Sandwich',
        'Roast chicken sandwich with salad',
        8.9,
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
        ['Sandwich'],
        []
      ),
      mkItem(
        'bakery-custard-tart',
        'Custard Tart',
        'Classic custard tart with nutmeg',
        4.9,
        'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80',
        ['Dessert'],
        ['Vegetarian']
      ),
      mkItem(
        'bakery-blueberry-muffin',
        'Blueberry Muffin',
        'Fresh-baked blueberry muffin',
        4.8,
        'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80',
        ['Bakery'],
        ['Vegetarian']
      ),
    ],
  },
];

const PRIMARY_NAV = [
  { key: 'Home', label: 'Home', icon: 'home-outline', iconImage: ICON_IMAGES.home },
  {
    key: 'Restaurants',
    label: 'Restaurants',
    icon: 'storefront-outline',
    iconImage: ICON_IMAGES.restaurants,
  },
  {
    key: 'FreeFood',
    label: 'Free Food',
    icon: 'food-apple-outline',
    iconImage: ICON_IMAGES.freeFood,
  },
  { key: 'Orders', label: 'My Orders', icon: 'receipt-outline', iconImage: ICON_IMAGES.orders },
  { key: 'Profile', label: 'Profile', icon: 'person-outline', iconImage: ICON_IMAGES.profile },
];

const FILTERS = [
  'All',
  'Open Now',
  'Shortest Wait',
  'Free Food',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Drinks',
  'Sushi',
  'Coffee',
  'Vegetarian',
  'Halal',
];

const QUEUE_STEPS = [
  'Order received',
  'Preparing',
  'Almost ready',
  'Ready for pickup',
  'Collected',
];

const formatCurrency = (value) => `$${value.toFixed(2)}`;

const formatOrderTime = (isoString) => {
  const date = new Date(isoString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getQueueLevel = (queueCount) => {
  if (queueCount >= 18) {
    return 'Busy';
  }
  if (queueCount >= 10) {
    return 'Medium';
  }
  return 'Low';
};

const getQueueLevelTone = (queueLevel) => {
  if (queueLevel === 'Busy') {
    return 'warning';
  }
  if (queueLevel === 'Medium') {
    return 'info';
  }
  return 'success';
};

const getFreeFoodStatusByTime = (date = new Date()) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const totalMinutes = hour * 60 + minute;

  if (totalMinutes < 8 * 60) {
    return {
      label: 'Morning Marmalade opens soon',
      tone: 'info',
      open: false,
    };
  }
  if (totalMinutes >= 8 * 60 && totalMinutes <= 9 * 60 + 30) {
    return {
      label: 'Morning Marmalade is open now',
      tone: 'success',
      open: true,
    };
  }
  if (totalMinutes > 9 * 60 + 30 && totalMinutes < 17 * 60) {
    return {
      label: 'Free breakfast closed - Kampus Kitchen opens at 5:00pm',
      tone: 'warning',
      open: false,
    };
  }
  if (totalMinutes >= 17 * 60 && totalMinutes <= 18 * 60) {
    return {
      label: 'Kampus Kitchen is open now',
      tone: 'success',
      open: true,
    };
  }
  return {
    label: 'Free food finished for today',
    tone: 'warning',
    open: false,
  };
};

const todayWeekday = () => {
  const day = new Date().toLocaleDateString('en-AU', { weekday: 'long' });
  if (WEEK_DAYS.includes(day)) {
    return day;
  }
  return 'Monday';
};

const parseQueueNumber = (queueNumber) => Number(queueNumber.slice(1));

const statusFromStep = (step) => {
  if (step <= 0) {
    return 'Waiting';
  }
  if (step <= 2) {
    return 'Preparing';
  }
  if (step === 3) {
    return 'Ready';
  }
  return 'Collected';
};

const buildInitialOrders = () => {
  const now = Date.now();
  return [
    {
      orderId: 'ORD-2401',
      restaurantName: 'Boost Juice',
      items: ['Mango Magic', 'Protein Supreme'],
      lineItems: [
        {
          restaurantId: 'boost-juice',
          itemId: 'boost-mango-magic',
          name: 'Mango Magic',
          price: 9.9,
          quantity: 1,
        },
        {
          restaurantId: 'boost-juice',
          itemId: 'boost-protein-supreme',
          name: 'Protein Supreme',
          price: 11.5,
          quantity: 1,
        },
      ],
      total: 21.4,
      status: 'Collected',
      queueNumber: 'B102',
      estimatedWait: 0,
      pickupCounter: 'Pickup Counter 1',
      createdAt: new Date(now - 1000 * 60 * 180).toISOString(),
      paymentMethod: 'Card',
    },
    {
      orderId: 'ORD-2402',
      restaurantName: 'Pizza Caffe',
      items: ['Pepperoni Pizza', 'Garlic Bread'],
      lineItems: [
        {
          restaurantId: 'pizza-caffe',
          itemId: 'pizza-pepperoni',
          name: 'Pepperoni Pizza',
          price: 14.9,
          quantity: 1,
        },
        {
          restaurantId: 'pizza-caffe',
          itemId: 'pizza-garlic-bread',
          name: 'Garlic Bread',
          price: 6.5,
          quantity: 1,
        },
      ],
      total: 21.4,
      status: 'Cancelled',
      queueNumber: 'B111',
      estimatedWait: 0,
      pickupCounter: 'Pickup Counter 3',
      createdAt: new Date(now - 1000 * 60 * 90).toISOString(),
      paymentMethod: 'Pay at counter',
    },
    {
      orderId: 'ORD-2403',
      restaurantName: 'Kenko Sushi House',
      items: ['Chicken Curry', 'Miso Soup'],
      lineItems: [
        {
          restaurantId: 'kenko-sushi',
          itemId: 'kenko-chicken-curry',
          name: 'Chicken Curry',
          price: 11.9,
          quantity: 1,
        },
        {
          restaurantId: 'kenko-sushi',
          itemId: 'kenko-miso-soup',
          name: 'Miso Soup',
          price: 3.5,
          quantity: 1,
        },
      ],
      total: 15.4,
      status: 'Ready',
      queueNumber: 'B118',
      estimatedWait: 3,
      pickupCounter: 'Pickup Counter 2',
      createdAt: new Date(now - 1000 * 60 * 25).toISOString(),
      paymentMethod: 'UQ Student ID',
    },
  ];
};

const INITIAL_ORDERS = buildInitialOrders();

const buildInitialQueueStates = () => ({
  'ORD-2403': {
    currentNumber: 'B117',
    position: 1,
    estimatedWait: 3,
    stepIndex: 3,
    progress: 88,
  },
});

const cardShadow = Platform.select({
  ios: {
    shadowColor: '#1B062D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  android: { elevation: 4 },
  default: {
    shadowColor: '#1B062D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
  },
});

function BrandLogo({ uri, size = 36, rounded = 10, containerStyle, imageStyle }) {
  return (
    <View
      style={[
        styles.brandLogoWrap,
        {
          width: size,
          height: size,
          borderRadius: rounded,
        },
        containerStyle,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            styles.brandLogoImage,
            {
              borderRadius: rounded,
            },
            imageStyle,
          ]}
          resizeMode="contain"
        />
      ) : (
        <MaterialCommunityIcons name="storefront-outline" size={size * 0.5} color={COLORS.darkPurple} />
      )}
    </View>
  );
}

function StatusBadge({ text, tone = 'info' }) {
  const palette = {
    success: {
      bg: '#E7F6E8',
      color: COLORS.successGreen,
    },
    warning: {
      bg: '#FFF3DD',
      color: '#9A6400',
    },
    danger: {
      bg: '#FDE8E8',
      color: COLORS.errorRed,
    },
    info: {
      bg: '#ECE7F3',
      color: COLORS.primaryPurple,
    },
    neutral: {
      bg: '#ECECEC',
      color: '#575757',
    },
  };

  const selected = palette[tone] || palette.info;

  return (
    <View style={[styles.badge, { backgroundColor: selected.bg }]}> 
      <Text style={[styles.badgeText, { color: selected.color }]}>{text}</Text>
    </View>
  );
}

function QuantitySelector({ value, onDecrease, onIncrease, compact = false }) {
  return (
    <View style={[styles.quantitySelector, compact && styles.quantitySelectorCompact]}>
      <Pressable style={styles.qtyButton} onPress={onDecrease}>
        <Feather name="minus" size={14} color={COLORS.darkPurple} />
      </Pressable>
      <Text style={styles.qtyText}>{value}</Text>
      <Pressable style={styles.qtyButton} onPress={onIncrease}>
        <Feather name="plus" size={14} color={COLORS.darkPurple} />
      </Pressable>
    </View>
  );
}

function SkeletonCard({ height = 100 }) {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeletonCard,
        {
          height,
          opacity,
        },
      ]}
    />
  );
}

function OrderSuccessAnimation({ visible, queueNumber, estimatedWait }) {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    return undefined;
  }, [visible, opacity, scale]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.successOverlay, { opacity }]}> 
      <Animated.View style={[styles.successCard, { transform: [{ scale }] }]}> 
        <View style={styles.successIconCircle}>
          <Image source={{ uri: ICON_IMAGES.check }} style={styles.successIconImage} />
        </View>
        <Text style={styles.successTitle}>Payment successful!</Text>
        <Text style={styles.successSubtext}>Your order number is {queueNumber}</Text>
        <Text style={styles.successSubtext}>Estimated ready time: {estimatedWait} minutes</Text>
      </Animated.View>
    </Animated.View>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 980;
  const isWideCard = width >= 640;

  const [credentials, setCredentials] = useState({
    username: USER.username,
    password: USER.password,
  });
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [route, setRoute] = useState({ name: 'Login', params: {} });
  const [screenLoading, setScreenLoading] = useState(false);
  const [seenScreens, setSeenScreens] = useState({});

  const [restaurantSearch, setRestaurantSearch] = useState('');
  const [restaurantFilter, setRestaurantFilter] = useState('All');

  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [queueStates, setQueueStates] = useState(buildInitialQueueStates());

  const [menuSelections, setMenuSelections] = useState({});
  const [selectedFreeFoodDay, setSelectedFreeFoodDay] = useState(todayWeekday());

  const [paymentOption, setPaymentOption] = useState('UQ Student ID');
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [isKioskProcessingPayment, setIsKioskProcessingPayment] = useState(false);

  const [accessibilityPrefs, setAccessibilityPrefs] = useState({
    wheelchair: false,
    lowNoise: false,
    largeText: false,
    stepFree: true,
    staffAssist: false,
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    queueUpdates: true,
    orderReady: true,
    promotions: false,
  });

  const queueNumberSeedRef = useRef({ A: 57, B: 124 });
  const paymentStartTimerRef = useRef(null);
  const paymentDoneTimerRef = useRef(null);

  const screenFade = useRef(new Animated.Value(1)).current;

  const restaurantsMap = useMemo(() => {
    const map = {};
    RESTAURANTS.forEach((restaurant) => {
      map[restaurant.id] = restaurant;
    });
    return map;
  }, []);

  const cartDetailedItems = useMemo(() => {
    return cartItems
      .map((cartItem) => {
        const restaurant = restaurantsMap[cartItem.restaurantId];
        const menuItem = restaurant?.menuItems.find((item) => item.id === cartItem.itemId);
        if (!restaurant || !menuItem) {
          return null;
        }

        return {
          ...cartItem,
          restaurant,
          menuItem,
          lineTotal: menuItem.price * cartItem.quantity,
        };
      })
      .filter(Boolean);
  }, [cartItems, restaurantsMap]);

  const cartSummary = useMemo(() => {
    let total = 0;
    let itemCount = 0;
    const grouped = {};

    cartDetailedItems.forEach((item) => {
      total += item.lineTotal;
      itemCount += item.quantity;
      if (!grouped[item.restaurant.id]) {
        grouped[item.restaurant.id] = {
          restaurant: item.restaurant,
          items: [],
        };
      }
      grouped[item.restaurant.id].items.push(item);
    });

    const groups = Object.values(grouped);
    const isOnlyFreeFood = groups.length > 0 && groups.every((group) => group.restaurant.id === 'uq-free-food');

    return {
      total,
      itemCount,
      groups,
      isOnlyFreeFood,
    };
  }, [cartDetailedItems]);

  const freeFoodTimeStatus = useMemo(() => getFreeFoodStatusByTime(), [route.name]);

  const foodCourtCrowd = useMemo(() => {
    const avgQueue =
      RESTAURANTS.reduce((acc, restaurant) => acc + restaurant.queueCount, 0) / RESTAURANTS.length;

    if (avgQueue > 14) {
      return 'Busy';
    }
    if (avgQueue > 9) {
      return 'Medium';
    }
    return 'Low';
  }, []);

  const shortestWaitRestaurant = useMemo(() => {
    return [...RESTAURANTS]
      .filter((restaurant) => restaurant.isOpen)
      .sort((a, b) => a.waitTime - b.waitTime)[0];
  }, []);

  const filteredRestaurants = useMemo(() => {
    const query = restaurantSearch.trim().toLowerCase();

    let result = RESTAURANTS.filter((restaurant) => {
      const searchableText = `${restaurant.name} ${restaurant.category} ${restaurant.description} ${restaurant.tags.join(' ')}`.toLowerCase();
      return searchableText.includes(query);
    });

    if (restaurantFilter !== 'All') {
      if (restaurantFilter === 'Open Now') {
        result = result.filter((restaurant) => restaurant.isOpen);
      } else if (restaurantFilter === 'Shortest Wait') {
        result = [...result].sort((a, b) => a.waitTime - b.waitTime);
      } else if (restaurantFilter === 'Free Food') {
        result = result.filter((restaurant) => restaurant.id === 'uq-free-food');
      } else {
        const normalizedFilter = restaurantFilter.toLowerCase();
        result = result.filter((restaurant) => {
          const tags = restaurant.tags.map((tag) => tag.toLowerCase());
          const category = restaurant.category.toLowerCase();
          const name = restaurant.name.toLowerCase();
          return (
            tags.some((tag) => tag.includes(normalizedFilter)) ||
            category.includes(normalizedFilter) ||
            name.includes(normalizedFilter)
          );
        });
      }
    }

    return result;
  }, [restaurantSearch, restaurantFilter]);

  const selectedRestaurant = useMemo(() => {
    if (route.name !== 'RestaurantDetail') {
      return null;
    }
    return restaurantsMap[route.params.restaurantId];
  }, [route, restaurantsMap]);

  const currentQueueOrder = useMemo(() => {
    if (route.name !== 'QueueStatus') {
      return null;
    }
    return orders.find((order) => order.orderId === route.params.orderId);
  }, [orders, route]);

  const activeFreeFoodOrder = useMemo(() => {
    return orders.find(
      (order) =>
        order.restaurantName === 'UQ Free Food' &&
        order.status !== 'Collected' &&
        order.status !== 'Cancelled'
    );
  }, [orders]);

  const activeFreeFoodQueueState = activeFreeFoodOrder
    ? queueStates[activeFreeFoodOrder.orderId]
    : null;

  useEffect(() => {
    if (!isLoggedIn || route.name === 'Login') {
      return;
    }

    if (!seenScreens[route.name]) {
      setScreenLoading(true);
      const timer = setTimeout(() => {
        setScreenLoading(false);
        setSeenScreens((prev) => ({ ...prev, [route.name]: true }));
      }, 600);

      return () => clearTimeout(timer);
    }

    setScreenLoading(false);
  }, [isLoggedIn, route.name, seenScreens]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    screenFade.setValue(0);
    Animated.timing(screenFade, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [route.name, isLoggedIn, screenFade]);

  useEffect(() => {
    if (route.name === 'Payment') {
      if (cartSummary.isOnlyFreeFood || cartSummary.total === 0) {
        setPaymentOption('Free Food Pass');
      } else {
        setPaymentOption('UQ Student ID');
      }
      setIsKioskProcessingPayment(false);
    }
  }, [route.name, cartSummary.isOnlyFreeFood, cartSummary.total]);

  useEffect(() => {
    return () => {
      if (paymentStartTimerRef.current) {
        clearTimeout(paymentStartTimerRef.current);
      }
      if (paymentDoneTimerRef.current) {
        clearTimeout(paymentDoneTimerRef.current);
      }
    };
  }, []);

  const navigate = (name, params = {}) => {
    setRoute({ name, params });
  };

  const onLogin = () => {
    if (
      credentials.username === USER.username &&
      credentials.password === USER.password
    ) {
      setLoginError('');
      setIsLoggedIn(true);
      navigate('Home');
      return;
    }

    setLoginError('Invalid prototype credentials. Use the prefilled student account.');
  };

  const generateQueueNumber = (prefix) => {
    const seed = queueNumberSeedRef.current[prefix] || 1;
    const number = `${prefix}${String(seed).padStart(3, '0')}`;
    queueNumberSeedRef.current[prefix] = seed + 1;
    return number;
  };

  const adjustMenuSelection = (itemId, direction) => {
    setMenuSelections((prev) => {
      const current = prev[itemId] || 1;
      const next = direction === 'up' ? current + 1 : Math.max(1, current - 1);
      return {
        ...prev,
        [itemId]: next,
      };
    });
  };

  const addToCart = (restaurantId, menuItem, quantity = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (entry) => entry.restaurantId === restaurantId && entry.itemId === menuItem.id
      );

      if (idx === -1) {
        return [...prev, { restaurantId, itemId: menuItem.id, quantity }];
      }

      const next = [...prev];
      next[idx] = {
        ...next[idx],
        quantity: next[idx].quantity + quantity,
      };
      return next;
    });
  };

  const updateCartQuantity = (restaurantId, itemId, direction) => {
    setCartItems((prev) => {
      return prev
        .map((entry) => {
          if (entry.restaurantId === restaurantId && entry.itemId === itemId) {
            const nextQuantity =
              direction === 'up' ? entry.quantity + 1 : entry.quantity - 1;
            return {
              ...entry,
              quantity: nextQuantity,
            };
          }
          return entry;
        })
        .filter((entry) => entry.quantity > 0);
    });
  };

  const removeCartItem = (restaurantId, itemId) => {
    setCartItems((prev) =>
      prev.filter(
        (entry) => !(entry.restaurantId === restaurantId && entry.itemId === itemId)
      )
    );
  };

  const pushOrder = ({
    restaurantName,
    lineItems,
    queuePrefix,
    estimatedWait,
    pickupCounter,
    paymentMethod,
  }) => {
    const queueNumber = generateQueueNumber(queuePrefix);
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const total = lineItems.reduce((acc, lineItem) => acc + lineItem.price * lineItem.quantity, 0);
    const queueNumeric = parseQueueNumber(queueNumber);
    const initialPosition = Math.max(0, randomInt(4, 12));
    const currentQueueNumber = `${queuePrefix}${String(
      Math.max(1, queueNumeric - initialPosition)
    ).padStart(3, '0')}`;

    const order = {
      orderId,
      restaurantName,
      items: lineItems.map((lineItem) => lineItem.name),
      lineItems,
      total,
      status: 'Waiting',
      queueNumber,
      estimatedWait,
      pickupCounter,
      createdAt: new Date().toISOString(),
      paymentMethod,
    };

    setOrders((prev) => [order, ...prev]);
    setQueueStates((prev) => ({
      ...prev,
      [orderId]: {
        currentNumber: currentQueueNumber,
        position: initialPosition,
        estimatedWait,
        stepIndex: 0,
        progress: 12,
      },
    }));

    return order;
  };

  const joinFreeFoodQueue = () => {
    if (activeFreeFoodOrder) {
      navigate('QueueStatus', { orderId: activeFreeFoodOrder.orderId });
      return;
    }

    const breakfast = FREE_FOOD_BREAKFAST_MENU[selectedFreeFoodDay];
    const lineItems = [
      {
        restaurantId: 'uq-free-food',
        itemId: 'free-daily-serving',
        name: `${selectedFreeFoodDay} Free Food Serving`,
        price: 0,
        quantity: 1,
        description: `${breakfast.option1} or ${breakfast.option2}`,
      },
    ];

    const queueNumber = generateQueueNumber('A');
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const queueNumeric = parseQueueNumber(queueNumber);

    const order = {
      orderId,
      restaurantName: 'UQ Free Food',
      items: lineItems.map((lineItem) => lineItem.name),
      lineItems,
      total: 0,
      status: 'Waiting',
      queueNumber,
      estimatedWait: 18,
      pickupCounter: 'Free Food Counter',
      createdAt: new Date().toISOString(),
      paymentMethod: 'Free Food Pass',
    };

    setOrders((prev) => [order, ...prev]);

    setQueueStates((prev) => ({
      ...prev,
      [orderId]: {
        currentNumber: `A${String(Math.max(1, queueNumeric - 25)).padStart(3, '0')}`,
        position: 25,
        estimatedWait: 18,
        stepIndex: 0,
        progress: 10,
      },
    }));

    navigate('QueueStatus', { orderId });
  };

  const confirmCartOrder = () => {
    if (cartSummary.groups.length === 0 || isKioskProcessingPayment) {
      return;
    }
    setIsKioskProcessingPayment(true);

    paymentStartTimerRef.current = setTimeout(() => {
      const uniqueRestaurants = [...new Set(cartDetailedItems.map((item) => item.restaurant.name))];
      const restaurantName =
        uniqueRestaurants.length === 1
          ? uniqueRestaurants[0]
          : 'Union Food Court Multi-vendor';

      const estimatedWait = Math.max(
        5,
        ...cartDetailedItems.map((item) => item.restaurant.waitTime)
      );

      const lineItems = cartDetailedItems.map((item) => ({
        restaurantId: item.restaurant.id,
        itemId: item.menuItem.id,
        name: item.menuItem.name,
        price: item.menuItem.price,
        quantity: item.quantity,
      }));

      const order = pushOrder({
        restaurantName,
        lineItems,
        queuePrefix: 'B',
        estimatedWait,
        pickupCounter: `Pickup Counter ${randomInt(1, 3)}`,
        paymentMethod: cartSummary.total === 0 ? 'Free Food Pass' : paymentOption,
      });

      setCartItems([]);
      setIsKioskProcessingPayment(false);
      setPaymentSuccess({
        orderId: order.orderId,
        queueNumber: order.queueNumber,
        estimatedWait: order.estimatedWait,
      });

      paymentDoneTimerRef.current = setTimeout(() => {
        setPaymentSuccess(null);
        navigate('QueueStatus', { orderId: order.orderId });
      }, 1300);
    }, 3000);
  };

  const simulateQueueTick = (orderId) => {
    setQueueStates((prev) => {
      const existing = prev[orderId];
      if (!existing) {
        return prev;
      }

      const queuePrefix = currentQueueOrder?.queueNumber?.slice(0, 1) || 'B';
      const currentNumeric = parseQueueNumber(existing.currentNumber);
      const queueAdvance = randomInt(1, 3);
      const nextCurrentNumeric = currentNumeric + queueAdvance;
      const nextPosition = Math.max(0, existing.position - randomInt(2, 6));
      const nextWait = Math.max(0, existing.estimatedWait - randomInt(2, 5));

      let nextStep = existing.stepIndex;
      if (nextStep < 3) {
        nextStep += 1;
      } else if (nextStep === 3 && nextWait === 0 && nextPosition === 0) {
        nextStep = 4;
      }

      if (nextWait === 0 || nextPosition === 0) {
        nextStep = Math.max(nextStep, 3);
      }

      const progress = Math.min(100, Math.round(((nextStep + 1) / QUEUE_STEPS.length) * 100));

      return {
        ...prev,
        [orderId]: {
          ...existing,
          currentNumber: `${queuePrefix}${String(nextCurrentNumeric).padStart(3, '0')}`,
          position: nextPosition,
          estimatedWait: nextWait,
          stepIndex: nextStep,
          progress,
        },
      };
    });
  };

  useEffect(() => {
    if (!currentQueueOrder) {
      return;
    }

    const queueState = queueStates[currentQueueOrder.orderId];
    if (!queueState) {
      return;
    }

    const status = statusFromStep(queueState.stepIndex);
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === currentQueueOrder.orderId
          ? {
              ...order,
              status,
              estimatedWait: queueState.estimatedWait,
            }
          : order
      )
    );
  }, [queueStates, currentQueueOrder]);

  const markCollected = (orderId) => {
    setQueueStates((prev) => {
      const target = prev[orderId];
      if (!target) {
        return prev;
      }

      return {
        ...prev,
        [orderId]: {
          ...target,
          stepIndex: 4,
          estimatedWait: 0,
          position: 0,
          progress: 100,
        },
      };
    });

    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              status: 'Collected',
              estimatedWait: 0,
            }
          : order
      )
    );
  };

  const reorder = (order) => {
    if (!order.lineItems || order.lineItems.length === 0) {
      return;
    }

    setCartItems((prev) => {
      const next = [...prev];

      order.lineItems.forEach((lineItem) => {
        const idx = next.findIndex(
          (entry) =>
            entry.restaurantId === lineItem.restaurantId && entry.itemId === lineItem.itemId
        );

        if (idx === -1) {
          next.push({
            restaurantId: lineItem.restaurantId,
            itemId: lineItem.itemId,
            quantity: lineItem.quantity,
          });
        } else {
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + lineItem.quantity,
          };
        }
      });

      return next;
    });

    navigate('Cart');
  };

  const renderLoginScreen = () => {
    return (
      <SafeAreaView style={styles.loginRoot}>
        <StatusBar style="light" />
        <View style={styles.loginContainer}>
          <View style={styles.loginCard}>
            <View style={styles.loginLogoRow}>
              <Image source={{ uri: LOGOS.uqCrest }} style={styles.loginUqCrest} resizeMode="contain" />
              <Image source={{ uri: LOGOS.uqUnion }} style={styles.loginUqUnionLogo} resizeMode="contain" />
            </View>
            <Text style={styles.loginTitle}>UQ Union Eats</Text>
            <Text style={styles.loginSubtitle}>
              Sign in with your UQ student account
            </Text>

            <View style={styles.inputBlock}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                value={credentials.username}
                onChangeText={(value) =>
                  setCredentials((prev) => ({ ...prev, username: value }))
                }
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                value={credentials.password}
                onChangeText={(value) =>
                  setCredentials((prev) => ({ ...prev, password: value }))
                }
                secureTextEntry
                style={styles.input}
              />
            </View>

            {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

            <Pressable style={styles.primaryButton} onPress={onLogin}>
              <Text style={styles.primaryButtonText}>Login</Text>
            </Pressable>

            <Text style={styles.loginFootnote}>
              Prototype only - no real UQ login connected
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const renderHomeScreen = () => {
    const queueRestaurants = [
      'uq-free-food',
      'boost-juice',
      'kenko-sushi',
      'pizza-caffe',
      'main-course',
      'merlo-coffee',
      'gyg',
    ]
      .map((id) => restaurantsMap[id])
      .filter(Boolean);

    return (
      <ScrollView
        style={styles.screenScroll}
        contentContainerStyle={[
          styles.screenContent,
          { paddingBottom: isDesktop ? 40 : 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Welcome back, Andhika</Text>
        <Text style={styles.screenSubtitle}>
          Order first. Sit anywhere. Collect when called.
        </Text>

        <View style={[styles.heroCard, { backgroundColor: COLORS.primaryPurple }]}> 
          <View style={styles.heroCardHeader}>
            <View style={styles.heroTitleRow}>
              <BrandLogo
                uri={restaurantsMap['uq-free-food']?.logo}
                size={48}
                rounded={12}
                containerStyle={styles.heroBrandLogo}
              />
              <View style={styles.heroTitleTextWrap}>
                <Text style={styles.heroCardTitle}>UQ Free Food Today</Text>
                <Text style={styles.heroMiniText}>Union Complex</Text>
              </View>
            </View>
            <StatusBadge text={freeFoodTimeStatus.label} tone={freeFoodTimeStatus.tone} />
          </View>

          <View style={styles.heroDetailRow}>
            <MaterialCommunityIcons name="weather-sunny" size={18} color={COLORS.white} />
            <Text style={styles.heroDetailText}>Morning Marmalade: 8:00am-9:30am</Text>
          </View>
          <View style={styles.heroDetailRow}>
            <MaterialCommunityIcons name="weather-night" size={18} color={COLORS.white} />
            <Text style={styles.heroDetailText}>Kampus Kitchen: 5:00pm-6:00pm</Text>
          </View>
          <View style={styles.heroDetailRow}>
            <Ionicons name="location-outline" size={18} color={COLORS.white} />
            <Text style={styles.heroDetailText}>Next to Boost Juice</Text>
          </View>
          <View style={styles.heroDetailRow}>
            <Ionicons name="card-outline" size={18} color={COLORS.white} />
            <Text style={styles.heroDetailText}>Student ID required</Text>
          </View>

          <Pressable
            style={[styles.secondaryButton, { marginTop: 14 }]}
            onPress={() => navigate('FreeFood')}
          >
            <Text style={styles.secondaryButtonText}>View Free Food Queue</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.inlineRow}>
              <MaterialCommunityIcons
                name="account-group-outline"
                size={20}
                color={COLORS.darkPurple}
              />
              <Text style={styles.sectionTitle}>Food Court Crowd Level</Text>
            </View>
            <StatusBadge
              text={`Current crowd level: ${foodCourtCrowd}`}
              tone={foodCourtCrowd === 'Busy' ? 'warning' : 'info'}
            />
          </View>
          <Text style={styles.bodyText}>Best option: digital order + seated wait.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Vendor Logos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {RESTAURANTS.map((restaurant) => (
              <Pressable
                key={`logo-${restaurant.id}`}
                style={styles.vendorLogoTile}
                onPress={() =>
                  restaurant.id === 'uq-free-food'
                    ? navigate('FreeFood')
                    : navigate('RestaurantDetail', { restaurantId: restaurant.id })
                }
              >
                <BrandLogo uri={restaurant.logo} size={44} rounded={12} />
                <Text style={styles.vendorLogoText} numberOfLines={1}>
                  {restaurant.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Smart Recommendation</Text>
          <Text style={styles.bodyText}>
            Shortest wait right now: {shortestWaitRestaurant?.name} ({shortestWaitRestaurant?.waitTime} min)
          </Text>
          <Pressable
            style={styles.chipButton}
            onPress={() =>
              shortestWaitRestaurant?.id === 'uq-free-food'
                ? navigate('FreeFood')
                : navigate('RestaurantDetail', {
                    restaurantId: shortestWaitRestaurant?.id,
                  })
            }
          >
            <Text style={styles.chipButtonText}>Go to shortest wait</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionHeading}>Live Food Court Status</Text>
        <View style={styles.flexGrid}>
          {queueRestaurants.map((restaurant) => {
            const level = getQueueLevel(restaurant.queueCount);
            return (
              <View
                key={restaurant.id}
                style={[
                  styles.queueCard,
                  isDesktop && isWideCard
                    ? { width: '48%' }
                    : { width: '100%' },
                ]}
              >
                <View style={styles.rowBetween}>
                  <View style={styles.queueHeaderLeft}>
                    <BrandLogo uri={restaurant.logo} size={34} rounded={10} />
                    <Text style={styles.queueName}>{restaurant.name}</Text>
                  </View>
                  <StatusBadge text={level} tone={getQueueLevelTone(level)} />
                </View>
                <Text style={styles.queueMeta}>Wait {restaurant.waitTime} min • Queue {restaurant.queueCount}</Text>
                <Pressable
                  style={styles.outlineButton}
                  onPress={() =>
                    restaurant.id === 'uq-free-food'
                      ? navigate('FreeFood')
                      : navigate('RestaurantDetail', {
                          restaurantId: restaurant.id,
                        })
                  }
                >
                  <Text style={styles.outlineButtonText}>Order Now</Text>
                </Pressable>
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionHeading}>Restaurants Preview</Text>
        <View style={styles.flexGrid}>
          {RESTAURANTS.map((restaurant) => (
            <View
              key={restaurant.id}
              style={[
                styles.restaurantCard,
                isDesktop
                  ? { width: '31%' }
                  : isWideCard
                    ? { width: '48%' }
                    : { width: '100%' },
              ]}
            >
              <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
              <View style={styles.restaurantCardBody}>
                <View style={styles.restaurantHeaderRow}>
                  <BrandLogo uri={restaurant.logo} size={42} rounded={12} />
                  <View style={styles.restaurantTitleWrap}>
                    <Text style={styles.cardTitle}>{restaurant.name}</Text>
                    <Text style={styles.cardMuted}>{restaurant.category}</Text>
                  </View>
                  <StatusBadge
                    text={restaurant.isOpen ? 'Open' : 'Closed'}
                    tone={restaurant.isOpen ? 'success' : 'danger'}
                  />
                </View>
                <Text style={styles.cardMeta}>Rating: {restaurant.rating.toFixed(1)} • {restaurant.waitTime} min</Text>
                <Pressable
                  style={styles.primaryButtonSmall}
                  onPress={() =>
                    restaurant.id === 'uq-free-food'
                      ? navigate('FreeFood')
                      : navigate('RestaurantDetail', {
                          restaurantId: restaurant.id,
                        })
                  }
                >
                  <Text style={styles.primaryButtonSmallText}>Order Now</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderRestaurantsScreen = () => {
    return (
      <ScrollView
        style={styles.screenScroll}
        contentContainerStyle={[
          styles.screenContent,
          { paddingBottom: isDesktop ? 40 : 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Restaurants</Text>
        <Text style={styles.screenSubtitle}>Browse and order fast.</Text>

        <View style={styles.searchBox}>
          <Feather name="search" size={18} color="#6B6B6B" />
          <TextInput
            value={restaurantSearch}
            onChangeText={setRestaurantSearch}
            placeholder="Search food, drink, or vendor..."
            placeholderTextColor="#808080"
            style={styles.searchInput}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {FILTERS.map((filter) => {
            const active = restaurantFilter === filter;
            return (
              <Pressable
                key={filter}
                style={[
                  styles.filterChip,
                  active && styles.filterChipActive,
                ]}
                onPress={() => setRestaurantFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    active && styles.filterChipTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {filteredRestaurants.length === 0 ? (
          <View style={styles.emptyStateCard}>
            <MaterialCommunityIcons name="food-off-outline" size={36} color={COLORS.darkPurple} />
            <Text style={styles.emptyStateTitle}>No restaurants matched your filter</Text>
            <Text style={styles.emptyStateText}>
              Try another search term or switch filter options.
            </Text>
          </View>
        ) : (
          <View style={styles.flexGrid}>
            {filteredRestaurants.map((restaurant) => {
              const queueLevel = getQueueLevel(restaurant.queueCount);
              return (
                <View
                  key={restaurant.id}
                  style={[
                    styles.restaurantCard,
                    isDesktop
                      ? { width: '48%' }
                      : { width: '100%' },
                  ]}
                >
                  <Image source={{ uri: restaurant.image }} style={styles.restaurantImageLarge} />
                  <View style={styles.restaurantCardBody}>
                    <View style={styles.restaurantHeaderRow}>
                      <BrandLogo uri={restaurant.logo} size={44} rounded={12} />
                      <View style={styles.restaurantTitleWrap}>
                        <Text style={styles.cardTitle}>{restaurant.name}</Text>
                        <Text style={styles.cardMuted}>{restaurant.category}</Text>
                      </View>
                      <StatusBadge
                        text={restaurant.isOpen ? 'Open' : 'Closed'}
                        tone={restaurant.isOpen ? 'success' : 'danger'}
                      />
                    </View>
                    <View style={styles.infoRowWrap}>
                      <Text style={styles.infoPill}>Wait: {restaurant.waitTime} min</Text>
                      <Text style={styles.infoPill}>Queue: {restaurant.queueCount}</Text>
                      <Text style={styles.infoPill}>Rating: {restaurant.rating.toFixed(1)}</Text>
                      <Text style={styles.infoPill}>Price: {restaurant.priceRange}</Text>
                      <StatusBadge text={queueLevel} tone={getQueueLevelTone(queueLevel)} />
                    </View>
                    <Pressable
                      style={styles.primaryButtonSmall}
                      onPress={() =>
                        restaurant.id === 'uq-free-food'
                          ? navigate('FreeFood')
                          : navigate('RestaurantDetail', { restaurantId: restaurant.id })
                      }
                    >
                      <Text style={styles.primaryButtonSmallText}>Order Now</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    );
  };

  const renderRestaurantDetailScreen = () => {
    if (!selectedRestaurant) {
      return (
        <View style={[styles.screenContent, { paddingTop: 30 }]}> 
          <Text style={styles.emptyStateTitle}>Restaurant not found</Text>
          <Pressable style={styles.primaryButtonSmall} onPress={() => navigate('Restaurants')}>
            <Text style={styles.primaryButtonSmallText}>Back to Restaurants</Text>
          </Pressable>
        </View>
      );
    }

    const menuCategories = [...new Set(selectedRestaurant.menuItems.flatMap((item) => item.tags))].slice(0, 6);

    return (
      <ScrollView
        style={styles.screenScroll}
        contentContainerStyle={[
          styles.screenContent,
          { paddingBottom: isDesktop ? 40 : 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backButton} onPress={() => navigate('Restaurants')}>
          <Ionicons name="chevron-back" size={18} color={COLORS.darkPurple} />
          <Text style={styles.backButtonText}>Back to restaurants</Text>
        </Pressable>

        <Image source={{ uri: selectedRestaurant.image }} style={styles.detailBanner} />

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.detailHeaderLeft}>
              <BrandLogo uri={selectedRestaurant.logo} size={52} rounded={14} />
              <Text style={styles.screenTitleSecondary}>{selectedRestaurant.name}</Text>
            </View>
            <StatusBadge
              text={selectedRestaurant.isOpen ? 'Open now' : 'Closed'}
              tone={selectedRestaurant.isOpen ? 'success' : 'danger'}
            />
          </View>
          <Text style={styles.cardMeta}>Rating {selectedRestaurant.rating.toFixed(1)} • Wait {selectedRestaurant.waitTime} min • Queue {selectedRestaurant.queueCount}</Text>
          <Text style={styles.cardMeta}>{selectedRestaurant.location}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Menu categories</Text>
          <View style={styles.infoRowWrap}>
            {menuCategories.map((category) => (
              <View key={category} style={styles.infoPillChip}>
                <Text style={styles.infoPillChipText}>{category}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionHeading}>Menu items</Text>
        <View style={styles.flexGrid}>
          {selectedRestaurant.menuItems.map((menuItem) => {
            const quantity = menuSelections[menuItem.id] || 1;
            return (
              <View
                key={menuItem.id}
                style={[
                  styles.menuCard,
                  isDesktop
                    ? { width: '48%' }
                    : { width: '100%' },
                ]}
              >
                <Image source={{ uri: menuItem.image }} style={styles.menuImage} />
                <View style={styles.menuBody}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.cardTitle}>{menuItem.name}</Text>
                    <Text style={styles.priceText}>{formatCurrency(menuItem.price)}</Text>
                  </View>
                  <Text style={styles.cardMuted}>{menuItem.description}</Text>

                  <View style={styles.infoRowWrap}>
                    {menuItem.tags.map((tag) => (
                      <View key={`${menuItem.id}-${tag}`} style={styles.infoPillChip}>
                        <Text style={styles.infoPillChipText}>{tag}</Text>
                      </View>
                    ))}
                    {menuItem.dietary.map((diet) => (
                      <View key={`${menuItem.id}-${diet}`} style={styles.infoPillChipSecondary}>
                        <Text style={styles.infoPillChipTextSecondary}>{diet}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.rowBetween}>
                    <QuantitySelector
                      value={quantity}
                      onDecrease={() => adjustMenuSelection(menuItem.id, 'down')}
                      onIncrease={() => adjustMenuSelection(menuItem.id, 'up')}
                    />
                    <Pressable
                      style={styles.primaryButtonSmall}
                      onPress={() => addToCart(selectedRestaurant.id, menuItem, quantity)}
                    >
                      <Text style={styles.primaryButtonSmallText}>Add</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  const renderFreeFoodScreen = () => {
    const breakfastMenu = FREE_FOOD_BREAKFAST_MENU[selectedFreeFoodDay];
    const dinnerMenu = FREE_FOOD_DINNER_MENU[selectedFreeFoodDay];

    const trackerCurrentNumber = activeFreeFoodQueueState?.currentNumber || 'A032';
    const trackerYourNumber = activeFreeFoodOrder?.queueNumber || 'A057';
    const trackerPeopleAhead = activeFreeFoodQueueState?.position ?? 25;
    const trackerWait = activeFreeFoodQueueState?.estimatedWait ?? 18;

    return (
      <ScrollView
        style={styles.screenScroll}
        contentContainerStyle={[
          styles.screenContent,
          { paddingBottom: isDesktop ? 40 : 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.freeFoodTitleRow}>
          <BrandLogo uri={restaurantsMap['uq-free-food']?.logo} size={52} rounded={12} />
          <View style={styles.freeFoodTitleTextWrap}>
            <Text style={styles.screenTitle}>UQ Free Food</Text>
            <Text style={styles.screenSubtitle}>Join queue, sit anywhere, pick up when called.</Text>
          </View>
        </View>

        <View style={styles.cardPurpleSoft}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitleLight}>Free Food Schedule</Text>
            <StatusBadge text={freeFoodTimeStatus.label} tone={freeFoodTimeStatus.tone} />
          </View>

          <View style={styles.scheduleCard}>
            <Text style={styles.scheduleTitle}>Morning Marmalade</Text>
            <Text style={styles.scheduleLineLight}>Time: 8:00am-9:30am</Text>
            <Text style={styles.scheduleLineLight}>Type: Free breakfast</Text>
            <Text style={styles.scheduleLineLight}>Location: Union Complex, next to Boost Juice</Text>
            <Text style={styles.scheduleLineLight}>Requirement: Bring student ID</Text>
          </View>

          <View style={styles.scheduleCard}>
            <Text style={styles.scheduleTitle}>Kampus Kitchen</Text>
            <Text style={styles.scheduleLineLight}>Time: 5:00pm-6:00pm</Text>
            <Text style={styles.scheduleLineLight}>Type: Free dinner</Text>
            <Text style={styles.scheduleLineLight}>Location: Union Complex, next to Boost Juice</Text>
            <Text style={styles.scheduleLineLight}>Requirement: Bring student ID</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Daily menu rotation</Text>
          <Text style={styles.cardMuted}>Morning Marmalade menu prototype</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayTabScroll}>
            {WEEK_DAYS.map((day) => {
              const active = selectedFreeFoodDay === day;
              return (
                <Pressable
                  key={day}
                  style={[styles.dayTab, active && styles.dayTabActive]}
                  onPress={() => setSelectedFreeFoodDay(day)}
                >
                  <Text style={[styles.dayTabText, active && styles.dayTabTextActive]}>{day}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.menuPrototypeCard}>
            <Text style={styles.cardTitle}>Morning Marmalade ({selectedFreeFoodDay})</Text>
            <Text style={styles.scheduleLine}>Option 1: {breakfastMenu.option1}</Text>
            <Text style={styles.scheduleLine}>Option 2: {breakfastMenu.option2}</Text>
            <Text style={styles.scheduleLine}>Drink: {breakfastMenu.drink}</Text>
            <Text style={styles.scheduleLine}>Fruit: {breakfastMenu.fruit}</Text>
          </View>

          <View style={styles.menuPrototypeCard}>
            <Text style={styles.cardTitle}>Kampus Kitchen ({selectedFreeFoodDay})</Text>
            <Text style={styles.cardMuted}>
              Dinner prototype menu
            </Text>
            <Text style={styles.scheduleLine}>Option 1: {dinnerMenu.option1}</Text>
            <Text style={styles.scheduleLine}>Option 2: {dinnerMenu.option2}</Text>
            <Text style={styles.scheduleLine}>Side: {dinnerMenu.side}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Free Food Queue Tracker</Text>
          <View style={styles.infoRowWrap}>
            <View style={styles.metricTile}>
              <Text style={styles.metricLabel}>Current number being served</Text>
              <Text style={styles.metricValue}>{trackerCurrentNumber}</Text>
            </View>
            <View style={styles.metricTile}>
              <Text style={styles.metricLabel}>Your number</Text>
              <Text style={styles.metricValue}>{trackerYourNumber}</Text>
            </View>
            <View style={styles.metricTile}>
              <Text style={styles.metricLabel}>People ahead</Text>
              <Text style={styles.metricValue}>{trackerPeopleAhead}</Text>
            </View>
            <View style={styles.metricTile}>
              <Text style={styles.metricLabel}>Estimated wait</Text>
              <Text style={styles.metricValue}>{trackerWait} min</Text>
            </View>
            <View style={styles.metricTile}>
              <Text style={styles.metricLabel}>Servings left</Text>
              <Text style={styles.metricValue}>84</Text>
            </View>
          </View>

          <Pressable style={styles.primaryButton} onPress={joinFreeFoodQueue}>
            <Text style={styles.primaryButtonText}>Join Free Food Queue</Text>
          </Pressable>
        </View>

        <View style={styles.card}> 
          <Text style={styles.sectionTitle}>Free Food Rules</Text>
          <Text style={styles.ruleLine}>- One serving per student</Text>
          <Text style={styles.ruleLine}>- Student ID required</Text>
          <Text style={styles.ruleLine}>- Join only when on campus</Text>
          <Text style={styles.ruleLine}>- Collect immediately when called</Text>
        </View>
      </ScrollView>
    );
  };

  const renderCartScreen = () => {
    return (
      <ScrollView
        style={styles.screenScroll}
        contentContainerStyle={[
          styles.screenContent,
          { paddingBottom: isDesktop ? 40 : 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Cart</Text>

        {cartSummary.groups.length === 0 ? (
          <View style={styles.emptyStateCard}>
            <MaterialCommunityIcons name="cart-outline" size={38} color={COLORS.darkPurple} />
            <Text style={styles.emptyStateTitle}>Your cart is empty</Text>
            <Text style={styles.emptyStateText}>Add items from restaurants to get started.</Text>
            <Pressable
              style={styles.primaryButtonSmall}
              onPress={() => navigate('Restaurants')}
            >
              <Text style={styles.primaryButtonSmallText}>Browse restaurants</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            {cartSummary.groups.map((group) => (
              <View key={group.restaurant.id} style={styles.card}>
                <Text style={styles.sectionTitle}>{group.restaurant.name}</Text>
                {group.items.map((item) => (
                  <View key={`${item.restaurant.id}-${item.menuItem.id}`} style={styles.cartRow}>
                    <View style={styles.cartItemTextWrap}>
                      <Text style={styles.cardTitle}>{item.menuItem.name}</Text>
                      <Text style={styles.cardMeta}>{formatCurrency(item.menuItem.price)} each</Text>
                    </View>
                    <QuantitySelector
                      compact
                      value={item.quantity}
                      onDecrease={() =>
                        updateCartQuantity(item.restaurant.id, item.menuItem.id, 'down')
                      }
                      onIncrease={() =>
                        updateCartQuantity(item.restaurant.id, item.menuItem.id, 'up')
                      }
                    />
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => removeCartItem(item.restaurant.id, item.menuItem.id)}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            ))}

            <View style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.sectionTitle}>Subtotal</Text>
                <Text style={styles.priceText}>{formatCurrency(cartSummary.total)}</Text>
              </View>
              <View style={styles.rowBetween}>
                <Text style={styles.sectionTitle}>Total</Text>
                <Text style={styles.priceBig}>{formatCurrency(cartSummary.total)}</Text>
              </View>
              <Text style={styles.microcopyBig}>
                Sit anywhere after checkout - your number will be called.
              </Text>

              <Pressable
                style={styles.primaryButton}
                onPress={() => navigate('Payment')}
              >
                <Text style={styles.primaryButtonText}>Checkout</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    );
  };

  const renderPaymentScreen = () => {
    const paymentOptions = [
      'UQ Student ID',
      'Apple Pay',
      'Card',
      'Pay at counter',
      'Free Food Pass',
    ];

    const isFreeFoodOrder = cartSummary.total === 0;

    return (
      <View style={styles.flexFill}>
        <ScrollView
          style={styles.screenScroll}
          contentContainerStyle={[
            styles.screenContent,
            { paddingBottom: isDesktop ? 40 : 120 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.screenTitle}>Payment</Text>

          {cartSummary.groups.length === 0 ? (
            <View style={styles.emptyStateCard}>
              <Text style={styles.emptyStateTitle}>No items to checkout</Text>
              <Text style={styles.emptyStateText}>Add items to your cart before payment.</Text>
              <Pressable style={styles.primaryButtonSmall} onPress={() => navigate('Restaurants')}>
                <Text style={styles.primaryButtonSmallText}>Go to restaurants</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Order summary</Text>
                {cartDetailedItems.map((item) => (
                  <View key={`${item.restaurant.id}-${item.menuItem.id}`} style={styles.rowBetween}>
                    <Text style={styles.bodyText}>
                      {item.menuItem.name} x{item.quantity}
                    </Text>
                    <Text style={styles.bodyText}>{formatCurrency(item.lineTotal)}</Text>
                  </View>
                ))}
                <View style={styles.divider} />
                <View style={styles.rowBetween}>
                  <Text style={styles.sectionTitle}>Total</Text>
                  <Text style={styles.priceBig}>{formatCurrency(cartSummary.total)}</Text>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Choose payment method</Text>
                {paymentOptions.map((option) => {
                  const isDisabled = isFreeFoodOrder && option !== 'Free Food Pass';
                  const active = paymentOption === option;
                  return (
                    <Pressable
                      key={option}
                      onPress={() => {
                        if (!isDisabled) {
                          setPaymentOption(option);
                        }
                      }}
                      style={[
                        styles.paymentOption,
                        active && styles.paymentOptionActive,
                        isDisabled && styles.paymentOptionDisabled,
                      ]}
                    >
                      <View style={styles.radioOuter}>
                        {active ? <View style={styles.radioInner} /> : null}
                      </View>
                      <Text
                        style={[
                          styles.paymentText,
                          isDisabled && styles.paymentTextDisabled,
                        ]}
                      >
                        {option}
                        {option === 'Free Food Pass' ? ' - $0.00' : ''}
                      </Text>
                    </Pressable>
                  );
                })}

                <View style={styles.kioskInstructionCard}>
                  <View style={styles.inlineRow}>
                    <Ionicons name="card-outline" size={18} color={COLORS.darkPurple} />
                    <Text style={styles.kioskInstructionTitle}>Kiosk Tap Payment</Text>
                  </View>
                  <Text style={styles.kioskInstructionText}>1. Choose your payment method above.</Text>
                  <Text style={styles.kioskInstructionText}>2. Tap your card or phone on the counter reader.</Text>
                  <Text style={styles.kioskInstructionText}>
                    {isKioskProcessingPayment
                      ? 'Processing payment... please keep your card near the reader.'
                      : 'Ready to tap and pay.'}
                  </Text>
                </View>

                <Pressable
                  style={[
                    styles.primaryButton,
                    isKioskProcessingPayment && styles.primaryButtonDisabled,
                  ]}
                  onPress={confirmCartOrder}
                >
                  <Text style={styles.primaryButtonText}>
                    {isKioskProcessingPayment
                      ? 'Processing...'
                      : isFreeFoodOrder
                        ? 'Confirm Free Food Pass'
                        : 'Tap on Counter to Pay'}
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </ScrollView>

        <OrderSuccessAnimation
          visible={!!paymentSuccess}
          queueNumber={paymentSuccess?.queueNumber}
          estimatedWait={paymentSuccess?.estimatedWait}
        />
      </View>
    );
  };

  const renderQueueStatusScreen = () => {
    if (!currentQueueOrder) {
      return (
        <View style={[styles.screenContent, { paddingTop: 32 }]}> 
          <Text style={styles.emptyStateTitle}>No active queue found</Text>
          <Pressable style={styles.primaryButtonSmall} onPress={() => navigate('Orders')}>
            <Text style={styles.primaryButtonSmallText}>View my orders</Text>
          </Pressable>
        </View>
      );
    }

    const queueState = queueStates[currentQueueOrder.orderId] || {
      currentNumber: currentQueueOrder.queueNumber,
      position: 0,
      estimatedWait: currentQueueOrder.estimatedWait,
      stepIndex: currentQueueOrder.status === 'Collected' ? 4 : 0,
      progress: 20,
    };

    const ready = queueState.stepIndex >= 3;

    return (
      <ScrollView
        style={styles.screenScroll}
        contentContainerStyle={[
          styles.screenContent,
          { paddingBottom: isDesktop ? 40 : 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Waiting / Queue Status</Text>

        <View style={styles.queueNumberHero}>
          <Text style={styles.queueNumberLabel}>Your Order Number</Text>
          <Text style={styles.queueNumberValue}>{currentQueueOrder.queueNumber}</Text>
          <Text style={styles.queueNumberSub}>{currentQueueOrder.restaurantName}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order details</Text>
          <Text style={styles.bodyText}>Items: {currentQueueOrder.items.join(', ')}</Text>
          <Text style={styles.bodyText}>
            Current number being prepared: {queueState.currentNumber}
          </Text>
          <Text style={styles.bodyText}>Your position in queue: {queueState.position}</Text>
          <Text style={styles.bodyText}>Estimated wait time: {queueState.estimatedWait} minutes</Text>
          <Text style={styles.bodyText}>Pickup counter: {currentQueueOrder.pickupCounter}</Text>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${queueState.progress}%` }]} />
          </View>

          <View style={styles.statusStepsWrap}>
            {QUEUE_STEPS.map((step, idx) => {
              const active = idx <= queueState.stepIndex;
              return (
                <View key={step} style={styles.stepItem}>
                  <View style={[styles.stepDot, active && styles.stepDotActive]}>
                    {active ? (
                      <Image source={{ uri: ICON_IMAGES.check }} style={styles.stepCheckImage} />
                    ) : null}
                  </View>
                  <Text style={[styles.stepText, active && styles.stepTextActive]}>{step}</Text>
                </View>
              );
            })}
          </View>

          {queueState.stepIndex < 4 ? (
            <Pressable
              style={styles.primaryButton}
              onPress={() => simulateQueueTick(currentQueueOrder.orderId)}
            >
              <Text style={styles.primaryButtonText}>Simulate Time Passing</Text>
            </Pressable>
          ) : null}

          {ready ? (
            <View style={styles.readyCard}>
              <Text style={styles.readyTitle}>Your food is ready!</Text>
              <Text style={styles.readyText}>
                Please collect from {currentQueueOrder.pickupCounter}.
              </Text>
              {queueState.stepIndex < 4 ? (
                <Pressable
                  style={styles.secondaryButtonGreen}
                  onPress={() => markCollected(currentQueueOrder.orderId)}
                >
                  <Text style={styles.secondaryButtonGreenText}>Mark as Collected</Text>
                </Pressable>
              ) : (
                <Text style={styles.readyText}>Order collected. Enjoy your meal.</Text>
              )}
            </View>
          ) : null}

          <View style={styles.noticeCard}>
            <Text style={styles.noticeText}>
              You do not need to stand near the counter. Please keep pathways clear and wait comfortably in the seating area.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderOrdersScreen = () => {
    const currentOrders = orders.filter(
      (order) => order.status !== 'Collected' && order.status !== 'Cancelled'
    );
    const previousOrders = orders.filter(
      (order) => order.status === 'Collected' || order.status === 'Cancelled'
    );

    return (
      <ScrollView
        style={styles.screenScroll}
        contentContainerStyle={[
          styles.screenContent,
          { paddingBottom: isDesktop ? 40 : 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>My Orders</Text>

        <Text style={styles.sectionHeading}>Current Orders</Text>
        {currentOrders.length === 0 ? (
          <View style={styles.emptyStateCard}>
            <Text style={styles.emptyStateTitle}>No active orders</Text>
            <Text style={styles.emptyStateText}>
              Place an order to track it in real time.
            </Text>
          </View>
        ) : (
          currentOrders.map((order) => (
            <View key={order.orderId} style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.cardTitle}>{order.orderId}</Text>
                <StatusBadge
                  text={order.status}
                  tone={
                    order.status === 'Ready'
                      ? 'success'
                      : order.status === 'Preparing' || order.status === 'Waiting'
                        ? 'warning'
                        : 'neutral'
                  }
                />
              </View>
              <Text style={styles.bodyText}>Vendor: {order.restaurantName}</Text>
              <Text style={styles.bodyText}>Items: {order.items.join(', ')}</Text>
              <Text style={styles.bodyText}>Time: {formatOrderTime(order.createdAt)}</Text>
              <Text style={styles.bodyText}>Total: {formatCurrency(order.total)}</Text>
              <View style={styles.rowBetween}>
                <Pressable
                  style={styles.outlineButton}
                  onPress={() => navigate('QueueStatus', { orderId: order.orderId })}
                >
                  <Text style={styles.outlineButtonText}>Track Queue</Text>
                </Pressable>
                <Pressable
                  style={styles.primaryButtonSmall}
                  onPress={() => reorder(order)}
                >
                  <Text style={styles.primaryButtonSmallText}>Reorder</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}

        <Text style={styles.sectionHeading}>Previous Orders</Text>
        {previousOrders.length === 0 ? (
          <View style={styles.emptyStateCard}>
            <Text style={styles.emptyStateText}>No previous orders yet.</Text>
          </View>
        ) : (
          previousOrders.map((order) => (
            <View key={order.orderId} style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.cardTitle}>{order.orderId}</Text>
                <StatusBadge
                  text={order.status}
                  tone={order.status === 'Collected' ? 'success' : 'danger'}
                />
              </View>
              <Text style={styles.bodyText}>Vendor: {order.restaurantName}</Text>
              <Text style={styles.bodyText}>Items: {order.items.join(', ')}</Text>
              <Text style={styles.bodyText}>Time: {formatOrderTime(order.createdAt)}</Text>
              <Text style={styles.bodyText}>Total: {formatCurrency(order.total)}</Text>
              <Pressable
                style={styles.primaryButtonSmall}
                onPress={() => reorder(order)}
              >
                <Text style={styles.primaryButtonSmallText}>Reorder</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    );
  };

  const renderProfileScreen = () => {
    return (
      <ScrollView
        style={styles.screenScroll}
        contentContainerStyle={[
          styles.screenContent,
          { paddingBottom: isDesktop ? 40 : 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Profile</Text>

        <View style={styles.card}>
          <Text style={styles.bodyText}>Name: {USER.name}</Text>
          <Text style={styles.bodyText}>Student ID: {USER.studentId}</Text>
          <Text style={styles.bodyText}>Account type: UQ Student</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Text style={styles.preferenceLabel}>Favourite vendors</Text>
          <View style={styles.infoRowWrap}>
            {['Boost Juice', 'Kenko Sushi', 'Merlo Coffee'].map((vendor) => (
              <View key={vendor} style={styles.infoPillChip}>
                <Text style={styles.infoPillChipText}>{vendor}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.preferenceLabel, { marginTop: 12 }]}>Dietary preferences</Text>
          <View style={styles.infoRowWrap}>
            {['Vegetarian options', 'Low sugar drinks', 'Halal friendly'].map((diet) => (
              <View key={diet} style={styles.infoPillChipSecondary}>
                <Text style={styles.infoPillChipTextSecondary}>{diet}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.preferenceLabel, { marginTop: 12 }]}>Notification preferences</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Queue updates</Text>
            <Switch
              value={notificationPrefs.queueUpdates}
              onValueChange={(value) =>
                setNotificationPrefs((prev) => ({ ...prev, queueUpdates: value }))
              }
              trackColor={{ true: '#B48DD5', false: '#D1D1D1' }}
              thumbColor={notificationPrefs.queueUpdates ? COLORS.primaryPurple : '#F4F4F4'}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Order ready alerts</Text>
            <Switch
              value={notificationPrefs.orderReady}
              onValueChange={(value) =>
                setNotificationPrefs((prev) => ({ ...prev, orderReady: value }))
              }
              trackColor={{ true: '#B48DD5', false: '#D1D1D1' }}
              thumbColor={notificationPrefs.orderReady ? COLORS.primaryPurple : '#F4F4F4'}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Promotions</Text>
            <Switch
              value={notificationPrefs.promotions}
              onValueChange={(value) =>
                setNotificationPrefs((prev) => ({ ...prev, promotions: value }))
              }
              trackColor={{ true: '#B48DD5', false: '#D1D1D1' }}
              thumbColor={notificationPrefs.promotions ? COLORS.primaryPurple : '#F4F4F4'}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Accessibility Preferences</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Wheelchair-friendly pickup</Text>
            <Switch
              value={accessibilityPrefs.wheelchair}
              onValueChange={(value) =>
                setAccessibilityPrefs((prev) => ({ ...prev, wheelchair: value }))
              }
              trackColor={{ true: '#A9DCA5', false: '#D1D1D1' }}
              thumbColor={accessibilityPrefs.wheelchair ? COLORS.successGreen : '#F4F4F4'}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Low-noise seating</Text>
            <Switch
              value={accessibilityPrefs.lowNoise}
              onValueChange={(value) =>
                setAccessibilityPrefs((prev) => ({ ...prev, lowNoise: value }))
              }
              trackColor={{ true: '#A9DCA5', false: '#D1D1D1' }}
              thumbColor={accessibilityPrefs.lowNoise ? COLORS.successGreen : '#F4F4F4'}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Large text mode</Text>
            <Switch
              value={accessibilityPrefs.largeText}
              onValueChange={(value) =>
                setAccessibilityPrefs((prev) => ({ ...prev, largeText: value }))
              }
              trackColor={{ true: '#A9DCA5', false: '#D1D1D1' }}
              thumbColor={accessibilityPrefs.largeText ? COLORS.successGreen : '#F4F4F4'}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Step-free route</Text>
            <Switch
              value={accessibilityPrefs.stepFree}
              onValueChange={(value) =>
                setAccessibilityPrefs((prev) => ({ ...prev, stepFree: value }))
              }
              trackColor={{ true: '#A9DCA5', false: '#D1D1D1' }}
              thumbColor={accessibilityPrefs.stepFree ? COLORS.successGreen : '#F4F4F4'}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Need staff assistance</Text>
            <Switch
              value={accessibilityPrefs.staffAssist}
              onValueChange={(value) =>
                setAccessibilityPrefs((prev) => ({ ...prev, staffAssist: value }))
              }
              trackColor={{ true: '#A9DCA5', false: '#D1D1D1' }}
              thumbColor={accessibilityPrefs.staffAssist ? COLORS.successGreen : '#F4F4F4'}
            />
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderSkeletonScreen = () => (
    <ScrollView
      style={styles.screenScroll}
      contentContainerStyle={[styles.screenContent, { paddingBottom: isDesktop ? 40 : 120 }]}
    >
      <SkeletonCard height={120} />
      <SkeletonCard height={180} />
      <SkeletonCard height={120} />
      <SkeletonCard height={130} />
    </ScrollView>
  );

  const renderScreen = () => {
    if (screenLoading) {
      return renderSkeletonScreen();
    }

    if (route.name === 'Home') {
      return renderHomeScreen();
    }
    if (route.name === 'Restaurants') {
      return renderRestaurantsScreen();
    }
    if (route.name === 'RestaurantDetail') {
      return renderRestaurantDetailScreen();
    }
    if (route.name === 'FreeFood') {
      return renderFreeFoodScreen();
    }
    if (route.name === 'Cart') {
      return renderCartScreen();
    }
    if (route.name === 'Payment') {
      return renderPaymentScreen();
    }
    if (route.name === 'QueueStatus') {
      return renderQueueStatusScreen();
    }
    if (route.name === 'Orders') {
      return renderOrdersScreen();
    }
    if (route.name === 'Profile') {
      return renderProfileScreen();
    }

    return renderHomeScreen();
  };

  const renderDesktopNav = () => (
    <View style={styles.desktopNav}> 
      <View style={styles.desktopBrand}> 
        <BrandLogo
          uri={LOGOS.uqCrest}
          size={34}
          rounded={8}
          containerStyle={styles.desktopBrandIcon}
          imageStyle={styles.desktopBrandIconImage}
        />
        <Text style={styles.desktopBrandText}>UQ Union Eats</Text>
      </View>

      <View style={styles.desktopNavButtons}>
        {PRIMARY_NAV.map((tab) => {
          const active = route.name === tab.key;
          return (
            <Pressable
              key={tab.key}
              style={[styles.desktopNavButton, active && styles.desktopNavButtonActive]}
              onPress={() => navigate(tab.key)}
            >
              <Ionicons
                name={tab.icon}
                size={16}
                color={active ? COLORS.darkPurple : COLORS.white}
              />
              <Text
                style={[
                  styles.desktopNavButtonText,
                  active && styles.desktopNavButtonTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.desktopCartButton} onPress={() => navigate('Cart')}>
        <Ionicons name="cart-outline" size={16} color={COLORS.darkPurple} />
        <Text style={styles.desktopCartText}>{cartSummary.itemCount} items</Text>
      </Pressable>
    </View>
  );

  const renderMobileNav = () => (
    <View style={styles.mobileNav}>
      {PRIMARY_NAV.map((tab) => {
        const active = route.name === tab.key;
        return (
          <Pressable
            key={tab.key}
            style={styles.mobileNavButton}
            onPress={() => navigate(tab.key)}
          >
            <View style={[styles.mobileNavIconWrap, active && styles.mobileNavIconWrapActive]}>
              <Image source={{ uri: tab.iconImage }} style={styles.mobileNavIconImage} />
            </View>
            <Text
              style={[
                styles.mobileNavText,
                active && styles.mobileNavTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  if (!isLoggedIn || route.name === 'Login') {
    return renderLoginScreen();
  }

  return (
    <SafeAreaView style={styles.appRoot}>
      <StatusBar style="dark" />
      {isDesktop ? renderDesktopNav() : null}

      <Animated.View style={[styles.screenWrap, { opacity: screenFade }]}> 
        {renderScreen()}
      </Animated.View>

      {cartSummary.itemCount > 0 && route.name !== 'Cart' && route.name !== 'Payment' ? (
        <Pressable
          style={[
            styles.stickyCart,
            {
              bottom: isDesktop ? 26 : 86,
            },
          ]}
          onPress={() => navigate('Cart')}
        >
          <View>
            <Text style={styles.stickyCartTextTop}>{cartSummary.itemCount} items in cart</Text>
            <Text style={styles.stickyCartTextBottom}>View cart • {formatCurrency(cartSummary.total)}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={COLORS.white} />
        </Pressable>
      ) : null}

      {!isDesktop ? renderMobileNav() : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  appRoot: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  screenWrap: {
    flex: 1,
  },
  loginRoot: {
    flex: 1,
    backgroundColor: COLORS.darkPurple,
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loginCard: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    ...cardShadow,
  },
  loginLogoRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  loginUqCrest: {
    width: 72,
    height: 72,
    marginBottom: 8,
  },
  loginUqUnionLogo: {
    width: 220,
    height: 40,
  },
  uqIconBubble: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#EFE9F5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  loginTitle: {
    textAlign: 'center',
    fontSize: 31,
    fontWeight: '800',
    color: COLORS.darkPurple,
    marginBottom: 6,
  },
  loginSubtitle: {
    textAlign: 'center',
    fontSize: 15,
    color: '#595959',
    marginBottom: 18,
  },
  inputBlock: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 13,
    color: '#5A5A5A',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#FCFCFC',
  },
  errorText: {
    color: COLORS.errorRed,
    marginBottom: 8,
    fontSize: 13,
  },
  loginFootnote: {
    textAlign: 'center',
    color: '#656565',
    marginTop: 14,
    fontSize: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primaryPurple,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 13,
    marginTop: 8,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  secondaryButtonText: {
    color: COLORS.darkPurple,
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryButtonGreen: {
    backgroundColor: COLORS.successGreen,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  secondaryButtonGreenText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 13,
  },
  primaryButtonSmall: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryPurple,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  primaryButtonSmallText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.primaryPurple,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  outlineButtonText: {
    color: COLORS.primaryPurple,
    fontWeight: '700',
    fontSize: 13,
  },
  chipButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: '#EEE5F6',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipButtonText: {
    color: COLORS.darkPurple,
    fontWeight: '700',
    fontSize: 12,
  },
  screenScroll: {
    flex: 1,
  },
  screenContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    width: '100%',
    maxWidth: 1240,
    alignSelf: 'center',
  },
  screenTitle: {
    fontSize: 29,
    fontWeight: '800',
    color: COLORS.darkPurple,
    marginBottom: 4,
  },
  screenTitleSecondary: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.darkPurple,
    marginBottom: 2,
    flex: 1,
    marginRight: 10,
  },
  screenSubtitle: {
    fontSize: 15,
    color: '#595959',
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 21,
    fontWeight: '800',
    color: COLORS.darkPurple,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.darkPurple,
    marginBottom: 6,
  },
  sectionTitleLight: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 8,
  },
  bodyText: {
    color: COLORS.darkText,
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  microcopy: {
    color: '#595959',
    fontSize: 13,
    marginTop: 10,
  },
  microcopyBig: {
    color: '#555555',
    fontSize: 14,
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    ...cardShadow,
  },
  cardPurpleSoft: {
    backgroundColor: COLORS.primaryPurple,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    ...cardShadow,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    ...cardShadow,
  },
  heroCardHeader: {
    marginBottom: 10,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroBrandLogo: {
    backgroundColor: COLORS.white,
    marginRight: 10,
  },
  heroTitleTextWrap: {
    flex: 1,
  },
  heroCardTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 0,
  },
  heroMiniText: {
    color: '#DAC8ED',
    fontSize: 12,
    marginTop: 2,
  },
  heroDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  heroDetailText: {
    color: COLORS.white,
    fontSize: 14,
    marginLeft: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  flexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  queueCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    ...cardShadow,
  },
  queueHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  queueName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkPurple,
    flex: 1,
    marginLeft: 8,
  },
  queueMeta: {
    fontSize: 13,
    color: '#595959',
    marginTop: 2,
  },
  restaurantCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    ...cardShadow,
  },
  restaurantImage: {
    width: '100%',
    height: 120,
  },
  restaurantImageLarge: {
    width: '100%',
    height: 150,
  },
  restaurantCardBody: {
    padding: 12,
  },
  restaurantHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantTitleWrap: {
    flex: 1,
    marginHorizontal: 9,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkPurple,
    marginBottom: 3,
    flex: 1,
    marginRight: 8,
  },
  cardMuted: {
    color: '#666',
    fontSize: 13,
    marginBottom: 5,
    lineHeight: 19,
  },
  cardMeta: {
    color: '#555',
    fontSize: 13,
    marginBottom: 2,
  },
  vendorLogoTile: {
    width: 96,
    marginRight: 10,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F7F5FA',
    borderWidth: 1,
    borderColor: '#ECE7F3',
  },
  vendorLogoText: {
    color: COLORS.darkPurple,
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '600',
    width: '100%',
    paddingHorizontal: 4,
  },
  searchBox: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: COLORS.darkText,
  },
  filterScroll: {
    marginBottom: 12,
  },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 2,
    backgroundColor: COLORS.white,
  },
  filterChipActive: {
    backgroundColor: COLORS.primaryPurple,
    borderColor: COLORS.primaryPurple,
  },
  filterChipText: {
    color: '#5C5C5C',
    fontSize: 12,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  emptyStateCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    ...cardShadow,
  },
  emptyStateTitle: {
    fontSize: 18,
    color: COLORS.darkPurple,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 4,
    textAlign: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  infoRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  infoPill: {
    backgroundColor: '#EFEFF2',
    color: '#5D5D5D',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  infoPillChip: {
    backgroundColor: '#ECE4F4',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  infoPillChipText: {
    color: COLORS.darkPurple,
    fontSize: 12,
    fontWeight: '600',
  },
  infoPillChipSecondary: {
    backgroundColor: '#E8F4E8',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  infoPillChipTextSecondary: {
    color: COLORS.successGreen,
    fontSize: 12,
    fontWeight: '600',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#ECE4F4',
  },
  backButtonText: {
    color: COLORS.darkPurple,
    fontWeight: '600',
    fontSize: 13,
  },
  detailHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  detailBanner: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
    ...cardShadow,
  },
  menuImage: {
    width: '100%',
    height: 130,
  },
  menuBody: {
    padding: 12,
  },
  priceText: {
    fontSize: 16,
    color: COLORS.darkPurple,
    fontWeight: '800',
  },
  priceBig: {
    fontSize: 22,
    color: COLORS.darkPurple,
    fontWeight: '800',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#DDD',
    overflow: 'hidden',
  },
  quantitySelectorCompact: {
    transform: [{ scale: 0.92 }],
  },
  qtyButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEAF4',
  },
  qtyText: {
    minWidth: 30,
    textAlign: 'center',
    fontWeight: '700',
    color: COLORS.darkPurple,
  },
  scheduleCard: {
    backgroundColor: '#68408C',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 5,
  },
  scheduleLine: {
    fontSize: 13,
    color: COLORS.darkText,
    marginBottom: 2,
    lineHeight: 19,
  },
  scheduleLineLight: {
    fontSize: 13,
    color: '#F5EFFF',
    marginBottom: 2,
    lineHeight: 19,
  },
  dayTabScroll: {
    marginTop: 10,
    marginBottom: 10,
  },
  freeFoodTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  freeFoodTitleTextWrap: {
    flex: 1,
    marginLeft: 10,
  },
  dayTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#F6F6F6',
    marginRight: 8,
  },
  dayTabActive: {
    backgroundColor: COLORS.primaryPurple,
    borderColor: COLORS.primaryPurple,
  },
  dayTabText: {
    fontSize: 12,
    color: '#575757',
    fontWeight: '600',
  },
  dayTabTextActive: {
    color: COLORS.white,
  },
  menuPrototypeCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECECEC',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FBFBFB',
  },
  metricTile: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#FAFAFA',
    minWidth: 140,
    marginRight: 8,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    color: '#6A6A6A',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.darkPurple,
    marginTop: 4,
  },
  ruleLine: {
    color: '#505050',
    fontSize: 13,
    marginBottom: 4,
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  cartItemTextWrap: {
    flex: 1,
    marginRight: 10,
  },
  removeButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  removeButtonText: {
    color: COLORS.errorRed,
    fontSize: 12,
    fontWeight: '600',
  },
  paymentOption: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  paymentOptionActive: {
    borderColor: COLORS.primaryPurple,
    backgroundColor: '#F1EBF7',
  },
  paymentOptionDisabled: {
    opacity: 0.45,
  },
  paymentText: {
    color: COLORS.darkText,
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '600',
  },
  paymentTextDisabled: {
    color: '#8A8A8A',
  },
  kioskInstructionCard: {
    borderWidth: 1,
    borderColor: '#E6DEEF',
    backgroundColor: '#F8F4FC',
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
    marginBottom: 4,
  },
  kioskInstructionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.darkPurple,
    marginLeft: 6,
  },
  kioskInstructionText: {
    fontSize: 13,
    color: '#4D4162',
    marginTop: 5,
    lineHeight: 18,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: COLORS.primaryPurple,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primaryPurple,
  },
  divider: {
    height: 1,
    backgroundColor: '#E7E7E7',
    marginVertical: 10,
  },
  queueNumberHero: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: COLORS.primaryPurple,
    marginBottom: 12,
    ...cardShadow,
  },
  queueNumberLabel: {
    color: '#DDD0EB',
    fontSize: 13,
    marginBottom: 4,
  },
  queueNumberValue: {
    color: COLORS.white,
    fontSize: 44,
    fontWeight: '800',
    marginBottom: 4,
  },
  queueNumberSub: {
    color: COLORS.white,
    fontSize: 15,
  },
  progressTrack: {
    marginTop: 10,
    width: '100%',
    height: 10,
    borderRadius: 999,
    backgroundColor: '#EEE',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primaryPurple,
    borderRadius: 999,
  },
  statusStepsWrap: {
    marginTop: 14,
    marginBottom: 10,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BABABA',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  stepDotActive: {
    backgroundColor: COLORS.primaryPurple,
    borderColor: COLORS.primaryPurple,
  },
  stepCheckImage: {
    width: 12,
    height: 12,
  },
  stepText: {
    color: '#6A6A6A',
    fontSize: 13,
  },
  stepTextActive: {
    color: COLORS.darkPurple,
    fontWeight: '700',
  },
  readyCard: {
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: '#E7F6E8',
    padding: 12,
    borderWidth: 1,
    borderColor: '#B6E0B8',
  },
  readyTitle: {
    color: COLORS.successGreen,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  readyText: {
    color: '#2E6231',
    fontSize: 13,
    lineHeight: 19,
  },
  noticeCard: {
    marginTop: 12,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F4F0F8',
  },
  noticeText: {
    color: '#55456A',
    fontSize: 13,
    lineHeight: 19,
  },
  preferenceLabel: {
    fontSize: 13,
    color: '#5D5D5D',
    fontWeight: '700',
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  switchLabel: {
    flex: 1,
    marginRight: 10,
    color: COLORS.darkText,
    fontSize: 14,
  },
  skeletonCard: {
    borderRadius: 14,
    backgroundColor: '#E2E2E5',
    marginBottom: 12,
  },
  desktopNav: {
    backgroundColor: COLORS.darkPurple,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  desktopBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  desktopBrandIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#6B4590',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  desktopBrandIconImage: {
    borderRadius: 8,
  },
  desktopBrandText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  desktopNavButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  desktopNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  desktopNavButtonActive: {
    backgroundColor: COLORS.white,
  },
  desktopNavButtonText: {
    color: COLORS.white,
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
  },
  desktopNavButtonTextActive: {
    color: COLORS.darkPurple,
  },
  desktopCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  desktopCartText: {
    color: COLORS.darkPurple,
    fontWeight: '700',
    marginLeft: 6,
    fontSize: 12,
  },
  mobileNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingTop: 7,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
    ...cardShadow,
  },
  mobileNavButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mobileNavIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.78,
  },
  mobileNavIconWrapActive: {
    opacity: 1,
  },
  mobileNavIconImage: {
    width: 20,
    height: 20,
  },
  mobileNavText: {
    fontSize: 11,
    color: '#757575',
    marginTop: 3,
    fontWeight: '600',
  },
  mobileNavTextActive: {
    color: COLORS.primaryPurple,
  },
  stickyCart: {
    position: 'absolute',
    right: 14,
    left: 14,
    backgroundColor: COLORS.darkPurple,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...cardShadow,
  },
  stickyCartTextTop: {
    color: '#D6C4E8',
    fontSize: 12,
    marginBottom: 2,
  },
  brandLogoWrap: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogoImage: {
    width: '100%',
    height: '100%',
  },
  stickyCartTextBottom: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(26, 12, 43, 0.45)',
    padding: 24,
  },
  successCard: {
    width: '100%',
    maxWidth: 370,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    padding: 22,
    alignItems: 'center',
    ...cardShadow,
  },
  successIconCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: COLORS.successGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  successIconImage: {
    width: 34,
    height: 34,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.darkPurple,
    marginBottom: 6,
  },
  successSubtext: {
    fontSize: 15,
    color: '#505050',
    marginBottom: 4,
  },
});
