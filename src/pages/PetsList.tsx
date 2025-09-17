import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PetCard } from '@/components/PetCard';
import { useAuth } from '@/contexts/AuthContext';
import { getPets, deletePet } from '@/data/mockPets';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, Plus, Heart } from 'lucide-react';
import { Pet } from '@/types';

export default function PetsList() {
  const [pets, setPets] = useState<Pet[]>(getPets());
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState<string>('all');
  const [vaccineFilter, setVaccineFilter] = useState<string>('all');
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      const matchesSearch = 
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.institution.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAge = 
        ageFilter === 'all' ||
        (ageFilter === 'young' && pet.age <= 2) ||
        (ageFilter === 'adult' && pet.age > 2 && pet.age <= 7) ||
        (ageFilter === 'senior' && pet.age > 7);
      
      const matchesVaccine = 
        vaccineFilter === 'all' ||
        (vaccineFilter === 'complete' && pet.vaccines.length >= 3) ||
        (vaccineFilter === 'partial' && pet.vaccines.length > 0 && pet.vaccines.length < 3);
      
      return matchesSearch && matchesAge && matchesVaccine;
    });
  }, [pets, searchTerm, ageFilter, vaccineFilter]);

  const handleDelete = async (petId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pet?')) {
      const success = deletePet(petId);
      if (success) {
        setPets(getPets());
        toast({
          title: "Pet removido",
          description: "Pet foi removido com sucesso."
        });
      } else {
        toast({
          title: "Erro",
          description: "Não foi possível remover o pet.",
          variant: "destructive"
        });
      }
    }
  };

  const totalPets = pets.length;
  const filteredCount = filteredPets.length;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pets Disponíveis para Adoção
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {filteredCount} de {totalPets} pets encontrados
          </p>
          
          {isAuthenticated && (
            <Link to="/pets/new">
              <Button size="lg" className="shadow-button">
                <Plus className="mr-2 h-5 w-5" />
                Adicionar Novo Pet
              </Button>
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 shadow-soft mb-8 border-0">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nome, raça ou instituição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Buscar pets"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Idade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas idades</SelectItem>
                  <SelectItem value="young">Jovem (0-2 anos)</SelectItem>
                  <SelectItem value="adult">Adulto (3-7 anos)</SelectItem>
                  <SelectItem value="senior">Sênior (8+ anos)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={vaccineFilter} onValueChange={setVaccineFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Vacinas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="complete">Completas (3+)</SelectItem>
                  <SelectItem value="partial">Parciais (1-2)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Busca: {searchTerm}
                <button 
                  onClick={() => setSearchTerm('')}
                  className="hover:text-destructive"
                  aria-label="Remover filtro de busca"
                >
                  ×
                </button>
              </Badge>
            )}
            {ageFilter !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Idade: {ageFilter}
                <button 
                  onClick={() => setAgeFilter('all')}
                  className="hover:text-destructive"
                  aria-label="Remover filtro de idade"
                >
                  ×
                </button>
              </Badge>
            )}
            {vaccineFilter !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Vacinas: {vaccineFilter}
                <button 
                  onClick={() => setVaccineFilter('all')}
                  className="hover:text-destructive"
                  aria-label="Remover filtro de vacinas"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>

        {/* Results */}
        {filteredCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                showActions={isAuthenticated}
                onEdit={(id) => window.location.href = `/pets/${id}/edit`}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum pet encontrado
            </h3>
            <p className="text-muted-foreground mb-6">
              Tente ajustar os filtros ou buscar por outros termos.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setAgeFilter('all');
                setVaccineFilter('all');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}