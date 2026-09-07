import { useCallback, useEffect, useMemo, useState } from "react";
import { filterByName } from "../utils/entityUtils";

const useCrudResource = ({
  api,
  initialForm,
  initialErrors,
  validate,
  createPayload = (form) => form,
  updatePayload = (form) => form,
  editForm = (item) => item,
  transformChange = ({ value, type, checked }) =>
    type === "checkbox" ? checked : value,
  updateStrategy = "local",
}) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [modalMode, setModalMode] = useState("crear");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const loadItems = useCallback(async () => {
    setError("");

    try {
      const data = await api.list();
      setItems(data);
    } catch (loadError) {
      setError("No se pudieron cargar los registros.");
      console.error(loadError);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    Promise.resolve().then(loadItems);
  }, [loadItems]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return filterByName(items, normalizedSearch);
  }, [items, search]);

  const resetForm = () => {
    setForm({ ...initialForm });
    setErrors({ ...initialErrors });
  };

  const openCreateModal = () => {
    setModalMode("crear");
    setSelectedItem(null);
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode("editar");
    setSelectedItem(item);
    resetForm();
    setForm({ ...initialForm, ...editForm(item) });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    setErrors({ ...initialErrors });
  };

  const handleChange = (event) => {
    const { name } = event.target;
    const value = transformChange(event.target);

    if (value === null) {
      return;
    }

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(form, modalMode);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean) || isSaving) {
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      if (modalMode === "crear") {
        const newItem = await api.create(createPayload(form));
        setItems((currentItems) => [...currentItems, newItem]);
      } else {
        const updatedItem = await api.update(
          selectedItem.id,
          updatePayload(form)
        );

        if (updateStrategy === "reload") {
          await loadItems();
        } else {
          setItems((currentItems) =>
            currentItems.map((item) =>
              item.id === selectedItem.id ? updatedItem : item
            )
          );
        }
      }

      closeModal();
    } catch (saveError) {
      setError("No se pudo guardar el registro.");
      console.error(saveError);
    } finally {
      setIsSaving(false);
    }
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
  };

  const closeDeleteModal = () => {
    setItemToDelete(null);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) {
      return;
    }

    setError("");

    try {
      await api.remove(itemToDelete.id);

      if (updateStrategy === "reload") {
        await loadItems();
      } else {
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== itemToDelete.id)
        );
      }

      closeDeleteModal();
    } catch (deleteError) {
      setError("No se pudo eliminar el registro.");
      console.error(deleteError);
    }
  };

  return {
    items,
    filteredItems,
    search,
    setSearch,
    selectedItem,
    itemToDelete,
    modalMode,
    modalOpen,
    form,
    errors,
    isLoading,
    isSaving,
    error,
    openCreateModal,
    openEditModal,
    closeModal,
    handleChange,
    handleSubmit,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};

export default useCrudResource;
