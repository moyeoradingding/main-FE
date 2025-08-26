import { useCallback, useState } from 'react';

export function useManagerScheduleModals() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [targetId, setTargetId] = useState<number | null>(null);
  const [targetTitle, setTargetTitle] = useState<string>('');

  const openCreate = useCallback(() => setCreateOpen(true), []);
  const closeCreate = useCallback(() => setCreateOpen(false), []);

  const openEdit = useCallback((id: number) => {
    setTargetId(id);
    setEditOpen(true);
  }, []);
  const closeEdit = useCallback(() => setEditOpen(false), []);

  const openDelete = useCallback((id: number, title: string) => {
    setTargetId(id);
    setTargetTitle(title);
    setDeleteOpen(true);
  }, []);
  const closeDelete = useCallback(() => setDeleteOpen(false), []);

  const resetTarget = useCallback(() => {
    setTargetId(null);
    setTargetTitle('');
  }, []);

  return {
    createOpen,
    editOpen,
    deleteOpen,
    targetId,
    targetTitle,
    openCreate,
    closeCreate,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete,
    resetTarget,
  };
}
