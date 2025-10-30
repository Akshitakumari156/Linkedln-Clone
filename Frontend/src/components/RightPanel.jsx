export default function RightPanel() {
  const news = [
    "AI is transforming tech jobs",
    "React 19 is out — what’s new?",
    "Women in tech leadership are rising",
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3">LinkedIn News</h3>
      <ul className="space-y-2">
        {news.map((item, i) => (
          <li key={i} className="text-sm text-gray-700">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
