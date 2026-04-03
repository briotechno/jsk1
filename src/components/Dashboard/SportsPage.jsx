import { useParams } from "react-router-dom";
import OddsTable from "./OddsTable";
import dashboardData from "../../data/dashboardData.json";

const SportsPage = () => {
  const { sportName } = useParams();
  const { matches } = dashboardData;

  const filteredMatches = matches.filter(
    (match) => match.sport.toLowerCase() === sportName.toLowerCase()
  );

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto no-scrollbar font-sans relative mt-1 mx-1">
      {/* Table Section */}
      <div className="mt-2">
        {filteredMatches.length > 0 ? (
          <OddsTable items={filteredMatches} />
        ) : (
          <div className="p-10 text-center text-gray-500 bg-white shadow-sm">
            No active matches for {sportName} at the moment.
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default SportsPage;
