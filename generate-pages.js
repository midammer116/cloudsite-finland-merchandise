const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

const tiktokUrls = [
    "https://www.tiktok.com/@saunazilla/photo/7603776258010369302",
    "https://www.tiktok.com/@saunazilla/photo/7639278513257794838",
    "https://www.tiktok.com/@saunazilla/photo/7638691082951331094",
    "https://www.tiktok.com/@saunazilla/photo/7637047589304601858",
    "https://www.tiktok.com/@saunazilla/photo/7618133121090735382",
    "https://www.tiktok.com/@saunazilla/photo/7612565478082448662",
    "https://www.tiktok.com/@saunazilla/photo/7611454717658451222"
];

const pages = [
  { slug: 'finland-mugs', title: 'Finland Mugs', description: 'Discover our collection of Finland-themed mugs featuring authentic Nordic design.' },
  { slug: 'coffee-mugs-finland-theme', title: 'Coffee Mugs with a Finland Theme', description: 'Enjoy your coffee in style with our Finland-themed coffee mugs.' },
  { slug: 'finland-bag', title: 'Finland Bag', description: 'Explore our selection of Finland bags for everyday use and travel.' },
  { slug: 'finnish-tote-bags', title: 'Finnish Tote Bags', description: 'Stylish and durable Finnish tote bags for shopping and daily carry.' },
  { slug: 'finland-products', title: 'Finland Products', description: 'Browse our wide range of authentic Finland products and merchandise.' },
  { slug: 'finland-shirt', title: 'Finland Shirt', description: 'Show your Finnish pride with our collection of Finland shirts.' },
  { slug: 'finnish-apparel', title: 'Finnish Apparel', description: 'Discover Finnish apparel combining Nordic style and quality craftsmanship.' },
  { slug: 'finnish-clothing-design', title: 'Finnish Clothing and Design', description: 'Explore Finnish clothing and design with modern Nordic aesthetics.' },
  { slug: 'finland-hoodie-sweatshirt', title: 'Finland Hoodie and Sweatshirt', description: 'Stay warm and stylish with Finland hoodies and sweatshirts.' },
  { slug: 'finland-gifts-souvenirs', title: 'Finland Gifts and Souvenirs', description: 'Find the perfect Finland gifts and souvenirs for any occasion.' },
  { slug: 'finland-gift-items', title: 'Finland Gift Items', description: 'Unique Finland gift items for friends, family, and colleagues.' },
  { slug: 'finland-shop', title: 'Finland Shop', description: 'Your one-stop Finland shop for authentic Nordic merchandise.' },
  { slug: 'finnish-gifts', title: 'Finnish Gifts', description: 'Thoughtful Finnish gifts crafted with care and Nordic tradition.' },
  { slug: 'finnish-products', title: 'Finnish Products', description: 'Authentic Finnish products made with quality and tradition.' },
  { slug: 'helsinki-gifts', title: 'Helsinki Gifts', description: 'Discover unique Helsinki gifts inspired by the capital of Finland.' },
  { slug: 'helsinki-shirt', title: 'Helsinki Shirt', description: 'Represent Helsinki with our collection of Helsinki-themed shirts.' },
  { slug: 'helsinki-finland-gifts', title: 'Helsinki Finland Gifts', description: 'Find the best Helsinki Finland gifts for every occasion.' },
  { slug: 'helsinki-hoodie', title: 'Helsinki Hoodie', description: 'Comfortable Helsinki hoodies for a casual Nordic look.' },
  { slug: 'finnish-helsinki-products', title: 'Finnish Helsinki Products', description: 'Explore Finnish Helsinki products blending city and tradition.' },
  { slug: 'helsinki-souvenirs', title: 'Helsinki Souvenirs', description: 'Take home a piece of Helsinki with our souvenir collection.' },
  { slug: 'helsinki-tote-bag', title: 'Helsinki Tote Bag', description: 'Practical and stylish Helsinki tote bags for everyday use.' },
  { slug: 'sisu-t-shirt', title: 'Sisu T-Shirt', description: 'Wear your sisu with pride — our collection of sisu t-shirts.' },
  { slug: 'finnish-sisu', title: 'Finnish Sisu', description: 'Embrace Finnish sisu — strength, determination, and resilience.' },
  { slug: 'sisu-themed-products', title: 'Sisu-Themed Products', description: 'Discover products inspired by the Finnish concept of sisu.' },
  { slug: 'sisu-coffee-mug', title: 'Sisu Coffee Mug', description: 'Start your day with Finnish sisu — our sisu-themed coffee mugs.' }
];

