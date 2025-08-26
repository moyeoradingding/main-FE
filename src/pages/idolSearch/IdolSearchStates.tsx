import { Link } from 'react-router-dom';

export function LoadingSpinner() {
  return <p className="text-center text-fuchsia-400">불러오는 중...</p>;
}

export function ErrorMessage() {
  return <p className="text-center text-fuchsia-800">에러가 발생했습니다.</p>;
}

export function EmptySearchResult() {
  return <p className="text-center text-fuchsia-400">검색 결과가 없습니다.</p>;
}

export function FavoriteEmptyState() {
  return (
    <p className="text-center text-base text-gray-600">
      아직 찜한 아이돌이 없어요 😢 <br />
      검색해서 일정을 찾아보세요. <br />
      <br />
      즐겨찾기한 일정은{' '}
      <Link
        to="/mypage/myschedule"
        className="text-fuchsia-500 underline hover:text-fuchsia-600"
      >
        [마이페이지]
      </Link>
      에서 <br /> 확인할 수 있습니다 ✨
    </p>
  );
}
