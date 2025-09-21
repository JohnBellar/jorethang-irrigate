import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="AgroSmart" className="h-8 w-8" />
          <h1 className="text-xl font-bold text-agro-green">
            AgroSmart — Farm Dashboard
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium">Farm Manager</p>
            <p className="text-xs text-muted-foreground">Jorethang, South Sikkim</p>
          </div>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-agro-green text-white">FM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}