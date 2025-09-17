import { useNavigate } from 'react-router-dom';
import { PetForm } from '@/components/PetForm';
import { addPet } from '@/data/mockPets';
import { useToast } from '@/hooks/use-toast';
import { PetFormData } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function PetNew() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (formData: PetFormData) => {
    try {
      const newPet = addPet({
        name: formData.name,
        age: formData.age,
        breed: formData.breed,
        vaccines: formData.vaccines,
        imageUrl: formData.imageUrl || '/placeholder.svg',
        institution: {
          name: formData.institutionName,
          email: formData.institutionEmail,
          whatsapp: formData.institutionWhatsapp,
        },
        description: formData.description,
      });

      toast({
        title: "Pet adicionado!",
        description: `${newPet.name} foi adicionado com sucesso.`
      });

      navigate('/pets');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o pet. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    navigate('/pets');
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/pets">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Lista
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Adicionar Novo Pet
            </h1>
            <p className="text-muted-foreground">
              Preencha as informações do pet para disponibilizá-lo para adoção
            </p>
          </div>

          <PetForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}