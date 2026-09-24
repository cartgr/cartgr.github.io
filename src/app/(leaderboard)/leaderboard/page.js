// GitHub Pages serves static exports, so retain an HTML redirect for existing links.
export default function LegacyLeaderboardPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/votebench/" />
      <script dangerouslySetInnerHTML={{ __html: "window.location.replace('/votebench/' + window.location.search + window.location.hash);" }} />
      <p className="p-8">VoteBench has moved to <a href="/votebench/" className="underline">/votebench/</a>.</p>
    </>
  );
}