const contentMap = {};

// -- Generic content blocks used across all pages --
const genericP1 = 'When you explore the range of merchandise available, you will quickly notice the attention to detail that goes into every item. Finnish design has a long-standing reputation for combining minimalism with practicality, creating products that are both beautiful and functional. Whether you are looking for something to use daily or a meaningful gift for someone special, the selection of goods on offer is carefully curated to reflect the very best of Nordic culture and lifestyle.';
const genericP2 = 'Many customers appreciate how well these products fit into modern living spaces and routines. Finnish design philosophy emphasizes clean lines, natural materials, and a deep respect for craftsmanship. This means that every piece you choose is not just a purchase, but an investment in quality that will serve you well for years to come. The aesthetic appeal of these items makes them stand out in any setting.';

// -- Category specific paragraph 5 (about quality) --
function qualityP(slug) {
  if (slug.includes('mug') || slug.includes('coffee')) {
    return 'Each mug goes through rigorous quality control to ensure it meets the highest standards for durability and heat retention. Finnish ceramic traditions date back centuries, with modern kilns and glazing processes ensuring every piece is food-safe and dishwasher-friendly. When you hold one of these mugs, you are experiencing the same commitment to excellence that has made Finnish tableware famous worldwide.';
  } else if (slug.includes('bag') || slug.includes('tote')) {
    return 'Each bag is constructed using reinforced stitching and premium materials sourced from reputable Finnish suppliers. The design process emphasizes both form and function, resulting in bags that can withstand daily wear while maintaining their stylish appearance. Finnish textile traditions have evolved to combine modern durability standards with timeless aesthetic principles.';
  } else if (slug.includes('shirt') || slug.includes('apparel') || slug.includes('clothing') || slug.includes('hoodie') || slug.includes('sweatshirt')) {
    return 'Each garment is produced using high-quality fabrics that have been selected for their comfort, breathability, and longevity. Finnish apparel manufacturing follows strict guidelines to ensure every piece retains its shape and color even after repeated washing. The attention to detail in stitching and finishing reflects the Nordic commitment to craftsmanship that never compromises on quality.';
  } else if (slug.includes('gift') || slug.includes('souvenir')) {
    return 'Every gift item is chosen or crafted with the recipient in mind, ensuring that each piece brings joy and meaning. Finnish gift culture emphasizes thoughtfulness and quality over quantity, and this philosophy is reflected in the selection of products available. From small tokens to substantial presents, each item is designed to create a lasting impression.';
  } else if (slug.includes('sisu')) {
    return 'Each sisu-themed product is created with the same determination and resilience that the concept itself represents. The materials and construction methods are chosen to ensure longevity, mirroring the enduring spirit of sisu. When you use or display these items, they serve as a daily reminder of inner strength and perseverance.';
  } else if (slug.includes('helsinki')) {
    return 'Each Helsinki-inspired product captures the vibrant spirit of Finland capital. The materials and production methods reflect the same standards of excellence found in Helsinkis finest design houses. Whether it is textile, ceramic, or apparel, the quality behind every piece is unmistakably Helsinki.';
  } else if (slug.includes('product') || slug.includes('shop')) {
    return 'Every product in this collection is vetted for quality and authenticity before being offered to customers. Finnish manufacturers are known for their rigorous standards and commitment to sustainable practices. When you choose items from this selection, you are supporting ethical production methods that respect both people and the environment.';
  } else {
    return 'Each item is crafted with the same dedication to quality that Finnish manufacturers are known for worldwide. Rigorous quality control ensures that every piece meets high standards before it reaches your hands. This commitment to excellence is what makes these products stand out in a crowded marketplace.';
  }
}

