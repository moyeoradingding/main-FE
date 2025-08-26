import DeleteModal from '@/components/common/modal/DeleteModal';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titleName: string;
};

export default function DeleteScheduleModal({
  open,
  onClose,
  onConfirm,
  titleName,
}: Props) {
  return (
    <DeleteModal
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      itemToDeleteName={titleName}
    />
  );
}
