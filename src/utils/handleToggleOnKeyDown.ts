export const handleToggleOnKeyDown = (
  e: React.KeyboardEvent,
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    setShowOptions(prev => !prev);
  }
};
