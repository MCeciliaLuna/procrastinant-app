import Parrafo from "@/shared/components/layout/Parrafo";

function Footer() {
  return (
    <footer
      className="relative bg-lightsecondary h-[20vh] flex items-center justify-center"
    >
      <Parrafo className="font-secondary text-center text-[0.8rem]">
        ¡Vos podés! ✔{" "}
        <strong className="text-orange font-primary text-lg">
          Procrastinant App
        </strong>{" "}
        por{" "}
        <strong>
          <a
            href="https://mcecilialuna-dev.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange font-primary text-lg"
          >
            Ceci :)
          </a>
        </strong>
      </Parrafo>
    </footer>
  );
}

export default Footer;
