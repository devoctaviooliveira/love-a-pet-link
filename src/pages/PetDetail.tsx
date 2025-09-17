import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { getPetById, deletePet } from '@/data/mockPets';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Calendar,
  Shield,
  Heart,
  Edit,
  Trash2
} from 'lucide-react';

export default function PetDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const pet = id ? getPetById(id) : undefined;

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <div className="text-center">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Pet não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            O pet que você está procurando não existe ou foi removido.
          </p>
          <Link to="/pets">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Lista
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre ${pet.name} (${pet.breed}, ${pet.age} anos) disponível para adoção.`;
    const url = `https://wa.me/55${pet.institution.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    const subject = `Interesse em adoção - ${pet.name}`;
    const body = `Olá!\n\nGostaria de saber mais sobre ${pet.name} (${pet.breed}, ${pet.age} anos) disponível para adoção.\n\nAguardo retorno.\n\nObrigado!`;
    const url = `mailto:${pet.institution.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url);
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este pet?')) {
      const success = deletePet(pet.id);
      if (success) {
        toast({
          title: "Pet removido",
          description: "Pet foi removido com sucesso."
        });
        navigate('/pets');
      } else {
        toast({
          title: "Erro",
          description: "Não foi possível remover o pet.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/pets">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Lista
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Pet Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-0 shadow-card bg-gradient-card">
              <div className="aspect-square">
                <img 
                  src={pet.imageUrl} 
                  alt={`Foto de ${pet.name}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
            </Card>

            {/* Contact Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                size="lg" 
                onClick={handleWhatsApp}
                className="shadow-button"
                aria-label={`Enviar WhatsApp sobre ${pet.name}`}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleEmail}
                aria-label={`Enviar email sobre ${pet.name}`}
              >
                <Mail className="mr-2 h-5 w-5" />
                Enviar Email
              </Button>
            </div>

            {isAuthenticated && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to={`/pets/${pet.id}/edit`}>
                  <Button variant="secondary" size="lg" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="lg" 
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </Button>
              </div>
            )}
          </div>

          {/* Pet Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-card bg-gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-3xl font-bold text-foreground">
                    {pet.name}
                  </CardTitle>
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xl text-muted-foreground">
                  {pet.breed} • {pet.age} anos
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {pet.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Sobre {pet.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {pet.description}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Vacinas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.vaccines.map((vaccine) => (
                      <Badge key={vaccine} variant="secondary" className="text-sm">
                        ✓ {vaccine}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Instituição Responsável
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="font-medium text-foreground">
                      {pet.institution.name}
                    </p>
                    <p className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      {pet.institution.email}
                    </p>
                    <p className="flex items-center">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      ({pet.institution.whatsapp.slice(0, 2)}) {pet.institution.whatsapp.slice(2, 7)}-{pet.institution.whatsapp.slice(7)}
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Como Adotar
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>1. Entre em contato via WhatsApp ou email</p>
                    <p>2. Agende uma visita para conhecer {pet.name}</p>
                    <p>3. Preencha os documentos de adoção</p>
                    <p>4. Leve seu novo amigo para casa! 🏠</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}