function tailoredWelcome(slug, title) {
  if (slug.includes('mug') || slug.includes('coffee')) {
    return `Our ${title.toLowerCase()} represent more than just a place to enjoy your morning beverage. We have carefully selected each piece to showcase the artistry and functionality that Finnish ceramic design is celebrated for around the world.`;
  } else if (slug.includes('bag') || slug.includes('tote')) {
    return `Our ${title.toLowerCase()} are designed for people who appreciate both style and practicality. We have curated a collection that reflects the Finnish philosophy of combining beauty with everyday usefulness.`;
  } else if (slug.includes('shirt')) {
    return `Our ${title.toLowerCase()} allow you to express your appreciation for Finnish culture in a wearable and comfortable form. Each design has been thoughtfully created to celebrate the unique spirit of Finland.`;
  } else if (slug.includes('apparel') || slug.includes('clothing')) {
    return `Our ${title.toLowerCase()} collection brings together the best of Nordic fashion and comfort. We have selected pieces that showcase the clean aesthetics and quality materials that Finnish apparel design is known for.`;
  } else if (slug.includes('hoodie') || slug.includes('sweatshirt')) {
    return `Our ${title.toLowerCase()} combine cozy comfort with Nordic-inspired design. Each piece is perfect for those who appreciate relaxed style that still makes a statement.`;
  } else if (slug.includes('gift') || slug.includes('souvenir')) {
    return `Our ${title.toLowerCase()} collection has been assembled with care to help you find the perfect present for any occasion. Each item carries the warmth and thoughtfulness that Finnish gift-giving traditions embody.`;
  } else if (slug.includes('product')) {
    return `Our ${title.toLowerCase()} selection represents the finest examples of Finnish craftsmanship and design. We have curated this collection to bring you the most authentic and high-quality items available.`;
  } else if (slug.includes('shop')) {
    return `Welcome to our ${title.toLowerCase()} where you can browse the full range of authentic Finnish merchandise. We have brought together everything you need to experience Nordic lifestyle and design.`;
  } else if (slug.includes('sisu')) {
    return `Our ${title.toLowerCase()} collection embodies the spirit of sisu — the distinctive Finnish concept of determination and resilience. Each item in this range is designed to inspire and empower.`;
  } else if (slug.includes('helsinki')) {
    return `Our ${title.toLowerCase()} collection draws inspiration from Finland vibrant capital. Each piece captures the energy and elegance of Helsinkis unique blend of urban life and natural beauty.`;
  }
  return `Our ${title.toLowerCase()} collection has been carefully curated to bring you the finest examples of Finnish design and craftsmanship.`;
}

function tailoredP2(slug, title) {
  if (slug.includes('finland')) {
    return `Finland products have become popular globally for their clean aesthetics and reliable quality. The international appreciation for Finnish design continues to grow, with more people discovering the appeal of Nordic-inspired items. Our Finland-themed collection celebrates everything that makes this design tradition special.`;
  } else if (slug.includes('helsinki')) {
    return `Helsinki has established itself as a design capital of the world, and its influence can be seen across all categories of Finnish products. The city vibrant creative scene contributes to the development of new and exciting merchandise that captures the essence of modern Finland.`;
  } else if (slug.includes('sisu')) {
    return `The concept of sisu is deeply ingrained in Finnish culture and has inspired people around the world. Sisu-themed products serve as tangible reminders of the strength that lies within each of us. Our collection brings this powerful idea to life through thoughtful design.`;
  } else if (slug.includes('finnish')) {
    return `Finnish products are known for their thoughtful design and reliable quality. The worldwide appreciation for Finnish craftsmanship has grown steadily, with more people seeking out authentic Nordic merchandise for their homes and wardrobes.`;
  }
  return `This collection celebrates the unique charm of Finnish design and its ability to enhance everyday life. The items you find here represent the best of what Finnish culture has to offer.`;
}

