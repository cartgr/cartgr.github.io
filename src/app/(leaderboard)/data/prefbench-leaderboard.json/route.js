// Static download of the leaderboard data, emitted at build time from the same file the page renders.
import data from '../../leaderboard/data/leaderboard.json';

export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify(data, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
