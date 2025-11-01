import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, Shield, Clock, Award, Plus, X, Trash2, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type AboutContent = {
  id: string;
  section: string;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string | null;
};

type Value = {
  id: string;
  icon: string;
  title: string;
  description: string;
  order_index: number;
  created_at: string;
};

// Hook pour récupérer le contenu About
function useAboutContent() {
  return useQuery({
    queryKey: ["about-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_content")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as AboutContent[];
    },
  });
}

// Hook pour récupérer les valeurs
function useAboutValues() {
  return useQuery({
    queryKey: ["about-values"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_values")
        .select("*")
        .order("order_index", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Value[];
    },
  });
}

// Hook pour mettre à jour le contenu About
function useUpdateAboutContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      section: string;
      title?: string;
      content: string;
    }) => {
      // Utiliser upsert pour créer ou mettre à jour
      const { error } = await supabase
        .from("about_content")
        .upsert(
          {
            section: payload.section,
            title: payload.title || null,
            content: payload.content,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "section",
          }
        );
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["about-content"] });
    },
  });
}

// Hook pour mettre à jour une valeur
function useUpdateValue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      id: string;
      icon?: string;
      title?: string;
      description?: string;
      order_index?: number;
    }) => {
      const { id, ...rest } = payload;
      const { error } = await supabase
        .from("about_values")
        .update(rest)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["about-values"] });
    },
  });
}

// Hook pour créer une valeur
function useCreateValue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      icon: string;
      title: string;
      description: string;
      order_index: number;
    }) => {
      const { error } = await supabase.from("about_values").insert([payload]);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["about-values"] });
    },
  });
}

// Hook pour supprimer une valeur
function useDeleteValue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("about_values").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["about-values"] });
    },
  });
}