function tailoredP3(slug, title) {
  if (slug.includes('mug') || slug.includes('coffee')) {
    return `Finnish mug designs often draw inspiration from the natural landscapes and cultural motifs that define the country. From minimalist geometric patterns to illustrations of forest scenes, each mug tells its own story. Many people enjoy collecting different Finland-themed mugs to rotate through their morning coffee routine.`;
  } else if (slug.includes('bag') || slug.includes('tote')) {
    return `The range of bag styles available means you can find the perfect companion for any activity. Finnish bag design emphasizes ergonomic comfort, ensuring that even fully loaded bags remain comfortable to carry. The materials used are chosen for their durability and environmental footprint.`;
  } else if (slug.includes('shirt') || slug.includes('apparel') || slug.includes('clothing') || slug.includes('hoodie') || slug.includes('sweatshirt')) {
    return `The variety of styles available means you can express your connection to Finland in many different ways. Finnish apparel design is all about striking the perfect balance between style and practicality. Each garment is created to be a versatile addition to your wardrobe.`;
  } else if (slug.includes('gift') || slug.includes('souvenir')) {
    return `When you give a Finnish gift, you are sharing a piece of Nordic culture and tradition. Each item in this collection has been chosen for its ability to convey warmth, thoughtfulness, and quality. Finnish gifts are known for their timeless appeal and lasting value.`;
  } else if (slug.includes('product')) {
    return `The range of Finnish products continues to expand as designers find new ways to combine tradition with innovation. From household essentials to decorative pieces, each product reflects the Finnish commitment to quality and aesthetics. Exploring these items gives you insight into what makes Nordic design so special.`;
  } else if (slug.includes('shop')) {
    return `Our shop brings together a comprehensive selection of Finnish merchandise spanning multiple categories. Whether you are looking for something specific or browsing for inspiration, you will find a carefully curated range of authentic items.`;
  } else if (slug.includes('sisu')) {
    return `Sisu-themed merchandise has gained popularity as more people embrace the Finnish mindset of perseverance. These products make excellent gifts for anyone who needs a reminder of their own inner strength. The designs often incorporate symbolic elements that represent courage and determination.`;
  } else if (slug.includes('helsinki')) {
    return `Helsinki merchandise captures the unique character of a city that seamlessly blends urban sophistication with natural beauty. Each item reflects the creative energy that makes Helsinki one of the most exciting design destinations in the world. These pieces are perfect for anyone who loves the city.`;
  }
  return `Exploring this collection gives you a glimpse into the rich tradition of Finnish design and its continued evolution. Each item reflects the values and aesthetics that make Nordic style so appealing to a global audience.`;
}

