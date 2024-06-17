const getRandomGame = async () => {
  const resp = await fetch("http://localhost:3000/api/game", {
    cache: "no-store",
  });
  return await resp.json();
};

export const dynamic = "force-dynamic";

export default async function Random() {
  const game = await getRandomGame();
  return (
    <main>
      <img src={game.image} alt={game.title} width={400} height={150} />
      <a href={game.url} className="text-2xl hover:underline">
        <h1>{game.title}</h1>
      </a>
    </main>
  );
}
