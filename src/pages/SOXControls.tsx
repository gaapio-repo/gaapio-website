import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function SOXControls() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="container px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Coming Soon
          </h1>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
