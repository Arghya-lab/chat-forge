import ConversationListBar from "../ConversationListBar";
import ServerListBar from "../ServerListBar";

function OverviewPage() {
  return (
    <div
      className="grid w-screen h-screen bg-pearl-50 dark:bg-shadow-200"
      style={{ gridTemplateColumns: "72px 240px 1fr" }}>
      <ServerListBar />
      <ConversationListBar />
      <div className="h-screen flex flex-col">
        <div className="w-full px-6 py-3 flex justify-between items-center h-14 border-b-2 border-pearl-600 dark:border-shadow-900 shadow-sm"></div>
      </div>
    </div>
  );
}

export default OverviewPage;
