export const backendToFrontend = (backendTarea) => {
  if (!backendTarea) return null;

  return {
    id: backendTarea._id,
    descripcion: backendTarea.descripcion,
    listo: backendTarea.listo,
    order: backendTarea.numeroOrden,
    createdAt: backendTarea.createdAt,
    updatedAt: backendTarea.updatedAt,
  };
};

export const backendArrayToFrontend = (backendTareas) => {
  if (!Array.isArray(backendTareas)) return [];
  return backendTareas.map(backendToFrontend);
};


export const frontendToBackend = (frontendTarea) => {
  if (!frontendTarea) return null;

  return {
    descripcion: frontendTarea.descripcion,
    listo: frontendTarea.listo,
    numeroOrden: frontendTarea.order,
  };
};
