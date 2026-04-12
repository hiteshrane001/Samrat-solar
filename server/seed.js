import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

import mongoose from 'mongoose';
import Product from './models/Product.js';
import User from './models/User.js';

const IMGS = {
  hjt: 'https://cdn11.bigcommerce.com/s-unnwlv5df8/images/stencil/640w/products/651/3688/01__25072.1772693438.jpg?c=1',
  ntype: 'https://cdn11.bigcommerce.com/s-unnwlv5df8/images/stencil/640w/products/632/3393/1743403555.1280.1280__86657.1759818123.1280.1280__35102.1772693357.jpg?c=1',
  perc: 'https://cdn11.bigcommerce.com/s-unnwlv5df8/images/stencil/640w/products/632/3393/1743403555.1280.1280__86657.1759818123.1280.1280__35102.1772693357.jpg?c=1',
  panel560: 'https://cdn11.bigcommerce.com/s-unnwlv5df8/images/stencil/640w/products/632/3393/1743403555.1280.1280__86657.1759818123.1280.1280__35102.1772693357.jpg?c=1',
  panel590: 'https://cdn11.bigcommerce.com/s-unnwlv5df8/images/stencil/640w/products/632/3393/1743403555.1280.1280__86657.1759818123.1280.1280__35102.1772693357.jpg?c=1',
  panel630: 'https://cdn11.bigcommerce.com/s-unnwlv5df8/images/stencil/640w/products/632/3393/1743403555.1280.1280__86657.1759818123.1280.1280__35102.1772693357.jpg?c=1',
  panel680: 'https://cdn11.bigcommerce.com/s-unnwlv5df8/images/stencil/640w/products/632/3393/1743403555.1280.1280__86657.1759818123.1280.1280__35102.1772693357.jpg?c=1',
  inv3kw: 'https://cdn11.bigcommerce.com/s-unnwlv5df8/images/stencil/640w/products/181/3332/3kw_white_background_images_1__49568.1756816657__80123.1772693720.png?c=1',
  inv5kw: 'https://cdn11.bigcommerce.com/s-unnwlv5df8/images/stencil/640w/products/181/3332/3kw_white_background_images_1__49568.1756816657__80123.1772693720.png?c=1',
};

const techProducts = [
  { type:'tech', techId:'hjt', name:'HJT Bifacial Solar Module', short:'HJT Technology', badge:'Premium', badgeType:'gold',
    eff:'22–24%', cells:'182mm Half-Cut', power:'Up to 680Wp', warranty:'30 Years', temp:'-0.26%/°C',
    desc:'Heterojunction Technology with bifacial design delivers industry-leading efficiency and zero LID degradation.',
    feats:['Bifacial Dual-Glass','Zero LID Degradation','Excellent High-Temp Performance','IP68 Junction Box'],
    img:IMGS.hjt, price:12500, mrp:15000 },
  { type:'tech', techId:'ntype', name:'N-Type TOPCon Solar Module', short:'N-Type TOPCon', badge:'High Efficiency', badgeType:'red',
    eff:'21–23%', cells:'182mm TOPCon', power:'Up to 660Wp', warranty:'25 Years', temp:'-0.29%/°C',
    desc:'N-Type TOPCon cells with tunnel oxide passivated contact deliver superior low-light and long-term performance.',
    feats:['TOPCon Cell Tech','Low Degradation Rate','Excellent Low-Light','Tier-1 Certified'],
    img:IMGS.ntype, price:11200, mrp:13800 },
  { type:'tech', techId:'perc', name:'Mono PERC Solar Module', short:'Mono PERC', badge:'Best Value', badgeType:'red',
    eff:'19–21%', cells:'166mm Mono PERC', power:'Up to 600Wp', warranty:'25 Years', temp:'-0.34%/°C',
    desc:'Passivated Emitter Rear Cell technology — proven, reliable, cost-effective. India\'s most popular solar module choice.',
    feats:['Proven Reliability','Cost Effective','Widely Available','IS 14286 Certified'],
    img:IMGS.perc, price:9800, mrp:12200 }
];

const panelProducts = [
  { type:'panel', wp:560, name:'560 Wp Solar Panel', model:'SS-560M-HMB', cells:'144 Half-Cut Cells', voc:'48.2V', isc:'14.82A', img:IMGS.panel560, price:9800, mrp:12500 },
  { type:'panel', wp:590, name:'590 Wp Solar Panel', model:'SS-590M-HMB', cells:'144 Half-Cut Cells', voc:'49.8V', isc:'15.1A', img:IMGS.panel590, price:10400, mrp:13200 },
  { type:'panel', wp:630, name:'630 Wp Solar Panel', model:'SS-630N-TOPCon', cells:'132 N-Type Cells', voc:'51.4V', isc:'15.8A', img:IMGS.panel630, price:11100, mrp:14000 },
  { type:'panel', wp:680, name:'680 Wp Solar Panel', model:'SS-680N-BiFacial', cells:'132 Bifacial Cells', voc:'53.6V', isc:'16.2A', img:IMGS.panel680, price:11900, mrp:15100 }
];

