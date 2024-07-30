import { FC, ReactNode } from "react";
import bigLogo from "../../assets/big-logo.png";
import bgHouse from "../../assets/smart-home-bg-concept.png";
import { Label } from "../ui/label";

interface Props {
  children: ReactNode;
  title: string;
  description: string;
}
export const UnloggedWrapper: FC<Props> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="flex flex-1 w-full">
      <div className="flex w-full">
        <img
          src={bgHouse}
          alt="House Manager Logo"
          className="object-fit w-full"
        />
        <img
          src={bigLogo}
          alt="House Manager Logo"
          className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="min-w-[25%] p-[56px] flex flex-col justify-center">
        <div className="flex gap-1 flex-col mb-2">
          <Label className="text-[32px] text-white">{title}</Label>
          <Label className="text-[14px] text-white">{description}</Label>
        </div>
        {children}
      </div>
    </div>
  );
};
