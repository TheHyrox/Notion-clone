import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { Ghost } from "lucide-react"

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]">
            <Logo />
            <div className="md:ml-auto w-full justify-betwenn md:justify-end flex items-center gap-x-2 text-muted-foreground"></div>
            <Button variant="ghost" size="sm">
                Privacy Policy
            </Button>
            <Button variant="ghost" size="sm">
                Terms & COnditions
            </Button>
        </div>
    )
}