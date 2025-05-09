import { db } from "./db";
import { Category } from "./../src/generated/prisma";

async function main() {
  const events = [
    // Tech Events (4)
    {
      title_en: "AI Innovation Summit",
      title_ar: "قمة الابتكار في الذكاء الاصطناعي",
      description_en:
        "Explore the latest advancements in artificial intelligence, including neural networks and their practical applications across industries with top leaders in the tech field.",
      description_ar:
        "استكشف أحدث تطورات الذكاء الاصطناعي، بما في ذلك الشبكات العصبية وتطبيقاتها العملية في مختلف الصناعات مع أبرز قادة التكنولوجيا.",
      date: new Date("2025-06-15T09:00:00Z"),
      image: "/tech1.jpg",
      category: Category.TECHNOLOGY,
      price: 299,
    },
    {
      title_en: "Web3 Developers Conference",
      title_ar: "مؤتمر مطوري ويب 3",
      description_en:
        "Gain hands-on experience with blockchain technology. Learn to build smart contracts and decentralized applications under expert guidance.",
      description_ar:
        "اكتسب خبرة عملية في تقنية البلوكشين. تعلم إنشاء العقود الذكية والتطبيقات اللامركزية بمساعدة الخبراء.",
      date: new Date("2025-07-05T10:00:00Z"),
      image: "/tech2.jpg",
      category: Category.TECHNOLOGY,
      price: 199,
    },
    {
      title_en: "Cloud Computing Expo",
      title_ar: "معرض الحوسبة السحابية",
      description_en:
        "Join top experts to discover trends in cloud computing. Understand multi-cloud strategies, infrastructure efficiency, and security optimization.",
      description_ar:
        "انضم إلى خبراء بارزين لاكتشاف اتجاهات الحوسبة السحابية. تعرف على استراتيجيات السحابة المتعددة وتحسين الأمان والكفاءة.",
      date: new Date("2025-08-20T08:30:00Z"),
      image: "/tech3.jpg",
      category: Category.TECHNOLOGY,
      price: 149,
    },
    {
      title_en: "Cybersecurity Symposium",
      title_ar: "ندوة الأمن السيبراني",
      description_en:
        "Join global cybersecurity leaders to explore best practices for digital safety, threat detection, and data protection strategies.",
      description_ar:
        "انضم إلى قادة الأمن السيبراني العالميين لاكتشاف أفضل ممارسات الأمان الرقمي، واكتشاف التهديدات، واستراتيجيات حماية البيانات.",
      date: new Date("2025-09-30T13:00:00Z"),
      image: "/tech4.jpg",
      category: Category.TECHNOLOGY,
      price: 349,
    },

    // Political Events (3)
    {
      title_en: "Climate Policy Roundtable",
      title_ar: "طاولة مستديرة حول سياسة المناخ",
      description_en:
        "Join policymakers and environmental leaders to discuss climate action, renewable energy solutions, and sustainable environmental strategies.",
      description_ar:
        "انضم إلى صناع القرار والقادة البيئيين لمناقشة العمل المناخي، وحلول الطاقة المتجددة، والاستراتيجيات البيئية المستدامة.",
      date: new Date("2025-06-22T15:00:00Z"),
      image: "/tech5.jpg",
      category: Category.POLITICAL,
      price: 0,
    },
    {
      title_en: "Urban Development Conference",
      title_ar: "مؤتمر التنمية الحضرية",
      description_en:
        "Collaborate with urban planners to address housing, infrastructure development, and sustainable urban growth challenges.",
      description_ar:
        "تعاون مع مخططي المدن لمعالجة تحديات الإسكان، وتطوير البنية التحتية، والنمو الحضري المستدام.",
      date: new Date("2025-07-10T10:00:00Z"),
      image: "/tech6.jpg",
      category: Category.POLITICAL,
      price: 99,
    },
    {
      title_en: "Foreign Relations Symposium",
      title_ar: "ندوة العلاقات الخارجية",
      description_en:
        "Explore international diplomacy, global trade agreements, and foreign policy strategy with experienced diplomats and analysts.",
      description_ar:
        "استكشف الدبلوماسية الدولية، والاتفاقيات التجارية العالمية، واستراتيجيات السياسة الخارجية مع دبلوماسيين ومحللين متمرسين.",
      date: new Date("2025-08-18T13:30:00Z"),
      image: "/tech7.jpg",
      category: Category.POLITICAL,
      price: 129,
    },

    // Business Events (3)
    {
      title_en: "Startup Investment Forum",
      title_ar: "منتدى استثمار الشركات الناشئة",
      description_en:
        "Pitch your startup ideas to seasoned investors, learn effective fundraising strategies, and expand your professional network.",
      description_ar:
        "قدم أفكار شركتك الناشئة لمستثمرين ذوي خبرة، وتعلم استراتيجيات جمع التمويل، ووسع شبكتك المهنية.",
      date: new Date("2025-06-08T11:00:00Z"),
      image: "/tech8.jpg",
      category: Category.BUSINESS,
      price: 249,
    },
    {
      title_en: "Digital Marketing Bootcamp",
      title_ar: "معسكر التسويق الرقمي",
      description_en:
        "Intensive training on digital marketing tools. Master SEO, advertising campaigns, and conversion rate optimization.",
      description_ar:
        "تدريب مكثف على أدوات التسويق الرقمي. أتقن تحسين محركات البحث والإعلانات وتحسين معدل التحويل.",
      date: new Date("2025-07-12T09:30:00Z"),
      image: "/tech9.jpg",
      category: Category.BUSINESS,
      price: 179,
    },
    {
      title_en: "Global E-Commerce Summit",
      title_ar: "قمة التجارة الإلكترونية",
      description_en:
        "E-commerce experts share strategies for global expansion, logistics, localization, and cross-border trade success.",
      description_ar:
        "يشارك خبراء التجارة الإلكترونية استراتيجيات التوسع العالمي، والخدمات اللوجستية، والتوطين، ونجاح التجارة عبر الحدود.",
      date: new Date("2025-08-12T14:00:00Z"),
      image: "/tech10.jpg",
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
