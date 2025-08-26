import { Button } from '../Button';
import Modal from './Modal';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemToDeleteName: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemToDeleteName,
}: DeleteModalProps) {
  const handleDelete = () => {
    // 삭제 로직

    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <p className="pb-6">{itemToDeleteName}을(를) 정말 삭제하시겠습니까?</p>
      <div className="flex gap-4">
        <Button onClick={handleDelete}>삭제하기</Button>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
      </div>
    </Modal>
  );
}
