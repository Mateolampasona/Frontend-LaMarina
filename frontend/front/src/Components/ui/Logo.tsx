import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJarpeFDBJGcwHU0foEfmlru4DJ0KT5bVvqg&s"
        alt="La Marina Logo"
        width={40}
        height={40}
      />
      <span className="text-xl font-bold text-primary">La Marina</span>
    </div>
  );
}
