import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { Pet, PetFormData } from '@/types';

interface PetFormProps {
  pet?: Pet;
  onSubmit: (data: PetFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PetForm({ pet, onSubmit, onCancel, isLoading }: PetFormProps) {
  const [formData, setFormData] = useState<PetFormData>({
    name: pet?.name || '',
    age: pet?.age || 1,
    breed: pet?.breed || '',
    vaccines: pet?.vaccines || [],
    imageUrl: pet?.imageUrl || '',
    institutionName: pet?.institution.name || '',
    institutionEmail: pet?.institution.email || '',
    institutionWhatsapp: pet?.institution.whatsapp || '',
    description: pet?.description || '',
  });

  const [newVaccine, setNewVaccine] = useState('');

  const handleInputChange = (field: keyof PetFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addVaccine = () => {
    if (newVaccine.trim() && !formData.vaccines.includes(newVaccine.trim())) {
      handleInputChange('vaccines', [...formData.vaccines, newVaccine.trim()]);
      setNewVaccine('');
    }
  };

  const removeVaccine = (vaccineToRemove: string) => {
    handleInputChange('vaccines', formData.vaccines.filter(v => v !== vaccineToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addVaccine();
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {pet ? 'Editar Pet' : 'Adicionar Novo Pet'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Informações do Pet</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Pet *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ex: Luna"
                  required
                  aria-describedby="name-error"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Idade (anos) *</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  max="30"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 1)}
                  required
                  aria-describedby="age-error"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="breed">Raça *</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) => handleInputChange('breed', e.target.value)}
                placeholder="Ex: Labrador Mix"
                required
                aria-describedby="breed-error"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL da Foto</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="https://exemplo.com/foto-pet.jpg"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Conte sobre a personalidade, comportamento..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Vacinas</Label>
              <div className="flex space-x-2">
                <Input
                  value={newVaccine}
                  onChange={(e) => setNewVaccine(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ex: V8, Antirrábica..."
                />
                <Button type="button" onClick={addVaccine} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.vaccines.map((vaccine) => (
                  <Badge key={vaccine} variant="secondary" className="gap-1">
                    {vaccine}
                    <button
                      type="button"
                      onClick={() => removeVaccine(vaccine)}
                      className="ml-1 hover:text-destructive"
                      aria-label={`Remover vacina ${vaccine}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Institution Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Informações da Instituição</h3>
            
            <div className="space-y-2">
              <Label htmlFor="institutionName">Nome da Instituição *</Label>
              <Input
                id="institutionName"
                value={formData.institutionName}
                onChange={(e) => handleInputChange('institutionName', e.target.value)}
                placeholder="Ex: ONG Amor Animal"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institutionEmail">Email *</Label>
                <Input
                  id="institutionEmail"
                  type="email"
                  value={formData.institutionEmail}
                  onChange={(e) => handleInputChange('institutionEmail', e.target.value)}
                  placeholder="contato@ong.org"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="institutionWhatsapp">WhatsApp *</Label>
                <Input
                  id="institutionWhatsapp"
                  value={formData.institutionWhatsapp}
                  onChange={(e) => handleInputChange('institutionWhatsapp', e.target.value)}
                  placeholder="11999887766"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1 shadow-button"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : (pet ? 'Atualizar' : 'Adicionar')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}