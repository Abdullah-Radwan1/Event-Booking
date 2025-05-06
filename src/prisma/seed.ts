import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const events = [
    // Tech Events (4)
    {
      title: "AI Innovation Summit 2023",
      description:
        "Exploring cutting-edge advancements in AI and machine learning.",
      date: new Date("2025-06-15T09:00:00Z"),
    },
    {
      title: "Web3 Developers Conference",
      description:
        "Workshops for blockchain and decentralized application development.",
      date: new Date("2025-07-05T10:00:00Z"),
    },
    {
      title: "Cloud Computing Expo",
      description:
        "Trends in cloud infrastructure, serverless architectures, and DevOps.",
      date: new Date("2025-08-20T08:30:00Z"),
    },
    {
      title: "Cybersecurity Symposium",
      description:
        "Protecting digital assets in an increasingly connected world.",
      date: new Date("2025-09-30T13:00:00Z"),
    },

    // Political Events (3)
    {
      title: "Climate Policy Roundtable",
      description: "Bipartisan discussion on sustainable energy legislation.",
      date: new Date("2025-06-22T15:00:00Z"),
    },
    {
      title: "Urban Development Conference",
      description:
        "Tackling housing affordability and infrastructure challenges.",
      date: new Date("2025-07-10T10:00:00Z"),
    },
    {
      title: "Foreign Relations Symposium",
      description: "Geopolitical alliances and international trade agreements.",
      date: new Date("2025-08-18T13:30:00Z"),
    },

    // Other (3)
    {
      title: "Startup Investment Forum",
      description: "Connecting entrepreneurs with investors and VCs.",
      date: new Date("2025-06-08T11:00:00Z"),
    },
    {
      title: "Digital Marketing Bootcamp",
      description: "Intensive training in modern marketing strategies.",
      date: new Date("2025-07-12T09:30:00Z"),
    },
    {
      title: "Global E-Commerce Summit",
      description: "Cross-border trade strategies in a post-pandemic world.",
      date: new Date("2025-08-12T14:00:00Z"),
    },
  ];

  for (const event of events) {
    await prisma.event.create({
      data: {
        ...event,
        status: "ACTIVE", // Optional if default is set in schema
      },
    });
  }

  console.log("🌱 Seeded events successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
