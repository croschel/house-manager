import bgHouse from "../../assets/big-logo.png";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const Header = () => {
  const handleAvatarOptions = () => {
    // TODO - Implement Avatar Options
    alert("Future Feature");
  };
  return (
    <header className="flex w-full items-center justify-between gap-4 px-6 py-4 border-b-[1px] border-zinc-700">
      <div className="flex flex-1 items-center gap-4">
        <img
          src={bgHouse}
          alt="House Manager Logo"
          className="w-[76px] h-[72px]"
        />
        <h1 className="text-[24px] text-white">House Manager</h1>
        <nav className="ml-8 flex">
          <Button className="text-white text-[20px]" variant="link">
            Controle de Gastos
          </Button>
          <Button className="text-white text-[20px]" variant="link">
            Controle de Compras
          </Button>
        </nav>
      </div>
      <Avatar>
        <AvatarImage
          onClick={handleAvatarOptions}
          src="https://github.com/shadcn.png"
        />
      </Avatar>
    </header>
  );
};
