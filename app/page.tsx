"use client"
import { Envelope } from "@/components/envelope"

export default function Home() {
  const letters = [
    {
      id: 1,
      title: "Open When You Need a Hug",
      colorHex: "#856F8D",
      stampImage: "LETTER1_STAMP.png",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor ex, vulputate ac vulputate et, sodales nec lectus. Nam consectetur eros vel velit mollis blandit. Mauris feugiat odio vitae luctus posuere. Aliquam interdum lectus ante, quis interdum ipsum dictum vel. Aenean nulla nisl, fringilla sit amet felis eu, dapibus fermentum purus.",
    },
    {
      id: 2,
      title: "Open When You Need Motivation",
      colorHex: "#FEDA60",
      stampImage: "LETTER2_STAMP.png",
      message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor ex, vulputate ac vulputate et, sodales nec lectus. Nam consectetur eros vel velit mollis blandit. Mauris feugiat odio vitae luctus posuere. Aliquam interdum lectus ante, quis interdum ipsum dictum vel. Aenean nulla nisl, fringilla sit amet felis eu, dapibus fermentum purus.",
    },
    {
      id: 3,
      title: "Open When You're Sad",
      colorHex: "#396ABE",
      stampImage: "LETTER3_STAMP.png",
      message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor ex, vulputate ac vulputate et, sodales nec lectus. Nam consectetur eros vel velit mollis blandit. Mauris feugiat odio vitae luctus posuere. Aliquam interdum lectus ante, quis interdum ipsum dictum vel. Aenean nulla nisl, fringilla sit amet felis eu, dapibus fermentum purus.",
    },
    {
      id: 4,
      title: "Open When You Need a Laugh",
      colorHex: "#5E8809",
      stampImage: "LETTER4_STAMP.png",
      message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor ex, vulputate ac vulputate et, sodales nec lectus. Nam consectetur eros vel velit mollis blandit. Mauris feugiat odio vitae luctus posuere. Aliquam interdum lectus ante, quis interdum ipsum dictum vel. Aenean nulla nisl, fringilla sit amet felis eu, dapibus fermentum purus.",
    },
    {
      id: 5,
      title: "Open When You Can't Sleep",
      colorHex: "#545774",
      stampImage: "LETTER5_STAMP.png",
      message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor ex, vulputate ac vulputate et, sodales nec lectus. Nam consectetur eros vel velit mollis blandit. Mauris feugiat odio vitae luctus posuere. Aliquam interdum lectus ante, quis interdum ipsum dictum vel. Aenean nulla nisl, fringilla sit amet felis eu, dapibus fermentum purus.",
    },
    {
      id: 6,
      title: "Open When You Need Courage",
      colorHex: "#90221D",
      stampImage: "LETTER6_STAMP.png",
      message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor ex, vulputate ac vulputate et, sodales nec lectus. Nam consectetur eros vel velit mollis blandit. Mauris feugiat odio vitae luctus posuere. Aliquam interdum lectus ante, quis interdum ipsum dictum vel. Aenean nulla nisl, fringilla sit amet felis eu, dapibus fermentum purus.",
    },
    {
      id: 7,
      title: "Open When It's Your Birthday",
      colorHex: "#703E19",
      stampImage: "LETTER7_STAMP.png",
      message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor ex, vulputate ac vulputate et, sodales nec lectus. Nam consectetur eros vel velit mollis blandit. Mauris feugiat odio vitae luctus posuere. Aliquam interdum lectus ante, quis interdum ipsum dictum vel. Aenean nulla nisl, fringilla sit amet felis eu, dapibus fermentum purus.",
    },
    {
      id: 8,
      title: "Open When You're Stressed",
      colorHex: "#3B3E3E",
      stampImage: "LETTER8_STAMP.png",
      message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor ex, vulputate ac vulputate et, sodales nec lectus. Nam consectetur eros vel velit mollis blandit. Mauris feugiat odio vitae luctus posuere. Aliquam interdum lectus ante, quis interdum ipsum dictum vel. Aenean nulla nisl, fringilla sit amet felis eu, dapibus fermentum purus.",
    },
    {
      id: 9,
      title: "Open When You Think You Didn’t Do the Right Thing",
      colorHex: "#B7C0BD",
      stampImage: "LETTER9_STAMP.png",
      message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor ex, vulputate ac vulputate et, sodales nec lectus. Nam consectetur eros vel velit mollis blandit. Mauris feugiat odio vitae luctus posuere. Aliquam interdum lectus ante, quis interdum ipsum dictum vel. Aenean nulla nisl, fringilla sit amet felis eu, dapibus fermentum purus.",
    },
  ]

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-10 text-foreground font-bold">
          Open When Letters
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {letters.map((letter) => (
            <Envelope
              key={letter.id}
              title={letter.title}
              colorHex={letter.colorHex}
              stampImage={letter.stampImage}
              message={letter.message}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
