import { useParams, useNavigate } from 'react-router-dom';
import { PetForm } from '@/components/PetForm';
import { getPetById, updatePet } from '@/data/mockPets';
import { useToast } from '@/hooks/use-toast';
import { PetFormData } from '@/types';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function PetEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const pet = id ? getPetById(id) : undefined;

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <div className="text-center">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Pet não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            O pet que você está tentando editar não existe ou foi removido.
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

  const handleSubmit = (formData: PetFormData) => {
    try {
      const updatedPet = updatePet(pet.id, {
        name: formData.name,
        age: formData.age,
        breed: formData.breed,
        vaccines: formData.vaccines,
        imageUrl: formData.imageUrl || pet.imageUrl,
        institution: {
          name: formData.institutionName,
          email: formData.institutionEmail,
          whatsapp: formData.institutionWhatsapp,
        },
        description: formData.description,
      });

      if (updatedPet) {
        toast({
          title: "Pet atualizado!",
          description: `${updatedPet.name} foi atualizado com sucesso.`
        });

        navigate(`/pets/${pet.id}`);
      } else {
        throw new Error('Falha ao atualizar pet');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o pet. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    navigate(`/pets/${pet.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to={`/pets/${pet.id}`}>
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Detalhes
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Editar Pet: {pet.name}
            </h1>
            <p className="text-muted-foreground">
              Atualize as informações do pet
            </p>
          </div>

          <PetForm
            pet={pet}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}