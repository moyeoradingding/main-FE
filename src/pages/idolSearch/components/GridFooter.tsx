type VirtuosoContext = { isFetchingNextPage: boolean };

function GridFooter({ context }: { context?: VirtuosoContext }) {
  if (!context?.isFetchingNextPage) return null;
  return (
    <div className="col-span-full w-full">
      <p className="py-4 text-center !text-fuchsia-400">불러오는 중...</p>
    </div>
  );
}

export default GridFooter;
