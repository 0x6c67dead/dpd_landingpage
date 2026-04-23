import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src="/logo.png" alt="Logo" width={100} height={100} />
      <h1>404</h1>
      <p>Página não encontrada</p>
      <Link href="/">Voltar para a página inicial</Link>
    </div>
  );
}
