/* eslint-disable */
import fs from 'fs';

const logos = [
  { name: 'premier', file: 'Premier_League_Logo.svg' },
  { name: 'champions', file: 'UEFA_Champions_League_logo_2.svg' },
  { name: 'bundesliga', file: 'Bundesliga_logo_(2017).svg' },
  { name: 'laliga-modern', file: 'LaLiga_EA_Sports_2023_Vertical_Logo.svg' },
  { name: 'serie-a', file: 'Serie_A_logo_2022.svg' },
  { name: 'europa-league', file: 'Europa_League.svg' },
  { name: 'ligue-1', file: 'Ligue_1_logo.svg' },
];

async function fetchWikiSvg(filename) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=File:${filename}&prop=imageinfo&iiprop=url&format=json`,
    );
    const data = await res.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0];
    if (page.imageinfo && page.imageinfo[0]) {
      const url = page.imageinfo[0].url;
      const svgRes = await fetch(url);
      return await svgRes.text();
    }
  } catch (e) {
    console.error(`Error fetching ${filename}:`, e.message);
  }
  return null;
}

async function main() {
  const results = {};
  for (const logo of logos) {
    console.log(`Fetching ${logo.name}...`);
    const svg = await fetchWikiSvg(logo.file);
    if (svg) {
      results[logo.name] = svg.substring(0, 150) + '...'; // Just logging head
      fs.writeFileSync(`public/${logo.name}.svg`, svg);
    }
  }
  console.log('Done!');
}

main();
