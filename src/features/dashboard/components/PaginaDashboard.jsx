import Title from "@/shared/components/layout/Title";
import InputInsertarTarea from "@/shared/components/InputInsertarTarea";
import InputTareaCreada from "@/shared/components/InputTareaCreada";
import { useAuthStore } from "@/stores/authStore";

function PaginaDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-[70vh] flex flex-col items-center">
      <section aria-labelledby="dashboard-title">
        <Title
          id="dashboard-title"
          level={1}
          className="text-center text-shadow-xs text-shadow-white font-primary text-[2.5em] text-orange pb-5 mt-5"
        >
          Hola! {user?.alias || user?.nombre || "Usuario"}
        </Title>
        <InputInsertarTarea />
        <InputTareaCreada />
      </section>
    </div>
  );
}

export default PaginaDashboard;