function generatePage(slug, title, description, tiktokIndex) {
  const tiktokUrl = tiktokUrls[tiktokIndex % tiktokUrls.length];
  const videoId = tiktokUrl.split('/').pop();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} &ndash; Finland Merchandise</title>
  <meta name="description" content="${description}">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>

  <!-- Header placeholder -->
  <div id="header-placeholder"></div>

  <!-- PAGE HERO -->
  <section class="page-hero">
    <div class="container">
      <a href="https://saunazilla.com/" style="color: inherit; text-decoration: none;"><h1>${title}</h1></a>
      <p>${description}</p>
    </div>
  </section>

  <!-- MAIN CONTENT -->
  <section class="main-content">
    <div class="content-grid">

      <!-- Content Main -->
      <div class="content-main">

        <h2>Welcome to Our ${title} Collection</h2>

        <p>${tailoredWelcome(slug, title)}</p>

        <p>${genericP1}</p>

        <h2>Why Choose Finnish Products</h2>

        <p>${tailoredP2(slug, title)}</p>

        <p>${genericP2}</p>

        <!-- Image placeholder - random image picked by JS -->
        <div class="content-image">
          <img id="content-image" src="../assets/images/placeholder.svg" alt="${title} - Finland Merchandise">
        </div>

        <h2>Quality and Craftsmanship</h2>

        <p>${qualityP(slug)}</p>

        <p>${tailoredP3(slug, title)}</p>

        <h2>Explore Our Selection</h2>

        <p>Whether you are shopping for yourself or looking for a gift for someone who appreciates Nordic design, the carefully curated selection available here offers something for every taste and budget. Each piece has been chosen not only for its aesthetic appeal but also for its functionality and durability. Finnish merchandise is designed to be used and enjoyed every day, making it a practical addition to any home or wardrobe.</p>

        <p>As you browse the collection, you will notice recurring themes of simplicity, natural inspiration, and thoughtful construction. These are the hallmarks of Finnish design that have earned it a dedicated following around the world. Investing in Finnish merchandise means choosing products that will remain stylish and useful for many years, transcending fleeting trends and seasonal fads.</p>

        <!-- YouTube Shorts Embed -->
        <div class="video-embed shorts-embed">
          <iframe src="https://www.youtube.com/embed/A_4bce60SDU" title="${title} - YouTube Shorts" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="max-width: 400px; width: 100%; height: 600px;"></iframe>
        </div>

        <h2>Sustainability and Ethics</h2>

        <p>Finnish manufacturers have long been pioneers in sustainable production methods, prioritizing environmental responsibility alongside product quality. Many items in this collection are made using eco-friendly materials and processes that minimize waste and energy consumption. When you purchase Finnish merchandise, you are supporting a supply chain that values the well-being of the planet as much as the satisfaction of the customer.</p>

        <p>Ethical labor practices and transparent sourcing are standard in the Finnish manufacturing industry. This commitment to fairness and sustainability adds an extra layer of value to every piece you buy. Knowing that your purchase has been made with respect for both people and nature allows you to enjoy your Finnish merchandise with a clear conscience and a sense of pride in supporting responsible production.</p>

        <!-- PDF Embed -->
        <div class="pdf-embed">
          <iframe class="scribd_iframe_embed" title="What Makes Saunazilla&#39;s Finnish Products Stand Out Globally" src="https://www.scribd.com/embeds/896044190/content?start_page=1&view_mode=scroll&access_key=key-EpvgB9XBCJDymJPBPspJ" tabindex="0" data-auto-height="false" data-aspect-ratio="1.4166666666666667" scrolling="no" width="500" height="300" frameborder="0"></iframe>
          <p style="margin: 12px auto 6px auto; font-family: Helvetica,Arial,Sans-serif; font-size: 14px; line-height: normal; display: block;">
            <a title="View What Makes Saunazilla&#39;s Finnish Products Stand Out Globally on Scribd" href="https://www.scribd.com/document/896044190/What-Makes-Saunazilla-s-Finnish-Products-Stand-Out-Globally#from_embed" style="color: #098642; text-decoration: underline;">What Makes Saunazilla&#39;s Finnish Products Stand Out Globally</a> by
            <a title="View mikaelniemiblogs&#39;s profile on Scribd" href="https://www.scribd.com/user/888081023/mikaelniemiblogs#from_embed" style="color: #098642; text-decoration: underline;">mikaelniemiblogs</a>
          </p>
        </div>

        <h2>Visit Our Partner Store</h2>

        <p>We invite you to visit our partner store to experience the full range of Finnish products and merchandise available. The collection spans multiple categories and price points, ensuring that everyone can find something that speaks to their personal style and needs. From practical everyday items to special pieces that make memorable gifts, the selection continues to grow as we discover new and exciting products.</p>

        <p>Our partnership with trusted Finnish brands and manufacturers allows us to offer authentic merchandise that you can rely on for quality and authenticity. When you shop with us, you are directly supporting the artisans, designers, and craftspeople who keep Finnish design traditions alive. We are proud to bring these exceptional products to a global audience.</p>

        <h2>Get Started Today</h2>

        <p>Exploring the world of Finnish merchandise opens up a new appreciation for design that prioritizes quality, functionality, and beauty. Whether you are adding to an existing collection or starting your journey into Nordic style, the items you find here will enrich your everyday life. Finnish merchandise has a way of making ordinary moments feel special.</p>

        <p>We invite you to browse the collection and discover the pieces that resonate with you. Finnish design is all about creating connections between people, objects, and the natural world. When you bring a piece of Finland into your home or wardrobe, you are embracing a lifestyle that values simplicity, quality, and lasting beauty. Start your journey today.</p>

      </div>

      <!-- TikTok Embed -->
      <div class="tiktok-embed">
        <blockquote class="tiktok-embed" cite="${tiktokUrl}" data-video-id="${videoId}" style="max-width: 325px;min-width: 325px;">
          <section><a target="_blank" href="${tiktokUrl}">@saunazilla</a></section>
        </blockquote>
        <script async src="https://www.tiktok.com/embed.js"></script>
      </div>

      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-card">
          <h3>Get in Touch</h3>
          <p>Have questions about our ${title.toLowerCase()}? We&#39;d love to help!</p>
          <a href="https://saunazilla.com/en/contact-us/" class="sidebar-cta" target="_blank" rel="noopener">
            Contact Us
          </a>
        </div>

        <div class="sidebar-card">
          <h3>About This Site</h3>
          <p>Finland Merchandise is your curated gateway to authentic Finnish products, design traditions, and modern Nordic lifestyle. We partner with trusted Finnish brands to bring you quality items.</p>
        </div>
      </aside>

    </div>
  </section>

  <!-- Footer placeholder -->
  <div id="footer-placeholder"></div>

  <!-- Scripts -->
  <script src="../assets/js/include.js"></script>
</body>
</html>`;

  const outputPath = path.join(pagesDir, `${slug}.html`);
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`Created pages/${slug}.html`);
}

// Ensure pages directory exists
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

// Generate all pages
console.log('Generating 26 subpages...');
console.log('================================');
pages.forEach((page, index) => generatePage(page.slug, page.title, page.description, index));
console.log('================================');
console.log('All 26 pages generated successfully!');