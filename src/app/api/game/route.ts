import { NextResponse } from "next/server";
import parse from "node-html-parser";

const getRandomGame = async () => {
  const resp = await fetch("https://store.steampowered.com/explore/random", {
    cache: "no-store",
  });
  const html = await resp.text();

  return html;
};

const parseGameHTML = (html: string) => {
  const doc = parse(html);

  const title = doc.querySelector('[itemprop="name"]')?.innerText;
  const url = doc
    .querySelector('meta[property="og:url"]')
    ?.getAttribute("content");
  const image = doc
    .querySelector("img.game_header_image_full")
    ?.getAttribute("src");

  return {
    title,
    url,
    image,
  };
};

export const GET = async (req: Request) => {
  const html = await getRandomGame();
  const game = parseGameHTML(html);

  return NextResponse.json(game);
};
