import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Shield, Search } from 'lucide-react';

const PawIcon = () => (
  <svg 
    width="48" 
    height="48" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-12 h-12 text-primary"
  >
    <path d="M8.5 8.5c1.38 0 2.5-1.12 2.5-2.5S9.88 3.5 8.5 3.5 6 4.62 6 6s1.12 2.5 2.5 2.5zm0 1c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm7 0c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm0-1c1.38 0 2.5-1.12 2.5-2.5S16.88 3.5 15.5 3.5 13 4.62 13 6s1.12 2.5 2.5 2.5zm-3.5 7.5c-2.33 0-4.31.8-5.5 2.28v2.72h11v-2.72c-1.19-1.48-3.17-2.28-5.5-2.28z"/>
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <PawIcon />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Encontre seu novo
              <span className="block bg-gradient-warm bg-clip-text text-transparent">
                melhor amigo
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Conectamos pets que precisam de um lar com famílias que querem compartilhar amor. 
              Cada adoção é uma nova história de felicidade.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pets">
                <Button size="lg" className="w-full sm:w-auto shadow-button px-8 py-6 text-lg">
                  <Search className="mr-2 h-5 w-5" />
                  Ver Pets Disponíveis
                </Button>
              </Link>
              
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Adicionar Pet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Facilitamos o processo de adoção com transparência e cuidado
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-8 shadow-card border-0 bg-gradient-card">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Explore
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Navegue por centenas de pets disponíveis para adoção. 
                  Veja fotos, informações sobre vacinas e personalidade.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-card border-0 bg-gradient-card">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Conecte
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Entre em contato direto com as instituições via WhatsApp ou email. 
                  Tire dúvidas e agende uma visita.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-card border-0 bg-gradient-card">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Adote
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Complete o processo de adoção responsável e ganhe 
                  um novo membro da família cheio de amor para dar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Adoção Responsável
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Todos os pets passam por avaliação veterinária e são vacinados. 
              Trabalhamos apenas com ONGs e protetores verificados para garantir 
              o bem-estar dos animais.
            </p>
            <Link to="/pets">
              <Button size="lg" className="shadow-button px-8 py-6 text-lg">
                Comece Sua Busca Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}