import { CircleArrowRight, RefreshCwOff } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-primary text-center flex flex-col gap-10 items-center justify-center ">
      <h2>404 Not Found</h2>

      <p>Could not find requested resource</p>
      <Link href="/" className="relative text-md font-semibold text-primary flex gap-2 items-center justify-center
                 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
    >
        Return Home <CircleArrowRight />
      </Link>

      <RefreshCwOff className="w-8 h-8" />
    </div>
  );
}