const inverterProducts = [
  { type:'inverter', kw:3, name:'3kW Single Phase On-Grid Inverter', model:'SS-INV-3K-SP', brand:'Samrat Solar',
    desc:'Compact, efficient single-phase inverter ideal for residential 3–4kW solar systems. Wi-Fi monitoring included.',
    specs:[['Max Input','4500W'],['MPPT Trackers','2'],['Phase','Single Phase'],['Monitoring','Wi-Fi App'],['IP Rating','IP65'],['Warranty','5 Years']],
    img:IMGS.inv3kw, price:32000, mrp:38500, badge:'Popular' },
  { type:'inverter', kw:5, name:'5kW Single Phase On-Grid Inverter', model:'SS-INV-5K-SP', brand:'Samrat Solar',
    desc:'High-capacity inverter with 3 MPPT trackers, battery-ready port, and GPRS+Wi-Fi dual monitoring for 5–6kW systems.',
    specs:[['Max Input','7500W'],['MPPT Trackers','3'],['Phase','Single Phase'],['Monitoring','Wi-Fi + GPRS'],['IP Rating','IP65'],['Warranty','5 Years']],
    img:IMGS.inv5kw, price:48000, mrp:57000, badge:'Recommended' }
];

const bosProducts = [
  {
    type: 'bos',
    name: 'Complete BOS Kit',
    model: 'SS-BOS-KIT-COMPLETE',
    brand: 'Samrat Solar',
    desc: 'All-inclusive Balance of System kit includes DCDB/ACDB boxes, DC & AC cables, connectors, lightning arrestor, earthing components, and installation hardware.',
    items: [
      { icon: '⚡', name: 'DCDB Box', sub: '4-in 1-out' },
      { icon: '🔌', name: 'ACDB Box', sub: 'with MCB' },
      { icon: '🔴', name: 'DC Cable Red', sub: '4mm² × 30m' },
      { icon: '⚫', name: 'DC Cable Black', sub: '4mm² × 30m' },
      { icon: '🟡', name: 'AC Cable', sub: '6mm² × 10m' },
      { icon: '🔗', name: 'MC4 Connectors', sub: '10 pairs' },
      { icon: '⛈️', name: 'Lightning Arrestor', sub: 'Class II' },
      { icon: '🌍', name: 'Earthing Rod', sub: 'Copper Bonded' },
      { icon: '🧪', name: 'Earth Chemical', sub: '15kg bag' },
      { icon: '🏗️', name: 'Earthing Chamber', sub: 'CI Grade' },
      { icon: '🔵', name: 'Earthing Cable', sub: '16mm² × 5m' },
      { icon: '🔩', name: 'Lugs & Nut Bolts', sub: 'SS304 Grade' },
      { icon: '🪢', name: 'Cable Ties', sub: 'Pack of 100' },
      { icon: '🟠', name: 'Insulation Tape', sub: '3M Brand × 5' },
      { icon: '📎', name: 'DC Cable Clips', sub: 'Pack of 50' }
    ],
    price: 45000,
    mrp: 55000,
    badge: 'All-Inclusive'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert all products
    const all = [...techProducts, ...panelProducts, ...inverterProducts, ...bosProducts];
    await Product.insertMany(all);
    console.log(`📦 Seeded ${all.length} products`);

    // Create demo user if not exists
    const existingDemo = await User.findOne({ email: 'demo@samratsolar.com' });
    if (!existingDemo) {
      await User.create({
        name: 'Demo User',
        email: 'demo@samratsolar.com',
        password: 'solar123',
        phone: '9876543210',
        role: 'user'
      });
      console.log('👤 Created demo user (demo@samratsolar.com / solar123)');
    } else {
      console.log('👤 Demo user already exists');
    }

    // Create admin user if not exists
    const existingAdmin = await User.findOne({ email: 'admin@samratsolar.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: 'admin@samratsolar.com',
        password: 'admin123',
        phone: '9876543211',
        role: 'admin'
      });
      console.log('👨‍💼 Created admin user (admin@samratsolar.com / admin123)');
    } else {
      console.log('👨‍💼 Admin user already exists');
    }

    console.log('\n🎉 Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
