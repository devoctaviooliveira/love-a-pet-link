import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mail, MapPin, Heart } from 'lucide-react';
import { Pet } from '@/types';

interface PetCardProps {
  pet: Pet;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function PetCard({ pet, showActions = false, onEdit, onDelete }: PetCardProps) {
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

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card hover:-translate-y-1 bg-gradient-card border-0">
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={pet.imageUrl} 
          alt={`Foto de ${pet.name}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">{pet.name}</h3>
            <Heart className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          
          <p className="text-sm text-muted-foreground">{pet.breed} • {pet.age} anos</p>
          
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{pet.institution.name}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {pet.vaccines.slice(0, 2).map((vaccine) => (
              <Badge key={vaccine} variant="secondary" className="text-xs">
                {vaccine}
              </Badge>
            ))}
            {pet.vaccines.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{pet.vaccines.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0 space-y-2">
        <div className="flex gap-1.5 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs px-2 py-1.5 h-auto min-w-0"
            onClick={handleWhatsApp}
            aria-label={`Enviar WhatsApp sobre ${pet.name}`}
          >
            <MessageCircle className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">WhatsApp</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs px-2 py-1.5 h-auto min-w-0"
            onClick={handleEmail}
            aria-label={`Enviar email sobre ${pet.name}`}
          >
            <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">Email</span>
          </Button>
        </div>

        <Link to={`/pets/${pet.id}`} className="w-full block">
          <Button 
            variant="default" 
            size="sm" 
            className="w-full shadow-button text-xs px-3 py-2 h-auto"
          >
            Ver Detalhes
          </Button>
        </Link>

        {showActions && (
          <div className="flex gap-1.5 w-full">
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex-1 text-xs px-2 py-1.5 h-auto min-w-0"
              onClick={() => onEdit?.(pet.id)}
            >
              <span className="truncate">Editar</span>
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              className="flex-1 text-xs px-2 py-1.5 h-auto min-w-0"
              onClick={() => onDelete?.(pet.id)}
            >
              <span className="truncate">Excluir</span>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}