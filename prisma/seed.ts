import { db } from "./db";
import { Category } from "./src/generated/client";

async function main() {
  const events = [
    // Tech Events (4)
    {
      title_en: "Summer Tech Festival",
      title_ar: "مهرجان التكنولوجيا الصيفي",
      description_en:
        "Celebrate innovation this summer with cutting-edge tech showcases, live demos, and interactive experiences.",
      description_ar:
        "احتفل بالابتكار هذا الصيف مع عروض تقنية متطورة، وعروض حية وتجارب تفاعلية.",
      date: new Date("2025-06-15T09:00:00Z"),
      image: "/summer-festival.jpg",
      category: Category.TECHNOLOGY,
      price: 299,
    },
    {
      title_en: "Future of Web & AI",
      title_ar: "مستقبل الويب والذكاء الاصطناعي",
      description_en:
        "Dive into the world of Web3 and AI. Learn how decentralized apps and smart systems are shaping tomorrow.",
      description_ar:
        "انغمس في عالم ويب 3 والذكاء الاصطناعي. تعرف على كيفية تشكيل التطبيقات اللامركزية والأنظمة الذكية لمستقبلنا.",
      date: new Date("2025-07-05T10:00:00Z"),
      image: "/tech-event.jpg",
      category: Category.TECHNOLOGY,
      price: 199,
    },
    {
      title_en: "Robotics & Automation Expo",
      title_ar: "معرض الروبوتات والأتمتة",
      description_en:
        "Discover the latest in robotics, automation, and AI-driven machines revolutionizing industries worldwide.",
      description_ar:
        "اكتشف أحدث تقنيات الروبوتات والأتمتة والآلات المدعومة بالذكاء الاصطناعي التي تحدث ثورة في الصناعات حول العالم.",
      date: new Date("2025-08-20T08:30:00Z"),
      image: "/robots.jpg",
      category: Category.TECHNOLOGY,
      price: 149,
    },
    {
      title_en: "FinTech & Cybersecurity Summit",
      title_ar: "قمة التكنولوجيا المالية والأمن السيبراني",
      description_en:
        "A deep dive into the future of finance, fintech innovations, and strategies for digital security.",
      description_ar:
        "استكشاف مستقبل التمويل والابتكارات في التكنولوجيا المالية واستراتيجيات الأمان الرقمي.",
      date: new Date("2025-09-30T13:00:00Z"),
      image: "/finance.jpg",
      category: Category.TECHNOLOGY,
      price: 349,
    },

    // Political Events (3)
    {
      title_en: "Global Cybersecurity Policy Forum",
      title_ar: "منتدى السياسات العالمية للأمن السيبراني",
      description_en:
        "World leaders and policymakers gather to discuss cyber threats, regulations, and international cooperation.",
      description_ar:
        "يجتمع قادة العالم وصناع القرار لمناقشة التهديدات السيبرانية واللوائح والتعاون الدولي.",
      date: new Date("2025-06-22T15:00:00Z"),
      image: "/cyber-security.jpg",
      category: Category.POLITICAL,
      price: 0,
    },
    {
      title_en: "Football & Society Conference",
      title_ar: "مؤتمر كرة القدم والمجتمع",
      description_en:
        "Explore the role of football in culture, politics, and global unity, with experts and athletes worldwide.",
      description_ar:
        "استكشاف دور كرة القدم في الثقافة والسياسة والوحدة العالمية بمشاركة خبراء ولاعبين من جميع أنحاء العالم.",
      date: new Date("2025-07-10T10:00:00Z"),
      image: "/football-cup.jpg",
      category: Category.POLITICAL,
      price: 99,
    },
    {
      title_en: "Fright Night Debate",
      title_ar: "مناظرة ليلة الرعب",
      description_en:
        "A unique political debate held in a dramatic setting, tackling critical global issues under the spotlight.",
      description_ar:
        "مناظرة سياسية فريدة تقام في أجواء درامية، تناقش القضايا العالمية الحرجة تحت الأضواء.",
      date: new Date("2025-08-18T13:30:00Z"),
      image: "/fright-night.jpg",
      category: Category.POLITICAL,
      price: 129,
    },

    // Business Events (3)
    {
      title_en: "Men’s Fashion & Business Forum",
      title_ar: "منتدى الأزياء الرجالية والأعمال",
      description_en:
        "Where fashion meets business. Learn how men’s fashion trends influence global markets and investments.",
      description_ar:
        "حيث تلتقي الموضة مع الأعمال. تعرف على كيفية تأثير اتجاهات الأزياء الرجالية على الأسواق العالمية والاستثمارات.",
      date: new Date("2025-06-08T11:00:00Z"),
      image: "/men-fassion.jpg",
      category: Category.BUSINESS,
      price: 249,
    },
    {
      title_en: "TechX Business Bootcamp",
      title_ar: "معسكر أعمال TechX",
      description_en:
        "Intensive program blending business growth strategies with cutting-edge tech solutions.",
      description_ar:
        "برنامج مكثف يجمع بين استراتيجيات نمو الأعمال والحلول التقنية المتطورة.",
      date: new Date("2025-07-12T09:30:00Z"),
      image: "/tech9.jpg",
      category: Category.BUSINESS,
      price: 179,
    },
    {
      title_en: "Summer Sales Summit",
      title_ar: "قمة المبيعات الصيفية",
      description_en:
        "A global business event on sales strategies, consumer trends, and e-commerce growth during summer seasons.",
      description_ar:
        "حدث تجاري عالمي حول استراتيجيات المبيعات واتجاهات المستهلك ونمو التجارة الإلكترونية خلال مواسم الصيف.",
      date: new Date("2025-08-12T14:00:00Z"),
      image: "/summer-sales.jpg",
      category: Category.BUSINESS,
      price: 199,
    },
  ];

  for (const event of events) {
    await db.event.create({
      data: {
        ...event,
      },
    });
  }

  console.log("🌱 Seeded events successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
