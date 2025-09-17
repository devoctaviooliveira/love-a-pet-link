import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <Heart className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Página não encontrada
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Ops! A página que você está procurando não existe ou foi movida. 
          Que tal voltar e explorar nossos pets disponíveis?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="shadow-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Início
            </Button>
          </Link>
          <Link to="/pets">
            <Button variant="outline" size="lg">
              Ver Pets
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