const AdminAbout = () => {
  const { toast } = useToast();
  const { data: aboutContent } = useAboutContent();
  const { data: values } = useAboutValues();
  const updateContent = useUpdateAboutContent();
  const updateValue = useUpdateValue();
  const createValue = useCreateValue();
  const deleteValue = useDeleteValue();

  const [editingMission, setEditingMission] = useState(false);
  const [editingStory, setEditingStory] = useState(false);
  const [missionText, setMissionText] = useState("");
  const [storyText, setStoryText] = useState("");

  const [editingValue, setEditingValue] = useState<Value | null>(null);
  const [isValueFormOpen, setIsValueFormOpen] = useState(false);
  const [valueForm, setValueForm] = useState({
    icon: "Heart",
    title: "",
    description: "",
  });

  // Initialiser les valeurs depuis les données
  useEffect(() => {
    if (aboutContent) {
      const mission = aboutContent.find((c) => c.section === "mission");
      const story = aboutContent.find((c) => c.section === "story");
      if (mission) setMissionText(mission.content);
      if (story) setStoryText(story.content);
    }
  }, [aboutContent]);

  const handleSaveMission = async () => {
    try {
      await updateContent.mutateAsync({
        section: "mission",
        content: missionText,
      });
      toast({
        title: "Mission Updated",
        description: "The mission section has been updated successfully.",
      });
      setEditingMission(false);
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message ?? "Failed to update mission.",
        variant: "destructive",
      });
    }
  };

  const handleSaveStory = async () => {
    try {
      await updateContent.mutateAsync({
        section: "story",
        content: storyText,
      });
      toast({
        title: "Story Updated",
        description: "The story section has been updated successfully.",
      });
      setEditingStory(false);
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message ?? "Failed to update story.",
        variant: "destructive",
      });
    }
  };

  const openValueEdit = (value: Value) => {
    setEditingValue(value);
    setValueForm({
      icon: value.icon,
      title: value.title,
      description: value.description,
    });
    setIsValueFormOpen(true);
  };

  const openValueCreate = () => {
    setEditingValue(null);
    setValueForm({
      icon: "Heart",
      title: "",
      description: "",
    });
    setIsValueFormOpen(true);
  };

  const handleSaveValue = async () => {
    try {
      if (!valueForm.title || !valueForm.description) {
        toast({
          title: "Fields Required",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
        return;
      }

      if (editingValue) {
        await updateValue.mutateAsync({
          id: editingValue.id,
          ...valueForm,
        });
        toast({
          title: "Value Updated",
          description: "The value has been updated successfully.",
        });
      } else {
        await createValue.mutateAsync({
          ...valueForm,
          order_index: (values?.length ?? 0) + 1,
        });
        toast({
          title: "Value Created",
          description: "The value has been created successfully.",
        });
      }
      setIsValueFormOpen(false);
      setEditingValue(null);
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message ?? "Failed to save value.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteValue = async (id: string) => {
    try {
      await deleteValue.mutateAsync(id);
      toast({
        title: "Value Deleted",
        description: "The value has been deleted successfully.",
      });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message ?? "Failed to delete value.",
        variant: "destructive",
      });
    }
  };

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Heart,
    Shield,
    Clock,
    Award,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About / Mission Management</h1>

      {/* Mission Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Mission</CardTitle>
            <Button
              variant="outline"
              onClick={() => {
                setEditingMission(!editingMission);
                if (!editingMission && aboutContent) {
                  const mission = aboutContent.find((c) => c.section === "mission");
                  setMissionText(mission?.content || "");
                }
              }}
            >
              {editingMission ? "Cancel" : <Pencil className="h-4 w-4 mr-2" />}
              {editingMission ? null : "Edit"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {editingMission ? (
            <div className="space-y-4">
              <Textarea
                value={missionText}
                onChange={(e) => setMissionText(e.target.value)}
                className="min-h-[150px]"
                placeholder="Enter mission text..."
              />
              <Button
                onClick={handleSaveMission}
                disabled={updateContent.isPending}
              >
                Save Mission
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {aboutContent?.find((c) => c.section === "mission")?.content ||
                "No mission text set. Click Edit to add content."}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Story Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Our Story</CardTitle>
            <Button
              variant="outline"
              onClick={() => {
                setEditingStory(!editingStory);
                if (!editingStory && aboutContent) {
                  const story = aboutContent.find((c) => c.section === "story");
                  setStoryText(story?.content || "");
                }
              }}
            >
              {editingStory ? "Cancel" : <Pencil className="h-4 w-4 mr-2" />}
              {editingStory ? null : "Edit"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {editingStory ? (
            <div className="space-y-4">
              <Textarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                className="min-h-[200px]"
                placeholder="Enter story text..."
              />
              <Button
                onClick={handleSaveStory}
                disabled={updateContent.isPending}
              >
                Save Story
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {aboutContent?.find((c) => c.section === "story")?.content ||
                "No story text set. Click Edit to add content."}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Values Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Our Values</CardTitle>
            <Button onClick={openValueCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Add Value
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isValueFormOpen && (
            <Card className="mb-6 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">
                  {editingValue ? "Edit Value" : "Create Value"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsValueFormOpen(false);
                    setEditingValue(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Icon (Heart, Shield, Clock, Award)</Label>
                  <Input
                    value={valueForm.icon}
                    onChange={(e) =>
                      setValueForm((f) => ({ ...f, icon: e.target.value }))
                    }
                    placeholder="Heart"
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={valueForm.title}
                    onChange={(e) =>
                      setValueForm((f) => ({ ...f, title: e.target.value }))
                    }
                    placeholder="e.g., Compassionate Care"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={valueForm.description}
                    onChange={(e) =>
                      setValueForm((f) => ({ ...f, description: e.target.value }))
                    }
                    placeholder="Enter description..."
                  />
                </div>
                <Button onClick={handleSaveValue}>
                  {editingValue ? "Save Changes" : "Create Value"}
                </Button>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values?.map((value) => {
              const IconComponent = iconMap[value.icon] || Heart;
              return (
                <Card key={value.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openValueEdit(value)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteValue(value.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAbout;